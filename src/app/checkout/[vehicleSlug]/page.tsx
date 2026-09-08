import { notFound, redirect } from 'next/navigation';
import { getVehicle } from '@/lib/api';
import {
  DEFAULT_PICKUP_TIME,
  DEFAULT_RETURN_TIME,
  rentalQueryString,
} from '@/lib/rental-datetime';
import { vehicleDetailPath } from '@/lib/vehicle-path';

export const dynamic = 'force-dynamic';

interface CheckoutRedirectProps {
  params: Promise<{ vehicleSlug: string }>;
  searchParams: Promise<Record<string, string | undefined>>;
}

/** Legacy route — checkout now lives on the vehicle detail page. */
export default async function CheckoutRedirectPage({ params, searchParams }: CheckoutRedirectProps) {
  const { vehicleSlug } = await params;
  const query = await searchParams;
  const vehicle = await getVehicle(vehicleSlug);

  if (!vehicle) notFound();

  const redirectQuery = rentalQueryString({
    pickupDate: query.pickupDate,
    pickupTime: query.pickupTime ?? DEFAULT_PICKUP_TIME,
    returnDate: query.returnDate,
    returnTime: query.returnTime ?? DEFAULT_RETURN_TIME,
    ...(query.pickupPointId ? { pickupPointId: query.pickupPointId } : {}),
  });

  redirect(vehicleDetailPath(vehicle, redirectQuery || undefined));
}
