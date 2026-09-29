import type { Metadata } from 'next';
import { PageIntro } from '@/components/ui/PageIntro';

export const metadata: Metadata = {
  title: { absolute: 'Carrito | Purpuratta' },
  robots: { index: false, follow: true },
  alternates: { canonical: '/carrito' },
};

/** Carrito — Fase 3: líneas, envío gratis, formulario (zod) y envío por WhatsApp. */
export default function CartPage() {
  return (
    <div className="pt-(--chrome-h)">
      <PageIntro title="Tu carrito" />
    </div>
  );
}
