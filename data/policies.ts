export type Policy = {
  slug: 'cambios-y-devoluciones' | 'envios' | 'privacidad' | 'terminos';
  title: string;
  /** null = [PENDIENTE: copiar el texto vigente desde la tienda actual antes de cerrar Shopify] */
  body: string | null;
};

export const policies: Policy[] = [
  { slug: 'cambios-y-devoluciones', title: 'Cambios y devoluciones', body: null },
  { slug: 'envios', title: 'Envíos', body: null },
  { slug: 'privacidad', title: 'Privacidad', body: null },
  { slug: 'terminos', title: 'Términos y condiciones', body: null },
];

export function getPolicy(slug: string): Policy | undefined {
  return policies.find((p) => p.slug === slug);
}
