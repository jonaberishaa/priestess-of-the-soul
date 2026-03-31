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
            <h2 className="font-heading text-4xl text-brown mb-2">Jona Berisha</h2>
            <p className="font-script text-2xl text-gold mb-8">Priestess of the Soul</p>

            <div className="flex flex-col gap-6 text-stone leading-[1.9]">
              <p>
                Priestess of the Soul lindi nga një ndjesi e thellë - nga dashuria për gjërat e bukura
                në jetë. Sepse stolia e vërtetë nuk është vetëm ajo që sheh syri, por ajo që ndjek shpirti.
              </p>
              <p>
                Çdo unazë, çdo gerdane, çdo vathë në koleksionin tonë është krijuar me duart e artizanëve
                të talentuar, me ar 18K të vërtetë dhe gurë natyralë të zgjedhur me dashuri e kujdes.
                Asnjë copë nuk është si tjetra - sikurse asnjë prej nesh nuk është si tjetri.
              </p>
              <p>
                Besoj se gratë e fuqishme meritojnë stoli që flasin për to kur ato heshtin.
                Gurët natyralë mbajnë histori dhe energji - secili me kuptim të thellë e të veçantë.
                Kur i mban pranë zemrës, të kujtojnë kush je me të vërtetë.
              </p>
              <p className="italic text-[#201616]/50">
                "Ky brand është dashuri kthyer në krijim - dhe shpresoj ta ndješ atë sa herë që e vesh."
              </p>
            </div>

            {/* Divider */}
            <div className="flex items-center gap-4 my-8">
              <div className="flex-1 h-px bg-stone-light/30" />
              <span className="text-gold text-xs tracking-[0.4em] uppercase">Filozofia</span>
              <div className="flex-1 h-px bg-stone-light/30" />
            </div>

            <div className="grid grid-cols-3 gap-6 text-center">
              {[
                { value: '18K', label: 'Ar i Vërtetë' },
                { value: '✦', label: 'Çdo copë me dorë' },
                { value: '100%', label: 'Gurë Natyralë' },
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
