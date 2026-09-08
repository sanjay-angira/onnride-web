'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { Bike, CalendarClock, Car, CircleDot, Crosshair, MapPin, Search } from 'lucide-react';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { Button } from '@/components/ui/Button';
import { LocationSelect } from '@/components/ui/LocationSelect.client';
import { LiveAvailabilityBadge } from '@/components/sections/home/LiveAvailabilityBadge.client';
import { RentalDateRangePicker } from '@/features/search/RentalDateRangePicker.client';
import { useVehicleCategories } from '@/features/search/useVehicleCategories';
import {
  parseVehicleClassParam,
  vehicleClassLabel,
  vehicleClassToParam,
} from '@/lib/vehicle-class';
import {
  DEFAULT_PICKUP_TIME,
  DEFAULT_RETURN_TIME,
  normalizeDateTimeLocal,
  toDateTimeLocalValue,
  validateRentalRange,
  addDaysISO,
  todayISO,
} from '@/lib/rental-datetime';
import { cn } from '@/lib/utils';
import type { Location, VehicleClass } from '@/types';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { setCategoryId, setDates, setLocation, setVehicleClass } from '@/store/searchSlice';
import { useDetectNearestLocation } from '@/features/search/useDetectNearestLocation';
import { getLocations } from '@/lib/api';

interface HomeSearchFormProps {
  locations: Location[];
  defaultLocationId?: string;
  defaultVehicleClass?: VehicleClass;
  variant?: 'hero' | 'inline' | 'compact' | 'search' | 'premium' | 'homepage';
  /** Solid card styling for hero video overlay on mobile */
  overlay?: boolean;
  className?: string;
}

function tomorrowISO(): string {
  return addDaysISO(todayISO(), 1);
}

function dayAfterTomorrowISO(): string {
  return addDaysISO(todayISO(), 2);
}

function FieldLabel({
  htmlFor,
  icon: Icon,
  children,
}: {
  htmlFor: string;
  icon: typeof MapPin;
  children: React.ReactNode;
}) {
  return (
    <label
      htmlFor={htmlFor}
      className="mb-1.5 flex h-[18px] items-center gap-1.5 text-xs font-semibold uppercase tracking-wide text-slate-500"
    >
      <Icon className="h-3.5 w-3.5 shrink-0 text-brand-500" aria-hidden />
      <span className="truncate">{children}</span>
    </label>
  );
}

function FieldHelper({ children, className }: { children?: React.ReactNode; className?: string }) {
  return (
    <p
      className={cn(
        'mt-1.5 min-h-[18px] px-0.5 text-xs leading-[18px]',
        !children && 'invisible',
        className,
      )}
      aria-hidden={!children}
    >
      {children || '\u00a0'}
    </p>
  );
}

const CLASS_TABS: Array<{
  id: VehicleClass;
  label: string;
  icon: typeof Bike;
}> = [
  { id: 'TWO_WHEELER', label: 'Bikes & Scooters', icon: Bike },
  { id: 'FOUR_WHEELER', label: 'Cars', icon: Car },
];

function formatDurationLabel(pickupValue: string, returnValue: string): string | null {
  if (!pickupValue || !returnValue) return null;
  const start = new Date(pickupValue);
  const end = new Date(returnValue);
  const diffMs = end.getTime() - start.getTime();
  if (diffMs <= 0) return null;
  const totalHours = Math.floor(diffMs / (1000 * 60 * 60));
  const days = Math.floor(totalHours / 24);
  const hours = totalHours % 24;
  if (days === 0) return `${hours} hr${hours !== 1 ? 's' : ''}`;
  return `${days} day${days !== 1 ? 's' : ''}, ${hours} hr${hours !== 1 ? 's' : ''}`;
}

function HomepageSearchForm({
  locations,
  className,
  defaultLocationId,
  defaultVehicleClass,
  overlay = false,
}: HomeSearchFormProps) {
  const router = useRouter();
  const urlParams = useSearchParams();
  const dispatch = useAppDispatch();
  const search = useAppSelector((state) => state.search);

  const initialPickup = normalizeDateTimeLocal(
    toDateTimeLocalValue(
      urlParams.get('pickupDate') ?? search.pickupDate ?? tomorrowISO(),
      urlParams.get('pickupTime') ?? search.pickupTime ?? DEFAULT_PICKUP_TIME,
    ),
  );
  const initialReturn = normalizeDateTimeLocal(
    toDateTimeLocalValue(
      urlParams.get('returnDate') ?? search.returnDate ?? dayAfterTomorrowISO(),
      urlParams.get('returnTime') ?? search.returnTime ?? DEFAULT_RETURN_TIME,
    ),
  );

  const presetLocationId = useMemo(() => {
    const slug = urlParams.get('location');
    const fromSlug = slug ? locations.find((item) => item.slug === slug)?.id : undefined;
    return (
      defaultLocationId ??
      urlParams.get('locationId') ??
      fromSlug ??
      search.locationId ??
      ''
    );
  }, [defaultLocationId, locations, search.locationId, urlParams]);

  const [locationId, setLocationIdLocal] = useState(presetLocationId);
  const [locationOptions, setLocationOptions] = useState(locations);
  const [pickupDateTime, setPickupDateTime] = useState(initialPickup.value);
  const [returnDateTime, setReturnDateTime] = useState(initialReturn.value);
  const [vehicleClass, setVehicleClassLocal] = useState<VehicleClass>(
    parseVehicleClassParam(
      urlParams.get('vehicleClass') ?? search.vehicleClass ?? defaultVehicleClass,
    ),
  );
  const [categorySlug, setCategorySlug] = useState<string>(
    urlParams.get('category') ?? 'all',
  );
  const { categories } = useVehicleCategories(vehicleClass);
  const [error, setError] = useState('');

  useEffect(() => {
    setLocationOptions(locations);
  }, [locations]);

  useEffect(() => {
    if (locationOptions.length > 0) return;
    let cancelled = false;
    void getLocations().then((rows) => {
      if (!cancelled && rows.length > 0) {
        setLocationOptions(rows);
      }
    });
    return () => {
      cancelled = true;
    };
  }, [locationOptions.length]);

  useEffect(() => {
    const slug = urlParams.get('category');
    if (slug && categories.some((c) => c.slug === slug)) {
      setCategorySlug(slug);
    }
  }, [categories, urlParams]);

  useEffect(() => {
    if (!presetLocationId) return;
    setLocationIdLocal(presetLocationId);
    const location = locations.find((item) => item.id === presetLocationId);
    if (location) dispatch(setLocation(location));
  }, [dispatch, locations, presetLocationId]);

  const bindLocation = useCallback(
    (location: Location) => {
      setLocationIdLocal(location.id);
      dispatch(setLocation(location));
      setError('');
    },
    [dispatch],
  );

  const { detectLocation, isDetecting } = useDetectNearestLocation({
    locations: locationOptions,
    enabled: !presetLocationId,
    onMatch: bindLocation,
  });

  const durationLabel = formatDurationLabel(pickupDateTime, returnDateTime);

  function handleRangeChange(pickup: string, ret: string) {
    setPickupDateTime(normalizeDateTimeLocal(pickup).value);
    setReturnDateTime(normalizeDateTimeLocal(ret).value);
    setError('');
  }

  function handleSearch() {
    if (!locationId) {
      setError('Select a city to start your ride.');
      return;
    }
    const pickup = normalizeDateTimeLocal(pickupDateTime);
    const ret = normalizeDateTimeLocal(returnDateTime);
    if (!pickup.date || !ret.date) {
      setError('Select pickup and return date & time.');
      return;
    }
    const rangeError = validateRentalRange(pickup.date, pickup.time, ret.date, ret.time);
    if (rangeError) {
      setError(rangeError);
      return;
    }
    const location = locationOptions.find((l) => l.id === locationId);
    if (location) dispatch(setLocation(location));
    dispatch(
      setDates({
        pickupDate: pickup.date,
        pickupTime: pickup.time,
        returnDate: ret.date,
        returnTime: ret.time,
      }),
    );
    dispatch(setVehicleClass(vehicleClass));
    const selectedCategory = categories.find((item) => item.slug === categorySlug);
    dispatch(setCategoryId(selectedCategory?.id ?? null));

    const params = new URLSearchParams({
      locationId,
      pickupDate: pickup.date,
      pickupTime: pickup.time,
      returnDate: ret.date,
      returnTime: ret.time,
      vehicleClass: vehicleClassToParam(vehicleClass),
      ...(location?.slug ? { location: location.slug } : {}),
      ...(categorySlug !== 'all' ? { category: categorySlug } : {}),
    });
    router.push(`/search?${params.toString()}`);
  }

  const searchLabel =
    categorySlug === 'all'
      ? `Search ${vehicleClassLabel(vehicleClass)}`
      : `Search ${categories.find((item) => item.slug === categorySlug)?.name ?? 'rides'}`;

  const sectionLabelClass =
    'text-[11px] font-bold uppercase tracking-wider text-slate-600 sm:text-xs';

  return (
    <div
      className={cn(
        'search-card-premium w-full min-w-0 max-w-full overflow-visible rounded-2xl',
        overlay
          ? 'border-0 bg-white p-4 shadow-elevated ring-1 ring-black/[0.06] sm:p-6'
          : 'border border-border/80 bg-white p-3 sm:p-6',
        className,
      )}
    >
      {/* Vehicle class + category */}
      <div className="mb-3 space-y-3 sm:mb-4">
        <div
          className="grid grid-cols-2 gap-2"
          role="tablist"
          aria-label="Vehicle class"
        >
          {CLASS_TABS.map((tab) => {
            const Icon = tab.icon;
            const active = vehicleClass === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                role="tab"
                aria-selected={active}
                onClick={() => {
                  setVehicleClassLocal(tab.id);
                  setCategorySlug('all');
                  dispatch(setVehicleClass(tab.id));
                  dispatch(setCategoryId(null));
                }}
                className={cn(
                  'inline-flex min-h-[44px] items-center justify-center gap-1.5 rounded-xl border px-3 py-2.5 text-sm font-semibold transition',
                  active
                    ? 'border-brand-300 bg-brand-50 text-brand-700 shadow-sm ring-1 ring-brand-200/80'
                    : 'border-slate-200 bg-white text-slate-600 hover:border-brand-100 hover:bg-slate-50',
                )}
              >
                <Icon className="h-4 w-4 shrink-0" aria-hidden />
                {tab.label}
              </button>
            );
          })}
        </div>

        <div
          className="flex gap-2 overflow-x-auto scrollbar-hide"
          role="tablist"
          aria-label="Vehicle category"
        >
          <button
            type="button"
            role="tab"
            aria-selected={categorySlug === 'all'}
            onClick={() => setCategorySlug('all')}
            className={cn(
              'inline-flex min-h-[40px] shrink-0 items-center gap-1.5 rounded-xl border px-3 py-2 text-sm font-semibold transition',
              categorySlug === 'all'
                ? 'border-brand-300 bg-brand-50 text-brand-700 ring-1 ring-brand-200/80'
                : 'border-slate-200 bg-white text-slate-600 hover:border-brand-100 hover:bg-slate-50',
            )}
          >
            <CircleDot className="h-4 w-4" aria-hidden />
            All
          </button>
          {categories.map((category) => (
            <button
              key={category.id}
              type="button"
              role="tab"
              aria-selected={categorySlug === category.slug}
              onClick={() => setCategorySlug(category.slug)}
              className={cn(
                'inline-flex min-h-[40px] shrink-0 items-center rounded-xl border px-3 py-2 text-sm font-semibold capitalize transition',
                categorySlug === category.slug
                  ? 'border-brand-300 bg-brand-50 text-brand-700 ring-1 ring-brand-200/80'
                  : 'border-slate-200 bg-white text-slate-600 hover:border-brand-100 hover:bg-slate-50',
              )}
            >
              {category.name}
            </button>
          ))}
        </div>
      </div>

      {/* City */}
      <div className="relative z-20">
        {overlay ? (
          <span className={cn('mb-2 block sm:hidden', sectionLabelClass)}>City</span>
        ) : null}
        <div className="flex gap-2">
          <LocationSelect
            id="homepage-search-location"
            locations={locationOptions}
            value={locationId}
            onChange={(location) => {
              if (location) bindLocation(location);
              else {
                setLocationIdLocal('');
                setError('');
              }
            }}
            placeholder="Select City"
            className="min-w-0 flex-1"
            actionOffset={false}
            aria-label="Select city"
          />
          <button
            type="button"
            onClick={() => void detectLocation('manual')}
            disabled={isDetecting || !locationOptions.length}
            aria-label="Use my location"
            className="inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-surface-200 bg-white text-slate-600 transition hover:border-brand-300 hover:text-brand-600 disabled:opacity-50"
          >
            <Crosshair className={cn('h-4 w-4', isDetecting && 'animate-pulse')} aria-hidden />
          </button>
        </div>
      </div>

      <LiveAvailabilityBadge
        locationId={locationId}
        locations={locationOptions}
        vehicleClass={vehicleClass}
        className="mt-3 sm:mt-4"
      />

      {/* Pickup & return */}
      <div
        className={cn(
          'space-y-3',
          overlay ? 'mt-4 border-t border-slate-100 pt-4 sm:mt-5 sm:pt-5' : 'mt-3 sm:mt-4 sm:space-y-3',
        )}
      >
        <div className="flex items-center justify-between gap-2">
          <span className={sectionLabelClass}>Trip dates</span>
          {durationLabel ? (
            <span className="rounded-full bg-brand-50 px-2.5 py-1 text-[11px] font-bold text-brand-700 ring-1 ring-brand-100 sm:text-xs">
              {durationLabel}
            </span>
          ) : null}
        </div>

        <RentalDateRangePicker
          id="homepage-search-trip-dates"
          pickupValue={pickupDateTime}
          returnValue={returnDateTime}
          onChange={handleRangeChange}
          minDate={todayISO()}
          aria-label="Trip dates and times"
        />
      </div>

      <Button
        size="lg"
        className="mt-5 h-12 w-full gap-2 text-base font-semibold shadow-md shadow-brand-500/25 transition hover:shadow-lg hover:shadow-brand-500/30 sm:mt-5"
        onClick={handleSearch}
      >
        <Search className="h-4 w-4 shrink-0" aria-hidden />
        {searchLabel}
      </Button>

      {error ? <p className="mt-2 text-center text-sm font-medium text-red-600">{error}</p> : null}
    </div>
  );
}

export function HomeSearchForm({
  locations,
  defaultLocationId,
  variant = 'hero',
  overlay = false,
  className,
}: HomeSearchFormProps) {
  if (variant === 'homepage') {
    return (
      <HomepageSearchForm
        locations={locations}
        className={className}
        defaultLocationId={defaultLocationId}
        overlay={overlay}
      />
    );
  }

  const router = useRouter();
  const urlParams = useSearchParams();
  const dispatch = useAppDispatch();
  const search = useAppSelector((state) => state.search);

  const initialPickup = normalizeDateTimeLocal(
    toDateTimeLocalValue(
      urlParams.get('pickupDate') ?? search.pickupDate ?? tomorrowISO(),
      urlParams.get('pickupTime') ?? search.pickupTime ?? DEFAULT_PICKUP_TIME,
    ),
  );
  const initialReturn = normalizeDateTimeLocal(
    toDateTimeLocalValue(
      urlParams.get('returnDate') ?? search.returnDate ?? dayAfterTomorrowISO(),
      urlParams.get('returnTime') ?? search.returnTime ?? DEFAULT_RETURN_TIME,
    ),
  );

  const presetLocationId = useMemo(() => {
    const slug = urlParams.get('location');
    const fromSlug = slug ? locations.find((item) => item.slug === slug)?.id : undefined;
    return (
      defaultLocationId ??
      urlParams.get('locationId') ??
      fromSlug ??
      search.locationId ??
      ''
    );
  }, [defaultLocationId, locations, search.locationId, urlParams]);

  const [locationId, setLocationIdLocal] = useState(presetLocationId);
  const [locationOptions, setLocationOptions] = useState(locations);

  useEffect(() => {
    setLocationOptions(locations);
  }, [locations]);

  useEffect(() => {
    if (locationOptions.length > 0) return;
    let cancelled = false;
    void getLocations().then((rows) => {
      if (!cancelled && rows.length > 0) {
        setLocationOptions(rows);
      }
    });
    return () => {
      cancelled = true;
    };
  }, [locationOptions.length]);

  useEffect(() => {
    if (!presetLocationId) return;
    setLocationIdLocal(presetLocationId);
    const location = locations.find((item) => item.id === presetLocationId);
    if (location) dispatch(setLocation(location));
  }, [dispatch, locations, presetLocationId]);
  const [pickupDateTime, setPickupDateTime] = useState(initialPickup.value);
  const [returnDateTime, setReturnDateTime] = useState(initialReturn.value);
  const [error, setError] = useState('');

  const bindLocation = useCallback(
    (location: Location) => {
      setLocationIdLocal(location.id);
      dispatch(setLocation(location));
      setError('');
    },
    [dispatch],
  );

  const shouldAutoDetect = !presetLocationId;

  const { detectLocation, isDetecting, statusMessage } = useDetectNearestLocation({
    locations: locationOptions,
    enabled: shouldAutoDetect,
    onMatch: bindLocation,
  });

  useEffect(() => {
    if (search.pickupDate && search.pickupTime) {
      setPickupDateTime(
        normalizeDateTimeLocal(toDateTimeLocalValue(search.pickupDate, search.pickupTime)).value,
      );
    }
    if (search.returnDate && search.returnTime) {
      setReturnDateTime(
        normalizeDateTimeLocal(toDateTimeLocalValue(search.returnDate, search.returnTime)).value,
      );
    }
  }, [search.pickupDate, search.pickupTime, search.returnDate, search.returnTime]);

  function handleRangeChange(pickup: string, ret: string) {
    setPickupDateTime(normalizeDateTimeLocal(pickup).value);
    setReturnDateTime(normalizeDateTimeLocal(ret).value);
    setError('');
  }

  function handleSearch() {
    if (!locationId) {
      setError('Pick a city to start your ride.');
      return;
    }

    const pickup = normalizeDateTimeLocal(pickupDateTime);
    const ret = normalizeDateTimeLocal(returnDateTime);

    if (!pickup.date || !ret.date) {
      setError('Select pickup and return date & time.');
      return;
    }

    const rangeError = validateRentalRange(
      pickup.date,
      pickup.time,
      ret.date,
      ret.time,
    );
    if (rangeError) {
      setError(rangeError);
      return;
    }

    const location = locationOptions.find((l) => l.id === locationId);
    if (location) dispatch(setLocation(location));
    dispatch(
      setDates({
        pickupDate: pickup.date,
        pickupTime: pickup.time,
        returnDate: ret.date,
        returnTime: ret.time,
      }),
    );

    const params = new URLSearchParams({
      locationId,
      pickupDate: pickup.date,
      pickupTime: pickup.time,
      returnDate: ret.date,
      returnTime: ret.time,
      ...(location?.slug ? { location: location.slug } : {}),
    });
    router.push(`/search?${params.toString()}`);
  }

  const isHero = variant === 'hero';
  const isPremium = variant === 'premium';
  const isCompact = variant === 'compact';
  const isSearch = variant === 'search';
  const showLabels = !isCompact || isSearch;

  const locationHelper = isDetecting
    ? 'Detecting your city…'
    : statusMessage ?? null;

  const locationHelperClass = locationHelper?.startsWith('Using')
    ? 'font-medium text-emerald-600'
    : locationHelper
      ? 'text-slate-500'
      : undefined;

  return (
    <div
      className={cn(
        isPremium
          ? 'rounded-2xl border border-border bg-white p-4 shadow-premium sm:p-6'
          : isHero || isSearch
            ? 'glass-card p-3 sm:p-4'
            : 'rounded-2xl border border-border bg-white p-4 shadow-card sm:p-5',
        className,
      )}
    >
      <div
        className={cn(
          'grid gap-x-3 gap-y-4',
          isCompact || isSearch
            ? 'sm:grid-cols-2 lg:grid-cols-[minmax(0,1.35fr)_minmax(0,2fr)_auto]'
            : 'sm:grid-cols-2 lg:grid-cols-[minmax(0,1.35fr)_minmax(0,2fr)_auto]',
        )}
      >
        <div className={cn(isCompact || isSearch ? 'sm:col-span-2 lg:col-span-1' : 'sm:col-span-2 lg:col-span-1')}>
          {showLabels ? (
            <FieldLabel htmlFor="search-location" icon={MapPin}>
              Pickup city
            </FieldLabel>
          ) : (
            <span className="mb-1.5 block h-[18px]" aria-hidden />
          )}
          <div className="relative z-20 flex h-12 gap-2">
            <LocationSelect
              id="search-location"
              locations={locationOptions}
              value={locationId}
              onChange={(location) => {
                if (location) bindLocation(location);
                else {
                  setLocationIdLocal('');
                  setError('');
                }
              }}
              placeholder="Where do you want to ride?"
              className="min-w-0 flex-1"
              actionOffset={false}
            />
            <button
              type="button"
              onClick={() => void detectLocation('manual')}
              disabled={isDetecting || !locationOptions.length}
              title="Use my current location"
              aria-label="Use my current location"
              className={cn(
                'inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border transition',
                isDetecting
                  ? 'border-brand-200 bg-brand-50 text-brand-600'
                  : 'border-surface-200 bg-white text-slate-600 hover:border-brand-300 hover:text-brand-600',
              )}
            >
              <Crosshair className={cn('h-4 w-4', isDetecting && 'animate-pulse')} aria-hidden />
            </button>
          </div>
          <FieldHelper className={locationHelperClass}>
            {locationHelper ?? undefined}
          </FieldHelper>
        </div>

        <div className="sm:col-span-2 lg:col-span-1">
          {showLabels ? (
            <FieldLabel htmlFor="search-trip-dates" icon={CalendarClock}>
              Trip dates
            </FieldLabel>
          ) : (
            <span className="mb-1.5 block h-[18px]" aria-hidden />
          )}
          <RentalDateRangePicker
            id="search-trip-dates"
            pickupValue={pickupDateTime}
            returnValue={returnDateTime}
            onChange={handleRangeChange}
            minDate={todayISO()}
            aria-label="Trip dates and times"
          />
          <FieldHelper />
        </div>

        <div className={cn(isCompact || isSearch ? 'sm:col-span-2 lg:col-span-1' : undefined)}>
          {showLabels ? (
            <span className="mb-1.5 hidden h-[18px] lg:block" aria-hidden />
          ) : (
            <span className="mb-1.5 block h-[18px]" aria-hidden />
          )}
          <Button
            size="lg"
            className="h-12 w-full gap-2 whitespace-nowrap sm:min-w-[148px] lg:min-w-[160px]"
            onClick={handleSearch}
          >
            <Search className="h-4 w-4 shrink-0" aria-hidden />
            {isCompact || isSearch ? 'Update search' : isPremium ? 'Search' : 'Search rides'}
          </Button>
          <FieldHelper className="hidden lg:block" />
        </div>
      </div>

      <p className="mt-3 border-t border-surface-200/80 pt-3 text-center text-xs text-slate-500 sm:text-left">
        Pick any date up to a year ahead — time slots 9 AM to 9 PM
      </p>

      {error ? <p className="mt-2 px-1 text-sm font-medium text-red-600">{error}</p> : null}
    </div>
  );
}
