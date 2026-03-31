import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(req: NextRequest) {
  const { email } = await req.json();
  if (!email) return NextResponse.json({ error: 'Missing email' }, { status: 400 });

  try {
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS },
    });
    await transporter.sendMail({
      from: `"Priestess of the Soul" <${process.env.SMTP_USER}>`,
      to: 'jonaberishaa@gmail.com',
      subject: `💌 Abonues i Ri - ${email}`,
      html: `<p>Një person i ri u abonua në listën tuaj:</p><p><strong>${email}</strong></p>`,
    });
    return NextResponse.json({ success: true });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: 'Failed' }, { status: 500 });
  }
}
