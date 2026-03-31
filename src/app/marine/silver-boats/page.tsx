import type { Metadata } from 'next';
import FadeUp from '@/components/ui/FadeUp';

export const metadata: Metadata = {
  title: 'Silver Boats | MOVE Sogn Marine',
  description: 'Silver Boats frå Finland — solide og stilreine fritidsbåtar for norske farvatn. MOVE Sogn er autorisert forhandlar.',
};

export default function SilverBoatsPage() {
  return (
    <>
      {/* TODO: [SANITY] Fetch hero image + headline from CMS (type: pageHero) */}
      <section style={{ paddingTop: 'calc(var(--nav-height) + 5rem)', paddingBottom: '5rem' }}>
        <div className="container">
          <FadeUp>
            <span className="label">Marine</span>
            <h1>Silver Boats</h1>
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
