import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import { getDestinationVisual } from '@/lib/vehicle-ui';
import {
  DEFAULT_PICKUP_TIME,
  DEFAULT_RETURN_TIME,
  rentalQueryString,
} from '@/lib/rental-datetime';
import type { Location } from '@/types';

interface PopularDestinationsProps {
  locations: Location[];
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

export function PopularDestinations({ locations }: PopularDestinationsProps) {
  const featured = ['goa', 'delhi', 'bengaluru', 'manali', 'jaipur']
    .map((slug) => locations.find((l) => l.slug === slug))
    .filter(Boolean) as Location[];

  const display = featured.length > 0 ? featured.slice(0, 5) : locations.slice(0, 5);
  const dates = defaultDates();

  if (display.length === 0) return null;

  return (
    <section className="section-container py-16 sm:py-20">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-sm font-semibold uppercase tracking-wider text-brand-600">
            Top destinations
          </p>
          <h2 className="section-title">Where riders go next</h2>
          <p className="section-subtitle">
            Self-drive scooters and bikes in India&apos;s most loved travel cities.
          </p>
        </div>
        <Link
          href="/search"
          className="inline-flex items-center gap-1 text-sm font-semibold text-brand-600 hover:text-brand-700"
        >
          View all cities
          <ArrowRight className="h-4 w-4" aria-hidden />
        </Link>
      </div>

      <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {display.map((location, index) => {
          const visual = getDestinationVisual(location.slug);
          const searchHref = `/search?locationId=${location.id}&${rentalQueryString({
            pickupDate: dates.pickup,
            pickupTime: dates.pickupTime,
            returnDate: dates.ret,
            returnTime: dates.returnTime,
            location: location.slug,
          })}`;

          return (
            <Link
              key={location.id}
              href={searchHref}
              className={cn(
                'group relative overflow-hidden rounded-2xl',
                index === 0 && 'sm:col-span-2 lg:row-span-1',
              )}
            >
              <div
                className={`relative min-h-[200px] bg-gradient-to-br ${visual.gradient} p-6 transition-transform duration-500 group-hover:scale-[1.02] sm:min-h-[240px]`}
              >
                <div className="absolute inset-0 bg-black/20 transition-colors group-hover:bg-black/10" />
                <div className="relative flex h-full flex-col justify-end">
                  <p className="text-sm font-medium text-white/80">{visual.tagline}</p>
                  <h3 className="font-display text-2xl font-bold text-white sm:text-3xl">
                    {location.name}
                  </h3>
                  {location.state ? (
                    <p className="text-sm text-white/70">{location.state}</p>
                  ) : null}
                  <span className="mt-4 inline-flex w-fit items-center gap-1 rounded-full bg-white/20 px-3 py-1 text-xs font-semibold text-white backdrop-blur">
                    Explore bikes
                    <ArrowRight className="h-3 w-3 transition-transform group-hover:translate-x-0.5" />
                  </span>
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </section>
  );
}
