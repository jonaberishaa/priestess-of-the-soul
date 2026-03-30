import Link from 'next/link';

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

  return (
    <div className="min-h-screen bg-[#f5f5f5]">
      {/* Top bar */}
      <div className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="max-w-[700px] mx-auto">
          <Link href="/" className="font-heading text-xl text-[#201616]">
            Priestess of the Soul
          </Link>
        </div>
      </div>

      <div className="max-w-[700px] mx-auto px-4 py-10">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <div className="w-14 h-14 rounded-full border-2 border-[#5a9fd4] flex items-center justify-center flex-shrink-0">
            <svg className="w-7 h-7 text-[#5a9fd4]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <div>
            {orderId && (
              <p className="text-xs text-[#201616]/50 font-body mb-0.5">Konfirmimi #{orderId}</p>
            )}
            <h1 className="font-heading text-3xl text-[#201616]">Faleminderit, {firstName || fullName}!</h1>
          </div>
        </div>

        {/* Order confirmed box */}
        <div className="bg-white rounded border border-gray-200 p-6 mb-6">
          <h2 className="font-heading text-lg text-[#201616] mb-4">Porosia juaj është konfirmuar</h2>
          <div className="text-sm text-[#201616]/80 font-body leading-relaxed flex flex-col gap-2">
            <p>Ju lutem mbani parasysh këto rregulla të rëndësishme:</p>
            <p>Pakot procesohen brenda 3 ditëve.</p>
            <p>Priestess of the Soul pranon vetëm pagesë me para në dorë (Cash on Delivery).</p>
            <p>Pagesa kryhet drejtpërdrejt te korrieri në momentin e dorëzimit të pakos.</p>
            <p>Pakon duhet ta hapni dhe ta kontrolloni para korrierit.</p>
            <p>Nëse artikulli është i dëmtuar ose i gabuar, raportimi duhet bërë menjëherë.</p>
            <p>Pas largimit të korrierit, kërkesat për dëmtime nuk pranohen.</p>
            <p>Nese blerja ka qene dhurate pranohet ndrrimi vetëm një herë brenda 7 ditëve, me artikullin të papërdorur dhe në paketimin origjinal.</p>
            <p>Kostot e postës dhe kthimit paguhen nga klienti.</p>
            <p>Faleminderit që keni zgjedhur Priestess of the Soul! 🌹❤️</p>
          </div>
        </div>

        {/* Order details */}
        <div className="bg-white rounded border border-gray-200 p-6 mb-6">
          <h2 className="font-heading text-lg text-[#201616] mb-5">Detajet e porosisë</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Contact info */}
            <div>
              <h3 className="text-xs font-bold text-[#201616] mb-2 font-body uppercase tracking-wider">Informacioni i Kontaktit</h3>
              <p className="text-sm text-[#201616]/80 font-body">{email || phone}</p>
            </div>

            {/* Payment method */}
            <div>
              <h3 className="text-xs font-bold text-[#201616] mb-2 font-body uppercase tracking-wider">Metoda e Pagesës</h3>
              <div className="flex items-center gap-2">
                <span className="text-lg">💵</span>
                <p className="text-sm text-[#201616]/80 font-body">
                  Cash on Delivery (COD) · {total} EUR
                </p>
              </div>
            </div>

            {/* Shipping address */}
            <div>
              <h3 className="text-xs font-bold text-[#201616] mb-2 font-body uppercase tracking-wider">Adresa e Dërgimit</h3>
              <div className="text-sm text-[#201616]/80 font-body leading-relaxed">
                {addressLines.map((line, i) => (
                  <p key={i}>{line}</p>
                ))}
              </div>
            </div>

            {/* Billing address */}
            <div>
              <h3 className="text-xs font-bold text-[#201616] mb-2 font-body uppercase tracking-wider">Adresa e Faturimit</h3>
              <div className="text-sm text-[#201616]/80 font-body leading-relaxed">
                {addressLines.map((line, i) => (
                  <p key={i}>{line}</p>
                ))}
              </div>
            </div>

            {/* Shipping method */}
            <div>
              <h3 className="text-xs font-bold text-[#201616] mb-2 font-body uppercase tracking-wider">Metoda e Dërgimit</h3>
              <p className="text-sm text-[#201616]/80 font-body">Transporti Falas</p>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="flex flex-col sm:flex-row gap-3">
          <Link
            href="/dyqan"
            className="flex-1 text-center bg-[#201616] text-[#fffef2] py-3 text-sm tracking-[0.2em] uppercase font-body hover:bg-[#3a2828] transition-colors"
          >
            Vazhdo Blerjet
          </Link>
          <Link
            href="/"
            className="flex-1 text-center border border-[#201616] text-[#201616] py-3 text-sm tracking-[0.2em] uppercase font-body hover:bg-[#201616] hover:text-[#fffef2] transition-colors"
          >
            Kthehu në Kryefaqe
          </Link>
        </div>
      </div>
    </div>
  );
}
