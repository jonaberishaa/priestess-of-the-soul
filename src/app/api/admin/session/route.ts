import { NextRequest, NextResponse } from 'next/server';
import { requireAdmin } from '@/lib/auth';

export async function GET(req: NextRequest) {
  return NextResponse.json({ authed: requireAdmin(req) });
}
