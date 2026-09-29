import type { PaymentProvider } from './types';
import { whatsAppProvider } from './whatsapp-provider';

export type { PaymentProvider } from './types';

/** Proveedor activo. Cambiar aquí al sumar una pasarela. */
export const activePaymentProvider: PaymentProvider = whatsAppProvider;
