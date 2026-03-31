import type { Metadata } from 'next';
import Link from 'next/link';
import FadeUp from '@/components/ui/FadeUp';
import Icon from '@/components/ui/Icon';

export const metadata: Metadata = {
  title: 'Hertz Bilutleige | MOVE Sogn',
  description: 'MOVE Utleige — Hertz ANI Utleige med stasjonar på flyplassen i Sogndal og i Førde. Lei bil, varebil eller buss i Sogn og Sunnfjord.',
  openGraph: {
    images: [{ url: 'https://images.unsplash.com/photo-1544636331-e26879cd4d9b?w=1200&q=80', width: 1200, height: 630, alt: 'Hertz Bilutleige — MOVE Sogn' }],
  },
};

export default function HertzPage() {
  return (
    <>
      {/* ── HEADER ─────────────────────────────────────────── */}
      <section style={{ paddingTop: 'calc(var(--nav-height) + 5rem)', paddingBottom: '4rem' }}>
        <div className="container">
          <FadeUp>
            <span className="label">Bilutleige</span>
            <h1 style={{ marginTop: '0.5rem', marginBottom: '1.5rem' }}>
              MOVE Utleige — Hertz ANI Utleige
            </h1>
            <p style={{ fontSize: 'var(--text-body-lg)', maxWidth: '60ch', marginBottom: '1.25rem' }}>
              MOVE Utleige har agentur for Hertz bilutleige i Sogn og Førde. Med stasjonar på
              flyplassen i Sogndal og i Førde, og utleveringsstader på Kaupanger, AMFI Sogndal
              og Øyrane i Førde — når du oss når du treng det.
            </p>
            <p style={{ maxWidth: '60ch', marginBottom: '2.5rem' }}>
              Vil du ha bilen levert så kan me ordne det òg!
            </p>
          </FadeUp>
        </div>
      </section>

      {/* ── LOCATIONS ──────────────────────────────────────── */}
      <section className="section bg-surface">
        <div className="container">
          <FadeUp>
            <span className="label">Stasjonar</span>
            <h2 style={{ marginTop: '0.25rem', marginBottom: '2rem' }}>To lokasjonar</h2>
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
                gap: '1.25rem',
                marginBottom: '3rem',
              }}
            >
              {[
                { name: 'HERTZ SOGNDAL', note: 'Sogndal lufthamn, Haukåsen' },
                { name: 'HERTZ FØRDE',   note: 'Førde sentrum' },
              ].map((loc) => (
                <div
                  key={loc.name}
                  style={{
                    padding: '1.75rem 2rem',
                    background: 'var(--white)',
                    border: '1px solid rgba(0,0,0,0.07)',
                    borderRadius: '8px',
                    boxShadow: 'var(--shadow-card-rest)',
                  }}
                >
                  <p
                    style={{
                      fontSize: '0.6875rem',
                      fontWeight: 700,
                      letterSpacing: '0.16em',
                      textTransform: 'uppercase',
                      color: 'var(--orange)',
                      marginBottom: '0.375rem',
                    }}
                  >
                    {loc.name}
                  </p>
                  <p style={{ fontSize: '0.9375rem', color: 'var(--ink-light)', marginBottom: 0 }}>
                    {loc.note}
                  </p>
                </div>
              ))}
            </div>
          </FadeUp>

          {/* ── Fleet ─────────────────────────────────────── */}
          <FadeUp delay={80}>
            <span className="label">Flåte</span>
            <ul
              style={{
                listStyle: 'none',
                padding: 0,
                margin: '1rem 0 2.5rem',
                display: 'flex',
                flexDirection: 'column',
                gap: '0.625rem',
              }}
            >
              {[
                'Personbilar i alle klassar — inkludert heilelektriske bilar',
                'Varebilar i alle storleiker til flytting, frakting og hengar',
                'Bussar tilgjengeleg som 8, 9 og 17-seter',
              ].map((item) => (
                <li
                  key={item}
                  style={{
                    display: 'flex',
                    alignItems: 'flex-start',
                    gap: '0.75rem',
                    fontSize: '0.9375rem',
                    color: 'var(--ink)',
                  }}
                >
                  <span
                    style={{
                      width: 6,
                      height: 6,
                      borderRadius: '50%',
                      background: 'var(--orange)',
                      flexShrink: 0,
                      marginTop: '0.5rem',
                    }}
                  />
                  {item}
                </li>
              ))}
            </ul>
          </FadeUp>

          {/* ── Contact ───────────────────────────────────── */}
          <FadeUp delay={120}>
            <div
              style={{
                padding: '2rem',
                background: 'var(--white)',
                border: '1px solid rgba(0,0,0,0.07)',
                borderLeft: '2px solid var(--orange)',
                borderRadius: '8px',
                maxWidth: 480,
              }}
            >
              <p
                style={{
                  fontSize: '0.6875rem',
                  fontWeight: 700,
                  letterSpacing: '0.14em',
                  textTransform: 'uppercase',
                  color: 'var(--ink-light)',
                  marginBottom: '0.875rem',
                }}
              >
                Kontakt
              </p>
              <p style={{ fontWeight: 600, marginBottom: '0.25rem', color: 'var(--ink)' }}>
                Area Manager: Peter Sundberg
              </p>
              <address
                style={{
                  fontStyle: 'normal',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '0.25rem',
                  fontSize: '0.9375rem',
                  color: 'var(--ink-light)',
                  marginTop: '0.75rem',
                }}
              >
                <a href="tel:+4757677790" style={{ color: 'var(--blue)' }}>
                  Telefon: +47 57 67 77 90
                </a>
                <a href="mailto:sogndal@hertz.no" style={{ color: 'var(--blue)' }}>
                  E-post: sogndal@hertz.no
                </a>
                <a href="tel:+4797151687" style={{ color: 'var(--blue)' }}>
                  Mobil: +47 97 15 16 87
                </a>
              </address>
            </div>
          </FadeUp>
        </div>
      </section>
    </>
  );
}
