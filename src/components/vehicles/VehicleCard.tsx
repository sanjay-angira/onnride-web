import Link from 'next/link';
import { ArrowRight, MapPin, ShieldCheck } from 'lucide-react';
import { VehicleCardMedia } from '@/components/vehicles/VehicleCardMedia.client';
import {
  VehicleCardTopHostBadge,
  VehicleCardTrustRow,
} from '@/components/vehicles/VehicleCardTrust';
import { VehicleImageFallback } from '@/components/vehicles/VehicleImageFallback';
import { formatCurrency } from '@/lib/utils';
import { resolveVehicleImageUrl } from '@/lib/vehicle-image';
import { formatFuelType, getVehicleTransmission, getVehicleVisual } from '@/lib/vehicle-ui';
import { isFourWheeler } from '@/lib/vehicle-class';
import type { Vehicle } from '@/types';

interface VehicleCardProps {
  vehicle: Vehicle;
  href: string;
}

export function VehicleCard({ vehicle, href }: VehicleCardProps) {
  const isCar = isFourWheeler(vehicle.vehicleClass);
  const visual = getVehicleVisual(vehicle.category?.slug);
  const modelName = vehicle.model ?? (isCar ? 'Car' : 'Bike');
  const brandName = vehicle.brand?.name ?? '';
  const title = [brandName, modelName].filter(Boolean).join(' ');
  const imageUrl = resolveVehicleImageUrl(vehicle);
  const transmission = getVehicleTransmission(vehicle);
  const hubName = vehicle.hub?.name;
  const categoryLabel = vehicle.category?.name ?? visual.label;

  const metaBits = [
    categoryLabel,
    transmission,
    isCar && vehicle.seats ? `${vehicle.seats} seats` : null,
    isCar && vehicle.fuelType ? formatFuelType(vehicle.fuelType) : null,
  ].filter(Boolean) as string[];

  return (
    <Link
      href={href}
      className="group block h-full focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 focus-visible:ring-offset-2"
    >
      <article className="vehicle-card flex h-full flex-col overflow-hidden">
        {/* White stage so catalog photos with white BG blend (no grey/green frame) */}
        <div className="relative aspect-[5/3] overflow-hidden bg-white">
          <VehicleCardMedia
            src={imageUrl}
            alt={title}
            className="object-contain p-6 transition duration-300 group-hover:scale-[1.02] sm:p-7"
            fallback={<VehicleImageFallback size="card" />}
          />

          {vehicle.isTopHost ? (
            <div className="absolute right-3 top-3 z-10">
              <VehicleCardTopHostBadge />
            </div>
          ) : null}

          <div className="pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/50 via-black/15 to-transparent px-4 pb-3 pt-12">
            <p className="text-[11px] font-medium uppercase tracking-[0.14em] text-white/90">
              {metaBits.join(' · ')}
            </p>
            <p className="mt-1 text-[10px] leading-snug text-white/70">
              Image for representation purposes only
            </p>
          </div>
        </div>

        <div className="flex flex-1 flex-col px-4 pb-4 pt-4 sm:px-5 sm:pb-5 sm:pt-5">
          <div className="min-w-0">
            <h3 className="font-display text-lg font-bold leading-snug text-surface-900 transition group-hover:text-brand-600 sm:text-xl">
              {modelName}
            </h3>
            {brandName ? (
              <p className="mt-0.5 text-sm text-slate-500">{brandName}</p>
            ) : null}
          </div>

          <VehicleCardTrustRow vehicle={vehicle} />

          <div className="mt-3 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-slate-500">
            <span className="inline-flex items-center gap-1 font-medium text-slate-600">
              <ShieldCheck className="h-3.5 w-3.5 text-slate-400" aria-hidden />
              Verified
            </span>
            {vehicle.location?.name ? (
              <>
                <span className="text-slate-300" aria-hidden>
                  ·
                </span>
                <span className="inline-flex items-center gap-1">
                  <MapPin className="h-3.5 w-3.5 text-slate-400" aria-hidden />
                  {vehicle.location.name}
                  {hubName ? (
                    <span className="truncate text-slate-400">· {hubName}</span>
                  ) : null}
                </span>
              </>
            ) : hubName ? (
              <>
                <span className="text-slate-300" aria-hidden>
                  ·
                </span>
                <span className="inline-flex min-w-0 items-center gap-1 truncate">
                  <MapPin className="h-3.5 w-3.5 shrink-0 text-slate-400" aria-hidden />
                  <span className="truncate">{hubName}</span>
                </span>
              </>
            ) : null}
          </div>

          <div className="mt-auto border-t border-surface-100 pt-4">
            <div className="flex items-end justify-between gap-3">
              <div className="min-w-0">
                <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-slate-400">
                  From
                </p>
                <p className="mt-0.5 font-display text-2xl font-bold leading-none text-surface-900">
                  {formatCurrency(vehicle.pricePerDay)}
                  <span className="ml-1 text-sm font-normal text-slate-500">/day</span>
                </p>
                <p className="mt-1.5 text-xs text-slate-500">
                  Deposit {formatCurrency(vehicle.securityDeposit)}
                </p>
              </div>

              <span className="inline-flex shrink-0 items-center gap-1.5 rounded-xl bg-surface-900 px-4 py-2.5 text-sm font-semibold text-white transition group-hover:bg-brand-600">
                Book
                <ArrowRight
                  className="h-4 w-4 transition group-hover:translate-x-0.5"
                  aria-hidden
                />
              </span>
            </div>
          </div>
        </div>
      </article>
    </Link>
  );
}
