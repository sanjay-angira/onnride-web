'use client';

import Link from 'next/link';
import { ArrowRight, Check } from 'lucide-react';
import { FadeInView } from '@/components/motion/FadeInView.client';
import { ComparePlansTable } from '@/components/sections/home/ComparePlansTable.client';
import { Button } from '@/components/ui/Button';
import { HOME_RENTAL_PLANS } from '@/constants/homepage';
import { cn } from '@/lib/utils';

export function RentalPlansSection() {
  return (
    <section aria-labelledby="services-heading" className="home-section bg-white">
      <div className="section-container">
        <FadeInView className="home-section-header">
          <p className="home-section-label">Our services</p>
          <h2 id="services-heading" className="home-section-title mt-3">
            Your Bike, Your Way — Rentals With No Complications
          </h2>
          <p className="home-section-subtitle mt-4">
            Daily city rides or multi-day outstation trips — flexible self-drive plans for every
            kind of rider.
          </p>
        </FadeInView>

        <div className="mt-12 grid gap-6 lg:grid-cols-2 lg:gap-8">
          {HOME_RENTAL_PLANS.map((plan, index) => (
            <FadeInView key={plan.id} delay={index * 0.08}>
              <article
                className={cn(
                  'flex h-full flex-col rounded-2xl border p-6 sm:p-8',
                  plan.highlighted
                    ? 'border-brand-200 bg-brand-50/50 shadow-premium'
                    : 'border-border bg-white shadow-card',
                )}
              >
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <h3 className="text-xl font-bold text-primary">{plan.title}</h3>
                    <p className="mt-1 text-sm text-secondary">{plan.tagline}</p>
                  </div>
                  <span className="shrink-0 rounded-full bg-white px-3 py-1 text-xs font-bold text-brand-600 ring-1 ring-brand-200">
                    {plan.priceFrom}
                  </span>
                </div>

                <ul className="mt-6 flex-1 space-y-3">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-2.5 text-sm text-secondary">
                      <Check className="mt-0.5 h-4 w-4 shrink-0 text-success" aria-hidden />
                      {feature}
                    </li>
                  ))}
                </ul>

                <Link href={plan.href} className="mt-8 touch-target">
                  <Button
                    variant={plan.highlighted ? 'primary' : 'outline'}
                    size="lg"
                    className="w-full gap-2 sm:w-auto"
                  >
                    {plan.cta}
                    <ArrowRight className="h-4 w-4" aria-hidden />
                  </Button>
                </Link>
              </article>
            </FadeInView>
          ))}
        </div>

        <ComparePlansTable />
      </div>
    </section>
  );
}
