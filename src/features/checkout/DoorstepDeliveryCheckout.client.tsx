'use client';

import { useState } from 'react';
import { Home, Loader2, MapPin, Navigation } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Checkbox } from '@/components/ui/Checkbox';
import { Input } from '@/components/ui/Input';
import { getBrowserCoordinates } from '@/lib/nearest-location';

export interface DoorstepDeliverySelection {
  enabled: boolean;
  address: string;
  latitude: string | null;
  longitude: string | null;
}

interface DoorstepDeliveryCheckoutProps {
  ratePerKm?: number;
  value: DoorstepDeliverySelection;
  onChange: (value: DoorstepDeliverySelection) => void;
}

export function DoorstepDeliveryCheckout({
  ratePerKm = 30,
  value,
  onChange,
}: DoorstepDeliveryCheckoutProps) {
  const [locating, setLocating] = useState(false);
  const [locateError, setLocateError] = useState('');

  async function useCurrentLocation() {
    setLocating(true);
    setLocateError('');
    try {
      const coords = await getBrowserCoordinates();
      onChange({
        ...value,
        enabled: true,
        latitude: String(coords.latitude),
        longitude: String(coords.longitude),
      });
    } catch (err) {
      setLocateError(err instanceof Error ? err.message : 'Could not get location');
    } finally {
      setLocating(false);
    }
  }

  return (
    <div className="rounded-xl border border-emerald-200 bg-emerald-50/60 p-4">
      <label className="flex cursor-pointer items-start gap-3">
        <Checkbox
          checked={value.enabled}
          onChange={(e) =>
            onChange({
              ...value,
              enabled: e.target.checked,
              ...(e.target.checked
                ? {}
                : { address: '', latitude: null, longitude: null }),
            })
          }
        />
        <span>
          <span className="flex items-center gap-2 text-sm font-semibold text-emerald-900">
            <Home className="h-4 w-4" aria-hidden />
            Doorstep delivery
          </span>
          <span className="mt-1 block text-xs text-emerald-800/80">
            Vehicle delivered to your address · ₹{ratePerKm}/km from vendor hub
          </span>
        </span>
      </label>

      {value.enabled ? (
        <div className="mt-4 space-y-3 border-t border-emerald-200/80 pt-4">
          <Input
            label="Delivery address"
            placeholder="e.g. Daynight Hotel, Mall Road"
            value={value.address}
            onChange={(e) => onChange({ ...value, address: e.target.value })}
          />

          <div className="flex flex-wrap gap-2">
            <Button
              type="button"
              variant="outline"
              size="sm"
              className="gap-1.5 bg-white"
              onClick={() => void useCurrentLocation()}
              disabled={locating}
            >
              {locating ? (
                <Loader2 className="h-4 w-4 animate-spin" aria-hidden />
              ) : (
                <Navigation className="h-4 w-4" aria-hidden />
              )}
              Use current location
            </Button>
          </div>

          {value.latitude && value.longitude ? (
            <p className="inline-flex items-center gap-1 text-xs text-emerald-700">
              <MapPin className="h-3.5 w-3.5" aria-hidden />
              Location pinned — distance calculated from vendor hub
            </p>
          ) : (
            <p className="text-xs text-amber-700">
              Pin your location to calculate delivery fee (required before payment).
            </p>
          )}

          {locateError ? (
            <p className="text-xs text-red-600">{locateError}</p>
          ) : null}
        </div>
      ) : null}
    </div>
  );
}

export function doorstepPayload(selection: DoorstepDeliverySelection) {
  if (!selection.enabled) return {};
  return {
    doorstepDelivery: true,
    deliveryAddress: selection.address.trim(),
    deliveryLatitude: selection.latitude ?? undefined,
    deliveryLongitude: selection.longitude ?? undefined,
  };
}

export function isDoorstepReady(selection: DoorstepDeliverySelection): boolean {
  if (!selection.enabled) return true;
  return (
    selection.address.trim().length > 0 &&
    selection.latitude != null &&
    selection.longitude != null
  );
}
