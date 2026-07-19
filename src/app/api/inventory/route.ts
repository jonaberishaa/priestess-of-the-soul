import { NextRequest, NextResponse } from 'next/server';
import { getInventory, setStock } from '@/lib/db';
import { requireAdmin } from '@/lib/auth';

export async function GET(req: NextRequest) {
  if (!requireAdmin(req)) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  const inventory = await getInventory();
  return NextResponse.json(inventory);
}

export async function POST(req: NextRequest) {
  if (!requireAdmin(req)) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  const { productId, stock } = await req.json();
  if (!productId || typeof stock !== 'number') {
    return NextResponse.json({ error: 'Missing productId or stock' }, { status: 400 });
  }
  await setStock(productId, stock);
  return NextResponse.json({ success: true, productId, stock: Math.max(0, stock) });
}
