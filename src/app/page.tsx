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

        {/* Customer reviews */}
        <section className="py-16 px-6 bg-[#fffffc]">
          <div className="max-w-[1600px] mx-auto">
            <div className="text-center mb-12">
              <p className="text-[10px] tracking-[0.3em] uppercase text-[#201616]/50 mb-2">Çfarë Thonë Klientet</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                { name: 'Albana K.', location: 'Prishtinë', rating: 5, text: 'Unaza arriti brenda 2 ditëve dhe ishte edhe më e bukur se në foto. Paketimi ishte shumë i kujdesshëm, dhe mesazhi personal më preku vërtet. E rekomandoj me zemër, sidomos si dhuratë!' },
                { name: 'Fjolla B.', location: 'Shkup', rating: 5, text: 'Shërbimi i klientit ishte i shkëlqyer nga fillimi në fund. Unaza ishte cilësi e dorës së parë - elegante dhe e punuar me shumë kujdes. Faleminderit për gjithçka!' },
                { name: 'Valentina R.', location: 'Prizren', rating: 5, text: 'Koleksioni "Rose & Stardust" është thjesht magjik. Do të kthehem patjetër për blerje të tjera. Cilësi 10/10, e rekomandoj pa hezitim!' },
              ].map((review) => (
                <div key={review.name} className="bg-[#f6f5e9] p-6 flex flex-col gap-3">
                  <div className="flex gap-0.5">
                    {Array.from({ length: review.rating }).map((_, i) => (
                      <svg key={i} className="w-4 h-4 text-[#b31b1b]" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                  <p className="text-sm text-[#201616]/80 leading-relaxed font-body italic">&ldquo;{review.text}&rdquo;</p>
                  <div className="mt-auto pt-3 border-t border-[#201616]/10">
                    <p className="text-xs font-bold text-[#201616] tracking-wide">{review.name}</p>
                    <p className="text-[10px] text-[#201616]/50 uppercase tracking-widest">{review.location}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* New arrivals */}
        <section className="py-16 px-6 bg-[#f6f5e9]">
          <div className="max-w-[1600px] mx-auto">
            <div className="flex items-end justify-between mb-10">
              <div>
                <p className="text-[10px] tracking-[0.3em] uppercase text-[#201616]/50 mb-2">Sapo Mbërritën</p>
                <h2 className="font-heading text-4xl md:text-5xl text-[#201616]">Arritje të Reja</h2>
              </div>
              <Link href="/dyqan" className="text-xs tracking-widest uppercase text-[#201616] border-b border-[#201616] pb-0.5 hover:text-[#b31b1b] hover:border-[#b31b1b] transition-colors">
                Shiko të gjitha
              </Link>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-x-5 gap-y-10">
              {[...getByType('Gerdane').slice(0, 2), ...getByType('Vathë').slice(0, 2)].map((p) => <ProductCard key={p.id} product={p} />)}
            </div>
          </div>
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
