import type { Metadata } from 'next';
import { Bodoni_Moda, Merriweather, Great_Vibes } from 'next/font/google';
import './globals.css';
import { WishlistProvider } from '@/components/WishlistContext';
import { CartProvider } from '@/components/CartContext';

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
  metadataBase: new URL('https://www.priestessofthesoul.com'),
  title: {
    default: 'Priestess of the Soul | Bizhuteri Luksi me Ar 18K - Kosovë',
    template: '%s | Priestess of the Soul',
  },
  description:
    'Bizhuteri luksi me ar 18K dhe gurë natyralë të çmuar. Unaza, vathë, qafore dhe byzylykë të punuar me dorë. Porosi online - dërgim në Kosovë, Shqipëri dhe Maqedoni të Veriut.',
  keywords: [
    'bizhuteri Kosovë',
    'bizhuteri online Kosovë',
    'unaza ar Prishtinë',
    'bizhuteri ar 18K',
    'unaza gurë natyralë',
    'vathë ar Kosovë',
    'qafore ar Kosovë',
    'byzylyk ar',
    'bizhuteri luksi',
    'bizhuteri me gurë të çmuar',
    'unaza rozë Kosovë',
    'dyqan bizhuteri online',
    'bizhuteri artizanale',
    'stoli ar 18K',
    'jewellery Kosovo',
    'jewelry Kosovo',
    'gold jewelry Kosovo',
    'Priestess of the Soul',
  ],
  authors: [{ name: 'Priestess of the Soul', url: 'https://www.priestessofthesoul.com' }],
  creator: 'Priestess of the Soul',
  publisher: 'Priestess of the Soul',
  formatDetection: { telephone: false },
  alternates: {
    canonical: 'https://www.priestessofthesoul.com',
  },
  openGraph: {
    type: 'website',
    locale: 'sq_AL',
    url: 'https://www.priestessofthesoul.com',
    siteName: 'Priestess of the Soul',
    title: 'Priestess of the Soul | Bizhuteri Luksi me Ar 18K - Kosovë',
    description:
      'Bizhuteri luksi me ar 18K dhe gurë natyralë të çmuar. Unaza, vathë, qafore dhe byzylykë të punuar me dorë. Dërgim në Kosovë, Shqipëri dhe Maqedoni.',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Priestess of the Soul - Bizhuteri Luksi',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Priestess of the Soul | Bizhuteri Luksi me Ar 18K',
    description:
      'Bizhuteri luksi me ar 18K dhe gurë natyralë. Dërgim në Kosovë, Shqipëri dhe Maqedoni.',
    images: ['/og-image.jpg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: '',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="sq">
      <body className={`${bodoniModa.variable} ${merriweather.variable} ${greatVibes.variable} font-body bg-cream text-brown antialiased`}>
        <WishlistProvider><CartProvider>{children}</CartProvider></WishlistProvider>
      </body>
    </html>
  );
}
