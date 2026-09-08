'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { FadeInView } from '@/components/motion/FadeInView.client';
import { CardCarousel } from '@/components/ui/CardCarousel.client';
import { RemoteImage } from '@/components/ui/RemoteImage';
import { Button } from '@/components/ui/Button';
import { getCategories } from '@/lib/api';
import { buildHomeCategoryCards, type HomeCategoryCard } from '@/lib/home-categories';
import { vehicleClassToParam } from '@/lib/vehicle-class';

function CategoryCarousel({
  categories,
  vehicleClass,
  ariaLabel,
  className,
}: {
  categories: HomeCategoryCard[];
  vehicleClass: 'TWO_WHEELER' | 'FOUR_WHEELER';
  ariaLabel: string;
  className?: string;
}) {
  if (categories.length === 0) return null;

  const classParam = vehicleClassToParam(vehicleClass);

  return (
    <FadeInView className={className}>
      <CardCarousel
        ariaLabel={ariaLabel}
        perView={{ base: 2, sm: 2, md: 3, lg: 4, xl: 4 }}
      >
        {categories.map((category) => (
          <article
            key={category.id}
            className="group flex h-full flex-col overflow-hidden rounded-2xl border border-border/70 bg-white shadow-card transition-shadow hover:shadow-premium"
          >
            <div className="relative aspect-[4/3] bg-slate-50">
              <RemoteImage
                src={category.image}
                alt={category.imageAlt}
                fill
                sizes="(max-width: 640px) 45vw, (max-width: 1024px) 30vw, 22vw"
                className="object-contain p-3 transition duration-500 ease-out group-hover:scale-[1.03] sm:p-4"
              />
            </div>

            <div className="flex flex-1 flex-col items-center px-3 pb-4 pt-3 text-center sm:px-4 sm:pb-5 sm:pt-4">
              <h4 className="text-sm font-bold text-primary sm:text-base">{category.name}</h4>
              <Link
                href={`/search?vehicleClass=${classParam}&category=${category.slug}`}
                className="mt-3 w-full touch-target sm:mt-4"
              >
                <Button variant="dark" size="md" className="w-full rounded-full">
                  Book Now
                </Button>
              </Link>
            </div>
          </article>
        ))}
      </CardCarousel>
    </FadeInView>
  );
}

function CategoriesSkeleton() {
  return (
    <div className="mt-12 grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
      {Array.from({ length: 4 }).map((_, index) => (
        <div
          key={index}
          className="aspect-[4/5] animate-pulse rounded-2xl bg-slate-200"
        />
      ))}
    </div>
  );
}

export function PopularCategoriesSection() {
  const [bikeCategories, setBikeCategories] = useState<HomeCategoryCard[]>([]);
  const [carCategories, setCarCategories] = useState<HomeCategoryCard[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    async function loadCategories() {
      setLoading(true);
      setError(null);

      try {
        const [bikeApi, carApi] = await Promise.all([
          getCategories('TWO_WHEELER', { noCache: true }),
          getCategories('FOUR_WHEELER', { noCache: true }),
        ]);

        if (cancelled) return;

        setBikeCategories(buildHomeCategoryCards(bikeApi, 'TWO_WHEELER'));
        setCarCategories(buildHomeCategoryCards(carApi, 'FOUR_WHEELER'));
      } catch {
        if (!cancelled) {
          setBikeCategories([]);
          setCarCategories([]);
          setError('Could not load categories. Please refresh the page.');
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    void loadCategories();

    return () => {
      cancelled = true;
    };
  }, []);

  if (!loading && bikeCategories.length === 0 && carCategories.length === 0) {
    return null;
  }

  return (
    <section aria-labelledby="categories-heading" className="home-section bg-muted">
      <div className="section-container">
        <FadeInView className="home-section-header">
          <p className="home-section-label">Our Fleet</p>
          <h2 id="categories-heading" className="home-section-title mt-3">
            Explore Bikes & Cars on Rent
          </h2>
        </FadeInView>

        {error ? (
          <p className="mt-8 text-center text-sm text-secondary">{error}</p>
        ) : null}

        {loading ? (
          <CategoriesSkeleton />
        ) : (
          <>
            <CategoryCarousel
              categories={bikeCategories}
              vehicleClass="TWO_WHEELER"
              ariaLabel="Bike rental categories"
              className="relative mt-12 sm:mt-14"
            />

            <CategoryCarousel
              categories={carCategories}
              vehicleClass="FOUR_WHEELER"
              ariaLabel="Car rental categories"
              className="relative mt-10 sm:mt-12"
            />
          </>
        )}
      </div>
    </section>
  );
}
