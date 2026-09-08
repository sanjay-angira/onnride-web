import Link from 'next/link';
import { MapPin } from 'lucide-react';
import { bikeRentalCityPath } from '@/lib/bike-rental-paths';

interface BlogCityCtaProps {
  citySlugs: string[];
  variant?: 'inline' | 'card';
}

function cityLabel(slug: string): string {
  return slug
    .split('-')
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(' ');
}

export function BlogCityCta({ citySlugs, variant = 'card' }: BlogCityCtaProps) {
  if (citySlugs.length === 0) return null;

  if (variant === 'inline') {
    return (
      <span className="inline-flex flex-wrap gap-1">
        {citySlugs.map((slug, i) => (
          <span key={slug}>
            {i > 0 ? (i === citySlugs.length - 1 ? ' and ' : ', ') : null}
            <Link href={bikeRentalCityPath(slug)} className="font-semibold text-brand-600 hover:text-brand-700">
              {cityLabel(slug)}
            </Link>
          </span>
        ))}
      </span>
    );
  }

  return (
    <div className="rounded-2xl border border-brand-200 bg-gradient-to-br from-brand-50 to-white p-5">
      <p className="text-xs font-bold uppercase tracking-wide text-brand-700">Book your ride</p>
      <ul className="mt-3 space-y-2">
        {citySlugs.map((slug) => (
          <li key={slug}>
            <Link
              href={bikeRentalCityPath(slug)}
              className="inline-flex items-center gap-2 text-sm font-semibold text-brand-700 hover:text-brand-800"
            >
              <MapPin className="h-4 w-4" aria-hidden />
              Bike rental in {cityLabel(slug)}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
