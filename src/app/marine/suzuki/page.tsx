import type { Metadata } from 'next';
import FadeUp from '@/components/ui/FadeUp';

export const metadata: Metadata = {
  title: 'Suzuki Båtmotor | MOVE Sogn Marine',
  description: 'Autorisert Suzuki-service og -sal på Kaupanger. Pålitelege påhengarsmotorar for alle båttypar.',
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
