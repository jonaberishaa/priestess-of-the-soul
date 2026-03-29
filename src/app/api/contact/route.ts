import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(req: NextRequest) {
  const { name, email, message } = await req.json();
  if (!name || !email || !message) return NextResponse.json({ error: 'Missing fields' }, { status: 400 });

  try {
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS },
    });
    await transporter.sendMail({
      from: `"Priestess of the Soul" <${process.env.SMTP_USER}>`,
      to: 'jonaberishaa@gmail.com',
      replyTo: email,
      subject: `✉️ Mesazh i Ri nga ${name}`,
      html: `<p><strong>Emri:</strong> ${name}</p><p><strong>Email:</strong> ${email}</p><p><strong>Mesazhi:</strong><br>${message.replace(/\n/g, '<br>')}</p>`,
    });
    return NextResponse.json({ success: true });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: 'Failed' }, { status: 500 });
  }
}
