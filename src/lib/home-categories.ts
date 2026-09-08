import { DETAIL_IMAGE_SIZE } from '@/lib/image-variants';
import {
  DEFAULT_VEHICLE_LISTING_IMAGE,
  resolveCatalogImageUrl,
} from '@/lib/vehicle-image';
import type { VehicleCategory, VehicleClass } from '@/types';

export interface HomeCategoryCard {
  id: string;
  name: string;
  slug: string;
  count: string;
  description: string;
  accent: string;
  emoji: string;
  image: string;
  imageAlt: string;
}

const DEFAULT_ACCENTS = [
  'bg-brand-500 text-white',
  'bg-brand-600 text-white',
  'bg-primary text-white',
  'bg-slate-800 text-white',
  'bg-indigo-600 text-white',
  'bg-amber-700 text-white',
  'bg-teal-700 text-white',
] as const;

const CLASS_DEFAULTS: Record<
  VehicleClass,
  { emoji: string; count: string; description: (name: string) => string }
> = {
  TWO_WHEELER: {
    emoji: '🏍️',
    count: 'Available to book',
    description: (name) =>
      `${name} on rent — verified vendors, helmets included, instant online booking.`,
  },
  FOUR_WHEELER: {
    emoji: '🚗',
    count: 'Self-drive rentals',
    description: (name) =>
      `${name} self-drive — transparent pricing, valid LMV license required.`,
  },
};

function resolveCategoryCardImage(category: VehicleCategory): string {
  const icon = category.icon?.trim();
  if (icon && (icon.startsWith('http') || icon.startsWith('/'))) {
    return icon;
  }

  return resolveCatalogImageUrl(category, DETAIL_IMAGE_SIZE) ?? DEFAULT_VEHICLE_LISTING_IMAGE;
}

function resolveEmoji(category: VehicleCategory, vehicleClass: VehicleClass): string {
  const icon = category.icon?.trim();
  if (icon && !icon.startsWith('http') && !icon.startsWith('/')) {
    return icon;
  }
  return CLASS_DEFAULTS[vehicleClass].emoji;
}

/** Map live `/vehicles/categories` rows to homepage carousel cards (API data only). */
export function buildHomeCategoryCards(
  categories: VehicleCategory[],
  vehicleClass: VehicleClass,
): HomeCategoryCard[] {
  const defaults = CLASS_DEFAULTS[vehicleClass];

  return categories.map((category, index) => ({
    id: category.id,
    name: category.name,
    slug: category.slug,
    count: defaults.count,
    description: defaults.description(category.name),
    accent: DEFAULT_ACCENTS[index % DEFAULT_ACCENTS.length],
    emoji: resolveEmoji(category, vehicleClass),
    image: resolveCategoryCardImage(category),
    imageAlt: `${category.name} rental on OnnRide`,
  }));
}
