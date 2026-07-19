import type { Metadata } from 'next';
import AnnouncementBar from '@/components/AnnouncementBar';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export const metadata: Metadata = {
  title: 'Kushtet e Shërbimit',
  description: 'Kushtet e shërbimit dhe përdorimit të dyqanit online Priestess of the Soul - porosi, pagesa dhe përgjegjësitë e klientit.',
  alternates: { canonical: 'https://www.priestessofthesoul.com/terms-of-service' },
};

export default function TermsPage() {
  return (
    <>
      <AnnouncementBar />
      <Header />
      <main className="bg-[#fffffc] min-h-screen">
        <div className="bg-[#f6f5e9] border-b border-[#201616]/10 py-16 px-6 text-center">
          <h1 className="font-heading text-5xl text-[#201616]">Kushtet e Shërbimit</h1>
        </div>
        <div className="max-w-3xl mx-auto px-6 py-20">
          <div className="flex flex-col gap-8 text-[#201616]/70 font-body text-sm leading-relaxed">

            <section>
              <h2 className="font-heading text-2xl text-[#201616] mb-3">Pranimi i Kushteve</h2>
              <p>
                Duke përdorur faqen tonë dhe duke bërë blerje, ju pranoni kushtet e mëposhtme të shërbimit.
                Ju lutemi lexojini me kujdes para se të vazhdoni.
              </p>
            </section>

            <section>
              <h2 className="font-heading text-2xl text-[#201616] mb-3">Produktet</h2>
              <p>
                Të gjitha produktet tona janë artizanale dhe të bëra me dorë. Secila copë është unike
                dhe mund të ketë variacione të vogla në ngjyrë, formë ose teksturë - kjo është pjesë e
                natyrës dhe bukurisë së punës artizanale me gurë natyralë.
              </p>
              <p className="mt-3">
                Imazhet e produkteve përfaqësojnë produktin sa më saktë të jetë e mundur,
                por ngjyrat mund të ndryshojnë pak sipas ekranit tuaj.
              </p>
            </section>

            <section>
              <h2 className="font-heading text-2xl text-[#201616] mb-3">Porositë dhe Pagesat</h2>
              <p>
                Pasi të vendosni një porosi, do të merrni një konfirmim me email.
                Ne rezervojmë të drejtën të anulojmë çdo porosi nëse produkti nuk është
                i disponueshëm ose nëse ka probleme me verifikimin e pagesës.
              </p>
              <p className="mt-3">
                Çmimet mund të ndryshojnë pa njoftim paraprak. Çmimi i aplikueshëm
                është ai i shfaqur në momentin e blerjes.
              </p>
            </section>

            <section>
              <h2 className="font-heading text-2xl text-[#201616] mb-3">Dërgesa</h2>
              <p>
                Dërgojmë brenda <strong className="text-[#201616]">3–7 ditëve pune</strong> nga konfirmimi i pagesës.
                Kohët e dërgesës mund të ndryshojnë sipas destinacionit dhe periudhave me ngarkesë të lartë.
                Ne nuk jemi përgjegjës për vonesa të shkaktuara nga shërbimi postar.
              </p>
            </section>

            <section>
              <h2 className="font-heading text-2xl text-[#201616] mb-3">Pronësia Intelektuale</h2>
              <p>
                Të gjitha imazhet, tekstet dhe dizajnet në këtë faqe janë pronë e Priestess of the Soul.
                Ndalohet kopjimi ose përdorimi pa leje me shkrim.
              </p>
            </section>

            <section>
              <h2 className="font-heading text-2xl text-[#201616] mb-3">Kujdesi për Bizhuteritë</h2>
              <p>
                Bizhuteritë tona janë të bëra me argjend 925 dhe ar 18K. Për të ruajtur shkëlqimin:
              </p>
              <ul className="flex flex-col gap-2 mt-3 pl-0 list-none">
                {[
                  'Shmangni kontaktin me ujë, parfum dhe krema',
                  'Ruajini në qese ose kuti mbyllëse kur nuk i vishni',
                  'Pastroni me një leckë të butë e të thatë',
                  'Hiqini gjatë sportit ose aktiviteteve të rënda',
                ].map((item) => (
                  <li key={item} className="flex items-start gap-2">
                    <span className="text-[#b31b1b]">✦</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </section>

            <section>
              <h2 className="font-heading text-2xl text-[#201616] mb-3">Ndryshimet në Kushte</h2>
              <p>
                Mund të ndryshojmë këto kushte në çdo kohë. Vazhdimi i përdorimit të faqes
                pas ndryshimeve nënkupton pranimin e kushteve të reja.
              </p>
              <p className="mt-3">Kushtet e fundit: Mars 2026</p>
            </section>

          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
