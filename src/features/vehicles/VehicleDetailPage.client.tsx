'use client';

import Link from 'next/link';
import { useEffect, useMemo, useState, type ReactNode } from 'react';
import {
  ChevronRight,
  ChevronDown,
  ChevronUp,
  Gauge,
  HardHat,
  Home,
  MapPin,
  ShieldCheck,
  Star,
} from 'lucide-react';
import { VehicleBookingSidebar } from '@/features/vehicles/VehicleBookingSidebar.client';
import { VehicleCardMedia } from '@/components/vehicles/VehicleCardMedia.client';
import { VehicleImageFallback } from '@/components/vehicles/VehicleImageFallback';
import { getPickupPoints } from '@/lib/api';
import { rentalQueryString } from '@/lib/rental-datetime';
import { settingBool } from '@/lib/public-settings';
import { resolveVehicleListingImageUrl } from '@/lib/vehicle-image';
import { DETAIL_IMAGE_SIZE } from '@/lib/image-variants';
import { formatFuelType, getVehicleTransmission } from '@/lib/vehicle-ui';
import { isFourWheeler } from '@/lib/vehicle-class';
import { cn, formatCurrency } from '@/lib/utils';
import type { PickupPoint, Vehicle } from '@/types';

const THINGS_TO_REMEMBER_BIKE = [
  'You must be 18+ with a valid driving license for the vehicle category.',
  'Fuel is not included — vehicle handed over with enough fuel to reach the nearest pump.',
  'Complete KYC (Aadhaar + DL) after booking and before pickup handover.',
  'One complimentary helmet is included; request an extra helmet as an add-on if needed.',
  'Security deposit is refundable after safe return per vendor inspection.',
  'Pickup and return slots are between 9 AM and 9 PM unless agreed with vendor via chat.',
] as const;

const THINGS_TO_REMEMBER_CAR = [
  'You must be 18+ with a valid LMV driving license for car rental.',
  'Fuel is not included — vehicle handed over with enough fuel to reach the nearest pump.',
  'Complete KYC (Aadhaar + LMV DL) after booking and before pickup handover.',
  'Security deposit is refundable after safe return per vendor inspection.',
  'Pickup and return slots are between 9 AM and 9 PM unless agreed with vendor via chat.',
  'Inter-state travel may require vendor approval — confirm via booking chat.',
] as const;

interface VehicleDetailPageProps {
  vehicle: Vehicle;
  pickupDate: string;
  pickupTime: string;
  returnDate: string;
  returnTime: string;
  settings: Record<string, string>;
  urlSearchParams: Record<string, string>;
}

function formatFuel(fuelType?: string | null): string {
  return formatFuelType(fuelType);
}

function DetailSection({
  title,
  subtitle,
  children,
  className,
  id,
}: {
  title: string;
  subtitle?: string;
  children: ReactNode;
  className?: string;
  id?: string;
}) {
  return (
    <section
      id={id}
      className={cn(
        'rounded-2xl border border-surface-200 bg-white p-5 shadow-sm sm:p-6',
        className,
      )}
    >
      <div className="mb-4 sm:mb-5">
        <h2 className="font-display text-lg font-bold tracking-tight text-surface-900 sm:text-xl">
          {title}
        </h2>
        {subtitle ? <p className="mt-1 text-sm leading-relaxed text-slate-500">{subtitle}</p> : null}
      </div>
      {children}
    </section>
  );
}

function ToggleSwitch({
  checked,
  onChange,
  disabled,
}: {
  checked: boolean;
  onChange: (value: boolean) => void;
  disabled?: boolean;
}) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      disabled={disabled}
      onClick={() => onChange(!checked)}
      className={cn(
        'relative h-7 w-12 shrink-0 rounded-full transition-colors',
        checked ? 'bg-brand-500' : 'bg-slate-300',
        disabled && 'cursor-not-allowed opacity-60',
      )}
    >
      <span
        className={cn(
          'absolute top-0.5 h-6 w-6 rounded-full bg-white shadow transition-transform',
          checked ? 'translate-x-5' : 'translate-x-0.5',
        )}
      />
    </button>
  );
}

function SpecPill({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex flex-col items-center justify-center rounded-xl border border-surface-100 bg-surface-50/80 px-2 py-3 text-center sm:px-3 sm:py-3.5">
      <p className="text-[10px] font-semibold uppercase tracking-wider text-slate-400">{label}</p>
      <p className="mt-1 text-sm font-bold text-surface-900">{value}</p>
    </div>
  );
}

function AddonCard({
  icon,
  title,
  subtitle,
  checked,
  onChange,
  disabled,
}: {
  icon: ReactNode;
  title: string;
  subtitle: string;
  checked: boolean;
  onChange?: (value: boolean) => void;
  disabled?: boolean;
}) {
  return (
    <div className="flex items-center gap-3 rounded-xl border border-surface-100 bg-surface-50/50 p-4 sm:gap-4 sm:p-5">
      <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-white shadow-sm ring-1 ring-surface-100 sm:h-14 sm:w-14">
        {icon}
      </div>
      <div className="min-w-0 flex-1">
        <p className="font-semibold text-surface-900">{title}</p>
        <p className="mt-0.5 text-xs leading-relaxed text-slate-500">{subtitle}</p>
      </div>
      <ToggleSwitch
        checked={checked}
        disabled={disabled}
        onChange={onChange ?? (() => undefined)}
      />
    </div>
  );
}

export function VehicleDetailPage({
  vehicle,
  pickupDate,
  pickupTime,
  returnDate,
  returnTime,
  settings,
  urlSearchParams,
}: VehicleDetailPageProps) {
  const [pickupPoints, setPickupPoints] = useState<PickupPoint[]>([]);
  const [extraHelmet, setExtraHelmet] = useState(false);
  const [policiesOpen, setPoliciesOpen] = useState(true);

  const isCar = isFourWheeler(vehicle.vehicleClass);
  const hasDates = Boolean(pickupDate && returnDate);
  const modelName = vehicle.model ?? (isCar ? 'Car' : 'Bike');
  const brandName = vehicle.brand?.name ?? '';
  const imageUrl = resolveVehicleListingImageUrl(vehicle, DETAIL_IMAGE_SIZE);
  const partialPayEnabled = settingBool(settings, 'partial_payment_enabled', false);
  const extraHelmetEnabled =
    !isCar && settingBool(settings, 'extra_helmet_enabled', true);
  const extraHelmetPrice = settings.extra_helmet_price_per_day ?? '50';

  const hubLat = vehicle.hub?.latitude ?? vehicle.location?.latitude;
  const hubLng = vehicle.hub?.longitude ?? vehicle.location?.longitude;
  const mapEmbedUrl =
    hubLat && hubLng
      ? `https://maps.google.com/maps?q=${hubLat},${hubLng}&z=14&output=embed`
      : null;

  const specs = useMemo(() => {
    if (isCar) {
      return [
        { label: 'Seats', value: vehicle.seats ? `${vehicle.seats} seats` : '—' },
        { label: 'Transmission', value: getVehicleTransmission(vehicle) },
        { label: 'Fuel', value: formatFuel(vehicle.fuelType) },
        { label: 'Category', value: vehicle.category?.name ?? 'Car' },
        { label: 'Model year', value: vehicle.year ? String(vehicle.year) : '—' },
        { label: 'Color', value: vehicle.color ?? '—' },
      ];
    }
    return [
      { label: 'Engine', value: vehicle.engineCc ? `${vehicle.engineCc}cc` : '—' },
      { label: 'Seating', value: '2 seats' },
      { label: 'Transmission', value: getVehicleTransmission(vehicle) },
      { label: 'Fuel', value: formatFuel(vehicle.fuelType) },
      { label: 'Category', value: vehicle.category?.name ?? 'Bike' },
      { label: 'Model year', value: vehicle.year ? String(vehicle.year) : '—' },
    ];
  }, [isCar, vehicle]);

  useEffect(() => {
    if (!vehicle.location?.slug) return;
    void getPickupPoints(vehicle.location.slug).then(setPickupPoints);
  }, [vehicle.location?.slug]);

  const backHref = hasDates
    ? `/search?locationId=${vehicle.locationId}&${rentalQueryString({
        pickupDate,
        pickupTime,
        returnDate,
        returnTime,
      })}`
    : '/search';

  return (
    <div className="min-h-screen bg-surface-50">
      {/* Breadcrumb */}
      <div className="border-b border-surface-200 bg-white">
        <div className="section-container flex flex-col gap-3 py-3.5 sm:flex-row sm:items-center sm:justify-between sm:py-4">
          <nav aria-label="Breadcrumb" className="flex flex-wrap items-center gap-1 text-sm text-slate-500">
            <Link href="/" className="hover:text-brand-600">
              Home
            </Link>
            {vehicle.location?.slug ? (
              <>
                <ChevronRight className="h-4 w-4 shrink-0" aria-hidden />
                <Link
                  href={`/bike-rental/${vehicle.location.slug}`}
                  className="hover:text-brand-600"
                >
                  {vehicle.location.name}
                </Link>
              </>
            ) : null}
            <ChevronRight className="h-4 w-4 shrink-0" aria-hidden />
            <span className="font-medium text-surface-900" aria-current="page">
              {[brandName, modelName].filter(Boolean).join(' ')}
            </span>
          </nav>
          <Link
            href={backHref}
            className="inline-flex items-center gap-1.5 text-sm font-medium text-slate-600 transition hover:text-brand-600"
          >
            <span aria-hidden>←</span>
            Back to results
          </Link>
        </div>
      </div>

      <div className="section-container py-6 sm:py-8 lg:py-10 pb-28 lg:pb-16">
        <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_380px] lg:gap-10 xl:gap-12">
          {/* Left column */}
          <div className="min-w-0 space-y-6 sm:space-y-8">
            {/* Hero */}
            <article className="overflow-hidden rounded-2xl border border-surface-200 bg-white shadow-sm">
              <div className="space-y-4 p-5 sm:space-y-5 sm:p-6 lg:p-8">
                <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                  <div className="min-w-0">
                    <p className="text-xs font-semibold uppercase tracking-wider text-brand-500">
                      {vehicle.category?.name ?? 'Bike rental'}
                    </p>
                    <h1 className="mt-1 font-display text-2xl font-bold tracking-tight text-surface-900 sm:text-3xl lg:text-4xl">
                      {modelName}
                    </h1>
                    {brandName ? (
                      <p className="mt-1 text-base text-slate-500 sm:text-lg">{brandName}</p>
                    ) : null}
                    <div className="mt-3 flex flex-wrap items-center gap-x-3 gap-y-1.5 text-sm text-slate-600">
                      <span className="inline-flex items-center gap-1.5">
                        <Star className="h-4 w-4 fill-amber-400 text-amber-400" aria-hidden />
                        Verified vendor
                      </span>
                      <span className="hidden text-slate-300 sm:inline" aria-hidden>
                        •
                      </span>
                      <span className="inline-flex items-center gap-1">
                        <MapPin className="h-3.5 w-3.5 text-brand-500" aria-hidden />
                        {vehicle.location?.name}
                      </span>
                    </div>
                  </div>

                  <div className="flex shrink-0 flex-col items-start gap-2 sm:items-end">
                    <p className="text-xs text-slate-500">From</p>
                    <p className="font-display text-2xl font-bold text-brand-600 sm:text-3xl">
                      {formatCurrency(vehicle.pricePerDay)}
                      <span className="text-sm font-semibold text-slate-400">/day</span>
                    </p>
                  </div>
                </div>

                <div className="flex flex-wrap gap-2">
                  {partialPayEnabled ? (
                    <span className="badge-pill bg-emerald-50 text-emerald-700">
                      Partial pay available
                    </span>
                  ) : null}
                  <span className="badge-pill bg-sky-50 text-sky-800">
                    {getVehicleTransmission(vehicle)}
                  </span>
                  {!isCar ? (
                    <span className="badge-pill bg-sky-50 text-sky-800">Helmet included</span>
                  ) : null}
                  {vehicle.doorstepDelivery ? (
                    <span className="badge-pill bg-brand-50 text-brand-700">Doorstep delivery</span>
                  ) : null}
                </div>
              </div>

              <div className="border-t border-surface-100 bg-white px-5 py-8 sm:px-8 sm:py-10">
                <div className="group relative mx-auto max-w-xl overflow-hidden rounded-2xl bg-white ring-1 ring-surface-100">
                  <div className="relative aspect-[4/3] w-full max-w-lg">
                    <VehicleCardMedia
                      src={imageUrl}
                      alt={`${brandName} ${modelName}`.trim()}
                      className="object-contain p-6 sm:p-8"
                      fallback={<VehicleImageFallback size="detail" />}
                      priority
                      sizes="(max-width: 768px) 100vw, 512px"
                    />
                    <div className="pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/50 via-black/10 to-transparent px-4 pb-3 pt-12">
                      <p className="text-[10px] leading-snug text-white/80 sm:text-[11px]">
                        Image for representation purposes only
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2 border-t border-surface-100 p-4 sm:grid-cols-3 sm:gap-3 sm:p-5 lg:grid-cols-6">
                {specs.map((spec) => (
                  <SpecPill key={spec.label} label={spec.label} value={spec.value} />
                ))}
              </div>
            </article>

            {vehicle.description ? (
              <DetailSection title={isCar ? 'About this car' : 'About this bike'}>
                <p className="text-sm leading-relaxed text-slate-600">{vehicle.description}</p>
              </DetailSection>
            ) : null}

            {!isCar ? (
              <DetailSection
                title="Available add-ons"
                subtitle="Toggle extras in the booking panel — pricing updates instantly."
              >
                <div className="grid gap-3 sm:grid-cols-2 sm:gap-4">
                  <AddonCard
                    icon={<HardHat className="h-6 w-6 text-sky-600 sm:h-7 sm:w-7" aria-hidden />}
                    title="Helmet — Free"
                    subtitle="Complimentary helmet included"
                    checked
                    disabled
                  />
                  {extraHelmetEnabled ? (
                    <AddonCard
                      icon={<HardHat className="h-6 w-6 text-sky-600 sm:h-7 sm:w-7" aria-hidden />}
                      title={`Extra helmet — ₹${extraHelmetPrice}/day`}
                      subtitle="For pillion or second rider"
                      checked={extraHelmet}
                      onChange={setExtraHelmet}
                    />
                  ) : null}
                </div>
              </DetailSection>
            ) : (
              <DetailSection title="License requirement">
                <p className="text-sm leading-relaxed text-slate-600">
                  A valid LMV (Light Motor Vehicle) driving license is required for car rental.
                  Upload your license during KYC before pickup.
                </p>
              </DetailSection>
            )}

            {vehicle.doorstepDelivery || vehicle.roadsideAssistance ? (
              <DetailSection title="Special requests">
                <div className="grid gap-3 sm:grid-cols-2 sm:gap-4">
                  {vehicle.doorstepDelivery ? (
                    <div className="rounded-xl border border-surface-100 bg-surface-50/50 p-4 sm:p-5">
                      <div className="flex items-start gap-3">
                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-brand-50">
                          <Home className="h-5 w-5 text-brand-500" aria-hidden />
                        </div>
                        <div>
                          <p className="font-semibold text-surface-900">Home delivery</p>
                          <p className="mt-1 text-xs leading-relaxed text-slate-500">
                            Enable in the booking panel — your delivery address becomes the pickup
                            location instead of the vendor hub.
                          </p>
                        </div>
                      </div>
                    </div>
                  ) : null}
                  {vehicle.roadsideAssistance ? (
                    <div className="rounded-xl border border-surface-100 bg-surface-50/50 p-4 sm:p-5">
                      <div className="flex items-start gap-3">
                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-emerald-50">
                          <ShieldCheck className="h-5 w-5 text-emerald-600" aria-hidden />
                        </div>
                        <div>
                          <p className="font-semibold text-surface-900">Roadside assistance</p>
                          <p className="mt-1 text-xs leading-relaxed text-slate-500">
                            Vendor support during active trips via booking chat.
                          </p>
                        </div>
                      </div>
                    </div>
                  ) : null}
                </div>
                {vehicle.doorstepDelivery ? (
                  <p className="mt-4 rounded-xl border border-sky-100 bg-sky-50/80 px-4 py-3 text-xs leading-relaxed text-sky-900">
                    For doorstep delivery, book at least 3–4 hours before pickup time.
                  </p>
                ) : null}
              </DetailSection>
            ) : null}

            <section className="overflow-hidden rounded-2xl border border-surface-200 bg-white shadow-sm">
              <button
                type="button"
                className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left transition hover:bg-surface-50/80 sm:px-6 sm:py-5"
                onClick={() => setPoliciesOpen((open) => !open)}
              >
                <span className="font-display text-lg font-bold text-surface-900 sm:text-xl">
                  Things to remember
                </span>
                {policiesOpen ? (
                  <ChevronUp className="h-5 w-5 shrink-0 text-slate-400" aria-hidden />
                ) : (
                  <ChevronDown className="h-5 w-5 shrink-0 text-slate-400" aria-hidden />
                )}
              </button>
              {policiesOpen ? (
                <ul className="space-y-3 border-t border-surface-100 px-5 py-4 sm:px-6 sm:py-5">
                  {(isCar ? THINGS_TO_REMEMBER_CAR : THINGS_TO_REMEMBER_BIKE).map((item) => (
                    <li key={item} className="flex gap-3 text-sm leading-relaxed text-slate-600">
                      <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-brand-500" />
                      {item}
                    </li>
                  ))}
                  <li className="pt-1">
                    <Link
                      href="/cancellation-policy"
                      className="text-sm font-medium text-brand-600 hover:underline"
                    >
                      View cancellation policy →
                    </Link>
                  </li>
                </ul>
              ) : null}
            </section>

            <DetailSection
              title="Pickup area"
              subtitle="Exact pickup point will be confirmed after booking."
            >
              <div className="overflow-hidden rounded-xl border border-surface-100">
                {mapEmbedUrl ? (
                  <iframe
                    title="Pickup area map"
                    src={mapEmbedUrl}
                    className="h-56 w-full border-0 sm:h-72"
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                  />
                ) : (
                  <div className="flex h-56 items-center justify-center bg-surface-50 text-sm text-slate-500 sm:h-72">
                    Map preview unavailable for this listing
                  </div>
                )}
              </div>
            </DetailSection>

            <DetailSection title="About location">
              <ul className="space-y-4">
                {vehicle.hub ? (
                  <li className="flex items-start gap-3 rounded-xl border border-surface-100 bg-surface-50/50 p-4">
                    <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-brand-500" aria-hidden />
                    <span className="text-sm leading-relaxed text-slate-600">
                      <strong className="text-surface-900">{vehicle.hub.name}</strong>
                      {vehicle.hub.description ? ` — ${vehicle.hub.description}` : ''}
                      {vehicle.hub.address ? (
                        <span className="mt-1 block text-slate-500">{vehicle.hub.address}</span>
                      ) : null}
                    </span>
                  </li>
                ) : null}
                {pickupPoints.map((point) => (
                  <li
                    key={point.id}
                    className="flex items-start gap-3 rounded-xl border border-surface-100 bg-surface-50/50 p-4"
                  >
                    <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-brand-500" aria-hidden />
                    <span className="text-sm leading-relaxed text-slate-600">
                      <strong className="text-surface-900">{point.name}</strong>
                      {point.address ? ` — ${point.address}` : ''}
                    </span>
                  </li>
                ))}
                <li className="flex items-center gap-3 px-1 text-sm text-slate-600">
                  <Gauge className="h-4 w-4 shrink-0 text-brand-500" aria-hidden />
                  Location timings: 9 AM to 9 PM
                </li>
              </ul>
            </DetailSection>
          </div>

          {/* Booking sidebar */}
          <aside className="lg:sticky lg:top-20 lg:self-start">
            <VehicleBookingSidebar
              vehicle={vehicle}
              pickupDate={pickupDate}
              pickupTime={pickupTime}
              returnDate={returnDate}
              returnTime={returnTime}
              extraHelmet={extraHelmet}
              urlSearchParams={urlSearchParams}
            />
          </aside>
        </div>
      </div>
    </div>
  );
}
