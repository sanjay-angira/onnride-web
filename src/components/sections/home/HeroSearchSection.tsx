import { Suspense } from 'react';
import { HomeSearchForm } from '@/features/search/HomeSearchForm.client';
import { HeroDecorations } from '@/components/sections/home/HeroDecorations';
import { HeroDesktopSection } from '@/components/sections/home/HeroDesktopSection.client';
import { HeroStaticImage } from '@/components/sections/home/HeroStaticImage';
import {
  HeroHeadline,
  HeroTrustChipList,
} from '@/components/sections/home/hero-headline';
import { HOME_HERO } from '@/constants/homepage';
import type { Location } from '@/types';

interface HeroSearchSectionProps {
  locations: Location[];
}

function SearchSkeleton() {
  return (
    <div
      className="h-[420px] animate-pulse rounded-2xl bg-white shadow-elevated ring-1 ring-black/[0.06] sm:h-[380px]"
      aria-hidden
    />
  );
}

/** Server-rendered hero — headline, LCP image & copy in first HTML. */
export function HeroSearchSection({ locations }: HeroSearchSectionProps) {
  return (
    <section aria-labelledby="hero-heading" className="relative overflow-hidden bg-white" data-home-hero>
      <div className="hero-mesh" aria-hidden />
      <div className="hero-grid" aria-hidden />
      <HeroDecorations />

      {/* Mobile: SSR text + self-hosted LCP image */}
      <div className="relative overflow-x-hidden lg:hidden">
        <div className="relative min-h-[min(680px,90vh)] sm:min-h-[min(720px,92vh)]">
          <div className="absolute inset-0 overflow-hidden" aria-hidden>
            <HeroStaticImage priority sizes="100vw" className="absolute inset-0" />
            <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/20 to-black/[0.92]" />
          </div>

          <div className="relative z-10 flex min-h-[inherit] flex-col">
            <div className="px-4 pb-2 pt-5 sm:px-6 sm:pt-6">
              <p className="mb-2 inline-flex rounded-full bg-brand-500/90 px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-white shadow-sm ring-1 ring-white/20">
                {HOME_HERO.badge}
              </p>
              <h1
                id="hero-heading"
                className="text-[1.75rem] font-bold leading-[1.12] tracking-tight text-white drop-shadow-[0_2px_16px_rgba(0,0,0,0.45)] sm:text-3xl"
              >
                <HeroHeadline accentClassName="text-brand-300" stacked />
              </h1>
              <p className="mt-2.5 max-w-xs text-sm leading-relaxed text-white/85 drop-shadow-sm">
                {HOME_HERO.subheading}
              </p>
            </div>

            <div className="min-h-4 flex-1 sm:min-h-6" aria-hidden />

            <div className="px-4 pb-6 pt-2 sm:px-6 sm:pb-8">
              <Suspense fallback={<SearchSkeleton />}>
                <HomeSearchForm locations={locations} variant="homepage" overlay />
              </Suspense>
              <HeroTrustChipList onDark className="mt-5 justify-center sm:mt-6" />
            </div>
          </div>
        </div>
      </div>

      <HeroDesktopSection locations={locations} />
    </section>
  );
}
