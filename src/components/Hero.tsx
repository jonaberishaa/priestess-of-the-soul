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

      {/* Red gradient overlay */}
      <div className="absolute inset-0" style={{background: 'radial-gradient(ellipse at center, rgba(179,27,27,0.55) 0%, rgba(179,27,27,0.35) 40%, rgba(179,27,27,0.1) 70%, transparent 100%)'}} />

      {/* Text overlay */}
      <div className="relative z-10 text-center px-6 max-w-3xl mx-auto">
        <h1 className="font-heading text-5xl md:text-7xl text-[#fffef2] leading-[1.05] mb-6 drop-shadow-lg">
          Finesë në çdo detaj
        </h1>
        <p className="text-[#fffef2]/90 text-base md:text-lg leading-relaxed mb-10 max-w-xl mx-auto font-body drop-shadow">
          Bizhuteri të veshura në ar, të punuara me dorë dhe me gurë natyral.
          Finesë, elegancë dhe një shkëlqim i rafinuar që jep ndjesi të vërtet luksi.
        </p>
        <Link
          href="/dyqan"
          className="inline-block bg-[#fffef2] text-[#201616] px-10 py-4 text-xs tracking-[0.25em] uppercase hover:bg-[#b31b1b] hover:text-[#fffef2] transition-colors duration-300"
        >
          Zbulo koleksionin
        </Link>
      </div>
    </section>
  );
}
