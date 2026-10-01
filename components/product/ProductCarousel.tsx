'use client';

import { useCallback, useEffect, useRef, useState, type ReactNode } from 'react';
import type { Product } from '@/data/products';
import { ArrowIcon } from '@/components/ui/Icons';
import { ProductCard } from './ProductCard';

type Props = {
  products: Product[];
  /** Encabezado (título, enlace "ver todo"); las flechas se añaden a la derecha */
  header: ReactNode;
  label: string;
};

/**
 * Carrusel horizontal con scroll-snap: siempre asoma la tarjeta siguiente.
 * Flechas para avanzar de a una tarjeta; táctil, trackpad y teclado nativos.
 */
export function ProductCarousel({ products, header, label }: Props) {
  const trackRef = useRef<HTMLUListElement>(null);
  const [edges, setEdges] = useState({ start: true, end: false });

  const measure = useCallback(() => {
    const el = trackRef.current;
    if (!el) return;
    setEdges({
      start: el.scrollLeft <= 4,
      end: el.scrollLeft + el.clientWidth >= el.scrollWidth - 4,
    });
  }, []);

  useEffect(() => {
    const el = trackRef.current;
    if (!el) return;
    measure();
    el.addEventListener('scroll', measure, { passive: true });
    window.addEventListener('resize', measure);
    return () => {
      el.removeEventListener('scroll', measure);
      window.removeEventListener('resize', measure);
    };
  }, [measure]);

  const step = (dir: 1 | -1) => {
    const el = trackRef.current;
    const item = el?.querySelector('li');
    if (!el || !item) return;
    const gap = parseFloat(getComputedStyle(el).columnGap) || 0;
    el.scrollBy({ left: dir * (item.getBoundingClientRect().width + gap), behavior: 'smooth' });
  };

  const arrowClass =
    'inline-flex size-11 items-center justify-center rounded-full border border-linea text-cafe transition-colors hover:border-cafe hover:text-negro disabled:cursor-default disabled:opacity-30 disabled:hover:border-linea';

  return (
    <div>
      <div className="mb-10 flex flex-wrap items-end justify-between gap-6 md:mb-14">
        <div className="min-w-0">{header}</div>
        <div className="flex gap-2">
          <button type="button" onClick={() => step(-1)} disabled={edges.start} className={arrowClass} aria-label="Anterior">
            <ArrowIcon size={18} className="rotate-180" />
          </button>
          <button type="button" onClick={() => step(1)} disabled={edges.end} className={arrowClass} aria-label="Siguiente">
            <ArrowIcon size={18} />
          </button>
        </div>
      </div>
      <ul
        ref={trackRef}
        aria-label={label}
        className="-mx-(--gutter) flex snap-x snap-mandatory scroll-px-(--gutter) gap-4 overflow-x-auto px-(--gutter) pb-4 [scrollbar-width:none] md:gap-6 [&::-webkit-scrollbar]:hidden"
      >
        {products.map((p) => (
          <li key={p.slug} className="carousel-card shrink-0 snap-start">
            <ProductCard product={p} />
          </li>
        ))}
      </ul>
    </div>
  );
}
