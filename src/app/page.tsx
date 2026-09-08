import type { Metadata } from 'next';
import dynamic from 'next/dynamic';
import { Suspense } from 'react';
import { JsonLdScript } from '@/components/seo/JsonLdScript';
import { HeroSearchSection } from '@/components/sections/home/HeroSearchSection';
import { PopularCategoriesSection } from '@/components/sections/home/PopularCategoriesSection.client';
import { SectionWave } from '@/components/sections/home/SectionWave.client';
import { FeaturedBikesSection } from '@/components/sections/home/FeaturedBikesSection';
import { FeaturedBikesSkeleton } from '@/components/sections/home/FeaturedBikesSkeleton';
import { CitiesSection } from '@/components/sections/home/CitiesSection';
import { PromoBanner } from '@/components/sections/home/PromoBanner.client';
import { HomeStickyCta } from '@/components/sections/home/HomeStickyCta.client';
import { HomeDeferredChrome } from '@/components/sections/home/HomeDeferredChrome.client';
import { getLocations } from '@/lib/api';
import { buildHomeJsonLd } from '@/lib/seo/home-jsonld';
import { pageMetadata } from '@/lib/seo/metadata';
import { HOME_SEO } from '@/constants/homepage';

const StatsSection = dynamic(
  () =>
    import('@/components/sections/home/StatsSection.client').then((m) => m.StatsSection),
  { loading: () => null },
);

const RentalPlansSection = dynamic(
  () =>
    import('@/components/sections/home/RentalPlansSection.client').then(
      (m) => m.RentalPlansSection,
    ),
  { loading: () => null },
);

const WhyChooseSection = dynamic(
  () =>
    import('@/components/sections/home/WhyChooseSection.client').then(
      (m) => m.WhyChooseSection,
    ),
  { loading: () => null },
);

const HowItWorksHomeSection = dynamic(
  () =>
    import('@/components/sections/home/HowItWorksHomeSection.client').then(
      (m) => m.HowItWorksHomeSection,
    ),
  { loading: () => null },
);

const BecomePartnerSection = dynamic(
  () =>
    import('@/components/sections/home/BecomePartnerSection.client').then(
      (m) => m.BecomePartnerSection,
    ),
  { loading: () => null },
);

const ReviewsSection = dynamic(
  () =>
    import('@/components/sections/home/ReviewsSection.client').then(
      (m) => m.ReviewsSection,
    ),
  { loading: () => null },
);

const HomeMidCta = dynamic(
  () =>
    import('@/components/sections/home/HomeMidCta.client').then((m) => m.HomeMidCta),
  { loading: () => null },
);

const FaqHomeSection = dynamic(
  () =>
    import('@/components/sections/home/FaqHomeSection.client').then(
      (m) => m.FaqHomeSection,
    ),
  { loading: () => null },
);

export const metadata: Metadata = {
  ...pageMetadata({
    title: HOME_SEO.title,
    description: HOME_SEO.description,
    ogTitle: HOME_SEO.ogTitle,
    ogDescription: HOME_SEO.ogDescription,
    path: '/',
  }),
  keywords: [...HOME_SEO.keywords],
};

export const revalidate = 3600;

export default async function HomePage() {
  const locations = await getLocations();

  return (
    <div className="pb-[4.75rem] lg:pb-0">
      <JsonLdScript data={buildHomeJsonLd()} />

      <PromoBanner />
      <HeroSearchSection locations={locations} />
      <SectionWave />
      <PopularCategoriesSection />
      <Suspense fallback={<FeaturedBikesSkeleton />}>
        <FeaturedBikesSection />
      </Suspense>
      <StatsSection />
      <HowItWorksHomeSection />
      <WhyChooseSection />
      <RentalPlansSection />
      <CitiesSection />
      <ReviewsSection />
      <BecomePartnerSection />
      <HomeMidCta />
      <FaqHomeSection />

      <HomeStickyCta />
      <HomeDeferredChrome />
    </div>
  );
}
