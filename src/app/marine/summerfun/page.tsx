import type { Metadata } from 'next';
import FadeUp from '@/components/ui/FadeUp';

export const metadata: Metadata = {
  title: 'Summerfun (Hasle) | MOVE Sogn Marine',
  description: 'Summerfun fritidsbåtar frå Hasle — lette, lekre og perfekte for Sognefjorden. MOVE Sogn er autorisert forhandlar.',
  openGraph: {
    images: [{ url: 'https://images.unsplash.com/photo-1605281317010-fe5ffe798166?w=1200&q=80', width: 1200, height: 630, alt: 'Summerfun båt på Sognefjorden' }],
  },
};

export default function SummerfunPage() {
  return (
    <>
      {/* TODO: [SANITY] Fetch hero image + headline from CMS (type: pageHero) */}
      <section style={{ paddingTop: 'calc(var(--nav-height) + 5rem)', paddingBottom: '5rem' }}>
        <div className="container">
          <FadeUp>
            <span className="label">Marine</span>
            <h1>Summerfun</h1>
            {/* TODO: [SANITY] Fetch intro text and brand story from CMS (type: marineBrandPage) */}
          </FadeUp>
        </div>
      </section>

      {/* TODO: [SANITY] Fetch boat models / specs from CMS (type: boatModel) */}
      <section className="section bg-warm">
        <div className="container">
          {/* TODO: Boat model cards */}
        </div>
      </section>
    </>
  );
}
