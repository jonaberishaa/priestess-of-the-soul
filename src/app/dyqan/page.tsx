import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ShopGrid from '@/components/ShopGrid';
import { products, getByType } from '@/data/products';
import { readJSON } from '@/lib/db';
import Link from 'next/link';

export default function ShopPage({
  searchParams,
}: {
  searchParams?: { kategori?: string };
}) {
  const kategori = searchParams?.kategori;
  const inventory = readJSON<Record<string, number>>('inventory.json', {});

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
      <Header />
      <main className="min-h-screen bg-cream">
        {/* Banner */}
        <div className="bg-cream-warm border-b border-stone-light/20 py-16 px-6 text-center">
          <p className="text-xs tracking-[0.3em] uppercase text-gold mb-3">Koleksioni</p>
          <h1 className="font-heading text-5xl text-brown">Të gjitha Bizhuteritë</h1>
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
