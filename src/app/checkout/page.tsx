'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { useCart } from '@/components/CartContext';
import { salePrice } from '@/data/products';

type Form = {
  email: string;
  firstName: string;
  lastName: string;
  address: string;
  apartment: string;
  postalCode: string;
  city: string;
  country: string;
  phone: string;
};

const EMPTY_FORM: Form = {
  email: '',
  firstName: '',
  lastName: '',
  address: '',
  apartment: '',
  postalCode: '',
  city: '',
  country: 'Kosovo',
  phone: '',
};

export default function CheckoutPage() {
  const router = useRouter();
  const { items, total, savings, count, clear, remove } = useCart();
  const [form, setForm] = useState<Form>(EMPTY_FORM);
  const [phonePrefix, setPhonePrefix] = useState('+383');
  const [status, setStatus] = useState<'idle' | 'sending' | 'error'>('idle');

  const COUNTRY_PREFIXES: Record<string, string> = {
    Kosovo: '+383',
    Albania: '+355',
    'North Macedonia': '+389',
  };

  const set = (k: keyof Form, v: string) =>
    setForm((f) => ({ ...f, [k]: v }));

  const subtotalNum = items.reduce((s, i) => {
    const p = parseFloat(salePrice(i.product.price).replace('€', ''));
    return s + p * i.quantity;
  }, 0);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (items.length === 0) return;
    setStatus('sending');
    try {
      const res = await fetch('/api/order', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contact: form.email,
          firstName: form.firstName,
          lastName: form.lastName,
          address: `${form.address}${form.apartment ? ', ' + form.apartment : ''}`,
          postalCode: form.postalCode,
          city: form.city,
          country: form.country,
          phone: `${phonePrefix}${form.phone}`,
          items: items.map((i) => ({
            productId: i.product.id,
            productName: i.product.name,
            productPrice: i.product.price,
            salePrice: salePrice(i.product.price),
            productImage: i.product.image,
            size: i.size,
            message: i.message,
            quantity: i.quantity,
          })),
          total,
          savings,
          paymentMethod: 'Cash on Delivery (COD)',
          shippingMethod: 'Transporti Falas',
        }),
      });

      if (res.ok) {
        const data = await res.json();
        clear();
        router.push(
          `/order-confirmation?orderId=${data.orderId}&firstName=${encodeURIComponent(form.firstName)}&email=${encodeURIComponent(form.email)}&address=${encodeURIComponent(form.address)}&city=${encodeURIComponent(form.city)}&country=${encodeURIComponent(form.country)}&postal=${encodeURIComponent(form.postalCode)}&phone=${encodeURIComponent(`${phonePrefix}${form.phone}`)}&total=${encodeURIComponent(total)}&lastName=${encodeURIComponent(form.lastName)}`
        );
      } else {
        setStatus('error');
      }
    } catch {
      setStatus('error');
    }
  };

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-[#f5f5f5] flex items-center justify-center">
        <div className="text-center">
          <p className="font-heading text-3xl text-[#201616] mb-3">Shporta është bosh</p>
          <p className="text-[#201616]/60 mb-6 font-body">Shto produkte për të vazhduar.</p>
          <Link href="/dyqan" className="btn-primary">Shiko Dyqanin</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f5f5f5]">
      {/* Top bar */}
      <div className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="max-w-[1100px] mx-auto flex items-center justify-between">
          <Link href="/" className="font-heading text-xl text-[#201616]">
            Priestess of the Soul
          </Link>
          <div className="flex items-center gap-1 text-[#201616]/40 text-xs font-body">
            <span>Shporta</span>
            <span className="mx-1">›</span>
            <span className="text-[#201616] font-semibold">Informacioni</span>
            <span className="mx-1">›</span>
            <span>Pagesa</span>
          </div>
        </div>
      </div>

      <div className="max-w-[1100px] mx-auto px-4 py-8 grid grid-cols-1 lg:grid-cols-[1fr_420px] gap-8">
        {/* Left: Form */}
        <form onSubmit={handleSubmit} className="flex flex-col gap-6">
          {/* Contact */}
          <section className="bg-white rounded border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-heading text-xl text-[#201616]">Kontakt</h2>
              <Link href="/kontakt" className="text-xs text-blue-600 hover:underline font-body">Kyçu</Link>
            </div>
            <input
              type="text"
              required
              placeholder="Email ose numri i telefonit celular"
              value={form.email}
              onChange={(e) => set('email', e.target.value)}
              className="w-full border border-gray-300 rounded px-4 py-3 text-sm text-[#201616] focus:outline-none focus:border-[#201616] font-body bg-[#f8f9fa]"
            />
          </section>

          {/* Delivery */}
          <section className="bg-white rounded border border-gray-200 p-6">
            <h2 className="font-heading text-xl text-[#201616] mb-4">Dërgesa</h2>
            <div className="flex flex-col gap-3">
              {/* Country */}
              <select
                value={form.country}
                onChange={(e) => {
                  set('country', e.target.value);
                  setPhonePrefix(COUNTRY_PREFIXES[e.target.value] ?? '+383');
                }}
                className="w-full border border-gray-300 rounded px-4 py-3 text-sm text-[#201616] focus:outline-none focus:border-[#201616] font-body bg-[#f8f9fa]"
              >
                <option value="Kosovo">Kosovo</option>
                <option value="Albania">Albania</option>
                <option value="North Macedonia">North Macedonia</option>
              </select>

              {/* Name row */}
              <div className="grid grid-cols-2 gap-3">
                <div className="relative">
                  <input
                    type="text"
                    required
                    placeholder="Emri"
                    value={form.firstName}
                    onChange={(e) => set('firstName', e.target.value)}
                    className="w-full border border-gray-300 rounded px-4 py-3 text-sm text-[#201616] focus:outline-none focus:border-[#201616] font-body bg-[#f8f9fa]"
                  />
                </div>
                <input
                  type="text"
                  required
                  placeholder="Mbiemri"
                  value={form.lastName}
                  onChange={(e) => set('lastName', e.target.value)}
                  className="w-full border border-gray-300 rounded px-4 py-3 text-sm text-[#201616] focus:outline-none focus:border-[#201616] font-body bg-[#f8f9fa]"
                />
              </div>

              {/* Address */}
              <input
                type="text"
                required
                placeholder="Adresa"
                value={form.address}
                onChange={(e) => set('address', e.target.value)}
                className="w-full border border-gray-300 rounded px-4 py-3 text-sm text-[#201616] focus:outline-none focus:border-[#201616] font-body bg-[#f8f9fa]"
              />
              <input
                type="text"
                required
                placeholder="Apartamenti / Kati"
                value={form.apartment}
                onChange={(e) => set('apartment', e.target.value)}
                className="w-full border border-gray-300 rounded px-4 py-3 text-sm text-[#201616] focus:outline-none focus:border-[#201616] font-body bg-[#f8f9fa]"
              />

              {/* Postal + City */}
              <div className="grid grid-cols-2 gap-3">
                <input
                  type="text"
                  required
                  placeholder="Kodi Postar"
                  value={form.postalCode}
                  onChange={(e) => set('postalCode', e.target.value)}
                  className="w-full border border-gray-300 rounded px-4 py-3 text-sm text-[#201616] focus:outline-none focus:border-[#201616] font-body bg-[#f8f9fa]"
                />
                <input
                  type="text"
                  required
                  placeholder="Qyteti"
                  value={form.city}
                  onChange={(e) => set('city', e.target.value)}
                  className="w-full border border-gray-300 rounded px-4 py-3 text-sm text-[#201616] focus:outline-none focus:border-[#201616] font-body bg-[#f8f9fa]"
                />
              </div>

              {/* Phone */}
              <div className="flex gap-0">
                <select
                  value={phonePrefix}
                  onChange={(e) => setPhonePrefix(e.target.value)}
                  className="border border-gray-300 rounded-l px-3 py-3 text-sm text-[#201616] focus:outline-none focus:border-[#201616] font-body bg-[#f8f9fa] border-r-0"
                >
                  <option value="+383">🇽🇰 +383</option>
                  <option value="+355">🇦🇱 +355</option>
                  <option value="+389">🇲🇰 +389</option>
                </select>
                <input
                  type="tel"
                  required
                  placeholder="Numri i telefonit"
                  value={form.phone}
                  onChange={(e) => set('phone', e.target.value)}
                  className="flex-1 border border-gray-300 rounded-r px-4 py-3 text-sm text-[#201616] focus:outline-none focus:border-[#201616] font-body bg-[#f8f9fa]"
                />
              </div>
            </div>
          </section>

          {/* Shipping method */}
          <section className="bg-white rounded border border-gray-200 p-6">
            <h2 className="font-heading text-xl text-[#201616] mb-4">Metoda e Dërgimit</h2>
            <div className="border-2 border-[#201616] rounded px-4 py-3 flex items-center justify-between bg-[#f0f0ee]">
              <div className="flex items-center gap-3">
                <div className="w-4 h-4 rounded-full border-2 border-[#201616] flex items-center justify-center">
                  <div className="w-2 h-2 rounded-full bg-[#201616]" />
                </div>
                <span className="text-sm font-body text-[#201616]">Transporti Falas</span>
              </div>
              <span className="text-sm font-bold text-[#201616]">FALAS</span>
            </div>
          </section>

          {/* Payment */}
          <section className="bg-white rounded border border-gray-200 p-6">
            <h2 className="font-heading text-xl text-[#201616] mb-1">Pagesa</h2>
            <p className="text-xs text-[#201616]/50 font-body mb-4">Të gjitha transaksionet janë të sigurta dhe të enkriptuara.</p>
            <div className="border-2 border-[#201616] rounded px-4 py-3 flex items-center gap-3 bg-[#f0f0ee]">
              <div className="w-4 h-4 rounded-full border-2 border-[#201616] flex items-center justify-center">
                <div className="w-2 h-2 rounded-full bg-[#201616]" />
              </div>
              <span className="text-sm font-body text-[#201616]">Cash on Delivery (COD)</span>
            </div>
          </section>

          {status === 'error' && (
            <p className="text-[#b31b1b] text-sm font-body text-center">
              Diçka shkoi keq. Provoni përsëri ose na kontaktoni në WhatsApp.
            </p>
          )}

          <button
            type="submit"
            disabled={status === 'sending'}
            className="w-full bg-[#201616] text-[#fffef2] py-4 text-sm tracking-[0.2em] uppercase font-body hover:bg-[#3a2828] transition-colors disabled:opacity-60"
          >
            {status === 'sending' ? 'Duke dërguar...' : 'Paguaj cash'}
          </button>
        </form>

        {/* Right: Order Summary */}
        <aside>
          <div className="bg-white rounded border border-gray-200 p-6 sticky top-6">
            {/* Items */}
            <div className="flex flex-col gap-4 mb-6">
              {items.map((item) => (
                <div key={`${item.product.id}-${item.size}`} className="flex items-start gap-3">
                  <div className="relative w-16 h-16 flex-shrink-0 border border-gray-200 rounded overflow-hidden bg-[#f5f0e8]">
                    <Image
                      src={item.product.image}
                      alt={item.product.name}
                      fill
                      className="object-cover"
                      sizes="64px"
                    />
                    <span className="absolute -top-1.5 -right-1.5 bg-[#201616] text-white text-[10px] w-5 h-5 rounded-full flex items-center justify-center font-bold">
                      {item.quantity}
                    </span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-[#201616] font-body leading-tight">{item.product.name}</p>
                    {item.size && <p className="text-xs text-[#201616]/60 font-body mt-0.5">{item.size}</p>}
                    {item.message && (
                      <p className="text-xs text-[#201616]/50 font-body mt-0.5 italic leading-tight">
                        Mesazhi: {item.message.substring(0, 60)}{item.message.length > 60 ? '…' : ''}
                      </p>
                    )}
                    <div className="flex items-center gap-1.5 mt-1">
                      <span className="text-xs text-[#201616]/40 line-through font-body">{item.product.price}</span>
                      <span className="text-[10px] text-[#201616]/50 font-body">20% OFF (−€{(parseFloat(item.product.price.replace('€','')) * 0.2 * item.quantity).toFixed(2).replace('.00','')})</span>
                    </div>
                  </div>
                  <div className="flex flex-col items-end gap-1">
                    <p className="text-sm font-bold text-[#201616] font-body">{salePrice(item.product.price)}</p>
                    <button
                      onClick={() => remove(item.product.id, item.size)}
                      className="text-[#201616]/25 hover:text-[#b31b1b] transition-colors text-xs font-body"
                      title="Hiq nga shporta"
                    >
                      ✕ Hiq
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <hr className="border-gray-200 mb-4" />

            {/* Totals */}
            <div className="flex flex-col gap-2 text-sm font-body">
              <div className="flex justify-between text-[#201616]/70">
                <span>Nëntotali · {count} {count === 1 ? 'artikull' : 'artikuj'}</span>
                <span>€{items.reduce((s, i) => s + parseFloat(salePrice(i.product.price).replace('€','')) * i.quantity, 0).toFixed(2).replace('.00','')}</span>
              </div>
              <div className="flex justify-between text-[#201616]/70">
                <span>Dërgesa</span>
                <span className="font-semibold text-green-600">FALAS</span>
              </div>
            </div>

            <hr className="border-gray-200 my-4" />

            <div className="flex justify-between items-baseline">
              <span className="font-heading text-lg text-[#201616]">Totali</span>
              <div className="text-right">
                <span className="text-xs text-[#201616]/50 font-body mr-1">EUR</span>
                <span className="font-heading text-2xl text-[#201616]">{total}</span>
              </div>
            </div>

            {savings !== '€0' && (
              <div className="mt-3 flex items-center gap-1.5 text-xs text-[#201616]/60 font-body">
                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
                </svg>
                <span className="font-semibold text-[#201616]">KURSIM TOTAL {savings}</span>
              </div>
            )}
          </div>
        </aside>
      </div>
    </div>
  );
}
