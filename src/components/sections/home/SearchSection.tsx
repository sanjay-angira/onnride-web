import { Suspense } from 'react';
import { FadeInView } from '@/components/motion/FadeInView.client';
import { HomeSearchForm } from '@/features/search/HomeSearchForm.client';
import type { Location } from '@/types';

interface SearchSectionProps {
  locations: Location[];
}

function SearchSkeleton() {
  return (
    <div
      className="h-[220px] animate-pulse rounded-2xl border border-border bg-muted sm:h-[120px]"
      aria-hidden
    />
  );
}

export function SearchSection({ locations }: SearchSectionProps) {
  return (
    <section aria-labelledby="search-heading" className="relative bg-white pb-16 sm:pb-20">
      <div className="section-container">
        <FadeInView>
          <div className="mx-auto max-w-5xl">
            <h2 id="search-heading" className="sr-only">
              Search bike rental by location and dates
            </h2>
            <Suspense fallback={<SearchSkeleton />}>
              <HomeSearchForm locations={locations} variant="premium" />
            </Suspense>
          </div>
        </FadeInView>
      </div>
    </section>
  );
}
