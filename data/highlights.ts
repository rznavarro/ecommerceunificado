import type { Category, Product } from './products';

/** Ícono de cada atributo (se resuelve en MobileProductView). */
export type HighlightIcon = 'leaf' | 'drop' | 'thread' | 'spark' | 'gift' | 'hand' | 'truck';

export type Highlight = { icon: HighlightIcon; label: string };

/**
 * Los 3 atributos que se muestran junto a la foto en la ficha móvil.
 * Editar aquí para cambiarlos; deben ser verdaderos para toda la categoría.
 */
const byCategory: Record<Category, Highlight[]> = {
  lenceria: [
    { icon: 'leaf', label: 'Tela suave' },
    { icon: 'drop', label: 'Fácil de lavar' },
    { icon: 'thread', label: 'Hecho en Colombia' },
  ],
  ropa: [
    { icon: 'leaf', label: 'Buena tela' },
    { icon: 'drop', label: 'Fácil de lavar' },
    { icon: 'spark', label: 'Atemporal' },
  ],
  joyeria: [
    { icon: 'spark', label: 'Diseño exclusivo' },
    { icon: 'gift', label: 'Ideal para regalo' },
    { icon: 'truck', label: 'Despacho a todo Chile' },
  ],
};

export function getHighlights(product: Product): Highlight[] {
  const list = byCategory[product.category];
  // "Hecho a mano" solo si la descripción del producto lo confirma.
  if (product.category === 'joyeria' && product.description?.toLowerCase().includes('a mano')) {
    return [list[0], list[1], { icon: 'hand', label: 'Hecho a mano' }];
  }
  return list;
}
