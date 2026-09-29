'use client';

import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';
import { subtotalOf } from './order';

export type CartLine = {
  slug: string;
  displayName: string;
  /** null = sin talla elegida (tallas pendientes o producto sin talla) */
  size: string | null;
  quantity: number;
  /** null = "Precio a confirmar" (se añade como consulta) */
  unitPrice: number | null;
};

type CartState = {
  lines: CartLine[];
  /** Panel lateral (no se persiste) */
  isOpen: boolean;
  add: (line: Omit<CartLine, 'quantity'> & { quantity?: number }, options?: { open?: boolean }) => void;
  addMany: (lines: Array<Omit<CartLine, 'quantity'> & { quantity?: number }>) => void;
  setQuantity: (slug: string, size: string | null, quantity: number) => void;
  remove: (slug: string, size: string | null) => void;
  clear: () => void;
  open: () => void;
  close: () => void;
};

const MAX_QTY = 20;
const sameLine = (a: Pick<CartLine, 'slug' | 'size'>, slug: string, size: string | null) =>
  a.slug === slug && a.size === size;

function merge(lines: CartLine[], incoming: Omit<CartLine, 'quantity'> & { quantity?: number }): CartLine[] {
  const qty = Math.max(1, incoming.quantity ?? 1);
  const existing = lines.find((l) => sameLine(l, incoming.slug, incoming.size));
  if (existing) {
    return lines.map((l) =>
      sameLine(l, incoming.slug, incoming.size) ? { ...l, quantity: Math.min(MAX_QTY, l.quantity + qty) } : l,
    );
  }
  return [...lines, { ...incoming, quantity: Math.min(MAX_QTY, qty) }];
}

export const useCart = create<CartState>()(
  persist(
    (set) => ({
      lines: [],
      isOpen: false,
      add: (line, options) =>
        set((s) => ({ lines: merge(s.lines, line), isOpen: options?.open ?? true })),
      addMany: (incoming) =>
        set((s) => ({ lines: incoming.reduce(merge, s.lines), isOpen: true })),
      setQuantity: (slug, size, quantity) =>
        set((s) => ({
          lines:
            quantity <= 0
              ? s.lines.filter((l) => !sameLine(l, slug, size))
              : s.lines.map((l) =>
                  sameLine(l, slug, size) ? { ...l, quantity: Math.min(MAX_QTY, quantity) } : l,
                ),
        })),
      remove: (slug, size) => set((s) => ({ lines: s.lines.filter((l) => !sameLine(l, slug, size)) })),
      clear: () => set({ lines: [] }),
      open: () => set({ isOpen: true }),
      close: () => set({ isOpen: false }),
    }),
    {
      name: 'purpuratta-cart',
      version: 1,
      storage: createJSONStorage(() => localStorage),
      partialize: (s) => ({ lines: s.lines }),
      // Se rehidrata en <CartHydrator /> tras montar, para no romper la hidratación SSR.
      skipHydration: true,
    },
  ),
);

export const selectCount = (s: CartState) => s.lines.reduce((n, l) => n + l.quantity, 0);
export const selectSubtotal = (s: CartState) => subtotalOf(s.lines);
