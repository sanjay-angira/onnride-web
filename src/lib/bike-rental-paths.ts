/** Category slugs for /bike-rental/{city}/{segment} */
export const CATEGORY_SLUGS = new Set([
  'scooter',
  'commuter',
  'cruiser',
  'adventure',
  'sports',
  'superbike',
  'electric',
]);

/** Legacy / marketing aliases → canonical category slug */
export const CATEGORY_ALIASES: Record<string, string> = {
  activa: 'scooter',
  'royal-enfield': 'cruiser',
  re: 'cruiser',
};

export function resolveCategorySlug(segment: string): string {
  return CATEGORY_ALIASES[segment] ?? segment;
}

export function isCategorySegment(segment: string): boolean {
  const resolved = resolveCategorySlug(segment);
  return CATEGORY_SLUGS.has(resolved);
}

export function bikeRentalCityPath(slug: string): string {
  return `/bike-rental/${slug}`;
}

export function bikeRentalCategoryPath(citySlug: string, categorySlug: string): string {
  return `/bike-rental/${citySlug}/${resolveCategorySlug(categorySlug)}`;
}

export function bikeRentalNearPath(citySlug: string, areaSlug: string): string {
  return `/bike-rental/${citySlug}/near/${areaSlug}`;
}
