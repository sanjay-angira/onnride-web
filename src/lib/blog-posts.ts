/** Public blog API — content lives in src/content/blog/ */
export type {
  BlogPost,
  BlogCluster,
  BlogPriority,
  BlogFaq,
  BlogContentBlock,
} from '@/content/blog/types';
export { BLOG_CATEGORIES } from '@/content/blog/types';
export { ALL_BLOG_POSTS as BLOG_POSTS } from '@/content/blog/index';

import { ALL_BLOG_POSTS } from '@/content/blog/index';
import type { BlogCluster, BlogPost } from '@/content/blog/types';

const PRIORITY_ORDER: Record<string, number> = { A: 0, B: 1, C: 2, D: 3 };

export function getBlogPost(slug: string): BlogPost | undefined {
  return ALL_BLOG_POSTS.find((post) => post.slug === slug);
}

export function getFeaturedPost(): BlogPost {
  return (
    ALL_BLOG_POSTS.find((post) => post.featured) ??
    ALL_BLOG_POSTS.find((post) => post.slug === 'bike-rental-chandigarh-prices-booking') ??
    ALL_BLOG_POSTS[0]
  );
}

export function getPillarPosts(): BlogPost[] {
  return ALL_BLOG_POSTS.filter((post) => post.isPillar).sort(
    (a, b) => PRIORITY_ORDER[a.priority] - PRIORITY_ORDER[b.priority],
  );
}

export function getPostsByCluster(cluster: BlogCluster): BlogPost[] {
  return ALL_BLOG_POSTS.filter((post) => post.cluster === cluster);
}

export function getPostsByCategory(category: string): BlogPost[] {
  if (category === 'All') return ALL_BLOG_POSTS;
  return ALL_BLOG_POSTS.filter((post) => post.category === category);
}

export function getPostsForCity(citySlug: string, limit = 6): BlogPost[] {
  return ALL_BLOG_POSTS.filter(
    (post) => post.relatedCitySlugs?.includes(citySlug),
  ).slice(0, limit);
}

export function getRelatedPosts(slug: string, limit = 3): BlogPost[] {
  const current = getBlogPost(slug);
  if (!current) return ALL_BLOG_POSTS.slice(0, limit);

  const scored = ALL_BLOG_POSTS.filter((post) => post.slug !== slug).map((post) => {
    let score = 0;
    if (post.cluster === current.cluster) score += 3;
    if (post.category === current.category) score += 2;
    if (current.relatedBlogSlugs?.includes(post.slug)) score += 5;
    if (post.relatedBlogSlugs?.includes(current.slug)) score += 4;
    const sharedCities =
      current.relatedCitySlugs?.filter((c) => post.relatedCitySlugs?.includes(c)).length ?? 0;
    score += sharedCities * 2;
    if (post.isPillar) score += 1;
    return { post, score };
  });

  scored.sort((a, b) => b.score - a.score || b.post.publishedAt.localeCompare(a.post.publishedAt));
  return scored.slice(0, limit).map((s) => s.post);
}

export function getSortedPosts(): BlogPost[] {
  return [...ALL_BLOG_POSTS].sort((a, b) => {
    const pa = PRIORITY_ORDER[a.priority] ?? 9;
    const pb = PRIORITY_ORDER[b.priority] ?? 9;
    if (pa !== pb) return pa - pb;
    return b.publishedAt.localeCompare(a.publishedAt);
  });
}

export function formatBlogDate(isoDate: string): string {
  return new Date(isoDate).toLocaleDateString('en-IN', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  });
}
