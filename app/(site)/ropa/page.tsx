import type { Metadata } from 'next';
import { categories } from '@/data/categories';
import { CategoryView } from '@/components/sections/CategoryView';

const info = categories.ropa;

export const metadata: Metadata = {
  title: { absolute: info.seo.title },
  description: info.seo.description,
  alternates: { canonical: info.href },
};

export default function RopaPage() {
  return <CategoryView category="ropa" />;
}
