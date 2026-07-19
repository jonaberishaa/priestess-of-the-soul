import type { Metadata } from 'next';
import AnnouncementBar from '@/components/AnnouncementBar';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ProductActions from '@/components/ProductActions';
import {
  products,
  salePrice,
  getByStone,
  getByMeaning,
  stoneLabels,
  meaningLabels,
  type StoneSlug,
  type MeaningSlug,
} from '@/data/products';
import { getInventory } from '@/lib/db';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';

const stoneSlugs = Object.keys(stoneLabels) as StoneSlug[];
const meaningSlugs = Object.keys(meaningLabels) as MeaningSlug[];

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const product = products.find((p) => p.id === params.slug);
  if (!product) return {};
  const sale = salePrice(product.price);
  return {
    title: `${product.name} | Bizhuteri me Ar 18K`,
    description: `${product.name} - ${product.description?.slice(0, 140) ?? `${product.type} me ar 18K dhe gurë natyralë. Porosi online me dërgim në Kosovë, Shqipëri dhe Maqedoni.`}`,
    keywords: [product.name, product.type, 'bizhuteri Kosovë', 'ar 18K', 'gurë natyralë'],
    alternates: { canonical: `https://www.priestessofthesoul.com/dyqan/${product.id}` },
    openGraph: {
      title: `${product.name} - ${sale}`,
      description: `${product.type} me ar 18K. Porosi online - dërgim në Kosovë.`,
      url: `https://www.priestessofthesoul.com/dyqan/${product.id}`,
      images: [{ url: product.image, alt: product.name }],
    },
  };
}

export function generateStaticParams() {
  const productParams = products.map((p) => ({ slug: p.id }));
  const stoneParams = stoneSlugs.map((s) => ({ slug: s }));
  const meaningParams = meaningSlugs.map((m) => ({ slug: m }));
  return [...productParams, ...stoneParams, ...meaningParams];
}

function ProductCard({ product, inStock }: { product: (typeof products)[0]; inStock: boolean }) {
  return (
    <Link href={`/dyqan/${product.id}`} className="group">
      <div className="aspect-square relative bg-cream-warm border border-stone-light/20 mb-3 overflow-hidden group-hover:border-gold transition-colors duration-300">
        <Image
          src={product.image}
          alt={product.name}
          fill
          className={`object-cover group-hover:scale-105 transition-transform duration-500 ${!inStock ? 'opacity-50' : ''}`}
          sizes="(max-width: 768px) 50vw, 25vw"
        />
        {inStock ? (
          <span className="absolute top-2 left-2 bg-[#b31b1b] text-[#fffef2] text-[10px] font-bold tracking-widest uppercase px-2 py-1">−20%</span>
        ) : (
          <span className="absolute top-2 left-2 bg-[#201616]/70 text-[#fffef2] text-[10px] font-bold tracking-widest uppercase px-2 py-1">Pa Stok</span>
        )}
      </div>
      <p className="text-xs uppercase tracking-widest text-stone mb-1">{product.type}</p>
      <h3 className="font-heading text-lg text-brown mb-1 group-hover:text-burgundy transition-colors leading-tight">{product.name}</h3>
      {(product.stone || product.meaning) && (
        <div className="flex flex-wrap gap-1 mb-1.5">
          {product.stone && (
            <span className="text-[9px] tracking-wider uppercase bg-[#f5f0e8] text-[#97845B] px-2 py-0.5 font-body">
              {stoneLabels[product.stone]}
            </span>
          )}
          {product.meaning && (
            <span className="text-[9px] tracking-wider uppercase bg-[#f0f0ee] text-[#8C8070] px-2 py-0.5 font-body">
              {meaningLabels[product.meaning]}
            </span>
          )}
        </div>
      )}
      {inStock ? (
        <div className="flex items-center gap-2">
          <p className="text-sm font-bold text-[#b31b1b] font-body">{salePrice(product.price)}</p>
          <p className="text-xs text-stone/60 line-through font-body">{product.price}</p>
        </div>
      ) : (
        <p className="text-xs text-stone/50 font-body">I Pasiguruar</p>
      )}
    </Link>
  );
}

export const dynamic = 'force-dynamic';

export default async function DyqanSlugPage({ params }: { params: { slug: string } }) {
  const { slug } = params;
  const inventory = await getInventory();

  // Stone category page
  if (stoneSlugs.includes(slug as StoneSlug)) {
    const stone = slug as StoneSlug;
    const label = stoneLabels[stone];
    const filtered = getByStone(stone);

    return (
      <>
        <AnnouncementBar />
        <Header />
        <main className="min-h-screen bg-cream">
          <div className="bg-cream-warm border-b border-stone-light/20 py-16 px-6 text-center">
            <p className="text-xs tracking-[0.3em] uppercase text-gold mb-3">Sipas Gurëve</p>
            <h1 className="font-heading text-5xl text-brown">{label}</h1>
            <p className="text-stone text-sm mt-3">{filtered.filter((p) => (inventory[p.id] ?? 10) > 0).length} produkte</p>
          </div>
          <div className="max-w-content mx-auto px-6 py-12">
            <div className="flex flex-wrap gap-3 mb-10">
              {stoneSlugs.map((s) => (
                <Link
                  key={s}
                  href={`/dyqan/${s}`}
                  className={`text-xs tracking-widest uppercase px-5 py-2 border transition-colors ${
                    s === stone
                      ? 'border-brown bg-brown text-cream'
                      : 'border-stone-light/40 text-stone hover:border-brown hover:text-brown'
                  }`}
                >
                  {stoneLabels[s]}
                </Link>
              ))}
            </div>
            {filtered.length > 0 ? (
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {filtered.map((p) => (
                  <ProductCard key={p.id} product={p} inStock={(inventory[p.id] ?? 10) > 0} />
                ))}
              </div>
            ) : (
              <p className="text-stone text-center py-16">Nuk u gjetën produkte për këtë gur.</p>
            )}
          </div>
        </main>
        <Footer />
      </>
    );
  }

  // Meaning category page
  if (meaningSlugs.includes(slug as MeaningSlug)) {
    const meaning = slug as MeaningSlug;
    const label = meaningLabels[meaning];
    const filtered = getByMeaning(meaning);

    return (
      <>
        <AnnouncementBar />
        <Header />
        <main className="min-h-screen bg-cream">
          <div className="bg-cream-warm border-b border-stone-light/20 py-16 px-6 text-center">
            <p className="text-xs tracking-[0.3em] uppercase text-gold mb-3">Sipas Kuptimit</p>
            <h1 className="font-heading text-5xl text-brown">{label}</h1>
            <p className="text-stone text-sm mt-3">{filtered.filter((p) => (inventory[p.id] ?? 10) > 0).length} produkte</p>
          </div>
          <div className="max-w-content mx-auto px-6 py-12">
            <div className="flex flex-wrap gap-3 mb-10">
              {meaningSlugs.map((m) => (
                <Link
                  key={m}
                  href={`/dyqan/${m}`}
                  className={`text-xs tracking-widest uppercase px-5 py-2 border transition-colors ${
                    m === meaning
                      ? 'border-brown bg-brown text-cream'
                      : 'border-stone-light/40 text-stone hover:border-brown hover:text-brown'
                  }`}
                >
                  {meaningLabels[m]}
                </Link>
              ))}
            </div>
            {filtered.length > 0 ? (
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {filtered.map((p) => (
                  <ProductCard key={p.id} product={p} inStock={(inventory[p.id] ?? 10) > 0} />
                ))}
              </div>
            ) : (
              <p className="text-stone text-center py-16">Nuk u gjetën produkte për këtë kuptim.</p>
            )}
          </div>
        </main>
        <Footer />
      </>
    );
  }

  // Product detail page
  const product = products.find((p) => p.id === slug);
  if (!product) notFound();

  const inStock = (inventory[product.id] ?? 10) > 0;
  const stock = inventory[product.id] ?? 10;

  // Smart related products: same stone > same meaning > same type
  const related = (() => {
    const exclude = (p: (typeof products)[0]) => p.id !== product.id && (inventory[p.id] ?? 10) > 0;
    const byStoneMeaning = products.filter(
      (p) => exclude(p) && p.stone === product.stone && p.meaning === product.meaning
    );
    const byStone = products.filter(
      (p) => exclude(p) && p.stone === product.stone && !byStoneMeaning.includes(p)
    );
    const byMeaning = products.filter(
      (p) => exclude(p) && p.meaning === product.meaning && !byStoneMeaning.includes(p) && !byStone.includes(p)
    );
    const byType = products.filter(
      (p) => exclude(p) && p.type === product.type && !byStoneMeaning.includes(p) && !byStone.includes(p) && !byMeaning.includes(p)
    );
    return [...byStoneMeaning, ...byStone, ...byMeaning, ...byType].slice(0, 4);
  })();

  const canonicalUrl = `https://www.priestessofthesoul.com/dyqan/${product.id}`;
  const productJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.name,
    image: [product.image],
    description: product.description,
    sku: product.id,
    brand: { '@type': 'Brand', name: 'Priestess of the Soul' },
    offers: {
      '@type': 'Offer',
      url: canonicalUrl,
      priceCurrency: 'EUR',
      price: parseFloat(salePrice(product.price).replace('€', '')),
      availability: inStock ? 'https://schema.org/InStock' : 'https://schema.org/OutOfStock',
      itemCondition: 'https://schema.org/NewCondition',
    },
  };
  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Kreu', item: 'https://www.priestessofthesoul.com' },
      { '@type': 'ListItem', position: 2, name: 'Dyqan', item: 'https://www.priestessofthesoul.com/dyqan' },
      { '@type': 'ListItem', position: 3, name: product.name, item: canonicalUrl },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <AnnouncementBar />
      <Header />
      <main className="bg-cream min-h-screen">
        {/* Breadcrumb */}
        <div className="max-w-content mx-auto px-6 py-4 text-xs text-stone flex gap-2">
          <Link href="/" className="hover:text-burgundy transition-colors">Kreu</Link>
          <span>/</span>
          <Link href="/dyqan" className="hover:text-burgundy transition-colors">Dyqan</Link>
          <span>/</span>
          <span className="text-brown">{product.name}</span>
        </div>

        {/* Product */}
        <div className="max-w-content mx-auto px-6 py-10 grid grid-cols-1 lg:grid-cols-2 gap-16">
          <div className="aspect-square relative bg-cream-warm border border-stone-light/20 overflow-hidden">
            <Image src={product.image} alt={product.name} fill className={`object-cover ${!inStock ? 'opacity-60' : ''}`} priority />
            {!inStock && (
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="bg-[#201616]/80 text-[#fffef2] text-sm font-bold tracking-widest uppercase px-6 py-3">Pa Stok</span>
              </div>
            )}
          </div>

          <div className="flex flex-col justify-center">
            <p className="text-xs tracking-[0.3em] uppercase text-gold mb-3">{product.type}</p>
            <h1 className="font-heading text-4xl md:text-5xl text-brown mb-4">{product.name}</h1>

            {inStock ? (
              <>
                <div className="flex items-center gap-3 mb-2">
                  <p className="text-3xl font-bold text-[#b31b1b]">{salePrice(product.price)}</p>
                  <p className="text-xl text-stone/50 line-through">{product.price}</p>
                  <span className="bg-[#b31b1b] text-[#fffef2] text-[10px] font-bold tracking-widest uppercase px-2 py-1">−20%</span>
                </div>
                <p className="text-xs text-[#201616]/50 font-body mb-2">✦ Dërgesa Falas</p>
                {stock <= 3 && (
                  <p className="text-xs text-[#b31b1b] font-body mb-2 font-bold">⚠ Vetëm {stock} të mbetura!</p>
                )}
              </>
            ) : (
              <div className="mb-4">
                <p className="text-lg text-stone/60 font-body">Momentalisht i pasiguruar</p>
                <p className="text-xs text-stone/40 font-body mt-1">Na kontaktoni në WhatsApp për disponueshmëri.</p>
              </div>
            )}

            <p className="text-stone leading-relaxed mb-8">{product.description}</p>

            {/* Stone & Meaning tags */}
            <div className="flex flex-wrap gap-2 mb-6">
              {product.stone && (
                <Link href={`/dyqan/${product.stone}`} className="text-[10px] tracking-widest uppercase border border-gold/40 text-gold px-3 py-1 hover:bg-gold hover:text-cream transition-colors">
                  {stoneLabels[product.stone]}
                </Link>
              )}
              {product.meaning && (
                <Link href={`/dyqan/${product.meaning}`} className="text-[10px] tracking-widest uppercase border border-stone/30 text-stone px-3 py-1 hover:bg-stone hover:text-cream transition-colors">
                  {meaningLabels[product.meaning]}
                </Link>
              )}
            </div>

            {/* Interactive: ring sizes, add to cart, wishlist, WhatsApp */}
            {inStock ? (
              <ProductActions product={product} />
            ) : (
              <div className="mb-10">
                <a
                  href={`https://wa.me/38349646439?text=${encodeURIComponent(`Përshëndetje! Jam e interesuar për: ${product.name} - A është disponueshëm?`)}`}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center justify-center gap-2 border border-[#25d366] text-[#25d366] px-6 py-3 text-xs tracking-[0.25em] uppercase hover:bg-[#25d366] hover:text-white transition-colors w-full"
                >
                  Na Pyesni në WhatsApp
                </a>
              </div>
            )}

            <div className="border-t border-stone-light/20 pt-6 flex flex-col gap-3 text-sm text-stone">
              <p>✦ Argjend 925 me veshje ar 18K</p>
              <p>✦ Gurë natyralë të çmuar</p>
              <p>✦ Çdo copë artizanale dhe unike</p>
              <p>✦ Dërgesë brenda 3–5 ditëve pune</p>
            </div>
          </div>
        </div>

        {/* Related products */}
        {related.length > 0 && (
          <section className="bg-cream-warm py-16 px-6">
            <div className="max-w-content mx-auto">
              <p className="text-xs tracking-[0.3em] uppercase text-gold mb-2 text-center">Bazuar në preferencat tuaja</p>
              <h2 className="font-heading text-3xl text-brown mb-8 text-center">Mund të të Pëlqejnë</h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                {related.map((p) => (
                  <ProductCard key={p.id} product={p} inStock={(inventory[p.id] ?? 10) > 0} />
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Complete the look - same meaning different type */}
        {(() => {
          const completeLook = products
            .filter((p) =>
              p.id !== product.id &&
              p.type !== product.type &&
              p.meaning === product.meaning &&
              (inventory[p.id] ?? 10) > 0
            )
            .slice(0, 4);
          if (completeLook.length < 2) return null;
          return (
            <section className="bg-cream py-16 px-6">
              <div className="max-w-content mx-auto">
                <p className="text-xs tracking-[0.3em] uppercase text-gold mb-2 text-center">Kombino Stilin</p>
                <h2 className="font-heading text-3xl text-brown mb-8 text-center">Plotëso Lookun</h2>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                  {completeLook.map((p) => (
                    <ProductCard key={p.id} product={p} inStock={true} />
                  ))}
                </div>
              </div>
            </section>
          );
        })()}
      </main>
      <Footer />
    </>
  );
}
