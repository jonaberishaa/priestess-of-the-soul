'use client';
// Metadata exported separately since this is a client component - add to a parent server component if needed

import { useState } from 'react';
import AnnouncementBar from '@/components/AnnouncementBar';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function ContactPage() {
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('sending');
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      setStatus(res.ok ? 'sent' : 'error');
    } catch {
      setStatus('error');
    }
  };

  return (
    <>
      <AnnouncementBar />
      <Header />
      <main className="bg-cream min-h-screen">
        {/* Banner */}
        <div className="bg-cream-warm border-b border-stone-light/20 py-16 px-6 text-center">
          <p className="text-xs tracking-[0.3em] uppercase text-gold mb-3">Jemi Këtu Për Ty</p>
          <h1 className="font-heading text-5xl text-brown">Na Kontakto</h1>
          <p className="text-stone text-sm mt-4 max-w-md mx-auto leading-relaxed">
            Çdo pyetje, çdo dëshirë, çdo dyshim - e dëgjojmë me kujdes.
            Shkruaje lirshëm dhe do të përgjigjemi sa më shpejt.
          </p>
        </div>

        <div className="max-w-content mx-auto px-6 py-20 grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          {/* Left: Contact info */}
          <div className="py-4">
            <p className="text-xs tracking-[0.3em] uppercase text-[#b31b1b] mb-6">Mënyrat e Kontaktit</p>

            <div className="flex flex-col gap-8">
              {/* WhatsApp */}
              <div className="border border-stone-light/30 p-6 hover:border-gold transition-colors group">
                <p className="text-[10px] tracking-[0.3em] uppercase text-gold mb-2">WhatsApp</p>
                <p className="font-heading text-xl text-brown mb-2 group-hover:text-burgundy transition-colors">Shkruaj Drejtpërdrejt</p>
                <p className="text-sm text-stone leading-relaxed mb-4">
                  Për pyetje rreth produkteve, madhësive apo porosive - WhatsApp është mënyra
                  më e shpejtë për të marrë përgjigje.
                </p>
                <a
                  href="https://wa.me/38349646439"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 text-xs tracking-[0.2em] uppercase border border-[#25d366] text-[#25d366] px-5 py-2.5 hover:bg-[#25d366] hover:text-white transition-colors"
                >
                  Hap WhatsApp
                </a>
              </div>

              {/* Instagram */}
              <div className="border border-stone-light/30 p-6 hover:border-gold transition-colors group">
                <p className="text-[10px] tracking-[0.3em] uppercase text-gold mb-2">Instagram</p>
                <p className="font-heading text-xl text-brown mb-2 group-hover:text-burgundy transition-colors">Na Ndiq dhe Na Shkruaj</p>
                <p className="text-sm text-stone leading-relaxed mb-4">
                  Shiko koleksionet e reja, stolat e porositura dhe historite tona cdo dite.
                </p>
                <a
                  href="https://instagram.com/priestessofthesoul"
                  target="_blank"
                  rel="noreferrer"
                  className="text-sm text-stone/60 hover:text-burgundy transition-colors font-body"
                >
                  @priestessofthesoul
                </a>
              </div>

              {/* TikTok */}
              <div className="border border-stone-light/30 p-6 hover:border-gold transition-colors group">
                <p className="text-[10px] tracking-[0.3em] uppercase text-gold mb-2">TikTok</p>
                <p className="font-heading text-xl text-brown mb-2 group-hover:text-burgundy transition-colors">Shiko nga Afër</p>
                <p className="text-sm text-stone leading-relaxed mb-4">
                  Video te stolive, detajeve dhe procesit te krijimit - shpirti i brendit tone.
                </p>
                <a
                  href="https://tiktok.com/@priestessofthesoul"
                  target="_blank"
                  rel="noreferrer"
                  className="text-sm text-stone/60 hover:text-burgundy transition-colors font-body"
                >
                  @priestessofthesoul
                </a>
              </div>
            </div>

            {/* Divider */}
            <div className="flex items-center gap-4 my-10">
              <div className="flex-1 h-px bg-stone-light/30" />
              <span className="text-gold text-xs tracking-[0.4em] uppercase">Koha e Pergjigjes</span>
              <div className="flex-1 h-px bg-stone-light/30" />
            </div>

            <p className="text-sm text-stone leading-relaxed italic text-center">
              "Çdo mesazh pritet me kujdes. Zakonisht kthehemi brenda 24 oreve."
            </p>
          </div>

          {/* Right: Form */}
          <div className="py-4">
            <p className="text-xs tracking-[0.3em] uppercase text-[#b31b1b] mb-3">Formulari i Kontaktit</p>
            <h2 className="font-heading text-3xl text-brown mb-2">Dërgo një Mesazh</h2>
            <p className="font-script text-xl text-gold mb-8">Ne do të dëgjojmë</p>

            {status === 'sent' ? (
              <div className="text-center py-16 border border-stone-light/30">
                <p className="text-gold text-2xl mb-4">✦</p>
                <h2 className="font-heading text-3xl text-brown mb-4">Faleminderit!</h2>
                <p className="text-stone font-body leading-relaxed">
                  Mesazhi yt u dërgua me sukses.<br />
                  Do të të kthehemi brenda 24 oreve.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col gap-6">
                {([
                  { key: 'name', label: 'Emri Juaj', type: 'text', placeholder: 'p.sh. Helena' },
                  { key: 'email', label: 'Adresa Email', type: 'email', placeholder: 'p.sh. email@gmail.com' },
                ] as const).map(({ key, label, type, placeholder }) => (
                  <div key={key}>
                    <label className="block text-[10px] tracking-widest uppercase text-stone/60 mb-2 font-body">{label}</label>
                    <input
                      type={type}
                      required
                      placeholder={placeholder}
                      value={form[key]}
                      onChange={(e) => setForm({ ...form, [key]: e.target.value })}
                      className="w-full border border-stone-light/30 bg-transparent px-4 py-3 text-brown text-sm focus:outline-none focus:border-gold transition-colors font-body placeholder:text-stone/30"
                    />
                  </div>
                ))}
                <div>
                  <label className="block text-[10px] tracking-widest uppercase text-stone/60 mb-2 font-body">Mesazhi Juaj</label>
                  <textarea
                    required
                    rows={6}
                    placeholder="Shkruaj pyetjen, kerkesen ose mendimin tend ketu..."
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                    className="w-full border border-stone-light/30 bg-transparent px-4 py-3 text-brown text-sm focus:outline-none focus:border-gold transition-colors resize-none font-body placeholder:text-stone/30"
                  />
                </div>
                <button
                  type="submit"
                  disabled={status === 'sending'}
                  className="btn-primary self-start disabled:opacity-50"
                >
                  {status === 'sending' ? 'Duke dërguar...' : 'Dërgo Mesazhin'}
                </button>
                {status === 'error' && (
                  <p className="text-[#b31b1b] text-xs font-body">
                    Dicka shkoi keq. Provo perseri ose na shkruaj ne WhatsApp.
                  </p>
                )}
              </form>
            )}
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
