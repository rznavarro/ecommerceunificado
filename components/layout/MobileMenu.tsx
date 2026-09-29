'use client';

import Link from 'next/link';
import { useRef } from 'react';
import clsx from 'clsx';
import { mainNav } from '@/data/categories';
import { site } from '@/data/site';
import { useDialog } from '@/lib/hooks/useDialog';
import { waGeneralUrl } from '@/lib/whatsapp';
import { CloseIcon, SearchIcon } from '@/components/ui/Icons';
import { Logo } from '@/components/ui/Logo';

type Props = { open: boolean; onClose: () => void; onSearch: () => void };

/** Panel a pantalla completa (< 1024 px). */
export function MobileMenu({ open, onClose, onSearch }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  useDialog(open, onClose, ref);

  return (
    <div
      ref={ref}
      id="menu-movil"
      role="dialog"
      aria-modal="true"
      aria-label="Menú"
      hidden={!open}
      className={clsx('fixed inset-0 z-60 flex flex-col bg-marfil lg:hidden', open && 'animate-[float-in_.35s_ease-out]')}
    >
      <div className="container-site flex h-(--header-h) shrink-0 items-center justify-between border-b border-linea">
        <Logo className="py-2 text-[28px]" />
        <button
          type="button"
          onClick={onClose}
          className="inline-flex size-11 items-center justify-center text-cafe"
          aria-label="Cerrar menú"
          data-autofocus
        >
          <CloseIcon />
        </button>
      </div>

      <nav aria-label="Principal" className="container-site flex-1 overflow-y-auto py-10">
        <ul className="space-y-2">
          {mainNav.map((item) => (
            <li key={item.href}>
              <Link
                href={item.href}
                onClick={onClose}
                className="block py-1 font-display text-[40px] font-medium leading-tight text-negro"
              >
                {item.title}
              </Link>
            </li>
          ))}
        </ul>

        <button
          type="button"
          onClick={onSearch}
          className="label mt-10 inline-flex min-h-11 items-center gap-3 text-cafe"
        >
          <SearchIcon size={18} /> Buscar
        </button>
      </nav>

      <div className="container-site border-t border-linea py-6 pb-[max(24px,env(safe-area-inset-bottom))]">
        <a href={waGeneralUrl()} target="_blank" rel="noopener noreferrer" className="btn-glass w-full">
          Escríbenos · {site.whatsapp.display}
        </a>
      </div>
    </div>
  );
}
