import AnnouncementBar from '@/components/AnnouncementBar';
import Header from '@/components/Header';
import Hero from '@/components/Hero';
import Newsletter from '@/components/Newsletter';
import Footer from '@/components/Footer';
import { getFeatured, getByType } from '@/data/products';
import Image from 'next/image';
import Link from 'next/link';

function ProductCard({ product }: { product: { id: string; name: string; type: string; price: string; image: string } }) {
  return (
    <Link href={`/dyqan/${product.id}`} className="group block">
      <div className="aspect-square relative overflow-hidden bg-[#f6f5e9] mb-3">
        <Image
          src={product.image}
          alt={product.name}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-700"
          sizes="(max-width: 768px) 50vw, 25vw"
        />
      </div>
      <p className="text-[10px] uppercase tracking-[0.2em] text-[#201616]/50 mb-1 font-body">{product.type}</p>
      <h3 className="font-heading text-base text-[#201616] mb-1 group-hover:text-[#b31b1b] transition-colors">{product.name}</h3>
      <p className="text-sm text-[#201616]/70 font-body">{product.price}</p>
    </Link>
  );
}

export default function HomePage() {
  const featured = getFeatured();
  const rings = getByType('Unaza').slice(0, 4);

  return (
    <>
      <AnnouncementBar />
      <Header />
      <main>
        {/* Hero */}
        <Hero />

        {/* Featured products */}
        <section className="py-16 px-6 bg-[#fffffc]">
          <div className="max-w-[1600px] mx-auto">
            <div className="flex items-end justify-between mb-10">
              <div>
                <p className="text-[10px] tracking-[0.3em] uppercase text-[#201616]/50 mb-2">Koleksioni i Ri</p>
                <h2 className="font-heading text-4xl md:text-5xl text-[#201616]">Të Preferuarat</h2>
              </div>
              <Link href="/dyqan" className="text-xs tracking-widest uppercase text-[#201616] border-b border-[#201616] pb-0.5 hover:text-[#b31b1b] hover:border-[#b31b1b] transition-colors">
                Shiko të gjitha
              </Link>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-x-5 gap-y-10">
              {featured.map((p) => <ProductCard key={p.id} product={p} />)}
            </div>
          </div>
        </section>

        {/* Arritje të reja / Rose & Stardust */}
        <section className="py-16 px-6 bg-[#fffffc]">
          <div className="max-w-4xl mx-auto">
            <h2 className="font-heading text-4xl md:text-5xl text-[#201616] mb-10">Arritje të reja...</h2>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="https://priestessofthesoul.com/cdn/shop/files/Minimalist_photo_collage_handmade_jewelry_Facebook_cover_3.png?v=1763915563&width=3200"
              alt="Rose & Stardust Collection"
              className="w-full object-cover mb-8"
            />
            <div className="border-t border-[#201616]/10 pt-8">
              <h3 className="font-heading text-2xl text-[#201616] mb-4">Koleksioni &quot;Rose &amp; Stardust&quot;</h3>
              <p className="text-[#201616]/70 font-body leading-relaxed mb-2">
                Punuar me dorë nga ari i ricikluar 14K dhe argjendi i pastër, frymëzuar nga
                trëndafilat e egër dhe pluhuri i yjeve të lashtë, çdo aksesorë është një thirrje për
                shpirtin tënd të lashtë.
              </p>
              <p className="text-[#201616] font-body font-bold mb-2">Këto nuk janë thjesht stoli.</p>
              <p className="text-[#201616]/70 font-body leading-relaxed mb-6">
                Janë amuleta shpirti, krijuar për t&apos;u mbajtur me zemër — për të të kujtuar fuqinë
                tënde si Perëndeshe apo Grua e Shenjtë që ecën ndërmjet botëve.
              </p>
              <Link href="/dyqan/rose-stardust" className="text-[#201616] font-body text-sm border-b border-[#201616] pb-0.5 hover:text-[#b31b1b] hover:border-[#b31b1b] transition-colors">
                Zbulo Koleksionin →
              </Link>
            </div>
          </div>
        </section>

        {/* Rings featured */}
        <section className="py-16 px-6 bg-[#f6f5e9]">
          <div className="max-w-[1600px] mx-auto">
            <div className="flex items-end justify-between mb-10">
              <div>
                <p className="text-[10px] tracking-[0.3em] uppercase text-[#201616]/50 mb-2">Koleksioni</p>
                <h2 className="font-heading text-4xl md:text-5xl text-[#201616]">Unaza</h2>
              </div>
              <Link href="/dyqan?kategori=unaza" className="text-xs tracking-widest uppercase text-[#201616] border-b border-[#201616] pb-0.5 hover:text-[#b31b1b] hover:border-[#b31b1b] transition-colors">
                Shiko të gjitha
              </Link>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-x-5 gap-y-10">
              {rings.map((p) => <ProductCard key={p.id} product={p} />)}
            </div>
          </div>
        </section>

        {/* Sacred ornaments section */}
        <section className="py-20 px-6 bg-[#fffffc] text-center">
          <div className="max-w-2xl mx-auto">
            <p className="text-[10px] tracking-[0.3em] uppercase text-[#201616]/50 mb-4">Filozofia Jonë</p>
            <h2 className="font-heading text-4xl md:text-5xl text-[#201616] leading-tight mb-6">
              Stoli të shenjta, të harmonizuara me shpirtin tënd
            </h2>
            <p className="text-[#201616]/60 leading-relaxed font-body text-sm mb-10">
              Çdo copë është krijuar si një amuletë shpirtërore — për ata që kërkojnë
              të rilidhur me fuqinë e tyre të brendshme. Gurët natyralë mbajnë energji.
              Kur i veshim, bëhemi pjesë e diçkaje më të madhe.
            </p>
            <Link href="/dyqan" className="inline-block border border-[#201616] text-[#201616] px-10 py-3 text-xs tracking-[0.25em] uppercase hover:bg-[#201616] hover:text-[#fffef2] transition-colors">
              Shiko Koleksionin
            </Link>
          </div>
        </section>

        {/* Newsletter */}
        <Newsletter />
      </main>
      <Footer />
    </>
  );
}
