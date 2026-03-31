import type { Metadata } from 'next';
import FadeUp from '@/components/ui/FadeUp';

export const metadata: Metadata = {
  title: 'Bruktbilar | MOVE Sogn',
  description: 'Stort utval av kvalitetssikra bruktbilar hos MOVE Sogn på Kaupanger.',
};

export default function BruktbilarPage() {
  return (
    <>
      {/* TODO: [SANITY] Fetch hero image + headline from CMS (type: pageHero) */}
      <section style={{ paddingTop: 'calc(var(--nav-height) + 5rem)', paddingBottom: '5rem' }}>
        <div className="container">
          <FadeUp>
            <span className="label">Bil</span>
            <h1>Bruktbilar</h1>
            {/* TODO: [SANITY] Fetch intro text from CMS */}
          </FadeUp>
        </div>
      </section>

      {/* TODO: [SANITY] Fetch bruktbil inventory / featured listings from CMS (type: bruktbilListing) */}
      <section className="section bg-surface">
        <div className="container">
          {/* TODO: Vehicle listing grid */}
        </div>
      </section>
    </>
  );
}
