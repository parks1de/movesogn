import type { Metadata } from 'next';
import FadeUp from '@/components/ui/FadeUp';

export const metadata: Metadata = {
  title: 'Lexus Bruktbil | MOVE Sogn',
  description: 'Utvalde brukte Lexus-bilar hos MOVE Sogn — premium køyreglede til fornuftige prisar på Kaupanger.',
  openGraph: {
    images: [{ url: 'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=1200&q=80', width: 1200, height: 630, alt: 'Lexus Bruktbil — MOVE Sogn' }],
  },
};

export default function LexusBruktbilPage() {
  return (
    <>
      {/* TODO: [SANITY] Fetch hero image + headline from CMS (type: pageHero) */}
      <section style={{ paddingTop: 'calc(var(--nav-height) + 5rem)', paddingBottom: '5rem' }}>
        <div className="container">
          <FadeUp>
            <span className="label">Luxury</span>
            <h1>Lexus Bruktbil</h1>
            {/* TODO: [SANITY] Fetch intro text from CMS */}
          </FadeUp>
        </div>
      </section>

      {/* TODO: [SANITY] Fetch Lexus inventory from CMS (type: lexusListing) */}
      <section className="section bg-surface">
        <div className="container">
          {/* TODO: Lexus vehicle listing grid */}
        </div>
      </section>
    </>
  );
}
