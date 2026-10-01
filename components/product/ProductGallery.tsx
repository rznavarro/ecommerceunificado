'use client';

import Image from 'next/image';
import { useRef, useState } from 'react';
import clsx from 'clsx';
import type { Product } from '@/data/products';
import { useDialog } from '@/lib/hooks/useDialog';
import { CloseIcon, ZoomIcon } from '@/components/ui/Icons';

/**
 * Galería de la ficha: miniaturas (solo si hay más de una foto), foto
 * principal y visor a pantalla completa. Sin fotos, fondo crema con el nombre.
 */
export function ProductGallery({ product }: { product: Product }) {
  const { images } = product;
  const [active, setActive] = useState(0);
  const [zoomOpen, setZoomOpen] = useState(false);
  const dialogRef = useRef<HTMLDivElement>(null);
  useDialog(zoomOpen, () => setZoomOpen(false), dialogRef);

  const current = images[active];
  const hasThumbs = images.length > 1;

  return (
    <div className={clsx('flex flex-col gap-4', hasThumbs && 'lg:flex-row-reverse')}>
      <div className="relative flex-1 overflow-hidden rounded-[3px] bg-crema" style={{ aspectRatio: '4 / 5' }}>
        {current ? (
          <>
            <Image
              key={current.src}
              src={current.src}
              alt={current.alt}
              fill
              sizes="(min-width: 1024px) 50vw, 100vw"
              preload={active === 0}
              className="animate-[float-in_.4s_ease-out_both] object-cover"
            />
            <button
              type="button"
              onClick={() => setZoomOpen(true)}
              className="absolute right-4 bottom-4 inline-flex size-11 items-center justify-center rounded-full bg-marfil/90 text-cafe shadow-sm backdrop-blur transition-colors hover:bg-marfil hover:text-negro"
              aria-label="Ampliar foto"
              aria-haspopup="dialog"
            >
              <ZoomIcon size={20} />
            </button>
          </>
        ) : (
          <div className="absolute inset-0 flex items-center justify-center p-8 text-center">
            <span className="font-display text-[30px] leading-tight text-cafe/80">{product.displayName}</span>
          </div>
        )}
      </div>

      {hasThumbs && (
        <ul className="flex gap-3 lg:w-24 lg:flex-col" aria-label="Fotos del producto">
          {images.map((img, i) => (
            <li key={img.src} className="w-20 lg:w-full">
              <button
                type="button"
                onClick={() => setActive(i)}
                aria-current={i === active ? 'true' : undefined}
                aria-label={`Ver foto ${i + 1} de ${images.length}`}
                className={clsx(
                  'relative block w-full overflow-hidden rounded-[3px] bg-crema ring-offset-2 ring-offset-marfil transition',
                  i === active ? 'ring-1 ring-cafe' : 'opacity-70 hover:opacity-100',
                )}
                style={{ aspectRatio: '4 / 5' }}
              >
                <Image src={img.src} alt="" fill sizes="96px" className="object-cover" />
              </button>
            </li>
          ))}
        </ul>
      )}

      {current && (
        <div
          ref={dialogRef}
          role="dialog"
          aria-modal="true"
          aria-label={`Foto ampliada: ${product.displayName}`}
          hidden={!zoomOpen}
          className="fixed inset-0 z-70 bg-marfil"
          onClick={() => setZoomOpen(false)}
        >
          {zoomOpen && (
            <>
              <Image src={current.src} alt={current.alt} fill sizes="100vw" quality={85} className="object-contain p-4 md:p-10" />
              <button
                type="button"
                onClick={() => setZoomOpen(false)}
                className="absolute top-4 right-4 inline-flex size-11 items-center justify-center rounded-full bg-marfil text-cafe shadow-sm hover:text-negro"
                aria-label="Cerrar"
                data-autofocus
              >
                <CloseIcon />
              </button>
            </>
          )}
        </div>
      )}
    </div>
  );
}
