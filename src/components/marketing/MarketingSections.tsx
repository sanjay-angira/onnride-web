import Link from 'next/link';
import {
  ArrowRight,
  CalendarClock,
  Flame,
  Gift,
  HardHat,
  Headphones,
  IndianRupee,
  MapPin,
  RotateCcw,
  ShieldCheck,
  Sparkles,
  Star,
  Tag,
  Wallet,
} from 'lucide-react';
import { OFFERS, RIDE_TYPES, TESTIMONIALS, TRUST_FEATURES } from '@/lib/site-content';
import {
  DEFAULT_PICKUP_TIME,
  DEFAULT_RETURN_TIME,
  formatRentalSchedule,
  rentalQueryString,
} from '@/lib/rental-datetime';
import { vehicleDetailPath } from '@/lib/vehicle-path';
import { TrendingVehicleCard } from '@/components/vehicles/TrendingVehicleCard';
import { getLocations, searchVehicles } from '@/lib/api';

const TRUST_ICONS = [ShieldCheck, HardHat, Wallet, Headphones, IndianRupee, RotateCcw] as const;

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

export async function PopularRidesSection() {
  const locations = await getLocations();
  const dates = defaultDates();
  const featuredSlugs = ['goa', 'delhi', 'bengaluru'] as const;
  const allVehicles: Awaited<ReturnType<typeof searchVehicles>> = [];
  const cityCounts: { slug: string; name: string; id: string; count: number }[] = [];

  for (const slug of featuredSlugs) {
    const loc = locations.find((l) => l.slug === slug);
    if (!loc) continue;
    const vehicles = await searchVehicles({
      locationId: loc.id,
      pickupDate: dates.pickup,
      pickupTime: dates.pickupTime,
      returnDate: dates.ret,
      returnTime: dates.returnTime,
    });
    cityCounts.push({ slug, name: loc.name, id: loc.id, count: vehicles.length });
    allVehicles.push(...vehicles.slice(0, 3));
  }

  const seen = new Set<string>();
  const popular = allVehicles.filter((vehicle) => {
    if (seen.has(vehicle.id)) return false;
    seen.add(vehicle.id);
    return true;
  }).slice(0, 7);

  const query = rentalQueryString({
    pickupDate: dates.pickup,
    pickupTime: dates.pickupTime,
    returnDate: dates.ret,
    returnTime: dates.returnTime,
  });

  const [featured, ...rest] = popular;

  if (popular.length === 0) {
    return (
      <section className="home-section bg-white">
        <div className="section-container">
          <div className="rounded-3xl border border-dashed border-brand-200 bg-brand-50/50 px-6 py-16 text-center">
            <Flame className="mx-auto h-10 w-10 text-brand-400" aria-hidden />
            <h2 className="mt-4 font-display text-2xl font-bold text-surface-900">
              Trending rides coming soon
            </h2>
            <p className="mx-auto mt-2 max-w-md text-slate-600">
              Pick a city and dates to browse live fleet availability across India.
            </p>
            <Link
              href="/search"
              className="mt-8 inline-flex items-center gap-2 rounded-xl bg-brand-500 px-6 py-3 text-sm font-semibold text-white hover:bg-brand-600"
            >
              Start searching
              <ArrowRight className="h-4 w-4" aria-hidden />
            </Link>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="home-section overflow-hidden bg-surface-950 text-white">
      <div className="absolute inset-0 bg-hero-pattern opacity-60" />
      <div className="absolute -right-32 top-0 h-96 w-96 rounded-full bg-brand-500/20 blur-3xl" />

      <div className="section-container relative">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 rounded-full border border-brand-400/30 bg-brand-500/15 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-brand-300">
              <Flame className="h-3.5 w-3.5 text-brand-400" aria-hidden />
              Trending now
            </div>
            <h2 className="home-section-title-light mt-4">Popular bikes & scooters</h2>
            <p className="home-section-subtitle-light mt-3">
              Hand-picked from Goa, Delhi & Bengaluru — live availability for your next trip.
            </p>

            <div className="mt-5 inline-flex flex-wrap items-center gap-2 rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-slate-300">
              <CalendarClock className="h-4 w-4 text-brand-400" aria-hidden />
              <span>
                {formatRentalSchedule(dates.pickup, dates.pickupTime)} →{' '}
                {formatRentalSchedule(dates.ret, dates.returnTime)}
              </span>
            </div>
          </div>

          <div className="flex flex-col gap-4 sm:items-end">
            <div className="flex flex-wrap gap-2">
              {cityCounts.map((city) => (
                <Link
                  key={city.slug}
                  href={`/search?locationId=${city.id}&location=${city.slug}&${query}`}
                  className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-2 text-sm font-medium text-white transition hover:border-brand-400/50 hover:bg-brand-500/20"
                >
                  <MapPin className="h-3.5 w-3.5 text-brand-400" aria-hidden />
                  {city.name}
                  <span className="rounded-full bg-brand-500/30 px-2 py-0.5 text-xs text-brand-100">
                    {city.count}
                  </span>
                </Link>
              ))}
            </div>
            <Link
              href={`/search?${query}`}
              className="inline-flex items-center gap-2 rounded-xl bg-brand-500 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-brand-500/30 transition hover:bg-brand-600"
            >
              View all rides
              <ArrowRight className="h-4 w-4" aria-hidden />
            </Link>
          </div>
        </div>

        <div className="mt-12 rounded-[2rem] border border-white/10 bg-white p-5 shadow-2xl sm:p-8">
          <div className="grid gap-6 lg:grid-cols-12">
            {featured ? (
              <div className="lg:col-span-5">
                <p className="mb-4 inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-brand-600">
                  <Sparkles className="h-4 w-4" aria-hidden />
                  Top pick this week
                </p>
                <TrendingVehicleCard
                  vehicle={featured}
                  href={vehicleDetailPath(featured, query)}
                  rank={1}
                  featured
                />
              </div>
            ) : null}

            <ul
              className={`grid gap-5 sm:grid-cols-2 ${
                featured ? 'lg:col-span-7 lg:grid-cols-2' : 'lg:col-span-12 lg:grid-cols-4'
              }`}
            >
              {(featured ? rest : popular).map((vehicle, index) => (
                <li key={vehicle.id}>
                  <TrendingVehicleCard
                    vehicle={vehicle}
                    href={vehicleDetailPath(vehicle, query)}
                    rank={featured ? index + 2 : index + 1}
                  />
                </li>
              ))}
            </ul>
          </div>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-6 border-t border-surface-100 pt-6 text-sm text-slate-500">
            <span className="inline-flex items-center gap-2">
              <ShieldCheck className="h-4 w-4 text-emerald-600" aria-hidden />
              RC-verified fleet
            </span>
            <span className="inline-flex items-center gap-2">
              <HardHat className="h-4 w-4 text-brand-500" aria-hidden />
              Helmet included
            </span>
            <span className="inline-flex items-center gap-2">
              <Star className="h-4 w-4 fill-brand-400 text-brand-400" aria-hidden />
              Top-rated vendors
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}

export function RideTypeCards() {
  return (
    <section className="home-section bg-surface-950 text-white">
      <div className="absolute inset-0 bg-hero-pattern" />
      <div className="absolute inset-0 bg-road-lines opacity-30" />
      <div className="absolute -left-32 top-20 h-96 w-96 rounded-full bg-brand-500/20 blur-3xl" />
      <div className="absolute -right-32 bottom-0 h-80 w-80 rounded-full bg-brand-600/15 blur-3xl" />

      <div className="section-container relative">
        <div className="mx-auto max-w-3xl text-center">
          <p className="home-section-label text-brand-400">Choose your ride</p>
          <h2 className="home-section-title-light mt-3">Flexible rentals for every journey</h2>
          <p className="home-section-subtitle-light mx-auto">
            Daily commutes, weekend getaways or outstation tours — pick the category that fits.
          </p>
        </div>

        <div className="mt-14 grid gap-8 lg:grid-cols-3">
          {RIDE_TYPES.map((type, index) => (
            <Link
              key={type.slug}
              href={`/search?category=${type.slug}`}
              className="group relative overflow-hidden rounded-3xl border border-white/10 bg-white/5 shadow-2xl backdrop-blur-sm transition-all duration-300 hover:-translate-y-2 hover:border-brand-400/50 hover:shadow-brand-500/20"
            >
              <div className="absolute right-4 top-4 font-display text-6xl font-bold text-white/5">
                0{index + 1}
              </div>
              <div className="bg-gradient-to-br from-brand-500 to-brand-700 px-8 py-10">
                <div className="flex items-center gap-1 text-sm text-orange-100">
                  <Star className="h-4 w-4 fill-current text-brand-200" aria-hidden />
                  {type.rating} · {type.rentals}
                </div>
                <h3 className="mt-4 font-display text-2xl font-bold">{type.name}</h3>
                <p className="mt-2 text-3xl font-bold">
                  From {type.fromPrice}
                  <span className="text-base font-normal text-orange-100"> /day</span>
                </p>
              </div>
              <ul className="space-y-3 p-8 text-sm text-slate-300">
                {type.perks.map((perk) => (
                  <li key={perk} className="flex items-center gap-3">
                    <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-brand-500/30 text-xs text-brand-300">
                      ✓
                    </span>
                    {perk}
                  </li>
                ))}
              </ul>
              <div className="border-t border-white/10 px-8 py-4">
                <span className="inline-flex items-center gap-2 text-sm font-semibold text-brand-400 transition group-hover:gap-3">
                  Browse {type.name.toLowerCase()}
                  <ArrowRight className="h-4 w-4" aria-hidden />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

export function OffersStrip() {
  return (
    <section className="w-full bg-brand-600 py-3.5">
      <div className="section-container">
        <div className="flex flex-wrap items-center justify-center gap-x-10 gap-y-2 text-sm font-semibold text-white">
          {OFFERS.map((offer) => (
            <span key={offer.title} className="inline-flex items-center gap-2">
              <Gift className="h-4 w-4 text-brand-200" aria-hidden />
              {offer.title}
              {'code' in offer && offer.code ? (
                <span className="rounded-md bg-white/15 px-2 py-0.5 font-mono text-xs">{offer.code}</span>
              ) : null}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}

export function OffersGrid() {
  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {OFFERS.map((offer) => (
        <div
          key={offer.title}
          className="rounded-2xl border border-surface-200 bg-white p-6 shadow-card"
        >
          <span className="badge-pill bg-brand-100 text-brand-800">{offer.badge}</span>
          <h3 className="mt-4 font-display text-lg font-bold text-surface-900">{offer.title}</h3>
          <p className="mt-2 text-sm text-slate-600">{offer.detail}</p>
          {'code' in offer && offer.code ? (
            <p className="mt-4 inline-flex items-center gap-2 rounded-lg bg-surface-100 px-3 py-2 font-mono text-sm font-semibold text-surface-900">
              <Tag className="h-4 w-4 text-brand-500" aria-hidden />
              {offer.code}
            </p>
          ) : (
            <p className="mt-4 inline-flex items-center gap-2 text-sm text-brand-600">
              <Wallet className="h-4 w-4" aria-hidden />
              Available at checkout
            </p>
          )}
        </div>
      ))}
    </div>
  );
}

export function TrustGrid() {
  return (
    <section className="home-section bg-surface-900">
      <div className="absolute inset-0 bg-brand-mesh opacity-30" />
      <div className="section-container relative">
        <div className="mx-auto max-w-3xl text-center">
          <p className="home-section-label text-brand-400">Why OnnRide</p>
          <h2 className="home-section-title-light mt-3">Why riders choose us</h2>
          <p className="home-section-subtitle-light mx-auto">
            Verified vendors, transparent pricing, and support at every step of your trip.
          </p>
        </div>

        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {TRUST_FEATURES.map((feature, index) => {
            const Icon = TRUST_ICONS[index] ?? ShieldCheck;
            return (
              <div key={feature.title} className="home-glass-card group">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-brand-500 to-brand-600 text-white shadow-lg shadow-brand-500/30 transition group-hover:scale-110">
                  <Icon className="h-6 w-6" aria-hidden />
                </div>
                <h3 className="mt-5 font-display text-lg font-bold text-white">{feature.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-400">{feature.body}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export function TestimonialsSection() {
  return (
    <section className="home-section border-y border-brand-100 bg-gradient-to-b from-brand-50 via-white to-surface-50">
      <div
        className="absolute inset-0 bg-section-dots bg-dots opacity-50"
        aria-hidden
      />
      <div className="absolute right-0 top-0 h-64 w-64 rounded-full bg-brand-200/30 blur-3xl" />

      <div className="section-container relative">
        <div className="mx-auto max-w-3xl text-center">
          <p className="home-section-label">Rider stories</p>
          <h2 className="home-section-title mt-3">Trusted by travellers across India</h2>
          <p className="home-section-subtitle mx-auto">
            Real trips from riders who booked self-drive bikes on OnnRide.
          </p>
        </div>

        <div className="mt-14 grid gap-8 lg:grid-cols-3">
          {TESTIMONIALS.map((t) => (
            <blockquote
              key={t.name}
              className="relative overflow-hidden rounded-3xl border border-surface-200 bg-white p-8 shadow-card transition hover:-translate-y-1 hover:border-brand-200 hover:shadow-card-hover"
            >
              <div className="absolute -right-2 -top-4 font-display text-7xl font-bold text-brand-100">
                &ldquo;
              </div>
              <div className="flex gap-1 text-brand-500">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className="h-4 w-4 fill-current" aria-hidden />
                ))}
              </div>
              <p className="relative mt-5 text-base leading-relaxed text-slate-600">
                &ldquo;{t.quote}&rdquo;
              </p>
              <footer className="mt-6 border-t border-surface-100 pt-5">
                <p className="font-semibold text-surface-900">{t.name}</p>
                <p className="text-sm text-slate-500">
                  {t.city} · {t.vehicle}
                </p>
              </footer>
            </blockquote>
          ))}
        </div>
      </div>
    </section>
  );
}

export function VendorListCta() {
  return (
    <section className="w-full overflow-hidden bg-surface-950">
      <div className="grid min-h-[420px] lg:grid-cols-2">
        <div className="relative flex flex-col justify-center px-6 py-20 sm:px-12 lg:px-20">
          <div className="absolute inset-0 bg-hero-pattern opacity-60" />
          <div className="relative">
            <p className="home-section-label text-brand-400">For fleet owners</p>
            <h2 className="home-section-title-light mt-3">Grow your business with OnnRide</h2>
            <p className="home-section-subtitle-light mt-4">
              List your fleet on OnnRide — reach riders, manage bookings, and get paid on completed
              trips.
            </p>
            <Link
              href="/list-your-bike"
              className="mt-10 inline-flex items-center gap-2 rounded-xl bg-brand-500 px-8 py-4 text-sm font-bold text-white shadow-lg shadow-brand-500/40 transition hover:bg-brand-600"
            >
              Partner with us
              <ArrowRight className="h-4 w-4" aria-hidden />
            </Link>
          </div>
        </div>

        <div className="relative flex items-center justify-center bg-gradient-to-br from-brand-600 to-brand-800 px-8 py-20">
          <div className="absolute inset-0 bg-brand-mesh opacity-50" />
          <ul className="relative grid gap-4 sm:grid-cols-2">
            {[
              'WhatsApp OTP signup',
              'Fleet dashboard',
              'Earnings & payouts',
              'Booking chat',
            ].map((item) => (
              <li
                key={item}
                className="rounded-2xl border border-white/20 bg-white/10 px-5 py-4 text-center text-sm font-semibold text-white backdrop-blur"
              >
                {item}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
