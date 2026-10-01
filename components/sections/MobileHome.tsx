'use client';

import Image from 'next/image';
import Link from 'next/link';
import clsx from 'clsx';
import type { Product } from '@/data/products';
import { discountPercent } from '@/data/products';
import { categoryList } from '@/data/categories';
import { getEditorial } from '@/data/images';
import { useUI } from '@/lib/ui-store';
import { ArrowIcon, SearchIcon } from '@/components/ui/Icons';
import { ProductCard } from '@/components/product/ProductCard';

type Props = {
  featured: Product[];
  onSale: Product[];
  apparelAndJewelry: Product[];
};

const chips = [
  { href: '/', label: 'Todo' },
  ...categoryList.map((c) => ({ href: c.href, label: c.label })),
  { href: '/ofertas', label: 'Ofertas' },
];

function SectionHead({ title, href, cta = 'Ver todo' }: { title: string; href: string; cta?: string }) {
  return (
    <div className="mb-4 flex items-baseline justify-between gap-4">
      <h2 className="text-[17px] font-medium text-negro">{title}</h2>
      <Link href={href} className="inline-flex items-center gap-1 text-[13px] text-cafe/80">
        {cta} <ArrowIcon size={14} />
      </Link>
    </div>
  );
}

function ProductRow({ items, label }: { items: Product[]; label: string }) {
  return (
    <ul
      aria-label={label}
      className="-mx-(--gutter) flex snap-x snap-mandatory scroll-px-(--gutter) gap-3 overflow-x-auto px-(--gutter) pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
    >
      {items.map((p) => (
        <li key={p.slug} className="w-[44%] shrink-0 snap-start sm:w-[30%]">
          <ProductCard product={p} />
        </li>
      ))}
    </ul>
  );
}

/** Portada en móvil y tablet (< 1024 px): diseño minimalista tipo app. */
export function MobileHome({ featured, onSale, apparelAndJewelry }: Props) {
  const openSearch = useUI((s) => s.openSearch);
  const deal = onSale[0];
  const maxDiscount = deal ? discountPercent(deal) : null;

  return (
    <div className="container-site space-y-9 pt-[calc(var(--chrome-h)+16px)] pb-12 lg:hidden">
      {/* Titular + buscar */}
      <section className="flex items-start justify-between gap-4">
        <p className="font-display text-[40px] leading-[1.05] font-medium text-negro sm:text-[48px]">
          Todo lo que{' '}
          <span className="inline-block rounded-full bg-camel/35 px-3 font-display text-dorado-texto italic">
            te hace
          </span>
          <br />
          sentir bien.
        </p>
        <button
          type="button"
          onClick={openSearch}
          aria-label="Buscar productos"
          aria-haspopup="dialog"
          className="mt-2 inline-flex size-12 shrink-0 items-center justify-center rounded-2xl bg-white text-cafe shadow-[0_6px_20px_-8px_rgba(59,42,34,.35)]"
        >
          <SearchIcon size={20} />
        </button>
      </section>

      {/* Chips */}
      <nav aria-label="Categorías rápidas" className="-mx-(--gutter) -mt-3">
        <ul className="flex gap-2 overflow-x-auto px-(--gutter) [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {chips.map((c, i) => (
            <li key={c.href} className="shrink-0">
              <Link
                href={c.href}
                aria-current={i === 0 ? 'page' : undefined}
                className={clsx(
                  'inline-flex h-10 items-center rounded-full px-5 text-[14px] transition-colors',
                  i === 0 ? 'bg-cafe text-marfil' : 'border border-linea bg-white/60 text-cafe',
                )}
              >
                {c.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      {/* Categorías */}
      <section aria-label="Categorías">
        <h2 className="mb-4 text-[17px] font-medium text-negro">Categorías</h2>
        <ul className="grid grid-cols-4 gap-2.5">
          {[
            ...categoryList.map((c) => ({ href: c.href, label: c.label, img: getEditorial(c.cardImage) })),
            { href: '/ofertas', label: 'Ofertas', img: deal?.images[0] ? { ...deal.images[0], position: undefined } : null },
          ].map((c) => (
            <li key={c.href}>
              <Link href={c.href} className="group block">
                <div className="relative aspect-[4/5] overflow-hidden rounded-2xl bg-crema">
                  {c.img && (
                    <Image
                      src={c.img.src}
                      alt=""
                      fill
                      sizes="25vw"
                      className="object-cover"
                      style={c.img.position ? { objectPosition: c.img.position } : undefined}
                    />
                  )}
                </div>
                <p className="mt-2 text-center text-[13px] text-cafe">{c.label}</p>
              </Link>
            </li>
          ))}
        </ul>
      </section>

      {/* Banner de ofertas */}
      {deal && maxDiscount !== null && (
        <section aria-label="Ofertas">
          <SectionHead title="Ofertas" href="/ofertas" />
          <Link
            href="/ofertas"
            className="relative flex min-h-44 overflow-hidden rounded-3xl bg-white text-negro shadow-[0_10px_30px_-18px_rgba(59,42,34,.45)]"
          >
            <div className="relative z-10 flex flex-1 flex-col justify-center p-6">
              <p className="text-[13px] text-dorado-texto">Lencería fabricada en Colombia</p>
              <p className="mt-2 font-display text-[32px] leading-none font-medium">
                Hasta {maxDiscount}% dcto.
              </p>
              <p className="mt-2 text-[13px] text-cafe/75">En productos seleccionados</p>
              <span className="mt-5 inline-flex h-10 w-fit items-center rounded-full bg-cafe px-5 text-[13px] font-medium text-marfil">
                Ver ofertas
              </span>
            </div>
            {deal.images[0] && (
              <div className="relative w-[42%] shrink-0 [mask-image:linear-gradient(to_right,transparent,black_65%)]">
                <Image src={deal.images[0].src} alt="" fill sizes="45vw" className="object-cover object-top" />
              </div>
            )}
          </Link>
        </section>
      )}

      {/* Favoritos */}
      {featured.length > 0 && (
        <section aria-label="Los favoritos">
          <SectionHead title="Los favoritos" href="/lenceria" />
          <ProductRow items={featured} label="Los favoritos" />
        </section>
      )}

      {/* Ropa y joyería */}
      {apparelAndJewelry.length > 0 && (
        <section aria-label="Ropa y joyería">
          <SectionHead title="Ropa y joyería" href="/ropa" />
          <ProductRow items={apparelAndJewelry} label="Ropa y joyería" />
        </section>
      )}
    </div>
  );
}
