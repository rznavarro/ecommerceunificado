'use client';

import Link from 'next/link';
import clsx from 'clsx';
import { getProduct } from '@/data/products';
import { site } from '@/data/site';
import { useCart, selectSubtotal } from '@/lib/cart-store';
import { formatCLP } from '@/lib/format';
import { qualifiesForFreeShipping } from '@/lib/order';
import { ProductImage } from '@/components/product/ProductImage';
import { MinusIcon, PlusIcon } from '@/components/ui/Icons';

/** Líneas del carrito con cantidad editable (panel lateral y página). */
export function CartLines({ onNavigate, compact }: { onNavigate?: () => void; compact?: boolean }) {
  const lines = useCart((s) => s.lines);
  const setQuantity = useCart((s) => s.setQuantity);
  const remove = useCart((s) => s.remove);

  return (
    <ul className="divide-y divide-linea">
      {lines.map((line) => {
        const product = getProduct(line.slug);
        const href = `/producto/${line.slug}`;
        return (
          <li key={`${line.slug}-${line.size ?? ''}`} className="flex gap-4 py-5">
            <Link href={href} onClick={onNavigate} className={clsx('shrink-0', compact ? 'w-20' : 'w-24 md:w-28')}>
              {product ? (
                <ProductImage product={product} sizes="112px" />
              ) : (
                <div className="aspect-[4/5] rounded-[3px] bg-crema" />
              )}
            </Link>
            <div className="flex min-w-0 flex-1 flex-col">
              <div className="flex items-start justify-between gap-3">
                <div className="min-w-0">
                  <Link href={href} onClick={onNavigate} className="font-display text-[19px] leading-snug text-negro hover:underline">
                    {line.displayName}
                  </Link>
                  <p className="mt-0.5 text-[14px] text-cafe/75">
                    {line.size ? `Talla ${line.size}` : 'Talla única'}
                  </p>
                </div>
                <p className="shrink-0 text-[15px] font-medium text-cafe tabular-nums">
                  {line.unitPrice === null ? 'Precio a confirmar' : formatCLP(line.unitPrice * line.quantity)}
                </p>
              </div>
              <div className="mt-auto flex items-center justify-between gap-3 pt-3">
                <div className="inline-flex items-center rounded-[3px] border border-linea">
                  <button
                    type="button"
                    onClick={() => setQuantity(line.slug, line.size, line.quantity - 1)}
                    className="inline-flex size-9 items-center justify-center text-cafe hover:text-negro"
                    aria-label={`Restar uno: ${line.displayName}`}
                  >
                    <MinusIcon size={16} />
                  </button>
                  <span className="w-8 text-center text-[14px] tabular-nums" aria-live="polite">
                    {line.quantity}
                  </span>
                  <button
                    type="button"
                    onClick={() => setQuantity(line.slug, line.size, line.quantity + 1)}
                    className="inline-flex size-9 items-center justify-center text-cafe hover:text-negro"
                    aria-label={`Sumar uno: ${line.displayName}`}
                  >
                    <PlusIcon size={16} />
                  </button>
                </div>
                <button
                  type="button"
                  onClick={() => remove(line.slug, line.size)}
                  className="text-[13px] text-cafe/75 underline underline-offset-4 hover:text-negro"
                >
                  Quitar
                </button>
              </div>
            </div>
          </li>
        );
      })}
    </ul>
  );
}

/** Barra de avance hacia el envío gratis. */
export function FreeShippingProgress() {
  const subtotal = useCart(selectSubtotal);
  const threshold = site.shipping.freeShippingThreshold;
  const reached = qualifiesForFreeShipping(subtotal);
  const pct = Math.min(100, Math.round((subtotal / threshold) * 100));
  return (
    <div>
      <p className="text-[14px] text-cafe">
        {reached ? (
          <span className="font-medium text-negro">¡Tu pedido tiene envío gratis!</span>
        ) : (
          <>
            Te faltan <span className="font-medium text-negro">{formatCLP(threshold - subtotal)}</span> para el envío gratis.
          </>
        )}
      </p>
      <div className="mt-2 h-1 overflow-hidden rounded-full bg-crema" aria-hidden="true">
        <div className="h-full bg-dorado transition-[width] duration-500" style={{ width: `${pct}%` }} />
      </div>
    </div>
  );
}
