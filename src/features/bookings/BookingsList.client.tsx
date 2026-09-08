'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import {
  ArrowRight,
  Calendar,
  ChevronRight,
  CreditCard,
  HardHat,
  MapPin,
  Shield,
  Truck,
} from 'lucide-react';
import { AuthGuard } from '@/components/auth/AuthGuard';
import { BookingStatusBadge } from '@/components/bookings/BookingStatusBadge';
import { PickupCountdownBadge } from '@/components/bookings/PickupCountdownBadge.client';
import { CardContent } from '@/components/ui/Card';
import { getMyBookings } from '@/lib/api';
import { getBookingStatusMeta } from '@/lib/booking-status';
import { bookingPanel, bookingPanelHover } from '@/lib/booking-ui';
import { formatDateTime } from '@/lib/rental-datetime';
import { resolveVehicleListingImageUrl } from '@/lib/vehicle-image';
import { cn, formatCurrency } from '@/lib/utils';
import type { Booking } from '@/types';
import { useAppSelector } from '@/store/hooks';

function vehicleTitle(booking: Booking) {
  const v = booking.vehicle;
  if (!v) return 'Vehicle booking';
  const brand = v.brand?.name ?? '';
  const model = v.model ?? '';
  return `${brand} ${model}`.trim() || 'Vehicle booking';
}

function BookingsListContent() {
  const { accessToken } = useAppSelector((state) => state.auth);
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!accessToken) return;
    void getMyBookings(accessToken).then((data) => {
      setBookings(data);
      setLoading(false);
    });
  }, [accessToken]);

  if (loading) {
    return (
      <div className="grid gap-4 sm:grid-cols-2">
        {[0, 1].map((i) => (
          <div
            key={i}
            className={cn(bookingPanel, 'h-48 animate-pulse bg-surface-100/50')}
            aria-hidden
          />
        ))}
      </div>
    );
  }

  if (bookings.length === 0) {
    return (
      <section className={cn(bookingPanel, 'text-center')}>
        <CardContent className="py-16">
          <p className="font-display text-lg font-bold text-surface-900">No trips yet</p>
          <p className="mt-2 text-sm text-slate-500">Book a bike or scooter to see your rides here.</p>
          <Link
            href="/search"
            className="mt-6 inline-flex items-center gap-2 rounded-xl bg-brand-500 px-6 py-3 text-sm font-semibold text-white shadow-[0_8px_24px_-6px_rgba(249,115,22,0.45)] transition hover:-translate-y-0.5 hover:bg-brand-600"
          >
            Search vehicles
            <ArrowRight className="h-4 w-4" aria-hidden />
          </Link>
        </CardContent>
      </section>
    );
  }

  return (
    <ul className="grid gap-4 sm:grid-cols-2">
      {bookings.map((booking) => {
        const meta = getBookingStatusMeta(booking.bookingStatus);
        const imageUrl = booking.vehicle ? resolveVehicleListingImageUrl(booking.vehicle) : '/hero.webp';
        const needsPayment = ['PAYMENT_PENDING', 'PARTIAL_PAID'].includes(booking.bookingStatus);
        const pending = parseFloat(booking.pendingBalance ?? '0');

        return (
          <li key={booking.id}>
            <Link href={`/bookings/${booking.id}`} className="group block">
              <article
                className={cn(
                  bookingPanelHover,
                  'overflow-hidden transition-transform duration-300',
                  'group-hover:-translate-y-1',
                )}
              >
                <div className="flex flex-col sm:flex-row">
                  <div className="relative h-40 w-full shrink-0 overflow-hidden bg-surface-100 sm:h-auto sm:w-40">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={imageUrl}
                      alt=""
                      className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                    />
                    <div
                      className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/35 via-transparent to-transparent"
                      aria-hidden
                    />
                    <div className="absolute left-3 top-3 shadow-md">
                      <BookingStatusBadge status={booking.bookingStatus} size="sm" />
                    </div>
                  </div>

                  <CardContent className="flex flex-1 flex-col justify-between gap-3 p-4 sm:p-5">
                    <div>
                      <div className="flex items-start justify-between gap-2">
                        <div>
                          <p className="text-[10px] font-bold uppercase tracking-[0.12em] text-brand-600">
                            {booking.bookingNumber}
                          </p>
                          <h2 className="font-display text-lg font-bold text-surface-900 transition group-hover:text-brand-700">
                            {vehicleTitle(booking)}
                          </h2>
                        </div>
                        <ChevronRight className="mt-1 h-5 w-5 shrink-0 text-slate-300 transition group-hover:translate-x-0.5 group-hover:text-brand-500" />
                      </div>

                      <p className="mt-2 flex items-center gap-1.5 text-sm text-slate-600">
                        <Calendar className="h-3.5 w-3.5 shrink-0 text-slate-400" aria-hidden />
                        <span className="line-clamp-2">
                          {formatDateTime(booking.pickupDate)} → {formatDateTime(booking.returnDate)}
                        </span>
                      </p>

                      {booking.pickupLocation?.name || booking.pickupPoint?.name ? (
                        <p className="mt-1 flex items-center gap-1.5 text-sm text-slate-500">
                          <MapPin className="h-3.5 w-3.5 shrink-0" aria-hidden />
                          {booking.doorstepDelivery
                            ? 'Doorstep delivery'
                            : (booking.pickupPoint?.name ?? booking.pickupLocation?.name)}
                        </p>
                      ) : booking.doorstepDelivery ? (
                        <p className="mt-1 flex items-center gap-1.5 text-sm text-slate-500">
                          <Truck className="h-3.5 w-3.5 shrink-0" aria-hidden />
                          Doorstep delivery
                        </p>
                      ) : null}

                      {(booking.doorstepDelivery || (booking.extraHelmetCount ?? 0) > 0) && (
                        <div className="mt-2 flex flex-wrap gap-1.5">
                          {booking.doorstepDelivery ? (
                            <span className="inline-flex items-center gap-1 rounded-full bg-violet-50 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide text-violet-800 ring-1 ring-violet-200/60">
                              <Truck className="h-3 w-3" aria-hidden />
                              Delivery
                            </span>
                          ) : null}
                          {(booking.extraHelmetCount ?? 0) > 0 ? (
                            <span className="inline-flex items-center gap-1 rounded-full bg-amber-50 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide text-amber-800 ring-1 ring-amber-200/60">
                              <HardHat className="h-3 w-3" aria-hidden />
                              +{booking.extraHelmetCount} helmet
                            </span>
                          ) : null}
                        </div>
                      )}

                      <p className="mt-2 line-clamp-2 text-xs text-slate-500">{meta.description}</p>

                      <div className="mt-3">
                        <PickupCountdownBadge
                          pickupDate={booking.pickupDate}
                          returnDate={booking.returnDate}
                          bookingStatus={booking.bookingStatus}
                          size="sm"
                        />
                      </div>
                    </div>

                    <div className="flex flex-wrap items-end justify-between gap-3 border-t border-surface-100/80 pt-3">
                      <div>
                        <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Total</p>
                        <p className="font-display text-xl font-bold text-surface-900">
                          {formatCurrency(booking.totalAmount)}
                        </p>
                        {pending > 0 ? (
                          <p className="text-xs font-semibold text-amber-700">
                            {formatCurrency(booking.pendingBalance ?? '0')} due
                          </p>
                        ) : null}
                      </div>

                      <div className="flex flex-wrap gap-2">
                        {needsPayment ? (
                          <span className="inline-flex items-center gap-1 rounded-lg bg-amber-50 px-2.5 py-1 text-xs font-semibold text-amber-800 shadow-sm ring-1 ring-amber-200/60">
                            <CreditCard className="h-3.5 w-3.5" aria-hidden />
                            Pay now
                          </span>
                        ) : null}
                        {booking.bookingStatus === 'CONFIRMED' ? (
                          <span className="inline-flex items-center gap-1 rounded-lg bg-brand-50 px-2.5 py-1 text-xs font-semibold text-brand-800 shadow-sm ring-1 ring-brand-200/60">
                            <Shield className="h-3.5 w-3.5" aria-hidden />
                            KYC
                          </span>
                        ) : null}
                      </div>
                    </div>
                  </CardContent>
                </div>
              </article>
            </Link>
          </li>
        );
      })}
    </ul>
  );
}

export function BookingsList() {
  return (
    <AuthGuard>
      <BookingsListContent />
    </AuthGuard>
  );
}
