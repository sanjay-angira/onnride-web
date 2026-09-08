'use client';

import { HardHat, Home, MapPin, Package, Truck } from 'lucide-react';
import { CardContent, CardHeader } from '@/components/ui/Card';
import { getBookingAddOns, type BookingAddOnItem } from '@/lib/booking-addons';
import {
  bookingGlassPanel,
  bookingIconOrb,
  bookingPanel,
  bookingSectionLabel,
} from '@/lib/booking-ui';
import { cn } from '@/lib/utils';
import type { Booking } from '@/types';

interface BookingAddOnsCardProps {
  booking: Booking;
  compact?: boolean;
}

const toneStyles: Record<
  BookingAddOnItem['kind'] | 'extra',
  { orb: string; panel: string; chip: string }
> = {
  delivery: {
    orb: 'bg-violet-100 text-violet-700',
    panel: 'border-violet-100/90 bg-gradient-to-br from-violet-50/90 to-white ring-violet-100/50',
    chip: 'bg-violet-50 text-violet-800 ring-violet-200/60',
  },
  pickup: {
    orb: 'bg-emerald-100 text-emerald-700',
    panel: 'border-emerald-100/90 bg-gradient-to-br from-emerald-50/80 to-white ring-emerald-100/50',
    chip: 'bg-emerald-50 text-emerald-800 ring-emerald-200/60',
  },
  accessory: {
    orb: 'bg-slate-100 text-slate-600',
    panel: 'border-surface-200/90 bg-gradient-to-br from-surface-50/90 to-white ring-surface-100/50',
    chip: 'bg-slate-100 text-slate-700 ring-slate-200/60',
  },
  extra: {
    orb: 'bg-amber-100 text-amber-700',
    panel: 'border-amber-100/90 bg-gradient-to-br from-amber-50/90 to-white ring-amber-100/50',
    chip: 'bg-amber-50 text-amber-800 ring-amber-200/60',
  },
};

function AddOnIcon({ item }: { item: BookingAddOnItem }) {
  const className = 'h-4 w-4 shrink-0';
  if (item.kind === 'delivery') return <Truck className={className} aria-hidden />;
  if (item.kind === 'pickup') return <MapPin className={className} aria-hidden />;
  return <HardHat className={className} aria-hidden />;
}

function getTone(item: BookingAddOnItem) {
  if (item.id === 'extra-helmet') return toneStyles.extra;
  return toneStyles[item.kind];
}

export function BookingAddOnsCard({ booking, compact = false }: BookingAddOnsCardProps) {
  const items = getBookingAddOns(booking);
  if (!items.length) return null;

  if (compact) {
    return (
      <div className="flex flex-wrap gap-2">
        {items.map((item) => {
          const tone = getTone(item);
          return (
            <span
              key={item.id}
              className={cn(
                'inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-semibold shadow-sm ring-1 ring-inset',
                tone.chip,
              )}
            >
              <AddOnIcon item={item} />
              {item.label}
              {item.id === 'extra-helmet' && booking.extraHelmetCount
                ? ` ×${booking.extraHelmetCount}`
                : ''}
            </span>
          );
        })}
      </div>
    );
  }

  return (
    <section className={bookingPanel}>
      <CardHeader className="space-y-2 border-b border-surface-100/80 bg-gradient-to-r from-surface-50/80 to-white pb-4">
        <p className={bookingSectionLabel}>Your selections</p>
        <h2 className="flex items-center gap-2.5 font-display text-lg font-bold text-surface-900 sm:text-xl">
          <span className={cn(bookingIconOrb, 'h-10 w-10 bg-brand-100 text-brand-600')}>
            <Package className="h-5 w-5" aria-hidden />
          </span>
          Trip options & accessories
        </h2>
        <p className="text-sm text-slate-500">
          Pickup mode, delivery, and add-ons chosen at checkout.
        </p>
      </CardHeader>

      <CardContent className="grid gap-3 pt-5 sm:grid-cols-2">
        {items.map((item) => {
          const tone = getTone(item);
          return (
            <div
              key={item.id}
              className={cn(
                'group flex flex-col justify-between gap-3 rounded-2xl border p-4 shadow-sm ring-1',
                'transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md',
                tone.panel,
                item.kind === 'delivery' && 'sm:col-span-2',
              )}
            >
              <div className="flex items-start gap-3">
                <span className={cn(bookingIconOrb, 'h-10 w-10', tone.orb)}>
                  {item.kind === 'delivery' ? (
                    <Home className="h-4 w-4" aria-hidden />
                  ) : (
                    <AddOnIcon item={item} />
                  )}
                </span>
                <div className="min-w-0 flex-1">
                  <p className="font-semibold text-surface-900">{item.label}</p>
                  {item.detail ? (
                    <p className="mt-1 text-sm leading-relaxed text-slate-600">{item.detail}</p>
                  ) : null}
                  {item.included ? (
                    <span className="mt-2 inline-flex rounded-full bg-emerald-100/90 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide text-emerald-800 ring-1 ring-emerald-200/60">
                      Included
                    </span>
                  ) : null}
                </div>
              </div>
              {item.chargeLabel ? (
                <p className="text-right font-display text-base font-bold text-surface-900">
                  {item.chargeLabel}
                </p>
              ) : null}
            </div>
          );
        })}
      </CardContent>

      {booking.doorstepDelivery ? (
        <CardContent className="border-t border-surface-100/80 pt-0">
          <p
            className={cn(
              bookingGlassPanel,
              'px-4 py-3 text-xs leading-relaxed text-violet-900',
            )}
          >
            Vehicle is delivered to your address and must be returned to the same address when your trip ends.
          </p>
        </CardContent>
      ) : null}
    </section>
  );
}
