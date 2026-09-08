'use client';

import { useRouter } from 'next/navigation';
import { useCallback, useEffect, useState } from 'react';
import { CreditCard, HardHat, Lock, MapPin, Tag, Wallet } from 'lucide-react';
import { OtpLoginModal } from '@/features/auth/OtpLoginModal.client';
import {
  DoorstepDeliveryCheckout,
  doorstepPayload,
  isDoorstepReady,
  type DoorstepDeliverySelection,
} from '@/features/checkout/DoorstepDeliveryCheckout.client';
import { processBookingPayment } from '@/features/payments/processBookingPayment';
import { Button } from '@/components/ui/Button';
import { Card, CardContent, CardHeader } from '@/components/ui/Card';
import { Checkbox } from '@/components/ui/Checkbox';
import { Radio } from '@/components/ui/Radio';
import { VehicleServiceBadges } from '@/components/vehicles/VehicleServiceBadges';
import { Input } from '@/components/ui/Input';
import { calculatePrice, createBooking, getWalletBalance } from '@/lib/api';
import { formatCurrency } from '@/lib/utils';
import { formatRentalSchedule } from '@/lib/rental-datetime';
import { isFourWheeler } from '@/lib/vehicle-class';
import type { PriceBreakdown, Vehicle } from '@/types';
import { useAppSelector } from '@/store/hooks';

interface CheckoutFormProps {
  vehicle: Vehicle;
  pickupDate: string;
  pickupTime: string;
  returnDate: string;
  returnTime: string;
  initialExtraHelmet?: boolean;
}

function hubLabel(vehicle: Vehicle) {
  return {
    name: vehicle.hub?.name ?? vehicle.location?.name ?? 'Vendor hub',
    address: vehicle.hub?.address ?? vehicle.hub?.description ?? null,
  };
}

export function CheckoutForm({
  vehicle,
  pickupDate,
  pickupTime,
  returnDate,
  returnTime,
  initialExtraHelmet = false,
}: CheckoutFormProps) {
  const router = useRouter();
  const { accessToken, user } = useAppSelector((state) => state.auth);
  const [couponCode, setCouponCode] = useState('');
  const [appliedCoupon, setAppliedCoupon] = useState('');
  const [useWallet, setUseWallet] = useState(false);
  const [walletBalance, setWalletBalance] = useState(0);
  const [quote, setQuote] = useState<PriceBreakdown | null>(null);
  const [quoteLoading, setQuoteLoading] = useState(true);
  const [quoteError, setQuoteError] = useState('');
  const [showOtp, setShowOtp] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [doorstep, setDoorstep] = useState<DoorstepDeliverySelection>({
    enabled: false,
    address: '',
    latitude: null,
    longitude: null,
  });
  const [paymentMode, setPaymentMode] = useState<'FULL' | 'PARTIAL'>('FULL');
  const [extraHelmet, setExtraHelmet] = useState(initialExtraHelmet);
  const isCar = isFourWheeler(vehicle.vehicleClass);

  const walletAmount =
    useWallet && walletBalance > 0 ? String(Math.min(walletBalance, quote?.totalAmount ?? 0)) : undefined;

  const refreshQuote = useCallback(async () => {
    setQuoteLoading(true);
    setQuoteError('');
    try {
      const result = await calculatePrice({
        vehicleId: vehicle.id,
        pickupDate,
        pickupTime,
        returnDate,
        returnTime,
        ...(appliedCoupon ? { couponCode: appliedCoupon } : {}),
        ...(walletAmount ? { walletAmount } : {}),
        ...(doorstep.enabled && isDoorstepReady(doorstep) ? doorstepPayload(doorstep) : {}),
        ...(extraHelmet && !isCar ? { extraHelmetCount: 1 } : {}),
      });
      setQuote(result);
    } catch (err) {
      setQuoteError(err instanceof Error ? err.message : 'Unable to calculate price');
      setQuote(null);
    } finally {
      setQuoteLoading(false);
    }
  }, [
    vehicle.id,
    pickupDate,
    pickupTime,
    returnDate,
    returnTime,
    appliedCoupon,
    walletAmount,
    doorstep.enabled,
    doorstep.address,
    doorstep.latitude,
    doorstep.longitude,
    extraHelmet,
    isCar,
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

  function handleApplyCoupon() {
    setAppliedCoupon(couponCode.trim().toUpperCase());
  }

  async function handleProceedToPay() {
    setError('');
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

  async function createBookingAndPay(token: string) {
    if (!quote) {
      setError('Price not ready — please wait or refresh');
      return;
    }

    setLoading(true);
    try {
      const booking = await createBooking(token, {
        vehicleId: vehicle.id,
        pickupDate,
        pickupTime,
        returnDate,
        returnTime,
        ...(appliedCoupon ? { couponCode: appliedCoupon } : {}),
        ...(walletAmount ? { walletAmount } : {}),
        ...doorstepPayload(doorstep),
        ...(extraHelmet && !isCar ? { extraHelmetCount: 1 } : {}),
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

  return (
    <>
      <Card className="shadow-card-hover">
        <CardHeader className="bg-surface-50">
          <h2 className="font-display text-xl font-bold text-surface-900">Trip summary</h2>
          <p className="mt-1 text-sm text-slate-500">
            {vehicle.brand?.name} {vehicle.model} ·{' '}
            {formatRentalSchedule(pickupDate, pickupTime)} → {formatRentalSchedule(returnDate, returnTime)}
          </p>
          <div className="mt-3">
            <VehicleServiceBadges vehicle={vehicle} />
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          {quoteLoading ? (
            <p className="text-sm text-slate-500">Calculating price...</p>
          ) : quote ? (
            <dl className="space-y-3 text-sm">
              <div className="flex justify-between">
                <dt className="text-slate-500">
                  {formatCurrency(quote.baseDailyRate)} × {quote.durationDays} day
                  {quote.durationDays > 1 ? 's' : ''}
                </dt>
                <dd className="font-semibold text-surface-900">{formatCurrency(quote.subtotal)}</dd>
              </div>
              {quote.subtotalAdjusted !== quote.subtotal ? (
                <div className="flex justify-between text-slate-500">
                  <dt>Dynamic pricing adjustment</dt>
                  <dd>{formatCurrency(quote.subtotalAdjusted)}</dd>
                </div>
              ) : null}
              {quote.couponDiscount > 0 ? (
                <div className="flex justify-between text-emerald-700">
                  <dt>Coupon discount</dt>
                  <dd>-{formatCurrency(quote.couponDiscount)}</dd>
                </div>
              ) : null}
              {quote.walletApplied > 0 ? (
                <div className="flex justify-between text-emerald-700">
                  <dt>Wallet applied</dt>
                  <dd>-{formatCurrency(quote.walletApplied)}</dd>
                </div>
              ) : null}
              {quote.taxAmount > 0 ? (
                <div className="flex justify-between">
                  <dt className="text-slate-500">Tax</dt>
                  <dd className="font-semibold text-surface-900">{formatCurrency(quote.taxAmount)}</dd>
                </div>
              ) : null}
              {(quote.deliveryCharge ?? 0) > 0 ? (
                <div className="flex justify-between text-emerald-800">
                  <dt>
                    Doorstep delivery ({quote.deliveryDistanceKm} km × ₹
                    {quote.deliveryRatePerKm}/km)
                  </dt>
                  <dd className="font-semibold">{formatCurrency(quote.deliveryCharge ?? 0)}</dd>
                </div>
              ) : null}
              {(quote.extraHelmetCharge ?? 0) > 0 ? (
                <div className="flex justify-between">
                  <dt className="text-slate-500">
                    Extra helmet ({quote.extraHelmetCount} × {quote.durationDays} day
                    {quote.durationDays > 1 ? 's' : ''})
                  </dt>
                  <dd className="font-semibold text-surface-900">
                    {formatCurrency(quote.extraHelmetCharge ?? 0)}
                  </dd>
                </div>
              ) : null}
              <div className="flex justify-between">
                <dt className="text-slate-500">Trip total</dt>
                <dd className="font-semibold text-surface-900">{formatCurrency(quote.totalAmount)}</dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-slate-500">
                  Refundable security deposit
                  {quote.engineCc ? ` (${quote.engineCc}cc)` : ''}
                </dt>
                <dd className="font-semibold text-surface-900">
                  {formatCurrency(quote.securityDeposit)}
                </dd>
              </div>
              {quote.securityDepositRule ? (
                <p className="text-xs text-slate-500">{quote.securityDepositRule}</p>
              ) : null}
              <div className="flex justify-between border-t border-surface-100 pt-4">
                <dt className="font-display text-lg font-bold text-surface-900">Amount due now</dt>
                <dd className="font-display text-2xl font-bold text-brand-600">
                  {formatCurrency(
                    paymentMode === 'PARTIAL' && quote.partialPayment?.eligible
                      ? quote.partialPayment.payNowAmount
                      : quote.amountDueNow,
                  )}
                </dd>
              </div>
              {paymentMode === 'PARTIAL' && quote.partialPayment?.eligible ? (
                <div className="flex justify-between text-sm text-amber-800">
                  <dt>Balance before pickup</dt>
                  <dd className="font-semibold">
                    {formatCurrency(quote.partialPayment.pendingBalance)}
                  </dd>
                </div>
              ) : null}
            </dl>
          ) : (
            <p className="rounded-lg bg-red-50 px-4 py-3 text-sm text-red-700">
              {quoteError || 'Price unavailable'}
            </p>
          )}

          {!doorstep.enabled ? (
            <div className="rounded-xl border border-brand-100 bg-brand-50/60 p-4">
              <p className="flex items-center gap-2 text-sm font-semibold text-brand-900">
                <MapPin className="h-4 w-4 text-brand-600" aria-hidden />
                Hub pickup & return
              </p>
              <p className="mt-2 font-medium text-surface-900">{hubLabel(vehicle).name}</p>
              {hubLabel(vehicle).address ? (
                <p className="mt-1 text-sm text-slate-600">{hubLabel(vehicle).address}</p>
              ) : null}
              <p className="mt-2 text-xs text-slate-500">
                This vehicle is linked to the hub above — collect and return here.
              </p>
            </div>
          ) : (
            <p className="rounded-xl border border-violet-100 bg-violet-50/80 px-4 py-3 text-sm text-violet-900">
              Pickup and return at your pinned address — vendor will deliver and collect from the
              same location.
            </p>
          )}

          {!isCar ? (
            <label className="flex cursor-pointer items-start gap-3 rounded-xl border border-surface-200 bg-surface-50 p-4">
              <Checkbox
                checked={extraHelmet}
                onChange={(e) => setExtraHelmet(e.target.checked)}
              />
              <span>
                <span className="flex items-center gap-2 text-sm font-semibold text-surface-900">
                  <HardHat className="h-4 w-4 text-brand-500" aria-hidden />
                  Add extra helmet
                </span>
                <span className="mt-1 block text-xs text-slate-500">
                  1 helmet included free. Extra helmet charged per rental day
                  {quote?.extraHelmetPricePerDay
                    ? ` (₹${quote.extraHelmetPricePerDay}/day)`
                    : ''}
                  .
                </span>
              </span>
            </label>
          ) : (
            <p className="rounded-xl border border-sky-100 bg-sky-50/80 px-4 py-3 text-sm text-sky-900">
              Valid LMV driving license required for car rental. Upload during KYC before pickup.
            </p>
          )}

          {vehicle.doorstepDelivery ? (
            <DoorstepDeliveryCheckout
              ratePerKm={quote?.deliveryRatePerKm ?? 30}
              value={doorstep}
              onChange={setDoorstep}
            />
          ) : null}

          <div className="rounded-xl border border-dashed border-brand-200 bg-brand-50/50 p-4">
            <div className="flex items-center gap-2 text-sm font-medium text-brand-800">
              <Tag className="h-4 w-4" aria-hidden />
              Have a coupon?
            </div>
            <div className="mt-3 flex gap-2">
              <Input
                placeholder="e.g. ONNRIDE50"
                value={couponCode}
                onChange={(e) => setCouponCode(e.target.value.toUpperCase())}
              />
              <Button type="button" variant="outline" onClick={handleApplyCoupon}>
                Apply
              </Button>
            </div>
            {appliedCoupon ? (
              <p className="mt-2 text-xs text-emerald-700">Applied: {appliedCoupon}</p>
            ) : null}
            {quoteError && appliedCoupon ? (
              <p className="mt-2 text-xs text-red-600">{quoteError}</p>
            ) : null}
          </div>

          {accessToken && walletBalance > 0 ? (
            <label className="flex cursor-pointer items-start gap-3 rounded-xl border border-surface-200 bg-surface-50 p-4">
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

          {quote?.partialPayment?.enabled && quote.partialPayment.eligible ? (
            <div className="space-y-3 rounded-xl border border-amber-200 bg-amber-50/80 p-4">
              <p className="text-sm font-semibold text-amber-950">
                Pay part now, balance at pickup
              </p>
              <p className="text-xs text-amber-900/80">
                Confirm with {formatCurrency(quote.partialPayment.payNowAmount)} now. Pay{' '}
                {formatCurrency(quote.partialPayment.pendingBalance)} before ride start — same flow
                as leading rental platforms.
              </p>
              <label className="flex cursor-pointer items-start gap-3 rounded-lg border border-surface-200 bg-white p-3">
                <Radio
                  name="paymentMode"
                  checked={paymentMode === 'FULL'}
                  onChange={() => setPaymentMode('FULL')}
                />
                <span>
                  <span className="block text-sm font-medium text-surface-900">Pay full amount</span>
                  <span className="mt-0.5 block text-xs text-slate-500">
                    {formatCurrency(quote.amountDueNow)} now
                  </span>
                </span>
              </label>
              <label className="flex cursor-pointer items-start gap-3 rounded-lg border border-amber-300 bg-white p-3">
                <Radio
                  name="paymentMode"
                  checked={paymentMode === 'PARTIAL'}
                  onChange={() => setPaymentMode('PARTIAL')}
                />
                <span>
                  <span className="block text-sm font-medium text-surface-900">
                    Partial pay now — balance at pickup
                  </span>
                  <span className="mt-0.5 block text-xs text-slate-600">
                    Pay {formatCurrency(quote.partialPayment.payNowAmount)} now ·{' '}
                    {formatCurrency(quote.partialPayment.pendingBalance)} before pickup
                  </span>
                </span>
              </label>
            </div>
          ) : null}

          <div className="rounded-xl border border-surface-200 bg-surface-50 p-4">
            <div className="flex items-center gap-2 text-sm font-semibold text-surface-900">
              <CreditCard className="h-4 w-4 text-brand-500" aria-hidden />
              Pay online via Razorpay
            </div>
            <p className="mt-1 text-xs text-slate-500">UPI · Cards · Netbanking</p>
          </div>

          {user ? (
            <p className="text-sm text-slate-600">
              Logged in as <span className="font-medium">{user.phone}</span>
            </p>
          ) : (
            <p className="rounded-lg bg-amber-50 px-4 py-3 text-sm text-amber-800">
              WhatsApp OTP verification required before payment — takes under a minute.
            </p>
          )}

          {error ? (
            <p className="rounded-lg bg-red-50 px-4 py-3 text-sm text-red-700">{error}</p>
          ) : null}

          <Button
            size="lg"
            className="w-full gap-2"
            onClick={handleProceedToPay}
            disabled={loading || quoteLoading || !quote || (doorstep.enabled && !isDoorstepReady(doorstep))}
          >
            <Lock className="h-4 w-4" aria-hidden />
            {loading
              ? 'Processing payment...'
              : accessToken
                ? paymentMode === 'PARTIAL' && quote?.partialPayment?.eligible
                  ? `Pay ${formatCurrency(quote.partialPayment.payNowAmount)} now`
                  : 'Confirm & pay'
                : 'Login to pay'}
          </Button>

          <p className="text-center text-xs text-slate-400">
            By booking you agree to vendor terms. KYC and full payment (if partial) required before
            pickup.
          </p>
        </CardContent>
      </Card>

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
