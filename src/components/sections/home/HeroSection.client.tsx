'use client';

import Link from 'next/link';
import { motion, useReducedMotion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { FloatingElement } from '@/components/motion/FloatingElement.client';
import { HeroBikeIllustration } from '@/components/sections/home/HeroBikeIllustration.client';
import { HOME_HERO } from '@/constants/homepage';

export function HeroSection() {
  const prefersReducedMotion = useReducedMotion();

  return (
    <section
      aria-labelledby="hero-heading"
      className="relative overflow-hidden bg-white pt-8 sm:pt-12 lg:pt-16"
    >
      <div className="absolute inset-0 bg-hero-subtle" aria-hidden />
      <div className="absolute inset-0 bg-section-grid bg-grid opacity-30" aria-hidden />

      <div className="section-container relative">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16 xl:gap-20">
          <motion.div
            initial={prefersReducedMotion ? false : { opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.21, 0.47, 0.32, 0.98] }}
          >
            <span className="inline-flex items-center rounded-full border border-border bg-muted px-4 py-1.5 text-sm font-medium text-secondary">
              {HOME_HERO.badge}
            </span>

            <h1
              id="hero-heading"
              className="mt-6 text-[2rem] font-bold leading-[1.12] tracking-tight text-primary sm:text-[2.75rem] lg:text-[3.25rem] xl:text-[3.5rem]"
            >
              {HOME_HERO.headline}
            </h1>

            <p className="mt-5 max-w-lg text-base leading-relaxed text-secondary sm:text-lg">
              {HOME_HERO.subheading}
            </p>

            <p className="mt-4 flex items-baseline gap-1">
              <span className="text-sm font-medium text-secondary">Starting from</span>
              <span className="text-2xl font-bold text-brand-600">{HOME_HERO.priceFrom}</span>
              <span className="text-sm text-secondary">{HOME_HERO.priceUnit}</span>
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
              <Link href="/search" className="touch-target">
                <Button size="lg" className="w-full gap-2 sm:w-auto">
                  {HOME_HERO.primaryCta}
                  <ArrowRight className="h-4 w-4" aria-hidden />
                </Button>
              </Link>
              <Link href="/list-your-bike" className="touch-target">
                <Button variant="outline" size="lg" className="w-full sm:w-auto">
                  {HOME_HERO.secondaryCta}
                </Button>
              </Link>
            </div>

            <p className="mt-6 text-sm text-muted-foreground">{HOME_HERO.trustLine}</p>
          </motion.div>

          <motion.div
            initial={prefersReducedMotion ? false : { opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.15, ease: [0.21, 0.47, 0.32, 0.98] }}
            className="relative mx-auto w-full max-w-lg lg:max-w-none lg:justify-self-end"
          >
            <FloatingElement className="relative" duration={6} offset={14}>
              <HeroBikeIllustration />
            </FloatingElement>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
