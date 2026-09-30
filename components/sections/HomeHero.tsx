'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import clsx from 'clsx';
import { heroChapters } from '@/data/categories';
import { EditorialImage } from '@/components/ui/EditorialImage';

const INTERVAL = 7000;

/**
 * Hero de la portada: tres capítulos (lencería, ropa, joyería) que se
 * alternan con un fundido. Se detiene al pasar el cursor, con foco dentro
 * o si el usuario prefiere menos movimiento.
 */
export function HomeHero() {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const t = window.setTimeout(() => setActive((i) => (i + 1) % heroChapters.length), INTERVAL);
    return () => window.clearTimeout(t);
  }, [active, paused]);

  const chapter = heroChapters[active];

  return (
    <section
      aria-roledescription="carrusel"
      aria-label="Colecciones destacadas"
      className="relative flex min-h-svh flex-col lg:min-h-[min(100svh,1000px)] lg:grid lg:grid-cols-[minmax(0,1fr)_minmax(0,1.15fr)]"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
    >
      {/* Imagen: fondo completo en móvil, columna derecha en escritorio */}
      <div className="absolute inset-0 lg:relative lg:order-2">
        {heroChapters.map((c, i) => (
          <EditorialImage
            key={c.index}
            id={c.image}
            sizes="(min-width: 1024px) 55vw, 100vw"
            priority={i === 0}
            className={clsx(
              'absolute! inset-0 transition-opacity duration-[1200ms] ease-out',
              i === active ? 'opacity-100' : 'opacity-0',
            )}
            imgClassName={clsx('transition-transform duration-[8000ms] ease-out', i === active ? 'scale-100' : 'scale-[1.06]')}
          />
        ))}
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-linear-to-t from-marfil via-marfil/85 to-marfil/0 lg:hidden"
        />
      </div>

      {/* Texto */}
      <div className="relative z-10 mt-auto flex flex-col justify-end px-(--gutter) pt-(--chrome-h) pb-10 lg:order-1 lg:mt-0 lg:justify-center lg:pr-16 lg:pb-16 xl:pl-[max(var(--gutter),calc((100vw_-_1440px)/2_+_var(--gutter)))]">
        <h1 className="label mb-6 text-dorado-texto">Lencería, ropa y joyería en un solo lugar</h1>

        <div aria-live="polite" className="min-h-[220px] md:min-h-[260px] lg:min-h-[300px]">
          <p key={chapter.index} className="animate-[float-in_.7s_ease-out_both]">
            <span className="label block text-cafe/70">
              {chapter.index} — {chapter.label}
            </span>
            <span className="display-hero mt-4 block max-w-[12ch]">{chapter.title}</span>
            <span className="mt-6 block max-w-md text-[17px] text-cafe/85">{chapter.text}</span>
          </p>
        </div>

        <div className="mt-8 flex flex-wrap gap-3">
          <Link href={chapter.href} className="btn-primary">
            {chapter.cta}
          </Link>
        </div>

        <ul className="mt-12 grid max-w-lg grid-cols-3 gap-4" aria-label="Elegir colección">
          {heroChapters.map((c, i) => (
            <li key={c.index}>
              <button
                type="button"
                onClick={() => setActive(i)}
                aria-current={i === active ? 'true' : undefined}
                className="group flex w-full flex-col gap-3 pt-1 text-left"
              >
                <span className="relative block h-px w-full bg-linea">
                  <span
                    key={i === active ? `on-${active}-${paused}` : 'off'}
                    className={clsx(
                      'absolute inset-y-0 left-0 bg-cafe',
                      i === active ? (paused ? 'w-full' : 'animate-[hero-progress_linear_both]') : 'w-0',
                    )}
                    style={i === active && !paused ? { animationDuration: `${INTERVAL}ms` } : undefined}
                  />
                </span>
                <span
                  className={clsx(
                    'label transition-colors',
                    i === active ? 'text-negro' : 'text-cafe/60 group-hover:text-cafe',
                  )}
                >
                  {c.index} {c.label}
                </span>
              </button>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
