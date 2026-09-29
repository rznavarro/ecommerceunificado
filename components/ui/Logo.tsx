import Link from 'next/link';
import clsx from 'clsx';
import { site } from '@/data/site';

/**
 * Wordmark provisional. [PENDIENTE: logo oficial en SVG]
 * El padding (≈ altura de la "P") es el espacio de respeto.
 */
export function Logo({ className, tone = 'cafe' }: { className?: string; tone?: 'cafe' | 'marfil' }) {
  return (
    <Link
      href="/"
      aria-label={`${site.name}, ir a la portada`}
      className={clsx(
        'inline-flex items-center font-display font-semibold leading-none tracking-[0.01em]',
        tone === 'cafe' ? 'text-cafe' : 'text-marfil',
        className,
      )}
    >
      {site.name}
    </Link>
  );
}
