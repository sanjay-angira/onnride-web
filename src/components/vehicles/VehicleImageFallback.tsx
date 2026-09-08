import { Bike } from 'lucide-react';

interface VehicleImageFallbackProps {
  size?: 'card' | 'detail';
}

export function VehicleImageFallback({ size = 'card' }: VehicleImageFallbackProps) {
  const isDetail = size === 'detail';

  return (
    <>
      <div className="absolute inset-0 bg-road-lines opacity-25" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/15 via-transparent to-transparent" />
      <Bike
        className={`absolute text-white/30 transition-transform duration-300 group-hover:scale-110 ${
          isDetail
            ? 'bottom-8 right-8 h-28 w-28 sm:h-32 sm:w-32'
            : 'bottom-5 right-5 h-20 w-20'
        }`}
        strokeWidth={1}
        aria-hidden
      />
    </>
  );
}
