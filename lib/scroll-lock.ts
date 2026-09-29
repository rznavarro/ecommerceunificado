'use client';

/**
 * Bloqueo de scroll compartido por modales, lightbox, panel de carrito y menú
 * móvil. Cuenta los bloqueos anidados. En la fase 2, SmoothScrollProvider
 * registra Lenis aquí para llamar lenis.stop() / lenis.start().
 */
type Controller = { stop: () => void; start: () => void };

let locks = 0;
let controller: Controller | null = null;

export function registerScrollController(c: Controller | null) {
  controller = c;
  if (c && locks > 0) c.stop();
}

export function lockScroll() {
  locks += 1;
  if (locks === 1) {
    const scrollbar = window.innerWidth - document.documentElement.clientWidth;
    document.documentElement.style.overflow = 'hidden';
    if (scrollbar > 0) document.documentElement.style.paddingRight = `${scrollbar}px`;
    controller?.stop();
  }
}

export function unlockScroll() {
  if (locks === 0) return;
  locks -= 1;
  if (locks === 0) {
    document.documentElement.style.overflow = '';
    document.documentElement.style.paddingRight = '';
    controller?.start();
  }
}
