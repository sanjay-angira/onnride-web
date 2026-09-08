export interface MapCoordinates {
  latitude: string | number | null | undefined;
  longitude: string | number | null | undefined;
}

export function parseCoordinates(
  latitude: MapCoordinates['latitude'],
  longitude: MapCoordinates['longitude'],
): { lat: number; lng: number } | null {
  if (latitude == null || longitude == null) return null;
  const lat = typeof latitude === 'string' ? Number.parseFloat(latitude) : latitude;
  const lng = typeof longitude === 'string' ? Number.parseFloat(longitude) : longitude;
  if (!Number.isFinite(lat) || !Number.isFinite(lng) || lat === 0 || lng === 0) {
    return null;
  }
  return { lat, lng };
}

export function googleMapsEmbedUrl(lat: number, lng: number, zoom = 15): string {
  return `https://maps.google.com/maps?q=${lat},${lng}&z=${zoom}&output=embed`;
}

export function googleMapsDirectionsUrl(
  lat: number,
  lng: number,
  label?: string,
): string {
  const query = label ? encodeURIComponent(label) : `${lat},${lng}`;
  return `https://www.google.com/maps/dir/?api=1&destination=${query}&destination_place_id=&travelmode=driving`;
}

export function googleMapsSearchUrl(lat: number, lng: number): string {
  return `https://www.google.com/maps/search/?api=1&query=${lat},${lng}`;
}
