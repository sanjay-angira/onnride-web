import { ShieldCheck, User } from 'lucide-react';
import { formatBlogDate } from '@/lib/blog-posts';

interface BlogAuthorCardProps {
  author: string;
  authorBio?: string;
  reviewedBy?: string;
  publishedAt: string;
  dateModified?: string;
}

export function BlogAuthorCard({
  author,
  authorBio,
  reviewedBy,
  publishedAt,
  dateModified,
}: BlogAuthorCardProps) {
  return (
    <div className="rounded-2xl border border-surface-200 bg-white p-5 shadow-sm">
      <div className="flex items-start gap-3">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-brand-100">
          <User className="h-5 w-5 text-brand-700" aria-hidden />
        </div>
        <div className="min-w-0 flex-1">
          <p className="font-semibold text-surface-900">{author}</p>
          {authorBio ? (
            <p className="mt-1 text-sm leading-relaxed text-slate-600">{authorBio}</p>
          ) : null}
          {reviewedBy ? (
            <p className="mt-2 inline-flex items-center gap-1.5 text-xs font-medium text-emerald-700">
              <ShieldCheck className="h-3.5 w-3.5" aria-hidden />
              Reviewed by {reviewedBy}
            </p>
          ) : null}
          <div className="mt-3 flex flex-wrap gap-x-4 gap-y-1 text-xs text-slate-500">
            <time dateTime={publishedAt}>Published {formatBlogDate(publishedAt)}</time>
            {dateModified && dateModified !== publishedAt ? (
              <time dateTime={dateModified}>Updated {formatBlogDate(dateModified)}</time>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
}
