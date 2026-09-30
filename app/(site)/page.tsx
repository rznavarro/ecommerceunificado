import Link from 'next/link';
import { benefits, categoryList } from '@/data/categories';
import { getEditorial } from '@/data/images';
import { looks, showcase } from '@/data/looks';
import { getFeatured, getProduct, type Product } from '@/data/products';
import { site } from '@/data/site';
import { waGeneralUrl } from '@/lib/whatsapp';
import { HomeHero } from '@/components/sections/HomeHero';
import { EditorialImage } from '@/components/ui/EditorialImage';
import { ProductCard } from '@/components/product/ProductCard';
import { ProductImage } from '@/components/product/ProductImage';
import { Price } from '@/components/product/Price';
import { ArrowIcon } from '@/components/ui/Icons';

export default function HomePage() {
  const featured = getFeatured();
  const look = looks[0];
  const gallery = showcase.filter((item) => getEditorial(item.image));

  return (
    <>
      <HomeHero />

      {/* Beneficios */}
      <section aria-label="Beneficios" className="border-y border-linea bg-crema">
        <ul className="container-site grid grid-cols-2 gap-x-6 gap-y-8 py-10 lg:grid-cols-4 lg:py-12">
          {benefits.map((b) => (
            <li key={b.id} className="border-l border-dorado/50 pl-4">
              <p className="label text-negro">{b.title}</p>
              <p className="mt-2 text-[14px] leading-relaxed text-cafe/80">{b.text}</p>
            </li>
          ))}
        </ul>
      </section>

      {/* Compra por categoría */}
      <section aria-labelledby="categorias-titulo" className="container-site section-y">
        <div className="mb-12 flex flex-wrap items-end justify-between gap-6 md:mb-16">
          <div>
            <p className="label mb-4 text-dorado-texto">Colecciones</p>
            <h2 id="categorias-titulo" className="display-h2">
              Compra por categoría
            </h2>
          </div>
        </div>
        <ul className="grid gap-4 md:grid-cols-3 md:gap-6">
          {categoryList.map((c, i) => (
            <li key={c.id}>
              <Link href={c.href} className="group block">
                <div className="relative overflow-hidden">
                  <EditorialImage
                    id={c.cardImage}
                    aspect="3 / 4"
                    sizes="(min-width: 768px) 33vw, 100vw"
                    imgClassName="transition-transform duration-[1200ms] ease-out group-hover:scale-[1.04]"
                    fallback={c.label}
                  />
                  <div
                    aria-hidden="true"
                    className="absolute inset-0 bg-linear-to-t from-negro/55 via-negro/0 to-negro/0"
                  />
                  <div className="absolute inset-x-0 bottom-0 p-6 text-marfil md:p-8">
                    <p className="label text-marfil/80">0{i + 1}</p>
                    <h3 className="mt-2 font-display text-[36px] leading-none font-medium md:text-[44px]">
                      {c.label}
                    </h3>
                    <p className="mt-3 max-w-xs text-[15px] text-marfil/90">{c.cardText}</p>
                    <span className="label mt-5 inline-flex items-center gap-2 border-b border-marfil/60 pb-1">
                      {c.cta}
                      <ArrowIcon size={16} className="transition-transform duration-300 group-hover:translate-x-1" />
                    </span>
                  </div>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </section>

      {/* Destacados */}
      {featured.length > 0 && (
        <section aria-labelledby="destacados-titulo" className="border-t border-linea bg-marfil">
          <div className="container-site section-y">
            <div className="mb-12 flex flex-wrap items-end justify-between gap-6 md:mb-16">
              <div>
                <p className="label mb-4 text-dorado-texto">Lencería fabricada en Colombia</p>
                <h2 id="destacados-titulo" className="display-h2">
                  Los favoritos
                </h2>
              </div>
              <Link href="/lenceria" className="btn-glass">
                Ver toda la lencería
              </Link>
            </div>
            <ul className="grid grid-cols-2 gap-x-4 gap-y-12 md:grid-cols-3 md:gap-x-6 lg:grid-cols-4">
              {featured.map((p) => (
                <li key={p.slug}>
                  <ProductCard product={p} />
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}

      {/* Look completo */}
      {look && getEditorial(look.image) && (
        <section aria-labelledby="look-titulo" className="bg-crema">
          <div className="container-site grid items-center gap-12 py-20 lg:grid-cols-2 lg:gap-20 lg:py-28">
            <EditorialImage id={look.image} aspect="4 / 5" sizes="(min-width: 1024px) 50vw, 100vw" />
            <div>
              <p className="label mb-4 text-dorado-texto">Arma tu look</p>
              <h2 id="look-titulo" className="display-h2">
                {look.name}
              </h2>
              <p className="mt-6 max-w-md text-[17px] text-cafe/85">
                De la lencería al último detalle: todo lo que necesitas para este look, en un solo lugar.
              </p>
              <div className="mt-10 space-y-8">
                {look.groups.map((g) => {
                  const items = g.slugs.map(getProduct).filter((p): p is Product => !!p);
                  return (
                    <div key={g.title}>
                      <p className="label mb-4 border-b border-linea pb-3 text-cafe/70">{g.title}</p>
                      <ul className="space-y-4">
                        {items.map((p) => (
                          <li key={p.slug}>
                            <Link href={`/producto/${p.slug}`} className="group flex items-center gap-5">
                              <ProductImage product={p} sizes="80px" className="w-20 shrink-0" />
                              <div className="min-w-0">
                                <p className="font-display text-[20px] leading-snug text-negro group-hover:underline group-hover:decoration-camel group-hover:underline-offset-4">
                                  {p.displayName}
                                </p>
                                <Price product={p} className="mt-0.5" />
                              </div>
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Vitrina editorial */}
      {gallery.length > 0 && (
        <section aria-labelledby="vitrina-titulo" className="container-site section-y">
          <div className="mb-12 max-w-2xl md:mb-16">
            <p className="label mb-4 text-dorado-texto">Ropa y joyería</p>
            <h2 id="vitrina-titulo" className="display-h2">
              Explora la colección
            </h2>
          </div>
          <ul className="columns-2 gap-4 md:columns-3 md:gap-6 lg:columns-4">
            {gallery.map((item, i) => {
              const img = getEditorial(item.image)!;
              const product = item.productSlug ? getProduct(item.productSlug) : undefined;
              const href = product ? `/producto/${product.slug}` : (item.href ?? '/');
              return (
                <li key={item.image} className="mb-4 break-inside-avoid md:mb-6">
                  <Link href={href} className="group block">
                    <EditorialImage
                      id={item.image}
                      aspect={i % 3 === 1 ? '1 / 1' : '4 / 5'}
                      sizes="(min-width: 1024px) 25vw, (min-width: 768px) 33vw, 50vw"
                      imgClassName="transition-transform duration-[1200ms] ease-out group-hover:scale-[1.04]"
                    />
                    <p className="mt-3 font-display text-[18px] leading-snug text-negro md:text-[20px]">
                      {product?.displayName ?? img.alt}
                    </p>
                    {product && <Price product={product} className="text-[14px]" />}
                  </Link>
                </li>
              );
            })}
          </ul>
        </section>
      )}

      {/* Identidad */}
      <section className="border-t border-linea bg-crema">
        <div className="container-site section-y grid items-end gap-10 lg:grid-cols-[1.4fr_1fr]">
          <p className="max-w-3xl font-display text-[26px] leading-snug text-negro md:text-[34px]">{site.identity}</p>
          <div className="flex flex-wrap gap-3 lg:justify-end">
            <Link href="/nosotros" className="btn-glass">
              Conócenos
            </Link>
            <a href={waGeneralUrl()} target="_blank" rel="noopener noreferrer" className="btn-primary">
              Comprar por WhatsApp
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
