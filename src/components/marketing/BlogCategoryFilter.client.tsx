'use client';

import { useMemo, useState } from 'react';
import { BlogCard } from '@/components/marketing/BlogCard';
import type { BlogPost } from '@/lib/blog-posts';
import { cn } from '@/lib/utils';

interface BlogCategoryFilterProps {
  categories: readonly string[];
  posts: BlogPost[];
  excludeSlug?: string;
}

export function BlogCategoryFilter({ categories, posts, excludeSlug }: BlogCategoryFilterProps) {
  const [active, setActive] = useState('All');

  const filtered = useMemo(() => {
    const base = excludeSlug ? posts.filter((p) => p.slug !== excludeSlug) : posts;
    if (active === 'All') return base;
    return base.filter((p) => p.category === active);
  }, [active, posts, excludeSlug]);

  return (
    <>
      <div className="mt-10 flex flex-wrap gap-2">
        {categories.map((category) => (
          <button
            key={category}
            type="button"
            onClick={() => setActive(category)}
            className={cn(
              'rounded-full border px-4 py-2 text-sm font-medium transition',
              active === category
                ? 'border-brand-500 bg-brand-500 text-white'
                : 'border-brand-100 bg-brand-50 text-brand-800 hover:bg-brand-100',
            )}
          >
            {category}
          </button>
        ))}
      </div>
      <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map((post) => (
          <BlogCard key={post.slug} post={post} />
        ))}
      </div>
    </>
  );
}
