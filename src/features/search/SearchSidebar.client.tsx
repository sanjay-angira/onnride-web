'use client';

import Link from 'next/link';
import { usePathname, useSearchParams } from 'next/navigation';
import {
  CalendarDays,
  Clock,
  HardHat,
  Home,
  MapPin,
  Shield,
  ShieldCheck,
  Sparkles,
  Wallet,
  Wrench,
} from 'lucide-react';
import { cn, formatDate } from '@/lib/utils';
import { formatRentalSchedule } from '@/lib/rental-datetime';
import { vehicleClassToParam } from '@/lib/vehicle-class';
import type { VehicleCategory, VehicleClass } from '@/types';

interface SearchSidebarProps {
  categories: VehicleCategory[];
  resultCount: number;
  locationName?: string;
  pickupDate?: string;
  pickupTime?: string;
  returnDate?: string;
  returnTime?: string;
  categoryName?: string;
  vehicleClass?: VehicleClass;
}

function buildClassHref(
  pathname: string,
  searchParams: URLSearchParams,
  vehicleClass: VehicleClass,
) {
  const params = new URLSearchParams(searchParams.toString());
  params.set('vehicleClass', vehicleClassToParam(vehicleClass));
  params.delete('category');
  params.delete('categoryId');
  return `${pathname}?${params.toString()}`;
}

function buildCategoryHref(
  pathname: string,
  searchParams: URLSearchParams,
  slug: string | null,
) {
  const params = new URLSearchParams(searchParams.toString());
  if (slug) params.set('category', slug);
  else params.delete('category');
  return `${pathname}?${params.toString()}`;
}

function buildToggleHref(
  pathname: string,
  searchParams: URLSearchParams,
  key: 'doorstep' | 'roadside',
  enabled: boolean,
) {
  const params = new URLSearchParams(searchParams.toString());
  if (enabled) params.set(key, '1');
  else params.delete(key);
  return `${pathname}?${params.toString()}`;
}

function FeatureFilterLink({
  href,
  active,
  icon: Icon,
  label,
  description,
}: {
  href: string;
  active: boolean;
  icon: typeof Home;
  label: string;
  description: string;
}) {
  return (
    <Link
      href={href}
      className={cn(
        'flex items-start gap-3 rounded-xl border px-3 py-3 transition',
        active
          ? 'border-brand-200 bg-brand-50 shadow-sm'
          : 'border-surface-100 bg-surface-50/50 hover:border-brand-100 hover:bg-brand-50/40',
      )}
    >
      <span
        className={cn(
          'mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg',
          active ? 'bg-brand-500 text-white' : 'bg-white text-slate-500 ring-1 ring-surface-200',
        )}
      >
        <Icon className="h-4 w-4" aria-hidden />
      </span>
      <span className="min-w-0">
        <span className="flex items-center gap-2">
          <span className="text-sm font-semibold text-surface-900">{label}</span>
          {active ? (
            <span className="rounded-full bg-brand-500 px-2 py-0.5 text-[10px] font-bold uppercase text-white">
              On
            </span>
          ) : null}
        </span>
        <span className="mt-0.5 block text-xs leading-relaxed text-slate-500">{description}</span>
      </span>
    </Link>
  );
}

function SearchFeatureFilters({ className }: { className?: string }) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const doorstepActive = searchParams.get('doorstep') === '1';
  const roadsideActive = searchParams.get('roadside') === '1';

  return (
    <div className={cn('space-y-2', className)}>
      <FeatureFilterLink
        href={buildToggleHref(pathname, searchParams, 'doorstep', !doorstepActive)}
        active={doorstepActive}
        icon={Home}
        label="Doorstep delivery"
        description="Show rides with home delivery at checkout"
      />
      <FeatureFilterLink
        href={buildToggleHref(pathname, searchParams, 'roadside', !roadsideActive)}
        active={roadsideActive}
        icon={Wrench}
        label="Roadside assistance"
        description="Show rides with vendor support on active trips"
      />
    </div>
  );
}

export function SearchMobileFilters({
  categories,
  resultCount,
  locationName,
  vehicleClass = 'TWO_WHEELER',
}: Pick<SearchSidebarProps, 'categories' | 'resultCount' | 'locationName' | 'vehicleClass'>) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const activeCategory = searchParams.get('category') ?? '';

  return (
    <div className="mb-6 space-y-4 lg:hidden">
      <div className="grid grid-cols-2 gap-2">
        {(['TWO_WHEELER', 'FOUR_WHEELER'] as VehicleClass[]).map((item) => (
          <Link
            key={item}
            href={buildClassHref(pathname, searchParams, item)}
            className={cn(
              'rounded-xl border px-3 py-2 text-center text-sm font-semibold transition',
              vehicleClass === item
                ? 'border-brand-300 bg-brand-50 text-brand-700'
                : 'border-surface-200 bg-white text-slate-600',
            )}
          >
            {item === 'FOUR_WHEELER' ? 'Cars' : 'Bikes'}
          </Link>
        ))}
      </div>
      <div className="flex items-center justify-between gap-4 rounded-2xl border border-brand-200/60 bg-white px-4 py-3 shadow-sm">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wider text-brand-600">Results</p>
          <p className="font-display text-2xl font-bold text-surface-900">{resultCount}</p>
        </div>
        {locationName ? (
          <p className="text-right text-sm text-slate-500">
            in <span className="font-semibold text-surface-900">{locationName}</span>
          </p>
        ) : null}
      </div>

      <div className="-mx-1 flex gap-2 overflow-x-auto px-1 pb-1 scrollbar-hide">
        <Link
          href={buildCategoryHref(pathname, searchParams, null)}
          className={cn(
            'shrink-0 rounded-full px-4 py-2 text-sm font-semibold transition',
            !activeCategory
              ? 'bg-brand-500 text-white shadow-md shadow-brand-500/30'
              : 'border border-surface-200 bg-white text-slate-600',
          )}
        >
          All rides
        </Link>
        {categories.map((cat) => (
          <Link
            key={cat.id}
            href={buildCategoryHref(pathname, searchParams, cat.slug)}
            className={cn(
              'shrink-0 rounded-full px-4 py-2 text-sm font-semibold transition',
              activeCategory === cat.slug
                ? 'bg-brand-500 text-white shadow-md shadow-brand-500/30'
                : 'border border-surface-200 bg-white text-slate-600',
            )}
          >
            {cat.name}
          </Link>
        ))}
      </div>

      <div className="rounded-2xl border border-surface-200 bg-white p-4 shadow-sm">
        <p className="text-sm font-bold text-surface-900">Ride features</p>
        <SearchFeatureFilters className="mt-3" />
      </div>
    </div>
  );
}

export function SearchSidebar({
  categories,
  resultCount,
  locationName,
  pickupDate,
  pickupTime,
  returnDate,
  returnTime,
  categoryName,
  vehicleClass = 'TWO_WHEELER',
}: SearchSidebarProps) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const activeCategory = searchParams.get('category') ?? '';

  return (
    <aside className="hidden w-82 shrink-0 lg:block">
      <div className="sticky top-24 space-y-5">
        <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-brand-600 to-brand-700 p-6 text-white shadow-lg shadow-brand-600/25">
          <div className="pointer-events-none absolute inset-0 bg-brand-mesh opacity-30" aria-hidden />
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-brand-100">Results</p>
          <p className="mt-2 font-display text-4xl font-bold">{resultCount}</p>
          {locationName ? (
            <p className="mt-2 flex items-center gap-1.5 text-sm text-orange-100">
              <MapPin className="h-4 w-4 shrink-0" aria-hidden />
              {locationName}
            </p>
          ) : null}
          {pickupDate && returnDate ? (
            <p className="mt-3 flex items-center gap-1.5 border-t border-white/20 pt-3 text-xs text-orange-100">
              <CalendarDays className="h-3.5 w-3.5 shrink-0" aria-hidden />
              {pickupTime && returnTime
                ? `${formatRentalSchedule(pickupDate, pickupTime)} → ${formatRentalSchedule(returnDate, returnTime)}`
                : `${formatDate(pickupDate)} → ${formatDate(returnDate)}`}
            </p>
          ) : null}
          {categoryName ? (
            <span className="mt-3 inline-flex rounded-full bg-white/15 px-3 py-1 text-xs font-semibold">
              {categoryName}
            </span>
          ) : null}
        </div>

        <div className="rounded-2xl border border-surface-200 bg-white p-5 shadow-card">
          <p className="text-sm font-bold text-surface-900">Ride features</p>
          <SearchFeatureFilters className="mt-4" />
        </div>

        <div className="rounded-2xl border border-surface-200 bg-white p-5 shadow-card">
          <p className="text-sm font-bold text-surface-900">Booking info</p>
          <ul className="mt-4 space-y-3 text-sm text-slate-600">
            <li className="flex items-start gap-2.5">
              <Shield className="mt-0.5 h-4 w-4 shrink-0 text-brand-500" aria-hidden />
              <span>
                <span className="font-semibold text-surface-900">Security deposit</span>
                <span className="mt-0.5 block text-xs text-slate-500">
                  Refundable after safe return — amount shown on each ride
                </span>
              </span>
            </li>
            <li className="flex items-start gap-2.5">
              <Clock className="mt-0.5 h-4 w-4 shrink-0 text-brand-500" aria-hidden />
              <span>
                <span className="font-semibold text-surface-900">Pickup & return</span>
                <span className="mt-0.5 block text-xs text-slate-500">9 AM – 9 PM hourly slots</span>
              </span>
            </li>
          </ul>
        </div>

        <div className="rounded-2xl border border-surface-200 bg-white p-5 shadow-card">
          <p className="text-sm font-bold text-surface-900">Vehicle type</p>
          <div className="mt-3 grid grid-cols-2 gap-2">
            {(['TWO_WHEELER', 'FOUR_WHEELER'] as VehicleClass[]).map((item) => (
              <Link
                key={item}
                href={buildClassHref(pathname, searchParams, item)}
                className={cn(
                  'rounded-xl border px-3 py-2.5 text-center text-sm font-semibold transition',
                  vehicleClass === item
                    ? 'bg-brand-500 text-white shadow-md shadow-brand-500/25'
                    : 'text-slate-600 hover:bg-brand-50 hover:text-brand-700',
                )}
              >
                {item === 'FOUR_WHEELER' ? 'Cars' : 'Bikes & Scooters'}
              </Link>
            ))}
          </div>
        </div>

        <div className="rounded-2xl border border-surface-200 bg-white p-5 shadow-card">
          <p className="text-sm font-bold text-surface-900">Filter by category</p>
          <ul className="mt-4 space-y-1">
            <li>
              <Link
                href={buildCategoryHref(pathname, searchParams, null)}
                className={cn(
                  'flex items-center rounded-xl px-3 py-2.5 text-sm font-medium transition',
                  !activeCategory
                    ? 'bg-brand-500 text-white shadow-md shadow-brand-500/25'
                    : 'text-slate-600 hover:bg-brand-50 hover:text-brand-700',
                )}
              >
                All rides
              </Link>
            </li>
            {categories.map((cat) => (
              <li key={cat.id}>
                <Link
                  href={buildCategoryHref(pathname, searchParams, cat.slug)}
                  className={cn(
                    'flex items-center rounded-xl px-3 py-2.5 text-sm font-medium transition',
                    activeCategory === cat.slug
                      ? 'bg-brand-500 text-white shadow-md shadow-brand-500/25'
                      : 'text-slate-600 hover:bg-brand-50 hover:text-brand-700',
                  )}
                >
                  {cat.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-surface-900 p-5 text-white">
          <div className="pointer-events-none absolute inset-0 bg-hero-pattern opacity-40" aria-hidden />
          <p className="relative flex items-center gap-2 text-sm font-bold">
            <Sparkles className="h-4 w-4 text-brand-400" aria-hidden />
            Included on OnnRide
          </p>
          <ul className="relative mt-4 space-y-3 text-sm text-slate-300">
            {vehicleClass !== 'FOUR_WHEELER' ? (
              <li className="flex items-center gap-2">
                <HardHat className="h-4 w-4 text-brand-400" aria-hidden />
                Complimentary helmet
              </li>
            ) : (
              <li className="flex items-center gap-2">
                <ShieldCheck className="h-4 w-4 text-brand-400" aria-hidden />
                Valid LMV license required
              </li>
            )}
            <li className="flex items-center gap-2">
              <ShieldCheck className="h-4 w-4 text-brand-400" aria-hidden />
              Verified vendor & RC
            </li>
            <li className="flex items-center gap-2">
              <Wallet className="h-4 w-4 text-brand-400" aria-hidden />
              Coupons & wallet at checkout
            </li>
          </ul>
        </div>
      </div>
    </aside>
  );
}
