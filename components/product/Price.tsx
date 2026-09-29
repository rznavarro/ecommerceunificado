import clsx from 'clsx';
import type { Product } from '@/data/products';
import { isOnSale } from '@/data/products';
import { formatCLP } from '@/lib/format';

export function Price({ product, className }: { product: Product; className?: string }) {
  if (product.price === null) {
    return <p className={clsx('text-[15px] text-cafe/85', className)}>Consultar precio</p>;
  }
  const sale = isOnSale(product);
  return (
    <p className={clsx('flex flex-wrap items-baseline gap-x-2.5 text-[15px] tabular-nums', className)}>
      <span className="font-medium text-cafe">{formatCLP(product.price)}</span>
      {sale && product.compareAtPrice !== undefined && (
        <>
          <span className="sr-only">precio habitual</span>
          <s className="text-cafe/60">{formatCLP(product.compareAtPrice)}</s>
        </>
      )}
    </p>
  );
}
