import type { Metadata } from 'next';
import FadeUp from '@/components/ui/FadeUp';

export const metadata: Metadata = {
  title: 'Summerfun (Hasle) | MOVE Sogn Marine',
  description: 'Summerfun fritidsbåtar frå Hasle — lette, lekre og perfekte for Sognefjorden. MOVE Sogn er autorisert forhandlar.',
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
