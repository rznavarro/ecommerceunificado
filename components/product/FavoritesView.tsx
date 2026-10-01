'use client';

import Link from 'next/link';
import { getProduct, type Product } from '@/data/products';
import { categoryList } from '@/data/categories';
import { useFavoriteSlugs } from '@/lib/hooks/useFavorites';
import { HeartIcon } from '@/components/ui/Icons';
import { ProductCard } from './ProductCard';

/** Grilla de favoritos guardados en el navegador. */
export function FavoritesView() {
  const items = useFavoriteSlugs()
    .map(getProduct)
    .filter((p): p is Product => !!p);

  if (items.length === 0) {
    return (
      <div className="rounded-2xl bg-crema px-6 py-14 text-center">
        <HeartIcon size={28} className="mx-auto text-dorado" />
        <p className="mt-4 font-display text-[26px] text-negro">Aún no tienes favoritos</p>
        <p className="mt-2 text-cafe/80">Toca el corazón de un producto para guardarlo aquí.</p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          {categoryList.map((c) => (
            <Link key={c.id} href={c.href} className="btn-glass rounded-full">
              {c.label}
            </Link>
          ))}
        </div>
      </div>
    );
  }

  return (
    <ul className="grid grid-cols-2 gap-x-4 gap-y-10 md:grid-cols-3 md:gap-x-6 lg:grid-cols-4">
      {items.map((p) => (
        <li key={p.slug}>
          <ProductCard product={p} />
        </li>
      ))}
    </ul>
  );
}
