import type { Metadata } from 'next';
import { notFound, redirect } from 'next/navigation';
import { JsonLdScript } from '@/components/seo/JsonLdScript';
import { VehicleDetailPage } from '@/features/vehicles/VehicleDetailPage.client';
import { getVehicle } from '@/lib/api';
import { getPublicSettingsMap } from '@/lib/public-settings';
import { pageMetadata } from '@/lib/seo/metadata';
import { buildVehicleJsonLd } from '@/lib/seo/vehicle-jsonld';
import { resolveVehicleListingImageAbsoluteUrl } from '@/lib/vehicle-image';
import {
  DEFAULT_PICKUP_TIME,
  DEFAULT_RETURN_TIME,
  rentalQueryString,
} from '@/lib/rental-datetime';
import { vehicleDetailPath } from '@/lib/vehicle-path';
import { formatCurrency } from '@/lib/utils';

export const revalidate = 1800;

function normalizeSearchParams(
  input: Record<string, string | string[] | undefined>,
): Record<string, string> {
  const out: Record<string, string> = {};
  for (const [key, value] of Object.entries(input)) {
    if (typeof value === 'string') out[key] = value;
    else if (Array.isArray(value) && value[0]) out[key] = value[0];
  }
  return out;
}

interface VehiclePageProps {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{
    pickupDate?: string;
    pickupTime?: string;
    returnDate?: string;
    returnTime?: string;
  }>;
}

export async function generateMetadata({ params }: VehiclePageProps): Promise<Metadata> {
  const { slug } = await params;
  const vehicle = await getVehicle(slug);
  if (!vehicle) return { title: 'Vehicle not found' };

  const city = vehicle.location?.name ?? 'India';
  const title = `${vehicle.brand?.name ?? ''} ${vehicle.model ?? 'Bike'} for Rent in ${city}`.trim();
  const vehicleSlug = vehicle.slug ?? slug;

  const listingImage = resolveVehicleListingImageAbsoluteUrl(vehicle);
  const isComingSoon = vehicle.location?.launchStatus === 'coming_soon';

  return pageMetadata({
    title,
    description: `Rent ${vehicle.brand?.name ?? ''} ${vehicle.model ?? 'bike'} in ${city} from ${formatCurrency(vehicle.pricePerDay)}/day. Verified vendor, helmet included, book on OnnRide.`,
    path: `/vehicles/${vehicleSlug}`,
    ogImage: listingImage,
    noindex: isComingSoon,
  });
}

export default async function VehicleDetailRoute({ params, searchParams }: VehiclePageProps) {
  const { slug } = await params;
  const resolvedSearchParams = await searchParams;
  const {
    pickupDate,
    pickupTime = DEFAULT_PICKUP_TIME,
    returnDate,
    returnTime = DEFAULT_RETURN_TIME,
  } = resolvedSearchParams;
  const urlSearchParams = normalizeSearchParams(resolvedSearchParams);
  const [vehicle, settings] = await Promise.all([getVehicle(slug), getPublicSettingsMap()]);

  if (!vehicle) notFound();

  const checkoutQuery = rentalQueryString({
    ...(pickupDate ? { pickupDate, pickupTime } : {}),
    ...(returnDate ? { returnDate, returnTime } : {}),
  });

  if (/^\d+$/.test(slug) && vehicle.slug && vehicle.slug !== slug) {
    redirect(vehicleDetailPath(vehicle, checkoutQuery || undefined));
  }

  return (
    <>
      <JsonLdScript data={buildVehicleJsonLd(vehicle)} />
      <VehicleDetailPage
        vehicle={vehicle}
        pickupDate={pickupDate ?? ''}
        pickupTime={pickupTime}
        returnDate={returnDate ?? ''}
        returnTime={returnTime}
        settings={settings}
        urlSearchParams={urlSearchParams}
      />
    </>
  );
}
