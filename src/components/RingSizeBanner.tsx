'use client';

import { useState } from 'react';
import Image from 'next/image';
import RingSizerModal from '@/components/RingSizerModal';

export default function RingSizeBanner() {
  const [open, setOpen] = useState(false);

  return (
    <section className="bg-cream border-b border-stone-light/20">
      {open && <RingSizerModal onClose={() => setOpen(false)} />}
      <div className="max-w-content mx-auto px-6 py-14 grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
        <div>
          <p className="text-xs tracking-[0.3em] uppercase text-gold mb-3">Udhëzues</p>
          <h2 className="font-heading text-4xl text-brown mb-4">Gjej Madhësinë e Unazës</h2>
          <p className="text-stone text-sm leading-relaxed mb-6 max-w-md">
            Gjetja e unazës së përsosur nuk është gjithmonë e lehtë. Prandaj ndërtuam një mjet të shpejtë e të saktë - me unazën tënde, me spango, ose direkt në ekran.
          </p>
          <button
            onClick={() => setOpen(true)}
            className="inline-flex items-center gap-2 text-sm tracking-widest uppercase text-burgundy border-b border-burgundy pb-1 hover:text-[#8a1515] hover:border-[#8a1515] transition-colors"
          >
            Gjej Madhësinë Tënde
            <span aria-hidden>→</span>
          </button>
        </div>
        <div className="relative aspect-square max-w-sm mx-auto w-full">
          <Image
            src="https://cdn.shopify.com/s/files/1/0743/3430/6542/files/25.2.jpg?v=1755974844"
            alt="Unazë me ar 18K"
            fill
            className="object-cover rounded-sm"
            sizes="(max-width: 768px) 80vw, 400px"
          />
        </div>
      </div>
    </section>
  );
}
