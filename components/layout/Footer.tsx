import Link from 'next/link';
import { site } from '@/data/site';
import { categoryList } from '@/data/categories';
import { waGeneralUrl } from '@/lib/whatsapp';
import { Logo } from '@/components/ui/Logo';

const help = [
  { href: '/guia-de-tallas', label: 'Guía de tallas' },
  { href: '/preguntas-frecuentes', label: 'Preguntas frecuentes' },
  { href: '/politicas/cambios-y-devoluciones', label: 'Cambios y devoluciones' },
  { href: '/politicas/envios', label: 'Envíos' },
  { href: '/politicas/privacidad', label: 'Privacidad' },
  { href: '/politicas/terminos', label: 'Términos' },
];

const linkClass =
  'inline-flex min-h-11 items-center text-marfil/85 transition-colors hover:text-camel md:min-h-9';

export function Footer() {
  return (
    <footer className="bg-cafe text-marfil">
      <div className="container-site grid gap-12 py-20 md:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1.3fr] lg:py-24">
        <div>
          <Logo tone="marfil" className="text-[34px]" />
          <p className="mt-4 max-w-xs text-[15px] text-marfil/80">{site.descriptor}</p>
        </div>

        <nav aria-labelledby="footer-tienda">
          <h2 id="footer-tienda" className="label mb-4 text-camel">
            Tienda
          </h2>
          <ul className="text-[15px]">
            {categoryList.map((c) => (
              <li key={c.id}>
                <Link href={c.href} className={linkClass}>
                  {c.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <nav aria-labelledby="footer-ayuda">
          <h2 id="footer-ayuda" className="label mb-4 text-camel">
            Ayuda
          </h2>
          <ul className="text-[15px]">
            {help.map((l) => (
              <li key={l.href}>
                <Link href={l.href} className={linkClass}>
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div>
          <h2 className="label mb-4 text-camel">Contacto</h2>
          <address className="not-italic text-[15px]">
            <ul>
              <li>
                <a href={waGeneralUrl()} target="_blank" rel="noopener noreferrer" className={linkClass}>
                  WhatsApp {site.whatsapp.display}
                </a>
              </li>
              <li className="py-2 text-marfil/85">
                {site.location.locality}, {site.location.region}
              </li>
              <li className="py-2 text-marfil/85">Despacho a {site.shipping.area}</li>
              {site.social.instagram && (
                <li>
                  <a href={site.social.instagram} target="_blank" rel="noopener noreferrer" className={linkClass}>
                    Instagram
                  </a>
                </li>
              )}
            </ul>
          </address>
        </div>
      </div>

      <div className="border-t border-marfil/15">
        <div className="container-site py-6 text-[13px] text-marfil/70">© 2026 {site.name}</div>
      </div>
    </footer>
  );
}
