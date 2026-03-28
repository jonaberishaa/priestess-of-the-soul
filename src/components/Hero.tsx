import Link from 'next/link';

export default function Hero() {
  return (
    <section className="relative w-full min-h-[85vh] flex items-center justify-center overflow-hidden">
      {/* Background image */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="https://priestessofthesoul.com/cdn/shop/files/dedeca12-ab54-4f96-a3fa-1b7445719733.png?v=1764243814&width=3840"
        alt=""
        className="absolute inset-0 w-full h-full object-cover object-center"
        aria-hidden="true"
      />

      {/* Gradient overlay */}
      <div className="absolute inset-0 z-[1]" style={{background: 'radial-gradient(ellipse at center, rgba(139,26,26,0.72) 0%, rgba(32,22,22,0.55) 55%, rgba(0,0,0,0.10) 100%)'}} />

      {/* Text */}
      <div className="relative z-10 text-center px-6 max-w-2xl mx-auto">
        <h1 className="font-heading text-5xl md:text-7xl text-[#fffef2] leading-[1.05] mb-6 drop-shadow-lg">
          Finesë në çdo detaj
        </h1>
        <p className="text-[#fffef2]/90 text-base md:text-lg leading-relaxed mb-10 max-w-xl mx-auto font-body drop-shadow">
          Bizhuteri të veshura në ar, të punuara me dorë dhe me gurë natyral.
          Finesë, elegancë dhe një shkëlqim i rafinuar që jep ndjesi të vërtet luksi.
        </p>
        <Link
          href="/dyqan"
          className="inline-block border border-[#fffef2] text-[#fffef2] px-10 py-4 text-xs tracking-[0.25em] uppercase hover:bg-[#fffef2] hover:text-[#8B1A1A] transition-colors duration-300"
        >
          Zbulo koleksionin
        </Link>
      </div>
    </section>
  );
}
