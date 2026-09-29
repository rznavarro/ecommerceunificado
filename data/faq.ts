export type Faq = {
  id: string;
  question: string;
  /** null = [PENDIENTE] */
  answer: string | null;
  /** Solo se publican las preguntas con `published: true` y respuesta. */
  published: boolean;
  pendingNote?: string;
};

export const faqs: Faq[] = [
  {
    id: 'envios-chile',
    question: '¿Hacen envíos a todo Chile?',
    answer: 'Sí. Despachamos a todas las regiones de Chile.',
    published: true,
  },
  {
    id: 'envio-gratis',
    question: '¿Cuándo el envío es gratis?',
    answer: 'El envío es gratis en compras desde $100.000.',
    published: true,
  },
  {
    id: 'fabricacion',
    question: '¿Dónde se fabrica la lencería?',
    answer: 'Nuestra lencería se fabrica en Colombia.',
    published: true,
  },
  {
    id: 'pedido',
    question: '¿Cómo hago mi pedido?',
    answer:
      'Agrega tus productos al carrito, completa tus datos y envía tu pedido por WhatsApp. Ahí confirmamos stock, despacho y pago.',
    published: true,
  },
  {
    id: 'talla',
    question: '¿Cómo elijo mi talla?',
    answer: 'Revisa nuestra guía de tallas o escríbenos por WhatsApp y te ayudamos a elegir.',
    published: true,
    pendingNote: '[PENDIENTE: contenido de la guía de tallas]',
  },
  {
    id: 'cambios',
    question: '¿Puedo cambiar un producto?',
    answer: null,
    published: false,
    pendingNote: '[PENDIENTE: texto de la política de cambios vigente]',
  },
  {
    id: 'pagos',
    question: '¿Qué medios de pago aceptan?',
    answer: null,
    published: false,
    pendingNote: '[PENDIENTE: medios de pago]',
  },
  {
    id: 'plazos',
    question: '¿Cuánto demora el despacho?',
    answer: null,
    published: false,
    pendingNote: '[PENDIENTE: plazos de despacho]',
  },
];

export type PublishedFaq = Faq & { answer: string };

export function getPublishedFaqs(): PublishedFaq[] {
  return faqs.filter((f): f is PublishedFaq => f.published && f.answer !== null);
}
