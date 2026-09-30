import type { EditorialId } from './images';

export type LookGroup = {
  title: 'Lo que va debajo' | 'Lo que se ve' | 'El detalle final';
  slugs: string[];
};

export type Look = {
  id: string;
  name: string;
  image: EditorialId;
  /** Punto interactivo sobre la foto, en % del contenedor. [PENDIENTE: ajustar con la foto final] */
  hotspot: { slug: string; x: number; y: number };
  groups: LookGroup[];
};

export const looks: Look[] = [
  {
    id: 'blanco-total',
    name: 'Blanco total',
    image: '10',
    hotspot: { slug: 'vestido-blanco-halter', x: 50, y: 55 },
    groups: [
      {
        title: 'Lo que va debajo',
        slugs: ['sosten-blanco-sin-aro-dali', 'calzon-blanco-encaje-chelsea'],
      },
      { title: 'Lo que se ve', slugs: ['vestido-blanco-halter'] },
      { title: 'El detalle final', slugs: ['gargantilla-perlas-cristales'] },
    ],
  },
];

/**
 * Vitrina "Explora la colección": cada imagen enlaza a un producto o a su
 * categoría. La imagen 03 nunca va aquí (solo ficha de producto).
 */
export type ShowcaseItem = {
  image: EditorialId;
  /** Producto al que enlaza (lightbox con precio y botón de compra) */
  productSlug?: string;
  /** Si no hay producto asociado, enlace a la categoría */
  href?: string;
};

export const showcase: ShowcaseItem[] = [
  { image: '01', href: '/lenceria?sub=bodies' },
  { image: '02', href: '/lenceria?sub=bodies' },
  { image: '05', href: '/lenceria' },
  { image: '06', productSlug: 'abrigo-largo-negro' },
  { image: '14', productSlug: 'collar-perlas-tres-vueltas' },
  { image: '08', productSlug: 'pantalon-crema-pierna-ancha' },
  { image: '11', productSlug: 'collar-medalla-virgen-circones' },
  { image: '09', productSlug: 'pantalon-cafe-tiro-alto' },
  { image: '07', productSlug: 'abrigo-camel' },
  { image: '12', productSlug: 'aros-mostacillas-verde-dorado' },
  { image: '13', productSlug: 'collar-brillantes-hojas-gota' },
  { image: '15', productSlug: 'gargantilla-perlas-cristales' },
];
