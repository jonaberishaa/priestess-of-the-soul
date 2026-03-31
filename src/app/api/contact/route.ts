import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  const { name, email, message } = await req.json();
  if (!name || !email || !message) return NextResponse.json({ error: 'Missing fields' }, { status: 400 });

  try {
    await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.RESEND_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: 'Priestess of the Soul <onboarding@resend.dev>',
        to: 'jonaberishaa@gmail.com',
        reply_to: email,
        subject: `✉️ Mesazh i Ri nga ${name}`,
        html: `<p><strong>Emri:</strong> ${name}</p><p><strong>Email:</strong> ${email}</p><p><strong>Mesazhi:</strong><br>${message.replace(/\n/g, '<br>')}</p>`,
      }),
    });
    return NextResponse.json({ success: true });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: 'Failed' }, { status: 500 });
  }
}
