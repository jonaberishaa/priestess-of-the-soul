'use client';

import { useState, useEffect, useRef } from 'react';
import { products } from '@/data/products';
import Link from 'next/link';
import Image from 'next/image';

export default function SearchModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [query, setQuery] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  const results = query.trim().length > 1
    ? products.filter((p) =>
        p.name.toLowerCase().includes(query.toLowerCase()) ||
        p.type.toLowerCase().includes(query.toLowerCase()) ||
        p.description.toLowerCase().includes(query.toLowerCase())
      ).slice(0, 8)
    : [];

  useEffect(() => {
    if (open) {
      setQuery('');
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  }, [open]);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    document.addEventListener('keydown', handler);
    return () => document.removeEventListener('keydown', handler);
  }, [onClose]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[100] flex flex-col" onClick={onClose}>
      <div className="bg-[#fffffc] border-b border-[#201616]/10 px-6 py-4" onClick={(e) => e.stopPropagation()}>
        <div className="max-w-2xl mx-auto flex items-center gap-4">
          <svg className="w-5 h-5 text-[#201616]/40 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <input
            ref={inputRef}
            type="text"
            placeholder="Kërko produkte..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="flex-1 bg-transparent text-[#201616] text-base outline-none font-body placeholder:text-[#201616]/30"
          />
          <button onClick={onClose} className="text-[#201616]/40 hover:text-[#201616] transition-colors text-sm tracking-widest uppercase">esc</button>
        </div>
      </div>
      <div className="bg-[#fffffc]/95 backdrop-blur-sm flex-1 overflow-y-auto" onClick={(e) => e.stopPropagation()}>
        <div className="max-w-2xl mx-auto px-6 py-4">
          {query.trim().length > 1 && results.length === 0 && (
            <p className="text-[#201616]/40 text-sm font-body py-8 text-center">Nuk u gjet asnjë produkt.</p>
          )}
          {results.map((p) => (
            <Link key={p.id} href={`/dyqan/${p.id}`} onClick={onClose} className="flex items-center gap-4 py-3 border-b border-[#201616]/5 hover:bg-[#f6f5e9] px-2 transition-colors group">
              <div className="w-14 h-14 relative shrink-0 bg-[#f6f5e9]">
                <Image src={p.image} alt={p.name} fill className="object-cover" sizes="56px" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-[10px] uppercase tracking-widest text-[#201616]/40 mb-0.5">{p.type}</p>
                <p className="font-heading text-base text-[#201616] group-hover:text-[#b31b1b] transition-colors">{p.name}</p>
              </div>
              <p className="text-[#b31b1b] text-sm font-body shrink-0">{p.price}</p>
            </Link>
          ))}
          {query.trim().length < 2 && (
            <p className="text-[#201616]/30 text-xs font-body py-8 text-center tracking-widest uppercase">Shkruaj të kërkosh...</p>
          )}
        </div>
      </div>
    </div>
  );
}
