import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(req: NextRequest) {
  try {
    const { customer, items, total } = await req.json();

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    const itemsHtml = items
      .map(
        (item: { name: string; price: string; quantity: number }) => `
        <tr>
          <td style="padding:10px 12px;border-bottom:1px solid #f0ebe0;">${item.name}</td>
          <td style="padding:10px 12px;border-bottom:1px solid #f0ebe0;text-align:center;">${item.quantity}</td>
          <td style="padding:10px 12px;border-bottom:1px solid #f0ebe0;">${item.price}</td>
        </tr>`
      )
      .join('');

    const html = `
      <div style="font-family:Georgia,serif;max-width:620px;margin:0 auto;background:#fffef2;border:1px solid #f0ebe0;">
        <div style="background:#8B1A1A;padding:28px 36px;">
          <h1 style="color:#fff;margin:0;font-size:26px;letter-spacing:2px;">✦ POROSI E RE</h1>
          <p style="color:rgba(255,255,255,0.7);margin:6px 0 0;font-size:13px;">Priestess of the Soul</p>
        </div>

        <div style="padding:36px;">
          <h2 style="font-size:13px;letter-spacing:3px;text-transform:uppercase;color:#8B1A1A;margin:0 0 20px;">Të dhënat e klientit</h2>
          <table style="width:100%;border-collapse:collapse;margin-bottom:36px;">
            <tr>
              <td style="color:#8C8070;padding:5px 0;width:140px;font-size:13px;">Emri:</td>
              <td style="color:#201616;font-size:13px;">${customer.firstName} ${customer.lastName}</td>
            </tr>
            <tr>
              <td style="color:#8C8070;padding:5px 0;font-size:13px;">Email:</td>
              <td style="color:#201616;font-size:13px;">${customer.email}</td>
            </tr>
            <tr>
              <td style="color:#8C8070;padding:5px 0;font-size:13px;">Telefoni:</td>
              <td style="color:#201616;font-size:13px;">${customer.phone}</td>
            </tr>
            <tr>
              <td style="color:#8C8070;padding:5px 0;font-size:13px;">Adresa:</td>
              <td style="color:#201616;font-size:13px;">${customer.address}</td>
            </tr>
          </table>

          <h2 style="font-size:13px;letter-spacing:3px;text-transform:uppercase;color:#8B1A1A;margin:0 0 16px;">Produktet</h2>
          <table style="width:100%;border-collapse:collapse;margin-bottom:24px;">
            <thead>
              <tr style="background:#F5F0E8;">
                <th style="padding:10px 12px;text-align:left;font-size:11px;letter-spacing:2px;text-transform:uppercase;color:#8C8070;">Produkt</th>
                <th style="padding:10px 12px;text-align:center;font-size:11px;letter-spacing:2px;text-transform:uppercase;color:#8C8070;">Sasia</th>
                <th style="padding:10px 12px;text-align:left;font-size:11px;letter-spacing:2px;text-transform:uppercase;color:#8C8070;">Çmimi</th>
              </tr>
            </thead>
            <tbody>${itemsHtml}</tbody>
          </table>

          <div style="background:#8B1A1A;padding:16px 20px;display:flex;justify-content:space-between;">
            <span style="color:#fff;font-size:14px;letter-spacing:2px;text-transform:uppercase;">Totali</span>
            <span style="color:#fff;font-size:16px;font-weight:bold;">${total}</span>
          </div>
        </div>
      </div>
    `;

    await transporter.sendMail({
      from: `"Priestess of the Soul" <${process.env.SMTP_USER}>`,
      to: 'jonaberishaa@gmail.com',
      subject: `✦ Porosi e Re — ${customer.firstName} ${customer.lastName}`,
      html,
    });

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error('Order email error:', err);
    return NextResponse.json({ error: 'Failed to send order' }, { status: 500 });
  }
}
