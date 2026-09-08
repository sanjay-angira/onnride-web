import type { VehicleCategory, VehicleClass } from '@/types';

/** Filter API categories by vehicle class — no static fallback. */
export function filterCategoriesByClass(
  categories: VehicleCategory[],
  vehicleClass?: VehicleClass,
): VehicleCategory[] {
  if (!vehicleClass) return categories;
  return categories.filter((category) => category.vehicleClass === vehicleClass);
}
