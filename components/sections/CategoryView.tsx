import type { Category } from '@/data/products';
import { getProductsByCategory } from '@/data/products';
import { categories } from '@/data/categories';
import { EditorialImage } from '@/components/ui/EditorialImage';
import { ProductCard } from '@/components/product/ProductCard';

/** Página de categoría — Fase 1: cabecera + grilla. Filtros y orden en la Fase 3. */
export function CategoryView({ category }: { category: Category }) {
  const info = categories[category];
  const items = getProductsByCategory(category);

  return (
    <div className="pt-(--chrome-h)">
      <header className="container-site grid items-center gap-10 pt-10 pb-14 md:pt-14 lg:grid-cols-[1fr_1.1fr] lg:gap-16 lg:pb-20">
        <div>
          <p className="label mb-5 text-dorado-texto">Colección</p>
          <h1 className="display-hero">{info.label}</h1>
          <p className="mt-6 max-w-md text-[17px] text-cafe/85">{info.lead}</p>
        </div>
        <EditorialImage
          id={info.headerImage}
          aspect="4 / 3"
          sizes="(min-width: 1024px) 50vw, 100vw"
          priority
          className="order-first lg:order-none"
        />
      </header>
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
