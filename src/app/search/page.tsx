import Link from 'next/link';
import { Suspense } from 'react';
import type { Metadata } from 'next';
import { redirect } from 'next/navigation';
import {
  ArrowLeft,
  Bike,
  CalendarDays,
  MapPin,
  SearchX,
  SlidersHorizontal,
  Sparkles,
} from 'lucide-react';
import { VehicleCard } from '@/components/vehicles/VehicleCard';
import { SearchBarSection } from '@/features/search/SearchBarSection.client';
import {
  SearchMobileFilters,
  SearchSidebar,
} from '@/features/search/SearchSidebar.client';
import { getCategories, getLocations, getPickupPoints, searchVehicles } from '@/lib/api';
import { parseVehicleClassParam, vehicleClassLabel } from '@/lib/vehicle-class';
import {
  DEFAULT_PICKUP_TIME,
  DEFAULT_RETURN_TIME,
  formatRentalSchedule,
  rentalQueryString,
} from '@/lib/rental-datetime';
import { vehicleDetailPath } from '@/lib/vehicle-path';
import { pageMetadata } from '@/lib/seo/metadata';
import { SEARCH_HUB_SEO } from '@/lib/seo/primary-keywords';

interface SearchPageProps {
  searchParams: Promise<{
    locationId?: string;
    pickupDate?: string;
    pickupTime?: string;
    returnDate?: string;
    returnTime?: string;
    location?: string;
    q?: string;
    category?: string;
    categoryId?: string;
    vehicleClass?: string;
    doorstep?: string;
    roadside?: string;
  }>;
}

export async function generateMetadata({ searchParams }: SearchPageProps): Promise<Metadata> {
  const params = await searchParams;
  const hasQueryParams = Object.values(params).some(Boolean);

  return pageMetadata({
    title: SEARCH_HUB_SEO.title,
    description: SEARCH_HUB_SEO.description,
    path: '/search',
    noindex: hasQueryParams,
  });
}

export const dynamic = 'force-dynamic';

export default async function SearchPage({ searchParams }: SearchPageProps) {
  const params = await searchParams;
  const {
    locationId: locationIdParam,
    pickupDate,
    pickupTime = DEFAULT_PICKUP_TIME,
    returnDate,
    returnTime = DEFAULT_RETURN_TIME,
    location: locationSlugParam,
    q: searchQuery,
    category: categorySlug,
    categoryId: categoryIdParam,
    vehicleClass: vehicleClassParam,
    doorstep: doorstepFilter,
    roadside: roadsideFilter,
  } = params;

  const vehicleClass = parseVehicleClassParam(vehicleClassParam);

  const [locations, categories] = await Promise.all([
    getLocations(),
    getCategories(vehicleClass),
  ]);

  // Sitelinks Searchbox / SearchAction: ?q={city} → city hub
  const q = searchQuery?.trim();
  if (q && !locationIdParam) {
    const needle = q.toLowerCase();
    const match = locations.find(
      (l) =>
        l.slug === needle ||
        l.name.toLowerCase() === needle ||
        l.name.toLowerCase().includes(needle),
    );
    if (match) {
      redirect(`/bike-rental/${match.slug}`);
    }
  }

  const locationFromSlug = locationSlugParam
    ? locations.find((l) => l.slug === locationSlugParam)
    : undefined;
  const locationId = locationIdParam ?? locationFromSlug?.id;
  const location = locations.find((l) => l.id === locationId);
  const category =
    (categorySlug ? categories.find((c) => c.slug === categorySlug) : undefined) ??
    (categoryIdParam ? categories.find((c) => c.id === categoryIdParam) : undefined);
  const pickupPoints = location?.slug ? await getPickupPoints(location.slug) : [];

  const hasSearch = Boolean(locationId && pickupDate && returnDate);

  const vehicles = hasSearch
    ? await searchVehicles({
        locationId: locationId!,
        pickupDate: pickupDate!,
        pickupTime,
        returnDate: returnDate!,
        returnTime,
        vehicleClass,
        ...(category ? { categoryId: category.id } : {}),
      })
    : [];

  const sorted = [...vehicles].sort(
    (a, b) => parseFloat(a.pricePerDay) - parseFloat(b.pricePerDay),
  );

  const filtered = sorted.filter((vehicle) => {
    if (doorstepFilter === '1' && !vehicle.doorstepDelivery) return false;
    if (roadsideFilter === '1' && !vehicle.roadsideAssistance) return false;
    return true;
  });

  return (
    <div className="min-h-screen bg-surface-50">
      {/* Hero search header */}
      <section className="relative overflow-hidden bg-surface-950 text-white">
        <div className="absolute inset-0 bg-hero-pattern" />
        <div className="absolute inset-0 bg-road-lines opacity-30" />
        <div className="absolute -right-24 top-0 h-80 w-80 rounded-full bg-brand-500/20 blur-3xl" />

        <div className="section-container relative py-8 sm:py-12">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm font-medium text-slate-400 transition hover:text-white"
          >
            <ArrowLeft className="h-4 w-4" aria-hidden />
            Back to home
          </Link>

          <div className="mt-6 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-brand-300">
                <Sparkles className="h-3.5 w-3.5" aria-hidden />
                Search rides
              </div>
              <h1 className="font-display text-3xl font-bold tracking-tight sm:text-4xl">
                {location ? (
                  <>
                    Self-drive rentals in{' '}
                    <span className="text-brand-400">{location.name}</span>
                  </>
                ) : (
                  <>
                    Find your <span className="text-brand-400">perfect ride</span>
                  </>
                )}
              </h1>
              {hasSearch ? (
                <div className="mt-4 flex flex-wrap gap-3">
                  {location ? (
                    <span className="inline-flex items-center gap-1.5 rounded-full bg-white/10 px-3 py-1.5 text-sm text-slate-200">
                      <MapPin className="h-4 w-4 text-brand-400" aria-hidden />
                      {location.name}
                    </span>
                  ) : null}
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-white/10 px-3 py-1.5 text-sm text-slate-200">
                    <CalendarDays className="h-4 w-4 text-brand-400" aria-hidden />
                    {formatRentalSchedule(pickupDate!, pickupTime)} →{' '}
                    {formatRentalSchedule(returnDate!, returnTime)}
                  </span>
                  {category ? (
                    <span className="inline-flex items-center gap-1.5 rounded-full bg-brand-500/30 px-3 py-1.5 text-sm font-semibold text-brand-100">
                      <Bike className="h-4 w-4" aria-hidden />
                      {category.name}
                    </span>
                  ) : null}
                  {pickupPoints.length > 0 ? (
                    <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-500/20 px-3 py-1.5 text-sm text-emerald-100">
                      {pickupPoints.length} pickup points at checkout
                    </span>
                  ) : null}
                </div>
              ) : (
                <p className="mt-3 max-w-xl text-slate-400">
                  Select a city and travel dates to browse verified self-drive{' '}
                  {vehicleClassLabel(vehicleClass).toLowerCase()}.
                </p>
              )}
            </div>

            {hasSearch && filtered.length > 0 ? (
              <div className="hidden rounded-2xl border border-white/10 bg-white/5 px-6 py-4 backdrop-blur lg:block">
                <p className="text-xs font-semibold uppercase tracking-wider text-brand-300">
                  Available now
                </p>
                <p className="font-display text-3xl font-bold">{filtered.length}</p>
                <p className="text-sm text-slate-400">rides matched</p>
              </div>
            ) : null}
          </div>

          <div className="mt-8">
            <Suspense fallback={<div className="h-16 animate-pulse rounded-2xl bg-white/10" />}>
              <SearchBarSection locations={locations} />
            </Suspense>
          </div>
        </div>
      </section>

      {/* Results */}
      <section className="relative bg-gradient-to-b from-brand-50/80 via-white to-surface-50">
        <div
          className="absolute inset-0 bg-section-dots bg-dots opacity-30"
          aria-hidden
        />
        <div className="section-container relative py-10 sm:py-14">
          <div className="flex flex-col gap-8 lg:flex-row">
            <Suspense fallback={null}>
              <SearchSidebar
                categories={categories}
                resultCount={filtered.length}
                locationName={location?.name}
                pickupDate={pickupDate}
                pickupTime={pickupTime}
                returnDate={returnDate}
                returnTime={returnTime}
                categoryName={category?.name}
                vehicleClass={vehicleClass}
              />
            </Suspense>

            <div className="min-w-0 flex-1">
              <Suspense fallback={null}>
                <SearchMobileFilters
                  categories={categories}
                  resultCount={filtered.length}
                  locationName={location?.name}
                  vehicleClass={vehicleClass}
                />
              </Suspense>

              {!hasSearch ? (
                <div className="overflow-hidden rounded-3xl border border-surface-200 bg-white shadow-card">
                  <div className="bg-gradient-to-br from-brand-500 to-brand-600 px-8 py-10 text-center text-white">
                    <SlidersHorizontal className="mx-auto h-12 w-12 text-brand-200" aria-hidden />
                    <p className="mt-4 font-display text-2xl font-bold">Start your search</p>
                    <p className="mt-2 text-orange-100">
                      Pick a city and dates above to see available bikes.
                    </p>
                  </div>
                  <div className="px-8 py-10 text-center">
                    <p className="text-sm text-slate-500">
                      Browse as guest — no login required until checkout.
                    </p>
                    <Link
                      href="/"
                      className="mt-6 inline-flex items-center gap-2 rounded-xl bg-brand-500 px-6 py-3 text-sm font-semibold text-white hover:bg-brand-600"
                    >
                      Explore from homepage
                    </Link>
                  </div>
                </div>
              ) : filtered.length === 0 ? (
                <div className="overflow-hidden rounded-3xl border border-surface-200 bg-white shadow-card">
                  <div className="bg-gradient-to-br from-surface-800 to-surface-950 px-8 py-10 text-center text-white">
                    <SearchX className="mx-auto h-12 w-12 text-slate-500" aria-hidden />
                    <p className="mt-4 font-display text-2xl font-bold">No rides available</p>
                    <p className="mt-2 text-slate-400">
                      {doorstepFilter === '1' || roadsideFilter === '1'
                        ? 'Try turning off ride feature filters in the sidebar, or change dates and category.'
                        : 'Try different dates, another city, or remove category filters.'}
                    </p>
                  </div>
                  <div className="grid gap-4 px-8 py-8 sm:grid-cols-3">
                    {[
                      'Change travel dates',
                      'Pick another city',
                      'Browse all categories',
                    ].map((tip) => (
                      <div
                        key={tip}
                        className="rounded-xl border border-brand-100 bg-brand-50/50 px-4 py-3 text-center text-sm font-medium text-brand-800"
                      >
                        {tip}
                      </div>
                    ))}
                  </div>
                </div>
              ) : (
                <>
                  <div className="mb-6 hidden items-center justify-between rounded-2xl border border-surface-200 bg-white px-5 py-4 shadow-sm lg:flex">
                    <div>
                      <p className="font-display text-lg font-bold text-surface-900">
                        {filtered.length} ride{filtered.length !== 1 ? 's' : ''} available
                      </p>
                      <p className="text-sm text-slate-500">Sorted by lowest price first</p>
                    </div>
                    {category ? (
                      <span className="rounded-full bg-brand-100 px-4 py-1.5 text-sm font-semibold text-brand-800">
                        {category.name}
                      </span>
                    ) : null}
                  </div>

                  <ul className="grid gap-7 sm:grid-cols-2 xl:grid-cols-2">
                    {filtered.map((vehicle) => (
                      <li key={vehicle.id}>
                        <VehicleCard
                          vehicle={vehicle}
                          href={vehicleDetailPath(
                            vehicle,
                            rentalQueryString({
                              pickupDate: pickupDate!,
                              pickupTime,
                              returnDate: returnDate!,
                              returnTime,
                            }),
                          )}
                        />
                      </li>
                    ))}
                  </ul>
                </>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
