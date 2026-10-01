import Link from 'next/link';
import type { Product } from '@/data/products';
import { isOnSale } from '@/data/products';
import { Price } from './Price';
import { ProductImage } from './ProductImage';
import { FavoriteButton } from './FavoriteButton';

/** Tarjeta de producto: foto, nombre, precio y favorito. */
export function ProductCard({ product }: { product: Product }) {
  const sale = isOnSale(product);
  return (
    <article className="group relative">
      <Link href={`/producto/${product.slug}`} className="block" tabIndex={-1} aria-hidden="true">
        <div className="relative">
          <ProductImage
            product={product}
            sizes="(min-width: 1440px) 340px, (min-width: 1024px) 25vw, (min-width: 768px) 33vw, 50vw"
            className="transition-transform duration-700 ease-out group-hover:scale-[1.015]"
          />
          <div className="absolute top-3 left-3 flex gap-2">
            {!product.inStock && (
              <span className="label rounded-full bg-marfil/90 px-3 py-1.5 text-cafe">Agotado</span>
            )}
            {product.inStock && sale && (
              <span className="label rounded-full bg-ciruela px-3 py-1.5 text-marfil">Oferta</span>
            )}
          </div>
        </div>
      </Link>
      <div className="mt-4 flex items-start justify-between gap-3">
        <div className="min-w-0">
          <h3 className="font-display text-[17px] leading-snug text-negro sm:text-[20px] md:text-[22px]">
            <Link href={`/producto/${product.slug}`}>{product.displayName}</Link>
          </h3>
          <Price product={product} className="mt-1" />
        </div>
        <FavoriteButton slug={product.slug} name={product.displayName} className="-mt-1 -mr-2 size-10 shrink-0" />
      </div>
    </article>
  );
}
