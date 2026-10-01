'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useId, useRef, useState } from 'react';
import clsx from 'clsx';
import type { Product } from '@/data/products';
import { discountPercent } from '@/data/products';
import { categories } from '@/data/categories';
import { getHighlights, type HighlightIcon } from '@/data/highlights';
import { useCart } from '@/lib/cart-store';
import { formatCLP } from '@/lib/format';
import { waProductUrl } from '@/lib/whatsapp';
import {
  BackIcon,
  BagIcon,
  CheckIcon,
  DropIcon,
  GiftIcon,
  HandIcon,
  LeafIcon,
  MinusIcon,
  PlusIcon,
  ShareIcon,
  SparkIcon,
  ThreadIcon,
  TruckIcon,
  WhatsAppIcon,
} from '@/components/ui/Icons';
import { FavoriteButton } from './FavoriteButton';

const ICONS: Record<HighlightIcon, typeof LeafIcon> = {
  leaf: LeafIcon,
  drop: DropIcon,
  thread: ThreadIcon,
  spark: SparkIcon,
  gift: GiftIcon,
  hand: HandIcon,
  truck: TruckIcon,
};

const MAX_QTY = 20;

const glassButton =
  'inline-flex size-11 items-center justify-center rounded-full border border-marfil/15 bg-negro/35 text-marfil backdrop-blur-md';

/** Ficha de producto en móvil y tablet (< 1024 px): estilo app, tema oscuro. */
export function MobileProductView({ product }: { product: Product }) {
  const router = useRouter();
  const category = categories[product.category];
  const highlights = getHighlights(product);
  const discount = discountPercent(product);
  const image = product.images[0];
  const sizes = product.sizes;

  const [size, setSize] = useState<string | null>(null);
  const [qty, setQty] = useState(1);
  const [error, setError] = useState(false);
  const [toast, setToast] = useState<string | null>(null);
  const add = useCart((s) => s.add);
  const sizesRef = useRef<HTMLElement>(null);
  const errorId = useId();

  const goBack = () => {
    if (window.history.length > 1) router.back();
    else router.push(category.href);
  };

  const share = async () => {
    const url = window.location.href;
    try {
      if (navigator.share) {
        await navigator.share({ title: product.displayName, url });
        return;
      }
      await navigator.clipboard.writeText(url);
      setToast('Enlace copiado');
    } catch {
      return;
    }
    window.setTimeout(() => setToast(null), 2000);
  };

  const onAdd = () => {
    if (sizes && !size) {
      setError(true);
      sizesRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
      return;
    }
    add({ slug: product.slug, displayName: product.displayName, size, unitPrice: product.price, quantity: qty });
  };

  return (
    <div className="min-h-svh bg-negro text-marfil lg:hidden">
      {/* Foto inmersiva */}
      <div className="relative h-[64svh] min-h-[440px] overflow-hidden bg-cafe">
        {image ? (
          <Image src={image.src} alt={image.alt} fill sizes="100vw" preload className="object-cover object-top" />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center p-8 text-center font-display text-[30px] text-marfil/70">
            {product.displayName}
          </div>
        )}
        <div aria-hidden="true" className="absolute inset-x-0 top-0 h-28 bg-linear-to-b from-negro/45 to-transparent" />
        <div aria-hidden="true" className="absolute inset-x-0 bottom-0 h-32 bg-linear-to-t from-cafe via-cafe/40 to-transparent" />

        {/* Barra superior */}
        <div className="absolute inset-x-0 top-0 flex items-center justify-between px-4 pt-[max(16px,env(safe-area-inset-top))]">
          <button type="button" onClick={goBack} aria-label="Volver" className={glassButton}>
            <BackIcon size={20} />
          </button>
          <div className="flex gap-2">
            <FavoriteButton
              slug={product.slug}
              name={product.displayName}
              className="size-11 rounded-full bg-marfil text-ciruela! shadow-sm"
            />
            <button type="button" onClick={share} aria-label="Compartir" className={glassButton}>
              <ShareIcon size={19} />
            </button>
          </div>
        </div>

        {/* Atributos */}
        <ul className="absolute top-[18%] right-4 flex flex-col gap-2.5" aria-label="Características">
          {highlights.map(({ icon, label }) => {
            const Icon = ICONS[icon];
            return (
              <li
                key={label}
                className="flex w-[92px] flex-col items-center gap-1.5 rounded-2xl border border-marfil/15 bg-cafe/80 px-2 py-3 text-center shadow-[0_8px_24px_-12px_rgba(28,26,24,.6)] backdrop-blur-md"
              >
                <Icon size={22} strokeWidth={1.6} className="text-camel" />
                <span className="text-[11.5px] leading-tight text-marfil">{label}</span>
              </li>
            );
          })}
        </ul>

        {toast && (
          <p role="status" className="absolute bottom-16 left-1/2 -translate-x-1/2 rounded-full bg-marfil px-4 py-2 text-[13px] text-negro">
            {toast}
          </p>
        )}
      </div>

      {/* Datos */}
      <div className="relative z-10 -mt-8 rounded-t-3xl border-t border-marfil/10 bg-cafe px-5 pt-6 pb-10">
        {(!product.inStock || discount !== null) && (
          <span
            className={clsx(
              'label mb-3 inline-block rounded-full px-3 py-1.5',
              product.inStock ? 'bg-ciruela text-marfil' : 'bg-marfil/15 text-marfil',
            )}
          >
            {product.inStock ? 'Oferta' : 'Agotado'}
          </span>
        )}
        <h1 className="font-display text-[30px] leading-[1.1] font-medium">{product.displayName}</h1>
        <p className="mt-1.5 text-[14px] text-marfil/65">
          {[product.subcategory, category.label].filter(Boolean).join(' · ')}
        </p>

        <div className="mt-5 flex items-center justify-between gap-4">
          <div>
            {product.price === null ? (
              <p className="text-[18px] text-camel">Consultar precio</p>
            ) : (
              <p className="flex flex-wrap items-baseline gap-x-2.5">
                <span className="text-[26px] font-medium text-camel tabular-nums">{formatCLP(product.price)}</span>
                {discount !== null && product.compareAtPrice !== undefined && (
                  <>
                    <span className="sr-only">precio habitual</span>
                    <s className="text-[15px] text-marfil/50 tabular-nums">{formatCLP(product.compareAtPrice)}</s>
                  </>
                )}
              </p>
            )}
            {discount !== null && <p className="mt-0.5 text-[13px] text-marfil/70">Ahorras {discount}%</p>}
          </div>

          {product.inStock && (
            <div className="inline-flex shrink-0 items-center rounded-xl border border-marfil/20">
              <button
                type="button"
                onClick={() => setQty((q) => Math.max(1, q - 1))}
                disabled={qty <= 1}
                aria-label="Restar uno"
                className="inline-flex size-11 items-center justify-center disabled:opacity-35"
              >
                <MinusIcon size={18} />
              </button>
              <span className="w-8 text-center text-[16px] tabular-nums" aria-live="polite">
                {qty}
              </span>
              <button
                type="button"
                onClick={() => setQty((q) => Math.min(MAX_QTY, q + 1))}
                disabled={qty >= MAX_QTY}
                aria-label="Sumar uno"
                className="inline-flex size-11 items-center justify-center disabled:opacity-35"
              >
                <PlusIcon size={18} />
              </button>
            </div>
          )}
        </div>

        {/* Tallas */}
        <section ref={sizesRef} aria-labelledby="m-tallas" className="mt-8">
          <div className="mb-3 flex items-baseline justify-between">
            <h2 id="m-tallas" className="text-[16px] font-medium">
              Tallas
            </h2>
            {sizes && (
              <Link href="/guia-de-tallas" className="text-[13px] text-camel underline underline-offset-4">
                Guía de tallas
              </Link>
            )}
          </div>
          {sizes ? (
            <>
              <div role="radiogroup" aria-labelledby="m-tallas" aria-describedby={error ? errorId : undefined} className="grid grid-cols-2 gap-2.5">
                {sizes.map((s) => {
                  const selected = size === s;
                  return (
                    <button
                      key={s}
                      type="button"
                      role="radio"
                      aria-checked={selected}
                      disabled={!product.inStock}
                      onClick={() => {
                        setSize(s);
                        setError(false);
                      }}
                      className={clsx(
                        'flex h-12 items-center gap-3 rounded-xl border px-4 text-left text-[14px] transition-colors disabled:opacity-40',
                        selected ? 'border-camel bg-camel/15 text-marfil' : 'border-marfil/15 bg-marfil/5 text-marfil/85',
                      )}
                    >
                      <span
                        className={clsx(
                          'inline-flex size-5 items-center justify-center rounded-full border',
                          selected ? 'border-camel bg-camel text-negro' : 'border-marfil/30',
                        )}
                      >
                        {selected && <CheckIcon size={13} strokeWidth={2} />}
                      </span>
                      Talla {s}
                    </button>
                  );
                })}
              </div>
              {error && (
                <p id={errorId} role="alert" className="mt-3 text-[13px] text-camel">
                  Elige una talla para añadir al carrito.
                </p>
              )}
            </>
          ) : (
            <p className="flex h-12 items-center gap-3 rounded-xl border border-marfil/15 bg-marfil/5 px-4 text-[14px] text-marfil/85">
              <CheckIcon size={16} className="text-camel" /> Talla única
            </p>
          )}
        </section>

        {/* Descripción */}
        <section className="mt-8">
          <h2 className="mb-2 text-[16px] font-medium">Descripción</h2>
          <p className="text-[15px] leading-relaxed text-marfil/75">{product.description ?? category.lead}</p>
        </section>
      </div>

      {/* Botón fijo */}
      <div className="fixed inset-x-0 bottom-0 z-40 bg-linear-to-t from-negro via-negro/95 to-negro/0 px-5 pt-6 pb-[max(16px,env(safe-area-inset-bottom))]">
        {product.inStock ? (
          <button
            type="button"
            onClick={onAdd}
            className="flex h-14 w-full items-center justify-center gap-2.5 rounded-2xl bg-camel text-[16px] font-medium text-negro shadow-[0_12px_30px_-12px_rgba(200,162,124,.6)] active:scale-[.99]"
          >
            <BagIcon size={20} />
            {product.price === null ? 'Añadir y consultar precio' : 'Añadir al carrito'}
          </button>
        ) : (
          <a
            href={waProductUrl(product.displayName)}
            target="_blank"
            rel="noopener noreferrer"
            className="flex h-14 w-full items-center justify-center gap-2.5 rounded-2xl bg-marfil text-[16px] font-medium text-negro"
          >
            <WhatsAppIcon size={20} />
            Avísame cuando vuelva
          </a>
        )}
      </div>
    </div>
  );
}
