'use client';

import Link from 'next/link';
import { useParams, useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import {
  CheckCircle2,
  ChevronLeft,
  CreditCard,
  Fuel,
  Gauge,
  MapPin,
  MessageCircle,
  Phone,
  Store,
  Users,
  Wallet,
} from 'lucide-react';
import { BookingStatusBadge } from '@/components/bookings/BookingStatusBadge';
import { BookingAddOnsCard } from '@/components/bookings/BookingAddOnsCard.client';
import { BookingDetailSkeleton } from '@/components/bookings/BookingDetailSkeleton.client';
import { BookingHubLocationCard } from '@/components/bookings/BookingHubLocationCard.client';
import { PickupGuideCard } from '@/components/bookings/PickupGuideCard.client';
import { PickupCountdownBadge } from '@/components/bookings/PickupCountdownBadge.client';
import { Button } from '@/components/ui/Button';
import { BookingChat } from '@/features/chat/BookingChat.client';
import { BookingProgressSteps } from '@/features/kyc/BookingProgressSteps.client';
import { processBookingPayment } from '@/features/payments/processBookingPayment';
import { CardContent, CardHeader } from '@/components/ui/Card';
import { cancelBooking, getBooking, getKycStatus } from '@/lib/api';
import { resolveVehicleHubName } from '@/lib/booking-location';
import { getBookingStatusMeta } from '@/lib/booking-status';
import { shouldShowPickupCountdown } from '@/lib/booking-countdown';
import {
  bookingPanel,
  bookingPanelElevated,
  bookingSectionLabel,
} from '@/lib/booking-ui';
import { formatDateTime } from '@/lib/rental-datetime';
import { resolveVehicleListingImageUrl } from '@/lib/vehicle-image';
import { formatCurrency, cn } from '@/lib/utils';
import type { Booking, KycStatus } from '@/types';
import { useAppSelector } from '@/store/hooks';

function vehicleTitle(booking: Booking) {
  const v = booking.vehicle;
  if (!v) return 'Vehicle';
  return `${v.brand?.name ?? ''} ${v.model ?? ''}`.trim() || 'Vehicle';
}

function DetailRow({
  label,
  value,
  valueClassName,
}: {
  label: string;
  value: React.ReactNode;
  valueClassName?: string;
}) {
  return (
    <div className="flex items-center justify-between gap-4 border-b border-surface-100 py-3 last:border-0">
      <span className="text-sm text-slate-500">{label}</span>
      <span className={cn('text-sm font-semibold text-surface-900', valueClassName)}>
        {value}
      </span>
    </div>
  );
}

export function BookingDetail() {
  const params = useParams<{ id: string }>();
  const searchParams = useSearchParams();
  const router = useRouter();
  const { accessToken, user } = useAppSelector((state) => state.auth);
  const [booking, setBooking] = useState<Booking | null>(null);
  const [kyc, setKyc] = useState<KycStatus | null>(null);
  const [loading, setLoading] = useState(true);
  const [payLoading, setPayLoading] = useState(false);
  const [payError, setPayError] = useState('');
  const [cancelLoading, setCancelLoading] = useState(false);
  const [cancelError, setCancelError] = useState('');
  const [cancelMessage, setCancelMessage] = useState('');
  const [autoPayTriggered, setAutoPayTriggered] = useState(false);
  const [chatOpen, setChatOpen] = useState(false);

  const paidSuccess = searchParams.get('paid') === '1';
  const partialSuccess = searchParams.get('partial') === '1';
  const payOnline = searchParams.get('pay') === 'online';
  const kycSubmitted = searchParams.get('kyc') === 'submitted';
  const cancelledSuccess = searchParams.get('cancelled') === '1';
  const openChat = searchParams.get('chat') === '1';

  async function loadBooking() {
    if (!accessToken || !params.id) return;
    const [bookingData, kycData] = await Promise.all([
      getBooking(accessToken, params.id),
      getKycStatus(accessToken),
    ]);
    setBooking(bookingData);
    setKyc(kycData);
    setLoading(false);
  }

  useEffect(() => {
    void loadBooking();
  }, [accessToken, params.id]);

  useEffect(() => {
    if (openChat) setChatOpen(true);
  }, [openChat]);

  async function handlePayNow(mode: 'FULL' | 'PARTIAL' = 'FULL') {
    if (!accessToken || !booking) return;
    setPayError('');
    setPayLoading(true);
    try {
      const result = await processBookingPayment(
        accessToken,
        booking.id,
        user?.phone,
        booking.bookingStatus === 'PARTIAL_PAID' ? 'FULL' : mode,
      );
      await loadBooking();
      if (result.bookingStatus === 'PARTIAL_PAID') {
        router.replace(`/bookings/${booking.id}?partial=1`);
      } else {
        router.replace(`/bookings/${booking.id}/kyc?from=payment`);
      }
    } catch (err) {
      setPayError(err instanceof Error ? err.message : 'Payment failed');
    } finally {
      setPayLoading(false);
    }
  }

  async function handleCancelBooking() {
    if (!accessToken || !booking) return;
    const confirmed = window.confirm(
      booking.bookingStatus === 'PARTIAL_PAID'
        ? `Cancel booking? Your partial payment of ${formatCurrency(booking.amountPaid ?? '0')} will NOT be refunded.`
        : 'Cancel this booking?',
    );
    if (!confirmed) return;

    setCancelError('');
    setCancelMessage('');
    setCancelLoading(true);
    try {
      const result = await cancelBooking(accessToken, booking.id, 'Customer requested cancellation');
      setBooking(result.booking);
      setCancelMessage(result.cancellation.message);
      router.replace(`/bookings/${booking.id}?cancelled=1`);
    } catch (err) {
      setCancelError(err instanceof Error ? err.message : 'Cancellation failed');
    } finally {
      setCancelLoading(false);
    }
  }

  useEffect(() => {
    if (
      !accessToken ||
      !booking ||
      booking.bookingStatus !== 'PAYMENT_PENDING' ||
      !payOnline ||
      autoPayTriggered
    ) {
      return;
    }
    setAutoPayTriggered(true);
    void handlePayNow();
  }, [accessToken, booking, payOnline, autoPayTriggered]);

  if (loading) {
    return <BookingDetailSkeleton />;
  }

  if (!booking) {
    return (
      <section className={cn(bookingPanel, 'text-center')}>
        <CardContent className="py-16">
          <p className="text-slate-600">Booking not found.</p>
          <Link href="/bookings" className="mt-3 inline-block text-sm font-semibold text-brand-600">
            ← Back to my trips
          </Link>
        </CardContent>
      </section>
    );
  }

  const statusMeta = getBookingStatusMeta(booking.bookingStatus);
  const canCancel = ['PAYMENT_PENDING', 'PARTIAL_PAID', 'CONFIRMED', 'READY_FOR_PICKUP'].includes(
    booking.bookingStatus,
  );
  const showKycBanner =
    kyc?.status !== 'APPROVED' &&
    ['CONFIRMED', 'READY_FOR_PICKUP', 'IN_PROGRESS', 'RETURN_REQUESTED', 'COMPLETED'].includes(
      booking.bookingStatus,
    );
  const paymentComplete = booking.bookingStatus !== 'PAYMENT_PENDING';
  const showChat = ['CONFIRMED', 'READY_FOR_PICKUP', 'IN_PROGRESS', 'RETURN_REQUESTED', 'COMPLETED'].includes(
    booking.bookingStatus,
  );
  const imageUrl = booking.vehicle ? resolveVehicleListingImageUrl(booking.vehicle) : '/hero.webp';
  const hubName = resolveVehicleHubName(booking);
  const locationLabel =
    booking.pickupPoint?.name ?? booking.pickupLocation?.name ?? hubName;
  const pendingBalance = parseFloat(booking.pendingBalance ?? '0');
  const amountPaid = parseFloat(booking.amountPaid ?? '0');
  const needsBalancePay = booking.bookingStatus === 'PARTIAL_PAID' && pendingBalance > 0;
  const needsFullPay = booking.bookingStatus === 'PAYMENT_PENDING';

  return (
    <div className={cn('w-full space-y-5 sm:space-y-6', showChat && 'pb-28')}>
      <Link
        href="/bookings"
        className="inline-flex items-center gap-1 text-sm font-medium text-slate-600 transition hover:text-brand-600"
      >
        <ChevronLeft className="h-4 w-4" aria-hidden />
        My trips
      </Link>

      {/* Hero — dark banner + schedule strip + vehicle image */}
      <section className={cn(bookingPanelElevated, 'relative overflow-visible')}>
        <div className="relative overflow-hidden rounded-t-3xl bg-surface-950 px-5 pb-8 pt-5 text-white sm:px-7 sm:pb-10 sm:pt-6">
          <div
            className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_rgba(249,115,22,0.18),_transparent_55%)]"
            aria-hidden
          />
          <div className="relative flex flex-col gap-4 pr-0 sm:pr-48 md:pr-56 lg:pr-64">
            <div className="flex flex-wrap items-center gap-2.5">
              <p className="text-xs font-medium tracking-wide text-slate-400">
                Booking ID: {booking.bookingNumber}
              </p>
              <BookingStatusBadge status={booking.bookingStatus} size="sm" />
            </div>
            <div>
              <h1 className="font-display text-2xl font-bold tracking-tight sm:text-3xl md:text-4xl">
                {vehicleTitle(booking)}
              </h1>
              <p className="mt-2 max-w-lg text-sm leading-relaxed text-slate-300">
                {statusMeta.description}
              </p>
            </div>
          </div>

          {/* Overlapping vehicle image */}
          <div className="pointer-events-none absolute -bottom-6 right-4 hidden w-44 sm:block md:right-6 md:w-52 lg:w-60">
            <div className="relative aspect-[4/3] overflow-hidden rounded-2xl bg-white/5 shadow-2xl ring-1 ring-white/10">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={imageUrl}
                alt={vehicleTitle(booking)}
                className="h-full w-full object-cover object-center"
              />
            </div>
          </div>
        </div>

        {/* Schedule strip */}
        <div className="grid gap-0 border-t border-surface-100 bg-white sm:grid-cols-2 lg:grid-cols-4">
          <ScheduleCell
            label="Pickup"
            primary={formatDateTime(booking.pickupDate)}
            secondary={locationLabel}
            icon={<MapPin className="h-4 w-4 text-brand-500" aria-hidden />}
          />
          <ScheduleCell
            label="Return"
            primary={formatDateTime(booking.returnDate)}
            secondary={locationLabel}
            icon={<MapPin className="h-4 w-4 text-brand-500" aria-hidden />}
          />
          <ScheduleCell
            label="Duration"
            primary={`${booking.totalDays ?? '—'} day(s)`}
          />
          <div className="flex items-center px-5 py-4 sm:px-6">
            {shouldShowPickupCountdown(booking.bookingStatus) ? (
              <PickupCountdownBadge
                pickupDate={booking.pickupDate}
                returnDate={booking.returnDate}
                bookingStatus={booking.bookingStatus}
                size="md"
                className="w-full border-0 bg-emerald-50/80 shadow-none ring-emerald-100"
              />
            ) : (
              <div>
                <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                  Status
                </p>
                <p className="mt-1 text-sm font-semibold text-surface-900">{statusMeta.label}</p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Alerts */}
      {needsBalancePay || (partialSuccess && booking.bookingStatus === 'PARTIAL_PAID') ? (
        <AlertBanner
          tone="amber"
          title="Partial payment received"
          action={
            <Button
              size="sm"
              className="shrink-0 gap-1.5 shadow-md"
              onClick={() => handlePayNow()}
              disabled={payLoading}
            >
              <CreditCard className="h-3.5 w-3.5" aria-hidden />
              {payLoading ? 'Opening…' : 'Pay remaining balance'}
            </Button>
          }
        >
          Pay the remaining {formatCurrency(booking.pendingBalance ?? '0')} before pickup.
          {payError ? <span className="mt-1 block text-red-700">{payError}</span> : null}
        </AlertBanner>
      ) : null}
      {kycSubmitted ? (
        <AlertBanner tone="brand" title="KYC submitted">
          Documents are under admin review. Pickup unlocks after approval.
        </AlertBanner>
      ) : null}
      {paidSuccess && booking.bookingStatus === 'CONFIRMED' ? (
        <AlertBanner tone="emerald" title="Payment successful">
          {kyc?.status !== 'APPROVED' ? (
            <>
              Complete KYC before pickup.{' '}
              <Link href={`/bookings/${booking.id}/kyc`} className="font-semibold underline">
                Upload documents →
              </Link>
            </>
          ) : (
            'You are ready for pickup.'
          )}
        </AlertBanner>
      ) : null}
      {cancelledSuccess && booking.bookingStatus === 'CANCELLED' ? (
        <AlertBanner tone="slate" title="Booking cancelled">
          {cancelMessage || 'Your booking has been cancelled.'}
        </AlertBanner>
      ) : null}

      {paymentComplete ? (
        <section className={cn(bookingPanel, 'px-4 py-5 sm:px-6 sm:py-6')}>
          <p className={cn(bookingSectionLabel, 'mb-4')}>Trip progress</p>
          <BookingProgressSteps
            paymentDone={booking.bookingStatus !== 'PAYMENT_PENDING'}
            kycStatus={kyc?.status}
            bookingStatus={booking.bookingStatus}
          />
        </section>
      ) : null}

      <PickupGuideCard
        bookingId={booking.id}
        bookingStatus={booking.bookingStatus}
        kycStatus={kyc?.status}
        pickupLabel={locationLabel}
        doorstepDelivery={booking.doorstepDelivery}
        deliveryAddress={booking.deliveryAddress}
        extraHelmetCount={booking.extraHelmetCount}
        onOpenChat={showChat ? () => setChatOpen(true) : undefined}
      />

      <div className="grid gap-5 lg:grid-cols-12 lg:gap-6">
        {/* Main column */}
        <div className="space-y-5 sm:space-y-6 lg:col-span-8">
          {/* Vehicle details */}
          <section className={cn(bookingPanel, 'overflow-hidden')}>
            <CardHeader className="border-b border-surface-100/80 pb-4">
              <p className={bookingSectionLabel}>Vehicle</p>
              <h2 className="font-display text-lg font-bold text-surface-900">Vehicle details</h2>
            </CardHeader>
            <div className="grid sm:grid-cols-[minmax(0,240px)_1fr]">
              <div className="flex items-center justify-center bg-surface-50 p-4 sm:min-h-[220px] sm:p-5 bg-white">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={imageUrl}
                  alt={vehicleTitle(booking)}
                  className="h-auto max-h-44 w-full object-contain object-center sm:max-h-52"
                />
              </div>
              <CardContent className="flex flex-col justify-center gap-3 border-t border-surface-100 p-5 sm:border-l sm:border-t-0 sm:p-6">
                <div className="flex flex-wrap items-center gap-2">
                  {booking.vehicle?.category?.name ? (
                    <span className="rounded-md bg-surface-100 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide text-slate-600">
                      {booking.vehicle.category.name}
                    </span>
                  ) : null}
                </div>
                <h3 className="font-display text-xl font-bold text-surface-900">
                  {vehicleTitle(booking)}
                </h3>
                {booking.vehicle?.pricePerDay ? (
                  <p className="text-base font-semibold text-surface-900">
                    {formatCurrency(booking.vehicle.pricePerDay)}
                    <span className="text-sm font-medium text-slate-500"> / day</span>
                  </p>
                ) : null}
                <div className="mt-1 grid gap-2.5 sm:grid-cols-3">
                  <SpecChip
                    icon={<Fuel className="h-3.5 w-3.5" aria-hidden />}
                    label="Fuel"
                    value={booking.vehicle?.fuelType ?? '—'}
                  />
                  <SpecChip
                    icon={<Gauge className="h-3.5 w-3.5" aria-hidden />}
                    label="Transmission"
                    value={
                      booking.vehicle?.transmissionType
                        ? booking.vehicle.transmissionType.charAt(0) +
                          booking.vehicle.transmissionType.slice(1).toLowerCase()
                        : '—'
                    }
                  />
                  <SpecChip
                    icon={<Users className="h-3.5 w-3.5" aria-hidden />}
                    label="Capacity"
                    value={
                      booking.vehicle?.seats != null
                        ? `${booking.vehicle.seats} Person${booking.vehicle.seats === 1 ? '' : 's'}`
                        : '2 Persons'
                    }
                  />
                </div>
              </CardContent>
            </div>
          </section>

          <BookingAddOnsCard booking={booking} />

          <BookingHubLocationCard booking={booking} />
        </div>

        {/* Sidebar */}
        <div className="space-y-5 sm:space-y-6 lg:col-span-4 lg:sticky lg:top-24 lg:self-start">
          <section className={cn(bookingPanelElevated, 'overflow-hidden')}>
            <CardHeader className="border-b border-surface-100/80 bg-surface-50/50">
              <div className="flex items-center gap-2.5">
                <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-brand-50 text-brand-600 ring-1 ring-brand-100">
                  <Wallet className="h-4 w-4" aria-hidden />
                </span>
                <div>
                  <p className={bookingSectionLabel}>Billing</p>
                  <h2 className="font-display text-lg font-bold text-surface-900">
                    Payment summary
                  </h2>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-0 pt-1">
              {parseFloat(booking.deliveryCharge ?? '0') > 0 ? (
                <DetailRow
                  label="Doorstep delivery"
                  value={formatCurrency(booking.deliveryCharge ?? '0')}
                />
              ) : null}
              {parseFloat(booking.extraHelmetCharge ?? '0') > 0 ? (
                <DetailRow
                  label={`Extra helmet${booking.extraHelmetCount ? ` (×${booking.extraHelmetCount})` : ''}`}
                  value={formatCurrency(booking.extraHelmetCharge ?? '0')}
                />
              ) : null}
              <DetailRow label="Rental total" value={formatCurrency(booking.totalAmount)} />
              <DetailRow
                label="Security deposit"
                value={formatCurrency(booking.securityDeposit)}
              />
              {parseFloat(booking.discountAmount ?? '0') > 0 ? (
                <DetailRow
                  label="Discount"
                  value={`−${formatCurrency(booking.discountAmount ?? '0')}`}
                  valueClassName="text-emerald-700"
                />
              ) : null}
              {amountPaid > 0 ? (
                <DetailRow
                  label="Paid"
                  value={`−${formatCurrency(booking.amountPaid ?? '0')}`}
                  valueClassName="text-red-600"
                />
              ) : null}
              {pendingBalance > 0 ? (
                <div className="flex items-center justify-between gap-4 border-t border-dashed border-surface-200 pt-3">
                  <span className="text-sm font-semibold text-surface-900">Balance due</span>
                  <span className="text-base font-bold text-brand-600">
                    {formatCurrency(booking.pendingBalance ?? '0')}
                  </span>
                </div>
              ) : null}
            </CardContent>

            {needsBalancePay ? (
              <CardContent className="border-t border-surface-100 pt-4">
                {payError ? <p className="mb-2 text-sm text-red-600">{payError}</p> : null}
                <Button className="w-full gap-2 shadow-md" onClick={() => handlePayNow()} disabled={payLoading}>
                  <CreditCard className="h-4 w-4" aria-hidden />
                  {payLoading ? 'Opening payment…' : 'Pay remaining balance'}
                </Button>
              </CardContent>
            ) : null}

            {needsFullPay ? (
              <CardContent className="border-t border-surface-100 pt-4">
                {payError ? <p className="mb-2 text-sm text-red-600">{payError}</p> : null}
                <Button
                  className="w-full gap-2 shadow-md"
                  onClick={() => handlePayNow('FULL')}
                  disabled={payLoading}
                >
                  <CreditCard className="h-4 w-4" aria-hidden />
                  {payLoading ? 'Opening payment…' : 'Pay now'}
                </Button>
              </CardContent>
            ) : null}
          </section>

          {booking.vendor ? (
            <section className={bookingPanel}>
              <CardHeader className="border-b border-surface-100/80 pb-3">
                <p className={bookingSectionLabel}>Partner</p>
                <h2 className="flex items-center gap-2 font-display text-base font-bold text-surface-900">
                  <Store className="h-4 w-4 text-brand-500" aria-hidden />
                  Vendor
                </h2>
              </CardHeader>
              <CardContent className="space-y-3 pt-4">
                <div>
                  <p className="text-xs text-slate-500">Business</p>
                  <p className="mt-0.5 font-semibold text-surface-900">
                    {booking.vendor.businessName}
                  </p>
                </div>
                {booking.vendor.user?.phone ? (
                  <div>
                    <p className="text-xs text-slate-500">Contact</p>
                    <a
                      href={`tel:${booking.vendor.user.phone}`}
                      className="mt-0.5 inline-flex items-center gap-1.5 text-sm font-semibold text-brand-600 hover:underline"
                    >
                      <Phone className="h-3.5 w-3.5" aria-hidden />
                      {booking.vendor.user.phone}
                    </a>
                  </div>
                ) : null}
                {showChat ? (
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    className="mt-1 w-full gap-2 border-brand-200 text-brand-700 hover:bg-brand-50"
                    onClick={() => setChatOpen(true)}
                  >
                    <MessageCircle className="h-4 w-4" aria-hidden />
                    Message vendor
                  </Button>
                ) : null}
              </CardContent>
            </section>
          ) : null}

          {showKycBanner ? (
            <section
              className={cn(
                bookingPanel,
                'border-amber-200/80 bg-gradient-to-br from-amber-50/90 to-white',
              )}
            >
              <CardContent className="space-y-3 py-5">
                <p className="font-semibold text-amber-900">KYC required</p>
                <p className="text-sm text-amber-800">
                  Status:{' '}
                  <strong>{kyc?.status?.replace(/_/g, ' ') ?? 'NOT STARTED'}</strong>
                </p>
                <Link href={`/bookings/${booking.id}/kyc`}>
                  <Button className="w-full" size="sm">
                    Upload Aadhaar & DL
                  </Button>
                </Link>
              </CardContent>
            </section>
          ) : null}

          {canCancel ? (
            <section className={cn(bookingPanel, 'border-red-100')}>
              <CardContent className="space-y-3 py-5">
                <p className="font-medium text-surface-900">Cancel booking</p>
                {booking.bookingStatus === 'PARTIAL_PAID' ? (
                  <p className="text-xs leading-relaxed text-red-700">
                    Partial payment of {formatCurrency(booking.amountPaid ?? '0')} is
                    non-refundable.
                  </p>
                ) : (
                  <p className="text-xs leading-relaxed text-slate-500">
                    Cancellation rules depend on how close you are to pickup.
                  </p>
                )}
                {cancelError ? <p className="text-sm text-red-600">{cancelError}</p> : null}
                <Button
                  variant="outline"
                  size="sm"
                  className="w-full border-red-200 text-red-700 hover:bg-red-50"
                  onClick={handleCancelBooking}
                  disabled={cancelLoading}
                >
                  {cancelLoading ? 'Cancelling…' : 'Cancel booking'}
                </Button>
              </CardContent>
            </section>
          ) : null}

          {booking.statusHistory && booking.statusHistory.length > 0 ? (
            <section className={bookingPanel}>
              <CardHeader className="border-b border-surface-100/80 pb-3">
                <p className={bookingSectionLabel}>History</p>
                <h2 className="font-display text-base font-bold text-surface-900">
                  Status timeline
                </h2>
              </CardHeader>
              <CardContent className="pt-4">
                <ol className="relative space-y-0 border-l-2 border-surface-200 pl-5">
                  {booking.statusHistory.map((item, index) => {
                    const itemMeta = getBookingStatusMeta(item.newStatus);
                    const isLast = index === booking.statusHistory!.length - 1;
                    return (
                      <li key={item.id} className="relative pb-5 last:pb-0">
                        <span
                          className={cn(
                            'absolute -left-[1.2rem] top-1 h-2.5 w-2.5 rounded-full ring-4 ring-white',
                            isLast ? itemMeta.dotClass : 'bg-slate-300',
                          )}
                          aria-hidden
                        />
                        <p className="text-sm font-semibold text-surface-900">
                          {itemMeta.label}
                        </p>
                        <p className="text-xs text-slate-500">
                          {new Date(item.createdAt).toLocaleString('en-IN')}
                        </p>
                        {item.reason ? (
                          <p className="mt-1 text-xs text-slate-600">{item.reason}</p>
                        ) : null}
                      </li>
                    );
                  })}
                </ol>
              </CardContent>
            </section>
          ) : null}
        </div>
      </div>

      {showChat && accessToken ? (
        <BookingChat
          bookingId={booking.id}
          bookingStatus={booking.bookingStatus}
          token={accessToken}
          vendorName={booking.vendor?.businessName}
          open={chatOpen}
          onOpenChange={setChatOpen}
        />
      ) : null}
    </div>
  );
}

function ScheduleCell({
  label,
  primary,
  secondary,
  icon,
}: {
  label: string;
  primary: string;
  secondary?: string;
  icon?: React.ReactNode;
}) {
  return (
    <div className="border-b border-surface-100 px-5 py-4 last:border-b-0 sm:border-b-0 sm:border-r sm:last:border-r-0 sm:px-6">
      <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">{label}</p>
      <p className="mt-1.5 text-sm font-semibold leading-snug text-surface-900">{primary}</p>
      {secondary ? (
        <p className="mt-1.5 flex items-start gap-1.5 text-xs text-slate-500">
          {icon}
          <span>{secondary}</span>
        </p>
      ) : null}
    </div>
  );
}

function SpecChip({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
}) {
  return (
    <div className="rounded-xl border border-surface-100 bg-surface-50/80 px-3 py-2.5">
      <p className="flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider text-slate-400">
        {icon}
        {label}
      </p>
      <p className="mt-0.5 text-sm font-semibold capitalize text-surface-900">{value}</p>
    </div>
  );
}

function AlertBanner({
  tone,
  title,
  children,
  action,
}: {
  tone: 'amber' | 'emerald' | 'brand' | 'slate';
  title: string;
  children: React.ReactNode;
  action?: React.ReactNode;
}) {
  const tones = {
    amber: 'border-amber-200/80 bg-amber-50 text-amber-950',
    emerald: 'border-emerald-200 bg-emerald-50 text-emerald-900',
    brand: 'border-brand-200 bg-brand-50 text-brand-900',
    slate: 'border-slate-200 bg-slate-50 text-slate-900',
  };

  return (
    <section className={cn('rounded-2xl border shadow-sm', tones[tone])}>
      <div className="flex flex-col gap-3 px-4 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-5 sm:py-4">
        <div className="flex items-start gap-3">
          <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0" aria-hidden />
          <div>
            <p className="font-semibold">{title}</p>
            <p className="mt-0.5 text-sm opacity-90">{children}</p>
          </div>
        </div>
        {action}
      </div>
    </section>
  );
}
