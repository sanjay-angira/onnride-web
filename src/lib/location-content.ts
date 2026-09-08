import type { Location } from '@/types';
import {
  getLocationFaqs,
  getLocationReviewStats,
  getLocationSeo,
  type LocationFaqItem,
  type LocationReviewStats,
  type LocationSeoContent,
  type LocationSeoResponse,
} from '@/lib/api';
import { getPriorityCitySeo } from '@/lib/seo/city-keyword-seo';
import { getCityContent, type CityContent } from '@/lib/city-content';
import { filterPublicReviews } from '@/lib/seo/seed-review';

export interface ResolvedCityContent {
  h1: string | null;
  intro: string;
  aeoSummary: string;
  highlights: string[];
  areasServed: string[];
  popularRoutes: CityContent['popularRoutes'];
  vehicleTypes: CityContent['vehicleTypes'];
  pickupNote: string;
  travelTips: string[];
  pricingExplainer: string | null;
  documentsHtml: string | null;
  attractions: Array<{ name: string; description: string; distance?: string }>;
  nearbyLocationSlugs: string[];
  relatedBlogSlugs: string[];
  indexable: boolean;
  vehicleCount: number;
}

export function mergeCityContent(
  slug: string,
  location: Location,
  seoBundle: LocationSeoResponse | null,
): ResolvedCityContent {
  const fallback = getCityContent(slug);
  const db = seoBundle?.content;
  const prioritySeo = getPriorityCitySeo(slug);
  const usePriorityCopy = Boolean(prioritySeo);

  return {
    h1: usePriorityCopy
      ? (fallback.h1 ?? prioritySeo!.h1)
      : (fallback.h1 ?? db?.h1 ?? `Bike on Rent in ${location.name}`),
    intro: usePriorityCopy ? fallback.intro : (db?.intro ?? fallback.intro),
    aeoSummary: usePriorityCopy ? fallback.aeoSummary : (db?.aeoSummary ?? fallback.aeoSummary),
    highlights: db?.whyChoose ?? fallback.highlights,
    areasServed: db?.areasServed ?? fallback.areasServed,
    popularRoutes: db?.popularRoutes ?? fallback.popularRoutes,
    vehicleTypes: fallback.vehicleTypes,
    pickupNote: usePriorityCopy ? fallback.pickupNote : (db?.pickupNote ?? fallback.pickupNote),
    travelTips: db?.safetyTips ?? fallback.travelTips,
    pricingExplainer: db?.pricingExplainer ?? null,
    documentsHtml: db?.documentsHtml ?? null,
    attractions: db?.attractions ?? [],
    nearbyLocationSlugs: db?.nearbyLocationSlugs ?? [],
    relatedBlogSlugs: db?.relatedBlogSlugs ?? [],
    indexable: seoBundle?.indexable ?? location.isActive,
    vehicleCount: seoBundle?.vehicleCount ?? 0,
  };
}

function dedupeFaqs(faqs: Array<{ q: string; a: string }>): Array<{ q: string; a: string }> {
  const seen = new Set<string>();
  return faqs.filter((faq) => {
    const key = faq.q.toLowerCase();
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });
}

export function mergeFaqs(
  slug: string,
  locationName: string,
  apiFaqs: LocationFaqItem[] | null,
  fallbackContent: CityContent,
): Array<{ q: string; a: string }> {
  const api = apiFaqs?.map((f) => ({ q: f.question, a: f.answer })) ?? [];
  const keywordFaqs = fallbackContent.extraFaqs;

  if (getPriorityCitySeo(slug) && keywordFaqs.length > 0) {
    return dedupeFaqs([...keywordFaqs, ...api]);
  }

  if (api.length > 0) return api;

  return dedupeFaqs([
    {
      q: `How to rent a bike on rent in ${locationName}?`,
      a: `Search bike rental near me in ${locationName} on OnnRide — choose dates, pick a vehicle from verified vendors, and pay online.`,
    },
    ...keywordFaqs,
  ]);
}

export async function fetchCitySeoBundle(slug: string) {
  const [seoBundle, faqs, reviewStatsRaw] = await Promise.all([
    getLocationSeo(slug),
    getLocationFaqs(slug),
    getLocationReviewStats(slug),
  ]);

  // Defense in depth: hide seed/demo reviews even if API still returns them
  const reviewStats = reviewStatsRaw
    ? (() => {
        const topReviews = filterPublicReviews(reviewStatsRaw.topReviews);
        const reviewCount = topReviews.length;
        const averageRating =
          reviewCount > 0
            ? Math.round(
                (topReviews.reduce((sum, r) => sum + r.rating, 0) / reviewCount) * 10,
              ) / 10
            : 0;
        return {
          ...reviewStatsRaw,
          topReviews,
          reviewCount,
          averageRating,
          includeAggregateRating:
            reviewStatsRaw.includeAggregateRating && reviewCount >= 5 && averageRating > 0,
        };
      })()
    : null;

  return { seoBundle, faqs, reviewStats };
}

export type { LocationSeoContent, LocationSeoResponse, LocationFaqItem, LocationReviewStats };
