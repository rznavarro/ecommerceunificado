import type { Category } from './products';
import type { EditorialId } from './images';

export type CategoryInfo = {
  id: Category;
  href: `/${Category}`;
  label: string;
  /** Etiqueta en mayúsculas del menú e índice del hero */
  menuLabel: string;
  /** Bajada de una línea (la del hero) */
  lead: string;
  /** Texto de la tarjeta de "Compra por categoría" */
  cardText: string;
  cta: string;
  headerImage: EditorialId;
  cardImage: EditorialId;
  subcategories: string[];
  seo: { title: string; description: string };
};

export const categories: Record<Category, CategoryInfo> = {
  lenceria: {
    id: 'lenceria',
    href: '/lenceria',
    label: 'Lencería',
    menuLabel: 'LENCERÍA',
    lead: 'Sostenes, bralettes, bodies y calzones de encaje fabricados en Colombia, pensados para un calce perfecto.',
    cardText: 'Sostenes, bralettes, bodies y calzones',
    cta: 'Ver lencería',
    headerImage: '04',
    cardImage: '04',
    subcategories: ['Sostenes', 'Bodies', 'Calzones'],
    seo: {
      title: 'Lencería colombiana en Chile: sostenes, bodies y calzones | Purpuratta',
      description:
        'Sostenes, bralettes, bodies y calzones de encaje fabricados en Colombia. Compra online con despacho a todo Chile.',
    },
  },
  ropa: {
    id: 'ropa',
    href: '/ropa',
    label: 'Ropa',
    menuLabel: 'ROPA',
    lead: 'Básicos y piezas atemporales para vestir con elegancia todos los días.',
    cardText: 'Prendas atemporales para todos los días',
    cta: 'Ver ropa',
    headerImage: '09',
    cardImage: '08',
    subcategories: [],
    seo: {
      title: 'Ropa atemporal para mujer | Purpuratta',
      description:
        'Básicos y piezas atemporales para vestir con elegancia todos los días. Despacho a todo Chile.',
    },
  },
  joyeria: {
    id: 'joyeria',
    href: '/joyeria',
    label: 'Joyería',
    menuLabel: 'JOYERÍA',
    lead: 'Collares, aros y accesorios con diseños exclusivos y piezas hechas a mano.',
    cardText: 'Collares, aros y accesorios con diseños exclusivos',
    cta: 'Ver joyería',
    headerImage: '13',
    cardImage: '15',
    subcategories: ['Collares', 'Aros'],
    seo: {
      title: 'Joyería y accesorios: collares y aros | Purpuratta',
      description:
        'Collares, aros y accesorios con diseños exclusivos y piezas hechas a mano. Despacho a todo Chile.',
    },
  },
};

export const categoryList: CategoryInfo[] = [categories.lenceria, categories.ropa, categories.joyeria];

/** Capítulos del hero de la portada */
export type HeroChapter = {
  index: string;
  category: Category;
  label: string;
  /** 1 foto a todo el ancho, o 2 verticales en díptico (en móvil solo la primera) */
  images: EditorialId[];
  title: string;
  text: string;
  cta: string;
  href: string;
};

export const heroChapters: HeroChapter[] = [
  {
    index: '01',
    category: 'lenceria',
    label: 'LENCERÍA',
    images: ['04'],
    title: 'Comodidad que se siente tuya',
    text: 'Sostenes, bralettes, bodies y calzones de encaje fabricados en Colombia, pensados para un calce perfecto.',
    cta: 'Ver lencería',
    href: '/lenceria',
  },
  {
    index: '02',
    category: 'ropa',
    label: 'ROPA',
    images: ['08', '09'],
    title: 'Prendas que no pasan de moda',
    text: 'Básicos y piezas atemporales para vestir con elegancia todos los días.',
    cta: 'Ver ropa',
    href: '/ropa',
  },
  {
    index: '03',
    category: 'joyeria',
    label: 'JOYERÍA',
    images: ['14'],
    title: 'El detalle que completa tu look',
    text: 'Collares, aros y accesorios con diseños exclusivos y piezas hechas a mano.',
    cta: 'Ver joyería',
    href: '/joyeria',
  },
];

/** Enlaces del menú principal */
export const mainNav = [
  { href: '/lenceria', label: 'LENCERÍA', title: 'Lencería' },
  { href: '/ropa', label: 'ROPA', title: 'Ropa' },
  { href: '/joyeria', label: 'JOYERÍA', title: 'Joyería' },
  { href: '/nosotros', label: 'NOSOTROS', title: 'Nosotros' },
] as const;

/** Beneficios (sección 5.4) */
export const benefits = [
  {
    id: 'despacho',
    title: 'Despacho a todo Chile',
    text: 'Enviamos tu pedido a cualquier región del país.',
  },
  {
    id: 'envio-gratis',
    title: 'Envío gratis sobre $100.000',
    text: 'En compras desde $100.000, el despacho corre por nuestra cuenta.',
  },
  {
    id: 'colombia',
    title: 'Lencería fabricada en Colombia',
    text: 'Encaje y microfibra con un calce pensado para el día a día.',
  },
  {
    id: 'whatsapp',
    title: 'Atención por WhatsApp',
    text: 'Te ayudamos a elegir tu talla y a cerrar tu pedido.',
  },
] as const;
