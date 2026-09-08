'use client';

import { FadeInView } from '@/components/motion/FadeInView.client';
import { HOME_HOW_IT_WORKS } from '@/constants/homepage';
import { cn } from '@/lib/utils';

export function HowItWorksHomeSection() {
  return (
    <section aria-labelledby="how-it-works-heading" className="home-section bg-white">
      <div className="section-container">
        <FadeInView className="home-section-header">
          <p className="home-section-label">How it works</p>
          <h2 id="how-it-works-heading" className="home-section-title mt-3">
            How Bike Rental Works on OnnRide
          </h2>
          <p className="home-section-subtitle mt-4">
            Four simple steps — choose your bike, book online, pick up & ride, then return for
            deposit refund.
          </p>
        </FadeInView>

        <FadeInView className="mt-10 sm:mt-12">
          <ol className="scrollbar-hide -mx-4 flex snap-x snap-mandatory gap-4 overflow-x-auto px-4 lg:mx-0 lg:grid lg:grid-cols-4 lg:gap-6 lg:overflow-visible lg:px-0">
            {HOME_HOW_IT_WORKS.map((step, index) => (
              <li
                key={step.step}
                className="w-[calc(100%-2rem)] shrink-0 snap-start sm:w-[calc(50%-0.5rem)] lg:w-auto lg:shrink"
              >
                <article className="premium-card relative flex h-full flex-col p-6">
                  {index < HOME_HOW_IT_WORKS.length - 1 ? (
                    <span
                      className="absolute left-[calc(100%+0.5rem)] top-8 hidden h-px w-6 bg-border lg:block"
                      aria-hidden
                    />
                  ) : null}

                  <div
                    className={cn(
                      'flex h-11 w-11 items-center justify-center rounded-full',
                      'border-2 border-brand-600 bg-white text-sm font-bold text-brand-600',
                    )}
                    aria-hidden
                  >
                    {step.step}
                  </div>

                  <h3 className="mt-4 text-lg font-bold text-primary">{step.title}</h3>
                  <p className="mt-2 flex-1 text-sm leading-relaxed text-secondary">
                    {step.description}
                  </p>
                </article>
              </li>
            ))}
          </ol>

          <p className="mt-4 text-center text-xs text-muted-foreground lg:hidden">
            Swipe to see all steps
          </p>
        </FadeInView>
      </div>
    </section>
  );
}
