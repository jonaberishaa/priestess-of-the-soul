import type { Metadata } from 'next';
import AnnouncementBar from '@/components/AnnouncementBar';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ShopGrid from '@/components/ShopGrid';
import { products, getByType } from '@/data/products';
import { getInventory } from '@/lib/db';
import Image from 'next/image';
import Link from 'next/link';

const CATEGORY_META: Record<string, { label: string; title: string; description: string }> = {
  unaza: {
    label: 'Unaza',
    title: 'Unaza me Ar 18K',
    description: 'Blej unaza me ar 18K dhe gurë natyralë të çmuar. Dizajne artizanale, dërgim falas në Kosovë, Shqipëri dhe Maqedoni të Veriut.',
  },
  gerdane: {
    label: 'Gerdane',
    title: 'Gerdane me Ar 18K',
    description: 'Gerdane luksi me ar 18K dhe gurë natyralë. Çdo copë e punuar me dorë. Porosi online me dërgim falas.',
  },
  vathe: {
    label: 'Vathë',
    title: 'Vathë me Ar 18K',
    description: 'Vathë elegante me ar 18K dhe gurë natyralë të çmuar. Dizajne unike, dërgim falas në Kosovë, Shqipëri dhe Maqedoni.',
  },
};

export function generateMetadata({ searchParams }: { searchParams?: { kategori?: string } }): Metadata {
  const kategori = searchParams?.kategori;
  const cat = kategori ? CATEGORY_META[kategori] : undefined;
  const canonical = cat
    ? `https://www.priestessofthesoul.com/dyqan?kategori=${kategori}`
    : 'https://www.priestessofthesoul.com/dyqan';
  const title = cat ? `${cat.title} | Bizhuteri Luksi Kosovë` : 'Dyqani | Bizhuteri me Ar 18K dhe Gurë Natyralë';
  const description = cat
    ? cat.description
    : 'Shfleto koleksionin tonë të plotë - unaza, vathë dhe gerdane me ar 18K dhe gurë natyralë. Bizhuteri luksi me çmime të arsyeshme. Dërgim në Kosovë, Shqipëri, Maqedoni.';

  return {
    title,
    description,
    keywords: ['dyqan bizhuteri Kosovë', 'unaza online', 'vathë ar', 'qafore gurë natyralë', 'bizhuteri ar 18K'],
    alternates: { canonical },
    openGraph: {
      title: cat ? `${cat.title} | Priestess of the Soul` : 'Dyqani | Priestess of the Soul',
      description,
      url: canonical,
    },
  };
}

export const dynamic = 'force-dynamic';

export default async function ShopPage({
  searchParams,
}: {
  searchParams?: { kategori?: string };
}) {
  const kategori = searchParams?.kategori;
  const activeCategory = kategori ? CATEGORY_META[kategori] : undefined;
  const inventory = await getInventory();

  const filtered =
    kategori === 'unaza'   ? getByType('Unaza')  :
    kategori === 'gerdane' ? getByType('Gerdane') :
    kategori === 'vathe'   ? getByType('Vathë')   :
    products;

  const inStockCount = (list: typeof products) =>
    list.filter((p) => (inventory[p.id] ?? 10) > 0).length;

  const filters = [
    { label: 'Të gjitha', value: undefined,   count: inStockCount(products) },
    { label: 'Unaza',     value: 'unaza',      count: inStockCount(getByType('Unaza')) },
    { label: 'Gerdane',   value: 'gerdane',    count: inStockCount(getByType('Gerdane')) },
    { label: 'Vathë',     value: 'vathe',      count: inStockCount(getByType('Vathë')) },
  ];

  return (
    <>
      <AnnouncementBar />
      <Header />
      <main className="min-h-screen bg-cream">
        {/* Brand banner */}
        <div className="relative w-full aspect-[1200/630] max-h-[420px] overflow-hidden">
          <Image
            src="/og-image.jpg"
            alt="Priestess of the Soul - bizhuteri me ar 18K dhe gurë natyralë"
            fill
            className="object-cover"
            sizes="100vw"
            priority
          />
        </div>

        {/* Banner */}
        <div className="bg-cream-warm border-b border-stone-light/20 py-16 px-6 text-center">
          <p className="text-xs tracking-[0.3em] uppercase text-gold mb-3">Koleksioni</p>
          <h1 className="font-heading text-5xl text-brown">{activeCategory ? activeCategory.label : 'Të gjitha Bizhuteritë'}</h1>
        </div>

        <div className="max-w-content mx-auto px-6 py-12">
          {/* Category filters */}
          <div className="flex flex-wrap gap-3 mb-10">
            {filters.map((f) => {
              const isActive = f.value === kategori;
              return (
                <Link
                  key={f.label}
                  href={f.value ? `/dyqan?kategori=${f.value}` : '/dyqan'}
                  className={`text-xs tracking-widest uppercase px-5 py-2 border transition-colors ${
                    isActive
                      ? 'border-brown bg-brown text-cream'
                      : 'border-stone-light/40 text-stone hover:border-brown hover:text-brown'
                  }`}
                >
                  {f.label} ({f.count})
                </Link>
              );
            })}
          </div>

          {/* Client grid with sort + badges + quick add */}
          <ShopGrid products={filtered} inventory={inventory} />
        </div>
      </main>
      <Footer />
    </>
  );
}
