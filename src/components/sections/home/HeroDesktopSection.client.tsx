'use client';

import Image from 'next/image';
import { Suspense } from 'react';
import { HomeSearchForm } from '@/features/search/HomeSearchForm.client';
import {
  HeroHeadline,
  HeroTrustChipList,
} from '@/components/sections/home/hero-headline';
import { HOME_HERO } from '@/constants/homepage';
import type { Location } from '@/types';

function SearchSkeleton() {
  return (
    <div
      className="h-[260px] animate-pulse rounded-2xl bg-white shadow-elevated ring-1 ring-black/[0.06]"
      aria-hidden
    />
  );
}

export function HeroDesktopSection({ locations }: { locations: Location[] }) {
  return (
    <div className="section-container relative hidden py-8 lg:block lg:py-10">
      <div className="grid grid-cols-2 items-center gap-10 xl:gap-14">
        <div className="h-[360px] w-full xl:h-[420px]">
          <div className="relative h-full min-h-[360px] w-full overflow-hidden rounded-3xl shadow-premium xl:min-h-[420px]">
            <Image
              src={HOME_HERO.image}
              alt={HOME_HERO.imageAlt}
              fill
              priority
              sizes="(min-width: 1280px) 640px, 50vw"
              quality={75}
              className="object-cover"
            />
            <div
              className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/35 to-black/10"
              aria-hidden
            />
            <div className="absolute bottom-0 left-0 right-0 space-y-3 p-6 sm:p-8">
              <h2 className="text-4xl font-bold leading-[1.12] tracking-tight text-white xl:text-[2.75rem]">
                <HeroHeadline accentClassName="text-brand-300" stacked />
              </h2>
              <p className="max-w-md text-sm leading-relaxed text-white/80">{HOME_HERO.subheading}</p>
            </div>
          </div>
        </div>

        <div className="relative z-10 flex min-h-[360px] flex-col justify-center xl:min-h-[420px]">
          <Suspense fallback={<SearchSkeleton />}>
            <HomeSearchForm locations={locations} variant="homepage" />
          </Suspense>
        </div>

        <div className="col-span-2 flex justify-center">
          <HeroTrustChipList />
        </div>
      </div>
    </div>
  );
}
