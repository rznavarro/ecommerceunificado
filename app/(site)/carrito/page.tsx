import type { Metadata } from 'next';
import { PageIntro } from '@/components/ui/PageIntro';
import { CartView } from '@/components/cart/CartView';

export const metadata: Metadata = {
  title: { absolute: 'Carrito | Purpuratta' },
  robots: { index: false, follow: true },
  alternates: { canonical: '/carrito' },
};

/** Carrito: líneas, envío gratis, formulario (zod) y envío del pedido por WhatsApp. */
export default function CartPage() {
  return (
    <div className="pt-(--chrome-h)">
      <PageIntro title="Tu carrito" />
      <div className="container-site pb-28">
        <CartView />
      </div>
    </div>
  );
}
