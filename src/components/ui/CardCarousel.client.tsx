'use client';

import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { cn } from '@/lib/utils';

type PerViewConfig = {
  base?: number;
  sm?: number;
  md?: number;
  lg?: number;
  xl?: number;
};

interface CardCarouselProps {
  children: React.ReactNode[];
  ariaLabel: string;
  className?: string;
  /** When set, controls how many cards are visible and paginates by page. */
  perView?: PerViewConfig;
}

const DEFAULT_PER_VIEW: Required<PerViewConfig> = {
  base: 1,
  sm: 2,
  md: 2,
  lg: 3,
  xl: 4,
};

const LEGACY_SLIDE_CLASS =
  'w-[calc(100%-2.75rem)] shrink-0 snap-start sm:w-[calc(50%-0.75rem)] lg:w-[calc(38%-0.5rem)] xl:w-[calc(32%-0.5rem)]';

function resolvePerView(config?: PerViewConfig): Required<PerViewConfig> {
  return { ...DEFAULT_PER_VIEW, ...config };
}

function currentPerView(config: Required<PerViewConfig>): number {
  if (typeof window === 'undefined') return config.lg;

  if (config.xl && window.matchMedia('(min-width: 1280px)').matches) return config.xl;
  if (window.matchMedia('(min-width: 1024px)').matches) return config.lg;
  if (window.matchMedia('(min-width: 768px)').matches) return config.md;
  if (window.matchMedia('(min-width: 640px)').matches) return config.sm;
  return config.base;
}

export function CardCarousel({ children, ariaLabel, className, perView }: CardCarouselProps) {
  const trackRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [visibleCount, setVisibleCount] = useState(() =>
    perView ? resolvePerView(perView).lg : 1,
  );

  const perViewConfig = useMemo(() => (perView ? resolvePerView(perView) : null), [perView]);
  const pageCount = perViewConfig
    ? Math.max(1, Math.ceil(children.length / visibleCount))
    : children.length;

  const activePage = perViewConfig
    ? Math.min(pageCount - 1, Math.floor(activeIndex / visibleCount))
    : activeIndex;

  const updateActiveIndex = useCallback(() => {
    const track = trackRef.current;
    if (!track) return;

    const slides = track.querySelectorAll<HTMLElement>('[data-carousel-slide]');
    if (!slides.length) return;

    const trackCenter = track.scrollLeft + track.clientWidth / 2;
    let closest = 0;
    let minDistance = Infinity;

    slides.forEach((slide, index) => {
      const slideCenter = slide.offsetLeft + slide.offsetWidth / 2;
      const distance = Math.abs(trackCenter - slideCenter);
      if (distance < minDistance) {
        minDistance = distance;
        closest = index;
      }
    });

    setActiveIndex(closest);
  }, []);

  useEffect(() => {
    if (!perViewConfig) return;

    const config = perViewConfig;

    function updateVisibleCount() {
      setVisibleCount(currentPerView(config));
    }

    updateVisibleCount();
    window.addEventListener('resize', updateVisibleCount);
    return () => window.removeEventListener('resize', updateVisibleCount);
  }, [perViewConfig]);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    updateActiveIndex();
    track.addEventListener('scroll', updateActiveIndex, { passive: true });
    window.addEventListener('resize', updateActiveIndex);

    return () => {
      track.removeEventListener('scroll', updateActiveIndex);
      window.removeEventListener('resize', updateActiveIndex);
    };
  }, [updateActiveIndex, children.length, visibleCount]);

  function goToSlide(index: number) {
    const track = trackRef.current;
    if (!track) return;

    const slides = track.querySelectorAll<HTMLElement>('[data-carousel-slide]');
    const targetIndex = perViewConfig
      ? Math.min(index * visibleCount, slides.length - 1)
      : index;
    const slide = slides[targetIndex];
    if (!slide) return;

    track.scrollTo({
      left: slide.offsetLeft,
      behavior: 'smooth',
    });
  }

  if (children.length === 0) return null;

  const gapPx = 16;

  return (
    <div className={cn('relative', className)}>
      <div
        ref={trackRef}
        className="scrollbar-hide flex snap-x snap-mandatory gap-4 overflow-x-auto overscroll-x-contain [-webkit-overflow-scrolling:touch]"
        aria-label={ariaLabel}
        role="region"
      >
        {children.map((child, index) => (
          <div
            key={index}
            data-carousel-slide
            className={cn('shrink-0 snap-start', !perViewConfig && LEGACY_SLIDE_CLASS)}
            style={
              perViewConfig
                ? {
                    width: `calc((100% - ${(visibleCount - 1) * gapPx}px) / ${visibleCount})`,
                  }
                : undefined
            }
          >
            {child}
          </div>
        ))}
      </div>

      {pageCount > 1 ? (
        <div
          className="mt-5 flex items-center justify-center gap-2"
          role="tablist"
          aria-label="Carousel pagination"
        >
          {Array.from({ length: pageCount }).map((_, index) => (
            <button
              key={index}
              type="button"
              role="tab"
              aria-label={`Go to page ${index + 1}`}
              aria-selected={activePage === index}
              onClick={() => goToSlide(index)}
              className={cn(
                'h-2 rounded-full transition-all duration-300',
                activePage === index ? 'w-6 bg-brand-500' : 'w-2 bg-border hover:bg-brand-300',
              )}
            />
          ))}
        </div>
      ) : null}
    </div>
  );
}
