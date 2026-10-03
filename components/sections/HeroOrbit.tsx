'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useRef } from 'react';
import type { Product } from '@/data/products';
import { categoryList } from '@/data/categories';
import { formatCLP } from '@/lib/format';

const CARD_W = 92;
const CARD_H = 128;

type Pose = { x: number; y: number; r: number; s: number; o: number };
type Phase = 'scatter' | 'line' | 'circle';

const clamp = (v: number, min = 0, max = 1) => Math.min(max, Math.max(min, v));
const lerp = (a: number, b: number, t: number) => a + (b - a) * t;
const ease = (t: number) => t * t * (3 - 2 * t);

/**
 * Hero de escritorio: las fotos de los productos entran dispersas, forman una
 * línea y luego un círculo. Al bajar (scroll natural, sección fija) el círculo
 * se abre en un arco que se desliza y aparece el texto con los accesos.
 * Al pasar el cursor, cada tarjeta gira y muestra el producto.
 */
export function HeroOrbit({ products }: { products: Product[] }) {
  const sectionRef = useRef<HTMLElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLAnchorElement | null)[]>([]);
  const introRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const hintRef = useRef<HTMLParagraphElement>(null);
  const n = products.length;

  useEffect(() => {
    const section = sectionRef.current;
    const stage = stageRef.current;
    if (!section || !stage || n === 0) return;
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    let phase: Phase = reduced ? 'circle' : 'scatter';
    let width = stage.clientWidth;
    let height = stage.clientHeight;
    let morph = reduced ? 1 : 0;
    let shuffle = 0;
    let mouse = 0;
    let mouseTarget = 0;
    let frame = 0;

    // Posiciones de dispersión (solo en el cliente: sin desajustes de hidratación).
    const scatter: Pose[] = products.map(() => ({
      x: (Math.random() - 0.5) * 1500,
      y: (Math.random() - 0.5) * 1000,
      r: (Math.random() - 0.5) * 180,
      s: 0.6,
      o: 0,
    }));
    const current: Pose[] = scatter.map((p) => ({ ...p }));

    const target = (i: number): Pose => {
      if (phase === 'scatter') return scatter[i];
      if (phase === 'line') {
        const spacing = Math.min(CARD_W + 10, (width * 0.92) / n);
        return { x: (i - (n - 1) / 2) * spacing, y: 0, r: 0, s: 1, o: 1 };
      }
      // Círculo
      const radius = Math.min(Math.min(width, height) * 0.34, 300);
      const ca = (i / n) * 360;
      const cr = (ca * Math.PI) / 180;
      const circle = { x: Math.cos(cr) * radius, y: Math.sin(cr) * radius, r: ca + 90 };
      // Arco ("arcoíris"), centrado abajo
      const arcRadius = Math.min(width, height * 1.5) * 1.1;
      const apexY = height * 0.24;
      const spread = 120;
      const step = spread / (n - 1);
      const aa = -90 - spread / 2 + i * step - shuffle * spread * 0.55 + spread * 0.275;
      const ar = (aa * Math.PI) / 180;
      const arc = {
        x: Math.cos(ar) * arcRadius + mouse,
        y: Math.sin(ar) * arcRadius + apexY + arcRadius,
        r: aa + 90,
      };
      // Giro por el camino más corto entre la pose del círculo y la del arco.
      const fromR = arc.r + ((((circle.r - arc.r) % 360) + 540) % 360) - 180;
      return {
        x: lerp(circle.x, arc.x, morph),
        y: lerp(circle.y, arc.y, morph),
        r: lerp(fromR, arc.r, morph),
        s: lerp(1, 1.55, morph),
        o: 1,
      };
    };

    const readScroll = () => {
      const rect = section.getBoundingClientRect();
      const range = section.offsetHeight - window.innerHeight;
      const p = range > 0 ? clamp(-rect.top / range) : 0;
      if (!reduced) {
        morph = ease(clamp(p / 0.35));
        shuffle = clamp((p - 0.35) / 0.65);
        if (p > 0.02 && phase !== 'circle') phase = 'circle';
      }
    };

    const render = () => {
      frame = 0;
      readScroll();
      mouse = lerp(mouse, mouseTarget, 0.08);
      let moving = Math.abs(mouse - mouseTarget) > 0.5;
      const k = reduced ? 1 : 0.075;
      for (let i = 0; i < n; i++) {
        const t = target(i);
        const c = current[i];
        c.x = lerp(c.x, t.x, k);
        c.y = lerp(c.y, t.y, k);
        c.r = lerp(c.r, t.r, k);
        c.s = lerp(c.s, t.s, k);
        c.o = lerp(c.o, t.o, k);
        if (Math.abs(c.x - t.x) + Math.abs(c.y - t.y) + Math.abs(c.r - t.r) > 0.3 || Math.abs(c.o - t.o) > 0.01) {
          moving = true;
        }
        const el = cardRefs.current[i];
        if (el) {
          el.style.transform = `translate(-50%, -50%) translate3d(${c.x}px, ${c.y}px, 0) rotate(${c.r}deg) scale(${c.s})`;
          el.style.opacity = String(c.o);
        }
      }
      // Textos: intro visible en el círculo; contenido al formarse el arco.
      const introO = phase === 'circle' ? clamp(1 - morph * 2.2) : 0;
      if (introRef.current) {
        introRef.current.style.opacity = String(introO);
        introRef.current.style.filter = `blur(${(1 - introO) * 8}px)`;
      }
      if (contentRef.current) {
        const co = clamp((morph - 0.75) / 0.25);
        contentRef.current.style.opacity = String(co);
        contentRef.current.style.transform = `translateY(${(1 - co) * 20}px)`;
        contentRef.current.style.pointerEvents = co > 0.5 ? 'auto' : 'none';
      }
      if (hintRef.current) hintRef.current.style.opacity = String(phase === 'circle' ? clamp(0.7 - morph * 2) : 0);
      if (moving) frame = requestAnimationFrame(render);
    };

    const kick = () => {
      if (!frame) frame = requestAnimationFrame(render);
    };

    const onResize = () => {
      width = stage.clientWidth;
      height = stage.clientHeight;
      kick();
    };
    const onMouse = (e: MouseEvent) => {
      const rect = stage.getBoundingClientRect();
      mouseTarget = ((e.clientX - rect.left) / rect.width - 0.5) * 2 * 60 * morph;
      kick();
    };

    const timers = reduced
      ? []
      : [
          window.setTimeout(() => {
            if (phase === 'scatter') phase = 'line';
            kick();
          }, 400),
          window.setTimeout(() => {
            phase = 'circle';
            kick();
          }, 2000),
        ];

    kick();
    window.addEventListener('scroll', kick, { passive: true });
    window.addEventListener('resize', onResize);
    stage.addEventListener('mousemove', onMouse);
    return () => {
      timers.forEach(clearTimeout);
      if (frame) cancelAnimationFrame(frame);
      window.removeEventListener('scroll', kick);
      window.removeEventListener('resize', onResize);
      stage.removeEventListener('mousemove', onMouse);
    };
  }, [products, n]);

  return (
    <section ref={sectionRef} aria-label="Colecciones" className="relative h-[250vh] bg-marfil">
      {/* Escenario fijo, siempre debajo del menú */}
      <div className="sticky top-0 h-svh pt-(--chrome-h)">
        <div ref={stageRef} className="relative h-full overflow-hidden [perspective:1000px]">
          {/* Texto inicial (en el centro del círculo) */}
          <div
            ref={introRef}
            className="pointer-events-none absolute inset-0 z-0 flex flex-col items-center justify-center text-center opacity-0"
          >
            <p className="font-display text-[44px] leading-tight font-medium text-negro xl:text-[52px]">
              Todo lo que te hace
              <br />
              <em className="text-dorado-texto">sentir bien.</em>
            </p>
          </div>
          <p
            ref={hintRef}
            aria-hidden="true"
            className="label pointer-events-none absolute bottom-8 left-1/2 z-0 -translate-x-1/2 text-cafe/60 opacity-0"
          >
            Desliza para explorar
          </p>

          {/* Contenido al formarse el arco */}
          <div
            ref={contentRef}
            className="pointer-events-none absolute inset-x-0 top-[6%] z-20 flex flex-col items-center px-6 text-center opacity-0"
          >
            <p className="label mb-4 text-dorado-texto">Lencería · Ropa · Joyería</p>
            <h2 className="display-h2 max-w-3xl">Todo lo que te hace sentir bien, en un solo lugar</h2>
            <p className="mt-5 max-w-xl text-[17px] text-cafe/85">
              Lencería fabricada en Colombia, prendas atemporales y joyería con diseños exclusivos.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-3">
              {categoryList.map((c, i) => (
                <Link key={c.id} href={c.href} className={i === 0 ? 'btn-primary' : 'btn-glass'}>
                  {c.cta}
                </Link>
              ))}
            </div>
          </div>

          {/* Tarjetas */}
          <div className="absolute inset-0 z-10">
            {products.map((p, i) => {
              const img = p.images[0];
              return (
                <Link
                  key={p.slug}
                  ref={(el) => {
                    cardRefs.current[i] = el;
                  }}
                  href={`/producto/${p.slug}`}
                  tabIndex={-1}
                  aria-hidden="true"
                  className="group absolute top-1/2 left-1/2 opacity-0 will-change-transform [transform-style:preserve-3d]"
                  style={{ width: CARD_W, height: CARD_H }}
                >
                  <span className="relative block size-full transition-transform duration-600 ease-[cubic-bezier(.2,.8,.2,1)] [transform-style:preserve-3d] group-hover:[transform:rotateY(180deg)]">
                    {/* Frente */}
                    <span className="absolute inset-0 overflow-hidden rounded-xl bg-crema shadow-[0_10px_24px_-12px_rgba(28,26,24,.45)] [backface-visibility:hidden]">
                      {img && <Image src={img.src} alt="" fill sizes="150px" className="object-cover" />}
                    </span>
                    {/* Reverso */}
                    <span className="absolute inset-0 flex flex-col items-center justify-center gap-1 rounded-xl border border-camel/40 bg-cafe p-2 text-center text-marfil [backface-visibility:hidden] [transform:rotateY(180deg)]">
                      <span className="text-[7px] font-medium tracking-[0.18em] text-camel uppercase">Ver</span>
                      <span className="font-display text-[11px] leading-tight">{p.displayName}</span>
                      <span className="text-[9px] text-marfil/75">
                        {p.price === null ? 'Consultar' : formatCLP(p.price)}
                      </span>
                    </span>
                  </span>
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
