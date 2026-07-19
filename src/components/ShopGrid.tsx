'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useCart } from '@/components/CartContext';
import { salePrice, stoneLabels, meaningLabels, type Product } from '@/data/products';
import { PRODUCT_SIZES } from '@/data/ring-sizes';

type SortOption = 'default' | 'price-asc' | 'price-desc' | 'name-az';

function QuickAddModal({
  product,
  onClose,
}: {
  product: Product;
  onClose: () => void;
}) {
  const { add, openDrawer } = useCart();
  const sizes = PRODUCT_SIZES[product.id] ?? [];
  const [selectedSize, setSelectedSize] = useState('');

  const handleAdd = () => {
    if (!selectedSize) return;
    add(product, selectedSize);
    openDrawer();
    onClose();
  };

  return (
    <div
      className="fixed inset-0 z-[150] flex items-end sm:items-center justify-center p-4 bg-[#201616]/50"
      onClick={onClose}
    >
      <div
        className="bg-[#fffffc] w-full max-w-sm p-6 shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-heading text-xl text-[#201616]">{product.name}</h3>
          <button onClick={onClose} className="text-[#201616]/30 hover:text-[#201616] text-xl">✕</button>
        </div>
        <p className="text-[10px] tracking-widest uppercase text-[#201616]/50 mb-3">Zgjidh Madhësinë</p>
        <div className="flex flex-wrap gap-2 mb-5">
          {sizes.map((s) => (
            <button
              key={s}
              onClick={() => setSelectedSize(s)}
              className={`px-3 py-1.5 text-xs border transition-colors ${
                selectedSize === s
                  ? 'bg-[#201616] text-[#fffef2] border-[#201616]'
                  : 'border-[#201616]/30 text-[#201616] hover:border-[#201616]'
              }`}
            >
              {s}
            </button>
          ))}
        </div>
        <button
          onClick={handleAdd}
          disabled={!selectedSize}
          className="w-full bg-[#201616] text-[#fffef2] py-3 text-xs tracking-[0.25em] uppercase font-body hover:bg-[#3a2828] transition-colors disabled:opacity-40"
        >
          Shto në Shportë
        </button>
      </div>
    </div>
  );
}

function ProductCard({ product, inStock }: { product: Product; inStock: boolean }) {
  const { add, openDrawer } = useCart();
  const [quickAddOpen, setQuickAddOpen] = useState(false);
  const [justAdded, setJustAdded] = useState(false);

  const isRing = product.type === 'Unaza';

  const handleQuickAdd = (e: React.MouseEvent) => {
    e.preventDefault();
    if (!inStock) return;
    if (isRing) {
      setQuickAddOpen(true);
    } else {
      add(product);
      openDrawer();
      setJustAdded(true);
      setTimeout(() => setJustAdded(false), 1500);
    }
  };

  return (
    <>
      {quickAddOpen && (
        <QuickAddModal product={product} onClose={() => setQuickAddOpen(false)} />
      )}
      <div className="group relative">
        <Link href={`/dyqan/${product.id}`}>
          {/* Image */}
          <div className="aspect-square relative bg-cream-warm border border-stone-light/20 mb-3 overflow-hidden group-hover:border-gold transition-colors duration-300">
            <Image
              src={product.image}
              alt={product.name}
              fill
              className={`object-cover group-hover:scale-105 transition-transform duration-500 ${!inStock ? 'opacity-50' : ''}`}
              sizes="(max-width: 768px) 50vw, 25vw"
            />
            {/* Discount / Out of stock badge */}
            {inStock ? (
              <span className="absolute top-2 left-2 bg-[#b31b1b] text-[#fffef2] text-[10px] font-bold tracking-widest uppercase px-2 py-1">
                −33%
              </span>
            ) : (
              <span className="absolute top-2 left-2 bg-[#201616]/70 text-[#fffef2] text-[10px] font-bold tracking-widest uppercase px-2 py-1">
                Pa Stok
              </span>
            )}

            {/* Quick Add overlay - desktop hover */}
            {inStock && (
              <button
                onClick={handleQuickAdd}
                className={`absolute bottom-0 left-0 right-0 py-2.5 text-[10px] tracking-[0.25em] uppercase font-body transition-all duration-200 ${
                  justAdded
                    ? 'bg-green-700 text-white translate-y-0 opacity-100'
                    : 'bg-[#201616] text-[#fffef2] translate-y-full opacity-0 group-hover:translate-y-0 group-hover:opacity-100'
                }`}
              >
                {justAdded ? '✓ U Shtua' : isRing ? 'Zgjidh Madhësinë' : '+ Shto në Shportë'}
              </button>
            )}
          </div>

          {/* Product info */}
          <p className="text-xs uppercase tracking-widest text-stone mb-1">{product.type}</p>
          <h3 className="font-heading text-lg text-brown mb-1 group-hover:text-burgundy transition-colors leading-tight">
            {product.name}
          </h3>

          {/* Stone + Meaning badges */}
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
            <p className="text-xs text-stone/40 font-body">I Pasiguruar</p>
          )}
        </Link>

        {/* Mobile Quick Add button (always visible, below card) */}
        {inStock && (
          <button
            onClick={handleQuickAdd}
            className={`sm:hidden mt-2 w-full py-2 text-[10px] tracking-[0.2em] uppercase font-body border transition-colors ${
              justAdded
                ? 'bg-green-700 text-white border-green-700'
                : 'border-[#201616]/20 text-[#201616]/70 hover:border-[#201616] hover:text-[#201616]'
            }`}
          >
            {justAdded ? '✓ U Shtua' : isRing ? 'Zgjidh Madhësinë' : '+ Shto'}
          </button>
        )}
      </div>
    </>
  );
}

const SORT_LABELS: Record<SortOption, string> = {
  'default':    'Renditja: Standard',
  'price-asc':  'Çmimi: ↑ Lirë → Shtrenjtë',
  'price-desc': 'Çmimi: ↓ Shtrenjtë → Lirë',
  'name-az':    'Emri: A → Z',
};

export default function ShopGrid({
  products,
  inventory,
}: {
  products: Product[];
  inventory: Record<string, number>;
}) {
  const [sort, setSort] = useState<SortOption>('default');

  const numericPrice = (p: Product) => parseFloat(salePrice(p.price).replace('€', ''));

  const inStock = products.filter((p) => (inventory[p.id] ?? 10) > 0);
  const outOfStock = products.filter((p) => (inventory[p.id] ?? 10) === 0);

  const sorted = [...inStock].sort((a, b) => {
    if (sort === 'price-asc') return numericPrice(a) - numericPrice(b);
    if (sort === 'price-desc') return numericPrice(b) - numericPrice(a);
    if (sort === 'name-az') return a.name.localeCompare(b.name);
    return 0;
  });

  return (
    <>
      {/* Sort bar */}
      <div className="flex items-center justify-between mb-8">
        <p className="text-xs text-stone/60 font-body">{inStock.length} produkte</p>
        <div className="relative">
          <select
            value={sort}
            onChange={(e) => setSort(e.target.value as SortOption)}
            className="text-xs font-body border border-[#201616]/15 bg-[#fffffc] text-[#201616] px-4 py-2 pr-8 appearance-none focus:outline-none focus:border-[#201616] cursor-pointer"
          >
            {(Object.keys(SORT_LABELS) as SortOption[]).map((k) => (
              <option key={k} value={k}>{SORT_LABELS[k]}</option>
            ))}
          </select>
          <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-[#201616]/40 text-xs">▾</span>
        </div>
      </div>

      {/* In-stock grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mb-16">
        {sorted.map((p) => (
          <ProductCard key={p.id} product={p} inStock={true} />
        ))}
      </div>

      {/* Out of stock */}
      {outOfStock.length > 0 && (
        <div>
          <h2 className="text-xs tracking-[0.3em] uppercase text-stone/40 mb-6 border-t border-stone-light/20 pt-8">
            Produktet e Pasiguruara
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {outOfStock.map((p) => (
              <ProductCard key={p.id} product={p} inStock={false} />
            ))}
          </div>
        </div>
      )}
    </>
  );
}
