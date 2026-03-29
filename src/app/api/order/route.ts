import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(req: NextRequest) {
  const body = await req.json();
  const { productName, productPrice, name, email, phone, address, size, message } = body;

  if (!name || !email || !phone || !address || !productName) {
    return NextResponse.json({ error: 'Missing fields' }, { status: 400 });
  }

  try {
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    await transporter.sendMail({
      from: `"Priestess of the Soul" <${process.env.SMTP_USER}>`,
      to: 'jonaberishaa@gmail.com',
      subject: `🛍️ Porosi e Re: ${productName}`,
      html: `
        <div style="font-family: Georgia, serif; max-width: 600px; margin: 0 auto; padding: 32px; color: #201616;">
          <h2 style="font-size: 24px; margin-bottom: 24px; border-bottom: 1px solid #eee; padding-bottom: 16px;">
            Porosi e Re — Priestess of the Soul
          </h2>
          <table style="width:100%; border-collapse: collapse; margin-bottom: 24px;">
            <tr style="background:#f6f5e9"><td style="padding:10px 14px; font-size:12px; text-transform:uppercase; letter-spacing:2px; color:#888;">Produkti</td><td style="padding:10px 14px; font-weight:bold;">${productName}</td></tr>
            <tr><td style="padding:10px 14px; font-size:12px; text-transform:uppercase; letter-spacing:2px; color:#888;">Çmimi</td><td style="padding:10px 14px; color:#b31b1b; font-weight:bold;">${productPrice}</td></tr>
            ${size ? `<tr style="background:#f6f5e9"><td style="padding:10px 14px; font-size:12px; text-transform:uppercase; letter-spacing:2px; color:#888;">Madhësia</td><td style="padding:10px 14px;">${size}</td></tr>` : ''}
            <tr${size ? '' : ' style="background:#f6f5e9"'}><td style="padding:10px 14px; font-size:12px; text-transform:uppercase; letter-spacing:2px; color:#888;">Emri</td><td style="padding:10px 14px;">${name}</td></tr>
            <tr${size ? ' style="background:#f6f5e9"' : ''}><td style="padding:10px 14px; font-size:12px; text-transform:uppercase; letter-spacing:2px; color:#888;">Email</td><td style="padding:10px 14px;">${email}</td></tr>
            <tr${size ? '' : ' style="background:#f6f5e9"'}><td style="padding:10px 14px; font-size:12px; text-transform:uppercase; letter-spacing:2px; color:#888;">Telefoni</td><td style="padding:10px 14px;">${phone}</td></tr>
            <tr${size ? ' style="background:#f6f5e9"' : ''}><td style="padding:10px 14px; font-size:12px; text-transform:uppercase; letter-spacing:2px; color:#888;">Adresa</td><td style="padding:10px 14px;">${address}</td></tr>
            ${message ? `<tr style="background:#f6f5e9"><td style="padding:10px 14px; font-size:12px; text-transform:uppercase; letter-spacing:2px; color:#888;">Mesazh Dhurate</td><td style="padding:10px 14px; font-style:italic;">${message}</td></tr>` : ''}
          </table>
          <p style="font-size:12px; color:#888; margin-top:32px;">Priestess of the Soul · priestessofthesoul.com</p>
        </div>
      `,
    });

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error('Email error:', err);
    return NextResponse.json({ error: 'Failed to send email' }, { status: 500 });
  }
}
