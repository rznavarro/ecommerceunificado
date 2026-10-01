'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import clsx from 'clsx';
import { mainNav } from '@/data/categories';
import { useCart, selectCount } from '@/lib/cart-store';
import { useUI } from '@/lib/ui-store';
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
 * - Móvil (< 1024 px): logo + carrito en píldora; la navegación va en la barra inferior (MobileNav).
 */
export function SiteHeader() {
  const pathname = usePathname();
  const isHome = pathname === '/';
  const [scrolled, setScrolled] = useState(false);
  const { menuOpen, searchOpen, openSearch, closeSearch, closeMenu } = useUI();
  const count = useCart(selectCount);
  const openCart = useCart((s) => s.open);

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
            <Logo className="py-2" />

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
                onClick={openSearch}
                className="hidden size-11 items-center justify-center text-cafe transition-colors hover:text-negro lg:inline-flex"
                aria-label="Buscar productos"
                aria-haspopup="dialog"
              >
                <SearchIcon />
              </button>

              {/* Móvil: carrito en píldora */}
              <Link
                href="/carrito"
                onClick={(e) => {
                  if (pathname === '/carrito' || e.metaKey || e.ctrlKey || e.shiftKey) return;
                  e.preventDefault();
                  openCart();
                }}
                aria-haspopup="dialog"
                className="inline-flex h-10 items-center gap-2 rounded-full bg-cafe px-4 text-[14px] font-medium text-marfil tabular-nums lg:hidden"
                aria-label={count > 0 ? `Carrito, ${count} ${count === 1 ? 'producto' : 'productos'}` : 'Carrito vacío'}
              >
                <BagIcon size={18} />
                {count}
              </Link>

              <Link
                href="/carrito"
                onClick={(e) => {
                  if (pathname === '/carrito' || e.metaKey || e.ctrlKey || e.shiftKey) return;
                  e.preventDefault();
                  openCart();
                }}
                aria-haspopup="dialog"
                className="relative hidden size-11 items-center justify-center text-cafe transition-colors hover:text-negro lg:inline-flex"
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
            </div>
          </div>
        </header>
      </div>

      <MobileMenu
        open={menuOpen}
        onClose={closeMenu}
        onSearch={openSearch}
      />
      <SearchModal open={searchOpen} onClose={closeSearch} />
    </>
  );
}
