import { neon, type NeonQueryFunction } from '@neondatabase/serverless';

let client: NeonQueryFunction<false, false> | null = null;

function sql(strings: TemplateStringsArray, ...values: unknown[]) {
  if (!client) {
    const url = process.env.POSTGRES_URL || process.env.DATABASE_URL;
    if (!url) throw new Error('POSTGRES_URL (or DATABASE_URL) is not set');
    client = neon(url);
  }
  return client(strings, ...values);
}

export type OrderItem = {
  productId: string;
  productName: string;
  productPrice: string;
  salePrice: string;
  productImage?: string;
  size?: string;
  message?: string;
  quantity: number;
};

export type Order = {
  orderId: string;
  createdAt: string;
  contact: string;
  firstName: string;
  lastName: string;
  address: string;
  postalCode: string;
  city: string;
  country: string;
  phone: string;
  items: OrderItem[];
  total: string;
  savings: string;
  paymentMethod: string;
  shippingMethod: string;
  status: 'pending' | 'confirmed' | 'shipped' | 'delivered' | 'cancelled';
};

let schemaReady: Promise<void> | null = null;

function ensureSchema(): Promise<void> {
  if (!schemaReady) {
    schemaReady = (async () => {
      await sql`
        CREATE TABLE IF NOT EXISTS orders (
          order_id TEXT PRIMARY KEY,
          created_at TIMESTAMPTZ NOT NULL,
          contact TEXT NOT NULL,
          first_name TEXT DEFAULT '',
          last_name TEXT DEFAULT '',
          address TEXT NOT NULL,
          postal_code TEXT DEFAULT '',
          city TEXT NOT NULL,
          country TEXT DEFAULT 'Kosovo',
          phone TEXT NOT NULL,
          items JSONB NOT NULL,
          total TEXT,
          savings TEXT,
          payment_method TEXT,
          shipping_method TEXT,
          status TEXT NOT NULL DEFAULT 'pending'
        )
      `;
      await sql`
        CREATE TABLE IF NOT EXISTS inventory (
          product_id TEXT PRIMARY KEY,
          stock INTEGER NOT NULL
        )
      `;
    })();
  }
  return schemaReady;
}

function rowToOrder(row: Record<string, unknown>): Order {
  return {
    orderId: row.order_id as string,
    createdAt: (row.created_at as Date).toISOString(),
    contact: row.contact as string,
    firstName: (row.first_name as string) ?? '',
    lastName: (row.last_name as string) ?? '',
    address: row.address as string,
    postalCode: (row.postal_code as string) ?? '',
    city: row.city as string,
    country: (row.country as string) ?? 'Kosovo',
    phone: row.phone as string,
    items: row.items as OrderItem[],
    total: row.total as string,
    savings: row.savings as string,
    paymentMethod: row.payment_method as string,
    shippingMethod: row.shipping_method as string,
    status: row.status as Order['status'],
  };
}

export async function getOrders(): Promise<Order[]> {
  await ensureSchema();
  const rows = await sql`SELECT * FROM orders ORDER BY created_at DESC`;
  return rows.map(rowToOrder);
}

export async function insertOrder(order: Order): Promise<void> {
  await ensureSchema();
  await sql`
    INSERT INTO orders (
      order_id, created_at, contact, first_name, last_name, address,
      postal_code, city, country, phone, items, total, savings,
      payment_method, shipping_method, status
    ) VALUES (
      ${order.orderId}, ${order.createdAt}, ${order.contact}, ${order.firstName}, ${order.lastName}, ${order.address},
      ${order.postalCode}, ${order.city}, ${order.country}, ${order.phone}, ${JSON.stringify(order.items)}, ${order.total}, ${order.savings},
      ${order.paymentMethod}, ${order.shippingMethod}, ${order.status}
    )
  `;
}

export async function updateOrderStatus(orderId: string, status: string): Promise<boolean> {
  await ensureSchema();
  const rows = await sql`UPDATE orders SET status = ${status} WHERE order_id = ${orderId} RETURNING order_id`;
  return rows.length > 0;
}

export async function getInventory(): Promise<Record<string, number>> {
  await ensureSchema();
  const rows = await sql`SELECT product_id, stock FROM inventory`;
  const result: Record<string, number> = {};
  for (const row of rows) result[row.product_id as string] = row.stock as number;
  return result;
}

export async function setStock(productId: string, stock: number): Promise<void> {
  await ensureSchema();
  const clamped = Math.max(0, stock);
  await sql`
    INSERT INTO inventory (product_id, stock) VALUES (${productId}, ${clamped})
    ON CONFLICT (product_id) DO UPDATE SET stock = ${clamped}
  `;
}

export async function decrementStock(productId: string, quantity: number): Promise<void> {
  await ensureSchema();
  await sql`
    UPDATE inventory SET stock = GREATEST(0, stock - ${quantity}) WHERE product_id = ${productId}
  `;
}
