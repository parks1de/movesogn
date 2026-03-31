import type { Metadata } from 'next';
import FadeUp from '@/components/ui/FadeUp';

export const metadata: Metadata = {
  title: 'Sogn næringseigendom — PV5, Køff, ANI Anlegg | MOVE Sogn',
  description: 'Næringslokale i veksande Sogn — PV5 næringspark, Køff kafé og ANI Anlegg. Kontakt MOVE Sogn for ledige areal.',
};

export default function NaringseigendomPage() {
  return (
    <>
      {/* TODO: [SANITY] Fetch hero image + headline from CMS (type: pageHero) */}
      <section style={{ paddingTop: 'calc(var(--nav-height) + 5rem)', paddingBottom: '5rem' }}>
        <div className="container">
          <FadeUp>
            <span className="label">Eigedom · Sogn</span>
            <h1>Sogn næringseigendom</h1>
            {/* TODO: [SANITY] Fetch intro text from CMS (type: naringseigendomPage) */}
          </FadeUp>
        </div>
      </section>

      {/* TODO: [SANITY] Fetch property listings: PV5, Køff, ANI Anlegg from CMS (type: eigendomProperty) */}
      <section className="section bg-surface">
        <div className="container">
          {/* TODO: PV5 næringspark section */}
          {/* TODO: Køff kafé section */}
          {/* TODO: ANI Anlegg section */}
          {/* TODO: Available units / floor plan CTA */}
        </div>
      </section>

      {/* TODO: [SANITY] Fetch contact CTA block from CMS */}
      <section className="section">
        <div className="container">
          {/* TODO: Contact CTA for næringseigendom inquiries */}
        </div>
      </section>
    </>
  );
}
