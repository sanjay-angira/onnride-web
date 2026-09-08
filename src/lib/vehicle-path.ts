import type { Vehicle } from '@/types';

type VehicleLink = Pick<Vehicle, 'slug' | 'id'>;

export function vehicleSlug(vehicle: VehicleLink): string {
  return vehicle.slug ?? vehicle.id;
}

export function vehicleDetailPath(vehicle: VehicleLink, query?: string): string {
  const base = `/vehicles/${vehicleSlug(vehicle)}`;
  return query ? `${base}?${query}` : base;
}

export function checkoutPath(vehicle: VehicleLink, query?: string): string {
  const base = `/checkout/${vehicleSlug(vehicle)}`;
  return query ? `${base}?${query}` : base;
}
