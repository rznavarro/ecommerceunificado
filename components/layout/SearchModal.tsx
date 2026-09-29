'use client';

import Link from 'next/link';
import { useMemo, useRef, useState } from 'react';
import { products } from '@/data/products';
import { categories } from '@/data/categories';
import { formatCLP, normalize } from '@/lib/format';
import { useDialog } from '@/lib/hooks/useDialog';
import { CloseIcon, SearchIcon } from '@/components/ui/Icons';

type Props = { open: boolean; onClose: () => void };

/** Búsqueda en el cliente sobre data/products.ts (nombre y nombre corto). */
export function SearchModal({ open, onClose }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const [query, setQuery] = useState('');
  useDialog(open, onClose, ref);

  const results = useMemo(() => {
    const q = normalize(query);
    if (q.length < 2) return [];
    const terms = q.split(/\s+/);
    return products
      .filter((p) => {
        const haystack = normalize(`${p.name} ${p.displayName} ${p.subcategory ?? ''} ${categories[p.category].label}`);
        return terms.every((t) => haystack.includes(t));
      })
      .slice(0, 12);
  }, [query]);

  const close = () => {
    setQuery('');
    onClose();
  };

  return (
    <div
      ref={ref}
      role="dialog"
      aria-modal="true"
      aria-label="Buscar productos"
      hidden={!open}
      className="fixed inset-0 z-60"
    >
      <button
        type="button"
        tabIndex={-1}
        aria-hidden="true"
        onClick={close}
        className="absolute inset-0 cursor-default bg-negro/35"
      />
      <div className="relative mx-auto mt-0 max-h-svh w-full max-w-2xl overflow-y-auto bg-marfil shadow-[0_30px_80px_-30px_rgba(28,26,24,.45)] md:mt-[12vh]">
        <div className="flex items-center gap-3 border-b border-linea px-5 focus-within:border-ciruela md:px-8">
          <SearchIcon className="shrink-0 text-dorado" />
          <label htmlFor="buscar" className="sr-only">
            Buscar productos
          </label>
          <input
            id="buscar"
            data-autofocus
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Busca un sostén, un collar, un abrigo…"
            autoComplete="off"
            className="h-18 w-full bg-transparent font-display text-[24px] text-negro placeholder:text-cafe/50 focus:outline-none md:text-[28px]"
          />
          <button
            type="button"
            onClick={close}
            className="inline-flex size-11 shrink-0 items-center justify-center text-cafe"
            aria-label="Cerrar búsqueda"
          >
            <CloseIcon />
          </button>
        </div>

        <div className="px-5 py-4 md:px-8" aria-live="polite">
          {query.trim().length >= 2 && results.length === 0 && (
            <p className="py-6 text-[15px] text-cafe/80">No encontramos productos con “{query}”.</p>
          )}
          {results.length > 0 && (
            <ul className="divide-y divide-linea">
              {results.map((p) => (
                <li key={p.slug}>
                  <Link
                    href={`/producto/${p.slug}`}
                    onClick={close}
                    className="flex min-h-14 items-center justify-between gap-4 py-3 transition-colors hover:text-negro"
                  >
                    <span>
                      <span className="block font-display text-[20px] leading-tight text-negro">{p.displayName}</span>
                      <span className="label text-dorado-texto">{categories[p.category].label}</span>
                    </span>
                    <span className="shrink-0 text-[14px] tabular-nums">
                      {!p.inStock ? 'Agotado' : p.price === null ? 'Consultar precio' : formatCLP(p.price)}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}
