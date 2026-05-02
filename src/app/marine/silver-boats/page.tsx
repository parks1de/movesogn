import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { sanityFetch } from '@/lib/sanity';
import FadeUp from '@/components/ui/FadeUp';
import Icon from '@/components/ui/Icon';
import ContactForm from '@/components/ui/ContactForm';
import styles from '../../sykkel/page.module.css';

interface SilverBoat {
  slug: string;
  model_name: string;
  tagline: string;
  price_from: string;
  image: string;
  body: string;
  lengde?: string;
  maxPersonar?: string;
  motor?: string;
}

export const revalidate = 300;

export const metadata: Metadata = {
  title: 'Silver Boats — Marine | MOVE Sogn',
  description: 'Solide aluminiumsbåtar frå Finland. Silver Beaver BR og Silver Hawk BR — skapt for norske farvatn. Autorisert forhandlar på Kaupanger.',
  openGraph: {
    images: [{ url: '/images/silver/sv-01.jpg', width: 1200, height: 630, alt: 'Silver Boats — MOVE Sogn Marine' }],
  },
};

const placeholderBoats: SilverBoat[] = [
  {
    slug: 'silver-beaver-br',
    model_name: 'Silver Beaver BR',
    tagline: 'Smidig og romsleg — perfekt for nybyrjar og erfaren båteigar.',
    price_from: '239 000',
    image: '/images/silver/sv-01.jpg',
    body: 'Silvers minste modell og storfavoritt. Solide aluminiumsskrog og god stabilitet.',
    lengde: '4,80 m', maxPersonar: '6', motor: 'Suzuki 50 hk',
  },
  {
    slug: 'silver-hawk-br',
    model_name: 'Silver Hawk BR',
    tagline: 'Familiebåten for Sognefjorden — trygg, rask og komfortabel.',
    price_from: '379 000',
    image: '/images/silver/sv-03.jpg',
    body: 'Populær storfavoritt i ny versjon frå 2019. Nytt skrog, nytt interiør og nye konsollar.',
    lengde: '5,30 m', maxPersonar: '7', motor: 'Suzuki 90 hk',
  },
];

const QUERY = `*[_type=="marineBoat" && brand == "silver"] | order(order asc) {
  "slug": slug.current, "model_name": modelName, tagline, "price_from": priceFrom,
  "image": image.asset->url, body,
  "lengde": batSpecs.lengde,
  "maxPersonar": batSpecs.maxPersonar,
  "motor": batSpecs.tilraaddMotor
}`;

const valueProps = [
  { icon: 'shield'  as const, title: 'Aluminium skrog',      desc: 'Sveiset aluminium for maksimal styrke og lang levetid.' },
  { icon: 'anchor'  as const, title: 'Nordisk design',        desc: 'Designa og produsert i Finland for nordiske tilhøve.' },
  { icon: 'compass' as const, title: 'Suzuki-motor inkl.',    desc: 'Alle modellar kjem med autorisert Suzuki-motor.' },
];

export default async function SilverBoatsPage() {
  let boats = placeholderBoats;
  try {
    const f = await sanityFetch<SilverBoat[]>(QUERY);
    if (f.length > 0) boats = f;
  } catch {}

  return (
    <>
      {/* ── Hero ─────────────────────────────────────────── */}
      <section className={styles.hero}>
        <div className={styles.heroBg}>
          <Image
            src="/images/silver/sv-02.jpg"
            alt="Silver Boats — MOVE Sogn Marine"
            fill
            priority
            sizes="100vw"
            style={{ objectFit: 'cover', objectPosition: 'center 50%' }}
          />
          <div className={styles.heroOverlay} />
        </div>
        <div className={`container ${styles.heroContent}`}>
          <FadeUp>
            <span className={styles.heroLabel}>Marine · Silver Boats</span>
            <h1 className={styles.heroH1}>
              Aluminium for fjorden.
            </h1>
            <p className={styles.heroSub}>
              Solide Silver-båtar frå Finland — robuste, stilreine og skapt for norske farvatn.
            </p>
          </FadeUp>
        </div>
      </section>

      {/* ── Boats grid ───────────────────────────────────── */}
      <section className="section">
        <div className="container">
          <FadeUp>
            <span className="label">Modellar</span>
            <h2 className={styles.sectionH2}>Våre Silver-modellar</h2>
          </FadeUp>
          <div className={styles.productGrid}>
            {boats.map((boat, i) => (
              <FadeUp key={boat.slug} delay={i * 70}>
                <BoatCard boat={boat} />
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      {/* ── Value props ──────────────────────────────────── */}
      <section className="section bg-surface">
        <div className="container">
          <div className={styles.valueGrid}>
            {valueProps.map((v, i) => (
              <FadeUp key={v.title} delay={i * 60}>
                <div className={styles.valueCard}>
                  <span className={styles.valueIcon}><Icon name={v.icon} size={20} /></span>
                  <h3>{v.title}</h3>
                  <p>{v.desc}</p>
                </div>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      {/* ── Gallery ──────────────────────────────────────── */}
      <section className="section">
        <div className="container">
          <FadeUp>
            <span className="label">Galleri</span>
            <h2 className={styles.sectionH2}>Silver på sjøen</h2>
          </FadeUp>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '0.5rem', marginTop: '2rem' }}>
            {['/images/silver/sv-04.jpg', '/images/silver/sv-05.jpg', '/images/silver/sv-06.jpg'].map((src, i) => (
              <FadeUp key={i} delay={i * 60}>
                <div style={{ position: 'relative', aspectRatio: '4/3', borderRadius: 'var(--r-md)', overflow: 'hidden' }}>
                  <Image
                    src={src}
                    alt={`Silver Boats — ${i + 1}`}
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    style={{ objectFit: 'cover' }}
                  />
                </div>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      {/* ── Contact ──────────────────────────────────────── */}
      <section className="section bg-surface">
        <div className="container">
          <ContactForm
            formType="marine"
            heading="Spør om Silver Boats"
            subheading="Ta kontakt for prisar, tilgjengelegheit og tilpassa utstyrspakkar."
          />
        </div>
      </section>
    </>
  );
}

function BoatCard({ boat }: { boat: SilverBoat }) {
  const imgSrc = boat.image || '/images/silver/sv-01.jpg';
  return (
    <Link href={`/marine/${boat.slug}`} className={`card ${styles.productCard}`}>
      <div className={`img-fill ${styles.productImg}`}>
        <Image
          src={imgSrc}
          alt={boat.model_name}
          fill
          sizes="(max-width: 768px) 100vw, 50vw"
          style={{ objectFit: 'cover' }}
        />
      </div>
      <div className={styles.productBody}>
        <h3 className={styles.productName}>{boat.model_name}</h3>
        <div className={styles.productMeta}>
          {boat.lengde && <span>{boat.lengde}</span>}
          {boat.maxPersonar && <span> · opptil {boat.maxPersonar} personar</span>}
        </div>
        {boat.motor && (
          <p style={{ fontSize: '0.8125rem', color: 'var(--color-muted)', margin: '0.25rem 0 0' }}>
            {boat.motor}
          </p>
        )}
        <div className={styles.productFooter}>
          <strong className={styles.productPrice}>
            {boat.price_from === 'Kontakt oss' ? 'Kontakt oss' : `Frå kr ${boat.price_from},-`}
          </strong>
          <span className={styles.productCta}>Sjå meir →</span>
        </div>
      </div>
    </Link>
  );
}
