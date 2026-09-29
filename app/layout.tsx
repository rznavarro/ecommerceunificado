import type { Metadata, Viewport } from 'next';
import { Cormorant_Garamond, Inter } from 'next/font/google';
import { site } from '@/data/site';
import './globals.css';

const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['500', '600'],
  style: ['normal', 'italic'],
  display: 'swap',
  variable: '--font-cormorant',
});

const inter = Inter({
  subsets: ['latin'],
  weight: ['300', '400', '500'],
  display: 'swap',
  variable: '--font-inter',
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: 'Purpuratta | Lencería, ropa y joyería en Chile',
  description:
    'Lencería colombiana, ropa atemporal y joyería con diseños exclusivos en una sola tienda. Despacho a todo Chile y envío gratis sobre $100.000.',
  applicationName: site.name,
};

export const viewport: Viewport = {
  themeColor: '#F7F2EC',
  width: 'device-width',
  initialScale: 1,
  viewportFit: 'cover',
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="es-CL" className={`${cormorant.variable} ${inter.variable}`}>
      <body className="min-h-svh">{children}</body>
    </html>
  );
}
