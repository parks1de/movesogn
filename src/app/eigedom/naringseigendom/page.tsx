import type { Metadata } from 'next';
import Image from 'next/image';
import FadeUp from '@/components/ui/FadeUp';
import ContactForm from '@/components/ui/ContactForm';

export const metadata: Metadata = {
  title: 'Konserneigedommar — PV5, Køff, ANI Anlegg | MOVE Sogn',
  description: 'Næringslokale i veksande Sogn — PV5 næringspark, Køff kafé og ANI Anlegg. Kontakt MOVE Sogn for ledige areal.',
  openGraph: {
    images: [{ url: '/images/naringseigendom/ne-01.png', width: 1200, height: 630, alt: 'Konserneigedommar — MOVE Sogn' }],
  },
};

const properties = [
  {
    src: '/images/naringseigendom/ne-01.png',
    alt: 'Køff — fasade front',
    name: 'Køff',
    desc: 'Kafé og møteplass i hjartet av Kaupanger.',
  },
  {
    src: '/images/naringseigendom/ne-02.png',
    alt: 'PV5 næringspark — fasade front',
    name: 'PV5 Næringspark',
    desc: 'Kontor og lagerareal — tilgjengeleg for leige.',
  },
  {
    src: '/images/naringseigendom/ne-03.png',
    alt: 'Toyota Sogn — fasade front',
    name: 'Toyota Sogn',
    desc: 'Bilsenteret på Kaupanger — showroom og verkstad.',
  },
  {
    src: '/images/naringseigendom/ne-04.png',
    alt: 'Hjorten — fasade front',
    name: 'Hjorten',
    desc: 'Næringsbygg med fleksible lokale i Sogn.',
  },
];

export default function NaringseigendomPage() {
  return (
    <>
      {/* TODO: [SANITY] Fetch hero image + headline from CMS (type: pageHero) */}
      <section style={{ paddingTop: 'calc(var(--nav-height) + 5rem)', paddingBottom: '5rem' }}>
        <div className="container">
          <FadeUp>
            <span className="label">Eigedom · Sogn</span>
            <h1>Konserneigedommar</h1>
            {/* TODO: [SANITY] Fetch intro text from CMS (type: naringseigendomPage) */}
          </FadeUp>
        </div>
      </section>

      {/* ── PROPERTY SHOWCASE GRID ────────────────────────── */}
      <section className="section bg-surface">
        <div className="container">
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
            gap: '1.5rem',
          }}>
            {properties.map((p, i) => (
              <FadeUp key={i} delay={i * 80}>
                <div style={{ borderRadius: 6, overflow: 'hidden', background: 'var(--canvas)', boxShadow: '0 2px 8px rgba(0,0,0,.08)' }}>
                  <div style={{ position: 'relative', aspectRatio: '4/3' }}>
                    <Image
                      src={p.src}
                      alt={p.alt}
                      fill
                      sizes="(max-width: 768px) 100vw, 50vw"
                      style={{ objectFit: 'cover' }}
                    />
                  </div>
                  <div style={{ padding: '1.25rem' }}>
                    <h3 style={{ margin: '0 0 .5rem' }}>{p.name}</h3>
                    <p style={{ margin: 0, fontSize: '0.9rem', color: 'var(--ink-light)' }}>{p.desc}</p>
                  </div>
                </div>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      {/* TODO: [SANITY] Fetch contact CTA block from CMS */}
      <section className="section">
        <div className="container">
          <FadeUp style={{ maxWidth: 680, marginInline: 'auto' }}>
            <ContactForm
              formType="contact"
              heading="Interessert i næringslokale?"
              subheading="Ta kontakt så hjelper me deg med tilgjengelege areal og vilkår."
            />
          </FadeUp>
        </div>
      </section>
    </>
  );
}
