'use client';
import { useState } from 'react';
import { useCart } from '@/context/CartContext';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Image from 'next/image';
import Link from 'next/link';

export default function CartPage() {
  const { items, removeItem, updateQty, clearCart } = useCart();
  const [step, setStep] = useState<'cart' | 'checkout' | 'success'>('cart');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [form, setForm] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
  });

  const total = items.reduce((sum, item) => {
    const price = parseFloat(item.price.replace(/[^0-9.,]/g, '').replace(',', '.'));
    return sum + (isNaN(price) ? 0 : price * item.quantity);
  }, 0);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const res = await fetch('/api/order', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          customer: form,
          items: items.map(i => ({ name: i.name, price: i.price, quantity: i.quantity })),
          total: `${total.toFixed(2)} €`,
        }),
      });

      if (!res.ok) throw new Error('send failed');
      clearCart();
      setStep('success');
    } catch {
      setError('Ndodhi një gabim. Ju lutem provoni përsëri ose na kontaktoni direkt.');
    } finally {
      setLoading(false);
    }
  };

  if (step === 'success') {
    return (
      <>
        <Header />
        <main className="min-h-screen bg-cream flex items-center justify-center px-6">
          <div className="text-center max-w-md">
            <div className="text-5xl mb-6 text-burgundy">✦</div>
            <h1 className="font-heading text-4xl text-brown mb-4">Faleminderit!</h1>
            <p className="text-stone leading-relaxed mb-8 font-body">
              Porosia juaj u dërgua me sukses. Do t&apos;ju kontaktojmë brenda 24 orësh për konfirmim.
            </p>
            <Link href="/dyqan" className="btn-primary inline-block">
              Vazhdo Blerjen
            </Link>
          </div>
        </main>
        <Footer />
      </>
    );
  }

  if (items.length === 0) {
    return (
      <>
        <Header />
        <main className="min-h-screen bg-cream flex items-center justify-center px-6">
          <div className="text-center max-w-md">
            <div className="text-5xl mb-6 text-stone">✦</div>
            <h1 className="font-heading text-4xl text-brown mb-4">Shporta është bosh</h1>
            <p className="text-stone mb-8 font-body">Shto produkte për të vazhduar.</p>
            <Link href="/dyqan" className="btn-primary inline-block">
              Shko te Dyqani
            </Link>
          </div>
        </main>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Header />
      <main className="min-h-screen bg-cream py-12 px-6">
        <div className="max-w-content mx-auto">

          {/* Steps indicator */}
          <div className="flex items-center gap-3 mb-10">
            <span className={`text-xs tracking-[0.2em] uppercase font-body ${step === 'cart' ? 'text-brown' : 'text-stone'}`}>
              Shporta
            </span>
            <span className="text-stone/40">→</span>
            <span className={`text-xs tracking-[0.2em] uppercase font-body ${step === 'checkout' ? 'text-brown' : 'text-stone'}`}>
              Detajet
            </span>
          </div>

          {step === 'cart' ? (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
              {/* Cart items */}
              <div className="lg:col-span-2 flex flex-col gap-0">
                {items.map((item, idx) => (
                  <div key={item.id} className={`flex gap-6 py-6 ${idx < items.length - 1 ? 'border-b border-stone/10' : ''}`}>
                    <div className="relative w-24 h-24 flex-shrink-0 bg-cream-warm overflow-hidden">
                      <Image src={item.image} alt={item.name} fill className="object-cover" sizes="96px" />
                    </div>
                    <div className="flex-1 flex flex-col justify-between">
                      <div>
                        <h3 className="font-heading text-lg text-brown">{item.name}</h3>
                        <p className="text-burgundy text-sm mt-1 font-body">{item.price}</p>
                      </div>
                      <div className="flex items-center gap-5">
                        <div className="flex items-center border border-stone/20">
                          <button
                            onClick={() => updateQty(item.id, item.quantity - 1)}
                            className="w-8 h-8 flex items-center justify-center text-stone hover:text-brown transition-colors"
                          >
                            −
                          </button>
                          <span className="w-8 text-center text-sm text-brown font-body">{item.quantity}</span>
                          <button
                            onClick={() => updateQty(item.id, item.quantity + 1)}
                            className="w-8 h-8 flex items-center justify-center text-stone hover:text-brown transition-colors"
                          >
                            +
                          </button>
                        </div>
                        <button
                          onClick={() => removeItem(item.id)}
                          className="text-xs tracking-widest uppercase text-stone hover:text-burgundy transition-colors font-body"
                        >
                          Hiq
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Order summary */}
              <div className="bg-cream-warm border border-stone/10 p-8 h-fit">
                <h2 className="font-heading text-2xl text-brown mb-6">Përmbledhja</h2>
                <div className="flex flex-col gap-2 mb-6">
                  {items.map(item => (
                    <div key={item.id} className="flex justify-between text-sm font-body">
                      <span className="text-stone">{item.name} × {item.quantity}</span>
                      <span className="text-brown">{item.price}</span>
                    </div>
                  ))}
                </div>
                <div className="border-t border-stone/20 pt-4 flex justify-between">
                  <span className="font-heading text-lg text-brown">Total</span>
                  <span className="font-heading text-lg text-brown">{total.toFixed(2)} €</span>
                </div>
                <button
                  onClick={() => setStep('checkout')}
                  className="btn-primary w-full text-center mt-8"
                >
                  Vazhdo me Porosinë →
                </button>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
              {/* Checkout form */}
              <form onSubmit={handleSubmit} className="lg:col-span-2 flex flex-col gap-6">
                <h2 className="font-heading text-3xl text-brown">Detajet e Porosisë</h2>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-xs tracking-[0.2em] uppercase text-stone mb-2 font-body">
                      Emri *
                    </label>
                    <input
                      required
                      value={form.firstName}
                      onChange={e => setForm({ ...form, firstName: e.target.value })}
                      placeholder="Emri juaj"
                      className="w-full border border-stone/20 bg-cream-warm px-4 py-3 text-sm text-brown placeholder:text-stone/40 focus:outline-none focus:border-burgundy font-body"
                    />
                  </div>
                  <div>
                    <label className="block text-xs tracking-[0.2em] uppercase text-stone mb-2 font-body">
                      Mbiemri *
                    </label>
                    <input
                      required
                      value={form.lastName}
                      onChange={e => setForm({ ...form, lastName: e.target.value })}
                      placeholder="Mbiemri juaj"
                      className="w-full border border-stone/20 bg-cream-warm px-4 py-3 text-sm text-brown placeholder:text-stone/40 focus:outline-none focus:border-burgundy font-body"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs tracking-[0.2em] uppercase text-stone mb-2 font-body">
                    Email *
                  </label>
                  <input
                    required
                    type="email"
                    value={form.email}
                    onChange={e => setForm({ ...form, email: e.target.value })}
                    placeholder="email@juaj.com"
                    className="w-full border border-stone/20 bg-cream-warm px-4 py-3 text-sm text-brown placeholder:text-stone/40 focus:outline-none focus:border-burgundy font-body"
                  />
                </div>

                <div>
                  <label className="block text-xs tracking-[0.2em] uppercase text-stone mb-2 font-body">
                    Numri i Telefonit *
                  </label>
                  <input
                    required
                    type="tel"
                    value={form.phone}
                    onChange={e => setForm({ ...form, phone: e.target.value })}
                    placeholder="+355 6x xxx xxxx"
                    className="w-full border border-stone/20 bg-cream-warm px-4 py-3 text-sm text-brown placeholder:text-stone/40 focus:outline-none focus:border-burgundy font-body"
                  />
                </div>

                <div>
                  <label className="block text-xs tracking-[0.2em] uppercase text-stone mb-2 font-body">
                    Adresa e Dërgimit *
                  </label>
                  <textarea
                    required
                    rows={3}
                    value={form.address}
                    onChange={e => setForm({ ...form, address: e.target.value })}
                    placeholder="Rruga, Numri, Qyteti, Shteti"
                    className="w-full border border-stone/20 bg-cream-warm px-4 py-3 text-sm text-brown placeholder:text-stone/40 focus:outline-none focus:border-burgundy resize-none font-body"
                  />
                </div>

                {error && (
                  <p className="text-burgundy text-sm font-body">{error}</p>
                )}

                <div className="flex flex-col sm:flex-row gap-4 mt-2">
                  <button
                    type="button"
                    onClick={() => setStep('cart')}
                    className="btn-outline flex-1 text-center"
                  >
                    ← Kthehu te Shporta
                  </button>
                  <button
                    type="submit"
                    disabled={loading}
                    className="btn-primary flex-1 text-center disabled:opacity-60"
                  >
                    {loading ? 'Duke dërguar...' : 'Dërgo Porosinë ✦'}
                  </button>
                </div>
              </form>

              {/* Order summary sidebar */}
              <div className="bg-cream-warm border border-stone/10 p-8 h-fit">
                <h2 className="font-heading text-2xl text-brown mb-6">Porosia Juaj</h2>
                <div className="flex flex-col gap-4">
                  {items.map(item => (
                    <div key={item.id} className="flex gap-4 pb-4 border-b border-stone/10 last:border-0">
                      <div className="relative w-14 h-14 flex-shrink-0 bg-cream overflow-hidden">
                        <Image src={item.image} alt={item.name} fill className="object-cover" sizes="56px" />
                      </div>
                      <div>
                        <p className="font-heading text-sm text-brown">{item.name}</p>
                        <p className="text-xs text-stone mt-0.5 font-body">× {item.quantity}</p>
                        <p className="text-sm text-burgundy mt-1 font-body">{item.price}</p>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="border-t border-stone/20 mt-4 pt-4 flex justify-between">
                  <span className="font-heading text-lg text-brown">Total</span>
                  <span className="font-heading text-lg text-brown">{total.toFixed(2)} €</span>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}
