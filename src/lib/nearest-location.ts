import type { Location } from '@/types';

/** Max distance (km) from city center to auto-select a service location. */
export const LOCATION_MATCH_RADIUS_KM = 80;

const EARTH_RADIUS_KM = 6371;

function toRadians(degrees: number): number {
  return (degrees * Math.PI) / 180;
}

export function haversineDistanceKm(
  lat1: number,
  lng1: number,
  lat2: number,
  lng2: number,
): number {
  const dLat = toRadians(lat2 - lat1);
  const dLng = toRadians(lng2 - lng1);
  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(toRadians(lat1)) * Math.cos(toRadians(lat2)) * Math.sin(dLng / 2) ** 2;
  return EARTH_RADIUS_KM * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
}

function parseCoordinate(value: string | null | undefined): number | null {
  if (value == null || value === '') return null;
  const parsed = Number.parseFloat(value);
  return Number.isFinite(parsed) ? parsed : null;
}

export function isValidServiceCoordinates(latitude: string, longitude: string): boolean {
  const lat = parseCoordinate(latitude);
  const lng = parseCoordinate(longitude);
  if (lat == null || lng == null) return false;
  if (lat === 0 && lng === 0) return false;
  return lat >= -90 && lat <= 90 && lng >= -180 && lng <= 180;
}

export interface NearestLocationMatch {
  location: Location;
  distanceKm: number;
}

export function findNearestServiceLocation(
  locations: Location[],
  latitude: number,
  longitude: number,
  maxDistanceKm = LOCATION_MATCH_RADIUS_KM,
): NearestLocationMatch | null {
  let best: NearestLocationMatch | null = null;

  for (const location of locations) {
    if (!isValidServiceCoordinates(location.latitude, location.longitude)) continue;

    const lat = parseCoordinate(location.latitude)!;
    const lng = parseCoordinate(location.longitude)!;
    const distanceKm = haversineDistanceKm(latitude, longitude, lat, lng);

    if (distanceKm <= maxDistanceKm && (!best || distanceKm < best.distanceKm)) {
      best = { location, distanceKm };
    }
  }

  return best;
}

export function getBrowserCoordinates(): Promise<GeolocationCoordinates> {
  return new Promise((resolve, reject) => {
    if (typeof window === 'undefined' || !('geolocation' in navigator)) {
      reject(new Error('Geolocation is not supported in this browser.'));
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => resolve(position.coords),
      (error) => {
        const message =
          error.code === error.PERMISSION_DENIED
            ? 'Location permission denied.'
            : error.code === error.POSITION_UNAVAILABLE
              ? 'Location unavailable.'
              : 'Location request timed out.';
        reject(new Error(message));
      },
      {
        enableHighAccuracy: false,
        timeout: 12_000,
        maximumAge: 300_000,
      },
    );
  });
}
