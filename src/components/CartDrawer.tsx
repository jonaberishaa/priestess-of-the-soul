'use client';

import { useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useCart } from '@/components/CartContext';
import { salePrice } from '@/data/products';

export default function CartDrawer() {
  const { items, remove, updateQuantity, total, savings, count, drawerOpen, closeDrawer } = useCart();

  // Lock body scroll when drawer open
  useEffect(() => {
    if (drawerOpen) document.body.style.overflow = 'hidden';
    else document.body.style.overflow = '';
    return () => { document.body.style.overflow = ''; };
  }, [drawerOpen]);

  if (!drawerOpen) return null;

  return (
    <>
      {/* Overlay */}
      <div
        className="fixed inset-0 z-[80] bg-[#201616]/40 backdrop-blur-sm"
        onClick={closeDrawer}
      />

      {/* Drawer */}
      <div className="fixed top-0 right-0 z-[90] h-full w-full max-w-[420px] bg-[#fffffc] shadow-2xl flex flex-col">

        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-[#201616]/10">
          <div>
            <h2 className="font-heading text-2xl text-[#201616]">Shporta</h2>
            {count > 0 && (
              <p className="text-xs text-[#201616]/50 font-body mt-0.5">{count} {count === 1 ? 'artikull' : 'artikuj'}</p>
            )}
          </div>
          <button
            onClick={closeDrawer}
            className="text-[#201616]/30 hover:text-[#201616] transition-colors text-2xl leading-none"
          >
            ✕
          </button>
        </div>

        {/* Items */}
        <div className="flex-1 overflow-y-auto px-6 py-4">
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center">
              <svg className="w-16 h-16 text-[#201616]/10 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
              </svg>
              <p className="font-heading text-xl text-[#201616]/40 mb-2">Shporta është bosh</p>
              <p className="text-xs text-[#201616]/30 font-body mb-6">Shto produkte për të filluar</p>
              <button
                onClick={closeDrawer}
                className="text-xs tracking-[0.25em] uppercase border border-[#201616]/20 text-[#201616]/50 px-6 py-2.5 hover:border-[#201616] hover:text-[#201616] transition-colors font-body"
              >
                Vazhdo Blerjet
              </button>
            </div>
          ) : (
            <div className="flex flex-col divide-y divide-[#201616]/8">
              {items.map((item) => (
                <div key={`${item.product.id}-${item.size}`} className="py-4 flex gap-3">
                  {/* Image */}
                  <Link href={`/dyqan/${item.product.id}`} onClick={closeDrawer}>
                    <div className="relative w-20 h-20 flex-shrink-0 bg-[#f5f0e8] border border-[#201616]/10 overflow-hidden">
                      <Image
                        src={item.product.image}
                        alt={item.product.name}
                        fill
                        className="object-cover"
                        sizes="80px"
                      />
                    </div>
                  </Link>

                  {/* Info */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2">
                      <Link
                        href={`/dyqan/${item.product.id}`}
                        onClick={closeDrawer}
                        className="font-heading text-base text-[#201616] leading-tight hover:text-[#b31b1b] transition-colors"
                      >
                        {item.product.name}
                      </Link>
                      <button
                        onClick={() => remove(item.product.id, item.size)}
                        className="text-[#201616]/20 hover:text-[#b31b1b] transition-colors flex-shrink-0 mt-0.5"
                        title="Hiq"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      </button>
                    </div>

                    {item.size && (
                      <p className="text-xs text-[#201616]/50 font-body mt-0.5">{item.size}</p>
                    )}
                    {item.message && (
                      <p className="text-[10px] text-[#201616]/40 font-body italic mt-0.5 leading-tight">
                        "{item.message.substring(0, 50)}{item.message.length > 50 ? '…' : ''}"
                      </p>
                    )}

                    <div className="flex items-center justify-between mt-2">
                      {/* Quantity */}
                      <div className="flex items-center border border-[#201616]/15">
                        <button
                          onClick={() => updateQuantity(item.product.id, item.size, item.quantity - 1)}
                          className="w-7 h-7 flex items-center justify-center text-[#201616] hover:bg-[#201616]/5 transition-colors text-sm"
                        >
                          −
                        </button>
                        <span className="w-7 h-7 flex items-center justify-center text-xs font-bold text-[#201616] font-body border-x border-[#201616]/15">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.product.id, item.size, item.quantity + 1)}
                          className="w-7 h-7 flex items-center justify-center text-[#201616] hover:bg-[#201616]/5 transition-colors text-sm"
                        >
                          +
                        </button>
                      </div>

                      {/* Price */}
                      <div className="text-right">
                        <p className="text-sm font-bold text-[#201616] font-body">
                          €{(parseFloat(salePrice(item.product.price).replace('€', '')) * item.quantity).toFixed(2).replace('.00', '')}
                        </p>
                        <p className="text-[10px] text-[#201616]/35 line-through font-body">
                          €{(parseFloat(item.product.price.replace('€', '')) * item.quantity).toFixed(2).replace('.00', '')}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        {items.length > 0 && (
          <div className="border-t border-[#201616]/10 px-6 py-5 flex flex-col gap-3">
            {/* Savings badge */}
            {savings !== '€0' && (
              <div className="flex items-center justify-center gap-1.5 bg-green-50 border border-green-200 py-2 px-3">
                <svg className="w-3.5 h-3.5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
                </svg>
                <span className="text-xs font-bold text-green-700 font-body">KURSIM TOTAL {savings}</span>
              </div>
            )}

            {/* Totals */}
            <div className="flex justify-between items-baseline">
              <span className="font-body text-sm text-[#201616]/60">Nëntotali</span>
              <span className="font-heading text-xl text-[#201616]">{total}</span>
            </div>
            <p className="text-xs text-center text-[#201616]/40 font-body -mt-1">✦ Dërgesa Falas</p>

            {/* Checkout button */}
            <Link
              href="/checkout"
              onClick={closeDrawer}
              className="w-full bg-[#201616] text-[#fffef2] py-4 text-xs tracking-[0.25em] uppercase font-body text-center hover:bg-[#3a2828] transition-colors"
            >
              Vazhdo te Checkout
            </Link>
            <button
              onClick={closeDrawer}
              className="w-full border border-[#201616]/20 text-[#201616]/60 py-3 text-xs tracking-[0.25em] uppercase font-body hover:border-[#201616] hover:text-[#201616] transition-colors"
            >
              Vazhdo Blerjet
            </button>
          </div>
        )}
      </div>
    </>
  );
}
