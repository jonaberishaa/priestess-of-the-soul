import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  const { email } = await req.json();
  if (!email || !email.includes('@')) {
    return NextResponse.json({ error: 'Email i pavlefshëm' }, { status: 400 });
  }

  try {
    const res = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: 'Priestess of the Soul <onboarding@resend.dev>',
        to: ['jonaberishaa@gmail.com'],
        subject: `📧 Abonues i Ri: ${email}`,
        html: `<p style="font-family:Georgia,serif;color:#201616;">
          <strong>Abonues i ri:</strong> ${email}<br/><br/>
          Ky person u abonua në listën e njoftimeve të Priestess of the Soul.
        </p>`,
      }),
    });

    if (!res.ok) {
      const err = await res.text();
      console.error('Resend error:', err);
      return NextResponse.json({ error: 'Gabim gjatë dërgimit' }, { status: 500 });
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error('Newsletter error:', err);
    return NextResponse.json({ error: 'Gabim gjatë dërgimit' }, { status: 500 });
  }
}
