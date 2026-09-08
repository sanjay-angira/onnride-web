import Link from 'next/link';
import {
  Bike,
  ChevronRight,
  Clock,
  FileText,
  IndianRupee,
  MapPin,
  Mountain,
  Route,
  Shield,
  Sparkles,
  Star,
} from 'lucide-react';
import { FaqAccordion } from '@/components/marketing/FaqAccordion.client';
import { HowItWorksSection } from '@/components/marketing/HowItWorksSection';
import { LocationContactSection } from '@/features/locations/LocationContactSection';
import { CityBlogGuides } from '@/features/locations/CityBlogGuides';
import { HomeSearchForm } from '@/features/search/HomeSearchForm.client';
import type { LocationReviewStats } from '@/lib/api';
import type { ResolvedCityContent } from '@/lib/location-content';
import type { LocationFaq } from '@/lib/location-seo';
import {
  DEFAULT_PICKUP_TIME,
  DEFAULT_RETURN_TIME,
  rentalQueryString,
} from '@/lib/rental-datetime';
import type { Location, PickupPoint, VehicleClass } from '@/types';
import { OG_IMAGE_SIZE } from '@/lib/image-variants';
import { resolveLocationImageUrl } from '@/lib/vehicle-image';
import { getDestinationVisual } from '@/lib/vehicle-ui';
import { vehicleClassToParam } from '@/lib/vehicle-class';

const BIKE_CATEGORY_LINKS = [
  { name: 'Scooters', slug: 'scooter', description: 'Easy city rides and short trips' },
  { name: 'Commuter bikes', slug: 'commuter', description: 'Fuel-efficient daily riders' },
  { name: 'Cruisers', slug: 'cruiser', description: 'Comfortable highway and leisure rides' },
  { name: 'Adventure', slug: 'adventure', description: 'Off-road and touring options' },
];

const CAR_CATEGORY_LINKS = [
  { name: 'Hatchback', slug: 'hatchback', description: 'Compact city cars — easy to park & drive' },
  { name: 'Sedan', slug: 'sedan', description: 'Comfortable sedans for family & business trips' },
  { name: 'SUV', slug: 'suv', description: 'Spacious SUVs for highways & group travel' },
  { name: 'MUV', slug: 'muv', description: '7-seater MUVs for family outings' },
];

export interface CityLandingPageProps {
  slug: string;
  location: Location;
  locations: Location[];
  pickupPoints: PickupPoint[];
  content: ResolvedCityContent;
  faqs: LocationFaq[];
  phone: string;
  whatsapp: string;
  email: string;
  jsonLdBlocks: Record<string, unknown>[];
  reviewStats: LocationReviewStats | null;
  nearbyCities: Location[];
  basePath?: string;
  hubLabel?: string;
  defaultVehicleClass?: VehicleClass;
  trustBadges?: string[];
  categoryLinks?: Array<{ name: string; slug: string; description: string }>;
}

function defaultDates() {
  const pickup = new Date();
  pickup.setDate(pickup.getDate() + 1);
  const ret = new Date();
  ret.setDate(ret.getDate() + 3);
  return {
    pickup: pickup.toISOString().split('T')[0],
    ret: ret.toISOString().split('T')[0],
    pickupTime: DEFAULT_PICKUP_TIME,
    returnTime: DEFAULT_RETURN_TIME,
  };
}

export function CityLandingPage({
  slug,
  location,
  locations,
  pickupPoints,
  content,
  faqs,
  phone,
  whatsapp,
  email,
  jsonLdBlocks,
  reviewStats,
  nearbyCities,
  basePath = '/bike-rental',
  hubLabel = 'Bike rental',
  defaultVehicleClass = 'TWO_WHEELER',
  trustBadges,
  categoryLinks,
}: CityLandingPageProps) {
  const visual = getDestinationVisual(slug);
  const heroImageUrl = resolveLocationImageUrl(location, OG_IMAGE_SIZE);
  const dates = defaultDates();
  const hubPath = basePath;
  const isCar = defaultVehicleClass === 'FOUR_WHEELER';

  const searchHref = `/search?locationId=${location.id}&vehicleClass=${vehicleClassToParam(defaultVehicleClass)}&${rentalQueryString({
    pickupDate: dates.pickup,
    pickupTime: dates.pickupTime,
    returnDate: dates.ret,
    returnTime: dates.returnTime,
    location: slug,
  })}`;

  const vehicleTypes =
    categoryLinks ??
    (content.vehicleTypes.length > 0 ? content.vehicleTypes : isCar ? CAR_CATEGORY_LINKS : BIKE_CATEGORY_LINKS);
  const heroBadges =
    trustBadges ??
    (isCar
      ? ['Verified vendors', 'LMV license required', 'Online booking', 'Secure payment']
      : ['Verified vendors', 'Helmet included', 'Online booking', 'Secure payment']);

  return (
    <>
      {jsonLdBlocks.map((block, index) => (
        <script
          // eslint-disable-next-line react/no-danger
          key={`ld-${index}`}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(block) }}
        />
      ))}

      <nav aria-label="Breadcrumb" className="border-b border-surface-200 bg-surface-50/80">
        <ol className="section-container flex flex-wrap items-center gap-1 py-3 text-sm text-slate-500">
          <li>
            <Link href="/" className="hover:text-brand-600">
              Home
            </Link>
          </li>
          <li aria-hidden>
            <ChevronRight className="h-4 w-4" />
          </li>
          <li>
            <Link href={hubPath} className="hover:text-brand-600">
              {hubLabel}
            </Link>
          </li>
          <li aria-hidden>
            <ChevronRight className="h-4 w-4" />
          </li>
          <li>
            <span className="text-slate-700" aria-current="page">
              {location.name}
            </span>
          </li>
        </ol>
      </nav>

      {/* 1. H1 + hero */}
      <section
        className={`relative overflow-hidden text-white ${!heroImageUrl ? `bg-gradient-to-br ${visual.gradient}` : ''}`}
      >
        {heroImageUrl ? (
          <div
            className="absolute inset-0 bg-cover bg-center bg-no-repeat"
            style={{ backgroundImage: `url("${heroImageUrl}")` }}
            aria-hidden
          />
        ) : null}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_rgba(255,255,255,0.12),transparent_55%)]" />
        <div className={`absolute inset-0 ${heroImageUrl ? 'bg-black/55' : 'bg-black/25'}`} />
        <div className="section-container relative py-14 sm:py-20">
          <div className="max-w-3xl">
            <p className="inline-flex items-center gap-1.5 rounded-full border border-white/20 bg-white/10 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-white/90 backdrop-blur-sm">
              <MapPin className="h-3.5 w-3.5" aria-hidden />
              {location.state ?? 'India'} · Self-drive rental
            </p>
            <h1 className="mt-4 font-display text-4xl font-bold leading-tight sm:text-5xl lg:text-[3.25rem]">
              {content.h1 ??
                (isCar
                  ? `Self-drive car rental in ${location.name}`
                  : `Bike & scooter rental in ${location.name}`)}
            </h1>
            <p className="mt-3 text-lg font-medium text-white/90">{visual.tagline}</p>
            <p className="mt-4 max-w-2xl text-base leading-relaxed text-white/80">{content.intro}</p>
            <ul className="mt-6 flex flex-wrap gap-2">
              {heroBadges.map((badge) => (
                  <li
                    key={badge}
                    className="rounded-full border border-white/20 bg-white/10 px-3 py-1 text-xs font-medium text-white/90"
                  >
                    {badge}
                  </li>
              ))}
            </ul>
          </div>
          <div className="mt-10 max-w-4xl">
            <HomeSearchForm
              locations={locations}
              defaultLocationId={location.id}
              defaultVehicleClass={defaultVehicleClass}
              variant="hero"
            />
          </div>
        </div>
      </section>

      {/* 2. AEO quick answer */}
      <section className="border-b border-surface-200 bg-white py-8">
        <div className="section-container">
          <div className="rounded-2xl border border-brand-200/60 bg-brand-50/50 p-6 sm:p-8">
            <p className="text-xs font-bold uppercase tracking-wider text-brand-600">Quick answer</p>
            <p className="mt-2 text-lg font-medium leading-relaxed text-surface-900 sm:text-xl">
              {content.aeoSummary}
            </p>
          </div>
        </div>
      </section>

      {/* 3. Why choose */}
      <section className="section-container py-14">
        <div className="grid gap-10 lg:grid-cols-2">
          <div>
            <h2 className="flex items-center gap-2 font-display text-2xl font-bold text-surface-900">
              <Sparkles className="h-6 w-6 text-brand-500" aria-hidden />
              Why book in {location.name}
            </h2>
            <ul className="mt-5 space-y-3">
              {content.highlights.map((item) => (
                <li
                  key={item}
                  className="flex items-start gap-3 text-sm leading-relaxed text-slate-600"
                >
                  <Shield className="mt-0.5 h-4 w-4 shrink-0 text-emerald-600" aria-hidden />
                  {item}
                </li>
              ))}
            </ul>
            <Link
              href={searchHref}
              className="mt-8 inline-flex items-center gap-2 rounded-xl bg-brand-500 px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-brand-500/25 hover:bg-brand-600"
            >
              See live prices in {location.name}
              <ChevronRight className="h-4 w-4" aria-hidden />
            </Link>
          </div>
          {content.areasServed.length > 0 ? (
            <div>
              <h2 className="font-display text-2xl font-bold text-surface-900">
                Areas we serve in {location.name}
              </h2>
              <ul className="mt-5 grid gap-2 sm:grid-cols-2">
                {content.areasServed.map((area) => (
                  <li
                    key={area}
                    className="flex items-center gap-2 rounded-xl border border-surface-200 bg-surface-50 px-3 py-2.5 text-sm text-slate-700"
                  >
                    <MapPin className="h-3.5 w-3.5 shrink-0 text-brand-500" aria-hidden />
                    {area}
                  </li>
                ))}
              </ul>
            </div>
          ) : null}
        </div>
      </section>

      {/* 4. Category links (inventory silos) */}
      <section className="border-y border-surface-200 bg-surface-50 py-14">
        <div className="section-container">
          <h2 className="font-display text-2xl font-bold text-surface-900">
            Choose your ride in {location.name}
          </h2>
          <p className="mt-2 text-sm text-slate-600">
            Daily rates come from verified vendors — compare live prices on search.
          </p>
          <ul className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {vehicleTypes.map((vt) => (
              <li key={vt.slug}>
                <Link
                  href={`${basePath}/${slug}/${vt.slug}`}
                  className="group flex h-full flex-col rounded-2xl border border-surface-200 bg-white p-5 shadow-card transition hover:border-brand-300 hover:shadow-md"
                >
                  <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand-100 text-brand-700">
                    <Bike className="h-5 w-5" aria-hidden />
                  </span>
                  <h3 className="mt-4 font-display font-bold text-surface-900 group-hover:text-brand-700">
                    {vt.name}
                  </h3>
                  <p className="mt-1 flex-1 text-sm text-slate-600">{vt.description}</p>
                  <span className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-brand-600">
                    Browse {vt.name.toLowerCase()}
                    <ChevronRight className="h-4 w-4 transition group-hover:translate-x-0.5" aria-hidden />
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* 5. Pricing explainer */}
      {content.pricingExplainer ? (
        <section className="section-container py-14">
          <h2 className="flex items-center gap-2 font-display text-2xl font-bold text-surface-900">
            <IndianRupee className="h-6 w-6 text-brand-500" aria-hidden />
            How pricing works in {location.name}
          </h2>
          <p className="mt-4 max-w-3xl text-sm leading-relaxed text-slate-600">
            {content.pricingExplainer}
          </p>
          <Link
            href={searchHref}
            className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-brand-600 hover:text-brand-700"
          >
            Compare live daily rates →
          </Link>
        </section>
      ) : null}

      {/* 6. Documents */}
      {content.documentsHtml ? (
        <section className="border-y border-surface-200 bg-surface-50 py-14">
          <div className="section-container">
            <h2 className="flex items-center gap-2 font-display text-2xl font-bold text-surface-900">
              <FileText className="h-6 w-6 text-brand-500" aria-hidden />
              Required documents
            </h2>
            <div
              className="prose prose-sm mt-4 max-w-3xl text-slate-600 prose-li:my-1"
              // eslint-disable-next-line react/no-danger
              dangerouslySetInnerHTML={{ __html: content.documentsHtml }}
            />
          </div>
        </section>
      ) : null}

      {/* 7. Pickup + 8. Routes */}
      <section className="section-container py-14">
        <div className="grid gap-10 lg:grid-cols-2">
          <div>
            <h2 className="font-display text-2xl font-bold text-surface-900">Pickup points</h2>
            <p className="mt-2 text-sm leading-relaxed text-slate-600">{content.pickupNote}</p>
            {pickupPoints.length > 0 ? (
              <ul className="mt-5 space-y-3">
                {pickupPoints.map((point) => (
                  <li
                    key={point.id}
                    className="rounded-xl border border-surface-200 bg-white px-4 py-3.5 text-sm shadow-sm"
                  >
                    <span className="font-medium text-surface-900">{point.name}</span>
                    {point.address ? (
                      <span className="mt-0.5 block text-slate-500">{point.address}</span>
                    ) : null}
                  </li>
                ))}
              </ul>
            ) : (
              <p className="mt-5 rounded-xl border border-dashed border-surface-300 bg-surface-50 px-4 py-4 text-sm text-slate-500">
                Vendor hub pickup — station and airport points rolling out city by city.
              </p>
            )}
          </div>
          {content.popularRoutes.length > 0 ? (
            <div>
              <h2 className="flex items-center gap-2 font-display text-2xl font-bold text-surface-900">
                <Route className="h-6 w-6 text-brand-500" aria-hidden />
                Popular rides
              </h2>
              <ul className="mt-5 space-y-3">
                {content.popularRoutes.map((route) => (
                  <li
                    key={route.name}
                    className="rounded-xl border border-surface-200 bg-white p-4 text-sm shadow-sm"
                  >
                    <div className="flex items-start justify-between gap-3">
                      <h3 className="font-semibold text-surface-900">{route.name}</h3>
                      <span className="shrink-0 rounded-full bg-brand-100 px-2 py-0.5 text-xs font-semibold text-brand-800">
                        {route.distance}
                      </span>
                    </div>
                    <p className="mt-1 text-slate-600">{route.description}</p>
                  </li>
                ))}
              </ul>
            </div>
          ) : null}
        </div>
      </section>

      {/* 9. Attractions */}
      {content.attractions.length > 0 ? (
        <section className="border-y border-surface-200 bg-surface-50 py-14">
          <div className="section-container">
            <h2 className="flex items-center gap-2 font-display text-2xl font-bold text-surface-900">
              <Mountain className="h-6 w-6 text-brand-500" aria-hidden />
              Tourist attractions near {location.name}
            </h2>
            <ul className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {content.attractions.map((attr) => (
                <li
                  key={attr.name}
                  className="rounded-2xl border border-surface-200 bg-white p-5 shadow-card"
                >
                  <h3 className="font-display font-bold text-surface-900">{attr.name}</h3>
                  {attr.distance ? (
                    <p className="mt-1 text-xs font-medium text-brand-600">{attr.distance}</p>
                  ) : null}
                  <p className="mt-2 text-sm text-slate-600">{attr.description}</p>
                </li>
              ))}
            </ul>
          </div>
        </section>
      ) : null}

      {/* 10. Safety tips */}
      <section className="section-container py-14">
        <h2 className="flex items-center gap-2 font-display text-2xl font-bold text-surface-900">
          <Clock className="h-6 w-6 text-brand-500" aria-hidden />
          Riding tips — {location.name}
        </h2>
        <ul className="mt-5 grid gap-2 sm:grid-cols-2">
          {content.travelTips.map((tip) => (
            <li
              key={tip}
              className="rounded-xl border border-surface-200 bg-surface-50 px-4 py-3 text-sm leading-relaxed text-slate-600"
            >
              {tip}
            </li>
          ))}
        </ul>
      </section>

      {/* 11. Reviews */}
      {reviewStats && reviewStats.topReviews.length > 0 ? (
        <section className="border-y border-surface-200 bg-surface-50 py-14">
          <div className="section-container">
            <h2 className="font-display text-2xl font-bold text-surface-900">
              What riders say in {location.name}
            </h2>
            {reviewStats.includeAggregateRating ? (
              <p className="mt-2 flex items-center gap-2 text-sm text-slate-600">
                <Star className="h-4 w-4 fill-amber-400 text-amber-400" aria-hidden />
                <span className="font-semibold text-surface-900">
                  {reviewStats.averageRating.toFixed(1)}
                </span>
                · {reviewStats.reviewCount} verified reviews
              </p>
            ) : null}
            <ul className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {reviewStats.topReviews.map((r) => (
                <li
                  key={r.id}
                  className="rounded-2xl border border-surface-200 bg-white p-5 shadow-card"
                >
                  <div className="flex items-center gap-1">
                    {Array.from({ length: r.rating }).map((_, i) => (
                      <Star key={i} className="h-3.5 w-3.5 fill-amber-400 text-amber-400" aria-hidden />
                    ))}
                  </div>
                  {r.review ? (
                    <p className="mt-3 text-sm leading-relaxed text-slate-600">&ldquo;{r.review}&rdquo;</p>
                  ) : null}
                  <p className="mt-3 text-xs font-medium text-slate-500">
                    {r.customerName ?? 'Verified rider'}
                    {r.vehicleModel ? ` · ${r.vehicleModel}` : ''}
                  </p>
                </li>
              ))}
            </ul>
          </div>
        </section>
      ) : null}

      <CityBlogGuides
        citySlug={slug}
        cityName={location.name}
        relatedBlogSlugs={content.relatedBlogSlugs}
      />

      <LocationContactSection
        cityName={location.name}
        state={location.state}
        phone={phone}
        email={email}
        whatsapp={whatsapp}
      />

      {/* 12. FAQ */}
      <section className="section-container py-16">
        <div className="max-w-3xl">
          <h2 className="section-title">FAQs — bike rental in {location.name}</h2>
          <div className="mt-8">
            <FaqAccordion items={faqs} variant="brand" />
          </div>
        </div>

        {/* 13. CTA */}
        <div className="mt-14 flex flex-col items-start gap-4 rounded-2xl border border-brand-200 bg-brand-50/40 p-6 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-start gap-3">
            <Star className="mt-0.5 h-5 w-5 shrink-0 text-brand-500" aria-hidden />
            <div>
              <p className="font-display font-bold text-surface-900">
                Ready to ride in {location.name}?
              </p>
              <p className="mt-1 text-sm text-slate-600">
                Compare verified vendors, apply coupons, and book in under 2 minutes.
              </p>
            </div>
          </div>
          <Link
            href={searchHref}
            className="inline-flex shrink-0 items-center rounded-xl bg-brand-500 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-brand-500/30 hover:bg-brand-600"
          >
            Browse all bikes →
          </Link>
        </div>
      </section>

      {/* Nearby cities */}
      {nearbyCities.length > 0 ? (
        <section className="border-t border-surface-200 bg-surface-50 py-12">
          <div className="section-container">
            <h2 className="font-display text-lg font-bold text-surface-900">Nearby cities</h2>
            <ul className="mt-4 flex flex-wrap gap-2">
              {nearbyCities.map((city) => (
                <li key={city.id}>
                  <Link
                    href={`${basePath}/${city.slug}`}
                    className="inline-flex rounded-full border border-surface-200 bg-white px-4 py-2 text-sm font-medium text-slate-700 hover:border-brand-300 hover:text-brand-700"
                  >
                    {city.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </section>
      ) : null}

      <HowItWorksSection />
    </>
  );
}
