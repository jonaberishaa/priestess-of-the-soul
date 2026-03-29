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
import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';

const stoneSlugs = Object.keys(stoneLabels) as StoneSlug[];
const meaningSlugs = Object.keys(meaningLabels) as MeaningSlug[];

export function generateStaticParams() {
  const productParams = products.map((p) => ({ slug: p.id }));
  const stoneParams = stoneSlugs.map((s) => ({ slug: s }));
  const meaningParams = meaningSlugs.map((m) => ({ slug: m }));
  return [...productParams, ...stoneParams, ...meaningParams];
}

function ProductCard({ product }: { product: (typeof products)[0] }) {
  return (
    <Link href={`/dyqan/${product.id}`} className="group">
      <div className="aspect-square relative bg-cream-warm border border-stone-light/20 mb-3 overflow-hidden group-hover:border-gold transition-colors duration-300">
        <Image
          src={product.image}
          alt={product.name}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-500"
          sizes="(max-width: 768px) 50vw, 25vw"
        />
        <span className="absolute top-2 left-2 bg-[#b31b1b] text-[#fffef2] text-[10px] font-bold tracking-widest uppercase px-2 py-1">−20%</span>
      </div>
      <p className="text-xs uppercase tracking-widest text-stone mb-1">{product.type}</p>
      <h3 className="font-heading text-lg text-brown mb-1 group-hover:text-burgundy transition-colors">{product.name}</h3>
      <div className="flex items-center gap-2">
        <p className="text-sm font-bold text-[#b31b1b] font-body">{salePrice(product.price)}</p>
        <p className="text-xs text-stone/60 line-through font-body">{product.price}</p>
      </div>
    </Link>
  );
}

export default function DyqanSlugPage({ params }: { params: { slug: string } }) {
  const { slug } = params;

  // Stone category page
  if (stoneSlugs.includes(slug as StoneSlug)) {
    const stone = slug as StoneSlug;
    const label = stoneLabels[stone];
    const filtered = getByStone(stone);

    return (
      <>
        <Header />
        <main className="min-h-screen bg-cream">
          <div className="bg-cream-warm border-b border-stone-light/20 py-16 px-6 text-center">
            <p className="text-xs tracking-[0.3em] uppercase text-gold mb-3">Sipas Gurëve</p>
            <h1 className="font-heading text-5xl text-brown">{label}</h1>
            <p className="text-stone text-sm mt-3">{filtered.length} produkte</p>
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
                  <ProductCard key={p.id} product={p} />
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
        <Header />
        <main className="min-h-screen bg-cream">
          <div className="bg-cream-warm border-b border-stone-light/20 py-16 px-6 text-center">
            <p className="text-xs tracking-[0.3em] uppercase text-gold mb-3">Sipas Kuptimit</p>
            <h1 className="font-heading text-5xl text-brown">{label}</h1>
            <p className="text-stone text-sm mt-3">{filtered.length} produkte</p>
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
                  <ProductCard key={p.id} product={p} />
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

  const related = products
    .filter((p) => p.type === product.type && p.id !== product.id)
    .slice(0, 4);

  return (
    <>
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
            <p className="text-xs text-[#201616]/50 font-body mb-6">✦ Dërgesa Falas</p>
            <p className="text-stone leading-relaxed mb-8">{product.description}</p>

            {/* Interactive: ring sizes, order, wishlist, WhatsApp */}
            <ProductActions product={product} />

            <div className="border-t border-stone-light/20 pt-6 flex flex-col gap-3 text-sm text-stone">
              <p>✦ Argjend 925 me veshje ar 14K–18K</p>
              <p>✦ Gurë natyralë të çmuar</p>
              <p>✦ Çdo copë artizanale dhe unike</p>
              <p>✦ Dërgesë brenda 3–5 ditëve pune</p>
            </div>
          </div>
        </div>

        {/* Related */}
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
                    <p className="text-burgundy text-sm mt-1">{salePrice(p.price)}</p>
                  </Link>
                ))}
              </div>
            </div>
          </section>
        )}
      </main>
      <Footer />
    </>
  );
}
