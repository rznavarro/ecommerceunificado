'use client';

import Link from 'next/link';
import { useId, useState } from 'react';
import clsx from 'clsx';
import type { Product } from '@/data/products';
import { discountPercent } from '@/data/products';
import { categories } from '@/data/categories';
import { site } from '@/data/site';
import { formatCLP } from '@/lib/format';
import { useCart } from '@/lib/cart-store';
import { waProductUrl } from '@/lib/whatsapp';
import { Price } from './Price';
import { FavoriteButton } from './FavoriteButton';
import { BagIcon, ChatIcon, ShieldIcon, ThreadIcon, TruckIcon, WhatsAppIcon } from '@/components/ui/Icons';

/** Columna de compra de la ficha: precio, talla, carrito y garantías. */
export function ProductPurchase({ product }: { product: Product }) {
  const category = categories[product.category];
  const discount = discountPercent(product);
  const sizes = product.sizes;
  const [size, setSize] = useState<string | null>(null);
  const [error, setError] = useState(false);
  const add = useCart((s) => s.add);
  const errorId = useId();

  const onAdd = () => {
    if (sizes && !size) {
      setError(true);
      return;
    }
    add({ slug: product.slug, displayName: product.displayName, size, unitPrice: product.price });
  };

  const guarantees = [
    { icon: TruckIcon, title: 'Despacho a todo Chile', text: `Gratis sobre ${formatCLP(site.shipping.freeShippingThreshold)}` },
    product.category === 'lenceria'
      ? { icon: ThreadIcon, title: 'Hecho en Colombia', text: 'Encaje y microfibra' }
      : { icon: ShieldIcon, title: 'Pedido por WhatsApp', text: 'Confirmamos stock y envío' },
    { icon: ChatIcon, title: 'Atención por WhatsApp', text: 'Te ayudamos con tu talla' },
  ];

  return (
    <div>
      <nav aria-label="Migas de pan" className="label mb-6 text-cafe/70">
        <Link href="/" className="hover:text-negro">
          Inicio
        </Link>
        <span aria-hidden="true"> / </span>
        <Link href={category.href} className="hover:text-negro">
          {category.label}
        </Link>
        {product.subcategory && (
          <>
            <span aria-hidden="true"> / </span>
            <span>{product.subcategory}</span>
          </>
        )}
      </nav>

      <div className="mb-4 flex flex-wrap gap-2">
        {!product.inStock ? (
          <span className="label rounded-[2px] bg-crema px-2.5 py-1.5 text-cafe">Agotado</span>
        ) : discount !== null ? (
          <span className="label rounded-[2px] bg-ciruela px-2.5 py-1.5 text-marfil">Oferta</span>
        ) : (
          <span className="label rounded-[2px] bg-crema px-2.5 py-1.5 text-dorado-texto">{category.label}</span>
        )}
      </div>

      <h1 className="font-display text-[34px] leading-[1.08] font-medium text-negro md:text-[44px]">{product.name}</h1>

      <div className="mt-5 flex flex-wrap items-center gap-3">
        <Price product={product} className="text-[22px]! font-medium" />
        {discount !== null && (
          <span className="label rounded-[2px] bg-negro px-2 py-1 text-marfil">{discount}% dcto.</span>
        )}
      </div>

      <p className="mt-5 max-w-lg text-cafe/85">{product.description ?? category.lead}</p>

      <hr className="my-8 border-linea" />

      {sizes ? (
        <fieldset aria-describedby={error ? errorId : undefined}>
          <legend className="sr-only">Elige tu talla</legend>
          <div className="mb-3 flex items-center justify-between gap-4">
            <p className="text-[15px] text-negro" aria-hidden="true">
              <span className="font-medium">Talla:</span> {size ?? <span className="text-cafe/70">elige una</span>}
            </p>
            <Link href="/guia-de-tallas" className="text-[14px] text-cafe underline decoration-camel underline-offset-4 hover:text-negro">
              Guía de tallas
            </Link>
          </div>
          <div className="flex flex-wrap gap-2.5">
            {sizes.map((s) => (
              <button
                key={s}
                type="button"
                onClick={() => {
                  setSize(s);
                  setError(false);
                }}
                aria-pressed={size === s}
                disabled={!product.inStock}
                className={clsx(
                  'h-11 min-w-14 rounded-[3px] border px-4 text-[14px] font-medium transition-colors disabled:cursor-not-allowed disabled:opacity-40',
                  size === s ? 'border-cafe bg-cafe text-marfil' : 'border-linea bg-marfil text-cafe hover:border-cafe',
                )}
              >
                {s}
              </button>
            ))}
          </div>
          {error && (
            <p id={errorId} role="alert" className="mt-3 text-[14px] text-ciruela">
              Elige una talla para añadir al carrito.
            </p>
          )}
        </fieldset>
      ) : (
        <p className="text-[15px] text-negro">
          <span className="font-medium">Talla:</span> única
        </p>
      )}

      <div className="mt-8 flex gap-3">
        {product.inStock ? (
          <button type="button" onClick={onAdd} className="btn-primary min-h-14 flex-1 text-[13px]">
            <BagIcon size={20} />
            {product.price === null ? 'Añadir y consultar precio' : 'Añadir al carrito'}
          </button>
        ) : (
          <a
            href={waProductUrl(product.displayName)}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary min-h-14 flex-1 text-[13px]"
          >
            <WhatsAppIcon size={20} />
            Avísame cuando vuelva
          </a>
        )}
        <FavoriteButton
          slug={product.slug}
          name={product.displayName}
          size={22}
          className="size-14 shrink-0 rounded-[3px] border border-linea bg-marfil hover:border-cafe"
        />
      </div>

      {product.inStock && (
        <a
          href={waProductUrl(product.displayName)}
          target="_blank"
          rel="noopener noreferrer"
          className="label mt-5 inline-flex min-h-11 items-center gap-2 text-cafe hover:text-negro"
        >
          <WhatsAppIcon size={18} /> ¿Dudas? Consúltanos por WhatsApp
        </a>
      )}

      <ul className="mt-6 grid grid-cols-3 gap-3 border-t border-linea pt-6">
        {guarantees.map(({ icon: Icon, title, text }) => (
          <li key={title} className="flex flex-col gap-2 sm:flex-row sm:gap-2.5">
            <Icon size={22} className="shrink-0 text-dorado" />
            <div>
              <p className="text-[12px] leading-snug font-medium text-negro">{title}</p>
              <p className="text-[12px] leading-snug text-cafe/75">{text}</p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
