import { NextRequest, NextResponse } from 'next/server';
import { ADMIN_SESSION_COOKIE, createSessionToken, safeCompare } from '@/lib/auth';

export async function POST(req: NextRequest) {
  const validUser = process.env.ADMIN_USERNAME;
  const validPass = process.env.ADMIN_PASSWORD;
  if (!validUser || !validPass) {
    return NextResponse.json({ error: 'Admin login is not configured' }, { status: 500 });
  }

  const { username, password } = await req.json();
  if (
    typeof username !== 'string' ||
    typeof password !== 'string' ||
    !safeCompare(username, validUser) ||
    !safeCompare(password, validPass)
  ) {
    return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });
  }

  const res = NextResponse.json({ success: true });
  res.cookies.set(ADMIN_SESSION_COOKIE, createSessionToken(), {
    httpOnly: true,
    secure: true,
    sameSite: 'lax',
    path: '/',
    maxAge: 60 * 60 * 12,
  });
  return res;
}
