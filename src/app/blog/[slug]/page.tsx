import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowLeft, Clock, User } from 'lucide-react';
import { BlogAuthorCard } from '@/components/marketing/BlogAuthorCard';
import { BlogCard } from '@/components/marketing/BlogCard';
import { BlogCityCta } from '@/components/marketing/BlogCityCta';
import { BlogFaqSection } from '@/components/marketing/BlogFaqSection';
import { BlogKeyTakeaways } from '@/components/marketing/BlogKeyTakeaways';
import { BlogPostContent } from '@/components/marketing/BlogPostContent';
import { BlogQuickAnswer } from '@/components/marketing/BlogQuickAnswer';
import { PageBottomCta } from '@/components/marketing/PageBottomCta';
import { JsonLdScript } from '@/components/seo/JsonLdScript';
import {
  BLOG_POSTS,
  formatBlogDate,
  getBlogPost,
  getRelatedPosts,
} from '@/lib/blog-posts';
import { buildBlogFaqJsonLd, buildBlogPostJsonLd } from '@/lib/seo/blog-jsonld';
import { pageMetadata } from '@/lib/seo/metadata';

interface BlogPostPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return BLOG_POSTS.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = getBlogPost(slug);

  if (!post) {
    return { title: 'Article not found' };
  }

  return pageMetadata({
    title: post.title,
    description: post.excerpt,
    path: `/blog/${slug}`,
    ogType: 'article',
    publishedTime: post.publishedAt,
    modifiedTime: post.dateModified ?? post.publishedAt,
    authors: [post.author],
  });
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const post = getBlogPost(slug);

  if (!post) {
    notFound();
  }

  const related = getRelatedPosts(slug, 3);
  const faqJsonLd = buildBlogFaqJsonLd(post);

  return (
    <div className="min-h-screen bg-surface-50">
      <JsonLdScript data={buildBlogPostJsonLd(post)} />
      {faqJsonLd ? <JsonLdScript data={faqJsonLd} /> : null}
      <section className="relative overflow-hidden bg-surface-950 text-white">
        <div className="absolute inset-0 bg-hero-pattern opacity-70" />
        <div className={`absolute inset-0 bg-gradient-to-br ${post.gradient} opacity-30`} />
        <div className="absolute -right-24 top-0 h-72 w-72 rounded-full bg-brand-500/20 blur-3xl" />

        <div className="section-container relative py-10 sm:py-14">
          <nav aria-label="Breadcrumb" className="mb-6 flex flex-wrap items-center gap-2 text-sm">
            <Link href="/" className="text-slate-400 transition hover:text-brand-300">
              Home
            </Link>
            <span className="text-slate-600">/</span>
            <Link href="/blog" className="text-slate-400 transition hover:text-brand-300">
              Blog
            </Link>
            <span className="text-slate-600">/</span>
            <span className="line-clamp-1 text-brand-200">{post.title}</span>
          </nav>

          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-sm font-medium text-brand-300 transition hover:text-brand-200"
          >
            <ArrowLeft className="h-4 w-4" aria-hidden />
            All articles
          </Link>

          <span className="mt-6 inline-block rounded-full bg-white/10 px-3 py-1 text-xs font-semibold text-brand-200 backdrop-blur">
            {post.category}
            {post.isPillar ? ' · Pillar guide' : null}
          </span>

          <h1 className="home-section-title-light mt-4 max-w-4xl">{post.title}</h1>
          <p className="home-section-subtitle-light mt-4 max-w-2xl">{post.excerpt}</p>

          <div className="mt-6 flex flex-wrap items-center gap-4 text-sm text-slate-400">
            <span className="inline-flex items-center gap-1.5">
              <User className="h-4 w-4 text-brand-400" aria-hidden />
              {post.author}
            </span>
            <time dateTime={post.publishedAt}>{formatBlogDate(post.publishedAt)}</time>
            {post.dateModified && post.dateModified !== post.publishedAt ? (
              <time dateTime={post.dateModified}>Updated {formatBlogDate(post.dateModified)}</time>
            ) : null}
            <span className="inline-flex items-center gap-1.5">
              <Clock className="h-4 w-4 text-brand-400" aria-hidden />
              {post.readTimeMinutes} min read
            </span>
          </div>

          <div className="mt-5 flex flex-wrap gap-2">
            {post.tags.map((tag) => (
              <span
                key={tag}
                className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-medium text-slate-300"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </section>

      <div className="relative bg-gradient-to-b from-brand-50/60 via-white to-surface-50">
        <div className="absolute inset-0 bg-section-dots bg-dots opacity-40" aria-hidden />
        <div className="section-container relative py-10 sm:py-14">
          <div className="grid gap-10 lg:grid-cols-12">
            <article className="lg:col-span-8">
              <div className="space-y-6">
                <BlogQuickAnswer text={post.quickAnswer} />
                <BlogKeyTakeaways items={post.keyTakeaways} />
              </div>

              <div className="mt-8 rounded-3xl border border-surface-200 bg-white p-6 shadow-card sm:p-8 lg:p-10">
                <BlogPostContent blocks={post.content} />
                <BlogFaqSection items={post.faqs} />
              </div>

              <div className="mt-8">
                <BlogAuthorCard
                  author={post.author}
                  authorBio={post.authorBio}
                  reviewedBy={post.reviewedBy}
                  publishedAt={post.publishedAt}
                  dateModified={post.dateModified}
                />
              </div>

              {post.citations && post.citations.length > 0 ? (
                <div className="mt-6 rounded-2xl border border-surface-200 bg-white p-5">
                  <h2 className="text-sm font-bold text-surface-900">Sources & references</h2>
                  <ul className="mt-3 space-y-2">
                    {post.citations.map((c) => (
                      <li key={c.url}>
                        <a
                          href={c.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-sm text-brand-600 hover:text-brand-700"
                        >
                          {c.label}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              ) : null}

              <PageBottomCta
                title="Book your next ride"
                description="Apply what you learned — search live inventory and checkout with transparent pricing."
                primaryHref="/search"
                primaryLabel="Search bikes"
                secondaryHref="/bike-rental"
                secondaryLabel="Browse cities"
              />
            </article>

            <aside className="lg:col-span-4">
              <div className="sticky top-24 space-y-6">
                {post.relatedCitySlugs && post.relatedCitySlugs.length > 0 ? (
                  <BlogCityCta citySlugs={post.relatedCitySlugs} />
                ) : null}

                <div className="rounded-3xl border border-surface-200 bg-white p-6 shadow-card">
                  <h2 className="font-display text-lg font-bold text-surface-900">Related reads</h2>
                  <ul className="mt-4 space-y-4">
                    {related.map((item) => (
                      <li key={item.slug}>
                        <Link
                          href={`/blog/${item.slug}`}
                          className="group block rounded-xl p-3 transition hover:bg-brand-50"
                        >
                          <p className="text-xs font-medium text-brand-600">{item.category}</p>
                          <p className="mt-1 text-sm font-semibold text-surface-900 group-hover:text-brand-700">
                            {item.title}
                          </p>
                          <p className="mt-1 text-xs text-slate-500">
                            {item.readTimeMinutes} min read
                          </p>
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="overflow-hidden rounded-3xl bg-gradient-to-br from-brand-500 to-brand-700 p-6 text-white">
                  <h2 className="font-display text-lg font-bold">Plan a trip?</h2>
                  <p className="mt-2 text-sm text-orange-100">
                    Compare scooters and commuters in your city — pickup slots 9 AM to 9 PM.
                  </p>
                  <Link
                    href="/search"
                    className="mt-4 inline-flex rounded-xl bg-white px-4 py-2 text-sm font-bold text-brand-700 transition hover:bg-brand-50"
                  >
                    Start search
                  </Link>
                </div>
              </div>
            </aside>
          </div>

          <section className="mt-16">
            <h2 className="font-display text-2xl font-bold text-surface-900">More from the blog</h2>
            <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {related.map((item) => (
                <BlogCard key={item.slug} post={item} variant="compact" />
              ))}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
