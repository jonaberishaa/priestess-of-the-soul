'use client';

import { useState } from 'react';

export default function Newsletter() {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const res = await fetch('/api/newsletter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });

      if (!res.ok) throw new Error('failed');
      setSubmitted(true);
    } catch {
      setError('Diçka shkoi keq. Provo përsëri.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="bg-brown text-cream py-20 px-6">
      <div className="max-w-xl mx-auto text-center">
        <p className="text-xs tracking-[0.3em] uppercase text-gold mb-4">Lista e Ekskluzivitetit</p>
        <h2 className="font-heading text-4xl md:text-5xl mb-4">Bëhu pjesë e rrethit</h2>
        <p className="text-cream/70 text-sm leading-relaxed mb-8">
          Merre e para njoftimin për koleksionet e reja, ofertat ekskluzive dhe historitë pas çdo guri.
        </p>
        {submitted ? (
          <p className="text-gold tracking-widest text-sm uppercase">Faleminderit! Do të dëgjosh prej nesh.</p>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3">
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email-i yt"
              className="flex-1 bg-transparent border border-cream/30 text-cream placeholder:text-cream/40 px-5 py-3 text-sm focus:outline-none focus:border-gold"
            />
            <button type="submit" disabled={loading} className="btn-primary whitespace-nowrap disabled:opacity-60">
              {loading ? 'Duke dërguar...' : 'Abonohu'}
            </button>
          </form>
        )}
        {error && <p className="text-red-400 text-sm mt-3">{error}</p>}
      </div>
    </section>
  );
}
