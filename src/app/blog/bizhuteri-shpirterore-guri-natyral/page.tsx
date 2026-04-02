import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import AnnouncementBar from '@/components/AnnouncementBar';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export const metadata: Metadata = {
  title: 'Bizhuteri Shpirtërore: Pse Gurët Natyral Kanë Fuqi | Priestess of the Soul',
  description: 'Zbulo fuqinë e gurëve natyral dhe si të zgjedhësh bizhuterinë e duhur shpirtërore. Udhëzuesi i plotë i bizhuterive shpirtërore nga Priestess of the Soul.',
};

const stones = [
  {
    name: 'Rose Quartz (Kuarci Rozë)',
    description: 'Guri i dashurisë dhe shërimit emocional. Hap zemrën, sjell paqe dhe nxit dashuri ndaj vetes.',
  },
  {
    name: 'Lapis Lazuli',
    description: 'Guri i mençurisë dhe së vërtetës. Nxit aftësinë për të folur me autenticitet.',
  },
  {
    name: 'Ametist',
    description: 'Guri i intuitës dhe mbrojtjes shpirtërore. Qetëson mendjen, thellon meditimin.',
  },
  {
    name: 'Aquamarine (Akuamarin)',
    description: 'Guri i qetësisë dhe fluksit. Simbolizon pastërtinë e ujit dhe lirinë emocionale.',
  },
  {
    name: 'Emerald (Smerald)',
    description: 'Guri i rritjes, shpresës dhe bollëkut. Lidh me zemrën dhe natyrën.',
  },
];

const questions = [
  'Çfarë ndjenje dëshiron të sjellësh në jetën tënde? Dashuri? Qetësi? Guxim? Zgjedh gurin që rezonon me atë qëllim.',
  'Cili gur tërhiqet drejt syve tu? Shpesh instinkti di para mendjes.',
  'Si ndihet mbi lëkurë? Një bizhuteri shpirtërore nuk duhet të jetë vetëm e bukur, duhet të ndihet e drejtë.',
  'Kush e ka krijuar? Energjia e krijuesit kalon në objekt. Bizhuteritë e punuara me dorë mbajnë dashuri, qëllim dhe vetëdije.',
];

export default function BlogPostPage() {
  return (
    <>
      <AnnouncementBar />
      <Header />
      <main className="bg-[#fffffc] min-h-screen">

        {/* Hero banner */}
        <div className="relative w-full h-[340px] md:h-[460px] overflow-hidden">
          <Image
            src="/blog-bizhuteri-shpirterore.jpg"
            alt="Bizhuteri Shpirterore: Pse Guret Natyral Kane Fuqi"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-[#201616]/30" />
        </div>

        {/* Breadcrumb */}
        <div className="max-w-3xl mx-auto px-6 pt-10 pb-2">
          <div className="flex items-center gap-2 text-[10px] tracking-[0.25em] uppercase text-[#201616]/40 font-body">
            <Link href="/" className="hover:text-[#b31b1b] transition-colors">Kryefaqja</Link>
            <span>✦</span>
            <Link href="/blog" className="hover:text-[#b31b1b] transition-colors">Blog</Link>
            <span>✦</span>
            <span className="text-[#201616]/60">Bizhuteri Shpirtërore</span>
          </div>
        </div>

        {/* Article */}
        <article className="max-w-3xl mx-auto px-6 py-10 pb-24">

          {/* Title block */}
          <header className="mb-12 border-b border-[#201616]/10 pb-10">
            <p className="text-[10px] tracking-[0.3em] uppercase text-[#b31b1b] font-body mb-4">Udhëzuesi i plotë i bizhuterive shpirtërore</p>
            <h1 className="font-heading text-4xl md:text-5xl text-[#201616] leading-tight mb-5">
              Bizhuteri Shpirtërore: Pse Gurët Natyral Kanë Fuqi dhe Si t&apos;i Zgjedhësh
            </h1>
            <p className="font-body text-sm text-[#201616]/50">2 Prill 2026 · Priestess of the Soul</p>
          </header>

          <div className="flex flex-col gap-10 font-body text-[15px] leading-[1.85] text-[#201616]/75">

            {/* Intro */}
            <p className="text-[17px] leading-relaxed text-[#201616]/85 font-body italic border-l-2 border-[#b31b1b]/40 pl-5">
              Çdo grua mban brenda saj një fuqi të lashtë. Disa e dinë. Disa sapo po fillojnë ta ndjejnë.
              Bizhuteri shpirtërore nuk është thjesht një stoli, është një kujtesë e heshtur, e mbajtur pranë lëkurës,
              që të thotë: <em>Ti je e shenjtë. Ti je e fuqishme. Ti mban dritë.</em>
            </p>

            <p>
              Nëse ke ndjerë ndonjëherë tërheqje nga një gur i caktuar, nëse sytë tu kanë ndaluar tek një varëse
              ose unazë dhe ke ndjerë diçka, jo vetëm bukuri, por edhe ndjesi, atëherë je gati të kuptosh se
              çfarë është vërtet bizhuteri shpirtërore.
            </p>

            {/* Section 1 */}
            <section className="flex flex-col gap-4">
              <h2 className="font-heading text-2xl text-[#201616]">Çfarë Është Bizhuteri Shpirtërore?</h2>
              <p>
                Bizhuteri shpirtërore është çdo copë stoli e krijuar me qëllim të ndërgjegjshëm, me gurë natyral,
                simbole të shenjta ose materialin e zgjedhur për frekuencën e saj vibracionale. Ndryshe nga
                bizhuteritë dekorative të zakonshme, ato mbajnë një shtresë kuptimi që shkon përtej estetikës.
              </p>
              <p>
                Tradita e bartjes së gurëve shpirtërorë daton mijëra vjet. Faraonët egjiptianë mbanin lapis lazuli
                si simbol të mençurisë hyjnore. Gratë greke mbanin ametist për qetësi mendore. Meshkujt e lashtë
                romakë mbanin jasper si mburojë në luftë. E gjithë historia njerëzore është e thurur me besimin se
                toka jonë na ofron gurë që na mbrojnë, na udhëzojnë dhe na shërojnë.
              </p>
            </section>

            {/* Section 2 */}
            <section className="flex flex-col gap-4">
              <h2 className="font-heading text-2xl text-[#201616]">Si Funksionon Energjia e Gurëve Natyral?</h2>
              <p>
                Gurët e formuar nën shtresa të thella tokësore mbajnë një strukturë kristalore unike. Kristalet kanë
                frekuencë rezonuese, kjo nuk është mistikë e zbrazur, por fizikë bazë. Ora juaj kuarci funksionon
                pikërisht pse kristali i kuarcit dridhet me frekuencë konstante.
              </p>
              <p>
                Kur mbajmë gurë natyral mbi lëkurë, sistemi ynë bio-elektrik ndërvepron me frekuencën e tyre. Ky
                është parimi i akupunkturës, i meditimit me kristale dhe i terapisë me gurë, praktika që shkenca
                bashkëkohore ende studion, por që miliona njerëz i përjetojnë si reale.
              </p>
            </section>

            {/* Stones list */}
            <section className="flex flex-col gap-5">
              <h3 className="font-heading text-xl text-[#201616]">Disa nga gurët më të njohur shpirtërorë:</h3>
              <div className="flex flex-col gap-3">
                {stones.map((stone) => (
                  <div key={stone.name} className="flex gap-3 items-start bg-[#f6f5e9] px-5 py-4">
                    <span className="text-[#b31b1b] mt-0.5 shrink-0">✦</span>
                    <div>
                      <span className="font-heading text-[#201616] text-base">{stone.name}:</span>{' '}
                      <span>{stone.description}</span>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Section 3 */}
            <section className="flex flex-col gap-4">
              <h2 className="font-heading text-2xl text-[#201616]">Pse Femrat Moderne Po Zgjedhin Bizhuteri Shpirtërore</h2>
              <p>
                Jeta moderne është e shpejtë, e zhurmshme dhe shpesh shkëput. Shumë gra po kthehen nga praktika të
                ngadalshme: meditim, journaling, ritualet e mëngjesit, dhe bizhuteri shpirtërore bëhet pjesë e
                atij kthimi.
              </p>
              <p>
                Por nuk është vetëm spiritualiteti. Është edhe identiteti. Kur vesh një unazë me Rose Quartz, po
                thua diçka për veten tënde: se vlerëson qetësinë, se ke lidhje me diçka më të madhe se rutina e
                ditës, se nuk je vetëm një konsumatore e modës, por dikush që zgjedh me qëllim.
              </p>
              <p>
                Të marrësh vendime të qëllimshme, kush jesh, çfarë mban, çfarë lejon afër teje, është një akt i
                fuqishëm. Dhe kjo është thelbi i lëvizjes moderne të femrës shpirtërore.
              </p>
            </section>

            {/* Section 4 */}
            <section className="flex flex-col gap-5">
              <h2 className="font-heading text-2xl text-[#201616]">Si të Zgjedhësh Bizhuterinë e Duhur Shpirtërore</h2>
              <p>Nuk ka rregull të saktë, intuita është udhëzuesi yt më i mirë. Por ja disa pyetje që mund të të ndihmojnë:</p>
              <div className="flex flex-col gap-3">
                {questions.map((q, i) => (
                  <div key={i} className="flex gap-3 items-start">
                    <span className="text-[#b31b1b] shrink-0 font-heading text-base">{i + 1}.</span>
                    <p>{q}</p>
                  </div>
                ))}
              </div>
            </section>

            {/* CTA block */}
            <section className="bg-[#f6f5e9] border border-[#201616]/10 p-8 flex flex-col gap-4 text-center">
              <p className="text-[10px] tracking-[0.3em] uppercase text-[#201616]/40 font-body">Koleksioni</p>
              <h2 className="font-heading text-3xl text-[#201616]">&ldquo;Rose &amp; Stardust&rdquo;</h2>
              <p className="text-[#201616]/70 max-w-lg mx-auto">
                Në Priestess of the Soul, çdo copë krijohet me duart tona nga argjendi 925 Sterling Silver dhe ari
                i ricikluar 14K, me gurë natyral të zgjedhur me kujdes. Koleksioni ynë &ldquo;Rose &amp; Stardust&rdquo; lindi
                nga frymëzimi i trëndafilave të egër dhe pluhurit të yjeve të lashtë, sepse çdo grua mbart brenda
                saj edhe butësinë e trëndafilit edhe dritën e yjeve.
              </p>
              <p className="text-[#201616]/70 max-w-lg mx-auto">
                Stolitë tona nuk janë thjesht aksesorë. Janë amuleta shpirti, të punuara me dorë, të frymëzuara
                nga femërorja e shenjtë, të krijuara për ty.
              </p>
              <div className="mt-2">
                <Link href="/dyqan" className="btn-primary inline-block px-8 py-3 text-sm tracking-[0.15em] uppercase">
                  Zbulo Koleksionin
                </Link>
              </div>
            </section>

            {/* Closing tagline */}
            <p className="text-center font-script text-2xl text-[#b31b1b]/70 pt-4">
              Magji që vishet. Tempull që do të rikujtoj hyjnin tënd.
            </p>

          </div>
        </article>
      </main>
      <Footer />
    </>
  );
}
