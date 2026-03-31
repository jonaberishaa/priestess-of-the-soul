import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';
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
    <div style="font-family:Georgia,serif;max-width:640px;margin:0 auto;padding:32px;color:#201616;background:#f6f5e9;">

      <!-- Header -->
      <div style="text-align:center;padding:32px 0 24px;">
        <div style="display:inline-block;border:2px solid #b31b1b;width:48px;height:48px;line-height:44px;font-size:22px;color:#b31b1b;margin-bottom:16px;">✓</div>
        <p style="font-size:10px;letter-spacing:3px;text-transform:uppercase;color:#999;margin:0 0 6px;">Konfirmimi #${orderId}</p>
        <h1 style="font-size:28px;margin:0 0 8px;">Faleminderit, ${firstName || fullName}!</h1>
        <p style="font-size:13px;color:#888;margin:0;">Porosia juaj u mor me sukses. Do të kontaktoheni së shpejti.</p>
      </div>

      <!-- Products -->
      <div style="background:#fffffc;border:1px solid #e5e0d5;padding:24px;margin-bottom:16px;">
        <p style="font-size:10px;letter-spacing:3px;text-transform:uppercase;color:#999;margin:0 0 16px;">Produktet</p>
        <table style="width:100%;border-collapse:collapse;">
          <thead>
            <tr style="background:#f6f5e9;">
              <th style="padding:8px 12px;text-align:left;font-size:10px;text-transform:uppercase;letter-spacing:2px;color:#999;" colspan="2">Produkti</th>
              <th style="padding:8px 12px;text-align:right;font-size:10px;text-transform:uppercase;letter-spacing:2px;color:#999;">Çmimi</th>
            </tr>
          </thead>
          <tbody>${itemsHtml}</tbody>
        </table>
        <div style="text-align:right;margin-top:16px;padding-top:12px;border-top:1px solid #eee;">
          <span style="font-size:14px;font-weight:bold;">Totali: ${total}</span><br/>
          <span style="font-size:12px;color:#888;">Kursim: ${savings}</span>
        </div>
      </div>

      <!-- Address -->
      <div style="background:#fffffc;border:1px solid #e5e0d5;padding:24px;margin-bottom:16px;">
        <p style="font-size:10px;letter-spacing:3px;text-transform:uppercase;color:#999;margin:0 0 12px;">Adresa e Dërgimit</p>
        <p style="font-size:13px;margin:0;line-height:1.8;color:#201616;">
          ${fullName}<br/>
          ${address}${postalCode ? ', ' + postalCode : ''} ${city}<br/>
          ${country}<br/>
          ${phone}
        </p>
        <p style="font-size:10px;letter-spacing:3px;text-transform:uppercase;color:#999;margin:16px 0 4px;">Pagesa</p>
        <p style="font-size:13px;margin:0;color:#201616;">Cash on Delivery (COD) · ${total}</p>
      </div>

      <!-- Rules -->
      <div style="background:#fffffc;border:1px solid #e5e0d5;padding:24px;margin-bottom:16px;">
        <p style="font-size:10px;letter-spacing:3px;text-transform:uppercase;color:#999;margin:0 0 4px;">Para Dorëzimit</p>
        <h2 style="font-size:18px;margin:0 0 20px;color:#201616;">Porosia juaj është konfirmuar</h2>
        <table style="width:100%;border-collapse:collapse;">
          ${[
            'Pakot procesohen brenda 3 ditëve.',
            'Pagesa kryhet me para në dorë (COD) drejtpërdrejt te korrieri.',
            'Hape dhe kontrollo pakon para se të largohet korrieri.',
            'Dëmtimet raportohen menjëherë. Pas largimit të korrierit nuk pranohen.',
            'Nuk pranohen ndrrrime apo kthime, përveç rastit kur produkti është i dëmtuar nga fabrika.',
            'Kostot e postës paguhen nga klienti në rast kthimi për defekt fabrike.',
          ].map((rule, i) => `
            <tr>
              <td style="padding:8px 12px 8px 0;vertical-align:top;width:28px;">
                <span style="display:inline-block;width:22px;height:22px;border:1px solid #b31b1b;color:#b31b1b;font-size:10px;font-weight:bold;text-align:center;line-height:22px;">${i + 1}</span>
              </td>
              <td style="padding:8px 0;font-size:13px;color:#555;line-height:1.6;">${rule}</td>
            </tr>
          `).join('')}
        </table>
        <p style="font-size:12px;color:#999;margin:16px 0 0;padding-top:16px;border-top:1px solid #eee;font-style:italic;">
          Faleminderit që keni zgjedhur Priestess of the Soul! 🌹
        </p>
      </div>

      <!-- Footer -->
      <p style="font-size:11px;color:#aaa;text-align:center;margin-top:24px;">
        Priestess of the Soul · priestessofthesoul.com
      </p>
    </div>
  `;

  try {
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS },
    });

    // Email to store owner
    await transporter.sendMail({
      from: `"Priestess of the Soul" <${process.env.SMTP_USER}>`,
      to: 'jonaberishaa@gmail.com',
      subject: `🛍️ Porosi e Re #${orderId} - ${fullName} - ${total}`,
      html: storeEmailHtml,
    });

    // Confirmation email to customer if they provided an email
    if (contact && contact.includes('@')) {
      transporter.sendMail({
        from: `"Priestess of the Soul" <${process.env.SMTP_USER}>`,
        to: contact,
        subject: `Konfirmimi i Porosisë #${orderId} - Priestess of the Soul`,
        html: customerEmailHtml,
      }).catch((err) => console.error('Customer email error:', err));
    }

    return NextResponse.json({ success: true, orderId });
  } catch (err) {
    console.error('Order error:', err);
    return NextResponse.json({ error: 'Failed to process order' }, { status: 500 });
  }
}
