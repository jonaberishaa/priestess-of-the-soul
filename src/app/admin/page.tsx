'use client';

import { useEffect, useState } from 'react';
import { products } from '@/data/products';
import { salePrice } from '@/data/products';

type Order = {
  orderId: string;
  createdAt: string;
  contact: string;
  firstName: string;
  lastName: string;
  address: string;
  city: string;
  country: string;
  phone: string;
  items: Array<{
    productName: string;
    salePrice: string;
    size?: string;
    quantity: number;
  }>;
  total: string;
  status: string;
};

const STATUS_COLORS: Record<string, string> = {
  pending: 'bg-yellow-100 text-yellow-800',
  confirmed: 'bg-blue-100 text-blue-800',
  shipped: 'bg-purple-100 text-purple-800',
  delivered: 'bg-green-100 text-green-800',
  cancelled: 'bg-red-100 text-red-800',
};

const STATUS_LABELS: Record<string, string> = {
  pending: 'Në pritje',
  confirmed: 'Konfirmuar',
  shipped: 'Dërguar',
  delivered: 'Dorëzuar',
  cancelled: 'Anuluar',
};

export default function AdminPage() {
  const [tab, setTab] = useState<'orders' | 'inventory'>('orders');
  const [orders, setOrders] = useState<Order[]>([]);
  const [inventory, setInventory] = useState<Record<string, number>>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([
      fetch('/api/orders').then((r) => r.json()),
      fetch('/api/inventory').then((r) => r.json()),
    ]).then(([ord, inv]) => {
      setOrders(ord);
      setInventory(inv);
      setLoading(false);
    });
  }, []);

  const updateStatus = async (orderId: string, status: string) => {
    await fetch('/api/orders', {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ orderId, status }),
    });
    setOrders((prev) =>
      prev.map((o) => (o.orderId === orderId ? { ...o, status } : o))
    );
  };

  const updateStock = async (productId: string, stock: number) => {
    await fetch('/api/inventory', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ productId, stock }),
    });
    setInventory((prev) => ({ ...prev, [productId]: stock }));
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#f5f5f5] flex items-center justify-center">
        <p className="text-[#201616]/50 font-body">Duke ngarkuar...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f5f5f5]">
      {/* Header */}
      <div className="bg-[#201616] text-[#fffef2] px-8 py-4 flex items-center justify-between">
        <h1 className="font-heading text-2xl">Priestess of the Soul · Admin</h1>
        <a href="/" className="text-xs text-[#fffef2]/60 hover:text-[#fffef2] font-body">← Kthehu</a>
      </div>

      {/* Stats */}
      <div className="max-w-[1200px] mx-auto px-6 py-6 grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: 'Gjithsej Porosi', value: orders.length },
          { label: 'Në Pritje', value: orders.filter((o) => o.status === 'pending').length },
          { label: 'Dorëzuara', value: orders.filter((o) => o.status === 'delivered').length },
          { label: 'Pa Stok', value: Object.values(inventory).filter((v) => v === 0).length },
        ].map((stat) => (
          <div key={stat.label} className="bg-white rounded border border-gray-200 p-4 text-center">
            <p className="text-3xl font-bold text-[#201616]">{stat.value}</p>
            <p className="text-xs text-[#201616]/50 font-body mt-1">{stat.label}</p>
          </div>
        ))}
      </div>

      {/* Tabs */}
      <div className="max-w-[1200px] mx-auto px-6">
        <div className="flex gap-1 mb-6">
          {(['orders', 'inventory'] as const).map((t) => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={`px-6 py-2.5 text-sm font-body tracking-wider uppercase transition-colors ${
                tab === t
                  ? 'bg-[#201616] text-[#fffef2]'
                  : 'bg-white text-[#201616]/60 hover:text-[#201616]'
              }`}
            >
              {t === 'orders' ? 'Porositë' : 'Inventari'}
            </button>
          ))}
        </div>

        {/* Orders tab */}
        {tab === 'orders' && (
          <div className="flex flex-col gap-4 pb-12">
            {orders.length === 0 ? (
              <p className="text-center text-[#201616]/40 font-body py-12">Nuk ka porosi ende.</p>
            ) : (
              orders.map((order) => (
                <div key={order.orderId} className="bg-white rounded border border-gray-200 p-5">
                  <div className="flex flex-wrap items-start justify-between gap-3 mb-3">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span className="font-heading text-lg text-[#201616]">#{order.orderId}</span>
                        <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold font-body ${STATUS_COLORS[order.status] || 'bg-gray-100 text-gray-600'}`}>
                          {STATUS_LABELS[order.status] || order.status}
                        </span>
                      </div>
                      <p className="text-xs text-[#201616]/50 font-body">
                        {new Date(order.createdAt).toLocaleString('sq-AL')} · {order.firstName} {order.lastName} · {order.city}, {order.country}
                      </p>
                      <p className="text-xs text-[#201616]/50 font-body">{order.contact} · {order.phone}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-heading text-xl text-[#b31b1b]">{order.total}</p>
                    </div>
                  </div>

                  {/* Items */}
                  <div className="mb-3 flex flex-col gap-1">
                    {order.items.map((item, i) => (
                      <p key={i} className="text-sm font-body text-[#201616]/80">
                        {item.quantity}× <strong>{item.productName}</strong>
                        {item.size ? ` - ${item.size}` : ''} - {item.salePrice}
                      </p>
                    ))}
                  </div>

                  {/* Status update */}
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-[#201616]/50 font-body">Statusi:</span>
                    <select
                      value={order.status}
                      onChange={(e) => updateStatus(order.orderId, e.target.value)}
                      className="text-xs border border-gray-200 rounded px-2 py-1 font-body text-[#201616] bg-white"
                    >
                      <option value="pending">Në pritje</option>
                      <option value="confirmed">Konfirmuar</option>
                      <option value="shipped">Dërguar</option>
                      <option value="delivered">Dorëzuar</option>
                      <option value="cancelled">Anuluar</option>
                    </select>
                  </div>
                </div>
              ))
            )}
          </div>
        )}

        {/* Inventory tab */}
        {tab === 'inventory' && (
          <div className="bg-white rounded border border-gray-200 overflow-hidden mb-12">
            <table className="w-full text-sm font-body">
              <thead>
                <tr className="bg-[#201616] text-[#fffef2]">
                  <th className="text-left px-5 py-3 text-xs uppercase tracking-wider">Produkti</th>
                  <th className="text-left px-5 py-3 text-xs uppercase tracking-wider">Tipi</th>
                  <th className="text-left px-5 py-3 text-xs uppercase tracking-wider">Çmimi</th>
                  <th className="text-center px-5 py-3 text-xs uppercase tracking-wider">Stoku</th>
                  <th className="text-center px-5 py-3 text-xs uppercase tracking-wider">Statusi</th>
                </tr>
              </thead>
              <tbody>
                {products.map((p, i) => {
                  const stock = inventory[p.id] ?? 10;
                  return (
                    <tr key={p.id} className={i % 2 === 0 ? 'bg-white' : 'bg-[#f9f9f7]'}>
                      <td className="px-5 py-3 font-medium text-[#201616]">{p.name}</td>
                      <td className="px-5 py-3 text-[#201616]/60">{p.type}</td>
                      <td className="px-5 py-3 text-[#b31b1b]">{salePrice(p.price)}</td>
                      <td className="px-5 py-3 text-center">
                        <input
                          type="number"
                          min={0}
                          value={stock}
                          onChange={(e) => updateStock(p.id, parseInt(e.target.value) || 0)}
                          className="w-16 border border-gray-300 rounded px-2 py-1 text-center text-[#201616] focus:outline-none focus:border-[#201616]"
                        />
                      </td>
                      <td className="px-5 py-3 text-center">
                        <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold ${stock > 0 ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                          {stock > 0 ? 'Në Stok' : 'Pa Stok'}
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
