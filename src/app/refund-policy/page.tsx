import type { Metadata } from 'next';
import AnnouncementBar from '@/components/AnnouncementBar';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export const metadata: Metadata = {
  title: 'Politika e Kthimeve',
  description: 'Politika e kthimeve dhe ndërrimeve për porositë e Priestess of the Soul - kushtet dhe procesi i kthimit.',
  alternates: { canonical: 'https://www.priestessofthesoul.com/refund-policy' },
};

export default function RefundPolicyPage() {
  return (
    <>
      <AnnouncementBar />
      <Header />
      <main className="bg-[#fffffc] min-h-screen">
        <div className="bg-[#f6f5e9] border-b border-[#201616]/10 py-16 px-6 text-center">
          <h1 className="font-heading text-5xl text-[#201616]">Politika e Kthimeve</h1>
        </div>
        <div className="max-w-3xl mx-auto px-6 py-20">
          <div className="flex flex-col gap-8 text-[#201616]/70 font-body text-sm leading-relaxed">

            <section>
              <h2 className="font-heading text-2xl text-[#201616] mb-3">Kthimet</h2>
              <p>
                Pranojmë kthime brenda <strong className="text-[#201616]">14 ditëve</strong> nga data e marrjes së porosisë.
                Produkti duhet të jetë i pakëputur, i palëvizur dhe në gjendjen origjinale me paketimin e tij.
              </p>
              <p className="mt-3">
                Bizhuteritë e personalizuara ose të porositura me specifikime të veçanta nuk mund të kthehen,
                me përjashtim të rasteve kur ka defekt prodhimi.
              </p>
            </section>

            <section>
              <h2 className="font-heading text-2xl text-[#201616] mb-3">Si të Inicioni një Kthim</h2>
              <ol className="flex flex-col gap-3 list-none pl-0">
                {[
                  'Kontaktoni na përmes faqes Kontakt brenda 14 ditëve',
                  'Tregoni numrin e porosisë dhe arsyen e kthimit',
                  'Ne do t\'ju dërgojmë instruksionet për kthim brenda 48 orëve',
                  'Dërgoni produktin me paketim të sigurt',
                  'Rimbursimi procesmohet brenda 5–7 ditëve pune pas marrjes',
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <span className="font-heading text-[#b31b1b] text-lg leading-none mt-0.5">{i + 1}.</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ol>
            </section>

            <section>
              <h2 className="font-heading text-2xl text-[#201616] mb-3">Kostoja e Dërgesës për Kthim</h2>
              <p>
                Kostoja e dërgimit të produktit për kthim është përgjegjësi e klientit,
                përveç rasteve kur produkti ka defekt ose kemi dërguar artikullin e gabuar.
                Në ato raste, ne mbulojmë të gjitha kostot e transportit.
              </p>
            </section>

            <section>
              <h2 className="font-heading text-2xl text-[#201616] mb-3">Rimbursimet</h2>
              <p>
                Pasi të marrim dhe verifikojmë artikullin, do t'ju njoftojmë me email.
                Rimbursimi do të kreditohet në metodën origjinale të pagesës brenda
                <strong className="text-[#201616]"> 5–7 ditëve pune</strong>.
              </p>
            </section>

            <section>
              <h2 className="font-heading text-2xl text-[#201616] mb-3">Produktet me Defekt</h2>
              <p>
                Nëse produkti ka arritur me defekt ose dëmtim gjatë transportit,
                na kontaktoni menjëherë me foto të produktit. Do të zëvendësojmë
                produktin ose do t'ju rimbursojmë plotësisht pa asnjë kosto shtesë.
              </p>
            </section>

            <p className="text-[10px] tracking-widest uppercase text-[#201616]/30 pt-4">
              Për pyetje: na kontaktoni përmes faqes Kontakt
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
