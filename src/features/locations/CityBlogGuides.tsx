import Link from 'next/link';
import { BookOpen } from 'lucide-react';
import { getBlogPost, getPostsForCity } from '@/lib/blog-posts';

interface CityBlogGuidesProps {
  citySlug: string;
  cityName: string;
  relatedBlogSlugs: string[];
}

export function CityBlogGuides({ citySlug, cityName, relatedBlogSlugs }: CityBlogGuidesProps) {
  const fromDb = relatedBlogSlugs
    .map((slug) => getBlogPost(slug))
    .filter((post): post is NonNullable<typeof post> => Boolean(post));

  const fallback = getPostsForCity(citySlug, 4);
  const seen = new Set<string>();
  const guides = [...fromDb, ...fallback].filter((post) => {
    if (seen.has(post.slug)) return false;
    seen.add(post.slug);
    return true;
  }).slice(0, 4);

  if (guides.length === 0) return null;

  return (
    <section className="border-y border-surface-200 bg-white py-14">
      <div className="section-container">
        <h2 className="flex items-center gap-2 font-display text-2xl font-bold text-surface-900">
          <BookOpen className="h-6 w-6 text-brand-500" aria-hidden />
          Guides & routes — {cityName}
        </h2>
        <p className="mt-2 max-w-2xl text-sm text-slate-600">
          Planning tips, route guides and rental advice from the OnnRide blog.
        </p>
        <ul className="mt-8 grid gap-4 sm:grid-cols-2">
          {guides.map((post) => (
            <li key={post.slug}>
              <Link
                href={`/blog/${post.slug}`}
                className="group block h-full rounded-2xl border border-surface-200 bg-surface-50 p-5 transition hover:border-brand-300 hover:bg-brand-50/50"
              >
                <p className="text-xs font-semibold uppercase tracking-wide text-brand-600">
                  {post.category}
                </p>
                <h3 className="mt-2 font-display font-bold text-surface-900 group-hover:text-brand-700">
                  {post.title}
                </h3>
                <p className="mt-2 line-clamp-2 text-sm text-slate-600">{post.excerpt}</p>
                <p className="mt-3 text-xs font-medium text-slate-500">
                  {post.readTimeMinutes} min read
                </p>
              </Link>
            </li>
          ))}
        </ul>
        <Link
          href="/blog"
          className="mt-6 inline-flex text-sm font-semibold text-brand-600 hover:text-brand-700"
        >
          View all articles →
        </Link>
      </div>
    </section>
  );
}
