'use client';

import { FadeInView } from '@/components/motion/FadeInView.client';
import { HOME_PRICING_PLANS } from '@/constants/homepage';

export function PricingPlansSection() {
  return (
    <section aria-labelledby="pricing-heading" className="home-section bg-muted">
      <div className="section-container">
        <FadeInView className="mx-auto max-w-2xl text-center">
          <p className="home-section-label">Flexible pricing</p>
          <h2 id="pricing-heading" className="home-section-title mt-3">
            Choose a Plan That Works for You
          </h2>
          <p className="home-section-subtitle mx-auto">
            Daily commutes, weekend getaways, or extended tours — transparent rates with no hidden
            charges.
          </p>
        </FadeInView>

        <div className="mt-12 grid gap-5 sm:grid-cols-3">
          {HOME_PRICING_PLANS.map((plan, index) => (
            <FadeInView key={plan.name} delay={index * 0.08}>
              <article className="premium-card h-full p-6 text-center sm:p-7">
                <h3 className="text-lg font-bold text-primary">{plan.name}</h3>
                <p className="mt-2 text-sm text-secondary">{plan.description}</p>
                <p className="mt-5 font-bold text-primary">
                  <span className="text-2xl text-brand-600">{plan.from}</span>
                  <span className="ml-1 text-sm font-normal text-secondary">{plan.period}</span>
                </p>
              </article>
            </FadeInView>
          ))}
        </div>
      </div>
    </section>
  );
}
