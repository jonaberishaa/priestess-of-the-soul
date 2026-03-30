import { NextRequest, NextResponse } from 'next/server';
import { readJSON, writeJSON } from '@/lib/db';

export async function GET() {
  const inventory = readJSON<Record<string, number>>('inventory.json', {});
  return NextResponse.json(inventory);
}

export async function POST(req: NextRequest) {
  const { productId, stock } = await req.json();
  if (!productId || typeof stock !== 'number') {
    return NextResponse.json({ error: 'Missing productId or stock' }, { status: 400 });
  }
  const inventory = readJSON<Record<string, number>>('inventory.json', {});
  inventory[productId] = Math.max(0, stock);
  writeJSON('inventory.json', inventory);
  return NextResponse.json({ success: true, productId, stock: inventory[productId] });
}
