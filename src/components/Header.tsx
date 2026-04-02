'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import SearchModal from '@/components/SearchModal';
import { useWishlist } from '@/components/WishlistContext';
import { useCart } from '@/components/CartContext';
import CartDrawer from '@/components/CartDrawer';

const leftNav = [
  {
    label: 'Dyqani',
    children: {
      columns: [
        {
          heading: 'Koleksioni',
          links: [
            { href: '/dyqan/bestsellers', label: 'Më të shiturat' },
            { href: '/dyqan', label: 'Të gjitha' },
            { href: '/dyqan?kategori=unaza', label: 'Unaza' },
            { href: '/dyqan?kategori=vathe', label: 'Vathë' },
            { href: '/dyqan?kategori=gerdane', label: 'Qafore' },
          ],
        },
        {
          heading: 'Sipas Gurëve',
          links: [
            { href: '/dyqan/ametist', label: 'Ametist' },
            { href: '/dyqan/kuarc-i-bardhe', label: 'Kuarc i Bardhë' },
            { href: '/dyqan/kuarc-roze', label: 'Kuarc Rozë' },
            { href: '/dyqan/obsidian-i-zi', label: 'Obsidian i Zi' },
            { href: '/dyqan/turmaline-e-zeze', label: 'Turmalinë e Zezë' },
            { href: '/dyqan/citrine', label: 'Citrinë' },
            { href: '/dyqan/guri-henes', label: 'Guri Hënës' },
            { href: '/dyqan/opal', label: 'Opal' },
            { href: '/dyqan/topaz', label: 'Topaz' },
          ],
        },
        {
          heading: 'Sipas Kuptimit',
          links: [
            { href: '/dyqan/dashuri', label: 'Dashni & Zemër' },
            { href: '/dyqan/qartesi', label: 'Qartësi & Intuitë' },
            { href: '/dyqan/shendet', label: 'Shëndet & Energji' },
            { href: '/dyqan/manifestim', label: 'Manifestim & Bollëk' },
          ],
        },
      ],
    },
  },
];

const rightNav = [
  { href: '/blog', label: 'Blog' },
  { href: '/rreth-meje', label: 'Rreth Meje' },
  { href: '/kontakt', label: 'Kontakt' },
];

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [shopOpen, setShopOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const { items: wishlistItems } = useWishlist();
  const { count: cartCount, openDrawer } = useCart();

  return (
    <>
      <CartDrawer />
      <SearchModal open={searchOpen} onClose={() => setSearchOpen(false)} />
      <header className="sticky top-0 z-50 bg-[#fffffc] border-b border-[#201616]/10">
        <div className="max-w-[1600px] mx-auto px-8 h-[76px] flex items-center justify-between">

          {/* Left nav - desktop */}
          <nav className="hidden md:flex items-center gap-7 flex-1">
            <div className="relative" onMouseEnter={() => setShopOpen(true)} onMouseLeave={() => setShopOpen(false)}>
              <button className="nav-link flex items-center gap-1">
                Dyqani
                <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              {shopOpen && (
                <div className="absolute top-full left-0 bg-[#fffffc] border border-[#201616]/10 shadow-lg grid grid-cols-3 gap-0 p-7 min-w-[560px]">
                  {leftNav[0].children.columns.map((col) => (
                    <div key={col.heading}>
                      <p className="text-[10px] tracking-[0.25em] uppercase text-[#201616]/40 mb-3 font-body">{col.heading}</p>
                      {col.links.map((l) => (
                        <Link key={l.href} href={l.href} className="block text-sm text-[#201616] hover:text-[#b31b1b] py-[3px] transition-colors font-body">
                          {l.label}
                        </Link>
                      ))}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </nav>

          {/* Center logo */}
          <div className="flex-1 flex justify-center md:flex-none">
            <Link href="/" className="block">
              <Image
                src="https://nnmqu1-tb.myshopify.com/cdn/shop/files/ChatGPT_Image_Apr_4_2025_06_14_39_PM.png?v=1743783311&width=600"
                alt="Priestess of the Soul"
                width={120}
                height={48}
                className="object-contain h-16 w-auto"
                priority
              />
            </Link>
          </div>

          {/* Right nav - desktop */}
          <nav className="hidden md:flex items-center gap-7 flex-1 justify-end">
            {rightNav.map((l) => (
              <Link key={l.href} href={l.href} className="nav-link">{l.label}</Link>
            ))}
            <div className="flex items-center gap-4 ml-2">
              <button aria-label="Kërko" onClick={() => setSearchOpen(true)} className="text-[#201616] hover:text-[#b31b1b] transition-colors">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </button>
              <Link href="/wishlist" aria-label="Të preferuarat" className="relative text-[#201616] hover:text-[#b31b1b] transition-colors">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
                {wishlistItems.length > 0 && (
                  <span className="absolute -top-1.5 -right-1.5 bg-[#b31b1b] text-[#fffef2] text-[9px] w-4 h-4 flex items-center justify-center">
                    {wishlistItems.length}
                  </span>
                )}
              </Link>
              <button onClick={openDrawer} aria-label="Shporta" className="relative text-[#201616] hover:text-[#b31b1b] transition-colors">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                </svg>
                {cartCount > 0 && (
                  <span className="absolute -top-1.5 -right-1.5 bg-[#b31b1b] text-[#fffef2] text-[9px] w-4 h-4 flex items-center justify-center">
                    {cartCount}
                  </span>
                )}
              </button>
            </div>
          </nav>

          {/* Mobile icons */}
          <div className="flex md:hidden items-center gap-4">
            <button aria-label="Kërko" onClick={() => setSearchOpen(true)} className="text-[#201616]">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </button>
            <Link href="/wishlist" className="relative text-[#201616]">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
              {wishlistItems.length > 0 && (
                <span className="absolute -top-1.5 -right-1.5 bg-[#b31b1b] text-[#fffef2] text-[9px] w-4 h-4 flex items-center justify-center">
                  {wishlistItems.length}
                </span>
              )}
            </Link>
            <button onClick={openDrawer} className="relative text-[#201616]">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
              </svg>
              {cartCount > 0 && (
                <span className="absolute -top-1.5 -right-1.5 bg-[#b31b1b] text-[#fffef2] text-[9px] w-4 h-4 flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </button>
            <button onClick={() => setMobileOpen(!mobileOpen)} aria-label="Menu" className="text-[#201616]">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {mobileOpen
                  ? <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
                  : <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 6h16M4 12h16M4 18h16" />}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {mobileOpen && (
          <div className="md:hidden bg-[#fffffc] border-t border-[#201616]/10 px-6 py-6 flex flex-col gap-3">
            <p className="text-[10px] tracking-widest uppercase text-[#201616]/40">Koleksioni</p>
            {leftNav[0].children.columns[0].links.map((l) => (
              <Link key={l.href} href={l.href} className="nav-link pl-2" onClick={() => setMobileOpen(false)}>{l.label}</Link>
            ))}
            <hr className="border-[#201616]/10 my-1" />
            {rightNav.map((l) => (
              <Link key={l.href} href={l.href} className="nav-link" onClick={() => setMobileOpen(false)}>{l.label}</Link>
            ))}
          </div>
        )}
      </header>
    </>
  );
}
