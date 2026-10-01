import { editorial, type EditorialId } from './images';

export type Category = 'lenceria' | 'ropa' | 'joyeria';
export type Metal = 'dorado' | 'plateado';

export type ProductImage = { src: string; alt: string };

export type Product = {
  slug: string;
  name: string;
  displayName: string;
  category: Category;
  subcategory?: string;
  metal?: Metal;
  /** null = "Consultar precio" */
  price: number | null;
  /** Precio habitual si hay oferta */
  compareAtPrice?: number;
  inStock: boolean;
  /** null = [PENDIENTE] */
  sizes: string[] | null;
  images: ProductImage[];
  /** null = [PENDIENTE] */
  description: string | null;
  featured?: boolean;
  /** true = nombre descriptivo, falta nombre comercial */
  provisional?: boolean;
};

/**
 * Fotos de producto de lencería: /public/images/productos/<slug>-1.webp, -2.webp...
 * El texto alternativo se arma con el nombre completo del producto.
 */
function productPhotos(slug: string, name: string, count = 1): ProductImage[] {
  return Array.from({ length: count }, (_, i) => ({
    src: `/images/productos/${slug}-${i + 1}.webp`,
    alt: name,
  }));
}

/** Usa la imagen editorial solo si el archivo ya está disponible. */
function fromEditorial(...ids: EditorialId[]): ProductImage[] {
  return ids
    .map((id) => editorial[id])
    .filter((img) => img.available)
    .map(({ src, alt }) => ({ src, alt }));
}

type LingerieSeed = Omit<Product, 'category' | 'sizes' | 'images' | 'description' | 'inStock'> & {
  inStock?: boolean;
};

/** Tallas estándar mientras no se carguen las reales por producto. */
const standardSizes = ['S', 'M', 'L', 'XL'];

/** Lencería: precios reales vigentes en purpuratta.cl. Slug = handle actual. */
const lingerieSeed: LingerieSeed[] = [
  // Calzones
  {
    slug: 'calzon-semicolaless-microfibra-encaje',
    name: 'Calzón Azul- semicolaless de microfibra y encaje – Orion',
    displayName: 'Orion · Calzón semicolaless azul',
    subcategory: 'Calzones',
    price: 14_900,
  },
  {
    slug: 'calzon-culote-microfibra-encaje',
    name: 'Calzón culotte crème pêche de microfibra y encaje – Spirale',
    displayName: 'Spirale · Culotte crème pêche',
    subcategory: 'Calzones',
    price: 14_800,
  },
  {
    slug: 'calzon-colaless-marfil-encaje-microfibra-mey',
    name: 'Calzón colaless-marfil de encaje y microfibra – Mey',
    displayName: 'Mey · Colaless marfil',
    subcategory: 'Calzones',
    price: 14_900,
    featured: true,
  },
  {
    slug: 'calzon-blanco-encaje-chelsea',
    name: 'Calzón blanco de microfibra y encaje – Chelsea',
    displayName: 'Chelsea · Calzón blanco',
    subcategory: 'Calzones',
    price: 14_900,
    featured: true,
  },
  {
    slug: 'colaless-tul-microfibra',
    name: 'Calzón colaless de tul',
    displayName: 'Colaless de tul',
    subcategory: 'Calzones',
    price: 13_000,
    compareAtPrice: 19_990,
  },
  {
    slug: 'products-calzon-clasico-encaje-negro-spirale',
    name: 'Calzón clásico-negro de encaje y microfibra – Spirale',
    displayName: 'Spirale · Clásico negro',
    subcategory: 'Calzones',
    price: 14_900,
  },
  {
    slug: 'calzon-clasico-rosa-encaje-microfibra-spirale',
    name: 'Calzón rosa de encaje y microfibra – Spirale',
    displayName: 'Spirale · Clásico rosa',
    subcategory: 'Calzones',
    price: 14_900,
  },
  {
    slug: 'calzon-cachetero-gris-encaje-suave-orion',
    name: 'Calzón semi-colaless- gris de encaje suave – Modelo Orion',
    displayName: 'Orion · Semicolaless gris',
    subcategory: 'Calzones',
    price: 14_900,
  },
  // Sostenes y bodies
  {
    slug: 'body-negro-encaje-tul',
    name: 'Body Negro de Encaje y Tul - Rouse',
    displayName: 'Rouse · Body negro',
    subcategory: 'Bodies',
    price: 45_000,
    featured: true,
  },
  {
    slug: 'sosten-nude-microfibra-varilla-breteles-removibles',
    name: 'Sostén nude de microfibra con varilla y breteles removibles – Georgia',
    displayName: 'Georgia · Sostén nude',
    subcategory: 'Sostenes',
    price: 23_000,
    compareAtPrice: 32_000,
    featured: true,
  },
  {
    slug: 'body-tul-manga-larga-con-abrochadura',
    name: 'Body Negro Tul - Cooper',
    displayName: 'Cooper · Body de tul',
    subcategory: 'Bodies',
    price: 45_000,
    inStock: false,
  },
  {
    slug: 'sosten-microfibra-encaje-cargaderas',
    name: 'Sostén Top microfibra y encaje - Volé',
    displayName: 'Volé · Top de encaje',
    subcategory: 'Sostenes',
    price: 17_000,
    compareAtPrice: 29_000,
    featured: true,
  },
  {
    slug: 'sosten-blanco-sin-aro-dali',
    name: 'Sostén blanco – Microfibra suave y soporte cómodo - Dalí.',
    displayName: 'Dalí · Sostén blanco',
    subcategory: 'Sostenes',
    price: 17_000,
    compareAtPrice: 29_000,
    featured: true,
  },
  {
    slug: 'sosten-tul-semitransparente-con-varilla',
    name: 'Sostén tul semitransparencia Negro- Houston',
    displayName: 'Houston · Sostén de tul negro',
    subcategory: 'Sostenes',
    price: 27_000,
    compareAtPrice: 32_000,
    featured: true,
  },
  {
    slug: 'top-tul-sin-varilla-copa-microfibra',
    name: 'Sostén Top Triangulo Tul- Sugar',
    displayName: 'Sugar · Top triángulo',
    subcategory: 'Sostenes',
    price: 29_000,
  },
  {
    slug: 'sosten-encaje-rosa-con-varilla',
    name: 'Sostén Rosa encaje-Xana',
    displayName: 'Xana · Sostén rosa',
    subcategory: 'Sostenes',
    price: 23_800,
    compareAtPrice: 34_000,
    featured: true,
  },
];

const lingerie: Product[] = lingerieSeed.map((p) => ({
  ...p,
  category: 'lenceria',
  inStock: p.inStock ?? true,
  sizes: standardSizes, // [PENDIENTE: confirmar tallas reales]
  images: productPhotos(p.slug, p.name),
  description: null, // [PENDIENTE: descripción]
}));

/**
 * Ropa y joyería: provisional (nombre descriptivo hasta tener el nombre
 * comercial), sin precio (price: null = "Consultar precio").
 * [PENDIENTE: tallas, precios, stock y descripciones]
 */
const apparel: Product[] = [
  {
    slug: 'abrigo-largo-negro',
    name: 'Abrigo largo negro',
    displayName: 'Abrigo largo negro',
    category: 'ropa',
    price: null,
    inStock: true,
    sizes: standardSizes,
    images: fromEditorial('06'),
    description: null,
    provisional: true,
  },
  {
    slug: 'abrigo-camel',
    name: 'Abrigo camel',
    displayName: 'Abrigo camel',
    category: 'ropa',
    price: null,
    inStock: true,
    sizes: standardSizes,
    images: fromEditorial('07'),
    description: null,
    provisional: true,
  },
  {
    slug: 'pantalon-crema-pierna-ancha',
    name: 'Pantalón crema de pierna ancha',
    displayName: 'Pantalón crema de pierna ancha',
    category: 'ropa',
    price: null,
    inStock: true,
    sizes: standardSizes,
    images: fromEditorial('08'),
    description: null,
    provisional: true,
  },
  {
    slug: 'pantalon-cafe-tiro-alto',
    name: 'Pantalón café de tiro alto',
    displayName: 'Pantalón café de tiro alto',
    category: 'ropa',
    price: null,
    inStock: true,
    sizes: standardSizes,
    images: fromEditorial('09'),
    description: null,
    provisional: true,
  },
  {
    slug: 'vestido-blanco-halter',
    name: 'Vestido blanco halter',
    displayName: 'Vestido blanco halter',
    category: 'ropa',
    price: null,
    inStock: true,
    sizes: standardSizes,
    images: fromEditorial('10'),
    description: null,
    provisional: true,
  },
];

const jewelry: Product[] = [
  {
    slug: 'collar-medalla-virgen-circones',
    name: 'Collar dorado medalla de la Virgen con circones',
    displayName: 'Collar medalla de la Virgen',
    category: 'joyeria',
    subcategory: 'Collares',
    metal: 'dorado',
    price: null,
    inStock: true,
    sizes: null,
    images: fromEditorial('11'),
    description: null,
    provisional: true,
  },
  {
    slug: 'aros-mostacillas-verde-dorado',
    name: 'Aros tejidos a mano de mostacillas verdes y doradas',
    displayName: 'Aros de mostacillas verdes y doradas',
    category: 'joyeria',
    subcategory: 'Aros',
    metal: 'dorado',
    price: null,
    inStock: true,
    sizes: null,
    images: fromEditorial('12'),
    description: 'Hechos a mano.',
    provisional: true,
  },
  {
    slug: 'collar-brillantes-hojas-gota',
    name: 'Collar de brillantes en forma de hojas con gota',
    displayName: 'Collar de hojas con gota',
    category: 'joyeria',
    subcategory: 'Collares',
    metal: 'plateado',
    price: null,
    inStock: true,
    sizes: null,
    images: fromEditorial('13'),
    description: null,
    provisional: true,
  },
  {
    slug: 'collar-perlas-tres-vueltas',
    name: 'Collar de perlas de tres vueltas',
    displayName: 'Collar de perlas de tres vueltas',
    category: 'joyeria',
    subcategory: 'Collares',
    price: null,
    inStock: true,
    sizes: null,
    images: fromEditorial('14'),
    description: null,
    provisional: true,
  },
  {
    slug: 'gargantilla-perlas-cristales',
    name: 'Gargantilla de perlas y cristales con colgante floral',
    displayName: 'Gargantilla de perlas y cristales',
    category: 'joyeria',
    subcategory: 'Collares',
    metal: 'dorado',
    price: null,
    inStock: true,
    sizes: null,
    images: fromEditorial('15'),
    description: null,
    provisional: true,
  },
];

export const products: Product[] = [...lingerie, ...apparel, ...jewelry];

/** Orden fijo de la sección Destacados de la portada. */
export const featuredOrder = [
  'sosten-nude-microfibra-varilla-breteles-removibles', // Georgia
  'sosten-encaje-rosa-con-varilla', // Xana
  'sosten-microfibra-encaje-cargaderas', // Volé
  'sosten-blanco-sin-aro-dali', // Dalí
  'sosten-tul-semitransparente-con-varilla', // Houston
  'body-negro-encaje-tul', // Rouse
  'calzon-colaless-marfil-encaje-microfibra-mey', // Mey
  'calzon-blanco-encaje-chelsea', // Chelsea
] as const;

export function getProduct(slug: string): Product | undefined {
  return products.find((p) => p.slug === slug);
}

export function getProductsByCategory(category: Category): Product[] {
  return products.filter((p) => p.category === category);
}

/** Destacados de portada: featured, en stock y con precio (nunca agotados). */
export function getFeatured(): Product[] {
  return featuredOrder
    .map((slug) => getProduct(slug))
    .filter((p): p is Product => !!p && !!p.featured && p.inStock && p.price !== null);
}

/** Productos de la misma categoría: primero con foto y en stock. */
export function getRelated(product: Product, n = 4): Product[] {
  const score = (p: Product) => (p.images.length > 0 ? 2 : 0) + (p.inStock ? 1 : 0);
  return products
    .filter((p) => p.category === product.category && p.slug !== product.slug)
    .sort((a, b) => score(b) - score(a))
    .slice(0, n);
}

/** Porcentaje de descuento redondeado, o null si no hay oferta. */
export function discountPercent(p: Product): number | null {
  if (!isOnSale(p)) return null;
  return Math.round((1 - p.price! / p.compareAtPrice!) * 100);
}

export function isOnSale(p: Product): boolean {
  return p.price !== null && p.compareAtPrice !== undefined && p.compareAtPrice > p.price;
}
