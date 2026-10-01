import { SiteHeader } from '@/components/layout/SiteHeader';
import { Footer } from '@/components/layout/Footer';
import { WhatsAppFloat } from '@/components/layout/WhatsAppFloat';
import { CartHydrator } from '@/components/layout/CartHydrator';
import { CartDrawer } from '@/components/cart/CartDrawer';
import { ImageReveal } from '@/components/layout/ImageReveal';
import { MobileNav } from '@/components/layout/MobileNav';

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
      {/* Espacio para la barra inferior en móvil */}
      <div aria-hidden="true" className="h-[calc(var(--mobile-nav-h,0px)+env(safe-area-inset-bottom))] bg-cafe lg:hidden" />
      <WhatsAppFloat />
      <CartDrawer />
      <ImageReveal />
      <MobileNav />
    </>
  );
}
