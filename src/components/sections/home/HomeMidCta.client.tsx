'use client';

import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { FadeInView } from '@/components/motion/FadeInView.client';
import { Button } from '@/components/ui/Button';
import { HOME_HERO } from '@/constants/homepage';

export function HomeMidCta() {
  return (
    <section aria-labelledby="mid-cta-heading" className="home-section bg-gradient-to-br from-brand-50 via-white to-orange-50/40">
      <div className="section-container">
        <FadeInView>
          <div className="home-section-header mx-auto">
            <h2 id="mid-cta-heading" className="home-section-title">
              Ready to hit the road?
            </h2>
            <p className="home-section-subtitle mt-4">
              Search bikes & scooters in 80+ cities. Book in minutes — helmet included, deposit
              refund on return.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">
              <Link href="/search" className="touch-target">
                <Button size="lg" className="w-full gap-2 sm:w-auto">
                  {HOME_HERO.primaryCta}
                  <ArrowRight className="h-4 w-4" aria-hidden />
                </Button>
              </Link>
              <Link href="/how-it-works" className="touch-target">
                <Button size="lg" variant="outline" className="w-full sm:w-auto">
                  How it works
                </Button>
              </Link>
            </div>
          </div>
        </FadeInView>
      </div>
    </section>
  );
}
