/**
 * Formato CLP: $14.900 (punto de miles, sin decimales).
 * Implementación manual para que servidor y cliente generen exactamente
 * el mismo texto (sin depender de la versión de ICU de cada entorno).
 */
export function formatCLP(value: number): string {
  const rounded = Math.round(value);
  const sign = rounded < 0 ? '-' : '';
  const digits = Math.abs(rounded)
    .toString()
    .replace(/\B(?=(\d{3})+(?!\d))/g, '.');
  return `${sign}$${digits}`;
}

/** Normaliza texto para búsquedas (sin tildes, minúsculas). */
export function normalize(text: string): string {
  return text
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .toLowerCase()
    .trim();
}
