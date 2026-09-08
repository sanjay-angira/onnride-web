'use client';

import Link from 'next/link';
import { FaqAccordion } from '@/components/marketing/FaqAccordion.client';
import { FAQ_ITEMS } from '@/lib/site-content';

export function HomeFaqPreview() {
  return (
    <section className="w-full">
      <div className="grid lg:grid-cols-2">
        <div className="relative overflow-hidden bg-surface-950 px-6 py-20 sm:px-12 sm:py-28 lg:px-16">
          <div className="absolute inset-0 bg-hero-pattern opacity-80" />
          <div className="absolute -left-20 bottom-0 h-72 w-72 rounded-full bg-brand-500/25 blur-3xl" />
          <div className="relative max-w-lg">
            <p className="home-section-label text-brand-400">FAQ</p>
            <h2 className="home-section-title-light mt-3">Got questions?</h2>
            <p className="home-section-subtitle-light">
              Everything you need to know before booking — documents, deposit, fuel and cancellation.
            </p>
            <Link
              href="/faq"
              className="mt-8 inline-flex items-center gap-2 rounded-xl bg-brand-500 px-6 py-3 text-sm font-semibold text-white transition hover:bg-brand-600"
            >
              View all FAQs →
            </Link>
          </div>
        </div>

        <div className="bg-gradient-to-br from-brand-50 to-white px-6 py-20 sm:px-12 sm:py-28 lg:px-16">
          <FaqAccordion items={FAQ_ITEMS.slice(0, 5)} variant="brand" />
        </div>
      </div>
    </section>
  );
}
