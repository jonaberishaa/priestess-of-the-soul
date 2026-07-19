import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Konfirmimi i Porosisë',
  robots: { index: false, follow: true },
};

export default function OrderConfirmationPage({
  searchParams,
}: {
  searchParams: {
    orderId?: string;
    firstName?: string;
    lastName?: string;
    email?: string;
    address?: string;
    city?: string;
    country?: string;
    postal?: string;
    phone?: string;
    total?: string;
  };
}) {
  const {
    orderId = '',
    firstName = '',
    lastName = '',
    email = '',
    address = '',
    city = '',
    country = 'Kosovo',
    postal = '',
    phone = '',
    total = '',
  } = searchParams;

  const fullName = [firstName, lastName].filter(Boolean).join(' ') || 'Klient';

  const addressLines = [
    fullName,
    address,
    [postal, city].filter(Boolean).join(' '),
    country,
    phone,
  ].filter(Boolean);

  const rules = [
    'Pakot procesohen brenda 3 ditëve.',
    'Pagesa kryhet me para në dorë (COD) drejtpërdrejt te korrieri.',
    'Hape dhe kontrollo pakon para se të largohet korrieri.',
    'Dëmtimet raportohen menjëherë. Pas largimit të korrierit nuk pranohen.',
    'Nuk pranohen ndrrrime apo kthime, përveç rastit kur produkti është i dëmtuar nga fabrika.',
    'Kostot e postës paguhen nga klienti në rast kthimi për defekt fabrike.',
  ];

  return (
    <div className="min-h-screen bg-[#f6f5e9]">
      {/* Top bar */}
      <div className="bg-[#fffffc] border-b border-[#201616]/10 px-6 py-4">
        <div className="max-w-[720px] mx-auto">
          <Link href="/" className="font-heading text-xl text-[#201616]">
            Priestess of the Soul
          </Link>
        </div>
      </div>

      <div className="max-w-[720px] mx-auto px-4 py-12">

        {/* Hero confirmation */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center justify-center w-16 h-16 border-2 border-[#b31b1b] mb-6">
            <svg className="w-7 h-7 text-[#b31b1b]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          {orderId && (
            <p className="text-[10px] tracking-[0.3em] uppercase text-[#201616]/40 font-body mb-2">
              Konfirmimi #{orderId}
            </p>
          )}
          <h1 className="font-heading text-4xl md:text-5xl text-[#201616] mb-3">
            Faleminderit, {firstName || fullName}!
          </h1>
          <p className="text-sm text-[#201616]/50 font-body">
            Porosia juaj u mor me sukses. Do të kontaktoheni së shpejti.
          </p>
        </div>

        {/* Rules */}
        <div className="bg-[#fffffc] border border-[#201616]/10 p-8 mb-6">
          <p className="text-[10px] tracking-[0.3em] uppercase text-[#201616]/40 font-body mb-1">Para Dorëzimit</p>
          <h2 className="font-heading text-2xl text-[#201616] mb-6">Porosia juaj është konfirmuar</h2>
          <ul className="flex flex-col gap-4">
            {rules.map((rule, i) => (
              <li key={i} className="flex items-start gap-4">
                <span className="flex-shrink-0 w-6 h-6 border border-[#b31b1b] text-[#b31b1b] text-[10px] font-bold flex items-center justify-center mt-0.5">
                  {i + 1}
                </span>
                <p className="text-sm text-[#201616]/70 font-body leading-relaxed">{rule}</p>
              </li>
            ))}
          </ul>
          <p className="text-sm text-[#201616]/40 font-body mt-6 pt-6 border-t border-[#201616]/10 italic">
            Faleminderit që keni zgjedhur Priestess of the Soul! 🌹
          </p>
        </div>

        {/* Order details */}
        <div className="bg-[#fffffc] border border-[#201616]/10 p-8 mb-6">
          <p className="text-[10px] tracking-[0.3em] uppercase text-[#201616]/40 font-body mb-1">Rezymeja</p>
          <h2 className="font-heading text-2xl text-[#201616] mb-6">Detajet e Porosisë</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="border-l-2 border-[#b31b1b] pl-4">
              <p className="text-[10px] tracking-[0.2em] uppercase text-[#201616]/40 font-body mb-1">Kontakt</p>
              <p className="text-sm text-[#201616] font-body">{email || phone}</p>
            </div>

            <div className="border-l-2 border-[#b31b1b] pl-4">
              <p className="text-[10px] tracking-[0.2em] uppercase text-[#201616]/40 font-body mb-1">Pagesa</p>
              <p className="text-sm text-[#201616] font-body">Cash on Delivery · {total}</p>
            </div>

            <div className="border-l-2 border-[#b31b1b] pl-4">
              <p className="text-[10px] tracking-[0.2em] uppercase text-[#201616]/40 font-body mb-1">Adresa e Dërgimit</p>
              <div className="text-sm text-[#201616] font-body leading-relaxed">
                {addressLines.map((line, i) => <p key={i}>{line}</p>)}
              </div>
            </div>

            <div className="border-l-2 border-[#b31b1b] pl-4">
              <p className="text-[10px] tracking-[0.2em] uppercase text-[#201616]/40 font-body mb-1">Dërgesa</p>
              <p className="text-sm text-[#201616] font-body">Transporti Falas</p>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="flex flex-col sm:flex-row gap-3">
          <Link
            href="/dyqan"
            className="flex-1 text-center bg-[#b31b1b] text-[#fffef2] py-4 text-xs tracking-[0.25em] uppercase font-body hover:bg-[#201616] transition-colors"
          >
            Vazhdo Blerjet
          </Link>
          <Link
            href="/"
            className="flex-1 text-center border border-[#201616] text-[#201616] py-4 text-xs tracking-[0.25em] uppercase font-body hover:bg-[#201616] hover:text-[#fffef2] transition-colors"
          >
            Kthehu në Kryefaqe
          </Link>
        </div>
      </div>
    </div>
  );
}
