import type { Metadata } from 'next';
import Image from 'next/image';
import FadeUp from '@/components/ui/FadeUp';
import Icon from '@/components/ui/Icon';
import styles from './page.module.css';

export const metadata: Metadata = {
  title: 'Mobilitet — Toyota Sogn & Hertz Bilutleige',
  description:
    'MOVE Sogn er din portal til Toyota Sogn og Hertz bilutleige i Sogn. Lokal kunnskap, merkevarekvalitet.',
  openGraph: {
    images: [{ url: 'https://images.unsplash.com/photo-1617788138017-80ad40651399?w=1200&q=80', width: 1200, height: 630, alt: 'Toyota Sogn — MOVE Sogn' }],
  },
};

const brands = [
  {
    label: 'Toyota',
    title: 'Toyota Sogn',
    subtitle: 'Verdskjend kvalitet, lokal kunnskap',
    body: `Toyota Sogn AS er autorisert forhandlar av Toyota-køyretøy, både nye og brukte. 
    Me trur på krafta i innovasjon — her finn du det komplette utvalet av nye Toyota-bilar, 
    inkludert hybridar og heilelektriske modellar, pluss eit nøye gjennomgått utval av 
    brukte bilar i utmerka stand. Lokal service og oppfølging er hjørnesteinane i det me gjer.`,
    image: 'https://images.unsplash.com/photo-1617788138017-80ad40651399?w=1200&q=80',
    imageAlt: 'Toyota biler ved Toyota Sogn på Kaupanger',
    cta: 'Besøk Toyota Sogn',
    href: 'https://www.toyotasogn.no',
    imgLeft: false,
  },
  {
    label: 'Bilutleige',
    title: 'MOVE Bilutleige',
    subtitle: 'Alltid på farten — på dine premissar',
    body: `Med Hertz-bilutleige i Sogn og Sunnfjord driftar MOVE 100 bilar for korttidsleige 
    på fem stader på Vestlandet: Sogndal lufthamn Haukåsen, Kaupanger, Sogndal, Førde lufthamn 
    Bringeland og Førde sentrum. Konkurransedyktige prisar og eit breitt utval av bilar — 
    uansett kva du treng.`,
    image: 'https://images.unsplash.com/photo-1544636331-e26879cd4d9b?w=1200&q=80',
    imageAlt: 'Leigebil i fjordlandskap — MOVE Bilutleige',
    cta: 'Sjå leigetilbod',
    href: 'https://www.hertz.no',
    imgLeft: false,
  },
];

const values = [
  { icon: 'map-pin' as const, title: 'Lokal service', desc: 'Alltid nokon å ringe — me kjenner deg og ditt behov.' },
  { icon: 'award' as const, title: 'Merkevarekvalitet', desc: 'Toyota — dokumentert kvalitet og verdskjend teknologi.' },
  { icon: 'key' as const, title: 'Fleksibel utleige', desc: '100 leigebiler på fem stader i regionen.' },
  { icon: 'shield' as const, title: 'Garantert kvalitet', desc: 'Kvar bruktbil er gjennomgått og godkjent.' },
];

export default function MobilitetPage() {
  return (
    <>
      {/* ── HERO ────────────────────────────────────────────── */}
      <section className={styles.hero}>
        <div className={styles.heroBg}>
          <Image
            src="https://images.unsplash.com/photo-1486496572940-2bb2341fdbdf?w=1920&q=85"
            alt="Toyota på fjordveg i Sogn"
            fill
            priority
            sizes="100vw"
            style={{ objectFit: 'cover', objectPosition: 'center 55%' }}
          />
          <div className={styles.heroOverlay} />
        </div>
        <div className={`container ${styles.heroContent}`}>
          <FadeUp>
            <span className={styles.heroLabel}>Mobilitet</span>
            <h1 className={styles.heroH1}>Din bil. Vår lidenskap.</h1>
            <p className={styles.heroSub}>
              Toyota Sogn og Hertz bilutleige — lokal kunnskap og merkevarekvalitet i Sogn.
            </p>
          </FadeUp>
        </div>
      </section>

      {/* ── BRAND BLOCKS ─────────────────────────────────────── */}
      {brands.map((brand, i) => (
        <section key={brand.title} className={`section ${i % 2 === 0 ? '' : 'bg-surface'}`}>
          <div className={`container ${styles.brandSplit} ${brand.imgLeft ? styles.imgLeft : ''}`}>
            <FadeUp className={styles.brandImg}>
              <div className={styles.brandImgWrap}>
                <Image
                  src={brand.image}
                  alt={brand.imageAlt}
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  style={{ objectFit: 'cover' }}
                />
              </div>
            </FadeUp>
            <FadeUp delay={120} className={styles.brandText}>
              <span className="label">{brand.label}</span>
              <h2>{brand.title}</h2>
              <p className={styles.brandSubtitle}>{brand.subtitle}</p>
              <p className={styles.brandBody}>{brand.body}</p>
              <a
                href={brand.href}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn--outline-blue"
                style={{ marginTop: '2rem' }}
              >
                {brand.cta}
                <Icon name="external-link" size={14} />
              </a>
            </FadeUp>
          </div>
        </section>
      ))}

      {/* ── VALUES BAR ───────────────────────────────────────── */}
      <section className={`section--md bg-surface`}>
        <div className="container">
          <div className={styles.valuesGrid}>
            {values.map((v, i) => (
              <FadeUp key={v.title} delay={i * 60}>
                <div className={styles.valueCard}>
                  <span className={styles.valueIcon}><Icon name={v.icon} size={22} /></span>
                  <h3 className={styles.valueTitle}>{v.title}</h3>
                  <p className={styles.valueDesc}>{v.desc}</p>
                </div>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
