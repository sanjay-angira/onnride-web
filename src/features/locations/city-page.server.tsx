import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { CityLandingPage } from '@/features/locations/CityLandingPage';
import {
  getLocationBySlug,
  getLocationCategoryPage,
  getLocations,
  getPickupPoints,
} from '@/lib/api';
import { getCityContent } from '@/lib/city-content';
import {
  fetchCitySeoBundle,
  mergeCityContent,
  mergeFaqs,
} from '@/lib/location-content';
import {
  buildLocationJsonLd,
  buildLocationKeywords,
  geoRegionForState,
  resolveLocationSeo,
} from '@/lib/location-seo';
import { getPriorityCitySeo } from '@/lib/seo/city-keyword-seo';
import { pageMetadata } from '@/lib/seo/metadata';
import { getPublicSettingsMap } from '@/lib/public-settings';
import type { VehicleClass } from '@/types';
import { CONTACT } from '@/lib/site-content';

export const revalidate = 3600;

export interface CityPageOptions {
  basePath?: string;
  hubLabel?: string;
  defaultVehicleClass?: VehicleClass;
}

interface CityPageProps {
  params: Promise<{ city: string }>;
}

export async function generateCityMetadata(
  slug: string,
  options: CityPageOptions = {},
): Promise<Metadata> {
  const basePath = options.basePath ?? '/bike-rental';
  const isCarHub = options.defaultVehicleClass === 'FOUR_WHEELER';
  const location = await getLocationBySlug(slug);
  if (!location) return { title: 'City not found' };

  const { seoBundle } = await fetchCitySeoBundle(slug);
  const content = mergeCityContent(slug, location, seoBundle);
  const fallback = getCityContent(slug);
  const seo = resolveLocationSeo(slug, location);
  // Bike-priority Semrush copy must not override car-rental city pages
  const prioritySeo = isCarHub ? null : getPriorityCitySeo(slug);
  const primaryKw = seoBundle?.keywords.find((k) => k.priority === 'primary');

  const title =
    prioritySeo?.metaTitle ??
    (isCarHub
      ? `Car Rental in ${location.name} — Self-Drive Hatchback, Sedan & SUV | OnnRide`
      : (seo.metaTitle ??
        (primaryKw ? `${primaryKw.keyword} | OnnRide` : `Bike on Rent in ${location.name} | OnnRide`)));
  const description =
    prioritySeo?.metaDescription ??
    (isCarHub
      ? `Self-drive car rental in ${location.name}. Compare hatchbacks, sedans & SUVs from verified vendors — transparent daily rates on OnnRide.`
      : (seo.metaDescription ?? content.aeoSummary ?? fallback.aeoSummary));
  const keywords = prioritySeo
    ? buildLocationKeywords(location, fallback)
    : seoBundle?.keywords.length
      ? seoBundle.keywords.map((k) => k.keyword)
      : buildLocationKeywords(location, fallback);

  const lat = Number.parseFloat(location.latitude);
  const lng = Number.parseFloat(location.longitude);
  const hasGeo = Number.isFinite(lat) && Number.isFinite(lng) && !(lat === 0 && lng === 0);
  const geoRegion = geoRegionForState(location.state);

  let noindex = !content.indexable;
  if (isCarHub && !noindex) {
    const carPages = await Promise.all(
      (['hatchback', 'sedan', 'suv', 'muv'] as const).map((segment) =>
        getLocationCategoryPage(slug, segment),
      ),
    );
    const hasCars = carPages.some((page) => (page?.vehicleCount ?? 0) > 0);
    noindex = !hasCars;
  }

  const base = pageMetadata({
    title,
    description,
    path: `${basePath}/${slug}`,
    noindex,
  });

  return {
    ...base,
    keywords,
    ...(geoRegion || hasGeo
      ? {
          other: {
            ...(geoRegion ? { 'geo.region': geoRegion } : {}),
            'geo.placename': location.name,
            ...(hasGeo ? { 'geo.position': `${lat};${lng}`, ICBM: `${lat}, ${lng}` } : {}),
          },
        }
      : {}),
  };
}

export async function renderCityPage(slug: string, options: CityPageOptions = {}) {
  const [location, locations, pickupPoints, settings, bundle] = await Promise.all([
    getLocationBySlug(slug),
    getLocations(),
    getPickupPoints(slug),
    getPublicSettingsMap(),
    fetchCitySeoBundle(slug),
  ]);

  if (!location) notFound();

  const content = mergeCityContent(slug, location, bundle.seoBundle);
  const fallback = getCityContent(slug);
  const seo = resolveLocationSeo(slug, location);
  const faqs = mergeFaqs(slug, location.name, bundle.faqs, fallback);

  const phone = seo.supportPhone ?? settings.platform_phone ?? CONTACT.phone;
  const whatsapp = seo.supportPhone ?? settings.platform_whatsapp ?? CONTACT.whatsapp;
  const email = settings.platform_email ?? CONTACT.email;

  const nearbySlugs = content.nearbyLocationSlugs;
  const nearbyCities =
    nearbySlugs.length > 0
      ? locations.filter((l) => nearbySlugs.includes(l.slug))
      : locations.filter((l) => l.slug !== slug).slice(0, 8);

  const basePath = options.basePath ?? '/bike-rental';
  const jsonLdBlocks = buildLocationJsonLd({
    location: { ...location, metaTitle: seo.metaTitle, metaDescription: seo.metaDescription },
    slug,
    content: {
      intro: content.intro,
      aeoSummary: content.aeoSummary,
      areasServed: content.areasServed,
    },
    faqs,
    contactPhone: phone,
    contactEmail: email,
    basePath,
    reviewStats: bundle.reviewStats
      ? {
          reviewCount: bundle.reviewStats.reviewCount,
          averageRating: bundle.reviewStats.averageRating,
          includeAggregateRating: bundle.reviewStats.includeAggregateRating,
        }
      : undefined,
  });

  return (
    <CityLandingPage
      slug={slug}
      location={location}
      locations={locations}
      pickupPoints={pickupPoints}
      content={content}
      faqs={faqs}
      phone={phone}
      whatsapp={whatsapp}
      email={email}
      jsonLdBlocks={jsonLdBlocks}
      reviewStats={bundle.reviewStats}
      nearbyCities={nearbyCities}
      basePath={options.basePath}
      hubLabel={options.hubLabel}
      defaultVehicleClass={options.defaultVehicleClass}
    />
  );
}

export async function BikeRentalCityPage({ params }: CityPageProps) {
  const { city } = await params;
  return renderCityPage(city);
}

export async function CarRentalCityPage({ params }: CityPageProps) {
  const { city } = await params;
  return renderCityPage(city, {
    basePath: '/car-rental',
    hubLabel: 'Car rental',
    defaultVehicleClass: 'FOUR_WHEELER',
  });
}

export async function generateCarCityMetadata(slug: string): Promise<Metadata> {
  return generateCityMetadata(slug, {
    basePath: '/car-rental',
    hubLabel: 'Car rental',
    defaultVehicleClass: 'FOUR_WHEELER',
  });
}
