'use client';

import dynamic from 'next/dynamic';

const SocialProofToast = dynamic(
  () =>
    import('@/components/sections/home/SocialProofToast.client').then(
      (m) => m.SocialProofToast,
    ),
  { ssr: false },
);

export function HomeDeferredChrome() {
  return <SocialProofToast />;
}
