import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { sanityFetch } from '@/lib/sanity';
import FadeUp from '@/components/ui/FadeUp';
import Icon from '@/components/ui/Icon';
import ContactForm from '@/components/ui/ContactForm';
import styles from '../../sykkel/page.module.css';
import pageStyles from './page.module.css';

interface SuzukiEngine {
  slug: string;
  modelName: string;
  hp: string;
  type: string;
  price_from: string;
  image: string;
  description: string;
  inStock: boolean;
}

export const revalidate = 300;

export const metadata: Metadata = {
  title: 'Suzuki Båtmotor — Marine | MOVE Sogn',
  description: 'Autorisert Suzuki-forhandlar og -verkstad på Kaupanger. Sal av nye motorar, service og bestilling av alle Suzuki-motormodellar.',
  openGraph: {
    images: [{ url: '/images/suzuki/sz-01.png', width: 1200, height: 630, alt: 'Suzuki Båtmotor — MOVE Sogn' }],
  },
};

const placeholderEngines: SuzukiEngine[] = [
  { slug: 'df9-9', modelName: 'DF9.9B', hp: '9,9 hk', type: 'EFI · Lean Burn', price_from: '18 900', image: '/images/suzuki/sz-01.png', description: 'Lett og kompakt med elektronisk bensininnsprøytning. Elektrisk start og manuell start. Vekt frå 44 kg.', inStock: true },
  { slug: 'df20',  modelName: 'DF20A',  hp: '20 hk',  type: 'EFI · Lean Burn', price_from: '29 900', image: '/images/suzuki/sz-01.png', description: 'Kraftig og drivstoffeffektiv. To sylindrar og EFI gir mjuk drift og lågt forbruk.', inStock: true },
  { slug: 'df40',  modelName: 'DF40A',  hp: '40 hk',  type: 'EFI · DOHC',     price_from: '52 000', image: '/images/suzuki/sz-02.jpg', description: 'Populær mellomklassebimotor med DOHC-teknologi og Lean Burn. Ideell for mellomstore båtar.', inStock: true },
  { slug: 'df90',  modelName: 'DF90A',  hp: '90 hk',  type: 'EFI · DOHC',     price_from: '109 000', image: '/images/suzuki/sz-03.jpg', description: 'Kraftig og stillegåande motor for større fritidsbåtar. Lean Burn og Oxygen Sensor for optimalt drivstofforbruk.', inStock: true },
];

const QUERY = `*[_type=="suzukiEngine"] | order(order asc) {
  "slug": slug.current, modelName, hp, type, "price_from": priceFrom,
  "image": image.asset->url, description, inStock
}`;

export default async function SuzukiBatmotorPage() {
  let engines = placeholderEngines;
  try {
    const f = await sanityFetch<SuzukiEngine[]>(QUERY);
    if (f.length > 0) engines = f;
  } catch {}

  return (
    <>
      {/* ── Hero ─────────────────────────────────────────── */}
      <section className={styles.hero}>
        <div className={styles.heroBg}>
          <Image
            src="/images/suzuki/sz-02.jpg"
            alt="Suzuki Båtmotor — MOVE Sogn"
            fill
            priority
            sizes="100vw"
            style={{ objectFit: 'cover', objectPosition: 'center 40%' }}
          />
          <div className={styles.heroOverlay} />
        </div>
        <div className={`container ${styles.heroContent}`}>
          <FadeUp>
            <span className={styles.heroLabel}>Marine · Suzuki</span>
            <h1 className={styles.heroH1}>
              Suzuki Båtmotor.
            </h1>
            <p className={styles.heroSub}>
              Autorisert forhandlar og verkstad på Kaupanger — alle modellar frå 9,9 til 300 hk.
            </p>
          </FadeUp>
        </div>
      </section>

      {/* ── Engine models ────────────────────────────────── */}
      <section className="section">
        <div className="container">
          <FadeUp>
            <span className="label">På lager</span>
            <h2 className={styles.sectionH2}>Motorar i lager</h2>
          </FadeUp>
          <div className={styles.productGrid}>
            {engines.map((engine, i) => (
              <FadeUp key={engine.slug} delay={i * 60}>
                <EngineCard engine={engine} />
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      {/* ── All models info ──────────────────────────────── */}
      <section className="section bg-surface">
        <div className="container">
          <div className={pageStyles.infoGrid}>
            <FadeUp>
              <span className="label">Autorisert forhandlar</span>
              <h2>Vi skaffe alle Suzuki-motorar.</h2>
              <p style={{ marginTop: '1rem', marginBottom: '1.5rem', color: 'var(--color-muted)', lineHeight: 1.75, maxWidth: '48ch' }}>
                Som autorisert Suzuki-forhandlar kan me skaffe alle motorar i Suzuki sin katalog — frå 2,5 hk
                portablar til kraftige 300 hk firetak-motorar. Ta kontakt med ønskt modell og me finn
                beste løysing for din båt.
              </p>
              <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: '0.625rem', marginBottom: '2rem' }}>
                {['Alle modellår tilgjengeleg på bestilling', 'EFI, DOHC og Lean Burn teknologi', 'Faglært service og garantiarbeid', 'Originale Suzuki-delar og -tilbehøyr'].map(item => (
                  <li key={item} style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', fontSize: '0.9375rem' }}>
                    <span style={{ width: 5, height: 5, borderRadius: '50%', background: 'var(--color-blue)', flexShrink: 0, display: 'inline-block' }} />
                    {item}
                  </li>
                ))}
              </ul>
              <Link href="/kontakt" className="btn btn--outline-blue">
                Ta kontakt
                <Icon name="arrow-right" size={16} />
              </Link>
            </FadeUp>
            <FadeUp delay={100}>
              <div style={{ position: 'relative', aspectRatio: '4/3', borderRadius: 'var(--r-lg)', overflow: 'hidden' }}>
                <Image
                  src="/images/suzuki/sz-03.jpg"
                  alt="Suzuki DF150 påhengarsmotor"
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  style={{ objectFit: 'cover' }}
                />
              </div>
            </FadeUp>
          </div>
        </div>
      </section>

      {/* ── Maintenance booking ──────────────────────────── */}
      <section className="section" id="service">
        <div className="container">
          <FadeUp>
            <span className="label">Service &amp; vedlikehald</span>
            <h2 style={{ marginBottom: '0.5rem' }}>Bestill service på båtmotoren din.</h2>
            <p style={{ color: 'var(--color-muted)', maxWidth: '52ch', marginBottom: '2.5rem', lineHeight: 1.7 }}>
              Autorisert Suzuki-verkstad med faglærde mekanikarar. Me tar alle merke — Suzuki, Yamaha, Mercury, Honda og fleire.
            </p>
          </FadeUp>
          <div style={{ maxWidth: 680, marginInline: 'auto' }}>
            <FadeUp delay={80}>
              <div style={{ background: 'var(--color-white)', borderRadius: 'var(--r-lg)', padding: '3rem', boxShadow: '0 2px 8px rgba(13,14,15,0.06)' }}>
                <ContactForm
                  formType="maintenance"
                  heading="Servicebestilling"
                  subheading="Fyll ut skjemaet så tar me kontakt og avtalar tidspunkt."
                />
              </div>
            </FadeUp>
          </div>
        </div>
      </section>
    </>
  );
}

function EngineCard({ engine }: { engine: SuzukiEngine }) {
  const imgSrc = engine.image || '/images/suzuki/sz-01.png';
  return (
    <div className={`card ${styles.productCard}`} style={{ cursor: 'default' }}>
      <div className={`img-fill ${styles.productImg}`} style={{ background: 'var(--color-surface)' }}>
        <Image
          src={imgSrc}
          alt={engine.modelName}
          fill
          sizes="(max-width: 768px) 100vw, 33vw"
          style={{ objectFit: 'contain', padding: '1rem' }}
        />
        {engine.inStock && (
          <span style={{
            position: 'absolute', top: '0.75rem', left: '0.75rem',
            background: 'rgba(34,197,94,0.9)', color: 'white',
            fontSize: '0.6875rem', fontWeight: 700, letterSpacing: '0.08em',
            padding: '0.2rem 0.625rem', borderRadius: 99, textTransform: 'uppercase',
          }}>På lager</span>
        )}
      </div>
      <div className={styles.productBody}>
        <h3 className={styles.productName}>{engine.modelName}</h3>
        <div className={styles.productMeta}>{engine.hp} · {engine.type}</div>
        <p className={styles.productDesc}>{(engine.description ?? '').slice(0, 90)}…</p>
        <div className={styles.productFooter}>
          <strong className={styles.productPrice}>Frå kr {engine.price_from},-</strong>
          <a href="#service" className={styles.productCta} style={{ cursor: 'pointer' }}>Bestill service →</a>
        </div>
      </div>
    </div>
  );
}
