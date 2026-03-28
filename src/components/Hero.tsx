import Link from 'next/link';

export default function Hero() {
  return (
    <section className="relative bg-cream-warm min-h-[90vh] flex items-center">
      <div className="max-w-content mx-auto px-6 w-full grid grid-cols-1 lg:grid-cols-2 gap-12 items-center py-20">
        {/* Text */}
        <div>
          <p className="text-xs tracking-[0.3em] uppercase text-gold mb-6">Koleksioni i Ri</p>
          <h1 className="font-heading text-5xl md:text-6xl lg:text-7xl text-brown leading-[1.1] mb-6">
            Finesë në<br />çdo detaj
          </h1>
          <p className="text-stone text-lg leading-relaxed mb-10 max-w-md">
            Bizhuteri artizanale me gurë të çmuar natyralë dhe ar të vërtetë 14K.
            Çdo copë mbart energjinë e gurit dhe dashurinë e dorëve që e krijuan.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Link href="/dyqan" className="btn-primary text-center">
              Shiko Koleksionin
            </Link>
            <Link href="/rreth-meje" className="btn-outline text-center">
              Rreth Meje
            </Link>
          </div>
        </div>

        {/* Image placeholder — replace with actual product image */}
        <div className="relative aspect-[3/4] bg-cream-warm rounded-sm overflow-hidden border border-stone-light/20">
          <div className="absolute inset-0 flex flex-col items-center justify-center text-stone/40 gap-2">
            <svg className="w-16 h-16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            <p className="text-sm">Foto e heronjës</p>
          </div>
        </div>
      </div>
    </section>
  );
}
