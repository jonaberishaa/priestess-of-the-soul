import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-[#201616] text-[#fffef2]">
      <div className="max-w-[1600px] mx-auto px-8 py-16 grid grid-cols-1 md:grid-cols-4 gap-10">
        {/* Brand */}
        <div className="md:col-span-2">
          <h3 className="font-heading text-2xl mb-4">Priestess of the Soul</h3>
          <p className="text-sm text-[#fffef2]/60 leading-relaxed max-w-sm font-body">
            Bizhuteri artizanale me gurë të çmuar natyralë dhe ar 14K të vërtetë.
            Çdo copë është unike, e bërë me dashuri dhe intension.
          </p>
          <div className="flex gap-5 mt-6">
            <a href="https://instagram.com/priestessofthesoul" target="_blank" rel="noreferrer" aria-label="Instagram" className="text-[#fffef2]/70 hover:text-[#fffef2] transition-colors">
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
              </svg>
            </a>
            <a href="https://tiktok.com/@priestessofthesoul" target="_blank" rel="noreferrer" aria-label="TikTok" className="text-[#fffef2]/70 hover:text-[#fffef2] transition-colors">
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1V9.01a6.32 6.32 0 00-.79-.05 6.34 6.34 0 00-6.34 6.34 6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.33-6.34V8.69a8.18 8.18 0 004.78 1.52V6.75a4.85 4.85 0 01-1.01-.06z" />
              </svg>
            </a>
          </div>
          <p className="text-xs text-[#fffef2]/30 mt-3 font-body">@priestessofthesoul</p>
        </div>

        {/* Shop */}
        <div>
          <h4 className="text-[10px] tracking-widest uppercase text-[#fffef2]/40 mb-4">Dyqani</h4>
          <ul className="flex flex-col gap-2">
            {[
              { label: 'Të gjitha', href: '/dyqan' },
              { label: 'Unaza', href: '/dyqan?kategori=unaza' },
              { label: 'Vathë', href: '/dyqan?kategori=vathe' },
              { label: 'Qafore', href: '/dyqan?kategori=gerdane' },
              { label: 'Rose & Stardust', href: '/dyqan/rose-stardust' },
            ].map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="text-sm text-[#fffef2]/60 hover:text-[#fffef2] transition-colors font-body">{item.label}</Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Info */}
        <div>
          <h4 className="text-[10px] tracking-widest uppercase text-[#fffef2]/40 mb-4">Informacion</h4>
          <ul className="flex flex-col gap-2">
            {[
              { label: 'Rreth Meje', href: '/rreth-meje' },
              { label: 'Kontakt', href: '/kontakt' },
              { label: 'Politika e Privatësisë', href: '/privacy-policy' },
              { label: 'Politika e Kthimeve', href: '/refund-policy' },
              { label: 'Kushtet e Shërbimit', href: '/terms-of-service' },
            ].map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="text-sm text-[#fffef2]/60 hover:text-[#fffef2] transition-colors font-body">{item.label}</Link>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="border-t border-[#fffef2]/10 px-8 py-5 max-w-[1600px] mx-auto flex flex-col md:flex-row justify-between items-center gap-2">
        <p className="text-xs text-[#fffef2]/30 font-body">© {new Date().getFullYear()}, Priestess of the Soul</p>
        <p className="text-xs text-[#fffef2]/30 font-body">Bizhuteri artizanale • Gurë natyralë • Ar 14K</p>
      </div>
    </footer>
  );
}
