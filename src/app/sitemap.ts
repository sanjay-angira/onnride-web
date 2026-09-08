import type { MetadataRoute } from 'next';
import { BLOG_POSTS } from '@/lib/blog-posts';
import { getAllCompareSlugs } from '@/content/compare';
import { getLocationSitemapEntries } from '@/lib/api';
import { bikeRentalCategoryPath, bikeRentalCityPath, bikeRentalNearPath, isCategorySegment } from '@/lib/bike-rental-paths';
import { carRentalCategoryPath, carRentalCityPath, isCarCategorySegment } from '@/lib/car-rental-paths';
import { absoluteUrl } from '@/lib/seo/site-url';

export const revalidate = 3600;
export const dynamic = 'force-dynamic';

const SITEMAP_FETCH_TIMEOUT_MS = 20_000;

async function withSitemapTimeout<T>(promise: Promise<T>, fallback: T): Promise<T> {
  return Promise.race([
    promise,
    new Promise<T>((resolve) => {
      setTimeout(() => resolve(fallback), SITEMAP_FETCH_TIMEOUT_MS);
    }),
  ]);
}

const STATIC_PATHS = [
  '',
  '/search',
  '/faq',
  '/about',
  '/contact',
  '/blog',
  '/how-it-works',
  '/offers',
  '/list-your-bike',
  '/help',
  '/terms',
  '/privacy',
  '/cancellation-policy',
  '/reviews',
  '/rental-policy',
  '/insurance-policy',
  '/bike-rental',
  '/car-rental',
  '/compare',
] as const;

/**
 * Sitemap strategy (GSC crawl budget):
 * - Prioritize hubs: static, city, category, blog, area pages
 * - Do NOT list individual /vehicles/* SKUs — Google was discovering 1.2k+ thin
 *   listing URLs and leaving them in "Discovered – currently not indexed"
 * - Car city URLs only when the city has indexable car categories
 */
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const locationEntries = await withSitemapTimeout(getLocationSitemapEntries(), []);

  const staticEntries: MetadataRoute.Sitemap = STATIC_PATHS.map((path) => ({
    url: absoluteUrl(path),
    changeFrequency: path === '' ? 'daily' : 'weekly',
    priority: path === '' ? 1 : path === '/bike-rental' || path === '/car-rental' ? 0.95 : 0.7,
  }));

  const cityEntries: MetadataRoute.Sitemap = locationEntries
    .filter((entry) => entry.indexable)
    .map((entry) => ({
      url: absoluteUrl(bikeRentalCityPath(entry.slug)),
      lastModified: new Date(entry.updatedAt),
      changeFrequency: 'weekly' as const,
      priority: 0.9,
    }));

  const categoryEntries: MetadataRoute.Sitemap = locationEntries.flatMap((entry) =>
    entry.categories
      .filter((c) => c.indexable)
      .flatMap((c) => {
        const entries: MetadataRoute.Sitemap = [];
        if (isCategorySegment(c.slug)) {
          entries.push({
            url: absoluteUrl(bikeRentalCategoryPath(entry.slug, c.slug)),
            lastModified: new Date(entry.updatedAt),
            changeFrequency: 'weekly' as const,
            priority: 0.85,
          });
        }
        if (isCarCategorySegment(c.slug)) {
          entries.push({
            url: absoluteUrl(carRentalCategoryPath(entry.slug, c.slug)),
            lastModified: new Date(entry.updatedAt),
            changeFrequency: 'weekly' as const,
            priority: 0.85,
          });
        }
        return entries;
      }),
  );

  const carCityEntries: MetadataRoute.Sitemap = locationEntries
    .filter(
      (entry) =>
        entry.indexable &&
        entry.categories.some((c) => isCarCategorySegment(c.slug) && c.indexable),
    )
    .map((entry) => ({
      url: absoluteUrl(carRentalCityPath(entry.slug)),
      lastModified: new Date(entry.updatedAt),
      changeFrequency: 'weekly' as const,
      priority: 0.88,
    }));

  const areaEntries: MetadataRoute.Sitemap = locationEntries.flatMap((entry) =>
    entry.indexable
      ? entry.areas.map((a) => ({
          url: absoluteUrl(bikeRentalNearPath(entry.slug, a.slug)),
          lastModified: new Date(entry.updatedAt),
          changeFrequency: 'monthly' as const,
          priority: 0.75,
        }))
      : [],
  );

  const blogEntries: MetadataRoute.Sitemap = BLOG_POSTS.map((post) => ({
    url: absoluteUrl(`/blog/${post.slug}`),
    lastModified: new Date(post.dateModified ?? post.publishedAt),
    changeFrequency: 'monthly',
    priority: post.isPillar ? 0.8 : post.priority === 'A' ? 0.7 : 0.6,
  }));

  const compareEntries: MetadataRoute.Sitemap = getAllCompareSlugs().map((slug) => ({
    url: absoluteUrl(`/compare/${slug}`),
    changeFrequency: 'monthly' as const,
    priority: 0.75,
  }));

  return [
    ...staticEntries,
    ...cityEntries,
    ...carCityEntries,
    ...categoryEntries,
    ...areaEntries,
    ...blogEntries,
    ...compareEntries,
  ];
}
