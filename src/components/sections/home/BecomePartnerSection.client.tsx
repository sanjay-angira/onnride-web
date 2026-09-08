'use client';

import Link from 'next/link';
import { ArrowRight, CheckCircle2 } from 'lucide-react';
import { FadeInView } from '@/components/motion/FadeInView.client';
import { Button } from '@/components/ui/Button';
import { HOME_PARTNER } from '@/constants/homepage';

export function BecomePartnerSection() {
  return (
    <section aria-labelledby="partner-heading" className="home-section bg-primary text-white">
      <div className="section-container">
        <FadeInView>
          <div className="mx-auto max-w-3xl text-center">
            <p className="text-xs font-semibold uppercase tracking-[0.15em] text-brand-300">
              Partner program
            </p>
            <h2 id="partner-heading" className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl lg:text-[2.75rem]">
              {HOME_PARTNER.headline}
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-base leading-relaxed text-slate-300 sm:text-lg">
              {HOME_PARTNER.description}
            </p>

            <div className="mt-8 flex flex-wrap items-center justify-center gap-x-6 gap-y-3">
              {HOME_PARTNER.trustIndicators.map((item) => (
                <span
                  key={item}
                  className="inline-flex items-center gap-2 text-sm text-slate-300"
                >
                  <CheckCircle2 className="h-4 w-4 text-success" aria-hidden />
                  {item}
                </span>
              ))}
            </div>

            <Link href="/list-your-bike" className="mt-10 inline-block touch-target">
              <Button
                size="lg"
                className="gap-2 bg-white text-primary hover:bg-slate-100"
              >
                {HOME_PARTNER.cta}
                <ArrowRight className="h-4 w-4" aria-hidden />
              </Button>
            </Link>
          </div>
        </FadeInView>
      </div>
    </section>
  );
}
