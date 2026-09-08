import Link from 'next/link';
import { MapPin } from 'lucide-react';
import { POPULAR_CITY_REGIONS } from '@/lib/popular-cities';
import { getLocations } from '@/lib/api';

export async function PopularCitiesSection() {
  const locations = await getLocations();
  const bySlug = new Map(locations.map((location) => [location.slug, location]));

  const regions = POPULAR_CITY_REGIONS.map((region) => ({
    ...region,
    cities: region.slugs
      .map((slug) => bySlug.get(slug))
      .filter((city): city is NonNullable<typeof city> => Boolean(city)),
  })).filter((region) => region.cities.length > 0);

  if (regions.length === 0) return null;

  return (
    <section className="border-t border-surface-200 bg-white py-14">
      <div className="section-container">
        <div className="flex items-center gap-2">
          <MapPin className="h-5 w-5 text-brand-500" aria-hidden />
          <h2 className="font-display text-2xl font-bold text-surface-900">Popular cities</h2>
        </div>
        <p className="mt-2 max-w-2xl text-sm text-slate-600">
          Self-drive bike & scooter rental across India — pick your city and browse verified vendor
          fleets.
        </p>

        <div className="mt-10 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {regions.map((region) => (
            <div key={region.region}>
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500">
                {region.region}
              </h3>
              <ul className="mt-4 space-y-2">
                {region.cities.map((city) => (
                  <li key={city.id}>
                    <Link
                      href={`/bike-rental/${city.slug}`}
                      className="text-sm text-slate-700 hover:text-brand-600"
                    >
                      Bike rental in {city.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
