import Link from 'next/link';
import { ArrowRight, Bike, MapPin, ShieldCheck, TrendingUp } from 'lucide-react';
import { formatCurrency } from '@/lib/utils';
import { getVehicleVisual } from '@/lib/vehicle-ui';
import { VehicleServiceBadges } from '@/components/vehicles/VehicleServiceBadges';
import type { Vehicle } from '@/types';

interface TrendingVehicleCardProps {
  vehicle: Vehicle;
  href: string;
  rank?: number;
  featured?: boolean;
}

export function TrendingVehicleCard({
  vehicle,
  href,
  rank,
  featured = false,
}: TrendingVehicleCardProps) {
  const visual = getVehicleVisual(vehicle.category?.slug);
  const title = [vehicle.brand?.name, vehicle.model].filter(Boolean).join(' ');

  return (
    <Link href={href} className="group block h-full">
      <article
        className={`vehicle-card flex h-full flex-col ${
          featured ? 'ring-2 ring-brand-400/60 ring-offset-2 ring-offset-white' : ''
        }`}
      >
        <div
          className={`relative bg-gradient-to-br ${visual.gradient} ${
            featured ? 'min-h-[220px] p-6 sm:min-h-[260px]' : 'aspect-[16/10] p-5'
          }`}
        >
          <div className="absolute inset-0 bg-road-lines opacity-30" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />

          <div className="relative flex h-full flex-col justify-between">
            <div className="flex flex-wrap items-start justify-between gap-2">
              <span className={`badge-pill ${visual.accent}`}>
                {vehicle.category?.name ?? visual.label}
              </span>
              {rank ? (
                <span className="inline-flex items-center gap-1 rounded-full bg-white/95 px-2.5 py-1 text-xs font-bold text-brand-700 shadow-sm">
                  <TrendingUp className="h-3.5 w-3.5" aria-hidden />
                  #{rank} trending
                </span>
              ) : null}
            </div>

            <Bike
              className={`absolute text-white/20 transition-transform duration-300 group-hover:scale-110 ${
                featured
                  ? 'bottom-6 right-6 h-24 w-24 sm:h-28 sm:w-28'
                  : 'bottom-4 right-4 h-16 w-16'
              }`}
              strokeWidth={1}
              aria-hidden
            />

            <div className="relative max-w-[85%]">
              <h3
                className={`font-display font-bold text-white ${
                  featured ? 'text-xl sm:text-2xl' : 'text-lg'
                }`}
              >
                {title}
              </h3>
              {vehicle.location?.name ? (
                <p className="mt-1 inline-flex items-center gap-1 text-sm text-white/85">
                  <MapPin className="h-3.5 w-3.5" aria-hidden />
                  {vehicle.location.name}
                </p>
              ) : null}
            </div>
          </div>
        </div>

        <div className={`flex flex-1 flex-col ${featured ? 'p-5 sm:p-6' : 'p-4 sm:p-5'}`}>
          <div className="flex flex-wrap gap-2 text-xs">
            <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 px-2.5 py-1 font-medium text-emerald-700">
              <ShieldCheck className="h-3.5 w-3.5" aria-hidden />
              Verified
            </span>
            <span className="rounded-full bg-brand-50 px-2.5 py-1 font-medium text-brand-700">
              Helmet included
            </span>
          </div>

          <div className="mt-3">
            <VehicleServiceBadges vehicle={vehicle} />
          </div>

          <div className="mt-auto flex items-end justify-between gap-3 border-t border-surface-100 pt-4">
            <div>
              <p className="text-xs font-medium uppercase tracking-wide text-slate-400">From</p>
              <p className="font-display text-2xl font-bold text-surface-900">
                {formatCurrency(vehicle.pricePerDay)}
                <span className="text-sm font-normal text-slate-500"> /day</span>
              </p>
              <p className="text-xs text-slate-500">
                Deposit {formatCurrency(vehicle.securityDeposit)}
              </p>
            </div>
            <span className="inline-flex items-center gap-1 rounded-xl bg-brand-500 px-4 py-2.5 text-sm font-semibold text-white shadow-md shadow-brand-500/25 transition group-hover:bg-brand-600">
              Book
              <ArrowRight className="h-4 w-4 transition group-hover:translate-x-0.5" aria-hidden />
            </span>
          </div>
        </div>
      </article>
    </Link>
  );
}
