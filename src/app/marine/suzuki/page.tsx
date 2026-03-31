import type { Metadata } from 'next';
import FadeUp from '@/components/ui/FadeUp';

export const metadata: Metadata = {
  title: 'Suzuki Båtmotor | MOVE Sogn Marine',
  description: 'Autorisert Suzuki-service og -sal på Kaupanger. Pålitelege påhengarsmotorar for alle båttypar.',
  openGraph: {
    images: [{ url: 'https://images.unsplash.com/photo-1605281317010-fe5ffe798166?w=1200&q=80', width: 1200, height: 630, alt: 'Suzuki Båtmotor — MOVE Sogn Marine' }],
  },
};

export default function SuzukiPage() {
  return (
    <>
      {/* TODO: [SANITY] Fetch hero image + headline from CMS (type: pageHero) */}
      <section style={{ paddingTop: 'calc(var(--nav-height) + 5rem)', paddingBottom: '5rem' }}>
        <div className="container">
          <FadeUp>
            <span className="label">Marine</span>
            <h1>Suzuki Båtmotor</h1>
            {/* TODO: [SANITY] Fetch intro text and service info from CMS (type: marineBrandPage) */}
          </FadeUp>
        </div>
      </section>

      {/* TODO: [SANITY] Fetch motor models + service offerings from CMS (type: suzukiContent) */}
      <section className="section bg-warm">
        <div className="container">
          {/* TODO: Motor models + service CTA */}
        </div>
      </section>
    </>
  );
}
