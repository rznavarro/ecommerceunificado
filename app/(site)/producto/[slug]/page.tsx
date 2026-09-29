import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getProduct, products } from '@/data/products';
import { categories } from '@/data/categories';
import { waProductUrl } from '@/lib/whatsapp';
import { Price } from '@/components/product/Price';
import { ProductImage } from '@/components/product/ProductImage';

export const dynamicParams = false;

export function generateStaticParams() {
  return products.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata(props: PageProps<'/producto/[slug]'>): Promise<Metadata> {
  const { slug } = await props.params;
  const product = getProduct(slug);
  if (!product) return {};
  const firstSentence = product.description?.split(/(?<=\.)\s/)[0];
  return {
    title: { absolute: `${product.name} | Purpuratta` },
    description: firstSentence ?? `${product.displayName}. Compra online con despacho a todo Chile.`,
    alternates: { canonical: `/producto/${product.slug}` },
  };
}

/** Ficha de producto — Fase 1: datos base. Galería, tallas y carrito en la Fase 3. */
export default async function ProductPage(props: PageProps<'/producto/[slug]'>) {
  const { slug } = await props.params;
  const product = getProduct(slug);
  if (!product) notFound();
  const category = categories[product.category];

  return (
    <div className="container-site grid gap-10 pt-[calc(var(--chrome-h)+40px)] pb-28 lg:grid-cols-[1.1fr_1fr] lg:gap-16">
      <ProductImage product={product} sizes="(min-width: 1024px) 55vw, 100vw" priority />
      <div className="lg:pt-10">
        <nav aria-label="Migas de pan" className="label mb-6 text-cafe/70">
          <Link href="/" className="hover:text-negro">
            Inicio
          </Link>
          <span aria-hidden="true"> / </span>
          <Link href={category.href} className="hover:text-negro">
            {category.label}
          </Link>
        </nav>
        <h1 className="font-display text-[34px] leading-[1.1] font-medium text-negro md:text-[46px]">
          {product.name}
        </h1>
        <Price product={product} className="mt-5 text-[18px]" />
        {!product.inStock && <p className="label mt-4 text-ciruela">Agotado</p>}
        {product.description && <p className="mt-8 max-w-lg text-cafe/85">{product.description}</p>}
        <a
          href={waProductUrl(product.displayName)}
          target="_blank"
          rel="noopener noreferrer"
          className="btn-primary mt-10"
        >
          {product.inStock ? 'Consultar por WhatsApp' : 'Avísame por WhatsApp'}
        </a>
      </div>
    </div>
  );
}
