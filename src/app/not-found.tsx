import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/Button';

export default function NotFound() {
  return (
    <div className="flex min-h-[60vh] items-center justify-center bg-surface-50 px-4">
      <div className="text-center">
        <p className="font-display text-8xl font-bold text-brand-200">404</p>
        <h1 className="mt-4 font-display text-2xl font-bold text-surface-900">Wrong turn?</h1>
        <p className="mt-2 text-slate-500">This page doesn&apos;t exist — let&apos;s get you back on the road.</p>
        <Link href="/" className="mt-8 inline-block">
          <Button className="gap-2">
            <ArrowLeft className="h-4 w-4" aria-hidden />
            Back to home
          </Button>
        </Link>
      </div>
    </div>
  );
}
