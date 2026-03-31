import type { Metadata } from 'next';
import Image from 'next/image';
import { fetchTimeline, type TimelineEntry } from '@/lib/sheets';
import FadeUp from '@/components/ui/FadeUp';
import Icon from '@/components/ui/Icon';
import styles from './page.module.css';

export const metadata: Metadata = {
  title: 'Om oss — 40 år med rørsle i Sogn',
  description:
    'MOVE Sogn har røter heilt tilbake til 1984. Les historia om ANI Bil, Toyota Sogn og reisa til dagens MOVE-konsern med 60 medarbeidarar.',
  openGraph: {
    images: [{ url: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1200&q=80', width: 1200, height: 630, alt: 'Sognefjorden — MOVE Sogn' }],
  },
};

export const revalidate = 3600;

const placeholderTimeline: TimelineEntry[] = [
  { order: '1', year: '1984', headline: 'ANI Bil startar opp', description: 'Grunnlaget for det som skulle bli MOVE Sogn vert lagt på Kaupanger i Sogn.' },
  { order: '2', year: '2008', headline: 'Toyota Sogn AS', description: 'Selskapet skiftar namn til Toyota Sogn AS og forsterkar merkevaresatsinga.' },
  { order: '3', year: '2011', headline: 'Vekst og ekspansjon', description: 'MOVE utvider porteføljen og bygger eit sterkare konsern — fleire merke, fleire stader, meir til kundane.' },
  { order: '4', year: '2021', headline: 'Rekordår', description: 'Historisk høge tal for Sogn: over 900 leverte bilar. Hertz-utleige, marine og eigedom under same tak.' },
  { order: '5', year: 'I dag', headline: 'MOVE Sogn', description: '60 medarbeidarar, over 900 bilar, Hertz-utleige, båt, el-syklar og eigedom — alt under MOVE.' },
];

const values = [
  {
    icon: 'home' as const,
    title: 'Lokal forankring',
    desc: 'Me er sogningar som investerer i Sogn. Pengane sirkulerer lokalt — til lag, foreiningar og nærmiljø.',
  },
  {
    icon: 'users' as const,
    title: 'Langsiktig tillit',
    desc: 'Kundane kjem tilbake fordi dei veit at me er her — ikkje berre i dag, men i neste tiår og.',
  },
  {
    icon: 'leaf' as const,
    title: 'Berekraft',
    desc: 'Frå el-syklar og hybrider til digital effektivisering — me tek steg mot ein grønare kvardag.',
  },
];

export default async function OmOssPage() {
  let timeline: TimelineEntry[] = placeholderTimeline;
  try {
    const fetched = await fetchTimeline();
    if (fetched.length > 0) timeline = fetched;
  } catch {}

  return (
    <>
      {/* ── HERO ────────────────────────────────────────────── */}
      <section className={styles.hero}>
        <div className={styles.heroBg}>
          <Image
            src="/images/om-oss-hero.png"
            alt="MOVE Sogn — fasade på Kaupanger"
            fill
            priority
            sizes="100vw"
            style={{ objectFit: 'cover', objectPosition: 'center 40%' }}
          />
          <div className={styles.heroOverlay} />
        </div>
        <div className={styles.heroGhost} aria-hidden="true">MOVE</div>
        <div className={`container ${styles.heroContent}`}>
          <FadeUp>
            <span className={styles.heroLabel}>Om MOVE</span>
            <h1 className={styles.heroH1}>40 år med rørsle i Sogn.</h1>
          </FadeUp>
        </div>
      </section>

      {/* ── FOUNDING STORY ───────────────────────────────────── */}
      <section className="section">
        <div className="container">
          <div className={styles.storyWrap}>
            <FadeUp>
              <span className="label">Historia</span>
              <h2 className={styles.storyH2}>Frå ANI Bil til MOVE</h2>
            </FadeUp>
            <FadeUp delay={80}>
              <p>
                Vår drivkraft er å «MOVE» Sogn — å skape utvikling, mobilitet og kjensler med
                base i Sogn. Det er 40 år sidan ANI Bil starta opp, og 15 år sidan dagens eigarar
                kjøpte ut førre generasjon og starta ei ny reise. Alle dei gode kundeopplevingane,
                dyktige medarbeidarane og den gode kulturen fekk me på kjøpet.
              </p>
              <p>
                I 2008 endra me namnet til Toyota Sogn AS. Toyota står for dei same verdiane som
                me prøver å etterleve: respekt for menneske, samarbeid og «kunden først».
              </p>
              <p>
                Gjennom konsekvent satsing på kvalitet og lokal forankring har MOVE vakse til
                å bli ein av dei leiande aktørane for mobilitet i Sogn — med Toyota som det
                sentrale merket og ei stadig breiare portefølje av tenester.
              </p>
              <p>
                Totalt har MOVE-konsernet i dag 60 medarbeidarar og leverte over 900 nye og brukte
                bilar i 2021. Det er historisk høge tal for både Sogn og Sunnfjord. Vårt grunnlag
                er å ha dei mest fornøgde kundane — det går aldri av moten.
              </p>
            </FadeUp>
          </div>
        </div>
      </section>

      {/* ── TIMELINE ─────────────────────────────────────────── */}
      <section className={`section bg-surface`}>
        <div className="container">
          <FadeUp className="text-center mb-8">
            <span className="label">Milepælar</span>
            <h2>Reisa vår</h2>
          </FadeUp>

          <div className={styles.timeline}>
            {timeline.map((entry, i) => (
              <FadeUp key={entry.year} delay={i * 80} className={styles.timelineItem}>
                <div className={styles.timelineDot} />
                <div className={styles.timelineContent}>
                  <span className={styles.timelineYear}>{entry.year}</span>
                  <h3 className={styles.timelineHeadline}>{entry.headline}</h3>
                  <p className={styles.timelineDesc}>{entry.description}</p>
                </div>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      {/* ── VISION PULLQUOTE ─────────────────────────────────── */}
      <section className={styles.visionSection}>
        <div className="container text-center">
          <FadeUp>
            <p className={styles.visionQuote}>
              "MOVE kan stå for både mobilitet og kjensler.<br />
              Ja takk, begge deler. Vårt mål er å MOVE Sogn."
            </p>
            <p className={styles.visionAttrib}>— MOVE Sogn AS</p>
          </FadeUp>
        </div>
      </section>

      {/* ── VALUES ───────────────────────────────────────────── */}
      <section className="section">
        <div className="container">
          <FadeUp className="text-center" style={{ marginBottom: '3rem' }}>
            <span className="label">Verdiar</span>
            <h2>Kva me trur på</h2>
          </FadeUp>
          <div className={styles.valuesGrid}>
            {values.map((v, i) => (
              <FadeUp key={v.title} delay={i * 80}>
                <div className={styles.valueCard}>
                  <span className={styles.valueIcon}><Icon name={v.icon} size={22} /></span>
                  <h3>{v.title}</h3>
                  <p>{v.desc}</p>
                </div>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
