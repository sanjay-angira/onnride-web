import type { BlogContentBlock } from '@/content/blog/types';
import { cn } from '@/lib/utils';

interface BlogPostContentProps {
  blocks: BlogContentBlock[];
}

export function BlogPostContent({ blocks }: BlogPostContentProps) {
  return (
    <div className="blog-prose space-y-5">
      {blocks.map((block, index) => {
        if (block.type === 'heading') {
          const Tag = block.level === 3 ? 'h3' : 'h2';
          return (
            <Tag
              key={index}
              className={cn(
                'font-display font-bold text-surface-900',
                block.level === 3 ? 'mt-8 text-lg' : 'mt-10 text-xl sm:text-2xl',
              )}
            >
              {block.text}
            </Tag>
          );
        }

        if (block.type === 'list') {
          return (
            <ul key={index} className="ml-5 list-disc space-y-2 text-slate-600">
              {block.items.map((item) => (
                <li key={item} className="leading-relaxed">
                  {item}
                </li>
              ))}
            </ul>
          );
        }

        if (block.type === 'callout') {
          return (
            <div
              key={index}
              className="rounded-xl border border-amber-200 bg-amber-50/80 p-4 sm:p-5"
            >
              <p className="text-sm font-bold text-amber-900">{block.title}</p>
              <p className="mt-2 text-sm leading-relaxed text-amber-950/90">{block.text}</p>
            </div>
          );
        }

        if (block.type === 'table') {
          return (
            <div key={index} className="overflow-x-auto rounded-xl border border-surface-200">
              <table className="min-w-full text-sm">
                <thead className="bg-surface-50">
                  <tr>
                    {block.headers.map((header) => (
                      <th
                        key={header}
                        className="px-4 py-3 text-left font-semibold text-surface-900"
                      >
                        {header}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-surface-200">
                  {block.rows.map((row, rowIndex) => (
                    <tr key={rowIndex}>
                      {row.map((cell, cellIndex) => (
                        <td key={cellIndex} className="px-4 py-3 text-slate-600">
                          {cell}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          );
        }

        if (block.type === 'expertTips') {
          return (
            <div key={index} className="rounded-xl border border-emerald-200 bg-emerald-50/60 p-4 sm:p-5">
              <p className="text-sm font-bold text-emerald-900">Expert tips</p>
              <ul className="mt-3 ml-4 list-disc space-y-2 text-sm text-emerald-950/90">
                {block.items.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
          );
        }

        if (block.type === 'commonMistakes') {
          return (
            <div key={index} className="rounded-xl border border-rose-200 bg-rose-50/60 p-4 sm:p-5">
              <p className="text-sm font-bold text-rose-900">Common mistakes</p>
              <ul className="mt-3 ml-4 list-disc space-y-2 text-sm text-rose-950/90">
                {block.items.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
          );
        }

        return (
          <p key={index} className="text-base leading-relaxed text-slate-600">
            {block.text}
          </p>
        );
      })}
    </div>
  );
}
