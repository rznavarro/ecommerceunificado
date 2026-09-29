import { buildOrderMessage, waUrl } from '../whatsapp';
import type { PaymentProvider } from './types';

export const whatsAppProvider: PaymentProvider = {
  id: 'whatsapp',
  label: 'Enviar pedido por WhatsApp',
  async createCheckout(order) {
    return { redirectUrl: waUrl(buildOrderMessage(order)) };
  },
};
