'use client';

import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { useWishlist } from '@/components/WishlistContext';
import { products } from '@/data/products';
import Image from 'next/image';
import Link from 'next/link';

export default function WishlistPage() {
  const { items, toggle } = useWishlist();
  const wished = products.filter((p) => items.includes(p.id));

  return (
    <>
      <Header />
      <main className="min-h-screen bg-cream">
        <div className="bg-cream-warm border-b border-stone-light/20 py-16 px-6 text-center">
          <p className="text-xs tracking-[0.3em] uppercase text-gold mb-3">Koleksioni Im</p>
          <h1 className="font-heading text-5xl text-brown">Të Preferuarat</h1>
        </div>
        <div className="max-w-content mx-auto px-6 py-12">
          {wished.length === 0 ? (
            <div className="text-center py-24">
              <p className="text-stone text-sm font-body mb-6">Nuk ke shtuar asnjë produkt ende.</p>
              <Link href="/dyqan" className="btn-primary">Shiko Koleksionin</Link>
            </div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {wished.map((p) => (
                <div key={p.id} className="group relative">
                  <button onClick={() => toggle(p.id)} className="absolute top-2 right-2 z-10 bg-white/80 p-1.5 hover:bg-white transition-colors" title="Hiq nga të preferuarat">
                    <svg className="w-4 h-4 text-[#b31b1b]" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
                    </svg>
                  </button>
                  <Link href={`/dyqan/${p.id}`}>
                    <div className="aspect-square relative bg-cream-warm border border-stone-light/20 mb-3 overflow-hidden group-hover:border-gold transition-colors duration-300">
                      <Image src={p.image} alt={p.name} fill className="object-cover group-hover:scale-105 transition-transform duration-500" sizes="25vw" />
                    </div>
                    <p className="text-xs uppercase tracking-widest text-stone mb-1">{p.type}</p>
                    <h3 className="font-heading text-base text-brown group-hover:text-burgundy transition-colors">{p.name}</h3>
                    <p className="text-burgundy text-sm font-body mt-1">{p.price}</p>
                  </Link>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}
