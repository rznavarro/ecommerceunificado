'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import clsx from 'clsx';
import { useCart, selectCount } from '@/lib/cart-store';
import { useUI } from '@/lib/ui-store';
import { useFavoriteSlugs } from '@/lib/hooks/useFavorites';
import { BagIcon, GridIcon, HeartIcon, HomeIcon } from '@/components/ui/Icons';

const itemClass =
  'relative inline-flex h-12 min-w-14 flex-col items-center justify-center rounded-full px-5 text-cafe transition-colors';
const activeClass = 'bg-cafe text-marfil';

/** Barra de navegación inferior estilo app (< 1024 px). */
export function MobileNav() {
  const pathname = usePathname();
  const menuOpen = useUI((s) => s.menuOpen);
  const openMenu = useUI((s) => s.openMenu);
  const closeMenu = useUI((s) => s.closeMenu);
  const count = useCart(selectCount);
  const cartOpen = useCart((s) => s.isOpen);
  const openCart = useCart((s) => s.open);
  const favCount = useFavoriteSlugs().length;

  const isHome = pathname === '/' && !menuOpen && !cartOpen;
  const isFav = pathname === '/favoritos' && !menuOpen && !cartOpen;

  return (
    <nav
      aria-label="Navegación inferior"
      className="fixed inset-x-0 bottom-0 z-[65] border-t border-linea bg-marfil/95 pb-[env(safe-area-inset-bottom)] backdrop-blur-md lg:hidden"
    >
      <ul className="mx-auto flex h-(--mobile-nav-h) max-w-md items-center justify-around px-4">
        <li>
          <Link href="/" onClick={closeMenu} aria-label="Inicio" aria-current={isHome ? 'page' : undefined} className={clsx(itemClass, isHome && activeClass)}>
            <HomeIcon size={22} />
          </Link>
        </li>
        <li>
          <button
            type="button"
            onClick={menuOpen ? closeMenu : openMenu}
            aria-label="Tienda: categorías"
            aria-expanded={menuOpen}
            aria-controls="menu-movil"
            className={clsx(itemClass, menuOpen && activeClass)}
          >
            <GridIcon size={22} />
          </button>
        </li>
        <li>
          <Link
            href="/favoritos"
            onClick={closeMenu}
            aria-label={`Favoritos${favCount ? `, ${favCount}` : ''}`}
            aria-current={isFav ? 'page' : undefined}
            className={clsx(itemClass, isFav && activeClass)}
          >
            <HeartIcon size={22} filled={isFav} />
          </Link>
        </li>
        <li>
          <button
            type="button"
            onClick={() => {
              closeMenu();
              openCart();
            }}
            aria-label={count > 0 ? `Carrito, ${count} ${count === 1 ? 'producto' : 'productos'}` : 'Carrito vacío'}
            aria-haspopup="dialog"
            className={clsx(itemClass, cartOpen && activeClass)}
          >
            <BagIcon size={22} />
            {count > 0 && (
              <span
                aria-hidden="true"
                className="absolute top-1.5 right-3 flex h-4 min-w-4 items-center justify-center rounded-full bg-ciruela px-1 text-[10px] leading-none font-medium text-marfil tabular-nums"
              >
                {count}
              </span>
            )}
          </button>
        </li>
      </ul>
    </nav>
  );
}
