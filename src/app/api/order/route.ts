import { NextRequest, NextResponse } from 'next/server';
import { readJSON, writeJSON } from '@/lib/db';

type OrderItem = {
  productId: string;
  productName: string;
  productPrice: string;
  salePrice: string;
  productImage?: string;
  size?: string;
  message?: string;
  quantity: number;
};

type Order = {
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

function generateOrderId(): string {
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
  let id = '';
  for (let i = 0; i < 9; i++) {
    id += chars[Math.floor(Math.random() * chars.length)];
  }
  return id;
}

export async function POST(req: NextRequest) {
  const body = await req.json();
  const {
    contact, firstName, lastName, address, postalCode, city, country, phone,
    items, total, savings, paymentMethod, shippingMethod,
  } = body;

  if (!contact || !items?.length || !address || !city || !phone) {
    return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
  }

  const orderId = generateOrderId();
  const createdAt = new Date().toISOString();
  const fullName = [firstName, lastName].filter(Boolean).join(' ');

  const order: Order = {
    orderId,
    createdAt,
    contact,
    firstName: firstName || '',
    lastName: lastName || '',
    address,
    postalCode: postalCode || '',
    city,
    country: country || 'Kosovo',
    phone,
    items,
    total,
    savings,
    paymentMethod: paymentMethod || 'Cash on Delivery (COD)',
    shippingMethod: shippingMethod || 'Transporti Falas',
    status: 'pending',
  };

  // Save order to file
  try {
    const orders = readJSON<Order[]>('orders.json', []);
    orders.unshift(order);
    writeJSON('orders.json', orders);

    // Update inventory
    const inventory = readJSON<Record<string, number>>('inventory.json', {});
    for (const item of items) {
      if (item.productId in inventory) {
        inventory[item.productId] = Math.max(0, (inventory[item.productId] || 0) - item.quantity);
      }
    }
    writeJSON('inventory.json', inventory);
  } catch (err) {
    console.error('DB write error:', err);
    // Continue even if file write fails - email is more important
  }

  // Build items HTML rows
  const itemsHtml = items.map((item: OrderItem) => `
    <tr>
      <td style="padding:12px 16px; vertical-align:top;">
        ${item.productImage ? `<img src="${item.productImage}" alt="${item.productName}" style="width:60px;height:60px;object-fit:cover;border-radius:4px;" />` : ''}
      </td>
      <td style="padding:12px 16px; vertical-align:top;">
        <strong style="font-size:14px;">${item.productName}</strong><br/>
        ${item.size ? `<span style="font-size:12px;color:#888;">${item.size}</span><br/>` : ''}
        ${item.message ? `<span style="font-size:12px;color:#888;font-style:italic;">"${item.message}"</span><br/>` : ''}
        <span style="font-size:12px;color:#888;">Sasia: ${item.quantity}</span>
      </td>
      <td style="padding:12px 16px; vertical-align:top; text-align:right;">
        <span style="color:#b31b1b;font-weight:bold;">${item.salePrice}</span><br/>
        <span style="font-size:12px;color:#999;text-decoration:line-through;">${item.productPrice}</span><br/>
        <span style="font-size:11px;color:#888;">20% OFF</span>
      </td>
    </tr>
  `).join('');

  const storeEmailHtml = `
    <div style="font-family:Georgia,serif;max-width:640px;margin:0 auto;padding:32px;color:#201616;">
      <h2 style="font-size:22px;margin-bottom:4px;border-bottom:2px solid #b31b1b;padding-bottom:12px;">
        🛍️ Porosi e Re - Priestess of the Soul
      </h2>
      <p style="font-size:12px;color:#888;margin-top:4px;">Konfirmimi #${orderId} · ${new Date(createdAt).toLocaleString('sq-AL')}</p>

      <table style="width:100%;border-collapse:collapse;margin:20px 0;border:1px solid #eee;">
        <thead>
          <tr style="background:#f6f5e9;">
            <th style="padding:10px 16px;text-align:left;font-size:11px;text-transform:uppercase;letter-spacing:2px;color:#888;" colspan="2">Produkti</th>
            <th style="padding:10px 16px;text-align:right;font-size:11px;text-transform:uppercase;letter-spacing:2px;color:#888;">Çmimi</th>
          </tr>
        </thead>
        <tbody>${itemsHtml}</tbody>
      </table>

      <table style="width:100%;border-collapse:collapse;margin-bottom:24px;">
        <tr style="background:#f6f5e9;">
          <td style="padding:10px 16px;font-size:12px;text-transform:uppercase;letter-spacing:2px;color:#888;">Nëntotali</td>
          <td style="padding:10px 16px;text-align:right;font-weight:bold;">${total}</td>
        </tr>
        <tr>
          <td style="padding:10px 16px;font-size:12px;text-transform:uppercase;letter-spacing:2px;color:#888;">Kursim Total</td>
          <td style="padding:10px 16px;text-align:right;color:#22c55e;font-weight:bold;">−${savings}</td>
        </tr>
        <tr style="background:#201616;">
          <td style="padding:12px 16px;font-size:14px;font-weight:bold;color:#fffef2;">TOTALI</td>
          <td style="padding:12px 16px;text-align:right;font-size:18px;font-weight:bold;color:#fffef2;">${total}</td>
        </tr>
      </table>

      <table style="width:100%;border-collapse:collapse;margin-bottom:24px;">
        <tr style="background:#f6f5e9;">
          <td style="padding:10px 16px;font-size:12px;text-transform:uppercase;letter-spacing:2px;color:#888;">Emri</td>
          <td style="padding:10px 16px;">${fullName}</td>
        </tr>
        <tr>
          <td style="padding:10px 16px;font-size:12px;text-transform:uppercase;letter-spacing:2px;color:#888;">Kontakt</td>
          <td style="padding:10px 16px;">${contact}</td>
        </tr>
        <tr style="background:#f6f5e9;">
          <td style="padding:10px 16px;font-size:12px;text-transform:uppercase;letter-spacing:2px;color:#888;">Telefoni</td>
          <td style="padding:10px 16px;">${phone}</td>
        </tr>
        <tr>
          <td style="padding:10px 16px;font-size:12px;text-transform:uppercase;letter-spacing:2px;color:#888;">Adresa</td>
          <td style="padding:10px 16px;">${address}${postalCode ? ', ' + postalCode : ''} ${city}, ${country}</td>
        </tr>
        <tr style="background:#f6f5e9;">
          <td style="padding:10px 16px;font-size:12px;text-transform:uppercase;letter-spacing:2px;color:#888;">Pagesa</td>
          <td style="padding:10px 16px;">${paymentMethod}</td>
        </tr>
        <tr>
          <td style="padding:10px 16px;font-size:12px;text-transform:uppercase;letter-spacing:2px;color:#888;">Dërgesa</td>
          <td style="padding:10px 16px;">${shippingMethod}</td>
        </tr>
      </table>

      <p style="font-size:12px;color:#888;margin-top:32px;border-top:1px solid #eee;padding-top:16px;">
        Priestess of the Soul · priestessofthesoul.com
      </p>
    </div>
  `;

  // Customer confirmation email
  const customerEmailHtml = `
    <div style="font-family:Georgia,serif;max-width:640px;margin:0 auto;padding:32px;color:#201616;">
      <h2 style="font-size:22px;margin-bottom:4px;">Faleminderit, ${firstName || fullName}!</h2>
      <p style="font-size:12px;color:#888;margin-top:4px;">Konfirmimi #${orderId}</p>

      <div style="background:#f9f9f7;border:1px solid #eee;border-radius:6px;padding:20px;margin:20px 0;">
        <h3 style="font-size:15px;margin:0 0 12px 0;">Porosia juaj është konfirmuar ✓</h3>
        <p style="font-size:13px;line-height:1.7;margin:0;color:#444;">
          Pakot procesohen brenda 3 ditëve.<br/>
          Pagesa kryhet me para në dorë (Cash on Delivery) te korrieri.<br/>
          Pakon duhet ta hapni dhe ta kontrolloni para korrierit.<br/><br/>
          Faleminderit që keni zgjedhur Priestess of the Soul! 🌹❤️
        </p>
      </div>

      <table style="width:100%;border-collapse:collapse;margin:20px 0;border:1px solid #eee;">
        <thead>
          <tr style="background:#f6f5e9;">
            <th style="padding:10px 16px;text-align:left;font-size:11px;text-transform:uppercase;letter-spacing:2px;color:#888;" colspan="2">Produkti</th>
            <th style="padding:10px 16px;text-align:right;font-size:11px;text-transform:uppercase;letter-spacing:2px;color:#888;">Çmimi</th>
          </tr>
        </thead>
        <tbody>${itemsHtml}</tbody>
      </table>

      <div style="text-align:right;font-size:16px;font-weight:bold;margin:12px 0;">
        Totali: ${total}
        <span style="font-size:12px;color:#22c55e;font-weight:normal;display:block;">Kursim: −${savings}</span>
      </div>

      <div style="margin:20px 0;padding:16px;background:#f6f5e9;border-radius:6px;">
        <h3 style="font-size:13px;margin:0 0 8px 0;text-transform:uppercase;letter-spacing:2px;color:#888;">Adresa e dërgimit</h3>
        <p style="font-size:13px;margin:0;line-height:1.6;">
          ${fullName}<br/>
          ${address}${postalCode ? '<br/>' + postalCode : ''} ${city}<br/>
          ${country}<br/>
          ${phone}
        </p>
      </div>

      <p style="font-size:12px;color:#888;margin-top:32px;border-top:1px solid #eee;padding-top:16px;">
        Priestess of the Soul · priestessofthesoul.com
      </p>
    </div>
  `;

  try {
    const emailPromises = [
      // Email to store owner
      fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          from: 'Priestess of the Soul <onboarding@resend.dev>',
          to: ['jonaberishaa@gmail.com'],
          subject: `🛍️ Porosi e Re #${orderId} - ${fullName} - ${total}`,
          html: storeEmailHtml,
        }),
      }),
    ];

    // Send confirmation to customer if email provided
    if (contact && contact.includes('@')) {
      emailPromises.push(
        fetch('https://api.resend.com/emails', {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            from: 'Priestess of the Soul <onboarding@resend.dev>',
            to: [contact],
            subject: `Konfirmimi i Porosisë #${orderId} - Priestess of the Soul`,
            html: customerEmailHtml,
          }),
        })
      );
    }

    const results = await Promise.allSettled(emailPromises);
    for (const r of results) {
      if (r.status === 'rejected') console.error('Email error:', r.reason);
    }

    return NextResponse.json({ success: true, orderId });
  } catch (err) {
    console.error('Order error:', err);
    return NextResponse.json({ error: 'Failed to process order' }, { status: 500 });
  }
}
