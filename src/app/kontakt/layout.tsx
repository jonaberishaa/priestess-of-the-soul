import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Na Kontakto',
  description: 'Na kontakto për pyetje rreth porosive, madhësive apo produkteve. Priestess of the Soul - bizhuteri luksi me ar 18K, dërgim në Kosovë, Shqipëri dhe Maqedoni.',
  alternates: { canonical: 'https://www.priestessofthesoul.com/kontakt' },
  openGraph: {
    title: 'Na Kontakto | Priestess of the Soul',
    description: 'Na kontakto për pyetje rreth porosive, madhësive apo produkteve.',
    url: 'https://www.priestessofthesoul.com/kontakt',
  },
};

export default function KontaktLayout({ children }: { children: React.ReactNode }) {
  return children;
}
