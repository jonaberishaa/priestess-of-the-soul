import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Newsletter from '@/components/Newsletter';

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
          {/* Image placeholder */}
          <div className="aspect-[3/4] bg-cream-warm border border-stone-light/20 flex items-center justify-center text-stone/30 sticky top-24">
            <svg className="w-20 h-20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={0.75} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
          </div>

          {/* Text */}
          <div className="py-4">
            <h2 className="font-heading text-4xl text-brown mb-6">Krijuese e Bizhuterive me Shpirt</h2>
            <div className="flex flex-col gap-5 text-stone leading-relaxed">
              <p>
                Çdo bizhuteri që krijohet këtu fillon me një bisedë — me gurin, me veten, me idenë e asaj
                që dëshiron të ndjesh kur e vesh.
              </p>
              <p>
                Punojmë me ar 14K të vërtetë dhe gurë të çmuar natyralë, të zgjedhur me kujdes nga burime
                etike. Asnjë copë nuk është masive — çdo gjë krijohet me dorë, me qëllim dhe me dashuri.
              </p>
              <p>
                Besoj se bizhuteritë janë më shumë se stoli. Janë mbresa, faza jete, dashuri. Janë mënyra
                si mbajmë pranë gjërat që na bëjnë të ndihemi ne vetë.
              </p>
              <p>
                Priestess of the Soul lindi nga dashuria për gurët natyralë dhe besimi se secili prej tyre
                mbart energji unike. Kur i kombinoj me ar, krijohet diçka e veçantë — jo vetëm vizualisht,
                por edhe energjetikisht.
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
