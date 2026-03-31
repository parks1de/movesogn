import type { Metadata } from 'next';
import FadeUp from '@/components/ui/FadeUp';

export const metadata: Metadata = {
  title: 'NIU Moped | MOVE Sogn Sykkel',
  description: 'NIU elektriske mopeder — stilreine, raske og miljøvenlege. MOVE Sogn er autorisert NIU-forhandlar i Sogn.',
  openGraph: {
    images: [{ url: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1200&q=80', width: 1200, height: 630, alt: 'NIU elektrisk moped — MOVE Sogn' }],
  },
};

export default function NiuPage() {
  return (
    <>
      {/* TODO: [SANITY] Fetch hero image + headline from CMS (type: pageHero) */}
      <section style={{ paddingTop: 'calc(var(--nav-height) + 5rem)', paddingBottom: '5rem' }}>
        <div className="container">
          <FadeUp>
            <span className="label">Sykkel</span>
            <h1>NIU Moped</h1>
            {/* TODO: [SANITY] Fetch intro text and brand story from CMS (type: sykkelBrandPage) */}
          </FadeUp>
        </div>
      </section>

      {/* TODO: [SANITY] Fetch NIU models + specs from CMS (type: niuModel) */}
      <section className="section bg-surface">
        <div className="container">
          {/* TODO: NIU model grid */}
        </div>
      </section>
    </>
  );
}
