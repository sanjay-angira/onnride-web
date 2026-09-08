import Link from 'next/link';
import { IndianRupee } from 'lucide-react';
import { getPublicSettingsMap, settingBool } from '@/lib/public-settings';

export async function PartialPayPromo() {
  const settings = await getPublicSettingsMap();
  if (!settingBool(settings, 'partial_payment_enabled', false)) {
    return null;
  }

  return (
    <section className="border-y border-amber-200 bg-gradient-to-r from-amber-50 to-orange-50">
      <div className="section-container flex flex-col items-start justify-between gap-4 py-4 sm:flex-row sm:items-center">
        <div className="flex items-start gap-3">
          <span className="mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-amber-200/80 text-amber-900">
            <IndianRupee className="h-5 w-5" aria-hidden />
          </span>
          <div>
            <p className="font-display text-base font-bold text-amber-950">
              Book with partial payment — pay balance at pickup
            </p>
            <p className="mt-0.5 text-sm text-amber-900/80">
              Pay a small amount now to confirm your booking. Remaining amount due before ride start —
              just like leading bike rental platforms.
            </p>
          </div>
        </div>
        <Link
          href="/how-it-works"
          className="shrink-0 rounded-lg border border-amber-300 bg-white px-4 py-2 text-sm font-semibold text-amber-900 hover:bg-amber-100"
        >
          How it works →
        </Link>
      </div>
    </section>
  );
}
