/**
 * Datos del negocio: única fuente de verdad.
 * Todo el sitio (textos, enlaces y JSON-LD) lee desde aquí.
 */
export const site = {
  name: 'Purpuratta',
  descriptor: 'Lencería, ropa y joyería en un solo lugar.',
  tagline: 'Todo lo que te hace sentir bien, en un solo lugar.',
  url: 'https://purpuratta.cl',
  locale: 'es_CL',

  whatsapp: {
    display: '+56 9 7716 2249',
    e164: '+56977162249',
    /** Solo dígitos, formato que usa wa.me */
    digits: '56977162249',
  },

  location: {
    locality: 'Providencia',
    region: 'Región Metropolitana',
    country: 'CL',
    countryName: 'Chile',
    /** [PENDIENTE: dirección exacta] */
    streetAddress: null as string | null,
  },

  shipping: {
    area: 'todo Chile',
    freeShippingThreshold: 100_000,
    /** [PENDIENTE: tarifas de envío] */
    rates: null as string | null,
  },

  social: {
    /** [PENDIENTE: Instagram oficial] */
    instagram: null as string | null,
  },

  currency: 'CLP',

  /** Párrafo de identidad citable (GEO). */
  identity:
    'Purpuratta es una tienda online chilena que reúne lencería fabricada en Colombia, ropa atemporal y joyería con diseños exclusivos. Despacha a todo Chile y ofrece envío gratis en compras desde $100.000.',

  topBar: 'Envío gratis por compras sobre $100.000 · Despacho a todo Chile',

  whatsappMessages: {
    general: 'Hola Purpuratta, quiero ayuda con una compra.',
    product: (displayName: string) => `Hola Purpuratta, quiero consultar por: ${displayName}`,
  },
} as const;

export type Site = typeof site;
