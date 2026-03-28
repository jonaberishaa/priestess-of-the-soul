import Header from '@/components/Header';
import Hero from '@/components/Hero';
import Newsletter from '@/components/Newsletter';
import Footer from '@/components/Footer';
import { getFeatured } from '@/data/products';
import Image from 'next/image';
import Link from 'next/link';

const gemstones = [
  { name: 'Ametist', meaning: 'Qetësi & Intuitë', color: 'bg-purple-200' },
  { name: 'Kuarc Rozë', meaning: 'Dashuri & Harmoni', color: 'bg-rose-200' },
  { name: 'Labrador', meaning: 'Magjia & Mbrojtje', color: 'bg-slate-300' },
  { name: 'Lapis Lazuli', meaning: 'Urtësia & E Vërteta', color: 'bg-blue-300' },
];

export default function HomePage() {
  const featured = getFeatured();

  return (
    <>
      <Header />
      <main>
        <Hero />

        {/* Featured products */}
        <section className="py-20 px-6 bg-cream">
          <div className="max-w-content mx-auto">
            <p className="text-xs tracking-[0.3em] uppercase text-gold mb-3 text-center">Koleksioni i Ri</p>
            <h2 className="font-heading text-4xl md:text-5xl text-brown text-center mb-12">Të Preferuarat</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {featured.map((product) => (
                <Link key={product.id} href={`/dyqan/${product.id}`} className="group">
                  <div className="aspect-square relative bg-cream-warm border border-stone-light/20 mb-3 overflow-hidden group-hover:border-gold transition-colors duration-300">
                    <Image
                      src={product.image}
                      alt={product.name}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                      sizes="(max-width: 768px) 50vw, 25vw"
                    />
                  </div>
                  <p className="text-xs uppercase tracking-widest text-stone mb-1">{product.type}</p>
                  <h3 className="font-heading text-base text-brown group-hover:text-burgundy transition-colors">{product.name}</h3>
                  <p className="text-burgundy text-sm mt-1">{product.price}</p>
                </Link>
              ))}
            </div>
            <div className="text-center mt-10">
              <Link href="/dyqan" className="btn-outline">
                Shiko të Gjitha
              </Link>
            </div>
          </div>
        </section>

        {/* Gemstones */}
        <section className="py-20 px-6 bg-cream-warm">
          <div className="max-w-content mx-auto">
            <p className="text-xs tracking-[0.3em] uppercase text-gold mb-3 text-center">Gurët Tanë</p>
            <h2 className="font-heading text-4xl md:text-5xl text-brown text-center mb-12">Çdo Gur Mbart një Histori</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {gemstones.map((gem) => (
                <div key={gem.name} className="text-center p-6 border border-stone-light/20 bg-cream">
                  <div className={`w-16 h-16 rounded-full ${gem.color} mx-auto mb-4`} />
                  <h3 className="font-heading text-lg text-brown mb-1">{gem.name}</h3>
                  <p className="text-xs text-stone">{gem.meaning}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Brand story */}
        <section className="py-20 px-6 bg-cream">
          <div className="max-w-content mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="aspect-[3/4] relative bg-cream-warm border border-stone-light/20 overflow-hidden">
              <Image
                src={featured[Math.floor(featured.length / 2)]?.image ?? ''}
                alt="Bizhuteri Priestess of the Soul"
                fill
                className="object-cover"
              />
            </div>
            <div>
              <p className="text-xs tracking-[0.3em] uppercase text-gold mb-4">Historia Ime</p>
              <h2 className="font-heading text-4xl md:text-5xl text-brown leading-tight mb-6">
                Krijuar me Dashuri,<br />Mbajtur me Kuptim
              </h2>
              <p className="text-stone leading-relaxed mb-4">
                Çdo bizhuteri që krijohet këtu fillon me një gur — të zgjedhur me kujdes, mbajtur në duar, ndjerë.
                Besoj se gurët natyralë mbajnë energji dhe se kur i veshim, bëhemi pjesë e diçkaje më të madhe.
              </p>
              <p className="text-stone leading-relaxed mb-8">
                Punojmë me argjend 925 dhe ar 14K të vërtetë. Asnjë copë nuk është identike me tjetrën —
                sepse asnjë prej jush nuk është.
              </p>
              <Link href="/rreth-meje" className="btn-outline">
                Lexo Më Shumë
              </Link>
            </div>
          </div>
        </section>

        <Newsletter />
      </main>
      <Footer />
    </>
  );
}
