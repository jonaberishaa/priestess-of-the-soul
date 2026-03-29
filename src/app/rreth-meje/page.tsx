import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Newsletter from '@/components/Newsletter';
import Image from 'next/image';

export default function AboutPage() {
  return (
    <>
      <Header />
      <main className="bg-cream">
        {/* Banner */}
        <div className="bg-cream-warm border-b border-stone-light/20 py-16 px-6 text-center">
          <p className="text-xs tracking-[0.3em] uppercase text-gold mb-3">Historia Ime</p>
          <h1 className="font-heading text-5xl text-brown">Rreth Meje</h1>
        </div>

        {/* Content */}
        <div className="max-w-content mx-auto px-6 py-20 grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          {/* Photo */}
          <div className="aspect-[3/4] relative overflow-hidden sticky top-24">
            <Image
              src="https://img.lightshot.app/7lm5HcArSvm-rm7GkWu9iw.png"
              alt="Founder of Priestess of the Soul"
              fill
              className="object-cover object-top"
              sizes="(max-width: 1024px) 100vw, 50vw"
              priority
            />
          </div>

          {/* Text */}
          <div className="py-4">
            <p className="text-xs tracking-[0.3em] uppercase text-[#b31b1b] mb-3">Themeluese</p>
            <h2 className="font-heading text-4xl text-brown mb-6">Priestess of the Soul</h2>
            <div className="flex flex-col gap-5 text-stone leading-relaxed">
              <p>
                Jam themeluese e Priestess of the Soul — një brand i krijuar nga dashuria për bukurinë
                e vërtetë, gurët natyralë dhe energjinë që mbajmë pranë.
              </p>
              <p>
                Çdo bizhuteri në koleksionin tonë krijohet me dorë nga artizanë të talentuar, me ar 14K
                të vërtetë dhe gurë të çmuar natyralë të zgjedhur me kujdes nga burime etike.
              </p>
              <p>
                Besoj se bizhuteritë janë më shumë se stoli. Janë mbresa, faza jete, dashuri. Janë mënyra
                si mbajmë pranë gjërat që na bëjnë të ndihemi ne vetë.
              </p>
              <p>
                Priestess of the Soul lindi nga besimi se secili gur natyral mbart energji unike — dhe kur
                kombinohet me artin e duarve të artizanëve tanë, krijohet diçka vërtet e veçantë.
              </p>
            </div>

            <div className="mt-10 grid grid-cols-3 gap-6 text-center">
              {[
                { value: '100%', label: 'Ar i Vërtetë 14K' },
                { value: 'Artizanal', label: 'Çdo copë me dorë' },
                { value: 'Natyral', label: 'Gurë të çmuar' },
              ].map((stat) => (
                <div key={stat.label} className="border border-stone-light/30 p-4">
                  <p className="font-heading text-2xl text-burgundy mb-1">{stat.value}</p>
                  <p className="text-xs text-stone uppercase tracking-widest">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        <Newsletter />
      </main>
      <Footer />
    </>
  );
}
