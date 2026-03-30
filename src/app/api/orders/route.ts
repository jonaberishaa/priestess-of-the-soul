import { NextRequest, NextResponse } from 'next/server';
import { readJSON, writeJSON } from '@/lib/db';

export async function GET() {
  const orders = readJSON('orders.json', []);
  return NextResponse.json(orders);
}

export async function PATCH(req: NextRequest) {
  const { orderId, status } = await req.json();
  if (!orderId || !status) {
    return NextResponse.json({ error: 'Missing orderId or status' }, { status: 400 });
  }
  const orders = readJSON<Array<{ orderId: string; status: string }>>('orders.json', []);
  const idx = orders.findIndex((o) => o.orderId === orderId);
  if (idx === -1) {
    return NextResponse.json({ error: 'Order not found' }, { status: 404 });
  }
  orders[idx].status = status;
  writeJSON('orders.json', orders);
  return NextResponse.json({ success: true });
}
