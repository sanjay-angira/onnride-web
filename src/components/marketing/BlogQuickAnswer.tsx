import { Sparkles } from 'lucide-react';

interface BlogQuickAnswerProps {
  text: string;
}

export function BlogQuickAnswer({ text }: BlogQuickAnswerProps) {
  return (
    <div
      id="blog-quick-answer"
      className="rounded-2xl border border-brand-200 bg-brand-50/80 p-5 sm:p-6"
    >
      <div className="flex items-start gap-3">
        <Sparkles className="mt-0.5 h-5 w-5 shrink-0 text-brand-600" aria-hidden />
        <div>
          <p className="text-xs font-bold uppercase tracking-wide text-brand-700">Quick answer</p>
          <p className="mt-2 text-base leading-relaxed text-surface-900">{text}</p>
        </div>
      </div>
    </div>
  );
}
