export type VehicleClass = 'TWO_WHEELER' | 'FOUR_WHEELER';

export const VEHICLE_CLASS_URL = {
  TWO_WHEELER: 'two_wheeler',
  FOUR_WHEELER: 'four_wheeler',
} as const;

export function parseVehicleClassParam(value?: string | null): VehicleClass {
  if (!value) return 'TWO_WHEELER';
  const normalized = value.trim().toLowerCase().replace(/-/g, '_');
  if (normalized === 'four_wheeler') return 'FOUR_WHEELER';
  if (normalized === 'two_wheeler') return 'TWO_WHEELER';
  if (value === 'FOUR_WHEELER') return 'FOUR_WHEELER';
  return 'TWO_WHEELER';
}

export function vehicleClassToParam(vehicleClass: VehicleClass): string {
  return vehicleClass === 'FOUR_WHEELER'
    ? VEHICLE_CLASS_URL.FOUR_WHEELER
    : VEHICLE_CLASS_URL.TWO_WHEELER;
}

export function vehicleClassLabel(vehicleClass: VehicleClass): string {
  return vehicleClass === 'FOUR_WHEELER' ? 'Cars' : 'Bikes & Scooters';
}

export function isFourWheeler(vehicleClass?: VehicleClass | string | null): boolean {
  return vehicleClass === 'FOUR_WHEELER';
}
