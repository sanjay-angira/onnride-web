import type { Location } from '@/types';
import type { CityContent } from '@/lib/city-content';
import { getPriorityCitySeo, PRIORITY_CITY_SEO } from '@/lib/seo/city-keyword-seo';
import { cityNearMeKeywords, mergeKeywords } from '@/lib/seo/primary-keywords';
import { SITE_NAME } from '@/lib/seo/metadata';
import { OG_IMAGE_SIZE, pickVariantUrl } from '@/lib/image-variants';
import { absoluteUrl, getSiteUrl } from '@/lib/seo/site-url';

export { getSiteUrl, absoluteUrl };

/** Mirrors backend `location-seo.seed.ts` — used when DB fields are not yet patched. */
export const LOCATION_SEO_FALLBACK: Record<
  string,
  { metaTitle: string; metaDescription: string; supportPhone?: string }
> = {
  goa: {
    metaTitle: 'Bike Rental in Goa — Self-Drive Scooters & Bikes | OnnRide',
    metaDescription:
      'Rent self-drive scooters and bikes in Goa from verified vendors. Dabolim Airport & Calangute pickup, helmet included, secure online booking. North & South Goa rides.',
    supportPhone: '+918321234567',
  },
  bengaluru: {
    metaTitle: 'Bike Rental in Bengaluru — Self-Drive Two-Wheelers | OnnRide',
    metaDescription:
      'Rent bikes and scooters in Bengaluru for commute and weekend trips. Airport and KSR pickup points, verified vendors, book online on OnnRide.',
  },
  ...Object.fromEntries(
    Object.entries(PRIORITY_CITY_SEO).map(([slug, seo]) => [
      slug,
      { metaTitle: seo.metaTitle, metaDescription: seo.metaDescription },
    ]),
  ),
};

export function resolveLocationSeo(slug: string, location: Location) {
  const fallback = LOCATION_SEO_FALLBACK[slug];
  return {
    metaTitle: location.metaTitle ?? fallback?.metaTitle ?? null,
    metaDescription: location.metaDescription ?? fallback?.metaDescription ?? null,
    supportPhone: location.supportPhone ?? fallback?.supportPhone ?? null,
  };
}

export function geoRegionForState(state: string | null): string | undefined {
  if (!state) return undefined;
  const map: Record<string, string> = {
    Goa: 'IN-GA',
    Delhi: 'IN-DL',
    Karnataka: 'IN-KA',
    Maharashtra: 'IN-MH',
    Rajasthan: 'IN-RJ',
    'Himachal Pradesh': 'IN-HP',
    Kerala: 'IN-KL',
    'Tamil Nadu': 'IN-TN',
    'West Bengal': 'IN-WB',
    Telangana: 'IN-TG',
    'Uttar Pradesh': 'IN-UP',
  };
  return map[state];
}

export interface LocationFaq {
  q: string;
  a: string;
}

export function buildLocationFaqs(
  locationName: string,
  content: CityContent,
): LocationFaq[] {
  return [
    {
      q: `How to rent a bike on rent in ${locationName}?`,
      a: `Search bike rental near me in ${locationName} on OnnRide — choose dates, pick a vehicle from verified vendors, and pay online.`,
    },
    {
      q: `What documents are required for bike rental in ${locationName}?`,
      a: 'Valid driving licence and Aadhaar. Upload from your profile after booking. Learner licences are not accepted.',
    },
    {
      q: 'Is the security deposit refundable?',
      a: 'Yes — released after safe return per vendor inspection and platform deposit rules. Damage claims may adjust the refund.',
    },
    {
      q: 'Are helmets included?',
      a: 'One complimentary helmet is included with every rental. Add an extra helmet at checkout if needed.',
    },
    ...content.extraFaqs,
  ];
}

export function buildLocationKeywords(
  location: Location,
  content: CityContent,
): string[] {
  const priority = getPriorityCitySeo(location.slug);
  const nearMe = cityNearMeKeywords(location.name);

  if (priority) {
    return mergeKeywords(priority.keywords, nearMe);
  }

  const city = location.name;
  const base = [
    ...nearMe,
    `scooter rental ${city}`,
    `self drive bike ${city}`,
    `${city} bike rent`,
    `rent a scooter in ${city}`,
    `two wheeler rental ${city}`,
    `OnnRide ${city}`,
  ];
  if (content.areasServed.length > 0) {
    for (const area of content.areasServed.slice(0, 4)) {
      base.push(`bike rental ${area}`);
    }
  }
  return base;
}

interface JsonLdInput {
  location: Location;
  slug: string;
  content: CityContent | { intro: string; aeoSummary: string; areasServed: string[] };
  faqs: LocationFaq[];
  contactPhone: string;
  contactEmail: string;
  /** Default `/bike-rental` — legacy `/locations` still 301s here */
  basePath?: string;
  reviewStats?: { reviewCount: number; averageRating: number; includeAggregateRating: boolean };
}

/** Normalize country for Schema.org (ISO 3166-1 alpha-2). */
export function schemaAddressCountry(country: string | null | undefined): string {
  if (!country) return 'IN';
  const trimmed = country.trim();
  if (/^[A-Za-z]{2}$/.test(trimmed)) return trimmed.toUpperCase();
  const map: Record<string, string> = {
    india: 'IN',
    'united states': 'US',
    usa: 'US',
  };
  return map[trimmed.toLowerCase()] ?? trimmed;
}

export function buildLocationJsonLd({
  location,
  slug,
  content,
  faqs,
  contactPhone,
  contactEmail,
  basePath = '/bike-rental',
  reviewStats,
}: JsonLdInput): Record<string, unknown>[] {
  const siteUrl = getSiteUrl();
  const pageUrl = `${siteUrl}${basePath}/${slug}`;
  const hubPath = basePath;
  const isCarHub = basePath === '/car-rental';
  const hubLabel = isCarHub ? 'Car rental' : basePath === '/bike-rental' ? 'Bike rental' : 'Locations';
  const serviceName = isCarHub
    ? `Self-drive car rental in ${location.name}`
    : `Self-drive bike and scooter rental in ${location.name}`;
  const lat = Number.parseFloat(location.latitude);
  const lng = Number.parseFloat(location.longitude);
  const hasGeo = Number.isFinite(lat) && Number.isFinite(lng) && !(lat === 0 && lng === 0);

  const localBusiness: Record<string, unknown> = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    '@id': `${pageUrl}#business`,
    name: `${SITE_NAME} — ${isCarHub ? 'Car' : 'Bike'} rental in ${location.name}`,
    description: content.intro,
    url: pageUrl,
    telephone: contactPhone,
    email: contactEmail,
    image:
      pickVariantUrl(location.displayImages, OG_IMAGE_SIZE) ??
      location.heroImageUrl ??
      absoluteUrl('/opengraph-image'),
    priceRange: '₹₹',
    areaServed: content.areasServed.length
      ? content.areasServed.map((area) => ({ '@type': 'Place', name: area }))
      : { '@type': 'City', name: location.name },
    address: {
      '@type': 'PostalAddress',
      addressLocality: location.name,
      addressRegion: location.state ?? undefined,
      addressCountry: schemaAddressCountry(location.country),
    },
    parentOrganization: {
      '@type': 'Organization',
      name: SITE_NAME,
      url: siteUrl,
    },
    makesOffer: {
      '@type': 'Offer',
      itemOffered: {
        '@type': 'Service',
        name: serviceName,
        serviceType: 'Vehicle rental',
        provider: { '@id': `${pageUrl}#business` },
      },
    },
  };

  if (hasGeo) {
    localBusiness.geo = {
      '@type': 'GeoCoordinates',
      latitude: lat,
      longitude: lng,
    };
  }

  if (reviewStats?.includeAggregateRating) {
    localBusiness.aggregateRating = {
      '@type': 'AggregateRating',
      ratingValue: reviewStats.averageRating,
      reviewCount: reviewStats.reviewCount,
      bestRating: 5,
      worstRating: 1,
    };
  }

  return [
    localBusiness,
    {
      '@context': 'https://schema.org',
      '@type': 'WebPage',
      '@id': `${pageUrl}#webpage`,
      url: pageUrl,
      name:
        location.metaTitle ??
        `Self-Drive ${isCarHub ? 'Car' : 'Bike'} Rental in ${location.name} | ${SITE_NAME}`,
      description: location.metaDescription ?? content.intro,
      isPartOf: { '@type': 'WebSite', name: SITE_NAME, url: siteUrl },
      about: { '@id': `${pageUrl}#business` },
      inLanguage: 'en-IN',
    },
    {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: siteUrl },
        { '@type': 'ListItem', position: 2, name: hubLabel, item: `${siteUrl}${hubPath}` },
        { '@type': 'ListItem', position: 3, name: location.name, item: pageUrl },
      ],
    },
    {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: faqs.map((faq) => ({
        '@type': 'Question',
        name: faq.q,
        acceptedAnswer: { '@type': 'Answer', text: faq.a },
      })),
    },
    ...(hasGeo
      ? [
          {
            '@context': 'https://schema.org',
            '@type': 'TouristDestination',
            name: location.name,
            description: content.aeoSummary,
            geo: { '@type': 'GeoCoordinates', latitude: lat, longitude: lng },
            containedInPlace: {
              '@type': 'AdministrativeArea',
              name: location.state ?? location.country,
            },
          },
        ]
      : []),
  ];
}

export function digitsOnly(phone: string): string {
  return phone.replace(/\D/g, '');
}

export function telHref(phone: string): string {
  return `tel:+${digitsOnly(phone)}`;
}

export function waHref(phone: string, message?: string): string {
  const digits = digitsOnly(phone);
  const base = `https://wa.me/${digits}`;
  if (!message) return base;
  return `${base}?text=${encodeURIComponent(message)}`;
}

export function mailHref(email: string): string {
  return `mailto:${email}`;
}
