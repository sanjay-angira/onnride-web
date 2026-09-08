'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ChevronDown, MapPin } from 'lucide-react';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { getLocations } from '@/lib/api';
import { POPULAR_CITY_REGIONS } from '@/lib/popular-cities';
import { cn } from '@/lib/utils';
import type { Location } from '@/types';

interface LocationsNavMenuProps {
  isDarkHero: boolean;
  variant: 'desktop' | 'mobile';
  onNavigate?: () => void;
}

function groupLocations(locations: Location[]) {
  const bySlug = new Map(locations.map((location) => [location.slug, location]));
  const usedSlugs = new Set<string>();

  const regions = POPULAR_CITY_REGIONS.map((region) => {
    const cities = region.slugs
      .map((slug) => bySlug.get(slug))
      .filter((city): city is Location => {
        if (!city) return false;
        usedSlugs.add(city.slug);
        return true;
      });
    return { region: region.region, cities };
  }).filter((group) => group.cities.length > 0);

  const moreCities = locations
    .filter((city) => !usedSlugs.has(city.slug))
    .sort((a, b) => a.name.localeCompare(b.name));

  return { regions, moreCities };
}

export function LocationsNavMenu({ isDarkHero, variant, onNavigate }: LocationsNavMenuProps) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [locations, setLocations] = useState<Location[]>([]);
  const [loading, setLoading] = useState(true);
  const containerRef = useRef<HTMLDivElement>(null);
  const closeTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const isLocationsActive =
    pathname === '/bike-rental' || pathname.startsWith('/bike-rental/');

  const openMenu = useCallback(() => {
    if (closeTimerRef.current) {
      clearTimeout(closeTimerRef.current);
      closeTimerRef.current = null;
    }
    setOpen(true);
  }, []);

  const scheduleClose = useCallback(() => {
    if (closeTimerRef.current) {
      clearTimeout(closeTimerRef.current);
    }
    closeTimerRef.current = setTimeout(() => {
      setOpen(false);
      closeTimerRef.current = null;
    }, 150);
  }, []);

  const close = useCallback(() => {
    if (closeTimerRef.current) {
      clearTimeout(closeTimerRef.current);
      closeTimerRef.current = null;
    }
    setOpen(false);
  }, []);

  useEffect(() => {
    let cancelled = false;
    void getLocations().then((data) => {
      if (!cancelled) {
        setLocations(data);
        setLoading(false);
      }
    });
    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    return () => {
      if (closeTimerRef.current) {
        clearTimeout(closeTimerRef.current);
      }
    };
  }, []);

  const { regions, moreCities } = useMemo(() => groupLocations(locations), [locations]);

  useEffect(() => {
    if (variant !== 'desktop' || !open) return;

    const onPointerDown = (event: MouseEvent) => {
      if (!containerRef.current?.contains(event.target as Node)) {
        close();
      }
    };

    const onEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') close();
    };

    document.addEventListener('mousedown', onPointerDown);
    document.addEventListener('keydown', onEscape);
    return () => {
      document.removeEventListener('mousedown', onPointerDown);
      document.removeEventListener('keydown', onEscape);
    };
  }, [variant, open, close]);

  const handleCityClick = () => {
    close();
    onNavigate?.();
  };

  const panelContent = (linkOnDark = false) => (
    <>
      {loading ? (
        <p className={cn('px-4 py-3 text-sm', linkOnDark ? 'text-slate-400' : 'text-slate-500')}>
          Loading cities...
        </p>
      ) : locations.length === 0 ? (
        <p className={cn('px-4 py-3 text-sm', linkOnDark ? 'text-slate-400' : 'text-slate-500')}>
          No cities available yet.
        </p>
      ) : (
        <div className="space-y-4 p-4">
          {regions.map((group) => (
            <div key={group.region}>
              <p
                className={cn(
                  'text-[11px] font-bold uppercase tracking-wider',
                  linkOnDark ? 'text-slate-500' : 'text-slate-400',
                )}
              >
                {group.region}
              </p>
              <ul className="mt-2 space-y-1">
                {group.cities.map((city) => (
                  <li key={city.id}>
                    <Link
                      href={`/bike-rental/${city.slug}`}
                      className={cn(
                        'block rounded-lg px-2.5 py-2 text-sm transition-colors',
                        pathname === `/bike-rental/${city.slug}`
                          ? linkOnDark
                            ? 'bg-white/10 font-semibold text-white'
                            : 'bg-brand-50 font-semibold text-brand-700'
                          : linkOnDark
                            ? 'text-slate-200 hover:bg-white/5 hover:text-white'
                            : 'text-slate-700 hover:bg-surface-50 hover:text-brand-600',
                      )}
                      onClick={handleCityClick}
                    >
                      {city.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {moreCities.length > 0 ? (
            <div>
              <p
                className={cn(
                  'text-[11px] font-bold uppercase tracking-wider',
                  linkOnDark ? 'text-slate-500' : 'text-slate-400',
                )}
              >
                More cities
              </p>
              <ul className="mt-2 max-h-40 space-y-1 overflow-y-auto overscroll-contain">
                {moreCities.map((city) => (
                  <li key={city.id}>
                    <Link
                      href={`/bike-rental/${city.slug}`}
                      className={cn(
                        'block rounded-lg px-2.5 py-2 text-sm transition-colors',
                        pathname === `/bike-rental/${city.slug}`
                          ? linkOnDark
                            ? 'bg-white/10 font-semibold text-white'
                            : 'bg-brand-50 font-semibold text-brand-700'
                          : linkOnDark
                            ? 'text-slate-200 hover:bg-white/5 hover:text-white'
                            : 'text-slate-700 hover:bg-surface-50 hover:text-brand-600',
                      )}
                      onClick={handleCityClick}
                    >
                      {city.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ) : null}
        </div>
      )}
    </>
  );

  if (variant === 'mobile') {
    return (
      <li>
        <button
          type="button"
          className={cn(
            'flex w-full items-center justify-between rounded-xl px-3 py-2.5 text-sm font-medium',
            isDarkHero ? 'text-slate-200 hover:bg-white/5' : 'text-slate-700 hover:bg-surface-50',
            isLocationsActive && (isDarkHero ? 'text-white' : 'text-brand-600'),
          )}
          aria-expanded={open}
          onClick={() => setOpen((value) => !value)}
        >
          <span className="inline-flex items-center gap-2">
            <MapPin className="h-4 w-4 text-brand-500" aria-hidden />
            Cities
          </span>
          <ChevronDown
            className={cn('h-4 w-4 transition-transform duration-200', open && 'rotate-180')}
            aria-hidden
          />
        </button>
        {open ? (
          <div
            className={cn(
              'mt-1 max-h-72 overflow-y-auto rounded-xl border px-1 py-1',
              isDarkHero ? 'border-white/10 bg-white/5' : 'border-surface-200 bg-surface-50',
            )}
          >
            {panelContent(isDarkHero)}
          </div>
        ) : null}
      </li>
    );
  }

  return (
    <div
      ref={containerRef}
      className="relative"
      onMouseEnter={openMenu}
      onMouseLeave={scheduleClose}
    >
      <button
        type="button"
        className={cn(
          'inline-flex items-center gap-1 rounded-lg px-1 py-1 text-sm font-medium transition-colors',
          isDarkHero
            ? 'text-slate-300 hover:text-white'
            : 'text-slate-600 hover:text-brand-600',
          (isLocationsActive || open) && (isDarkHero ? 'text-white' : 'text-brand-600'),
        )}
        aria-expanded={open}
        aria-haspopup="true"
        onClick={() => (open ? close() : openMenu())}
        onFocus={openMenu}
      >
        Cities
        <ChevronDown
          className={cn('h-4 w-4 transition-transform duration-200', open && 'rotate-180')}
          aria-hidden
        />
      </button>

      {open ? (
        <div
          className="absolute left-0 top-full z-[250] w-72 pt-2 sm:w-80"
          onMouseEnter={openMenu}
          onMouseLeave={scheduleClose}
        >
          <div
            className="overflow-hidden rounded-2xl border border-surface-200 bg-white shadow-xl shadow-surface-900/10"
            role="menu"
          >
            <div className="border-b border-surface-100 bg-gradient-to-r from-brand-50 to-white px-4 py-3">
              <p className="flex items-center gap-2 text-sm font-semibold text-surface-900">
                <MapPin className="h-4 w-4 text-brand-500" aria-hidden />
                Rent a bike by city
              </p>
              <p className="mt-0.5 text-xs text-slate-500">Pick a city to view local rentals</p>
            </div>
            <div className="max-h-[min(24rem,70vh)] overflow-y-auto overscroll-contain">
              {panelContent()}
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}
