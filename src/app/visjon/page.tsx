import type { Metadata } from 'next';
import FadeUp from '@/components/ui/FadeUp';
import Icon from '@/components/ui/Icon';

export const metadata: Metadata = {
  title: 'Visjon — MOVE Sogn',
  description: 'MOVE Sogn betyr å skape utvikling, mobilitet og kjensler med base i Sogn. Les om visjonen vår og korleis me byggjer konsernet.',
};

const milestones = [
  { year: '1984', text: 'ANI Bil startar opp på Kaupanger i Sogn.' },
  { year: '2008', text: 'Selskapet skiftar namn til Toyota Sogn AS.' },
  { year: '2011', text: 'Investering i Bilhuset Førde AS — utvida portefølje.' },
  { year: '2021', text: 'Historisk rekordår: over 900 leverte bilar. Nye moderne lokale på Øyrane i Førde.' },
  { year: 'I dag', text: '60 medarbeidarar. Marine, el-mobilitet, bilutleige og eigedom — under same tak.' },
];

const portfolio = [
  {
    category: 'Bil',
    items: ['Toyota Sogn AS', 'Bilhuset Førde AS', 'Hertz bilutleige (100 bilar)', 'Skadesenteret Sogn'],
  },
  {
    category: 'Marine',
    items: ['Autorisert Suzuki båtmotor-forhandlar', 'Summerfun — Hasle', 'Silver Boats'],
  },
  {
    category: 'El-mobilitet',
    items: ['NIU el-mopedscooterar', 'Merida el-syklar', 'NIU sparkesykkel'],
  },
  {
    category: 'Eigedom',
    items: ['Casa Banderas — Costa del Sol', 'Konserneigedommar i Sogn'],
  },
];

export default function VisjonPage() {
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
          background: 'radial-gradient(ellipse 70% 80% at 80% 50%, rgba(255,132,33,0.05) 0%, transparent 70%)',
        }} />
        <div className="container" style={{ position: 'relative' }}>
          <FadeUp>
            <span className="label" style={{ color: 'var(--color-orange)' }}>MOVE · Visjon</span>
            <h1 style={{
              marginTop: '0.5rem', marginBottom: '1rem',
              color: 'var(--color-white)',
              fontSize: 'clamp(2rem,5vw,3.5rem)',
              fontWeight: 800, letterSpacing: '-0.03em',
            }}>
              Å MOVE Sogn.
            </h1>
            <p style={{ fontSize: 'var(--text-body-lg)', maxWidth: '52ch', color: 'rgba(250,250,248,0.62)', fontWeight: 300 }}>
              Vår drivkraft er å skape utvikling, mobilitet og kjensler med base i Sogn.
            </p>
          </FadeUp>
        </div>
      </section>

      <div style={{ height: 2, background: 'linear-gradient(90deg, var(--color-orange), var(--color-blue))' }} />

      {/* ── Mission statement ─────────────────────────────── */}
      <section className="section">
        <div className="container">
          <div style={{ maxWidth: '68ch', marginInline: 'auto' }}>
            <FadeUp>
              <span className="label">Formål</span>
              <h2 style={{ marginTop: '0.5rem', marginBottom: '1.5rem', letterSpacing: '-0.02em' }}>
                «MOVE kan stå for både mobilitet og kjensler.»
              </h2>
              <p style={{ lineHeight: 1.85, color: 'var(--color-body)', fontWeight: 300, fontSize: '1.0625rem', marginBottom: '1.25rem' }}>
                MOVE Sogn betyr å skape utvikling, mobilitet og kjensler med base i Sogn. Det er 40 år sidan ANI Bil starta opp, og 15 år sidan dagens eigarar kjøpte ut førre generasjon og starta ei ny reise.
              </p>
              <p style={{ lineHeight: 1.85, color: 'var(--color-body)', fontWeight: 300, fontSize: '1.0625rem', marginBottom: '1.25rem' }}>
                I 2008 endra me namnet til Toyota Sogn AS. Toyota står for dei same verdiane som me prøver å etterleve: respekt for menneske, samarbeid og «kunden først».
              </p>
              <p style={{ lineHeight: 1.85, color: 'var(--color-body)', fontWeight: 300, fontSize: '1.0625rem' }}>
                I dag er MOVE-konsernet ein av dei leiande aktørane for mobilitet i Sogn og Sunnfjord — med Toyota som det sentrale merket og ei stadig breiare portefølje av tenester.
              </p>
            </FadeUp>
          </div>
        </div>
      </section>

      {/* ── Milestones ────────────────────────────────────── */}
      <section className="section bg-surface">
        <div className="container">
          <FadeUp>
            <span className="label">Milepælar</span>
            <h2 style={{ marginTop: '0.5rem', marginBottom: '2.5rem', letterSpacing: '-0.02em' }}>Reisa vår</h2>
          </FadeUp>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', maxWidth: '56ch' }}>
            {milestones.map((m, i) => (
              <FadeUp key={m.year} delay={i * 60}>
                <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'flex-start' }}>
                  <span style={{
                    fontFamily: 'var(--f-mono)',
                    fontSize: '0.75rem', fontWeight: 700,
                    color: 'var(--color-orange)',
                    letterSpacing: '0.06em',
                    minWidth: '3.5rem',
                    paddingTop: '0.2rem',
                    flexShrink: 0,
                  }}>{m.year}</span>
                  <p style={{ lineHeight: 1.7, color: 'var(--color-body)', fontWeight: 300, margin: 0 }}>{m.text}</p>
                </div>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      {/* ── Portfolio overview ────────────────────────────── */}
      <section className="section">
        <div className="container">
          <FadeUp>
            <span className="label">Konsernoverikt</span>
            <h2 style={{ marginTop: '0.5rem', marginBottom: '2.5rem', letterSpacing: '-0.02em' }}>
              60 medarbeidarar. Fire søyler.
            </h2>
          </FadeUp>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
            gap: '1.5rem',
          }}>
            {portfolio.map((cat, i) => (
              <FadeUp key={cat.category} delay={i * 60}>
                <div style={{
                  background: 'var(--color-white)',
                  borderRadius: 'var(--r-lg)',
                  padding: '1.5rem',
                  border: '1px solid rgba(0,0,0,0.07)',
                }}>
                  <span style={{
                    display: 'block',
                    fontFamily: 'var(--f-mono)',
                    fontSize: '0.625rem',
                    fontWeight: 700,
                    letterSpacing: '0.14em',
                    textTransform: 'uppercase',
                    color: 'var(--color-orange)',
                    marginBottom: '0.75rem',
                  }}>{cat.category}</span>
                  <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                    {cat.items.map((item) => (
                      <li key={item} style={{ display: 'flex', alignItems: 'center', gap: '0.625rem', fontSize: '0.875rem', color: 'var(--color-body)' }}>
                        <span style={{ width: 4, height: 4, borderRadius: '50%', background: 'var(--color-blue)', flexShrink: 0, display: 'inline-block' }} />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      {/* ── Values ────────────────────────────────────────── */}
      <section className="section bg-surface">
        <div className="container">
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
            gap: '2rem',
          }}>
            {[
              { icon: 'home' as const, title: 'Lokal forankring', desc: 'Me er sogningar som investerer i Sogn. Pengane sirkulerer lokalt — til lag, foreiningar og nærmiljø.' },
              { icon: 'users' as const, title: 'Langsiktig tillit', desc: 'Kundane kjem tilbake fordi dei veit at me er her — ikkje berre i dag, men i neste tiår og.' },
              { icon: 'leaf' as const, title: 'Berekraft', desc: 'Frå el-syklar og hybrider til digital effektivisering — me tek steg mot ein grønare kvardag.' },
            ].map((v, i) => (
              <FadeUp key={v.title} delay={i * 80}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                  <span style={{
                    width: 40, height: 40, borderRadius: 'var(--r-sm)',
                    background: 'rgba(255,132,33,0.1)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    color: 'var(--color-orange)',
                  }}>
                    <Icon name={v.icon} size={18} />
                  </span>
                  <h3 style={{ margin: 0, fontSize: '1rem', fontWeight: 700 }}>{v.title}</h3>
                  <p style={{ margin: 0, fontSize: '0.875rem', color: 'var(--color-muted)', lineHeight: 1.7 }}>{v.desc}</p>
                </div>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
