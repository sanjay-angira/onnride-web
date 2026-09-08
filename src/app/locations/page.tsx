import type { Metadata } from 'next';
import Link from 'next/link';
import { MapPin } from 'lucide-react';
import { MarketingPageShell } from '@/components/layout/MarketingPageShell';
import { getLocations } from '@/lib/api';
import { POPULAR_CITY_REGIONS } from '@/lib/popular-cities';
import { pageMetadata } from '@/lib/seo/metadata';

export const metadata: Metadata = pageMetadata({
  title: 'Bike Rental Cities in India',
  description:
    'Browse self-drive bike and scooter rental cities on OnnRide — verified vendors, online booking, helmet included across India.',
  path: '/locations',
});

export const revalidate = 3600;

export default async function LocationsIndexPage() {
  const locations = await getLocations();
  const bySlug = new Map(locations.map((location) => [location.slug, location]));

  const regions = POPULAR_CITY_REGIONS.map((region) => ({
    ...region,
    cities: region.slugs
      .map((slug) => bySlug.get(slug))
      .filter((city): city is NonNullable<typeof city> => Boolean(city)),
  })).filter((region) => region.cities.length > 0);

  const listedSlugs = new Set(regions.flatMap((r) => r.cities.map((c) => c.slug)));
  const otherCities = locations.filter((l) => !listedSlugs.has(l.slug));

  return (
    <MarketingPageShell
      eyebrow="Service cities"
      title="Self-drive bike rental cities"
      subtitle="Pick your city to browse verified vendor fleets, compare live daily rates, and book online on OnnRide."
      breadcrumb={[{ label: 'Locations' }]}
    >
      <div className="space-y-10">
        {regions.map((region) => (
          <section key={region.region}>
            <h2 className="font-display text-xl font-bold text-surface-900">{region.region}</h2>
            <ul className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {region.cities.map((city) => (
                <li key={city.id}>
                  <Link
                    href={`/locations/${city.slug}`}
                    className="flex items-start gap-3 rounded-2xl border border-surface-200 bg-white p-4 shadow-card transition hover:border-brand-300 hover:shadow-md"
                  >
                    <MapPin className="mt-0.5 h-5 w-5 shrink-0 text-brand-500" aria-hidden />
                    <span>
                      <span className="block font-semibold text-surface-900">{city.name}</span>
                      {city.state ? (
                        <span className="mt-0.5 block text-sm text-slate-500">{city.state}</span>
                      ) : null}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        ))}

        {otherCities.length > 0 ? (
          <section>
            <h2 className="font-display text-xl font-bold text-surface-900">More cities</h2>
            <ul className="mt-4 flex flex-wrap gap-2">
              {otherCities.map((city) => (
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
          </section>
        ) : null}
      </div>
    </MarketingPageShell>
  );
}
