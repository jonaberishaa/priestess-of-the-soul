import { NextResponse } from 'next/server';
import { products } from '@/data/products';
import { getInventory } from '@/lib/db';

export const dynamic = 'force-dynamic';

export async function GET() {
  const inventory = await getInventory();
  const result = products.map((p) => ({
    ...p,
    stock: inventory[p.id] ?? 10,
    inStock: (inventory[p.id] ?? 10) > 0,
  }));
  return NextResponse.json(result);
}
