import Link from 'next/link';
import { unstable_noStore as noStore } from 'next/cache';
import { ArrowRight } from 'lucide-react';
import {
  FeaturedBikesCarousel,
  FeaturedBikesHeader,
} from '@/components/sections/home/FeaturedBikesCarousel.client';
import {
  DEFAULT_PICKUP_TIME,
  DEFAULT_RETURN_TIME,
  addDaysISO,
  rentalQueryString,
  todayISO,
} from '@/lib/rental-datetime';
import { getLocations, searchVehicles } from '@/lib/api';

/** Prefer fleet-heavy cities first; fall back down the list if inventory is thin. */
const FEATURED_CITY_SLUGS = [
  'delhi',
  'chandigarh',
  'manali',
  'goa',
  'bengaluru',
  'mumbai',
  'jaipur',
] as const;

function defaultDates() {
  const pickup = addDaysISO(todayISO(), 1);
  const ret = addDaysISO(todayISO(), 3);
  return {
    pickup,
    ret,
    pickupTime: DEFAULT_PICKUP_TIME,
    returnTime: DEFAULT_RETURN_TIME,
  };
}

export async function FeaturedBikesSection() {
  // Avoid baking an empty "coming soon" state into the homepage ISR cache
  // when the API is briefly unreachable (cold start / network blip).
  noStore();

  const locations = await getLocations();
  const dates = defaultDates();

  const results = await Promise.all(
    FEATURED_CITY_SLUGS.map(async (slug) => {
      const loc = locations.find((l) => l.slug === slug);
      if (!loc) return [];
      return searchVehicles(
        {
          locationId: loc.id,
          pickupDate: dates.pickup,
          pickupTime: dates.pickupTime,
          returnDate: dates.ret,
          returnTime: dates.returnTime,
          vehicleClass: 'TWO_WHEELER',
        },
        { noCache: true },
      );
    }),
  );

  const seen = new Set<string>();
  const featured = results
    .flatMap((vehicles) => vehicles.slice(0, 2))
    .filter((vehicle) => {
      if (seen.has(vehicle.id)) return false;
      seen.add(vehicle.id);
      return true;
    })
    .slice(0, 8);

  const query = rentalQueryString({
    pickupDate: dates.pickup,
    pickupTime: dates.pickupTime,
    returnDate: dates.ret,
    returnTime: dates.returnTime,
  });

  return (
    <section aria-labelledby="featured-heading" className="home-section bg-white">
      <div className="section-container">
        <FeaturedBikesHeader query={query} />

        {featured.length === 0 ? (
          <div className="mt-12 rounded-2xl border border-dashed border-border bg-muted px-6 py-16 text-center">
            <h3 className="text-xl font-bold text-primary">Bikes coming soon</h3>
            <p className="mx-auto mt-2 max-w-md text-secondary">
              Pick a city and dates to browse live fleet availability across India.
            </p>
            <Link
              href="/search"
              className="mt-6 inline-flex touch-target items-center gap-2 rounded-xl bg-brand-600 px-6 py-3 text-sm font-semibold text-white hover:bg-brand-700"
            >
              Start searching
              <ArrowRight className="h-4 w-4" aria-hidden />
            </Link>
          </div>
        ) : (
          <div className="mt-10 sm:mt-12">
            <FeaturedBikesCarousel vehicles={featured} query={query} />
          </div>
        )}
      </div>
    </section>
  );
}
