'use client';

import Link from 'next/link';
import { useId, useRef, useState, type KeyboardEvent } from 'react';
import clsx from 'clsx';
import type { Product } from '@/data/products';
import { categories } from '@/data/categories';
import { site } from '@/data/site';
import { formatCLP } from '@/lib/format';
import { waProductUrl } from '@/lib/whatsapp';
import { CheckIcon } from '@/components/ui/Icons';

type Tab = { id: string; label: string };

const TABS: Tab[] = [
  { id: 'detalles', label: 'Detalles' },
  { id: 'talla', label: 'Talla y calce' },
  { id: 'envios', label: 'Envíos y cambios' },
];

/** Viñetas solo con datos reales del producto. */
function featuresOf(product: Product): string[] {
  const list: string[] = [];
  if (product.subcategory) list.push(product.subcategory);
  if (product.category === 'lenceria') list.push('Fabricada en Colombia', 'Encaje y microfibra');
  if (product.category === 'ropa') list.push('Prenda atemporal');
  if (product.metal) list.push(product.metal === 'dorado' ? 'Tono dorado' : 'Tono plateado');
  if (product.description?.toLowerCase().includes('a mano')) list.push('Hecho a mano');
  return list;
}

/** Pestañas accesibles (flechas izquierda/derecha para cambiar). */
export function ProductTabs({ product }: { product: Product }) {
  const [active, setActive] = useState(0);
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const baseId = useId();
  const category = categories[product.category];

  const onKey = (e: KeyboardEvent) => {
    if (e.key !== 'ArrowRight' && e.key !== 'ArrowLeft') return;
    e.preventDefault();
    const next = (active + (e.key === 'ArrowRight' ? 1 : TABS.length - 1)) % TABS.length;
    setActive(next);
    tabRefs.current[next]?.focus();
  };

  const panels: Record<string, React.ReactNode> = {
    detalles: (
      <>
        <p>{product.description ?? category.lead}</p>
        <ul className="mt-6 space-y-3">
          {featuresOf(product).map((f) => (
            <li key={f} className="flex items-center gap-3">
              <CheckIcon size={18} className="shrink-0 text-dorado" />
              {f}
            </li>
          ))}
        </ul>
      </>
    ),
    talla: (
      <>
        <p>
          {product.sizes
            ? `Disponible en tallas ${product.sizes.join(', ')}.`
            : 'Talla única.'}{' '}
          Si estás entre dos tallas, escríbenos y te ayudamos a elegir.
        </p>
        <div className="mt-6 flex flex-wrap gap-x-6 gap-y-3">
          <Link href="/guia-de-tallas" className="underline decoration-camel underline-offset-4 hover:text-negro">
            Ver guía de tallas
          </Link>
          <a
            href={waProductUrl(product.displayName)}
            target="_blank"
            rel="noopener noreferrer"
            className="underline decoration-camel underline-offset-4 hover:text-negro"
          >
            Consultar por WhatsApp
          </a>
        </div>
      </>
    ),
    envios: (
      <>
        <ul className="space-y-3">
          <li className="flex items-center gap-3">
            <CheckIcon size={18} className="shrink-0 text-dorado" />
            Despacho a {site.shipping.area}.
          </li>
          <li className="flex items-center gap-3">
            <CheckIcon size={18} className="shrink-0 text-dorado" />
            Envío gratis en compras desde {formatCLP(site.shipping.freeShippingThreshold)}.
          </li>
        </ul>
        <div className="mt-6 flex flex-wrap gap-x-6 gap-y-3">
          <Link href="/politicas/envios" className="underline decoration-camel underline-offset-4 hover:text-negro">
            Política de envíos
          </Link>
          <Link
            href="/politicas/cambios-y-devoluciones"
            className="underline decoration-camel underline-offset-4 hover:text-negro"
          >
            Cambios y devoluciones
          </Link>
        </div>
      </>
    ),
  };

  return (
    <div>
      <div role="tablist" aria-label="Información del producto" className="flex gap-6 overflow-x-auto border-b border-linea md:gap-10">
        {TABS.map((t, i) => (
          <button
            key={t.id}
            ref={(el) => {
              tabRefs.current[i] = el;
            }}
            type="button"
            role="tab"
            id={`${baseId}-tab-${t.id}`}
            aria-selected={i === active}
            aria-controls={`${baseId}-panel-${t.id}`}
            tabIndex={i === active ? 0 : -1}
            onClick={() => setActive(i)}
            onKeyDown={onKey}
            className={clsx(
              '-mb-px shrink-0 border-b-2 pb-3 text-[15px] whitespace-nowrap transition-colors',
              i === active ? 'border-cafe font-medium text-negro' : 'border-transparent text-cafe/70 hover:text-negro',
            )}
          >
            {t.label}
          </button>
        ))}
      </div>
      {TABS.map((t, i) => (
        <div
          key={t.id}
          role="tabpanel"
          id={`${baseId}-panel-${t.id}`}
          aria-labelledby={`${baseId}-tab-${t.id}`}
          hidden={i !== active}
          tabIndex={0}
          className="pt-6 text-[16px] leading-relaxed text-cafe/90"
        >
          {panels[t.id]}
        </div>
      ))}
    </div>
  );
}
