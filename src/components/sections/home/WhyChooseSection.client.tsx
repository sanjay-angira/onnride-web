'use client';

import { Bike, Calendar, Headphones, IndianRupee, MapPin, ShieldCheck, Zap } from 'lucide-react';
import { FadeInView } from '@/components/motion/FadeInView.client';
import { HOME_WHY_CHOOSE } from '@/constants/homepage';

const ICONS = {
  'shield-check': ShieldCheck,
  'indian-rupee': IndianRupee,
  zap: Zap,
  headphones: Headphones,
  calendar: Calendar,
  bike: Bike,
  'map-pin': MapPin,
} as const;

export function WhyChooseSection() {
  return (
    <section aria-labelledby="why-heading" className="home-section bg-muted">
      <div className="section-container">
        <FadeInView className="home-section-header">
          <p className="home-section-label">Why OnnRide</p>
          <h2 id="why-heading" className="home-section-title mt-3">
            Better Bikes. Better Prices. Better Experience.
          </h2>
          <p className="home-section-subtitle mt-4">
            Built for honest pricing, flexible plans, and verified fleets — without the
            headaches of bike ownership.
          </p>
        </FadeInView>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4 lg:gap-8">
          {HOME_WHY_CHOOSE.map((item, index) => {
            const Icon = ICONS[item.icon];
            return (
              <FadeInView key={item.title} delay={index * 0.08}>
                <article className="premium-card h-full p-6 sm:p-7">
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-brand-50 text-brand-600 ring-1 ring-brand-100/80">
                    <Icon className="h-5 w-5" aria-hidden />
                  </div>
                  <h3 className="mt-5 text-lg font-bold text-primary">{item.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-secondary">
                    {item.description}
                  </p>
                </article>
              </FadeInView>
            );
          })}
        </div>
      </div>
    </section>
  );
}
