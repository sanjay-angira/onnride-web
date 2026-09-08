/** Category slugs for /car-rental/{city}/{segment} */
export const CAR_CATEGORY_SLUGS = new Set(['hatchback', 'sedan', 'suv', 'muv']);

export function isCarCategorySegment(segment: string): boolean {
  return CAR_CATEGORY_SLUGS.has(segment);
}

export function carRentalCityPath(slug: string): string {
  return `/car-rental/${slug}`;
}

export function carRentalCategoryPath(citySlug: string, categorySlug: string): string {
  return `/car-rental/${citySlug}/${categorySlug}`;
}

export function carRentalNearPath(citySlug: string, areaSlug: string): string {
  return `/car-rental/${citySlug}/near/${areaSlug}`;
}
