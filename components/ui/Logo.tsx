import Image from 'next/image';
import Link from 'next/link';
import clsx from 'clsx';
import { site } from '@/data/site';

/**
 * Logo oficial (PNG oscuro con fondo transparente, 133 × 45 px).
 * En fondos oscuros (`tone="marfil"`) se aclara con un filtro.
 * [PENDIENTE: versión en SVG o PNG de alta resolución para pantallas retina]
 */
export function Logo({ className, tone = 'cafe' }: { className?: string; tone?: 'cafe' | 'marfil' }) {
  return (
    <Link href="/" aria-label={`${site.name}, ir a la portada`} className={clsx('inline-flex items-center', className)}>
      <Image
        src="/images/logo/purpuratta-logo.png"
        alt={site.name}
        width={133}
        height={45}
        preload
        className={clsx('h-auto w-[133px]', tone === 'marfil' && 'brightness-0 invert')}
      />
    </Link>
  );
}
