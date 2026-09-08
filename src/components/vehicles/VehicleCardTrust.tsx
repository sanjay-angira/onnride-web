import { Award, Home, Star, Wrench } from 'lucide-react';
import type { Vehicle } from '@/types';

interface VehicleCardTrustProps {
  vehicle: Pick<
    Vehicle,
    | 'avgRating'
    | 'reviewCount'
    | 'tripCount'
    | 'isTopHost'
    | 'doorstepDelivery'
    | 'roadsideAssistance'
  >;
}

function formatReviewCount(count: number): string {
  if (count >= 1000) return `${(count / 1000).toFixed(1).replace(/\.0$/, '')}k`;
  return String(count);
}

export function VehicleCardTopHostBadge() {
  return (
    <span className="inline-flex items-center gap-1 rounded-full bg-surface-900/90 px-2.5 py-1 text-[11px] font-semibold tracking-wide text-white shadow-sm backdrop-blur-sm">
      <Award className="h-3.5 w-3.5 text-amber-300" aria-hidden />
      Top host
    </span>
  );
}

export function VehicleCardTrustRow({ vehicle }: VehicleCardTrustProps) {
  const hasRating = vehicle.avgRating != null && vehicle.avgRating > 0;
  const reviewCount = vehicle.reviewCount ?? 0;
  const tripCount = vehicle.tripCount ?? 0;
  const showServices = vehicle.doorstepDelivery || vehicle.roadsideAssistance;

  return (
    <div className="mt-3 space-y-2">
      <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-sm text-slate-600">
        {hasRating ? (
          <span className="inline-flex items-center gap-1 font-semibold text-surface-900">
            <Star className="h-3.5 w-3.5 fill-amber-400 text-amber-400" aria-hidden />
            {vehicle.avgRating!.toFixed(1)}
            {reviewCount > 0 ? (
              <span className="font-normal text-slate-500">
                ({formatReviewCount(reviewCount)})
              </span>
            ) : null}
          </span>
        ) : (
          <span className="text-xs font-medium text-slate-500">New listing</span>
        )}

        {tripCount > 0 ? (
          <>
            <span className="text-slate-300" aria-hidden>
              ·
            </span>
            <span>
              {formatReviewCount(tripCount)} trip{tripCount !== 1 ? 's' : ''}
            </span>
          </>
        ) : !hasRating ? (
          <>
            <span className="text-slate-300" aria-hidden>
              ·
            </span>
            <span className="text-xs text-slate-400">No trips yet</span>
          </>
        ) : null}
      </div>

      {showServices ? (
        <div className="flex flex-wrap gap-x-3 gap-y-1 text-xs text-slate-500">
          {vehicle.doorstepDelivery ? (
            <span className="inline-flex items-center gap-1">
              <Home className="h-3 w-3 text-slate-400" aria-hidden />
              Doorstep
            </span>
          ) : null}
          {vehicle.roadsideAssistance ? (
            <span className="inline-flex items-center gap-1">
              <Wrench className="h-3 w-3 text-slate-400" aria-hidden />
              Roadside assist
            </span>
          ) : null}
        </div>
      ) : null}
    </div>
  );
}
