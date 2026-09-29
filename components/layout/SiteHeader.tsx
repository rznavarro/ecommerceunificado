'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import clsx from 'clsx';
import { mainNav } from '@/data/categories';
import { useCart, selectCount } from '@/lib/cart-store';
import { Logo } from '@/components/ui/Logo';
import { BagIcon, SearchIcon } from '@/components/ui/Icons';
import { TopBar } from './TopBar';
import { MobileMenu } from './MobileMenu';
import { SearchModal } from './SearchModal';

const SOLID_AFTER = 80;

/**
 * Barra superior + menú, fijos arriba.
 * - Transparente sobre el hero de la portada; fondo marfil 92 % + blur tras 80 px.
 * - La barra superior se desliza fuera al empezar a bajar.
 * - Fase 2: ocultar al bajar rápido / reaparecer al subir con ScrollTrigger.
 */
export function SiteHeader() {
  const pathname = usePathname();
  const isHome = pathname === '/';
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const count = useCart(selectCount);

  useEffect(() => {
    let frame = 0;
    const update = () => {
      frame = 0;
      setScrolled(window.scrollY > SOLID_AFTER);
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', onScroll);
      if (frame) cancelAnimationFrame(frame);
    };
  }, []);

  const solid = !isHome || scrolled;

  return (
    <>
      <div
        data-site-chrome
        className={clsx(
          'fixed inset-x-0 top-0 z-40 transition-transform duration-500 ease-out will-change-transform',
          scrolled && '-translate-y-(--topbar-h)',
        )}
      >
        <TopBar />
        <header
          className={clsx(
            'h-(--header-h) border-b transition-[background-color,border-color,backdrop-filter] duration-500',
            solid
              ? 'border-linea bg-marfil/92 backdrop-blur-md supports-[not(backdrop-filter:blur(1px))]:bg-marfil'
              : 'border-transparent bg-transparent',
          )}
        >
          <div className="container-site flex h-full items-center justify-between gap-6">
            <Logo className="py-2 text-[28px] lg:text-[32px]" />

            <nav aria-label="Principal" className="hidden lg:block">
              <ul className="flex items-center gap-10">
                {mainNav.map((item) => {
                  const active = pathname === item.href || pathname.startsWith(`${item.href}/`);
                  return (
                    <li key={item.href}>
                      <Link
                        href={item.href}
                        aria-current={active ? 'page' : undefined}
                        className={clsx(
                          'label relative inline-flex min-h-11 items-center text-cafe transition-colors hover:text-negro',
                          'after:absolute after:inset-x-0 after:bottom-2.5 after:h-px after:origin-left after:bg-camel after:transition-transform after:duration-300',
                          active ? 'after:scale-x-100' : 'after:scale-x-0 hover:after:scale-x-100',
                        )}
                      >
                        {item.label}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </nav>

            <div className="flex items-center gap-1">
              <button
                type="button"
                onClick={() => setSearchOpen(true)}
                className="hidden size-11 items-center justify-center text-cafe transition-colors hover:text-negro lg:inline-flex"
                aria-label="Buscar productos"
                aria-haspopup="dialog"
              >
                <SearchIcon />
              </button>

              <Link
                href="/carrito"
                className="relative inline-flex size-11 items-center justify-center text-cafe transition-colors hover:text-negro"
                aria-label={count > 0 ? `Carrito, ${count} ${count === 1 ? 'producto' : 'productos'}` : 'Carrito vacío'}
              >
                <BagIcon />
                <span
                  aria-hidden="true"
                  className={clsx(
                    'absolute top-1.5 right-0.5 flex h-[18px] min-w-[18px] items-center justify-center rounded-full bg-cafe px-1 text-[10px] font-medium leading-none text-marfil tabular-nums transition-opacity',
                    count > 0 ? 'opacity-100' : 'opacity-0',
                  )}
                >
                  {count}
                </span>
              </Link>

              <button
                type="button"
                onClick={() => setMenuOpen(true)}
                className="label inline-flex min-h-11 items-center pl-3 text-cafe lg:hidden"
                aria-haspopup="dialog"
                aria-expanded={menuOpen}
                aria-controls="menu-movil"
              >
                Menú
              </button>
            </div>
          </div>
        </header>
      </div>

      <MobileMenu
        open={menuOpen}
        onClose={() => setMenuOpen(false)}
        onSearch={() => {
          setMenuOpen(false);
          setSearchOpen(true);
        }}
      />
      <SearchModal open={searchOpen} onClose={() => setSearchOpen(false)} />
    </>
  );
}
