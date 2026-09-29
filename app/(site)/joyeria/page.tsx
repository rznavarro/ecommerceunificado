import type { Metadata } from 'next';
import { categories } from '@/data/categories';
import { CategoryView } from '@/components/sections/CategoryView';

const info = categories.joyeria;

export const metadata: Metadata = {
  title: { absolute: info.seo.title },
  description: info.seo.description,
  alternates: { canonical: info.href },
};

export default function JoyeriaPage() {
  return <CategoryView category="joyeria" />;
}
