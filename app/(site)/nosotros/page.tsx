import type { Metadata } from 'next';
import Link from 'next/link';
import { PageIntro } from '@/components/ui/PageIntro';
import { EditorialImage } from '@/components/ui/EditorialImage';
import { categoryList } from '@/data/categories';
import type { EditorialId } from '@/data/images';
import type { Category } from '@/data/products';
import { site } from '@/data/site';

export const metadata: Metadata = {
  title: { absolute: 'Nosotros | Purpuratta' },
  description: site.identity,
  alternates: { canonical: '/nosotros' },
};

const aboutImages: Record<Category, EditorialId> = {
  lenceria: '05',
  ropa: '06',
  joyeria: '14',
};

/** [PENDIENTE: historia del negocio]. Mientras tanto, el texto de la sección 5.9. */
export default function AboutPage() {
  return (
    <div className="pt-(--chrome-h)">
      <PageIntro
        eyebrow="Nosotros"
        title="Todo lo que te hace sentir bien, en un solo lugar"
        lead="Reunimos lencería fabricada en Colombia, prendas atemporales y accesorios hechos a mano en una sola tienda, para que encuentres todo lo que te hace sentir bien en un mismo lugar."
      />

      <EditorialImage
        id="04"
        sizes="100vw"
        priority
        className="h-[50svh] min-h-[320px] md:h-[65svh] md:max-h-[640px]"
      />

      <section aria-label="Lo que reunimos" className="container-site section-y">
        <ul className="grid gap-12 md:grid-cols-3 md:gap-6">
          {categoryList.map((c) => (
            <li key={c.id}>
              <Link href={c.href} className="group block">
                <EditorialImage
                  id={aboutImages[c.id]}
                  aspect="4 / 5"
                  sizes="(min-width: 768px) 33vw, 100vw"
                  imgClassName="transition-transform duration-[1200ms] ease-out group-hover:scale-[1.04]"
                />
                <h2 className="mt-6 font-display text-[30px] leading-tight font-medium text-negro">{c.label}</h2>
                <p className="mt-2 max-w-sm text-cafe/85">{c.lead}</p>
              </Link>
            </li>
          ))}
        </ul>
      </section>

      <section className="border-t border-linea bg-crema">
        <div className="container-site section-y">
          <p className="max-w-3xl font-display text-[26px] leading-snug text-negro md:text-[34px]">{site.identity}</p>
        </div>
      </section>
    </div>
  );
}
