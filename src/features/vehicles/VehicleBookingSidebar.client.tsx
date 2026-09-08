'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useCallback, useEffect, useRef, useState } from 'react';
import {
  Home,
  Info,
  Lock,
  MapPin,
  Tag,
  Users,
  Wallet,
  Zap,
} from 'lucide-react';
import { OtpLoginModal } from '@/features/auth/OtpLoginModal.client';
import {
  DoorstepDeliveryCheckout,
  doorstepPayload,
  isDoorstepReady,
  type DoorstepDeliverySelection,
} from '@/features/checkout/DoorstepDeliveryCheckout.client';
import { processBookingPayment } from '@/features/payments/processBookingPayment';
import { Button } from '@/components/ui/Button';
import { Checkbox } from '@/components/ui/Checkbox';
import { Radio } from '@/components/ui/Radio';
import { Input } from '@/components/ui/Input';
import { calculatePrice, createBooking, getWalletBalance } from '@/lib/api';
import { DEFAULT_PICKUP_TIME, DEFAULT_RETURN_TIME } from '@/lib/rental-datetime';
import { cn, formatCurrency } from '@/lib/utils';
import type { PriceBreakdown, Vehicle } from '@/types';
import { useAppSelector } from '@/store/hooks';
import {
  RentalScheduleEditor,
  type RentalScheduleValue,
} from '@/features/vehicles/RentalScheduleEditor.client';

interface VehicleBookingSidebarProps {
  vehicle: Vehicle;
  pickupDate: string;
  pickupTime: string;
  returnDate: string;
  returnTime: string;
  extraHelmet: boolean;
  urlSearchParams: Record<string, string>;
}

function buildQueryParams(
  base: Record<string, string>,
  updates: Record<string, string>,
): URLSearchParams {
  const params = new URLSearchParams();
  const merged = { ...base, ...updates };
  Object.entries(merged).forEach(([key, value]) => {
    if (value) params.set(key, value);
  });
  return params;
}

function hubPickupLabel(vehicle: Vehicle): { title: string; detail: string | null } {
  const hub = vehicle.hub;
  return {
    title: hub?.name ?? vehicle.location?.name ?? 'Vendor hub',
    detail: hub?.address ?? hub?.description ?? null,
  };
}

function defaultSchedule(): RentalScheduleValue {
  const pickup = new Date();
  pickup.setDate(pickup.getDate() + 1);
  const ret = new Date();
  ret.setDate(ret.getDate() + 2);
  return {
    pickupDate: pickup.toISOString().split('T')[0],
    pickupTime: DEFAULT_PICKUP_TIME,
    returnDate: ret.toISOString().split('T')[0],
    returnTime: DEFAULT_RETURN_TIME,
  };
}

function resolveSchedule(
  pickupDate: string,
  pickupTime: string,
  returnDate: string,
  returnTime: string,
): RentalScheduleValue {
  if (pickupDate && returnDate) {
    return { pickupDate, pickupTime, returnDate, returnTime };
  }
  return defaultSchedule();
}

export function VehicleBookingSidebar({
  vehicle,
  pickupDate,
  pickupTime,
  returnDate,
  returnTime,
  extraHelmet,
  urlSearchParams,
}: VehicleBookingSidebarProps) {
  const router = useRouter();
  const pathname = usePathname();
  const { accessToken, user } = useAppSelector((state) => state.auth);

  const [schedule, setSchedule] = useState<RentalScheduleValue>(() =>
    resolveSchedule(pickupDate, pickupTime, returnDate, returnTime),
  );

  const [couponCode, setCouponCode] = useState('');
  const [appliedCoupon, setAppliedCoupon] = useState('');
  const [useWallet, setUseWallet] = useState(false);
  const [walletBalance, setWalletBalance] = useState(0);
  const [quote, setQuote] = useState<PriceBreakdown | null>(null);
  const [quoteLoading, setQuoteLoading] = useState(true);
  const [quoteError, setQuoteError] = useState('');
  const [showBreakup, setShowBreakup] = useState(false);
  const [showOtp, setShowOtp] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [agreedTerms, setAgreedTerms] = useState(false);
  const [paymentMode, setPaymentMode] = useState<'FULL' | 'PARTIAL'>('FULL');
  const [doorstep, setDoorstep] = useState<DoorstepDeliverySelection>({
    enabled: false,
    address: '',
    latitude: null,
    longitude: null,
  });
  const defaultedPaymentMode = useRef(false);

  const hasDates = Boolean(schedule.pickupDate && schedule.returnDate);
  const hubPickup = hubPickupLabel(vehicle);
  const isDoorstepPickup = doorstep.enabled;

  useEffect(() => {
    setSchedule(resolveSchedule(pickupDate, pickupTime, returnDate, returnTime));
  }, [pickupDate, pickupTime, returnDate, returnTime]);

  useEffect(() => {
    if (pickupDate && returnDate) return;

    const defaults = defaultSchedule();
    const params = buildQueryParams(urlSearchParams, {
      pickupDate: defaults.pickupDate,
      pickupTime: defaults.pickupTime,
      returnDate: defaults.returnDate,
      returnTime: defaults.returnTime,
    });
    router.replace(`${pathname}?${params.toString()}`, { scroll: false });
  }, [pickupDate, returnDate, pathname, router, urlSearchParams]);

  function handleScheduleChange(next: RentalScheduleValue) {
    setSchedule(next);
    const params = buildQueryParams(urlSearchParams, {
      pickupDate: next.pickupDate,
      pickupTime: next.pickupTime,
      returnDate: next.returnDate,
      returnTime: next.returnTime,
    });
    router.replace(`${pathname}?${params.toString()}`, { scroll: false });
  }

  const walletAmount =
    useWallet && walletBalance > 0 ? String(Math.min(walletBalance, quote?.totalAmount ?? 0)) : undefined;

  const partialEligible = Boolean(quote?.partialPayment?.enabled && quote.partialPayment.eligible);

  const refreshQuote = useCallback(async () => {
    if (!hasDates) {
      setQuote(null);
      setQuoteLoading(false);
      return;
    }
    setQuoteLoading(true);
    setQuoteError('');
    try {
      const result = await calculatePrice({
        vehicleId: vehicle.id,
        pickupDate: schedule.pickupDate,
        pickupTime: schedule.pickupTime,
        returnDate: schedule.returnDate,
        returnTime: schedule.returnTime,
        ...(appliedCoupon ? { couponCode: appliedCoupon } : {}),
        ...(walletAmount ? { walletAmount } : {}),
        ...(doorstep.enabled && isDoorstepReady(doorstep) ? doorstepPayload(doorstep) : {}),
        ...(extraHelmet ? { extraHelmetCount: 1 } : {}),
      });
      setQuote(result);
      if (result.partialPayment?.eligible && !defaultedPaymentMode.current) {
        setPaymentMode('PARTIAL');
        defaultedPaymentMode.current = true;
      }
    } catch (err) {
      setQuoteError(err instanceof Error ? err.message : 'Unable to calculate price');
      setQuote(null);
    } finally {
      setQuoteLoading(false);
    }
  }, [
    vehicle.id,
    schedule.pickupDate,
    schedule.pickupTime,
    schedule.returnDate,
    schedule.returnTime,
    appliedCoupon,
    walletAmount,
    doorstep.enabled,
    doorstep.address,
    doorstep.latitude,
    doorstep.longitude,
    extraHelmet,
    hasDates,
  ]);

  useEffect(() => {
    void refreshQuote();
  }, [refreshQuote]);

  useEffect(() => {
    if (!accessToken) {
      setWalletBalance(0);
      return;
    }
    void getWalletBalance(accessToken).then((data) => {
      setWalletBalance(data ? parseFloat(data.balance) : 0);
    });
  }, [accessToken]);

  const payNowAmount =
    paymentMode === 'PARTIAL' && partialEligible && quote?.partialPayment
      ? quote.partialPayment.payNowAmount
      : quote?.amountDueNow ?? 0;

  async function createBookingAndPay(token: string) {
    if (!quote) {
      setError('Price not ready — please wait');
      return;
    }

    setLoading(true);
    try {
      const booking = await createBooking(token, {
        vehicleId: vehicle.id,
        pickupDate: schedule.pickupDate,
        pickupTime: schedule.pickupTime,
        returnDate: schedule.returnDate,
        returnTime: schedule.returnTime,
        ...(appliedCoupon ? { couponCode: appliedCoupon } : {}),
        ...(walletAmount ? { walletAmount } : {}),
        ...doorstepPayload(doorstep),
        ...(extraHelmet ? { extraHelmetCount: 1 } : {}),
      });

      await processBookingPayment(token, booking.id, user?.phone, paymentMode);
      if (paymentMode === 'PARTIAL' && quote.partialPayment?.eligible) {
        router.replace(`/bookings/${booking.id}?partial=1`);
      } else {
        router.replace(`/bookings/${booking.id}/kyc?from=payment`);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Booking or payment failed');
    } finally {
      setLoading(false);
    }
  }

  async function handleProceedToPay() {
    setError('');
    if (!agreedTerms) {
      setError('Please accept the terms & conditions to continue');
      return;
    }
    if (doorstep.enabled && !isDoorstepReady(doorstep)) {
      setError('Enter delivery address and pin your location for doorstep delivery');
      return;
    }
    if (!accessToken) {
      setShowOtp(true);
      return;
    }
    await createBookingAndPay(accessToken);
  }

  return (
    <>
      <div className="overflow-hidden rounded-2xl border border-surface-200 bg-white shadow-lg shadow-surface-900/[0.04] ring-1 ring-surface-900/[0.02]">
        {/* Trip dates */}
        <div className="p-5 sm:p-6">
          <RentalScheduleEditor value={schedule} onChange={handleScheduleChange} />
        </div>

        {/* Pricing summary */}
        <div className="border-t border-surface-100 px-5 py-5 sm:px-6 sm:py-6">
          {quoteLoading ? (
            <div className="grid grid-cols-2 gap-3">
              {[0, 1].map((i) => (
                <div
                  key={i}
                  className="h-[72px] animate-pulse rounded-xl bg-surface-100"
                  aria-hidden
                />
              ))}
            </div>
          ) : quote ? (
            <div className="grid grid-cols-2 gap-3">
              <div className="rounded-xl border border-surface-100 bg-surface-50/80 p-3.5 sm:p-4">
                <p className="flex items-center gap-1 text-[11px] font-medium uppercase tracking-wide text-slate-500">
                  Total rent
                  <Info className="h-3.5 w-3.5" aria-hidden />
                </p>
                <p className="mt-1.5 font-display text-xl font-bold text-brand-600 sm:text-2xl">
                  {formatCurrency(quote.totalAmount)}
                </p>
              </div>
              <div className="rounded-xl border border-surface-100 bg-surface-50/80 p-3.5 sm:p-4">
                <p className="flex items-center gap-1 text-[11px] font-medium uppercase tracking-wide text-slate-500">
                  Security deposit
                  <Info className="h-3.5 w-3.5" aria-hidden />
                </p>
                <p className="mt-1.5 font-display text-xl font-bold text-brand-600 sm:text-2xl">
                  {formatCurrency(quote.securityDeposit)}
                </p>
              </div>
            </div>
          ) : null}

          {quote?.securityDepositRule ? (
            <p className="mt-3 text-xs leading-relaxed text-slate-500">{quote.securityDepositRule}</p>
          ) : null}
        </div>

        {/* Doorstep + pickup */}
        <div className="space-y-5 border-t border-surface-100 px-5 py-5 sm:space-y-6 sm:px-6 sm:py-6">
          {vehicle.doorstepDelivery ? (
            <DoorstepDeliveryCheckout
              ratePerKm={quote?.deliveryRatePerKm ?? 30}
              value={doorstep}
              onChange={setDoorstep}
            />
          ) : null}

          <div>
            <p className="mb-2.5 text-[11px] font-semibold uppercase tracking-wide text-slate-500">
              Pickup location
            </p>
            {isDoorstepPickup ? (
              <div className="rounded-xl bg-violet-600 p-4 text-white sm:p-5">
                <p className="flex items-center gap-2 text-sm font-semibold">
                  <Home className="h-4 w-4 shrink-0" aria-hidden />
                  Doorstep pickup & return
                </p>
                <p className="mt-2 text-sm font-semibold leading-snug">
                  {doorstep.address.trim() || 'Enter your address above'}
                </p>
                {doorstep.latitude && doorstep.longitude ? (
                  <p className="mt-2 inline-flex items-center gap-1 text-xs text-violet-100">
                    <MapPin className="h-3.5 w-3.5" aria-hidden />
                    Location pinned · deliver & collect here
                  </p>
                ) : (
                  <p className="mt-2 text-xs text-violet-100">
                    Pin location above — same address for pickup and return
                  </p>
                )}
                <p className="mt-2 text-xs text-violet-100">Handover timings: 9 AM to 9 PM</p>
              </div>
            ) : (
              <div className="rounded-xl bg-brand-600 p-4 text-white sm:p-5">
                <p className="flex items-center gap-2 text-sm font-semibold">
                  <MapPin className="h-4 w-4 shrink-0" aria-hidden />
                  {hubPickup.title}
                </p>
                {hubPickup.detail ? (
                  <p className="mt-2 text-sm leading-relaxed text-brand-100">{hubPickup.detail}</p>
                ) : null}
                <p className="mt-2 text-xs text-brand-100">Hub pickup & return · 9 AM to 9 PM</p>
              </div>
            )}
          </div>

          <p className="flex items-center gap-2 text-sm text-slate-600">
            <Users className="h-4 w-4 shrink-0 text-slate-400" aria-hidden />
            1 vehicle per booking
          </p>
        </div>

        {/* Coupon & wallet */}
        <div className="space-y-4 border-t border-surface-100 px-5 py-5 sm:px-6 sm:py-6">
          <div className="rounded-xl border border-dashed border-brand-200 bg-brand-50/40 p-4">
            <div className="flex items-center gap-2 text-sm font-semibold text-brand-800">
              <Tag className="h-4 w-4" aria-hidden />
              Have a coupon?
            </div>
            <div className="mt-3 flex gap-2">
              <Input
                placeholder="e.g. ONNRIDE50"
                value={couponCode}
                onChange={(e) => setCouponCode(e.target.value.toUpperCase())}
              />
              <Button
                type="button"
                variant="outline"
                className="shrink-0"
                onClick={() => setAppliedCoupon(couponCode.trim().toUpperCase())}
              >
                Apply
              </Button>
            </div>
            {appliedCoupon ? (
              <p className="mt-2 text-xs font-medium text-emerald-700">Applied: {appliedCoupon}</p>
            ) : null}
          </div>

          {accessToken && walletBalance > 0 ? (
            <label className="flex cursor-pointer items-start gap-3 rounded-xl border border-surface-100 bg-surface-50/80 p-4">
              <Checkbox
                checked={useWallet}
                onChange={(e) => setUseWallet(e.target.checked)}
              />
              <span>
                <span className="flex items-center gap-2 text-sm font-semibold text-surface-900">
                  <Wallet className="h-4 w-4 text-brand-500" aria-hidden />
                  Use OnnRide wallet
                </span>
                <span className="mt-1 block text-xs text-slate-500">
                  Balance: {formatCurrency(walletBalance)}
                </span>
              </span>
            </label>
          ) : null}

          {quoteError ? (
            <p className="rounded-lg bg-red-50 px-3 py-2.5 text-xs text-red-700">{quoteError}</p>
          ) : null}
        </div>

        {/* Payment method */}
        <div className="border-t border-surface-100 px-5 py-5 sm:px-6 sm:py-6">
          {quote && partialEligible ? (
            <div className="space-y-3">
              <h3 className="text-sm font-bold text-surface-900">Select payment method</h3>

              <label
                className={cn(
                  'flex cursor-pointer gap-3 rounded-xl border-2 p-4 transition sm:p-5',
                  paymentMode === 'PARTIAL'
                    ? 'border-emerald-500 bg-emerald-50/30'
                    : 'border-surface-200 bg-white',
                )}
              >
              <Radio
                name="paymentMode"
                checked={paymentMode === 'PARTIAL'}
                onChange={() => setPaymentMode('PARTIAL')}
              />
              <span className="flex-1">
                <span className="font-display text-2xl font-bold text-brand-600">
                  {formatCurrency(quote.partialPayment!.payNowAmount)}
                </span>
                <span className="mt-1 flex flex-wrap items-center gap-2">
                  <span className="text-sm font-semibold text-surface-900">Partial payment</span>
                  <span className="rounded-full bg-emerald-100 px-2 py-0.5 text-[10px] font-bold uppercase text-emerald-800">
                    Recommended
                  </span>
                </span>
                <span className="mt-1 block text-xs text-slate-500">
                  Pay part now, balance at pickup
                  {quote.partialPayment?.ruleApplied
                    ? ` (${quote.partialPayment.ruleApplied})`
                    : ''}
                </span>
              </span>
            </label>

            <label
              className={cn(
                'flex cursor-pointer gap-3 rounded-xl border-2 p-4 transition sm:p-5',
                paymentMode === 'FULL'
                  ? 'border-brand-500 bg-brand-50/30'
                  : 'border-surface-200 bg-white',
              )}
            >
              <Radio
                name="paymentMode"
                checked={paymentMode === 'FULL'}
                onChange={() => setPaymentMode('FULL')}
              />
              <span className="flex-1">
                <span className="font-display text-2xl font-bold text-brand-600">
                  {formatCurrency(quote.amountDueNow)}
                </span>
                <span className="mt-1 block text-sm font-semibold text-surface-900">Full payment</span>
                <span className="mt-1 block text-xs text-slate-500">
                  Pay rent + deposit now
                </span>
              </span>
            </label>

            <div className="rounded-xl bg-sky-50 px-4 py-3 text-center text-sm leading-relaxed text-sky-900">
              Pay{' '}
              <strong>{formatCurrency(quote.partialPayment!.pendingBalance)}</strong> at pickup
              {paymentMode === 'PARTIAL' ? ' (remaining balance)' : ''}
            </div>
          </div>
        ) : quote && !quoteLoading ? (
          <div className="rounded-xl border border-surface-100 bg-surface-50/80 p-4 sm:p-5">
            <p className="text-xs font-medium uppercase tracking-wide text-slate-500">
              Amount due now
            </p>
            <p className="mt-1 text-xs text-slate-500">Rent + security deposit</p>
            <p className="mt-2 font-display text-2xl font-bold text-surface-900">
              {formatCurrency(quote.amountDueNow)}
            </p>
          </div>
        ) : null}

          <button
            type="button"
            className="mt-4 text-xs font-semibold text-brand-600 hover:underline"
            onClick={() => setShowBreakup((open) => !open)}
          >
            {showBreakup ? 'Hide breakup' : 'Show price breakup'}
          </button>

          {showBreakup && quote ? (
            <dl className="mt-3 space-y-2.5 rounded-xl border border-surface-100 bg-surface-50/80 p-4 text-xs">
            <div className="flex justify-between">
              <dt>
                Base ({quote.durationDays} day{quote.durationDays > 1 ? 's' : ''})
              </dt>
              <dd>{formatCurrency(quote.subtotalAdjusted)}</dd>
            </div>
            {(quote.extraHelmetCharge ?? 0) > 0 ? (
              <div className="flex justify-between">
                <dt>Extra helmet</dt>
                <dd>{formatCurrency(quote.extraHelmetCharge ?? 0)}</dd>
              </div>
            ) : null}
            {(quote.deliveryCharge ?? 0) > 0 ? (
              <div className="flex justify-between">
                <dt>Doorstep delivery</dt>
                <dd>{formatCurrency(quote.deliveryCharge ?? 0)}</dd>
              </div>
            ) : null}
            {quote.couponDiscount > 0 ? (
              <div className="flex justify-between text-emerald-700">
                <dt>Coupon</dt>
                <dd>-{formatCurrency(quote.couponDiscount)}</dd>
              </div>
            ) : null}
            {quote.walletApplied > 0 ? (
              <div className="flex justify-between text-emerald-700">
                <dt>Wallet</dt>
                <dd>-{formatCurrency(quote.walletApplied)}</dd>
              </div>
            ) : null}
            {quote.taxAmount > 0 ? (
              <div className="flex justify-between">
                <dt>Tax</dt>
                <dd>{formatCurrency(quote.taxAmount)}</dd>
              </div>
            ) : null}
            <div className="flex justify-between border-t border-surface-200 pt-2 font-semibold">
              <dt>Rental total</dt>
              <dd>{formatCurrency(quote.totalAmount)}</dd>
            </div>
            <div className="flex justify-between">
              <dt>+ Deposit</dt>
              <dd>{formatCurrency(quote.securityDeposit)}</dd>
            </div>
            </dl>
          ) : null}
        </div>

        {/* Checkout footer */}
        <div className="border-t border-surface-100 bg-surface-50/50 px-5 py-5 sm:px-6 sm:py-6">
          <label className="flex cursor-pointer items-start gap-2.5 text-sm leading-relaxed text-slate-600">
            <Checkbox
              className="mt-0.5"
              checked={agreedTerms}
              onChange={(e) => setAgreedTerms(e.target.checked)}
            />
            <span>
              I agree to OnnRide&apos;s{' '}
              <Link href="/terms" className="font-medium text-brand-600 hover:underline">
                Terms & Conditions
              </Link>
            </span>
          </label>

          {!accessToken ? (
            <p className="mt-3 rounded-lg border border-amber-100 bg-amber-50 px-3 py-2.5 text-xs text-amber-800">
              WhatsApp OTP login required before payment.
            </p>
          ) : (
            <p className="mt-3 text-xs text-slate-500">
              Logged in as <span className="font-medium text-surface-700">{user?.phone}</span>
            </p>
          )}

          {error ? (
            <p className="mt-3 rounded-lg bg-red-50 px-3 py-2.5 text-xs text-red-700">{error}</p>
          ) : null}

          <Button
            size="lg"
            className="mt-5 w-full gap-2 shadow-md shadow-brand-500/20"
            disabled={
              loading ||
              quoteLoading ||
              !quote ||
              !hasDates ||
              Boolean(quoteError) ||
              (doorstep.enabled && !isDoorstepReady(doorstep))
            }
            onClick={handleProceedToPay}
          >
            <Lock className="h-4 w-4" aria-hidden />
            {loading
              ? 'Processing…'
              : accessToken
                ? `Pay ${formatCurrency(payNowAmount)} and reserve`
                : 'Login to pay and reserve'}
          </Button>

          <p className="mt-3 flex items-center justify-center gap-1.5 text-center text-[11px] text-slate-400">
            <Zap className="h-3.5 w-3.5" aria-hidden />
            Secure Razorpay · UPI · Cards
          </p>
        </div>
      </div>

      <OtpLoginModal
        open={showOtp}
        onClose={() => setShowOtp(false)}
        onSuccess={() => {
          const token = localStorage.getItem('onnride_auth');
          if (token) {
            const parsed = JSON.parse(token) as { accessToken: string };
            void createBookingAndPay(parsed.accessToken);
          }
        }}
      />
    </>
  );
}
