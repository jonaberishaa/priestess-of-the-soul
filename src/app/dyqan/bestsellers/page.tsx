import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { products, salePrice } from '@/data/products';
import Image from 'next/image';
import Link from 'next/link';

const bestsellerIds = [
  'celestial-empress',
  'aurora-crown',
  'royal-spell',
  'crystal-dawn',
  'celestial-crown',
  'lavender-bloom',
  'flame-of-isis',
  'mystic-veil',
];

const bestsellers = bestsellerIds
  .map((id) => products.find((p) => p.id === id))
  .filter(Boolean) as typeof products;

export default function BestsellersPage() {
  return (
    <>
      <Header />
      <main className="min-h-screen bg-cream">
        <div className="bg-cream-warm border-b border-stone-light/20 py-16 px-6 text-center">
          <p className="text-xs tracking-[0.3em] uppercase text-gold mb-3">Koleksioni</p>
          <h1 className="font-heading text-5xl text-brown">Më të Shiturat</h1>
          <p className="text-stone text-sm mt-3">{bestsellers.length} produkte</p>
        </div>

        <div className="max-w-content mx-auto px-6 py-12">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {bestsellers.map((p) => (
              <Link key={p.id} href={`/dyqan/${p.id}`} className="group">
                <div className="aspect-square relative bg-cream-warm border border-stone-light/20 mb-3 overflow-hidden group-hover:border-gold transition-colors duration-300">
                  <Image
                    src={p.image}
                    alt={p.name}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                    sizes="(max-width: 768px) 50vw, 25vw"
                  />
                  <span className="absolute top-2 left-2 bg-[#b31b1b] text-[#fffef2] text-[10px] font-bold tracking-widest uppercase px-2 py-1">−20%</span>
                </div>
                <p className="text-xs uppercase tracking-widest text-stone mb-1">{p.type}</p>
                <h3 className="font-heading text-lg text-brown mb-1 group-hover:text-burgundy transition-colors">{p.name}</h3>
                <div className="flex items-center gap-2">
                  <p className="text-sm font-bold text-[#b31b1b] font-body">{salePrice(p.price)}</p>
                  <p className="text-xs text-stone/60 line-through font-body">{p.price}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
