import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(req: NextRequest) {
  const { email } = await req.json();
  if (!email || !email.includes('@')) {
    return NextResponse.json({ error: 'Email i pavlefshëm' }, { status: 400 });
  }

  try {
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS },
    });

    await transporter.sendMail({
      from: `"Priestess of the Soul" <${process.env.SMTP_USER}>`,
      to: 'jonaberishaa@gmail.com',
      subject: `📧 Abonues i Ri: ${email}`,
      html: `<p style="font-family:Georgia,serif;color:#201616;">
        <strong>Abonues i ri:</strong> ${email}<br/><br/>
        Ky person u abonua në listën e njoftimeve të Priestess of the Soul.
      </p>`,
    });

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error('Newsletter error:', err);
    return NextResponse.json({ error: 'Gabim gjatë dërgimit' }, { status: 500 });
  }
}
