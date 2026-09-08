import type { Vehicle } from '@/types';
import { absoluteUrl } from '@/lib/seo/site-url';
import {
  CARD_IMAGE_SIZE,
  DETAIL_IMAGE_SIZE,
  legacyUrlToVariants,
  OG_IMAGE_SIZE,
  pickVariantUrl,
  type ImageVariantKey,
  type ImageVariants,
} from '@/lib/image-variants';

/** Static bike photo used when inventory has no upload — must match visible page media for Google Merchant validation. */
export const DEFAULT_VEHICLE_LISTING_IMAGE = '/hero.webp';

/** Dev/demo placeholder hosts — show gradient art instead of dark text boxes. */
export function isDevPlaceholderImage(url: string): boolean {
  try {
    const { hostname } = new URL(url);
    return (
      hostname.includes('placehold.co') ||
      hostname.includes('placeholder.com') ||
      hostname.includes('dummyimage.com')
    );
  } catch {
    return true;
  }
}

function variantsFromLegacyUrl(url: string | null | undefined): ImageVariants | null {
  const trimmed = url?.trim();
  if (!trimmed || isDevPlaceholderImage(trimmed)) return null;
  return legacyUrlToVariants(trimmed);
}

/** Resolved variants: vehicle media → legacy vehicle image → model media → category → brand → null */
export function resolveVehicleDisplayVariants(vehicle: Vehicle): ImageVariants | null {
  if (vehicle.displayImages) return vehicle.displayImages;

  const legacyPrimary = vehicle.images?.find((img) => img.isPrimary) ?? vehicle.images?.[0];
  return (
    variantsFromLegacyUrl(legacyPrimary?.imageUrl) ??
    vehicle.modelDisplayImages ??
    vehicle.category?.displayImages ??
    variantsFromLegacyUrl(vehicle.category?.icon) ??
    vehicle.brand?.displayImages ??
    variantsFromLegacyUrl(vehicle.brand?.logo) ??
    null
  );
}

export function resolveVehicleImageUrl(
  vehicle: Vehicle,
  size: ImageVariantKey = CARD_IMAGE_SIZE,
): string | null {
  return pickVariantUrl(resolveVehicleDisplayVariants(vehicle), size);
}

export function resolveVehicleImageUrls(vehicle: Vehicle): string[] {
  const variants = resolveVehicleDisplayVariants(vehicle);
  if (!variants) return [];

  const ordered = [
    variants[DETAIL_IMAGE_SIZE],
    variants.w1200,
    variants.w900,
    variants.w300,
    variants.thumb,
  ].filter((url, index, list): url is string => Boolean(url) && list.indexOf(url) === index);

  return ordered;
}

/** Image path/URL for UI (`next/image` accepts local `/public` paths as-is). */
export function resolveVehicleListingImageUrl(
  vehicle: Vehicle,
  size: ImageVariantKey = CARD_IMAGE_SIZE,
): string {
  return resolveVehicleImageUrl(vehicle, size) ?? DEFAULT_VEHICLE_LISTING_IMAGE;
}

/** Absolute URL for Open Graph and JSON-LD. */
export function resolveVehicleListingImageAbsoluteUrl(vehicle: Vehicle): string {
  const url =
    pickVariantUrl(resolveVehicleDisplayVariants(vehicle), OG_IMAGE_SIZE) ??
    DEFAULT_VEHICLE_LISTING_IMAGE;
  return url.startsWith('/') ? absoluteUrl(url) : url;
}

export function resolveVehicleListingImageUrls(vehicle: Vehicle): string[] {
  return [resolveVehicleListingImageAbsoluteUrl(vehicle)];
}

export function resolveLocationImageUrl(
  location: { displayImages?: ImageVariants | null; heroImageUrl?: string | null },
  size: ImageVariantKey = DETAIL_IMAGE_SIZE,
): string | null {
  return (
    pickVariantUrl(location.displayImages, size) ??
    variantsFromLegacyUrl(location.heroImageUrl)?.[size] ??
    null
  );
}

export function resolveCatalogImageUrl(
  item: { displayImages?: ImageVariants | null; icon?: string | null; logo?: string | null },
  size: ImageVariantKey = CARD_IMAGE_SIZE,
): string | null {
  return (
    pickVariantUrl(item.displayImages, size) ??
    variantsFromLegacyUrl(item.icon ?? item.logo)?.[size] ??
    null
  );
}
