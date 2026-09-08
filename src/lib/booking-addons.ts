import { resolveVehicleHubName } from '@/lib/booking-location';
import { formatCurrency } from '@/lib/utils';
import type { Booking } from '@/types';

export interface BookingAddOnItem {
  id: string;
  kind: 'pickup' | 'delivery' | 'accessory';
  label: string;
  detail?: string;
  chargeLabel?: string | null;
  included?: boolean;
}

function parseAmount(value?: string | null): number {
  if (!value) return 0;
  const n = parseFloat(value);
  return Number.isFinite(n) ? n : 0;
}

export function isTwoWheelerBooking(booking: Booking): boolean {
  return booking.vehicle?.vehicleClass !== 'FOUR_WHEELER';
}

export function getBookingAddOns(booking: Booking): BookingAddOnItem[] {
  const items: BookingAddOnItem[] = [];

  if (booking.doorstepDelivery) {
    const distanceNote = booking.deliveryDistanceKm
      ? `~${booking.deliveryDistanceKm} km from hub`
      : undefined;
    items.push({
      id: 'doorstep-location',
      kind: 'delivery',
      label: 'Doorstep pickup & return',
      detail: [booking.deliveryAddress, distanceNote].filter(Boolean).join(' · ') || undefined,
      chargeLabel:
        parseAmount(booking.deliveryCharge) > 0
          ? formatCurrency(booking.deliveryCharge ?? '0')
          : 'Included',
    });
  } else {
    const hub = booking.vehicle?.hub;
    items.push({
      id: 'hub-location',
      kind: 'pickup',
      label: 'Hub pickup & return',
      detail: [hub?.name, hub?.address].filter(Boolean).join(' · ') || resolveVehicleHubName(booking),
      included: true,
    });
  }

  if (isTwoWheelerBooking(booking)) {
    items.push({
      id: 'helmet-included',
      kind: 'accessory',
      label: 'Helmet',
      detail: '1 complimentary helmet included',
      included: true,
    });

    const extraCount = booking.extraHelmetCount ?? 0;
    if (extraCount > 0) {
      const daysNote = booking.totalDays
        ? `${extraCount} × ${booking.totalDays} day${booking.totalDays === 1 ? '' : 's'}`
        : `${extraCount} extra`;
      items.push({
        id: 'extra-helmet',
        kind: 'accessory',
        label: 'Extra helmet',
        detail: daysNote,
        chargeLabel:
          parseAmount(booking.extraHelmetCharge) > 0
            ? formatCurrency(booking.extraHelmetCharge ?? '0')
            : null,
      });
    }
  }

  return items;
}

export function hasBookingAddOns(booking: Booking): boolean {
  return (
    booking.doorstepDelivery ||
    (booking.extraHelmetCount ?? 0) > 0 ||
    isTwoWheelerBooking(booking)
  );
}

export function getPickupModeDescription(booking: Booking): string {
  if (booking.doorstepDelivery) {
    return 'Pickup & return at your address';
  }
  return `Pickup & return at ${resolveVehicleHubName(booking)}`;
}

export function getBookingAddOnChips(booking: Booking): string[] {
  const chips: string[] = [];
  if (booking.doorstepDelivery) chips.push('Doorstep');
  if ((booking.extraHelmetCount ?? 0) > 0) {
    chips.push(`+${booking.extraHelmetCount} helmet`);
  }
  return chips;
}
