'use client';

import { useEffect } from 'react';
import { useCart } from '@/lib/cart-store';

/** Rehidrata el carrito desde localStorage después de montar (evita desajustes SSR). */
export function CartHydrator() {
  useEffect(() => {
    void useCart.persist.rehydrate();
  }, []);
  return null;
}
