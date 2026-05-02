import type { Metadata } from 'next';
import FadeUp from '@/components/ui/FadeUp';

export const metadata: Metadata = {
  title: 'Hertz Bilutleige | MOVE Sogn',
  description: 'MOVE Utleige — Hertz ANI Utleige med stasjonar på fem stader i Sogn og Sunnfjord. Lei personbil, varebil eller buss.',
  openGraph: {
    images: [{ url: 'https://images.unsplash.com/photo-1544636331-e26879cd4d9b?w=1200&q=80', width: 1200, height: 630, alt: 'Hertz Bilutleige — MOVE Sogn' }],
  },
};

const locations = [
  { name: 'Kaupanger sentrum',  note: 'Skarpeteigvegen 1, 6854 Kaupanger' },
  { name: 'Kaupanger lufthamn', note: 'Sogndal lufthamn, Haukåsen' },
  { name: 'Sogndal sentrum',    note: 'Sogndal sentrum' },
  { name: 'Førde sentrum',      note: 'Førde sentrum' },
  { name: 'Førde flyplass',     note: 'Bringeland lufthamn, Førde' },
];

export default function HertzPage() {
  return (
    <>
      {/* ── HEADER ─────────────────────────────────────────── */}
      <section style={{ paddingTop: 'calc(var(--nav-height) + 5rem)', paddingBottom: '4rem', background: 'var(--slate)', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', background: 'radial-gradient(ellipse 60% 70% at 75% 50%, rgba(4,95,208,0.07) 0%, transparent 70%)' }} />
        <div className="container" style={{ position: 'relative' }}>
          <FadeUp>
            <span className="label" style={{ color: 'var(--color-orange)' }}>Bilutleige</span>
            <h1 style={{ marginTop: '0.5rem', marginBottom: '1rem', color: 'var(--color-white)', fontSize: 'clamp(2rem,5vw,3.5rem)', fontWeight: 800, letterSpacing: '-0.03em' }}>
              Hertz ANI Utleige.
            </h1>
            <p style={{ fontSize: 'var(--text-body-lg)', maxWidth: '56ch', color: 'rgba(250,250,248,0.62)', fontWeight: 300 }}>
              Fem stasjonar i Sogn og Sunnfjord — alltid nær deg. Levering heim på førespurnad.
            </p>
          </FadeUp>
        </div>
      </section>

      <div style={{ height: 2, background: 'linear-gradient(90deg, var(--color-blue), var(--color-orange))' }} />

      {/* ── LOCATIONS ──────────────────────────────────────── */}
      <section className="section">
        <div className="container">
          <FadeUp>
            <span className="label">Stasjonar</span>
            <h2 style={{ marginTop: '0.25rem', marginBottom: '2rem' }}>Fem stader — alltid nær deg</h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1rem', marginBottom: '3rem' }}>
              {locations.map((loc) => (
                <div key={loc.name} style={{
                  padding: '1.5rem 1.75rem',
                  background: 'var(--color-white)',
                  border: '1px solid rgba(0,0,0,0.07)',
                  borderTop: '2px solid var(--color-orange)',
                  borderRadius: 'var(--r-md)',
                  boxShadow: '0 1px 4px rgba(13,14,15,0.05)',
                }}>
                  <p style={{ fontSize: '0.6875rem', fontWeight: 700, letterSpacing: '0.16em', textTransform: 'uppercase', color: 'var(--color-orange)', marginBottom: '0.375rem' }}>
                    {loc.name}
                  </p>
                  <p style={{ fontSize: '0.9rem', color: 'var(--color-muted)', margin: 0 }}>
                    {loc.note}
                  </p>
                </div>
              ))}
            </div>
          </FadeUp>

          {/* ── Fleet ─────────────────────────────────────── */}
          <FadeUp delay={80}>
            <span className="label">Flåte</span>
            <ul style={{ listStyle: 'none', padding: 0, margin: '1rem 0 2.5rem', display: 'flex', flexDirection: 'column', gap: '0.625rem' }}>
              {[
                'Personbilar i alle klassar — inkludert heilelektriske bilar',
                'Varebilar i alle storleiker til flytting, frakting og hengar',
                'Bussar tilgjengeleg som 8, 9 og 17-seter',
              ].map((item) => (
                <li key={item} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.75rem', fontSize: '0.9375rem', color: 'var(--color-body)' }}>
                  <span style={{ width: 6, height: 6, borderRadius: '50%', background: 'var(--color-orange)', flexShrink: 0, marginTop: '0.5rem' }} />
                  {item}
                </li>
              ))}
            </ul>
          </FadeUp>

          {/* ── Contact ───────────────────────────────────── */}
          <FadeUp delay={120}>
            <div style={{ padding: '2rem', background: 'var(--color-white)', border: '1px solid rgba(0,0,0,0.07)', borderLeft: '2px solid var(--color-orange)', borderRadius: 'var(--r-md)', maxWidth: 480 }}>
              <p style={{ fontSize: '0.6875rem', fontWeight: 700, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--color-muted)', marginBottom: '0.875rem' }}>
                Kontakt
              </p>
              <p style={{ fontWeight: 600, marginBottom: '0.25rem', color: 'var(--color-body)' }}>
                Area Manager: Peter Sundberg
              </p>
              <address style={{ fontStyle: 'normal', display: 'flex', flexDirection: 'column', gap: '0.25rem', fontSize: '0.9375rem', color: 'var(--color-muted)', marginTop: '0.75rem' }}>
                <a href="tel:+4757677790" style={{ color: 'var(--color-blue)' }}>Telefon: +47 57 67 77 90</a>
                <a href="mailto:sogndal@hertz.no" style={{ color: 'var(--color-blue)' }}>E-post: sogndal@hertz.no</a>
                <a href="tel:+4797151687" style={{ color: 'var(--color-blue)' }}>Mobil: +47 97 15 16 87</a>
              </address>
            </div>
          </FadeUp>
        </div>
      </section>
    </>
  );
}
