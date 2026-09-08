'use client';

import { useSearchParams } from 'next/navigation';
import { HomeSearchForm } from '@/features/search/HomeSearchForm.client';
import type { Location } from '@/types';

interface SearchBarSectionProps {
  locations: Location[];
}

export function SearchBarSection({ locations }: SearchBarSectionProps) {
  const searchParams = useSearchParams();
  const locationId = searchParams.get('locationId') ?? undefined;

  return (
    <HomeSearchForm
      locations={locations}
      defaultLocationId={locationId}
      variant="search"
    />
  );
}
