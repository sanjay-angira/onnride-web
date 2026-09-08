import { CheckCircle2 } from 'lucide-react';

interface BlogKeyTakeawaysProps {
  items: string[];
}

export function BlogKeyTakeaways({ items }: BlogKeyTakeawaysProps) {
  return (
    <div className="rounded-2xl border border-surface-200 bg-surface-50 p-5 sm:p-6">
      <h2 className="font-display text-lg font-bold text-surface-900">Key takeaways</h2>
      <ul className="mt-4 space-y-3">
        {items.map((item) => (
          <li key={item} className="flex items-start gap-2.5 text-sm leading-relaxed text-slate-700">
            <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-brand-600" aria-hidden />
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}
