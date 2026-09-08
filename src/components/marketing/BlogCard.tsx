import Link from 'next/link';
import { ArrowUpRight, Clock } from 'lucide-react';
import type { BlogPost } from '@/lib/blog-posts';
import { formatBlogDate } from '@/lib/blog-posts';
import { cn } from '@/lib/utils';

interface BlogCardProps {
  post: BlogPost;
  variant?: 'default' | 'featured' | 'compact';
}

export function BlogCard({ post, variant = 'default' }: BlogCardProps) {
  const isFeatured = variant === 'featured';

  return (
    <article
      className={cn(
        'group relative overflow-hidden rounded-3xl border border-surface-200 bg-white shadow-card transition hover:-translate-y-1 hover:border-brand-200 hover:shadow-card-hover',
        isFeatured && 'lg:grid lg:grid-cols-2',
      )}
    >
      <Link
        href={`/blog/${post.slug}`}
        className={cn(
          'relative block overflow-hidden bg-gradient-to-br',
          post.gradient,
          isFeatured ? 'min-h-[220px] lg:min-h-full' : 'h-44',
        )}
        aria-hidden
        tabIndex={-1}
      >
        <div className="absolute inset-0 bg-black/20 transition group-hover:bg-black/10" />
        <div className="absolute inset-0 bg-brand-mesh opacity-40" />
        <span className="absolute left-5 top-5 rounded-full bg-white/20 px-3 py-1 text-xs font-semibold text-white backdrop-blur">
          {post.category}
        </span>
        {post.featured ? (
          <span className="absolute right-5 top-5 rounded-full bg-brand-500 px-3 py-1 text-xs font-bold text-white">
            Featured
          </span>
        ) : null}
      </Link>

      <div className={cn('flex flex-col p-6', isFeatured && 'justify-center lg:p-8')}>
        <div className="flex flex-wrap items-center gap-3 text-xs text-slate-500">
          <time dateTime={post.publishedAt}>{formatBlogDate(post.publishedAt)}</time>
          <span aria-hidden>·</span>
          <span className="inline-flex items-center gap-1">
            <Clock className="h-3.5 w-3.5" aria-hidden />
            {post.readTimeMinutes} min read
          </span>
        </div>

        <h2
          className={cn(
            'mt-3 font-display font-bold text-surface-900 group-hover:text-brand-700',
            isFeatured ? 'text-2xl sm:text-3xl' : 'text-lg',
          )}
        >
          <Link href={`/blog/${post.slug}`}>{post.title}</Link>
        </h2>

        <p
          className={cn(
            'mt-3 text-sm leading-relaxed text-slate-600',
            variant === 'compact' ? 'line-clamp-2' : 'line-clamp-3',
          )}
        >
          {post.excerpt}
        </p>

        <div className="mt-4 flex flex-wrap gap-2">
          {post.tags.slice(0, 3).map((tag) => (
            <span
              key={tag}
              className="rounded-full bg-brand-50 px-2.5 py-0.5 text-xs font-medium text-brand-700"
            >
              {tag}
            </span>
          ))}
        </div>

        <Link
          href={`/blog/${post.slug}`}
          className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-brand-600 transition group-hover:text-brand-700"
        >
          Read article
          <ArrowUpRight className="h-4 w-4 transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </Link>
      </div>
    </article>
  );
}
