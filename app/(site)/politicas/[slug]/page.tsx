import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getPolicy, policies } from '@/data/policies';
import { PageIntro } from '@/components/ui/PageIntro';
import { Pending } from '@/components/ui/Pending';

export const dynamicParams = false;

export function generateStaticParams() {
  return policies.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata(props: PageProps<'/politicas/[slug]'>): Promise<Metadata> {
  const { slug } = await props.params;
  const policy = getPolicy(slug);
  if (!policy) return {};
  return {
    title: { absolute: `${policy.title} | Purpuratta` },
    alternates: { canonical: `/politicas/${policy.slug}` },
  };
}

export default async function PolicyPage(props: PageProps<'/politicas/[slug]'>) {
  const { slug } = await props.params;
  const policy = getPolicy(slug);
  if (!policy) notFound();

  return (
    <div className="pt-(--chrome-h)">
      <PageIntro title={policy.title} />
      <div className="container-site max-w-3xl pb-28">
        {policy.body ? (
          <div className="whitespace-pre-line text-cafe/85">{policy.body}</div>
        ) : (
          <Pending message="Estamos actualizando esta página. Si tienes dudas, escríbenos por WhatsApp." />
        )}
      </div>
    </div>
  );
}
