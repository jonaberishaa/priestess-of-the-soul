'use client';
import { useWishlist } from '@/context/WishlistContext';
import { useCart } from '@/context/CartContext';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Image from 'next/image';
import Link from 'next/link';

export default function WishlistPage() {
  const { items, toggle } = useWishlist();
  const { addItem } = useCart();

  if (items.length === 0) {
    return (
      <>
        <Header />
        <main className="min-h-screen bg-cream flex items-center justify-center px-6">
          <div className="text-center max-w-md">
            <div className="text-5xl mb-6 text-stone">♡</div>
            <h1 className="font-heading text-4xl text-brown mb-4">Lista e Dëshirave</h1>
            <p className="text-stone mb-8 font-body">Nuk keni shtuar asnjë produkt ende.</p>
            <Link href="/dyqan" className="btn-primary inline-block">
              Shfletoni Koleksionin
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
          <div className="mb-10">
            <p className="text-xs tracking-[0.3em] uppercase text-stone mb-2 font-body">Lista Juaj</p>
            <h1 className="font-heading text-4xl md:text-5xl text-brown">Lista e Dëshirave</h1>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {items.map(item => (
              <div key={item.id} className="group flex flex-col">
                <div className="aspect-square relative bg-cream-warm border border-stone/10 mb-3 overflow-hidden group-hover:border-gold transition-colors duration-300">
                  <Image
                    src={item.image}
                    alt={item.name}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                    sizes="(max-width: 768px) 50vw, 25vw"
                  />
                  {/* Remove from wishlist */}
                  <button
                    onClick={() => toggle(item)}
                    className="absolute top-3 right-3 bg-white/80 p-1.5 text-burgundy hover:bg-white transition-colors"
                    aria-label="Hiq nga lista"
                  >
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                    </svg>
                  </button>
                </div>
                <Link href={`/dyqan/${item.id}`} className="block mb-1">
                  <h3 className="font-heading text-base text-brown hover:text-burgundy transition-colors">{item.name}</h3>
                </Link>
                <p className="text-sm text-burgundy font-body mb-3">{item.price}</p>
                <button
                  onClick={() => addItem(item)}
                  className="mt-auto w-full text-xs tracking-[0.2em] uppercase py-2.5 border border-brown text-brown hover:bg-brown hover:text-cream transition-colors font-body"
                >
                  Shto në Shportë
                </button>
              </div>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
