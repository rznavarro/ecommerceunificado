import type { Order } from '../order';

/**
 * Interfaz común para cerrar un pedido. Hoy: WhatsApp.
 * Para sumar Webpay o Mercado Pago, crear otra implementación
 * (ver README) sin tocar el carrito.
 */
export interface PaymentProvider {
  id: string;
  label: string;
  createCheckout(order: Order): Promise<{ redirectUrl: string }>;
}
