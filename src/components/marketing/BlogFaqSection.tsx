import { FaqAccordion } from '@/components/marketing/FaqAccordion.client';
import type { BlogFaq } from '@/content/blog/types';

interface BlogFaqSectionProps {
  items: BlogFaq[];
}

export function BlogFaqSection({ items }: BlogFaqSectionProps) {
  if (items.length === 0) return null;

  const accordionItems = items.map((f) => ({ q: f.q, a: f.a }));

  return (
    <section className="mt-12" aria-labelledby="blog-faq-heading">
      <h2 id="blog-faq-heading" className="font-display text-xl font-bold text-surface-900 sm:text-2xl">
        Frequently asked questions
      </h2>
      <div className="mt-6">
        <FaqAccordion items={accordionItems} variant="brand" />
      </div>
    </section>
  );
}
