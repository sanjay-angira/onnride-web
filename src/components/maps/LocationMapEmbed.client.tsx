'use client';

import { MapPin } from 'lucide-react';
import { googleMapsEmbedUrl, parseCoordinates, type MapCoordinates } from '@/lib/location-map';
import { cn } from '@/lib/utils';

interface LocationMapEmbedProps {
  latitude: MapCoordinates['latitude'];
  longitude: MapCoordinates['longitude'];
  title?: string;
  className?: string;
  heightClassName?: string;
  showPin?: boolean;
  framed?: boolean;
}

export function LocationMapEmbed({
  latitude,
  longitude,
  title = 'Location map',
  className,
  heightClassName = 'h-52 sm:h-64',
  showPin = true,
  framed = true,
}: LocationMapEmbedProps) {
  const coords = parseCoordinates(latitude, longitude);
  const embedUrl = coords ? googleMapsEmbedUrl(coords.lat, coords.lng) : null;

  return (
    <div className={cn('relative', className)}>
      {framed ? (
        <div
          className="pointer-events-none absolute -inset-1 rounded-[1.35rem] bg-gradient-to-br from-brand-400/15 via-transparent to-slate-400/10 blur-md"
          aria-hidden
        />
      ) : null}

      <div
        className={cn(
          'relative overflow-hidden rounded-2xl border border-surface-200/90 bg-surface-100',
          framed && 'shadow-[0_12px_40px_-12px_rgba(0,0,0,0.18)] ring-1 ring-black/[0.05]',
        )}
      >
        {embedUrl ? (
          <>
            <iframe
              title={title}
              src={embedUrl}
              className={cn('w-full border-0', heightClassName)}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              allowFullScreen
            />
            {showPin ? (
              <div
                className="pointer-events-none absolute inset-0 flex items-center justify-center"
                aria-hidden
              >
                <div className="relative -mt-8">
                  <span className="absolute left-1/2 top-full h-3 w-3 -translate-x-1/2 rounded-full bg-brand-500/30 blur-sm" />
                  <span className="relative flex h-11 w-11 items-center justify-center rounded-full bg-brand-500 text-white shadow-[0_8px_24px_-4px_rgba(249,115,22,0.55)] ring-4 ring-white/90">
                    <MapPin className="h-5 w-5" strokeWidth={2.5} />
                  </span>
                </div>
              </div>
            ) : null}
            <div
              className="pointer-events-none absolute inset-x-0 bottom-0 h-12 bg-gradient-to-t from-black/15 to-transparent"
              aria-hidden
            />
          </>
        ) : (
          <div
            className={cn(
              'flex flex-col items-center justify-center gap-2 px-4 text-center text-sm text-slate-500',
              heightClassName,
            )}
          >
            <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-surface-200/80 shadow-inner">
              <MapPin className="h-6 w-6 text-slate-400" aria-hidden />
            </span>
            <p>Map preview unavailable for this location</p>
          </div>
        )}
      </div>
    </div>
  );
}
