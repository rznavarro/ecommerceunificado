import Image from 'next/image';
import clsx from 'clsx';
import { getEditorial, type EditorialId } from '@/data/images';

type Props = {
  id: EditorialId;
  sizes: string;
  className?: string;
  imgClassName?: string;
  priority?: boolean;
  /** Relación de aspecto CSS, p. ej. "4 / 5". Sin ella, el contenedor define el alto. */
  aspect?: string;
  /** Texto del fallback crema si el archivo aún no existe */
  fallback?: string;
  /** Efecto de aparición con blur al entrar en pantalla (por defecto sí) */
  reveal?: boolean;
};

/**
 * Foto editorial con recorte `object-cover` y el `object-position` sugerido.
 * Si el archivo no está disponible, muestra el fondo crema (nunca otra foto).
 */
export function EditorialImage({ id, sizes, className, imgClassName, priority, aspect, fallback, reveal = true }: Props) {
  const img = getEditorial(id);
  return (
    <div
      className={clsx('relative overflow-hidden bg-crema', className)}
      style={aspect ? { aspectRatio: aspect } : undefined}
      data-reveal={reveal && img ? '' : undefined}
    >
      {img ? (
        <Image
          src={img.src}
          alt={img.alt}
          fill
          sizes={sizes}
          preload={priority}
          className={clsx('object-cover', imgClassName)}
          style={img.position ? { objectPosition: img.position } : undefined}
        />
      ) : (
        fallback && (
          <div className="absolute inset-0 flex items-center justify-center p-6 text-center">
            <span className="font-display text-[22px] leading-tight text-cafe/80">{fallback}</span>
          </div>
        )
      )}
    </div>
  );
}
