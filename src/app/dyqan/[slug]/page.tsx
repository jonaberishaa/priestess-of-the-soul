'use client';

import { use, useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { products, salePrice } from '@/data/products';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { useWishlist } from '@/components/WishlistContext';

const RING_SIZES = [
  'EU 10 / US 5 / 50mm',
  'EU 12 / US 6 / 52mm',
  'EU 14 / US 6.5 / 54mm',
  'EU 16 / US 7.5 / 56mm',
  'EU 17 / US 8 / 57mm',
  'EU 18 / US 8.5 / 58mm',
  'EU 20 / US 9.5 / 60mm',
  'EU 22 / US 10.5 / 62mm',
];

type OrderForm = { name: string; email: string; phone: string; address: string; size: string };

export default function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = use(params);
  const product = products.find((p) => p.id === slug);
  if (!product) notFound();

  const isRing = product.type === 'Unaza';
  const related = products.filter((p) => p.type === product.type && p.id !== product.id).slice(0, 4);

  const { toggle, has } = useWishlist();
  const wishlisted = has(product.id);

  const [modalOpen, setModalOpen] = useState(false);
  const [form, setForm] = useState<OrderForm>({ name: '', email: '', phone: '', address: '', size: '' });
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle');

  const closeModal = () => { setModalOpen(false); setStatus('idle'); };

  const handleOrder = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isRing && !form.size) { alert('Ju lutem zgjidhni madhësinë e unazës.'); return; }
    setStatus('sending');
    try {
      const res = await fetch('/api/order', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ productName: product.name, productPrice: product.price, ...form }),
      });
      setStatus(res.ok ? 'sent' : 'error');
    } catch {
      setStatus('error');
    }
  };

  const waText = encodeURIComponent(
    `Përshëndetje! Jam e interesuar për: ${product.name} (${product.price})${isRing && form.size ? ` — Madhësia: ${form.size}` : ''}`
  );

  return (
    <>
      <Header />
      <main className="bg-cream min-h-screen">
        <div className="max-w-content mx-auto px-6 py-4 text-xs text-stone flex gap-2">
          <Link href="/" className="hover:text-burgundy transition-colors">Kreu</Link>
          <span>/</span>
          <Link href="/dyqan" className="hover:text-burgundy transition-colors">Dyqan</Link>
          <span>/</span>
          <span className="text-brown">{product.name}</span>
        </div>

        <div className="max-w-content mx-auto px-6 py-10 grid grid-cols-1 lg:grid-cols-2 gap-16">
          <div className="aspect-square relative bg-cream-warm border border-stone-light/20 overflow-hidden">
            <Image src={product.image} alt={product.name} fill className="object-cover" priority />
          </div>

          <div className="flex flex-col justify-center">
            <p className="text-xs tracking-[0.3em] uppercase text-gold mb-3">{product.type}</p>
            <h1 className="font-heading text-4xl md:text-5xl text-brown mb-4">{product.name}</h1>
            <div className="flex items-center gap-3 mb-2">
              <p className="text-3xl font-bold text-[#b31b1b]">{salePrice(product.price)}</p>
              <p className="text-xl text-stone/50 line-through">{product.price}</p>
              <span className="bg-[#b31b1b] text-[#fffef2] text-[10px] font-bold tracking-widest uppercase px-2 py-1">−20%</span>
            </div>
            <p className="text-xs text-[#201616]/50 font-body mb-4">✦ Dërgesa Falas</p>
            <p className="text-stone leading-relaxed mb-8">{product.description}</p>

            {isRing && (
              <div className="mb-6">
                <p className="text-[10px] tracking-widest uppercase text-[#201616]/50 mb-3">Madhësia e Unazës</p>
                <div className="flex flex-wrap gap-2">
                  {RING_SIZES.map((s) => (
                    <button key={s} onClick={() => setForm((f) => ({ ...f, size: s }))}
                      className={`px-3 py-1.5 text-xs border transition-colors ${form.size === s ? 'bg-[#201616] text-[#fffef2] border-[#201616]' : 'border-[#201616]/30 text-[#201616] hover:border-[#201616]'}`}>
                      {s}
                    </button>
                  ))}
                </div>
              </div>
            )}

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

            <div className="border-t border-stone-light/20 pt-6 flex flex-col gap-3 text-sm text-stone">
              <p>✦ Argjend 925 me veshje ar 14K–18K</p>
              <p>✦ Gurë natyralë të çmuar</p>
              <p>✦ Çdo copë artizanale dhe unike</p>
              <p>✦ Dërgesë brenda 3–5 ditëve pune</p>
            </div>
          </div>
        </div>

        {related.length > 0 && (
          <section className="bg-cream-warm py-16 px-6">
            <div className="max-w-content mx-auto">
              <h2 className="font-heading text-3xl text-brown mb-8">Mund të të Pëlqejnë</h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                {related.map((p) => (
                  <Link key={p.id} href={`/dyqan/${p.id}`} className="group">
                    <div className="aspect-square relative bg-cream border border-stone-light/20 mb-3 overflow-hidden group-hover:border-gold transition-colors">
                      <Image src={p.image} alt={p.name} fill className="object-cover group-hover:scale-105 transition-transform duration-500" sizes="25vw" />
                    </div>
                    <h3 className="font-heading text-base text-brown group-hover:text-burgundy transition-colors">{p.name}</h3>
                    <p className="text-burgundy text-sm mt-1">{p.price}</p>
                  </Link>
                ))}
              </div>
            </div>
          </section>
        )}
      </main>
      <Footer />

      {modalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-[#201616]/50" onClick={closeModal}>
          <div className="bg-[#fffffc] w-full max-w-md p-8 overflow-y-auto max-h-[90vh]" onClick={(e) => e.stopPropagation()}>
            {status === 'sent' ? (
              <div className="text-center py-8">
                <p className="font-heading text-3xl text-brown mb-3">Faleminderit!</p>
                <p className="text-stone text-sm font-body mb-6">Porosia juaj u dërgua. Do t&apos;ju kontaktojmë së shpejti.</p>
                <button onClick={closeModal} className="btn-primary">Mbyll</button>
              </div>
            ) : (
              <>
                <div className="flex items-start justify-between mb-6">
                  <div>
                    <p className="text-[10px] tracking-widest uppercase text-[#201616]/40 mb-1">Porosit</p>
                    <h2 className="font-heading text-2xl text-brown">{product.name}</h2>
                    <div className="flex items-center gap-2 mt-1">
                      <p className="text-[#b31b1b] text-sm font-bold">{salePrice(product.price)}</p>
                      <p className="text-stone/50 text-xs line-through">{product.price}</p>
                    </div>
                    {isRing && form.size && <p className="text-[#201616]/50 text-xs mt-1">Madhësia: {form.size}</p>}
                  </div>
                  <button onClick={closeModal} className="text-[#201616]/30 hover:text-[#201616] text-xl leading-none mt-1">✕</button>
                </div>
                <form onSubmit={handleOrder} className="flex flex-col gap-4">
                  {isRing && !form.size && (
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
