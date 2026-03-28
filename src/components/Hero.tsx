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

      {/* Red box overlay */}
      <div className="relative z-10 text-center px-14 py-16 mx-6 max-w-2xl" style={{backgroundColor: '#b31b1b'}}>
        <h1 className="font-heading text-5xl md:text-6xl text-[#fffef2] leading-[1.05] mb-6">
          Finesë në çdo detaj
        </h1>
        <p className="text-[#fffef2] text-base md:text-lg leading-relaxed mb-10 max-w-xl mx-auto font-body">
          Bizhuteri të veshura në ar, të punuara me dorë dhe me gurë natyral.
          Finesë, elegancë dhe një shkëlqim i rafinuar që jep ndjesi të vërtet luksi.
        </p>
        <Link
          href="/dyqan"
          className="inline-block bg-[#fffef2] text-[#201616] px-10 py-4 text-sm hover:bg-white transition-colors duration-300"
        >
          Zbulo koleksionin
        </Link>
      </div>
    </section>
  );
}
