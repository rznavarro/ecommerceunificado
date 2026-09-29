/**
 * Imágenes editoriales (public/images/editorial/, WebP, verticales).
 *
 * `available: false` = el archivo aún no está en el repositorio
 * [PENDIENTE: el cliente entregará la carpeta completa]. Mientras sea false,
 * ningún componente la usa (se muestra el fallback crema con el nombre).
 * Al subir el archivo, basta con cambiar `available` a true.
 */
export type EditorialId =
  | '01'
  | '02'
  | '03'
  | '04'
  | '05'
  | '06'
  | '07'
  | '08'
  | '09'
  | '10'
  | '11'
  | '12'
  | '13'
  | '14'
  | '15';

export type EditorialImage = {
  id: EditorialId;
  src: string;
  alt: string;
  width: number;
  height: number;
  available: boolean;
  /** object-position sugerido (hero y recortes) */
  position?: string;
  /** Uso restringido: solo ficha de producto */
  productOnly?: boolean;
  note?: string;
};

const base = '/images/editorial/';

export const editorial: Record<EditorialId, EditorialImage> = {
  '01': {
    id: '01',
    src: `${base}01-body-encaje-sillon.webp`,
    alt: 'Mujer sonriendo con un body negro de encaje sentada en un sillón de cuero',
    width: 1200,
    height: 1600,
    available: false,
    note: 'Foto oscura: solo en Nosotros y vitrina, con leve corrección cálida.',
  },
  '02': {
    id: '02',
    src: `${base}02-body-manga-tul.webp`,
    alt: 'Body negro de manga larga con escote en V, mangas de tul y encaje',
    width: 1200,
    height: 1600,
    available: false,
  },
  '03': {
    id: '03',
    src: `${base}03-body-tul-transparente.webp`,
    alt: 'Body negro de tul semitransparente de manga larga',
    width: 1200,
    height: 1600,
    available: false,
    productOnly: true,
    note: 'SOLO ficha de producto; nunca portada, vitrina ni redes.',
  },
  '04': {
    id: '04',
    src: `${base}04-conjunto-nude-blanco.webp`,
    alt: 'Conjunto de lencería nude y blanco en tonos cálidos',
    width: 1200,
    height: 1600,
    available: false,
  },
  '05': {
    id: '05',
    src: `${base}05-conjunto-blanco.webp`,
    alt: 'Conjunto blanco de top y calzón suave',
    width: 448,
    height: 682,
    available: true,
    note: '[PENDIENTE: versión de al menos 1200 px de ancho]',
  },
  '06': {
    id: '06',
    src: `${base}06-abrigo-negro-calle.webp`,
    alt: 'Mujer con abrigo largo negro, cuello alto y pantalón crema de pierna ancha caminando por la ciudad',
    width: 736,
    height: 955,
    available: true,
    position: '60% 40%',
    note: 'Recortada sin letreros de locales. [PENDIENTE: versión de al menos 1200 px]',
  },
  '07': {
    id: '07',
    src: `${base}07-abrigo-camel.webp`,
    alt: 'Mujer con abrigo camel sobre los hombros, top crema y pantalón blanco de pierna ancha frente a una puerta de madera',
    width: 474,
    height: 842,
    available: true,
    position: '50% 35%',
    note: '[PENDIENTE: versión de 2000 px para el hero]',
  },
  '08': {
    id: '08',
    src: `${base}08-cuello-alto-pantalon-crema.webp`,
    alt: 'Mujer con polera negra de cuello alto y pantalón crema de pierna ancha',
    width: 1200,
    height: 1600,
    available: false,
  },
  '09': {
    id: '09',
    src: `${base}09-blusa-blanca-pantalon-cafe.webp`,
    alt: 'Mujer caminando con blusa blanca y pantalón café de corte alto',
    width: 1200,
    height: 1600,
    available: false,
  },
  '10': {
    id: '10',
    src: `${base}10-vestido-blanco-perlas.webp`,
    alt: 'Mujer con vestido blanco ajustado, sombrero de ala ancha y collar de perlas',
    width: 1200,
    height: 1600,
    available: false,
    note: 'Recortar sin la cartera.',
  },
  '11': {
    id: '11',
    src: `${base}11-collar-virgen.webp`,
    alt: 'Collar dorado con medalla de la Virgen rodeada de circones',
    width: 827,
    height: 867,
    available: true,
    note: '[PENDIENTE: versión de al menos 1200 px]',
  },
  '12': {
    id: '12',
    src: `${base}12-aros-mostacillas.webp`,
    alt: 'Aros redondos tejidos a mano con mostacillas verdes y doradas',
    width: 870,
    height: 832,
    available: true,
    note: 'Borde superior recortado. [PENDIENTE: versión de al menos 1200 px]',
  },
  '13': {
    id: '13',
    src: `${base}13-collar-hojas.webp`,
    alt: 'Collar plateado de brillantes en forma de hojas con una gota central, sobre tela de satín marfil',
    width: 1200,
    height: 1600,
    available: false,
  },
  '14': {
    id: '14',
    src: `${base}14-perlas-tres-vueltas.webp`,
    alt: 'Mujer con collar de perlas de tres vueltas y vestido satinado marfil',
    width: 1200,
    height: 1600,
    available: false,
  },
  '15': {
    id: '15',
    src: `${base}15-gargantilla-perlas.webp`,
    alt: 'Gargantilla de perlas y cristales con colgante floral',
    width: 1200,
    height: 1600,
    available: false,
  },
};

/** Devuelve la imagen solo si el archivo existe; si no, null (usar fallback). */
export function getEditorial(id: EditorialId): EditorialImage | null {
  const img = editorial[id];
  return img.available ? img : null;
}
