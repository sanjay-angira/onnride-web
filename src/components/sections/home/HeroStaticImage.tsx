import Image from 'next/image';
import { HOME_HERO } from '@/constants/homepage';
import { cn } from '@/lib/utils';

interface HeroStaticImageProps {
  className?: string;
  imageClassName?: string;
  priority?: boolean;
  sizes?: string;
}

/** Server-rendered LCP image — no client JS, self-hosted /hero.webp */
export function HeroStaticImage({
  className,
  imageClassName,
  priority = false,
  sizes = '100vw',
}: HeroStaticImageProps) {
  return (
    <div className={cn('relative overflow-hidden', className)}>
      <Image
        src={HOME_HERO.image}
        alt={HOME_HERO.imageAlt}
        fill
        priority={priority}
        sizes={sizes}
        quality={75}
        className={cn('object-cover', imageClassName)}
      />
    </div>
  );
}
