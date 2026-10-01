'use client';

import { useEffect } from 'react';

const SELECTOR = '[data-reveal]:not([data-revealed])';

/**
 * Efecto de aparición de las fotos: empiezan desenfocadas y se enfocan al
 * entrar en pantalla. Los estilos solo se activan con `html.reveal-ready`,
 * así que sin JavaScript (o con menos movimiento) las fotos se ven nítidas.
 */
export function ImageReveal() {
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const root = document.documentElement;

    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          entry.target.setAttribute('data-revealed', '');
          io.unobserve(entry.target);
        }
      },
      { rootMargin: '0px 0px -8% 0px', threshold: 0.12 },
    );

    const inViewport = (el: Element) => {
      const r = el.getBoundingClientRect();
      return r.top < window.innerHeight && r.bottom > 0;
    };

    // Lo que ya se ve al cargar queda nítido de inmediato (sin parpadeo).
    const scan = (initial: boolean) => {
      document.querySelectorAll(SELECTOR).forEach((el) => {
        if (initial && inViewport(el)) el.setAttribute('data-revealed', '');
        else io.observe(el);
      });
    };

    scan(true);
    root.classList.add('reveal-ready');

    let frame = 0;
    const mo = new MutationObserver(() => {
      if (frame) return;
      frame = requestAnimationFrame(() => {
        frame = 0;
        scan(false);
      });
    });
    mo.observe(document.body, { childList: true, subtree: true });

    return () => {
      io.disconnect();
      mo.disconnect();
      if (frame) cancelAnimationFrame(frame);
      root.classList.remove('reveal-ready');
    };
  }, []);

  return null;
}
