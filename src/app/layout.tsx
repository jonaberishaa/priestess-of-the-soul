import type { Metadata } from 'next';
import { Bodoni_Moda, Merriweather, Great_Vibes } from 'next/font/google';
import './globals.css';
import { WishlistProvider } from '@/components/WishlistContext';

const bodoniModa = Bodoni_Moda({
  subsets: ['latin'],
  variable: '--font-heading',
  display: 'swap',
});

const merriweather = Merriweather({
  subsets: ['latin'],
  weight: ['300', '400', '700'],
  variable: '--font-body',
  display: 'swap',
});

const greatVibes = Great_Vibes({
  subsets: ['latin'],
  weight: ['400'],
  variable: '--font-script',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Priestess of the Soul | Bizhuteri me Gur të Çmuar',
  description:
    'Bizhuteri artizanale me gurë të çmuar natyralë dhe ar të vërtetë 14K. Çdo copë është unike dhe e bërë me dashuri.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="sq">
      <body className={`${bodoniModa.variable} ${merriweather.variable} ${greatVibes.variable} font-body bg-cream text-brown antialiased`}>
        <WishlistProvider>{children}</WishlistProvider>
      </body>
    </html>
  );
}
