'use client';

import { useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function ContactPage() {
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [sent, setSent] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: connect to Web3Forms or email service
    setSent(true);
  };

  return (
    <>
      <Header />
      <main className="bg-cream min-h-screen">
        <div className="bg-cream-warm border-b border-stone-light/20 py-16 px-6 text-center">
          <p className="text-xs tracking-[0.3em] uppercase text-gold mb-3">Na Shkruaj</p>
          <h1 className="font-heading text-5xl text-brown">Kontakt</h1>
        </div>

        <div className="max-w-2xl mx-auto px-6 py-20">
          {sent ? (
            <div className="text-center py-16">
              <h2 className="font-heading text-3xl text-brown mb-4">Faleminderit!</h2>
              <p className="text-stone">Do të të kthehemi sa më shpejt.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col gap-6">
              <div>
                <label className="block text-xs tracking-widest uppercase text-stone mb-2">Emri</label>
                <input
                  type="text"
                  required
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  className="w-full border border-stone-light/40 bg-transparent px-4 py-3 text-brown text-sm focus:outline-none focus:border-burgundy"
                />
              </div>
              <div>
                <label className="block text-xs tracking-widest uppercase text-stone mb-2">Email</label>
                <input
                  type="email"
                  required
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  className="w-full border border-stone-light/40 bg-transparent px-4 py-3 text-brown text-sm focus:outline-none focus:border-burgundy"
                />
              </div>
              <div>
                <label className="block text-xs tracking-widest uppercase text-stone mb-2">Mesazhi</label>
                <textarea
                  required
                  rows={6}
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  className="w-full border border-stone-light/40 bg-transparent px-4 py-3 text-brown text-sm focus:outline-none focus:border-burgundy resize-none"
                />
              </div>
              <button type="submit" className="btn-primary self-start">
                Dërgo Mesazhin
              </button>
            </form>
          )}

          {/* Contact info */}
          <div className="mt-16 pt-10 border-t border-stone-light/20 grid grid-cols-1 sm:grid-cols-2 gap-8">
            <div>
              <p className="text-xs tracking-widest uppercase text-gold mb-2">Instagram</p>
              <a href="https://instagram.com/priestessofthesoul" target="_blank" rel="noreferrer" className="text-stone hover:text-burgundy text-sm transition-colors">
                @priestessofthesoul
              </a>
            </div>
            <div>
              <p className="text-xs tracking-widest uppercase text-gold mb-2">Email</p>
              <a href="mailto:hello@priestessofthesoul.com" className="text-stone hover:text-burgundy text-sm transition-colors">
                hello@priestessofthesoul.com
              </a>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
