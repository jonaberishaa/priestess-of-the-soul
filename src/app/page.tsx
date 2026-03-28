import Header from '@/components/Header';
import Hero from '@/components/Hero';
import Newsletter from '@/components/Newsletter';
import Footer from '@/components/Footer';
import Link from 'next/link';

const categories = [
  { name: 'Unaza', href: '/dyqan/unaza', description: 'Unaza me gur natyral' },
  { name: 'Vathë', href: '/dyqan/vathe', description: 'Vathë artizanale' },
  { name: 'Gerdane', href: '/dyqan/gerdane', description: 'Gerdane me zinxhir ar' },
];

const gemstones = [
  { name: 'Ametist', meaning: 'Qetësi & Intuitë', color: 'bg-purple-100' },
  { name: 'Kuarc Rozë', meaning: 'Dashuri & Harmoni', color: 'bg-rose-100' },
  { name: 'Kuarc Transparent', meaning: 'Qartësi & Energji', color: 'bg-slate-100' },
  { name: 'Obsidian i Zi', meaning: 'Mbrojtje & Tokëzim', color: 'bg-gray-200' },
];

export default function HomePage() {
  return (
    <>
      <Header />
      <main>
        {/* Hero */}
        <Hero />

        {/* Categories */}
        <section className="py-20 px-6 bg-cream">
          <div className="max-w-content mx-auto">
            <p className="text-xs tracking-[0.3em] uppercase text-gold mb-3 text-center">Koleksioni</p>
            <h2 className="section-title text-center mb-12">Zbulo Stolin Tënde</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {categories.map((cat) => (
                <Link
                  key={cat.href}
                  href={cat.href}
                  className="group relative aspect-[3/4] bg-cream-warm border border-stone-light/20 overflow-hidden flex flex-col justify-end p-6 hover:border-gold transition-colors duration-300"
                >
                  {/* Image placeholder */}
                  <div className="absolute inset-0 flex items-center justify-center text-stone/20">
                    <svg className="w-20 h-20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={0.75} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <div className="relative">
                    <p className="text-xs tracking-widest uppercase text-stone mb-1">{cat.description}</p>
                    <h3 className="font-heading text-2xl text-brown group-hover:text-burgundy transition-colors">{cat.name}</h3>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Gemstones */}
        <section className="py-20 px-6 bg-cream-warm">
          <div className="max-w-content mx-auto">
            <p className="text-xs tracking-[0.3em] uppercase text-gold mb-3 text-center">Gurët Tanë</p>
            <h2 className="section-title text-center mb-12">Çdo Gur Mbart një Histori</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {gemstones.map((gem) => (
                <Link
                  key={gem.name}
                  href={`/dyqan/${gem.name.toLowerCase().replace(' ', '-')}`}
                  className="group text-center p-6 border border-stone-light/20 hover:border-gold transition-colors duration-300 bg-cream"
                >
                  <div className={`w-16 h-16 rounded-full ${gem.color} mx-auto mb-4`} />
                  <h3 className="font-heading text-lg text-brown mb-1 group-hover:text-burgundy transition-colors">{gem.name}</h3>
                  <p className="text-xs text-stone">{gem.meaning}</p>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Brand story */}
        <section className="py-20 px-6 bg-cream">
          <div className="max-w-content mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="aspect-square bg-cream-warm border border-stone-light/20 flex items-center justify-center text-stone/30">
              <svg className="w-20 h-20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={0.75} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>
            <div>
              <p className="text-xs tracking-[0.3em] uppercase text-gold mb-4">Historia Ime</p>
              <h2 className="section-title mb-6">Krijuar me Dashuri, Mbajtur me Kuptim</h2>
              <p className="text-stone leading-relaxed mb-4">
                Çdo bizhuteri që krijoj fillon me një gur — të zgjedhur me kujdes, mbajtur në duar, ndjerë.
                Besoj se gurët natyralë mbajnë energji dhe se kur i veshim, bëhemi pjesë e diçkaje më të madhe.
              </p>
              <p className="text-stone leading-relaxed mb-8">
                Punë me ar 14K të vërtetë dhe gurë të çmuar natyralë. Asnjë copë nuk është identike me tjetrën —
                sepse asnjë prej jush nuk është.
              </p>
              <Link href="/rreth-meje" className="btn-outline">
                Lexo Më Shumë
              </Link>
            </div>
          </div>
        </section>

        {/* Newsletter */}
        <Newsletter />
      </main>
      <Footer />
    </>
  );
}
