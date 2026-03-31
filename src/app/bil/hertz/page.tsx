import type { Metadata } from 'next';
import FadeUp from '@/components/ui/FadeUp';

export const metadata: Metadata = {
  title: 'Hertz Bilutleige | MOVE Sogn',
  description: 'Lei bil hos Hertz gjennom MOVE Sogn — over 100 leigebiler på fem stader i Sogn og Sunnfjord.',
};

export default function HertzPage() {
  return (
    <>
      {/* TODO: [SANITY] Fetch hero image + headline from CMS (type: pageHero) */}
      <section style={{ paddingTop: 'calc(var(--nav-height) + 5rem)', paddingBottom: '5rem' }}>
        <div className="container">
          <FadeUp>
            <span className="label">Bilutleige</span>
            <h1>Hertz Bilutleige</h1>
            {/* TODO: [SANITY] Fetch intro text from CMS */}
          </FadeUp>
        </div>
      </section>

      {/* TODO: [SANITY] Fetch rental locations, fleet info from CMS (type: hertzContent) */}
      <section className="section bg-surface">
        <div className="container">
          {/* TODO: Locations + booking CTA */}
        </div>
      </section>
    </>
  );
}
