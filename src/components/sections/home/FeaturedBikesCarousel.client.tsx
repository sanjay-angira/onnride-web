'use client';

import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { CardCarousel } from '@/components/ui/CardCarousel.client';
import { VehicleCard } from '@/components/vehicles/VehicleCard';
import { vehicleDetailPath } from '@/lib/vehicle-path';
import type { Vehicle } from '@/types';

interface FeaturedBikesCarouselProps {
  vehicles: Vehicle[];
  query: string;
}

export function FeaturedBikesCarousel({ vehicles, query }: FeaturedBikesCarouselProps) {
  return (
    <CardCarousel ariaLabel="Featured bikes for rent">
      {vehicles.map((vehicle) => (
        <VehicleCard
          key={vehicle.id}
          vehicle={vehicle}
          href={vehicleDetailPath(vehicle, query)}
        />
      ))}
    </CardCarousel>
  );
}

interface FeaturedBikesHeaderProps {
  query: string;
}

export function FeaturedBikesHeader({ query }: FeaturedBikesHeaderProps) {
  // Keep SSR-visible (no opacity:0 fade) so the section is not blank before hydrate.
  return (
    <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
      <div className="max-w-2xl">
        <p className="home-section-label">Featured</p>
        <h2 id="featured-heading" className="home-section-title mt-3">
          Featured Bikes for Rent
        </h2>
        <p className="home-section-subtitle">
          Hand-picked verified bikes — swipe to browse live availability near you.
        </p>
      </div>
      <Link
        href={`/search?${query}`}
        className="inline-flex touch-target items-center gap-2 text-sm font-semibold text-brand-600 hover:text-brand-700"
      >
        View all bikes
        <ArrowRight className="h-4 w-4" aria-hidden />
      </Link>
    </div>
  );
}
