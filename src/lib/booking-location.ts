import { parseCoordinates } from '@/lib/location-map';
import type { Booking } from '@/types';

export type LocationSpotKind = 'pickup' | 'return' | 'delivery';

export interface ResolvedHubSpot {
  kind: LocationSpotKind;
  name: string;
  address: string | null;
  cityLabel: string | null;
  latitude: string | null;
  longitude: string | null;
  datetime: string;
  note?: string;
}

function cityLabel(booking: Booking): string | null {
  const loc = booking.pickupLocation ?? booking.returnLocation;
  if (!loc?.name) return null;
  const state = 'state' in loc && loc.state ? `, ${loc.state}` : '';
  return `${loc.name}${state}`;
}

/** Each vehicle is tied to one vendor hub — used when doorstep is OFF. */
export function resolveVehicleHubCoords(booking: Booking): {
  lat: string | null;
  lng: string | null;
} {
  const hub = booking.vehicle?.hub;
  if (hub?.latitude && hub?.longitude) {
    return { lat: hub.latitude, lng: hub.longitude };
  }
  const loc = booking.pickupLocation;
  if (loc?.latitude && loc?.longitude) {
    return { lat: loc.latitude, lng: loc.longitude };
  }
  return { lat: null, lng: null };
}

export function resolveVehicleHubName(booking: Booking): string {
  return booking.vehicle?.hub?.name ?? 'Vendor hub';
}

export function resolveVehicleHubAddress(booking: Booking): string | null {
  const hub = booking.vehicle?.hub;
  return hub?.address ?? hub?.description ?? null;
}

function resolveDoorstepSpot(booking: Booking): ResolvedHubSpot {
  return {
    kind: 'delivery',
    name: 'Your address',
    address: booking.deliveryAddress ?? null,
    cityLabel: cityLabel(booking),
    latitude: booking.deliveryLatitude ?? null,
    longitude: booking.deliveryLongitude ?? null,
    datetime: booking.pickupDate,
    note: booking.deliveryDistanceKm
      ? `Pickup & return here · ~${booking.deliveryDistanceKm} km from vendor hub`
      : 'Pickup and return at your address',
  };
}

function resolveHubSpot(booking: Booking): ResolvedHubSpot {
  const coords = resolveVehicleHubCoords(booking);
  return {
    kind: 'pickup',
    name: resolveVehicleHubName(booking),
    address: resolveVehicleHubAddress(booking),
    cityLabel: cityLabel(booking),
    latitude: coords.lat,
    longitude: coords.lng,
    datetime: booking.pickupDate,
    note: 'Pickup and return at this vendor hub',
  };
}

export function isSamePickupAndReturnLocation(booking: Booking): boolean {
  return true;
}

/**
 * - Doorstep ON  → pickup & return at customer address
 * - Doorstep OFF → pickup & return at vehicle's vendor hub
 */
export function resolveBookingLocations(booking: Booking): ResolvedHubSpot[] {
  if (booking.doorstepDelivery) {
    return [resolveDoorstepSpot(booking)];
  }
  return [resolveHubSpot(booking)];
}

/** @deprecated use isSamePickupAndReturnLocation */
export const isSamePickupAndReturnHub = isSamePickupAndReturnLocation;

/** @deprecated use resolveVehicleHubName */
export const resolveVendorHubName = resolveVehicleHubName;

/** @deprecated use resolveVehicleHubCoords */
export const resolveVendorHubCoords = resolveVehicleHubCoords;

/** @deprecated use resolveVehicleHubAddress */
export const resolveVendorHubAddress = resolveVehicleHubAddress;

export function getPrimaryMapCoords(booking: Booking): {
  latitude: string | null;
  longitude: string | null;
} {
  const spots = resolveBookingLocations(booking);
  const first = spots[0];
  return { latitude: first?.latitude ?? null, longitude: first?.longitude ?? null };
}

export function hasValidMapForBooking(booking: Booking): boolean {
  const { latitude, longitude } = getPrimaryMapCoords(booking);
  return parseCoordinates(latitude, longitude) !== null;
}

export function getLocationSupportPhone(booking: Booking): string | null {
  return booking.pickupLocation?.supportPhone ?? null;
}

export function getPickupModeLabel(booking: Booking): 'doorstep' | 'hub' {
  return booking.doorstepDelivery ? 'doorstep' : 'hub';
}
