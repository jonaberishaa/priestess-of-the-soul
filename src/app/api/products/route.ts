import { NextResponse } from 'next/server';
import { products } from '@/data/products';
import { readJSON } from '@/lib/db';

export async function GET() {
  const inventory = readJSON<Record<string, number>>('inventory.json', {});
  const result = products.map((p) => ({
    ...p,
    stock: inventory[p.id] ?? 10,
    inStock: (inventory[p.id] ?? 10) > 0,
  }));
  return NextResponse.json(result);
}
