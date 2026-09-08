'use client';

import Link from 'next/link';
import { FaqAccordion } from '@/components/marketing/FaqAccordion.client';
import { FadeInView } from '@/components/motion/FadeInView.client';
import { HOME_FAQ } from '@/constants/homepage';

export function FaqHomeSection() {
  return (
    <section aria-labelledby="faq-heading" className="home-section bg-white">
      <div className="section-container">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
          <FadeInView>
            <p className="home-section-label">FAQ</p>
            <h2 id="faq-heading" className="home-section-title mt-3">
              Renting a Bike Made Simple
            </h2>
            <p className="home-section-subtitle">
              Explore quick answers on pricing, documents, deposits, helmets, outstation rides
              & pickup locations.
            </p>
            <Link
              href="/faq"
              className="mt-8 inline-flex touch-target items-center text-sm font-semibold text-brand-600 hover:text-brand-700"
            >
              View all FAQs →
            </Link>
          </FadeInView>

          <FadeInView delay={0.1}>
            <FaqAccordion items={HOME_FAQ.slice(0, 8)} variant="light" />
          </FadeInView>
        </div>
      </div>
    </section>
  );
}
