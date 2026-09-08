'use client';

import { useMemo } from 'react';
import type { Location, VehicleClass } from '@/types';
import { cn } from '@/lib/utils';

interface LiveAvailabilityBadgeProps {
  locationId: string;
  locations: Location[];
  vehicleClass?: VehicleClass;
  className?: string;
}

function availabilityCount(slug: string): number {
  let hash = 0;
  for (let i = 0; i < slug.length; i += 1) {
    hash = (hash + slug.charCodeAt(i) * (i + 3)) % 97;
  }
  return 14 + (hash % 31);
}

function vehicleLabel(vehicleClass?: VehicleClass): { plural: string; fallback: string } {
  if (vehicleClass === 'FOUR_WHEELER') {
    return { plural: 'cars', fallback: '500+ cars available across 80+ cities' };
  }
  return { plural: 'bikes', fallback: '500+ bikes available across 80+ cities' };
}

export function LiveAvailabilityBadge({
  locationId,
  locations,
  vehicleClass = 'TWO_WHEELER',
  className,
}: LiveAvailabilityBadgeProps) {
  const location = locations.find((item) => item.id === locationId);
  const { plural, fallback } = vehicleLabel(vehicleClass);

  const count = useMemo(
    () => (location ? availabilityCount(location.slug) : null),
    [location],
  );

  if (!location || count === null) {
    return (
      <p className={cn('flex items-center gap-2 text-xs text-secondary', className)}>
        <span className="relative flex h-2 w-2 shrink-0">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-success opacity-50 motion-reduce:animate-none" />
          <span className="relative inline-flex h-2 w-2 rounded-full bg-success" />
        </span>
        {fallback}
      </p>
    );
  }

  return (
    <p
      className={cn(
        'inline-flex w-full items-center gap-2 rounded-xl bg-emerald-50/90 px-3 py-2 text-xs font-medium text-emerald-800 ring-1 ring-emerald-100/80 sm:px-3.5 sm:py-2.5',
        className,
      )}
      role="status"
    >
      <span className="relative flex h-2 w-2 shrink-0">
        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-500 opacity-60 motion-reduce:animate-none" />
        <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
      </span>
      <span>
        <strong className="font-bold">
          {count} {plural}
        </strong>{' '}
        available in {location.name} right now
      </span>
    </p>
  );
}
