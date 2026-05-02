import type { Metadata } from 'next';
import FadeUp from '@/components/ui/FadeUp';

export const metadata: Metadata = {
  title: 'Åpenhetsloven — MOVE Sogn',
  description: 'ANI Gruppen arbeider kontinuerleg for å ivareta menneske- og arbeidstakarrettar i heile verdikjeda. Les om korleis me følgjer åpenhetsloven.',
};

const sections = [
  {
    heading: 'Om lova',
    body: 'ANI Gruppen arbeider kontinuerleg for å ivareta menneske- og arbeidstakarrettar i heile verdikjeda. Organisasjonen tek åpenhetsloven på alvor og arbeider internt og med leverandørar for å sikre grunnleggjande menneskerettar og anstendige arbeidsforhold.',
  },
  {
    heading: 'Berørte selskap',
    body: 'Dei tre største selskapa som er omfatta av åpenhetsloven er:',
    bullets: [
      'ANI Gruppen AS (morselskap)',
      'Toyota Sogn AS (bilforhandlar)',
      'Bilhuset Førde AS (bilforhandlar)',
    ],
    bodyAfter: 'Selskapa er innanlandske med primærmarknad i Sogn og Fjordane.',
  },
  {
    heading: 'Arbeid og arbeidsforhold',
    body: 'Organisasjonen samarbeider med medarbeidarar om driftsfølging, arbeidsforhold og rekruttering. Cirka 10 prosent av tilsette er kvinner. Selskapet er medlem av Opplæringskontoret i Sogn og Fjordane og tilset lærlingar. Lønnspraksisen byggjer på likestilling for likeverdig arbeid, kompetanse og erfaring.',
  },
  {
    heading: 'Leverandørsamarbeid',
    body: 'Toyota Norge AS har utarbeidd «Supplier Code of Conduct» for sine leverandørar. Organisasjonen prioriterer oppfølging av leverandørkjeder med høgast aktivitet og risiko for brot på grunnleggjande rettar.',
  },
  {
    heading: 'Miljø',
    body: 'Toyota Sogn er Miljøfyrtårn-sertifisert. Selskapa skal vere berekraftige og ta aktivt miljø- og samfunnsansvar gjennom heile drifta.',
  },
];

export default function ApenhetslovanPage() {
  return (
    <>
      {/* ── Hero ──────────────────────────────────────────── */}
      <section style={{
        paddingTop: 'calc(var(--nav-height) + 5rem)',
        paddingBottom: '4rem',
        background: 'var(--slate)',
        position: 'relative',
        overflow: 'hidden',
      }}>
        <div style={{
          position: 'absolute', inset: 0, pointerEvents: 'none',
          background: 'radial-gradient(ellipse 60% 70% at 80% 50%, rgba(4,95,208,0.06) 0%, transparent 70%)',
        }} />
        <div className="container" style={{ position: 'relative' }}>
          <FadeUp>
            <span className="label" style={{ color: 'var(--color-orange)' }}>MOVE · Openheit</span>
            <h1 style={{
              marginTop: '0.5rem', marginBottom: '1rem',
              color: 'var(--color-white)',
              fontSize: 'clamp(2rem,5vw,3.5rem)',
              fontWeight: 800, letterSpacing: '-0.03em',
            }}>
              Åpenhetsloven.
            </h1>
            <p style={{ fontSize: 'var(--text-body-lg)', maxWidth: '52ch', color: 'rgba(250,250,248,0.62)', fontWeight: 300 }}>
              ANI Gruppen — ansvarlege for menneske og arbeidstakarrettar i verdikjeda vår.
            </p>
          </FadeUp>
        </div>
      </section>

      <div style={{ height: 2, background: 'linear-gradient(90deg, var(--color-blue), var(--color-orange))' }} />

      {/* ── Content ───────────────────────────────────────── */}
      <section className="section">
        <div className="container">
          <div style={{ maxWidth: '72ch', marginInline: 'auto' }}>
            {sections.map((s, i) => (
              <FadeUp key={s.heading} delay={i * 60}>
                <div style={{ marginBottom: '3rem' }}>
                  <h2 style={{
                    fontSize: 'clamp(1.25rem, 2.5vw, 1.75rem)',
                    fontWeight: 700, letterSpacing: '-0.02em',
                    marginBottom: '0.875rem',
                    color: 'var(--color-body)',
                  }}>
                    {s.heading}
                  </h2>
                  <p style={{ lineHeight: 1.8, color: 'var(--color-body)', fontWeight: 300 }}>
                    {s.body}
                  </p>
                  {s.bullets && (
                    <ul style={{ listStyle: 'none', padding: 0, margin: '1rem 0', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                      {s.bullets.map((b) => (
                        <li key={b} style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', lineHeight: 1.7, fontWeight: 300 }}>
                          <span style={{ width: 5, height: 5, borderRadius: '50%', background: 'var(--color-orange)', flexShrink: 0, display: 'inline-block' }} />
                          {b}
                        </li>
                      ))}
                    </ul>
                  )}
                  {s.bodyAfter && (
                    <p style={{ lineHeight: 1.8, color: 'var(--color-body)', fontWeight: 300 }}>
                      {s.bodyAfter}
                    </p>
                  )}
                </div>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      {/* ── Contact ───────────────────────────────────────── */}
      <section className="section bg-surface">
        <div className="container">
          <FadeUp>
            <div style={{ maxWidth: '52ch', marginInline: 'auto', textAlign: 'center' }}>
              <span className="label">Kontakt</span>
              <h2 style={{ marginTop: '0.5rem', marginBottom: '1rem' }}>Spørsmål om åpenhetsloven?</h2>
              <p style={{ color: 'var(--color-muted)', marginBottom: '1.5rem', lineHeight: 1.7 }}>
                Ta kontakt med oss på e-post eller telefon dersom du har spørsmål om korleis ANI Gruppen arbeidar med åpenhetsloven.
              </p>
              <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
                <a href="mailto:post@movesogn.no" className="btn btn--outline-blue">
                  post@movesogn.no
                </a>
                <a href="tel:+4757676666" className="btn btn--primary">
                  57 67 66 66
                </a>
              </div>
            </div>
          </FadeUp>
        </div>
      </section>
    </>
  );
}
