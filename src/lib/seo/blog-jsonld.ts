import type { BlogPost } from '@/content/blog/types';
import { absoluteUrl } from '@/lib/seo/site-url';

export function buildBlogPostJsonLd(post: BlogPost) {
  const url = absoluteUrl(`/blog/${post.slug}`);
  return {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title,
    description: post.excerpt,
    url,
    datePublished: post.publishedAt,
    dateModified: post.dateModified ?? post.publishedAt,
    author: post.authorBio
      ? {
          '@type': 'Person',
          name: post.author,
          description: post.authorBio,
        }
      : {
          '@type': 'Organization',
          name: post.author,
        },
    publisher: {
      '@type': 'Organization',
      name: 'OnnRide',
      logo: {
        '@type': 'ImageObject',
        url: absoluteUrl('/icon.svg'),
      },
    },
    mainEntityOfPage: url,
    keywords: post.tags.join(', '),
    speakable: {
      '@type': 'SpeakableSpecification',
      cssSelector: ['#blog-quick-answer'],
    },
  };
}

export function buildBlogFaqJsonLd(post: BlogPost) {
  if (!post.faqs.length) return null;

  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: post.faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.q,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.a,
      },
    })),
  };
}
