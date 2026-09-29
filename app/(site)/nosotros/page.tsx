import type { Metadata } from 'next';
import { PageIntro } from '@/components/ui/PageIntro';
import { site } from '@/data/site';

export const metadata: Metadata = {
  title: { absolute: 'Nosotros | Purpuratta' },
  description: site.identity,
  alternates: { canonical: '/nosotros' },
};

/** [PENDIENTE: historia del negocio]. Mientras tanto, el texto de la sección 5.9. */
export default function AboutPage() {
  return (
    <div className="pt-(--chrome-h)">
      <PageIntro
        eyebrow="Nosotros"
        title="Todo lo que te hace sentir bien, en un solo lugar"
        lead="Reunimos lencería fabricada en Colombia, prendas atemporales y accesorios hechos a mano en una sola tienda, para que encuentres todo lo que te hace sentir bien en un mismo lugar."
        className="pb-28"
      />
    </div>
  );
}
