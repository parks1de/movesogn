'use client';

import { useSearchParams } from 'next/navigation';
import { Suspense } from 'react';

function BannerInner() {
  const params = useSearchParams();
  if (params.get('lang') !== 'en') return null;
  return (
    <div
      style={{
        position: 'relative',
        zIndex: 200,
        background: '#1C2030',
        color: 'rgba(255,255,255,0.88)',
        textAlign: 'center',
        padding: '10px 1rem',
        fontSize: '0.875rem',
        letterSpacing: '0.01em',
      }}
    >
      English version coming soon — contact us at{' '}
      <a
        href="mailto:post@movesogn.no"
        style={{ color: '#FF8421', textDecoration: 'underline' }}
      >
        post@movesogn.no
      </a>
    </div>
  );
}

export default function LangBanner() {
  return (
    <Suspense>
      <BannerInner />
    </Suspense>
  );
}
