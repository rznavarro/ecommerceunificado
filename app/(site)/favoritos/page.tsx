import type { Metadata } from 'next';
import { PageIntro } from '@/components/ui/PageIntro';
import { FavoritesView } from '@/components/product/FavoritesView';

export const metadata: Metadata = {
  title: { absolute: 'Favoritos | Purpuratta' },
  robots: { index: false, follow: true },
  alternates: { canonical: '/favoritos' },
};

export default function FavoritesPage() {
  return (
    <div className="pt-(--chrome-h)">
      <PageIntro title="Tus favoritos" lead="Los productos que guardas con el corazón quedan aquí, en este navegador." />
      <div className="container-site pb-28">
        <FavoritesView />
      </div>
    </div>
  );
}
