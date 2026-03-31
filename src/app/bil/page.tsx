import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import FadeUp from '@/components/ui/FadeUp';
import Icon from '@/components/ui/Icon';
import styles from './page.module.css';

export const metadata: Metadata = {
  title: 'Bil — Toyota, bruktbil, Hertz og Lexus | MOVE Sogn',
  description: 'MOVE Sogn tilbyr Toyota, bruktbilar, Hertz bilutleige og Lexus bruktbil i Sogn. Besøk oss på Kaupanger.',
};

// TODO: [SANITY] Fetch bil-section intro from CMS (type: bilPageHero)
const bilBrands = [
  {
    label: 'Bil',
    title: 'Toyota Sogn',
    desc: 'Verdskjend kvalitet og lokal kunnskap — nye og brukte Toyota på Kaupanger.',
    image: 'https://images.unsplash.com/photo-1617788138017-80ad40651399?w=900&q=80',
    href: 'https://www.toyotasogn.no',
    external: true,
    cta: 'Besøk Toyota Sogn',
  },
  {
    label: 'Bruktbil',
    title: 'Bruktbilar',
    desc: 'Stort utval av kvalitetssikra bruktbilar — alle merke og prisar.',
    image: 'https://images.unsplash.com/photo-1549399542-7e3f8b79c341?w=900&q=80',
    href: '/bil/bruktbilar',
    external: false,
    cta: 'Sjå bruktbilar',
  },
  {
    label: 'Bilutleige',
    title: 'Hertz Bilutleige',
    desc: 'Hundre leigebiler på fem stader i Sogn og Sunnfjord — alltid på farten.',
    image: 'https://images.unsplash.com/photo-1544636331-e26879cd4d9b?w=900&q=80',
    href: '/bil/hertz',
    external: false,
    cta: 'Sjå leigebil',
  },
  {
    label: 'Luxury',
    title: 'Lexus Bruktbil',
    desc: 'Utvalde brukte Lexus-bilar — premium køyreglede til fornuftige prisar.',
    image: 'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=900&q=80',
    href: '/bil/lexus-bruktbil',
    external: false,
    cta: 'Sjå Lexus',
  },
];

export default function BilPage() {
  return (
    <>
      {/* ── HERO ──────────────────────────────────────────── */}
      {/* TODO: [SANITY] Fetch hero image + headline from CMS */}
      <section className={styles.hero}>
        <div className={styles.heroBg}>
          <Image
            src="https://images.unsplash.com/photo-1617788138017-80ad40651399?w=1920&q=85"
            alt="Bil — MOVE Sogn"
            fill
            priority
            sizes="100vw"
            quality={85}
            style={{ objectFit: 'cover', objectPosition: 'center 40%' }}
          />
          <div className={styles.heroOverlay} />
        </div>
        <div className={`container ${styles.heroContent}`}>
          <FadeUp>
            <span className={styles.heroLabel}>Bil</span>
            <h1 className={styles.heroH1}>Din bil — vår lidenskap.</h1>
          </FadeUp>
          <FadeUp delay={100}>
            <p className={styles.heroSub}>
              {/* TODO: [SANITY] Fetch tagline from CMS */}
              Toyota, bruktbilar, bilutleige og Lexus — alt under eitt tak på Kaupanger.
            </p>
          </FadeUp>
        </div>
      </section>

      {/* ── BRAND CARDS ───────────────────────────────────── */}
      {/* TODO: [SANITY] Fetch brand cards from CMS (type: bilBrandCard) */}
      <section className={`section--md ${styles.brandsSection}`}>
        <div className="container">
          <div className={styles.brandsGrid}>
            {bilBrands.map((brand, i) => (
              <FadeUp key={brand.title} delay={i * 70} className={styles.brandCardWrap}>
                {brand.external ? (
                  <a
                    href={brand.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.brandCard}
                  >
                    <BrandCardInner {...brand} />
                  </a>
                ) : (
                  <Link href={brand.href} className={styles.brandCard}>
                    <BrandCardInner {...brand} />
                  </Link>
                )}
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      {/* TODO: [SANITY] Add featured vehicles / inventory teaser from CMS */}
    </>
  );
}

function BrandCardInner({ label, title, desc, image, cta, external }: typeof bilBrands[0]) {
  return (
    <>
      <div className={styles.brandCardImg}>
        <Image
          src={image}
          alt={title}
          fill
          sizes="(max-width: 768px) 100vw, 25vw"
          quality={75}
          style={{ objectFit: 'cover', transition: 'transform 0.5s ease' }}
        />
      </div>
      <div className={styles.brandCardBody}>
        <span className="label">{label}</span>
        <h3>{title}</h3>
        <p>{desc}</p>
        <span className={styles.brandCardCta}>
          {cta}
          <Icon name={external ? 'external-link' : 'arrow-right'} size={14} />
        </span>
      </div>
    </>
  );
}
