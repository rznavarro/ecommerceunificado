import { SiteHeader } from '@/components/layout/SiteHeader';
import { Footer } from '@/components/layout/Footer';
import { WhatsAppFloat } from '@/components/layout/WhatsAppFloat';
import { CartHydrator } from '@/components/layout/CartHydrator';

export default function SiteLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <a
        href="#contenido"
        className="label sr-only z-70 bg-cafe px-4 py-3 text-marfil focus:not-sr-only focus:fixed focus:top-3 focus:left-3"
      >
        Saltar al contenido
      </a>
      <CartHydrator />
      <SiteHeader />
      <main id="contenido">{children}</main>
      <Footer />
      <WhatsAppFloat />
    </>
  );
}
