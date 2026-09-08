'use client';

import { useMemo, useState } from 'react';
import {
  CalendarClock,
  Copy,
  ExternalLink,
  Info,
  MapPin,
  Navigation,
  Phone,
  RotateCcw,
} from 'lucide-react';
import { LocationMapEmbed } from '@/components/maps/LocationMapEmbed.client';
import { Button } from '@/components/ui/Button';
import { CardContent, CardHeader } from '@/components/ui/Card';
import {
  getLocationSupportPhone,
  isSamePickupAndReturnHub,
  resolveBookingLocations,
  type ResolvedHubSpot,
} from '@/lib/booking-location';
import {
  bookingGlassPanel,
  bookingIconOrb,
  bookingPanel,
  bookingSectionLabel,
  bookingStatTile,
} from '@/lib/booking-ui';
import {
  googleMapsDirectionsUrl,
  googleMapsSearchUrl,
  parseCoordinates,
} from '@/lib/location-map';
import { formatDateTime } from '@/lib/rental-datetime';
import { cn } from '@/lib/utils';
import type { Booking } from '@/types';

interface BookingHubLocationCardProps {
  booking: Booking;
}

function HubBadge({ kind, sameHub }: { kind: ResolvedHubSpot['kind']; sameHub: boolean }) {
  const base =
    'rounded-full px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider shadow-sm ring-1 ring-inset';
  if (kind === 'delivery') {
    return (
      <span className={cn(base, 'bg-violet-100 text-violet-800 ring-violet-200/60')}>
        Pickup & return
      </span>
    );
  }
  if (sameHub && kind === 'pickup') {
    return (
      <span className={cn(base, 'bg-brand-100 text-brand-800 ring-brand-200/60')}>
        Pickup & return
      </span>
    );
  }
  if (kind === 'pickup') {
    return (
      <span className={cn(base, 'bg-emerald-100 text-emerald-800 ring-emerald-200/60')}>Pickup</span>
    );
  }
  return (
    <span className={cn(base, 'bg-amber-100 text-amber-800 ring-amber-200/60')}>Return</span>
  );
}

function copyToClipboard(text: string) {
  void navigator.clipboard?.writeText(text);
}

export function BookingHubLocationCard({ booking }: BookingHubLocationCardProps) {
  const spots = useMemo(() => resolveBookingLocations(booking), [booking]);
  const sameHub = isSamePickupAndReturnHub(booking);
  const supportPhone = getLocationSupportPhone(booking);
  const [activeIndex, setActiveIndex] = useState(0);
  const [copied, setCopied] = useState(false);

  const activeSpot = spots[activeIndex] ?? spots[0];
  const coords = parseCoordinates(activeSpot?.latitude, activeSpot?.longitude);
  const directionsUrl = coords
    ? googleMapsDirectionsUrl(coords.lat, coords.lng, activeSpot?.name)
    : null;
  const mapsUrl = coords ? googleMapsSearchUrl(coords.lat, coords.lng) : null;

  const fullAddress = [activeSpot?.address, activeSpot?.cityLabel].filter(Boolean).join(' · ');

  const handleCopy = () => {
    const text = [activeSpot?.name, activeSpot?.address, activeSpot?.cityLabel]
      .filter(Boolean)
      .join('\n');
    if (!text) return;
    copyToClipboard(text);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 2000);
  };

  const showTabs = spots.length > 1;

  return (
    <section className={cn(bookingPanel)}>
      <CardHeader className="space-y-2 border-b border-surface-100/80 bg-gradient-to-r from-surface-50/80 to-white pb-4">
        <p className={bookingSectionLabel}>Location</p>
        <h2 className="flex items-center gap-2.5 font-display text-lg font-bold text-surface-900 sm:text-xl">
          <span className={cn(bookingIconOrb, 'h-10 w-10 bg-brand-100 text-brand-600')}>
            <MapPin className="h-5 w-5" aria-hidden />
          </span>
          {booking.doorstepDelivery ? 'Your address' : 'Vendor hub'}
        </h2>
        <p className="text-sm leading-relaxed text-slate-500">
          {booking.doorstepDelivery
            ? 'Vehicle will be delivered to your address and collected from the same place at return time.'
            : `Pickup and return at ${booking.vehicle?.hub?.name ?? 'the vendor hub'} linked to this vehicle.`}
        </p>
      </CardHeader>

      <CardContent className="space-y-5 pt-5">
        {showTabs ? (
          <div className="flex gap-2 rounded-2xl bg-surface-100/90 p-1.5 shadow-inner ring-1 ring-black/[0.03]">
            {spots.map((spot, index) => (
              <button
                key={spot.kind}
                type="button"
                onClick={() => setActiveIndex(index)}
                className={cn(
                  'flex flex-1 items-center justify-center gap-1.5 rounded-xl px-3 py-2.5 text-sm font-semibold transition-all duration-200',
                  activeIndex === index
                    ? 'bg-white text-surface-900 shadow-md ring-1 ring-black/[0.04]'
                    : 'text-slate-600 hover:text-surface-900',
                )}
              >
                {spot.kind === 'delivery' ? (
                  <MapPin className="h-4 w-4" aria-hidden />
                ) : spot.kind === 'return' ? (
                  <RotateCcw className="h-4 w-4" aria-hidden />
                ) : (
                  <MapPin className="h-4 w-4" aria-hidden />
                )}
                {spot.kind === 'delivery'
                  ? 'Your address'
                  : spot.kind === 'return'
                    ? 'Return hub'
                    : 'Pickup hub'}
              </button>
            ))}
          </div>
        ) : null}

        <LocationMapEmbed
          latitude={activeSpot?.latitude}
          longitude={activeSpot?.longitude}
          title={`${activeSpot?.name ?? 'Hub'} map`}
          heightClassName="h-48 sm:h-60"
        />

        <div className={cn(bookingGlassPanel, 'space-y-4 p-4 sm:p-5')}>
          <div className="min-w-0">
            <div className="flex flex-wrap items-center gap-2">
              <h3 className="font-display text-base font-bold text-surface-900 sm:text-lg">
                {activeSpot?.name}
              </h3>
              <HubBadge kind={activeSpot?.kind ?? 'pickup'} sameHub={sameHub} />
            </div>
            {activeSpot?.address ? (
              <p className="mt-2 text-sm leading-relaxed text-slate-600">{activeSpot.address}</p>
            ) : null}
            {activeSpot?.cityLabel ? (
              <p className="mt-1 text-sm text-slate-500">{activeSpot.cityLabel}</p>
            ) : null}
            {activeSpot?.note ? (
              <p className="mt-2 inline-flex items-center gap-1.5 rounded-lg bg-surface-100/80 px-2.5 py-1 text-xs text-slate-600">
                <Info className="h-3.5 w-3.5 shrink-0" aria-hidden />
                {activeSpot.note}
              </p>
            ) : null}
          </div>

          <div className="grid gap-3 sm:grid-cols-2">
            <div className={bookingStatTile}>
              <span className={cn(bookingIconOrb, 'h-9 w-9 bg-brand-50 text-brand-600')}>
                <CalendarClock className="h-4 w-4" aria-hidden />
              </span>
              <div>
                <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                  {sameHub && !booking.doorstepDelivery ? 'Pickup' : 'Scheduled'}
                </p>
                <p className="text-sm font-semibold text-surface-900">
                  {formatDateTime(booking.pickupDate)}
                </p>
              </div>
            </div>
            {!booking.doorstepDelivery ? (
              <div className={bookingStatTile}>
                <span className={cn(bookingIconOrb, 'h-9 w-9 bg-amber-50 text-amber-600')}>
                  <RotateCcw className="h-4 w-4" aria-hidden />
                </span>
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                    Return by
                  </p>
                  <p className="text-sm font-semibold text-surface-900">
                    {formatDateTime(booking.returnDate)}
                  </p>
                </div>
              </div>
            ) : (
              <div className={bookingStatTile}>
                <span className={cn(bookingIconOrb, 'h-9 w-9 bg-amber-50 text-amber-600')}>
                  <RotateCcw className="h-4 w-4" aria-hidden />
                </span>
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                    Return by
                  </p>
                  <p className="text-sm font-semibold text-surface-900">
                    {formatDateTime(booking.returnDate)}
                  </p>
                  <p className="text-xs text-slate-500">Same address</p>
                </div>
              </div>
            )}
          </div>

          <div className="flex flex-wrap gap-2">
            {directionsUrl ? (
              <a href={directionsUrl} target="_blank" rel="noopener noreferrer" className="flex-1 sm:flex-none">
                <Button type="button" size="sm" className="w-full gap-1.5 shadow-md sm:w-auto">
                  <Navigation className="h-4 w-4" aria-hidden />
                  Get directions
                </Button>
              </a>
            ) : null}
            {mapsUrl ? (
              <a href={mapsUrl} target="_blank" rel="noopener noreferrer" className="flex-1 sm:flex-none">
                <Button type="button" variant="outline" size="sm" className="w-full gap-1.5 sm:w-auto">
                  <ExternalLink className="h-4 w-4" aria-hidden />
                  Open in Maps
                </Button>
              </a>
            ) : null}
            {fullAddress ? (
              <Button
                type="button"
                variant="outline"
                size="sm"
                className="w-full gap-1.5 sm:w-auto"
                onClick={handleCopy}
              >
                <Copy className="h-4 w-4" aria-hidden />
                {copied ? 'Copied!' : 'Copy address'}
              </Button>
            ) : null}
          </div>
        </div>

        <div className="rounded-2xl border border-brand-100/80 bg-gradient-to-br from-brand-50/80 to-white p-4 shadow-sm ring-1 ring-brand-100/50">
          <p className="text-[10px] font-bold uppercase tracking-wider text-brand-700">Before you go</p>
          <ul className="mt-2.5 space-y-2 text-sm text-slate-700">
            <li className="flex gap-2">
              <span className="text-brand-500">•</span>
              Carry your driving licence and booking ID ({booking.bookingNumber})
            </li>
            <li className="flex gap-2">
              <span className="text-brand-500">•</span>
              Arrive 15 minutes before pickup time
            </li>
            <li className="flex gap-2">
              <span className="text-brand-500">•</span>
              {booking.doorstepDelivery
                ? 'Be available at your address for both delivery and collection'
                : 'Inspect the vehicle with the vendor before starting the ride'}
            </li>
          </ul>
        </div>

        {supportPhone ? (
          <a
            href={`tel:${supportPhone.replace(/\s/g, '')}`}
            className={cn(
              bookingStatTile,
              'gap-4 transition-all hover:border-brand-200 hover:shadow-md',
            )}
          >
            <span className={cn(bookingIconOrb, 'h-11 w-11 rounded-full bg-brand-100 text-brand-600')}>
              <Phone className="h-4 w-4" aria-hidden />
            </span>
            <div>
              <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                Local support
              </p>
              <p className="text-sm font-semibold text-surface-900">{supportPhone}</p>
            </div>
          </a>
        ) : null}
      </CardContent>
    </section>
  );
}
