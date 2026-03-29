'use client';

import { useState } from 'react';
import { salePrice } from '@/data/products';
import { useWishlist } from '@/components/WishlistContext';
import type { Product } from '@/data/products';


const GIFT_MESSAGES = [
  'Krijuar për ty që shkel tokën si tempull dhe e jeton ditën si ceremoni.',
  'Nuk është thjesht një stoli, por një kujtim i hyjnisë brenda teje.',
  'Në çdo detaj ka një përkujtim – Ti ke qenë gjithmonë e shenjtë.',
  'Për një grua që nuk pranon të jetë e zakonshme – magji që ndriçon Hyjnoren në ty.',
  'Ti je art, rit dhe prani – kjo unazë flet për ty.',
  'Je gjithmonë me mua, edhe kur s\'jemi afër – ky aksesor është përqafim në një formë tjetër.',
  'Në çdo detaj, një kujtim i asaj që më bën me ndje kur të shoh.',
  'Ti je art i gjallë – dhe ky aksesor është një pasqyrim i bukur i shpirtit tënd.',
  'Për ty që mbart magjinë në çdo hap – kjo dhuratë është një kujtim i fuqisë tënde.',
  'Në këtë ditë të veçantë, uroj të të kujtohet sa e bukur, e shenjtë dhe e plotë që je.',
  'Një dhuratë e vogël, për një ditë të veçantë – uroj të ndjehesh ashtu siç je: e bukur dhe e çmuar.',
  'Gëzuar ditëlindjen, hyjneshë – Ti je një kujtim i bukurisë së vërtetë në këtë botë.',
  'Urime të përzemërta – elegancë për një shpirt të bukur.',
];

type OrderForm = { name: string; email: string; phone: string; address: string; size: string; message: string };

export default function ProductActions({ product }: { product: Product }) {
  const isRing = product.type === 'Unaza';
  const productSizes = isRing ? (product.sizes || []) : [];
  const { toggle, has } = useWishlist();
  const wishlisted = has(product.id);

  const [modalOpen, setModalOpen] = useState(false);
  const [form, setForm] = useState<OrderForm>({ name: '', email: '', phone: '', address: '', size: productSizes.length === 1 ? productSizes[0] : '', message: '' });
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle');

  const closeModal = () => { setModalOpen(false); setStatus('idle'); };

  const handleOrder = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isRing && productSizes.length > 0 && !form.size) { alert('Ju lutem zgjidhni madhësinë e unazës.'); return; }
    setStatus('sending');
    try {
      const res = await fetch('/api/order', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ productName: product.name, productPrice: salePrice(product.price), ...form, message: form.message || undefined }),
      });
      setStatus(res.ok ? 'sent' : 'error');
    } catch {
      setStatus('error');
    }
  };

  const waText = encodeURIComponent(
    `Përshëndetje! Jam e interesuar për: ${product.name} (${salePrice(product.price)})${isRing && form.size ? ` — Madhësia: ${form.size}` : ''}`
  );

  return (
    <>
      {/* Ring size picker */}
      {isRing && productSizes.length > 0 && (
        <div className="mb-6">
          <p className="text-[10px] tracking-widest uppercase text-[#201616]/50 mb-3">Madhësia e Unazës</p>
          <div className="flex flex-wrap gap-2">
            {productSizes.map((s) => (
              <button key={s} onClick={() => setForm((f) => ({ ...f, size: s }))}
                className={`px-3 py-1.5 text-xs border transition-colors ${form.size === s ? 'bg-[#201616] text-[#fffef2] border-[#201616]' : 'border-[#201616]/30 text-[#201616] hover:border-[#201616]'}`}>
                {s}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Gift message */}
      <div className="mb-6">
        <p className="text-[10px] tracking-widest uppercase text-[#201616]/50 mb-3">Mesazh Dhurate (opsional)</p>
        <div className="relative">
          <select
            value={form.message}
            onChange={(e) => setForm((f) => ({ ...f, message: e.target.value }))}
            className="w-full border border-[#201616]/20 bg-[#fffef2] px-4 py-2.5 text-sm text-[#201616] focus:outline-none focus:border-[#201616] font-body appearance-none pr-8"
          >
            <option value="">— Zgjidh mesazhin —</option>
            {GIFT_MESSAGES.map((msg) => (
              <option key={msg} value={msg}>{msg}</option>
            ))}
          </select>
          <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-[#201616]/40 text-xs">▾</span>
        </div>
        {form.message && (
          <p className="mt-2 text-xs text-[#201616]/60 font-body italic leading-relaxed">"{form.message}"</p>
        )}
      </div>

      {/* Buttons */}
      <div className="flex flex-col gap-3 mb-10">
        <button onClick={() => setModalOpen(true)} className="btn-primary text-center w-full">
          Porosit Tani
        </button>
        <div className="grid grid-cols-2 gap-3">
          <button onClick={() => toggle(product.id)}
            className={`flex items-center justify-center gap-2 border px-4 py-3 text-xs tracking-[0.25em] uppercase transition-colors ${wishlisted ? 'bg-[#b31b1b]/10 border-[#b31b1b] text-[#b31b1b]' : 'border-[#201616]/30 text-[#201616] hover:border-[#b31b1b] hover:text-[#b31b1b]'}`}>
            <svg className="w-4 h-4" fill={wishlisted ? 'currentColor' : 'none'} stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
            </svg>
            {wishlisted ? 'Në Wishlist' : 'Shto në Wishlist'}
          </button>
          <a href={`https://wa.me/38349646439?text=${waText}`} target="_blank" rel="noreferrer"
            className="flex items-center justify-center gap-2 border border-[#201616]/30 text-[#201616] px-4 py-3 text-xs tracking-[0.25em] uppercase hover:border-[#25d366] hover:text-[#25d366] transition-colors">
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
            </svg>
            WhatsApp
          </a>
        </div>
      </div>

      {/* Order modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-[#201616]/50" onClick={closeModal}>
          <div className="bg-[#fffffc] w-full max-w-md p-8 overflow-y-auto max-h-[90vh]" onClick={(e) => e.stopPropagation()}>
            {status === 'sent' ? (
              <div className="text-center py-8">
                <p className="font-heading text-3xl text-[#201616] mb-3">Faleminderit!</p>
                <p className="text-[#201616]/60 text-sm font-body mb-6">Porosia juaj u dërgua. Do t&apos;ju kontaktojmë së shpejti.</p>
                <button onClick={closeModal} className="btn-primary">Mbyll</button>
              </div>
            ) : (
              <>
                <div className="flex items-start justify-between mb-6">
                  <div>
                    <p className="text-[10px] tracking-widest uppercase text-[#201616]/40 mb-1">Porosit</p>
                    <h2 className="font-heading text-2xl text-[#201616]">{product.name}</h2>
                    <div className="flex items-center gap-2 mt-1">
                      <p className="text-[#b31b1b] text-sm font-bold">{salePrice(product.price)}</p>
                      <p className="text-[#201616]/40 text-xs line-through">{product.price}</p>
                    </div>
                    {isRing && form.size && <p className="text-[#201616]/50 text-xs mt-1">Madhësia: {form.size}</p>}
                    {form.message && <p className="text-[#201616]/50 text-xs mt-1 italic">"{form.message}"</p>}
                  </div>
                  <button onClick={closeModal} className="text-[#201616]/30 hover:text-[#201616] text-xl leading-none mt-1">✕</button>
                </div>
                <form onSubmit={handleOrder} className="flex flex-col gap-4">
                  {isRing && productSizes.length > 0 && !form.size && (
                    <p className="text-xs text-[#b31b1b] font-body">⚠ Zgjidhni madhësinë e unazës para se të porosisni.</p>
                  )}
                  {([
                    { key: 'name', label: 'Emri dhe Mbiemri', type: 'text' },
                    { key: 'email', label: 'Email', type: 'email' },
                    { key: 'phone', label: 'Numri i Telefonit', type: 'tel' },
                    { key: 'address', label: 'Adresa e Dorëzimit', type: 'text' },
                  ] as const).map(({ key, label, type }) => (
                    <div key={key}>
                      <label className="block text-[10px] tracking-widest uppercase text-[#201616]/50 mb-1.5 font-body">{label}</label>
                      <input type={type} required value={form[key]}
                        onChange={(e) => setForm((f) => ({ ...f, [key]: e.target.value }))}
                        className="w-full border border-[#201616]/20 bg-transparent px-4 py-2.5 text-sm text-[#201616] focus:outline-none focus:border-[#201616] font-body" />
                    </div>
                  ))}
                  <button type="submit" disabled={status === 'sending'} className="btn-primary text-center mt-2 disabled:opacity-50">
                    {status === 'sending' ? 'Duke dërguar...' : 'Konfirmo Porosinë'}
                  </button>
                  {status === 'error' && <p className="text-[#b31b1b] text-xs text-center font-body">Diçka shkoi keq. Provo me WhatsApp.</p>}
                </form>
              </>
            )}
          </div>
        </div>
      )}
    </>
  );
}
