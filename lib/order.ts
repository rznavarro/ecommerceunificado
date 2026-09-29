import { site } from '@/data/site';
import type { CartLine } from './cart-store';

export type Customer = {
  name: string;
  phone: string;
  region: string;
  commune: string;
  address: string;
  notes?: string;
};

export type Order = {
  id: string;
  createdAt: string;
  lines: CartLine[];
  subtotal: number;
  freeShipping: boolean;
  customer: Customer;
};

/** ID de pedido: PTT-AAAAMMDD-XXXX */
export function generateOrderId(date = new Date()): string {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, '0');
  const d = String(date.getDate()).padStart(2, '0');
  const alphabet = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
  const bytes = new Uint8Array(4);
  crypto.getRandomValues(bytes);
  const suffix = Array.from(bytes, (b) => alphabet[b % alphabet.length]).join('');
  return `PTT-${y}${m}${d}-${suffix}`;
}

export function subtotalOf(lines: CartLine[]): number {
  return lines.reduce((sum, l) => (l.unitPrice === null ? sum : sum + l.unitPrice * l.quantity), 0);
}

export function qualifiesForFreeShipping(subtotal: number): boolean {
  return subtotal >= site.shipping.freeShippingThreshold;
}

export function createOrder(lines: CartLine[], customer: Customer): Order {
  const subtotal = subtotalOf(lines);
  return {
    id: generateOrderId(),
    createdAt: new Date().toISOString(),
    lines,
    subtotal,
    freeShipping: qualifiesForFreeShipping(subtotal),
    customer,
  };
}
