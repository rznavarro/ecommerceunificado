'use client';

import { usePathname } from 'next/navigation';
import { getProduct } from '@/data/products';
import { site } from '@/data/site';
import { waUrl } from '@/lib/whatsapp';
import { WhatsAppIcon } from '@/components/ui/Icons';

/**
 * Botón flotante (todas las páginas). En ficha de producto, el mensaje incluye
 * el producto. En móvil sube sobre la barra inferior con --float-offset.
 */
export function WhatsAppFloat() {
  const pathname = usePathname();
  const slug = pathname.startsWith('/producto/') ? pathname.split('/')[2] : undefined;
  const product = slug ? getProduct(slug) : undefined;
  const text = product ? site.whatsappMessages.product(product.displayName) : site.whatsappMessages.general;

  return (
    <a
      href={waUrl(text)}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Escríbenos por WhatsApp"
      className="wa-float fixed z-50 inline-flex size-12 items-center lg:size-14 justify-center rounded-full bg-cafe text-marfil shadow-[0_12px_30px_-10px_rgba(28,26,24,.55)] transition-[background-color,bottom] duration-300 hover:bg-negro"
      style={{
        right: 'calc(16px + env(safe-area-inset-right))',
        bottom: 'calc(16px + env(safe-area-inset-bottom) + var(--float-offset))',
      }}
    >
      <WhatsAppIcon />
    </a>
  );
}
