import type { Metadata } from 'next';
import { PageIntro } from '@/components/ui/PageIntro';
import { Pending } from '@/components/ui/Pending';

export const metadata: Metadata = {
  title: { absolute: 'Guía de tallas | Purpuratta' },
  description: 'Te ayudamos a elegir tu talla por WhatsApp.',
  alternates: { canonical: '/guia-de-tallas' },
};

/** [PENDIENTE: tabla de tallas]. No se enlaza desde el menú hasta tenerla. */
export default function SizeGuidePage() {
  return (
    <div className="pt-(--chrome-h)">
      <PageIntro title="Guía de tallas" />
      <div className="container-site pb-28">
        <Pending message="Escríbenos por WhatsApp y te ayudamos a elegir tu talla." />
      </div>
    </div>
  );
}
