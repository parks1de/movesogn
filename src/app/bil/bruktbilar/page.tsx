import type { Metadata } from 'next';
import FadeUp from '@/components/ui/FadeUp';

export const metadata: Metadata = {
  title: 'Bruktbilar | MOVE Sogn',
  description: 'Stort utval av kvalitetssikra bruktbilar hos MOVE Sogn på Kaupanger.',
  openGraph: {
    images: [{ url: 'https://images.unsplash.com/photo-1549399542-7e3f8b79c341?w=1200&q=80', width: 1200, height: 630, alt: 'Bruktbilar — MOVE Sogn' }],
  },
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
