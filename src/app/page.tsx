import type { Metadata } from 'next';
import AnnouncementBar from '@/components/AnnouncementBar';

export const metadata: Metadata = {
  title: 'Bizhuteri Luksi me Ar 18K | Unaza, Vathë, Qafore - Kosovë',
  description:
    'Dyqani nr.1 i bizhuterive luksi në Kosovë. Unaza, vathë, qafore dhe byzylykë me ar 18K dhe gurë natyralë. Porosi online me dërgim falas. Çdo copë e punuar me dorë.',
  alternates: { canonical: 'https://www.priestessofthesoul.com' },
  openGraph: {
    title: 'Priestess of the Soul | Bizhuteri Luksi Kosovë',
    description: 'Unaza, vathë, qafore me ar 18K dhe gurë natyralë. Dërgim në Kosovë, Shqipëri dhe Maqedoni.',
    url: 'https://www.priestessofthesoul.com',
  },
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'JewelryStore',
  name: 'Priestess of the Soul',
  url: 'https://www.priestessofthesoul.com',
  logo: 'https://www.priestessofthesoul.com/logo.png',
  description: 'Bizhuteri luksi me ar 18K dhe gurë natyralë të çmuar. Unaza, vathë, qafore dhe byzylykë të punuar me dorë.',
  image: 'https://www.priestessofthesoul.com/og-image.jpg',
  priceRange: '€€',
  currenciesAccepted: 'EUR',
  paymentAccepted: 'Cash on Delivery',
  areaServed: ['Kosovo', 'Albania', 'North Macedonia'],
  address: {
    '@type': 'PostalAddress',
    addressCountry: 'XK',
    addressRegion: 'Prishtinë',
  },
  sameAs: [
    'https://www.instagram.com/priestessofthesoul',
    'https://www.tiktok.com/@priestessofthesoul',
  ],
  hasOfferCatalog: {
    '@type': 'OfferCatalog',
    name: 'Koleksioni i Bizhuterive',
    itemListElement: [
      { '@type': 'OfferCatalog', name: 'Unaza me Ar 18K' },
      { '@type': 'OfferCatalog', name: 'Vathë me Ar 18K' },
      { '@type': 'OfferCatalog', name: 'Qafore me Ar 18K' },
      { '@type': 'OfferCatalog', name: 'Byzylykë me Ar 18K' },
    ],
  },
};

import Header from '@/components/Header';
import Hero from '@/components/Hero';
import Newsletter from '@/components/Newsletter';
import Footer from '@/components/Footer';
import { getFeatured, getByType, salePrice } from '@/data/products';
import Image from 'next/image';
import Link from 'next/link';

function ProductCard({ product }: { product: { id: string; name: string; type: string; price: string; image: string } }) {
  return (
    <Link href={`/dyqan/${product.id}`} className="group block">
      <div className="aspect-square relative overflow-hidden bg-[#f6f5e9] mb-3">
        <Image
          src={product.image}
          alt={product.name}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-700"
          sizes="(max-width: 768px) 50vw, 25vw"
        />
        <span className="absolute top-2 left-2 bg-[#b31b1b] text-[#fffef2] text-[10px] font-bold tracking-widest uppercase px-2 py-1">
          −20%
        </span>
      </div>
      <p className="text-[10px] uppercase tracking-[0.2em] text-[#201616]/50 mb-1 font-body">{product.type}</p>
      <h3 className="font-heading text-base text-[#201616] mb-1 group-hover:text-[#b31b1b] transition-colors">{product.name}</h3>
      <div className="flex items-center gap-2">
        <p className="text-sm font-bold text-[#b31b1b] font-body">{salePrice(product.price)}</p>
        <p className="text-xs text-[#201616]/40 line-through font-body">{product.price}</p>
      </div>
    </Link>
  );
}

export default function HomePage() {
  const featured = getFeatured();
  const rings = getByType('Unaza').slice(0, 4);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <AnnouncementBar />
      <Header />
      <main>
        {/* Hero */}
        <Hero />

        {/* Featured products */}
        <section className="py-16 px-6 bg-[#fffffc]">
          <div className="max-w-[1600px] mx-auto">
            <div className="flex items-end justify-between mb-10">
              <div>
                <p className="text-[10px] tracking-[0.3em] uppercase text-[#201616]/50 mb-2">Koleksioni i Ri</p>
                <h2 className="font-heading text-4xl md:text-5xl text-[#201616]">Të Preferuarat</h2>
              </div>
              <Link href="/dyqan" className="text-xs tracking-widest uppercase text-[#201616] border-b border-[#201616] pb-0.5 hover:text-[#b31b1b] hover:border-[#b31b1b] transition-colors">
                Shiko të gjitha
              </Link>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-x-5 gap-y-10">
              {featured.map((p) => <ProductCard key={p.id} product={p} />)}
            </div>
          </div>
        </section>

        {/* New arrivals collage banner */}
        <section className="w-full">
          <div className="px-6 py-10 bg-[#fffffc]">
            <h2 className="font-heading text-4xl md:text-5xl text-[#201616]">Arritje të reja...</h2>
          </div>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="https://nnmqu1-tb.myshopify.com/cdn/shop/files/Minimalist_photo_collage_handmade_jewelry_Facebook_cover_3.png?v=1763915563&width=3200"
            alt="Koleksioni i Ri"
            className="w-full object-cover"
          />
        </section>

        {/* Rings featured */}
        <section className="py-16 px-6 bg-[#f6f5e9]">
          <div className="max-w-[1600px] mx-auto">
            <div className="flex items-end justify-between mb-10">
              <div>
                <p className="text-[10px] tracking-[0.3em] uppercase text-[#201616]/50 mb-2">Koleksioni</p>
                <h2 className="font-heading text-4xl md:text-5xl text-[#201616]">Unaza</h2>
              </div>
              <Link href="/dyqan?kategori=unaza" className="text-xs tracking-widest uppercase text-[#201616] border-b border-[#201616] pb-0.5 hover:text-[#b31b1b] hover:border-[#b31b1b] transition-colors">
                Shiko të gjitha
              </Link>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-x-5 gap-y-10">
              {rings.map((p) => <ProductCard key={p.id} product={p} />)}
            </div>
          </div>
        </section>

        {/* Sacred ornaments section */}
        <section className="py-20 px-6 bg-[#fffffc] text-center">
          <div className="max-w-2xl mx-auto">
            <p className="text-[10px] tracking-[0.3em] uppercase text-[#201616]/50 mb-4">Filozofia Jonë</p>
            <h2 className="font-heading text-4xl md:text-5xl text-[#201616] leading-tight mb-6">
              Stoli të shenjta, të harmonizuara me shpirtin tënd
            </h2>
            <p className="text-[#201616]/60 leading-relaxed font-body text-sm mb-10">
              Çdo copë është krijuar si një amuletë shpirtërore - për ata që kërkojnë
              të rilidhur me fuqinë e tyre të brendshme. Gurët natyralë mbajnë energji.
              Kur i veshim, bëhemi pjesë e diçkaje më të madhe.
            </p>
            <Link href="/dyqan" className="inline-block border border-[#201616] text-[#201616] px-10 py-3 text-xs tracking-[0.25em] uppercase hover:bg-[#201616] hover:text-[#fffef2] transition-colors">
              Shiko Koleksionin
            </Link>
          </div>
        </section>

        {/* Newsletter */}
        <Newsletter />
      </main>
      <Footer />
    </>
  );
}
