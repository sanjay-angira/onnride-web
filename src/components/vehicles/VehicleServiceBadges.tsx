import { Home, MapPin, Wrench } from 'lucide-react';
import type { Vehicle } from '@/types';

interface VehicleServiceBadgesProps {
  vehicle: Pick<Vehicle, 'doorstepDelivery' | 'roadsideAssistance'>;
  size?: 'sm' | 'md';
  showUnavailable?: boolean;
}

export function VehicleServiceBadges({
  vehicle,
  size = 'sm',
  showUnavailable = false,
}: VehicleServiceBadgesProps) {
  const pillClass =
    size === 'md'
      ? 'inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-medium'
      : 'inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-xs font-medium';

  const items = [
    {
      key: 'doorstep',
      enabled: vehicle.doorstepDelivery,
      enabledClass: 'bg-emerald-50 text-emerald-700',
      disabledClass: 'bg-slate-100 text-slate-500',
      icon: Home,
      label: 'Doorstep delivery',
      disabledLabel: 'Pickup at vendor',
    },
    {
      key: 'roadside',
      enabled: vehicle.roadsideAssistance,
      enabledClass: 'bg-brand-50 text-brand-700',
      disabledClass: 'bg-slate-100 text-slate-500',
      icon: Wrench,
      label: 'Roadside assistance',
      disabledLabel: 'No roadside assistance',
    },
  ];

  return (
    <div className="flex flex-wrap gap-2">
      {items.map((item) => {
        if (!item.enabled && !showUnavailable) return null;

        const Icon = item.enabled ? item.icon : MapPin;
        const label = item.enabled ? item.label : item.disabledLabel;
        const colorClass = item.enabled ? item.enabledClass : item.disabledClass;

        return (
          <span key={item.key} className={`${pillClass} ${colorClass}`}>
            <Icon className="h-3.5 w-3.5" aria-hidden />
            {label}
          </span>
        );
      })}
    </div>
  );
}
