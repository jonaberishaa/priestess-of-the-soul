import { NextRequest, NextResponse } from 'next/server';
import { getTransporter, STORE_EMAIL } from '@/lib/mailer';
import { escapeHtml } from '@/lib/escapeHtml';

export async function POST(req: NextRequest) {
  const { name, email, message } = await req.json();
  if (!name || !email || !message) return NextResponse.json({ error: 'Missing fields' }, { status: 400 });

  try {
    const transporter = getTransporter();
    await transporter.sendMail({
      from: `"Priestess of the Soul" <${process.env.SMTP_USER}>`,
      to: STORE_EMAIL,
      replyTo: email,
      subject: `✉️ Mesazh i Ri nga ${name}`,
      html: `<p><strong>Emri:</strong> ${escapeHtml(name)}</p><p><strong>Email:</strong> ${escapeHtml(email)}</p><p><strong>Mesazhi:</strong><br>${escapeHtml(message).replace(/\n/g, '<br>')}</p>`,
    });
    return NextResponse.json({ success: true });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: 'Failed' }, { status: 500 });
  }
}
