import Link from 'next/link';
import type { Product } from '@/data/products';
import { isOnSale } from '@/data/products';
import { Price } from './Price';
import { ProductImage } from './ProductImage';

/** Tarjeta base de producto (Fase 1). La Fase 3 suma talla rápida y "Añadir". */
export function ProductCard({ product }: { product: Product }) {
  const sale = isOnSale(product);
  return (
    <article className="group relative">
      <Link href={`/producto/${product.slug}`} className="block">
        <div className="relative">
          <ProductImage
            product={product}
            sizes="(min-width: 1440px) 340px, (min-width: 1024px) 25vw, (min-width: 768px) 33vw, 50vw"
            className="transition-transform duration-700 ease-out group-hover:scale-[1.015]"
          />
          <div className="absolute top-3 left-3 flex gap-2">
            {!product.inStock && (
              <span className="label bg-marfil/90 px-2.5 py-1.5 text-cafe">Agotado</span>
            )}
            {product.inStock && sale && (
              <span className="label bg-ciruela px-2.5 py-1.5 text-marfil">Oferta</span>
            )}
          </div>
        </div>
        <h3 className="mt-4 font-display text-[20px] leading-snug text-negro md:text-[22px]">
          {product.displayName}
        </h3>
      </Link>
      <Price product={product} className="mt-1" />
    </article>
  );
}
