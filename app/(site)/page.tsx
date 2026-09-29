import Link from 'next/link';
import { heroChapters } from '@/data/categories';
import { site } from '@/data/site';
import { waGeneralUrl } from '@/lib/whatsapp';

/**
 * Portada — Fase 1: esqueleto estático con el H1 y accesos a las 3 categorías.
 * Las secciones completas (hero con capítulos, beneficios, vitrina, etc.)
 * se construyen en la Fase 3.
 */
export default function HomePage() {
  return (
    <>
      <section className="relative flex min-h-svh items-center pt-(--chrome-h)">
        <div className="container-site py-16">
          <h1 className="label mb-6 text-dorado-texto">Lencería, ropa y joyería en un solo lugar</h1>
          <p className="display-hero max-w-4xl">{site.tagline}</p>

          <ul className="mt-12 grid max-w-3xl gap-px border border-linea bg-linea md:grid-cols-3">
            {heroChapters.map((c) => (
              <li key={c.index} className="bg-marfil">
                <Link href={c.href} className="flex h-full flex-col gap-3 p-6 transition-colors hover:bg-crema">
                  <span className="label text-dorado-texto">
                    {c.index} {c.label}
                  </span>
                  <span className="font-display text-[26px] leading-tight text-negro">{c.title}</span>
                </Link>
              </li>
            ))}
          </ul>

          <div className="mt-10 flex flex-wrap gap-3">
            <Link href="/lenceria" className="btn-primary">
              Ver lencería
            </Link>
            <a href={waGeneralUrl()} target="_blank" rel="noopener noreferrer" className="btn-glass">
              Comprar por WhatsApp
            </a>
          </div>
        </div>
      </section>

      <section className="border-t border-linea bg-crema">
        <div className="container-site section-y">
          <p className="max-w-3xl font-display text-[26px] leading-snug text-negro md:text-[34px]">{site.identity}</p>
        </div>
      </section>
    </>
  );
}
