'use client';

import clsx from 'clsx';
import { useFavorite } from '@/lib/hooks/useFavorites';
import { HeartIcon } from '@/components/ui/Icons';

type Props = { slug: string; name: string; className?: string; size?: number };

export function FavoriteButton({ slug, name, className, size = 20 }: Props) {
  const { isFavorite, toggle } = useFavorite(slug);
  return (
    <button
      type="button"
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
        toggle();
      }}
      aria-pressed={isFavorite}
      aria-label={isFavorite ? `Quitar ${name} de favoritos` : `Guardar ${name} en favoritos`}
      className={clsx(
        'inline-flex items-center justify-center transition-colors',
        isFavorite ? 'text-ciruela' : 'text-cafe hover:text-negro',
        className,
      )}
    >
      <HeartIcon size={size} filled={isFavorite} />
    </button>
  );
}
