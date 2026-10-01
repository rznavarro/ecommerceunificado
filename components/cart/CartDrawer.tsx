'use client';

import Link from 'next/link';
import { useRef } from 'react';
import clsx from 'clsx';
import { useCart, selectCount, selectSubtotal } from '@/lib/cart-store';
import { useDialog } from '@/lib/hooks/useDialog';
import { formatCLP } from '@/lib/format';
import { CloseIcon } from '@/components/ui/Icons';
import { CartLines, FreeShippingProgress } from './CartLines';

/** Panel lateral del carrito; se abre al añadir un producto o al tocar la bolsa. */
export function CartDrawer() {
  const isOpen = useCart((s) => s.isOpen);
  const close = useCart((s) => s.close);
  const count = useCart(selectCount);
  const subtotal = useCart(selectSubtotal);
  const hasPending = useCart((s) => s.lines.some((l) => l.unitPrice === null));
  const ref = useRef<HTMLDivElement>(null);
  useDialog(isOpen, close, ref);

  return (
    <div hidden={!isOpen} className="fixed inset-0 z-60">
      <div aria-hidden="true" className="absolute inset-0 animate-[fade-in_.3s_ease-out] bg-negro/35" onClick={close} />
      <div
        ref={ref}
        role="dialog"
        aria-modal="true"
        aria-label="Carrito"
        className={clsx(
          'absolute inset-y-0 right-0 flex w-full max-w-md flex-col bg-marfil shadow-2xl',
          isOpen && 'animate-[drawer-in_.4s_cubic-bezier(.2,.8,.2,1)]',
        )}
      >
        <div className="flex h-(--header-h) shrink-0 items-center justify-between border-b border-linea px-6">
          <p className="font-display text-[26px] font-medium text-negro">
            Tu carrito <span className="text-[18px] text-cafe/70">({count})</span>
          </p>
          <button
            type="button"
            onClick={close}
            className="-mr-2 inline-flex size-11 items-center justify-center text-cafe hover:text-negro"
            aria-label="Cerrar carrito"
            data-autofocus
          >
            <CloseIcon />
          </button>
        </div>

        {count === 0 ? (
          <div className="flex flex-1 flex-col items-center justify-center gap-6 px-6 text-center">
            <p className="font-display text-[26px] text-negro">Tu carrito está vacío</p>
            <Link href="/lenceria" onClick={close} className="btn-primary">
              Ver lencería
            </Link>
          </div>
        ) : (
          <>
            <div className="border-b border-linea px-6 py-4">
              <FreeShippingProgress />
            </div>
            <div className="flex-1 overflow-y-auto px-6">
              <CartLines onNavigate={close} compact />
            </div>
            <div className="border-t border-linea px-6 pt-5 pb-[calc(20px+var(--mobile-nav-h,0px)+env(safe-area-inset-bottom))]">
              <div className="flex items-baseline justify-between">
                <span className="label text-cafe">Subtotal</span>
                <span className="text-[18px] font-medium text-negro tabular-nums">{formatCLP(subtotal)}</span>
              </div>
              {hasPending && (
                <p className="mt-1 text-[13px] text-cafe/75">Hay productos con precio a confirmar por WhatsApp.</p>
              )}
              <Link href="/carrito" onClick={close} className="btn-primary mt-5 w-full">
                Finalizar pedido
              </Link>
              <button type="button" onClick={close} className="label mt-3 min-h-11 w-full text-cafe hover:text-negro">
                Seguir comprando
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
