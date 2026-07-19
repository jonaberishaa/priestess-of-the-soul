import type { Metadata } from 'next';
import AnnouncementBar from '@/components/AnnouncementBar';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export const metadata: Metadata = {
  title: 'Politika e Privatësisë',
  description: 'Si i mbledhim, përdorim dhe mbrojmë të dhënat tuaja personale kur bleni nga Priestess of the Soul.',
  alternates: { canonical: 'https://www.priestessofthesoul.com/privacy-policy' },
};

export default function PrivacyPolicyPage() {
  return (
    <>
      <AnnouncementBar />
      <Header />
      <main className="bg-[#fffffc] min-h-screen">
        <div className="bg-[#f6f5e9] border-b border-[#201616]/10 py-16 px-6 text-center">
          <h1 className="font-heading text-5xl text-[#201616]">Politika e Privatësisë</h1>
        </div>
        <div className="max-w-3xl mx-auto px-6 py-20 prose-content">
          <div className="flex flex-col gap-8 text-[#201616]/70 font-body text-sm leading-relaxed">

            <section>
              <h2 className="font-heading text-2xl text-[#201616] mb-3">Informacioni që Mbledhim</h2>
              <p>
                Kur bëni një porosi ose krijoni një llogari, mbledhim informacionin e nevojshëm si emrin,
                adresën e email-it, adresën e dërgesës dhe informacionin e pagesës. Ky informacion
                përdoret vetëm për të procesuar porosinë tuaj dhe për t'ju ofruar shërbim sa më të mirë.
              </p>
            </section>

            <section>
              <h2 className="font-heading text-2xl text-[#201616] mb-3">Si e Përdorim Informacionin</h2>
              <ul className="list-none flex flex-col gap-2 pl-0">
                {[
                  'Për të procesuar dhe dërguar porosinë tuaj',
                  'Për të komunikuar me ju rreth porosisë ose pyetjeve tuaja',
                  'Për të dërguar njoftime rreth koleksioneve të reja (vetëm nëse jeni abonuar)',
                  'Për të përmirësuar faqen tonë dhe shërbimin ndaj klientit',
                ].map((item) => (
                  <li key={item} className="flex items-start gap-2">
                    <span className="text-[#b31b1b] mt-0.5">✦</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </section>

            <section>
              <h2 className="font-heading text-2xl text-[#201616] mb-3">Ndarja me Palë të Treta</h2>
              <p>
                Ne nuk shesim, tregojmë, ose ndajmë informacionin tuaj personal me palë të treta,
                me përjashtim të rasteve kur është e nevojshme për të procesuar pagesën ose dërgimin
                e porosisë (p.sh. shërbimet e dërgesës).
              </p>
            </section>

            <section>
              <h2 className="font-heading text-2xl text-[#201616] mb-3">Cookies</h2>
              <p>
                Faqja jonë përdor cookies për të përmirësuar përvojën tuaj të shfletimit.
                Cookies ndihmojnë faqen të kujtojë preferencat tuaja dhe të ruajë artikujt
                në shportën tuaj. Mund të çaktivizoni cookies në cilësimet e shfletuesit tuaj.
              </p>
            </section>

            <section>
              <h2 className="font-heading text-2xl text-[#201616] mb-3">Siguria e të Dhënave</h2>
              <p>
                Marrim masat e nevojshme për të mbrojtur informacionin tuaj personal.
                Të dhënat e pagesës procesmohen përmes sistemeve të sigurta të enkriptimit SSL.
                Nuk ruajmë asnjëherë të dhëna të kartës suaj bankare.
              </p>
            </section>

            <section>
              <h2 className="font-heading text-2xl text-[#201616] mb-3">Të Drejtat Tuaja</h2>
              <p>
                Keni të drejtë të kërkoni qasje, korrigjim ose fshirje të të dhënave tuaja personale
                në çdo kohë. Për çdo kërkesë, na kontaktoni përmes faqes së Kontaktit.
              </p>
            </section>

            <section>
              <h2 className="font-heading text-2xl text-[#201616] mb-3">Ndryshimet në Politikë</h2>
              <p>
                Mund të përditësojmë këtë politikë herë pas here. Çdo ndryshim i rëndësishëm
                do të njoftohet në faqen tonë.
              </p>
              <p className="mt-3">Politika e fundit: Mars 2026</p>
            </section>

          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
