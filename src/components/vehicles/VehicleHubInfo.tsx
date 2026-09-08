import { MapPin } from 'lucide-react';
import type { Vehicle, VendorHub } from '@/types';

interface VehicleHubInfoProps {
  vehicle: Pick<Vehicle, 'hub' | 'location'>;
  compact?: boolean;
}

export function VehicleHubInfo({ vehicle, compact = false }: VehicleHubInfoProps) {
  const hub = vehicle.hub;
  const city = vehicle.location?.name ?? hub?.location?.name;

  if (!hub && !city) return null;

  if (compact) {
    return (
      <span className="inline-flex items-center gap-1 text-xs text-slate-500">
        <MapPin className="h-3.5 w-3.5 shrink-0" aria-hidden />
        {hub ? hub.name : city}
      </span>
    );
  }

  return (
    <div className="rounded-xl border border-surface-200 bg-surface-50 px-4 py-3">
      <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">Pickup hub</p>
      <p className="mt-1 font-medium text-surface-900">{hub?.name ?? 'Vendor location'}</p>
      {hub?.description ? (
        <p className="mt-1 text-sm text-slate-600">{hub.description}</p>
      ) : null}
      {city ? (
        <p className="mt-2 inline-flex items-center gap-1 text-xs text-slate-500">
          <MapPin className="h-3.5 w-3.5" aria-hidden />
          {city}
          {hub?.address ? ` · ${hub.address}` : ''}
        </p>
      ) : null}
    </div>
  );
}

export function getHubLabel(hub?: VendorHub | null): string | null {
  if (!hub) return null;
  return hub.description ? `${hub.name} — ${hub.description}` : hub.name;
}
