'use client';

import { useState } from 'react';
import Link from 'next/link';

const shopLinks = [
  { href: '/dyqan', label: 'Të gjitha produktet' },
  { href: '/dyqan/unaza', label: 'Unaza' },
  { href: '/dyqan/vathë', label: 'Vathë' },
  { href: '/dyqan/gerdane', label: 'Gerdane' },
];

const gemstoneLinks = [
  { href: '/dyqan/ametist', label: 'Ametist' },
  { href: '/dyqan/kuarc-rozë', label: 'Kuarc Rozë' },
  { href: '/dyqan/kuarc-transparent', label: 'Kuarc Transparent' },
  { href: '/dyqan/obsidian', label: 'Obsidian i Zi' },
];

const meaningLinks = [
  { href: '/dyqan/dashuri', label: 'Dashuri & Zemra' },
  { href: '/dyqan/qartesi', label: 'Qartësi & Intuitë' },
  { href: '/dyqan/shendet', label: 'Shëndet & Energji' },
  { href: '/dyqan/manifestim', label: 'Manifestim & Bollëk' },
];

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [shopOpen, setShopOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-cream border-b border-stone-light/30">
      <div className="max-w-content mx-auto px-6 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="font-heading text-xl md:text-2xl tracking-wide text-brown">
          Priestess of the Soul
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-8">
          {/* Shop dropdown */}
          <div
            className="relative"
            onMouseEnter={() => setShopOpen(true)}
            onMouseLeave={() => setShopOpen(false)}
          >
            <button className="nav-link flex items-center gap-1">
              Dyqan
              <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>

            {shopOpen && (
              <div className="absolute top-full left-0 bg-cream border border-stone-light/30 shadow-lg min-w-[600px] grid grid-cols-3 gap-0 p-6">
                <div>
                  <p className="text-xs tracking-widest uppercase text-stone mb-3 font-body">Kategoritë</p>
                  {shopLinks.map((l) => (
                    <Link key={l.href} href={l.href} className="block text-sm text-brown hover:text-burgundy py-1 transition-colors">
                      {l.label}
                    </Link>
                  ))}
                </div>
                <div>
                  <p className="text-xs tracking-widest uppercase text-stone mb-3 font-body">Sipas Gurit</p>
                  {gemstoneLinks.map((l) => (
                    <Link key={l.href} href={l.href} className="block text-sm text-brown hover:text-burgundy py-1 transition-colors">
                      {l.label}
                    </Link>
                  ))}
                </div>
                <div>
                  <p className="text-xs tracking-widest uppercase text-stone mb-3 font-body">Sipas Kuptimit</p>
                  {meaningLinks.map((l) => (
                    <Link key={l.href} href={l.href} className="block text-sm text-brown hover:text-burgundy py-1 transition-colors">
                      {l.label}
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>

          <Link href="/koleksione" className="nav-link">Koleksione</Link>
          <Link href="/rreth-meje" className="nav-link">Rreth Meje</Link>
          <Link href="/kontakt" className="nav-link">Kontakt</Link>
        </nav>

        {/* Right icons */}
        <div className="flex items-center gap-4">
          <button aria-label="Kërko" className="text-brown hover:text-burgundy transition-colors">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </button>
          <Link href="/shporte" aria-label="Shportë" className="text-brown hover:text-burgundy transition-colors">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
            </svg>
          </Link>

          {/* Mobile hamburger */}
          <button
            className="md:hidden text-brown"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Menu"
          >
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
        <div className="md:hidden bg-cream border-t border-stone-light/30 px-6 py-6 flex flex-col gap-4">
          <p className="text-xs tracking-widest uppercase text-stone">Dyqan</p>
          {shopLinks.map((l) => (
            <Link key={l.href} href={l.href} className="nav-link pl-2" onClick={() => setMobileOpen(false)}>
              {l.label}
            </Link>
          ))}
          <hr className="border-stone-light/30" />
          <Link href="/koleksione" className="nav-link" onClick={() => setMobileOpen(false)}>Koleksione</Link>
          <Link href="/rreth-meje" className="nav-link" onClick={() => setMobileOpen(false)}>Rreth Meje</Link>
          <Link href="/kontakt" className="nav-link" onClick={() => setMobileOpen(false)}>Kontakt</Link>
        </div>
      )}
    </header>
  );
}
