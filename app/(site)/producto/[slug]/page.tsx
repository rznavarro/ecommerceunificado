import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getProduct, getRelated, products } from '@/data/products';
import { categories } from '@/data/categories';
import { ProductGallery } from '@/components/product/ProductGallery';
import { ProductPurchase } from '@/components/product/ProductPurchase';
import { ProductTabs } from '@/components/product/ProductTabs';
import { ProductCarousel } from '@/components/product/ProductCarousel';
import { MobileProductView } from '@/components/product/MobileProductView';
import { ArrowIcon } from '@/components/ui/Icons';

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

/** Ficha de producto: galería, compra, pestañas, detalle y relacionados. */
export default async function ProductPage(props: PageProps<'/producto/[slug]'>) {
  const { slug } = await props.params;
  const product = getProduct(slug);
  if (!product) notFound();
  const category = categories[product.category];
  const related = getRelated(product, 12);
  const detail = product.images[1] ?? product.images[0];

  return (
    <div className="pb-28 lg:pt-[calc(var(--chrome-h)+32px)]">
      {/* Móvil y tablet: estilo app, tema oscuro */}
      <MobileProductView product={product} />

      {/* Escritorio */}
      <div className="hidden lg:block">
        <div className="container-site grid gap-10 lg:grid-cols-[1.15fr_1fr] lg:gap-16 xl:gap-24">
          <ProductGallery product={product} />
          <div className="lg:sticky lg:top-[calc(var(--header-h)+24px)] lg:self-start lg:pt-4">
            <ProductPurchase product={product} />
          </div>
        </div>

        <section
          aria-label="Información del producto"
          className="container-site mt-20 grid gap-10 lg:mt-28 lg:grid-cols-2 lg:gap-16"
        >
          <ProductTabs product={product} />
          {detail && (
            <div
              className="relative overflow-hidden rounded-2xl bg-crema"
              style={{ aspectRatio: '16 / 10' }}
              data-reveal=""
            >
              <Image
                src={detail.src}
                alt=""
                fill
                sizes="(min-width: 1024px) 50vw, 100vw"
                className="scale-[1.6] object-cover"
                style={{ objectPosition: '50% 55%' }}
              />
            </div>
          )}
        </section>
      </div>

      {related.length > 0 && (
        <section aria-labelledby="relacionados-titulo" className="container-site mt-12 lg:mt-32">
          <ProductCarousel
            products={related}
            label="Productos relacionados"
            header={
              <>
                <h2
                  id="relacionados-titulo"
                  className="font-display text-[32px] leading-tight font-medium text-negro md:text-[40px]"
                >
                  También te puede gustar
                </h2>
                <Link
                  href={category.href}
                  className="label mt-3 inline-flex items-center gap-2 text-cafe hover:text-negro"
                >
                  Ver todo en {category.label.toLowerCase()} <ArrowIcon size={16} />
                </Link>
              </>
            }
          />
        </section>
      )}
    </div>
  );
}
