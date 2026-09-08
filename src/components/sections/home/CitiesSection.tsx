import { RemoteImage } from '@/components/ui/RemoteImage';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { FadeInView } from '@/components/motion/FadeInView.client';
import { HOME_FEATURED_CITIES } from '@/constants/homepage';
import { bikeRentalCityPath } from '@/lib/bike-rental-paths';
import { getLocations } from '@/lib/api';

export async function CitiesSection() {
  const locations = await getLocations();
  const bySlug = new Map(locations.map((loc) => [loc.slug, loc]));

  const cities = HOME_FEATURED_CITIES.map((city) => {
    const location = bySlug.get(city.slug);
    return location ? { ...city, state: location.state } : null;
  }).filter((city): city is NonNullable<typeof city> => Boolean(city));

  return (
    <section aria-labelledby="cities-heading" className="home-section bg-muted">
      <div className="section-container">
        <FadeInView className="home-section-header">
          <p className="home-section-label">Service areas</p>
          <h2 id="cities-heading" className="home-section-title mt-3">
            Bike Rentals Near You — Top Cities
          </h2>
          <p className="home-section-subtitle mt-4">
            Bike on rent in Pune, Delhi, Mumbai, Jaipur, Manali & more — pick a city for bike
            rental near you.
          </p>
        </FadeInView>

        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {cities.map((city, index) => (
            <FadeInView key={city.slug} delay={index * 0.06}>
              <Link
                href={bikeRentalCityPath(city.slug)}
                className="group relative flex touch-target flex-col overflow-hidden rounded-2xl border border-border bg-white shadow-card transition hover:-translate-y-1 hover:border-brand-200 hover:shadow-card-hover focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-600 focus-visible:ring-offset-2"
              >
                <div className="relative h-36 overflow-hidden sm:h-40">
                  <RemoteImage
                    src={city.image}
                    alt={city.imageAlt}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className="object-cover transition duration-500 group-hover:scale-105"
                  />
                  <div
                    className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/25 to-transparent"
                    aria-hidden
                  />
                  <div className="absolute bottom-0 left-0 right-0 p-4">
                    <h3 className="text-lg font-bold text-white drop-shadow-sm">
                      Bike on Rent in {city.name}
                    </h3>
                    {city.state ? (
                      <p className="text-xs font-medium text-white/80">{city.state}</p>
                    ) : null}
                  </div>
                </div>

                <div className="flex items-center justify-between gap-3 p-4">
                  <p className="text-sm text-secondary">{city.highlight}</p>
                  <ArrowRight
                    className="h-4 w-4 shrink-0 text-muted-foreground transition group-hover:translate-x-0.5 group-hover:text-brand-600"
                    aria-hidden
                  />
                </div>
              </Link>
            </FadeInView>
          ))}
        </div>

        <FadeInView className="mt-10 text-center">
          <Link
            href="/bike-rental"
            className="inline-flex touch-target items-center gap-2 text-sm font-semibold text-brand-600 hover:text-brand-700"
          >
            View all 80+ rental cities
            <ArrowRight className="h-4 w-4" aria-hidden />
          </Link>
        </FadeInView>

        <FadeInView className="mt-12 rounded-2xl border border-border bg-white p-6 sm:p-8">
          <h3 className="text-lg font-bold text-primary">
            Looking for bike rental near me?
          </h3>
          <p className="mt-2 max-w-3xl text-sm leading-relaxed text-secondary">
            OnnRide is your bike rental near me — self-drive bike rentals and bike on rent across
            Pune, Delhi, Mumbai, Jaipur, Manali, Goa & 80+ cities. Whether you need bike rentals
            for daily commute, a Royal Enfield for Manali or Leh, or a scooty near a railway
            station or airport, search by city and book online with instant confirmation.
          </p>
        </FadeInView>
      </div>
    </section>
  );
}
