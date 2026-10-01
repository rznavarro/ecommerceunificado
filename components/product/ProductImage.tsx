import Image from 'next/image';
import clsx from 'clsx';
import type { Product } from '@/data/products';

type Props = {
  product: Product;
  sizes: string;
  className?: string;
  priority?: boolean;
  /** Relación de aspecto CSS, p. ej. "4 / 5" */
  aspect?: string;
  /** Efecto de aparición con blur al entrar en pantalla (por defecto sí) */
  reveal?: boolean;
};

/**
 * Foto principal del producto o, si falta, tarjeta crema con el nombre.
 * Nunca se usa la foto de otro producto.
 */
export function ProductImage({ product, sizes, className, priority, aspect = '4 / 5', reveal = true }: Props) {
  const image = product.images[0];
  return (
    <div
      className={clsx('relative overflow-hidden rounded-[3px] bg-crema', className)}
      style={{ aspectRatio: aspect }}
      data-reveal={reveal && image ? '' : undefined}
    >
      {image ? (
        <Image
          src={image.src}
          alt={image.alt}
          fill
          sizes={sizes}
          preload={priority}
          className="object-cover"
        />
      ) : (
        <div className="absolute inset-0 flex items-center justify-center p-6 text-center">
          <span className="font-display text-[22px] leading-tight text-cafe/80 md:text-[26px]">
            {product.displayName}
          </span>
        </div>
      )}
    </div>
  );
}
