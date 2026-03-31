import type { Metadata } from 'next';
import FadeUp from '@/components/ui/FadeUp';

export const metadata: Metadata = {
  title: 'Merida Syklar | MOVE Sogn Sykkel',
  description: 'Merida el-syklar og terrengssyklar hos MOVE Sogn. Kvalitetssyklar for kvardagen og eventyr i Sogn.',
  openGraph: {
    images: [{ url: 'https://images.unsplash.com/photo-1571068316344-75bc76f77890?w=1200&q=80', width: 1200, height: 630, alt: 'Merida el-sykkel — MOVE Sogn' }],
  },
};

export default function MeridaPage() {
  return (
    <>
      {/* TODO: [SANITY] Fetch hero image + headline from CMS (type: pageHero) */}
      <section style={{ paddingTop: 'calc(var(--nav-height) + 5rem)', paddingBottom: '5rem' }}>
        <div className="container">
          <FadeUp>
            <span className="label">Sykkel</span>
            <h1>Merida</h1>
            {/* TODO: [SANITY] Fetch intro text and brand story from CMS (type: sykkelBrandPage) */}
          </FadeUp>
        </div>
      </section>

      {/* TODO: [SANITY] Fetch bike models + specs from CMS (type: bikeModel) */}
      <section className="section bg-surface">
        <div className="container">
          {/* TODO: Bike model grid */}
        </div>
      </section>
    </>
  );
}
