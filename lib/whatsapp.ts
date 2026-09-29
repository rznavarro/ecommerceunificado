import { site } from '@/data/site';
import { formatCLP } from './format';
import type { Order } from './order';

/** Enlace wa.me con texto codificado. */
export function waUrl(text?: string): string {
  const base = `https://wa.me/${site.whatsapp.digits}`;
  return text ? `${base}?text=${encodeURIComponent(text)}` : base;
}

export const waGeneralUrl = () => waUrl(site.whatsappMessages.general);
export const waProductUrl = (displayName: string) => waUrl(site.whatsappMessages.product(displayName));

/** Mensaje del pedido (formato de la sección 4 del brief). */
export function buildOrderMessage(order: Order): string {
  const lines: string[] = [`Hola Purpuratta, quiero hacer este pedido (${order.id}):`];

  for (const line of order.lines) {
    if (line.unitPrice === null) {
      const size = line.size ? ` · Talla ${line.size}` : '';
      const qty = line.quantity > 1 ? ` · Cantidad ${line.quantity}` : '';
      lines.push(`- ${line.displayName}${size}${qty} · Precio a confirmar`);
    } else {
      const size = line.size ? ` · Talla ${line.size}` : ' · Talla a confirmar';
      lines.push(
        `- ${line.displayName}${size} · Cantidad ${line.quantity} · ${formatCLP(line.unitPrice * line.quantity)}`,
      );
    }
  }

  lines.push('');
  lines.push(`Subtotal: ${formatCLP(order.subtotal)}`);
  lines.push(`Envío: ${order.freeShipping ? 'gratis' : 'a confirmar'}`);
  lines.push('');
  lines.push(`Nombre: ${order.customer.name}`);
  lines.push(`Teléfono: ${order.customer.phone}`);
  lines.push(`Región: ${order.customer.region}`);
  lines.push(`Comuna: ${order.customer.commune}`);
  lines.push(`Dirección: ${order.customer.address}`);
  if (order.customer.notes) lines.push(`Notas: ${order.customer.notes}`);

  return lines.join('\n');
}
