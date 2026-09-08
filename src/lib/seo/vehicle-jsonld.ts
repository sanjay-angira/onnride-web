import type { Vehicle, VehiclePublishedReview } from '@/types';
import { buildMerchantOfferExtras } from '@/lib/seo/merchant-offer';
import { absoluteUrl } from '@/lib/seo/site-url';
import { resolveVehicleListingImageUrls } from '@/lib/vehicle-image';

const MAX_JSONLD_REVIEWS = 5;

function resolveProductImages(vehicle: Vehicle): string[] {
  return resolveVehicleListingImageUrls(vehicle);
}

function resolveSku(vehicle: Vehicle): string {
  const registration = vehicle.registrationNumber?.replace(/\s+/g, '').trim();
  if (registration) return registration;
  return `onnride-${vehicle.id}`;
}

function resolveAvailability(status: string | undefined): string {
  const normalized = status?.toUpperCase();
  if (normalized === 'ACTIVE' || normalized === 'AVAILABLE') {
    return 'https://schema.org/InStock';
  }
  if (normalized === 'MAINTENANCE' || normalized === 'LIMITED') {
    return 'https://schema.org/LimitedAvailability';
  }
  return 'https://schema.org/OutOfStock';
}

function resolveRentalHubPath(vehicle: Vehicle): string | null {
  const citySlug = vehicle.location?.slug;
  if (!citySlug) return null;
  return vehicle.vehicleClass === 'FOUR_WHEELER'
    ? `/car-rental/${citySlug}`
    : `/bike-rental/${citySlug}`;
}

function buildReviewSchema(reviews: VehiclePublishedReview[]): Record<string, unknown>[] {
  return reviews
    .filter((entry) => entry.rating >= 1 && entry.rating <= 5)
    .slice(0, MAX_JSONLD_REVIEWS)
    .map((entry) => ({
      '@type': 'Review',
      author: {
        '@type': 'Person',
        name: entry.authorName,
      },
      datePublished: entry.createdAt.slice(0, 10),
      ...(entry.review ? { reviewBody: entry.review } : {}),
      reviewRating: {
        '@type': 'Rating',
        ratingValue: entry.rating,
        bestRating: 5,
        worstRating: 1,
      },
    }));
}

function attachReviewSchema(
  product: Record<string, unknown>,
  vehicle: Vehicle,
): void {
  const reviewCount = vehicle.reviewCount ?? 0;
  const avgRating = vehicle.avgRating;
  const reviewEntries = buildReviewSchema(vehicle.publishedReviews ?? []);

  if (reviewCount > 0 && avgRating != null) {
    product.aggregateRating = {
      '@type': 'AggregateRating',
      ratingValue: avgRating,
      reviewCount,
      bestRating: 5,
      worstRating: 1,
    };
  }

  if (reviewEntries.length === 1) {
    product.review = reviewEntries[0];
  } else if (reviewEntries.length > 1) {
    product.review = reviewEntries;
  }
}

export function buildVehicleJsonLd(vehicle: Vehicle): Record<string, unknown>[] {
  const slug = vehicle.slug ?? String(vehicle.id);
  const url = absoluteUrl(`/vehicles/${slug}`);
  const name = [vehicle.brand?.name, vehicle.model].filter(Boolean).join(' ');
  const city = vehicle.location?.name ?? 'India';
  const citySlug = vehicle.location?.slug;
  const price = Number.parseFloat(vehicle.pricePerDay);
  const merchantOffer = buildMerchantOfferExtras();

  const product: Record<string, unknown> = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    '@id': `${url}#product`,
    name,
    description: vehicle.description ?? `Rent ${name} in ${city} on OnnRide.`,
    url,
    sku: resolveSku(vehicle),
    productID: vehicle.id,
    brand: vehicle.brand?.name
      ? { '@type': 'Brand', name: vehicle.brand.name }
      : undefined,
    image: resolveProductImages(vehicle),
    category: vehicle.category?.name,
    additionalType: 'https://schema.org/Vehicle',
    offers: {
      '@type': 'Offer',
      url,
      priceCurrency: 'INR',
      price: Number.isFinite(price) && price > 0 ? price : undefined,
      availability: resolveAvailability(vehicle.status),
      seller: {
        '@type': 'Organization',
        name: 'OnnRide',
        url: absoluteUrl(''),
      },
      ...merchantOffer,
    },
  };

  attachReviewSchema(product, vehicle);

  const hubPath = resolveRentalHubPath(vehicle);
  const breadcrumbs = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: absoluteUrl('') },
      ...(citySlug && hubPath
        ? [
            {
              '@type': 'ListItem',
              position: 2,
              name: city,
              item: absoluteUrl(hubPath),
            },
          ]
        : []),
      {
        '@type': 'ListItem',
        position: citySlug ? 3 : 2,
        name,
        item: url,
      },
    ],
  };

  if (vehicle.location?.launchStatus === 'coming_soon') {
    return [breadcrumbs];
  }

  return [product, breadcrumbs];
}
