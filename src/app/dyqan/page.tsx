import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { products, getByType, type Product } from '@/data/products';
import Image from 'next/image';
import Link from 'next/link';
import WishlistButton from '@/components/WishlistButton';

function discounted(price: string) {
  const num = parseFloat(price.replace(/[^0-9.]/g, ''));
  return `€${Math.round(num * 0.7)}`;
}

function ProductCard({ product }: { product: Product }) {
  return (
    <div className="group">
      <div className="aspect-square relative bg-cream-warm border border-stone/10 mb-3 overflow-hidden group-hover:border-gold transition-colors duration-300">
        <Link href={`/dyqan/${product.id}`} className="block w-full h-full">
          <Image
            src={product.image}
            alt={product.name}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-500"
            sizes="(max-width: 768px) 50vw, 25vw"
          />
        </Link>
        <span className="absolute top-2 left-2 bg-burgundy text-white text-[10px] tracking-widest uppercase px-2 py-1">
          -30%
        </span>
        <div className="absolute top-2 right-2">
          <WishlistButton
            product={{ id: product.id, name: product.name, price: product.price, image: product.image }}
            className="bg-white/80 hover:bg-white p-1.5 text-stone hover:text-burgundy"
          />
        </div>
      </div>
      <Link href={`/dyqan/${product.id}`} className="block">
        <p className="text-xs uppercase tracking-widest text-stone mb-1">{product.type}</p>
        <h3 className="font-heading text-lg text-brown mb-1 group-hover:text-burgundy transition-colors">{product.name}</h3>
        <div className="flex items-center gap-2 font-body">
          <p className="text-sm text-burgundy">{discounted(product.price)}</p>
          <p className="text-sm text-stone/60 line-through">{product.price}</p>
        </div>
      </Link>
    </div>
  );
}

export default function ShopPage({
  searchParams,
}: {
  searchParams?: { kategori?: string };
}) {
  const kategori = searchParams?.kategori;

  const filtered =
    kategori === 'unaza'
      ? getByType('Unaza')
      : kategori === 'gerdane'
      ? getByType('Gerdane')
      : kategori === 'vathe'
      ? getByType('Vathë')
      : products;

  const filters = [
    { label: 'Të gjitha', value: undefined, count: products.length },
    { label: 'Unaza', value: 'unaza', count: getByType('Unaza').length },
    { label: 'Gerdane', value: 'gerdane', count: getByType('Gerdane').length },
    { label: 'Vathë', value: 'vathe', count: getByType('Vathë').length },
  ];

  return (
    <>
      <Header />
      <main className="min-h-screen bg-cream">
        {/* Banner */}
        <div className="bg-cream-warm border-b border-stone-light/20 py-16 px-6 text-center">
          <p className="text-xs tracking-[0.3em] uppercase text-gold mb-3">Koleksioni</p>
          <h1 className="font-heading text-5xl text-brown">Të gjitha Bizhuteritë</h1>
          <p className="text-stone text-sm mt-3">{products.length} produkte</p>
        </div>

        <div className="max-w-content mx-auto px-6 py-12">
          {/* Filters */}
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

          {/* Grid */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {filtered.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
