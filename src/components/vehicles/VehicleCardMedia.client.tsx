'use client';

import Image from 'next/image';
import { useState } from 'react';
import { isRemoteImageSrc } from '@/lib/image-variants';

interface VehicleCardMediaProps {
  src: string | null;
  alt: string;
  className?: string;
  fallback: React.ReactNode;
  priority?: boolean;
  sizes?: string;
}

export function VehicleCardMedia({
  src,
  alt,
  className,
  fallback,
  priority = false,
  sizes = '(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 400px',
}: VehicleCardMediaProps) {
  const [failed, setFailed] = useState(false);

  if (!src || failed) {
    return <>{fallback}</>;
  }

  return (
    <Image
      src={src}
      alt={alt}
      fill
      className={className}
      sizes={sizes}
      priority={priority}
      unoptimized={isRemoteImageSrc(src)}
      onError={() => setFailed(true)}
    />
  );
}
