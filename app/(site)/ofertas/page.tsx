import type { Metadata } from 'next';
import { getOnSale } from '@/data/products';
import { PageIntro } from '@/components/ui/PageIntro';
import { ProductCard } from '@/components/product/ProductCard';

export const metadata: Metadata = {
  title: { absolute: 'Ofertas | Purpuratta' },
  description: 'Lencería fabricada en Colombia con descuento. Despacho a todo Chile.',
  alternates: { canonical: '/ofertas' },
};

export default function OffersPage() {
  const items = getOnSale();
  return (
    <div className="pt-(--chrome-h)">
      <PageIntro eyebrow="Ofertas" title="Precios especiales" lead="Lencería fabricada en Colombia con descuento, mientras haya stock." />
      <section aria-label="Productos en oferta" className="container-site pb-28">
        <p className="label mb-8 text-cafe/70">
          {items.length} {items.length === 1 ? 'producto' : 'productos'}
        </p>
        <ul className="grid grid-cols-2 gap-x-4 gap-y-10 md:grid-cols-3 md:gap-x-6 lg:grid-cols-4">
          {items.map((p) => (
            <li key={p.slug}>
              <ProductCard product={p} />
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
