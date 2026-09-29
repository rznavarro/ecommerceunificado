import type { Metadata } from 'next';
import { PageIntro } from '@/components/ui/PageIntro';
import { getPublishedFaqs } from '@/data/faq';

export const metadata: Metadata = {
  title: { absolute: 'Preguntas frecuentes | Purpuratta' },
  description: 'Envíos a todo Chile, envío gratis desde $100.000, lencería fabricada en Colombia y pedidos por WhatsApp.',
  alternates: { canonical: '/preguntas-frecuentes' },
};

/** Fase 1: lista estática. Acordeón y JSON-LD FAQPage en las Fases 3 y 5. */
export default function FaqPage() {
  const faqs = getPublishedFaqs();
  return (
    <div className="pt-(--chrome-h)">
      <PageIntro title="Preguntas frecuentes" />
      <div className="container-site pb-28">
        <dl className="max-w-3xl divide-y divide-linea border-y border-linea">
          {faqs.map((f) => (
            <div key={f.id} className="py-7">
              <dt>
                <h2 className="font-display text-[24px] leading-snug text-negro">{f.question}</h2>
              </dt>
              <dd className="mt-3 text-cafe/85">{f.answer}</dd>
            </div>
          ))}
        </dl>
      </div>
    </div>
  );
}
