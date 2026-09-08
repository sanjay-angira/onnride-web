'use client';

import { MapPin } from 'lucide-react';
import { useEffect, useState } from 'react';
import { Radio } from '@/components/ui/Radio';
import { getPickupPoints } from '@/lib/api';
import type { PickupPoint } from '@/types';

interface PickupPointSelectorProps {
  locationSlug: string;
  value: string;
  onChange: (pickupPointId: string) => void;
}

export function PickupPointSelector({ locationSlug, value, onChange }: PickupPointSelectorProps) {
  const [points, setPoints] = useState<PickupPoint[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let active = true;
    setLoading(true);
    void getPickupPoints(locationSlug).then((rows) => {
      if (!active) return;
      setPoints(rows);
      setLoading(false);
    });
    return () => {
      active = false;
    };
  }, [locationSlug]);

  if (loading) {
    return <p className="text-sm text-slate-500">Loading pickup points…</p>;
  }

  if (points.length === 0) {
    return (
      <p className="rounded-xl border border-surface-200 bg-surface-50 px-4 py-3 text-sm text-slate-600">
        Vendor hub pickup in {locationSlug.replace(/-/g, ' ')} — specific station/airport points
        coming soon for this city.
      </p>
    );
  }

  return (
    <div className="space-y-3">
      <p className="text-sm font-semibold text-surface-900">Pickup location</p>
      <div className="space-y-2">
        {points.map((point) => (
          <label
            key={point.id}
            className={`flex cursor-pointer items-start gap-3 rounded-xl border p-3 transition ${
              value === point.id
                ? 'border-brand-400 bg-brand-50/50'
                : 'border-surface-200 bg-white hover:border-brand-200'
            }`}
          >
            <Radio
              name="pickupPoint"
              checked={value === point.id}
              onChange={() => onChange(point.id)}
            />
            <span>
              <span className="flex items-center gap-1.5 text-sm font-medium text-surface-900">
                <MapPin className="h-4 w-4 text-brand-500" aria-hidden />
                {point.name}
              </span>
              {point.address ? (
                <span className="mt-0.5 block text-xs text-slate-500">{point.address}</span>
              ) : null}
            </span>
          </label>
        ))}
      </div>
    </div>
  );
}
