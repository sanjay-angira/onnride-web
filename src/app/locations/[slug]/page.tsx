import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import {
  Bike,
  ChevronRight,
  Clock,
  MapPin,
  Route,
  Shield,
  Sparkles,
  Star,
} from 'lucide-react';
import { FaqAccordion } from '@/components/marketing/FaqAccordion.client';
import { HowItWorksSection } from '@/components/marketing/HowItWorksSection';
import { LocationContactSection } from '@/features/locations/LocationContactSection';
import { HomeSearchForm } from '@/features/search/HomeSearchForm.client';
import { getLocationBySlug, getLocations, getPickupPoints } from '@/lib/api';
import { getCityContent } from '@/lib/city-content';
import {
  buildLocationFaqs,
  buildLocationJsonLd,
  buildLocationKeywords,
  geoRegionForState,
  resolveLocationSeo,
} from '@/lib/location-seo';
import { pageMetadata } from '@/lib/seo/metadata';
import { absoluteUrl } from '@/lib/seo/site-url';
import { getPublicSettingsMap } from '@/lib/public-settings';
import {
  DEFAULT_PICKUP_TIME,
  DEFAULT_RETURN_TIME,
  rentalQueryString,
} from '@/lib/rental-datetime';
import { CONTACT } from '@/lib/site-content';
import { getDestinationVisual } from '@/lib/vehicle-ui';

export const revalidate = 3600;

interface LocationPageProps {
  params: Promise<{ slug: string }>;
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

export async function generateMetadata({ params }: LocationPageProps): Promise<Metadata> {
  const { slug } = await params;
  const location = await getLocationBySlug(slug);
  if (!location) return { title: 'City not found' };

  const content = getCityContent(slug);
  const seo = resolveLocationSeo(slug, location);
  const title =
    seo.metaTitle ?? `Self-Drive Bike Rental in ${location.name} | OnnRide`;
  const description =
    seo.metaDescription ??
    content.aeoSummary ??
    `Rent bikes and scooters in ${location.name}. Verified vendors, helmet included, book online with secure payment.`;
  const keywords = buildLocationKeywords(location, content);
  const geoRegion = geoRegionForState(location.state);
  const lat = Number.parseFloat(location.latitude);
  const lng = Number.parseFloat(location.longitude);
  const hasGeo = Number.isFinite(lat) && Number.isFinite(lng) && !(lat === 0 && lng === 0);

  const base = pageMetadata({
    title,
    description,
    path: `/locations/${slug}`,
  });

  return {
    ...base,
    keywords,
    ...(geoRegion || hasGeo
      ? {
          other: {
            ...(geoRegion ? { 'geo.region': geoRegion } : {}),
            'geo.placename': location.name,
            ...(hasGeo
              ? {
                  'geo.position': `${lat};${lng}`,
                  ICBM: `${lat}, ${lng}`,
                }
              : {}),
          },
        }
      : {}),
  };
}

export default async function LocationLandingPage({ params }: LocationPageProps) {
  const { slug } = await params;
  const [location, locations, pickupPoints, settings] = await Promise.all([
    getLocationBySlug(slug),
    getLocations(),
    getPickupPoints(slug),
    getPublicSettingsMap(),
  ]);

  if (!location) notFound();

  const content = getCityContent(slug);
  const seo = resolveLocationSeo(slug, location);
  const visual = getDestinationVisual(slug);
  const heroImageUrl = location.heroImageUrl?.trim() || null;
  const dates = defaultDates();

  const searchHref = `/search?locationId=${location.id}&${rentalQueryString({
    pickupDate: dates.pickup,
    pickupTime: dates.pickupTime,
    returnDate: dates.ret,
    returnTime: dates.returnTime,
    location: slug,
  })}`;

  const phone =
    seo.supportPhone ?? settings.platform_phone ?? CONTACT.phone;
  const whatsapp =
    seo.supportPhone ?? settings.platform_whatsapp ?? CONTACT.whatsapp;
  const email = settings.platform_email ?? CONTACT.email;

  const faqs = buildLocationFaqs(location.name, content);
  const jsonLdBlocks = buildLocationJsonLd({
    location: {
      ...location,
      metaTitle: seo.metaTitle,
      metaDescription: seo.metaDescription,
    },
    slug,
    content,
    faqs,
    contactPhone: phone,
    contactEmail: email,
  });

  const relatedCities = locations.filter((l) => l.slug !== slug).slice(0, 8);

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

      <nav
        aria-label="Breadcrumb"
        className="border-b border-surface-200 bg-surface-50/80"
      >
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
            <Link href="/locations" className="hover:text-brand-600">
              Locations
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
              Bike &amp; scooter rental in {location.name}
            </h1>
            <p className="mt-3 text-lg font-medium text-white/90">{visual.tagline}</p>
            <p className="mt-4 max-w-2xl text-base leading-relaxed text-white/80">
              {content.intro}
            </p>

            <ul className="mt-6 flex flex-wrap gap-2">
              {['Verified vendors', 'Helmet included', 'Online booking', 'Secure payment'].map(
                (badge) => (
                  <li
                    key={badge}
                    className="rounded-full border border-white/20 bg-white/10 px-3 py-1 text-xs font-medium text-white/90"
                  >
                    {badge}
                  </li>
                ),
              )}
            </ul>
          </div>

          <div className="mt-10 max-w-6xl">
            <HomeSearchForm
              locations={locations}
              defaultLocationId={location.id}
              variant="hero"
            />
          </div>
        </div>
      </section>

      <section className="border-b border-surface-200 bg-white py-8">
        <div className="section-container">
          <div
            className="rounded-2xl border border-brand-200/60 bg-brand-50/50 p-6 sm:p-8"
            itemScope
            itemType="https://schema.org/WebPageElement"
          >
            <p className="text-xs font-bold uppercase tracking-wider text-brand-600">
              Quick answer
            </p>
            <p
              className="mt-2 text-lg font-medium leading-relaxed text-surface-900 sm:text-xl"
              itemProp="description"
            >
              {content.aeoSummary}
            </p>
          </div>
        </div>
      </section>

      <section className="section-container py-14">
        <div className="grid gap-10 lg:grid-cols-2">
          <div>
            <h2 className="flex items-center gap-2 font-display text-2xl font-bold text-surface-900">
              <Sparkles className="h-6 w-6 text-brand-500" aria-hidden />
              Why book in {location.name}
            </h2>
            <ul className="mt-5 space-y-3">
              {content.highlights.map((item) => (
                <li key={item} className="flex items-start gap-3 text-sm leading-relaxed text-slate-600">
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
              <p className="mt-2 text-sm text-slate-600">
                Pickup and vendor hubs across popular neighbourhoods — choose your point at
                checkout.
              </p>
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

      {content.popularRoutes.length > 0 ? (
        <section className="border-y border-surface-200 bg-surface-50 py-14">
          <div className="section-container">
            <h2 className="flex items-center gap-2 font-display text-2xl font-bold text-surface-900">
              <Route className="h-6 w-6 text-brand-500" aria-hidden />
              Popular rides in {location.name}
            </h2>
            <p className="mt-2 max-w-2xl text-sm text-slate-600">
              Plan your route before you book — confirm fuel stops and vendor permissions for
              longer trips via booking chat.
            </p>
            <ul className="mt-8 grid gap-4 sm:grid-cols-2">
              {content.popularRoutes.map((route) => (
                <li
                  key={route.name}
                  className="rounded-2xl border border-surface-200 bg-white p-5 shadow-card"
                >
                  <div className="flex items-start justify-between gap-3">
                    <h3 className="font-display font-bold text-surface-900">{route.name}</h3>
                    <span className="shrink-0 rounded-full bg-brand-100 px-2.5 py-0.5 text-xs font-semibold text-brand-800">
                      {route.distance}
                    </span>
                  </div>
                  <p className="mt-2 text-sm leading-relaxed text-slate-600">{route.description}</p>
                </li>
              ))}
            </ul>
          </div>
        </section>
      ) : null}

      <section className="section-container py-14">
        <h2 className="font-display text-2xl font-bold text-surface-900">
          Choose your ride in {location.name}
        </h2>
        <p className="mt-2 text-sm text-slate-600">
          Daily rates come from verified vendors — compare live prices on search.
        </p>
        <ul className="mt-8 grid gap-4 sm:grid-cols-3">
          {content.vehicleTypes.map((vt) => (
            <li key={vt.slug}>
              <Link
                href={`${searchHref}&category=${vt.slug}`}
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
      </section>

      <section className="border-y border-surface-200 bg-surface-50 py-14">
        <div className="section-container">
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
                <p className="mt-5 rounded-xl border border-dashed border-surface-300 bg-white px-4 py-4 text-sm text-slate-500">
                  Vendor hub pickup — station and airport points rolling out city by city. Select
                  your hub at checkout.
                </p>
              )}
            </div>

            <div>
              <h2 className="flex items-center gap-2 font-display text-2xl font-bold text-surface-900">
                <Clock className="h-6 w-6 text-brand-500" aria-hidden />
                Riding tips — {location.name}
              </h2>
              <ul className="mt-5 space-y-2">
                {content.travelTips.map((tip) => (
                  <li
                    key={tip}
                    className="rounded-xl border border-surface-200 bg-white px-4 py-3 text-sm leading-relaxed text-slate-600"
                  >
                    {tip}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      <LocationContactSection
        cityName={location.name}
        state={location.state}
        phone={phone}
        email={email}
        whatsapp={whatsapp}
      />

      <section className="section-container py-16">
        <div className="max-w-3xl">
          <h2 className="section-title">FAQs — bike rental in {location.name}</h2>
          <p className="mt-2 text-sm text-slate-600">
            Common questions about documents, deposits, pickup and pricing — updated for{' '}
            {location.name} riders.
          </p>
          <div className="mt-8">
            <FaqAccordion items={faqs} variant="brand" />
          </div>
        </div>

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

      {relatedCities.length > 0 ? (
        <section className="border-t border-surface-200 bg-surface-50 py-12">
          <div className="section-container">
            <h2 className="font-display text-lg font-bold text-surface-900">
              Other cities on OnnRide
            </h2>
            <ul className="mt-4 flex flex-wrap gap-2">
              {relatedCities.map((city) => (
                <li key={city.id}>
                  <Link
                    href={`/locations/${city.slug}`}
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
