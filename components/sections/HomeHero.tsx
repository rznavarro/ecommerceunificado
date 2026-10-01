'use client';

import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import clsx from 'clsx';
import { heroChapters } from '@/data/categories';
import { EditorialImage } from '@/components/ui/EditorialImage';

const INTERVAL = 7000;

/**
 * Hero de la portada a pantalla completa: tres capítulos (lencería, ropa,
 * joyería) que se alternan con un fundido. Al bajar, la foto se desenfoca y
 * el texto se desvanece (variable --hero-p, 0 → 1). Se detiene al pasar el
 * cursor, con foco dentro o si el usuario prefiere menos movimiento.
 */
export function HomeHero() {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (paused || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const t = window.setTimeout(() => setActive((i) => (i + 1) % heroChapters.length), INTERVAL);
    return () => window.clearTimeout(t);
  }, [active, paused]);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    let frame = 0;
    const update = () => {
      frame = 0;
      const p = Math.min(1, Math.max(0, window.scrollY / section.offsetHeight));
      section.style.setProperty('--hero-p', p.toFixed(3));
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', onScroll);
      if (frame) cancelAnimationFrame(frame);
    };
  }, []);

  const chapter = heroChapters[active];

  return (
    <section
      ref={sectionRef}
      aria-roledescription="carrusel"
      aria-label="Colecciones destacadas"
      className="relative h-svh min-h-[620px] overflow-hidden lg:h-[min(100svh,1000px)]"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
    >
      {/* Fotos a todo el ancho; se desenfocan al bajar */}
      <div
        className="absolute inset-0 will-change-[filter,transform]"
        style={{
          filter: 'blur(calc(var(--hero-p, 0) * 14px))',
          transform: 'scale(calc(1 + var(--hero-p, 0) * 0.06))',
        }}
      >
        {heroChapters.map((c, i) => (
          <div
            key={c.index}
            aria-hidden={i !== active}
            className={clsx(
              'absolute inset-0 grid transition-opacity duration-[1200ms] ease-out',
              c.images.length > 1 && 'md:grid-cols-2',
              i === active ? 'opacity-100' : 'opacity-0',
            )}
          >
            {c.images.map((id, j) => (
              <EditorialImage
                key={id}
                id={id}
                sizes={c.images.length > 1 ? '(min-width: 768px) 50vw, 100vw' : '100vw'}
                priority={i === 0}
                reveal={false}
                className={clsx('h-full', j > 0 && 'hidden md:block')}
                imgClassName={clsx(
                  'transition-transform duration-[8000ms] ease-out',
                  i === active ? 'scale-100' : 'scale-[1.06]',
                )}
              />
            ))}
          </div>
        ))}
      </div>

      {/* Velo para que el texto se lea sobre la foto */}
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-linear-to-t from-marfil via-marfil/60 to-marfil/0 lg:bg-linear-to-r lg:from-marfil/90 lg:via-marfil/45 lg:to-marfil/0"
      />

      {/* Texto */}
      <div
        className="relative z-10 flex h-full flex-col justify-end pt-(--chrome-h) pb-10 lg:justify-center lg:pb-0"
        style={{ opacity: 'calc(1 - var(--hero-p, 0) * 1.4)' }}
      >
        <div className="container-site">
          <h1 className="label mb-6 text-dorado-texto">Lencería, ropa y joyería en un solo lugar</h1>

          <div aria-live="polite" className="min-h-[230px] md:min-h-[270px] lg:min-h-[330px]">
            <p key={chapter.index} className="animate-[float-in_.8s_ease-out_both]">
              <span className="label block text-cafe/75">
                {chapter.index} — {chapter.label}
              </span>
              <span className="display-hero mt-5 block max-w-[11ch]">{chapter.title}</span>
              <span className="mt-6 block max-w-md text-[17px] text-cafe/90">{chapter.text}</span>
            </p>
          </div>

          <div className="mt-8">
            <Link href={chapter.href} className="btn-primary">
              {chapter.cta}
            </Link>
          </div>

          <ul className="mt-12 grid max-w-lg grid-cols-3 gap-4 lg:mt-16" aria-label="Elegir colección">
            {heroChapters.map((c, i) => (
              <li key={c.index}>
                <button
                  type="button"
                  onClick={() => setActive(i)}
                  aria-current={i === active ? 'true' : undefined}
                  className="group flex w-full flex-col gap-3 pt-1 text-left"
                >
                  <span className="relative block h-px w-full bg-cafe/20">
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
                      i === active ? 'text-negro' : 'text-cafe/65 group-hover:text-cafe',
                    )}
                  >
                    {c.index} {c.label}
                  </span>
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
