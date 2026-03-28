'use client';

import { useState } from 'react';
import AnnouncementBar from '@/components/AnnouncementBar';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function ContactPage() {
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [sent, setSent] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSent(true);
  };

  return (
    <>
      <AnnouncementBar />
      <Header />
      <main className="bg-[#fffffc] min-h-screen">
        <div className="bg-[#f6f5e9] border-b border-[#201616]/10 py-16 px-6 text-center">
          <p className="text-[10px] tracking-[0.3em] uppercase text-[#201616]/50 mb-3">Na Shkruaj</p>
          <h1 className="font-heading text-5xl text-[#201616]">Kontakt</h1>
        </div>

        <div className="max-w-2xl mx-auto px-6 py-20">
          {sent ? (
            <div className="text-center py-16">
              <h2 className="font-heading text-3xl text-[#201616] mb-4">Faleminderit!</h2>
              <p className="text-[#201616]/60 font-body">Do të të kthehemi brenda 24–48 orëve.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col gap-6">
              <div>
                <label className="block text-[10px] tracking-widest uppercase text-[#201616]/50 mb-2 font-body">Emri</label>
                <input
                  type="text"
                  required
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  className="w-full border border-[#201616]/20 bg-transparent px-4 py-3 text-[#201616] text-sm focus:outline-none focus:border-[#201616] font-body"
                />
              </div>
              <div>
                <label className="block text-[10px] tracking-widest uppercase text-[#201616]/50 mb-2 font-body">Email</label>
                <input
                  type="email"
                  required
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  className="w-full border border-[#201616]/20 bg-transparent px-4 py-3 text-[#201616] text-sm focus:outline-none focus:border-[#201616] font-body"
                />
              </div>
              <div>
                <label className="block text-[10px] tracking-widest uppercase text-[#201616]/50 mb-2 font-body">Mesazhi</label>
                <textarea
                  required
                  rows={6}
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  className="w-full border border-[#201616]/20 bg-transparent px-4 py-3 text-[#201616] text-sm focus:outline-none focus:border-[#201616] resize-none font-body"
                />
              </div>
              <button type="submit" className="btn-primary self-start">
                Dërgo Mesazhin
              </button>
            </form>
          )}

          <div className="mt-16 pt-10 border-t border-[#201616]/10 grid grid-cols-1 sm:grid-cols-2 gap-8">
            <div>
              <p className="text-[10px] tracking-widest uppercase text-[#201616]/40 mb-2 font-body">Instagram</p>
              <a href="https://instagram.com/priestessofthesoul" target="_blank" rel="noreferrer" className="text-sm text-[#201616]/60 hover:text-[#b31b1b] transition-colors font-body">
                @priestessofthesoul
              </a>
            </div>
            <div>
              <p className="text-[10px] tracking-widest uppercase text-[#201616]/40 mb-2 font-body">TikTok</p>
              <a href="https://tiktok.com/@priestessofthesoul" target="_blank" rel="noreferrer" className="text-sm text-[#201616]/60 hover:text-[#b31b1b] transition-colors font-body">
                @priestessofthesoul
              </a>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
