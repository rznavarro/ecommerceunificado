import type { Category } from '@/data/products';
import { getProductsByCategory } from '@/data/products';
import { categories } from '@/data/categories';
import { PageIntro } from '@/components/ui/PageIntro';
import { ProductCard } from '@/components/product/ProductCard';

/** Página de categoría — Fase 1: cabecera + grilla. Filtros y orden en la Fase 3. */
export function CategoryView({ category }: { category: Category }) {
  const info = categories[category];
  const items = getProductsByCategory(category);

  return (
    <div className="pt-(--chrome-h)">
      <PageIntro title={info.label} lead={info.lead} />
      <section aria-label={`Productos de ${info.label.toLowerCase()}`} className="container-site pb-28">
        <p className="label mb-8 text-cafe/70">
          {items.length} {items.length === 1 ? 'producto' : 'productos'}
        </p>
        <ul className="grid grid-cols-2 gap-x-4 gap-y-12 md:grid-cols-3 md:gap-x-6 lg:grid-cols-4">
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
