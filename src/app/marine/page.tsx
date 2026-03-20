import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import Icon from '@/components/ui/Icon';
import { fetchMarineBoats, type MarineBoat } from '@/lib/sheets';
import FadeUp from '@/components/ui/FadeUp';
import ContactForm from '@/components/ui/ContactForm';
import styles from './page.module.css';

export const metadata: Metadata = {
  title: 'Marine & Fritid — Summerfun og Silver Boats',
  description:
    'Kjøp Hasle Summerfun og Silver Boats på Kaupanger i Sogn. Autorisert Suzuki-service. Frå kr 65 900.',
};

export const revalidate = 300; // ISR 5 min

/* ── Fallback placeholder boats ─────────────────────────── */
const placeholderBoats: MarineBoat[] = [
  {
    slug: 'hasle-summerfun',
    model_name: 'Hasle Summerfun',
    length: '3,65 m',
    persons: '3',
    motor_options: 'Suzuki 9,9 hk',
    price_from: '65 900',
    image: 'https://images.unsplash.com/photo-1605281317010-fe5ffe798166?w=800&q=80',
    images: '',
    body: 'Hasle Summerfun er ein rotasjonsstøpt ungdomsbåt i polyetylen. Sjølvlensande, CE-godkjent og perfekt for fjorden. Leveres med Suzuki 9,9 hk EFI med elektrisk start.',
    specs_table: '',
  },
  {
    slug: 'silver-beaver-br',
    model_name: 'Silver Beaver BR',
    length: '4,8 m',
    persons: '6',
    motor_options: 'Suzuki 50 hk',
    price_from: '239 000',
    image: 'https://images.unsplash.com/photo-1567899378494-47b22a2ae96a?w=800&q=80',
    images: '',
    body: 'Silvers minste båtmodell. Med sin storleik, smidigheit og omfattande utrustning er Beaver perfekt for nybyrjarar, men passar like godt for erfarne båteigarar.',
    specs_table: '',
  },
  {
    slug: 'silver-hawk-br',
    model_name: 'Silver Hawk BR',
    length: '5,3 m',
    persons: '7',
    motor_options: 'Suzuki 90 hk',
    price_from: '379 000',
    image: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=800&q=80',
    images: '',
    body: 'Silvers populære storfavoritt i ny versjon frå 2019. Nytt skrog, nytt interiør og nye konsollar. Spesielt eigna for utflukter i skjærgarden og fornøyelses-køyring.',
    specs_table: '',
  },
];

const philosophy = [
  { icon: 'anchor'  as const, title: 'Enkel å bruka',      desc: 'Designa for alle — frå nybyrjar til erfaren båteigar.' },
  { icon: 'shield'  as const, title: 'Trygg konstruksjon', desc: 'CE-godkjent og bygd for norske farvatn.' },
  { icon: 'compass' as const, title: 'Skapt for fjorden',  desc: 'Kvar båt er testa og godkjent for sognefjorden.' },
];

export default async function MarinePage() {
  let boats: MarineBoat[] = [];
  try {
    const fetched = await fetchMarineBoats();
    boats = fetched.length > 0 ? fetched : placeholderBoats;
  } catch {
    boats = placeholderBoats;
  }

  return (
    <>
      {/* ── HERO ────────────────────────────────────────────── */}
      <section className={styles.hero}>
        <div className={styles.heroBg}>
          <Image
            src="https://images.unsplash.com/photo-1605281317010-fe5ffe798166?w=1920&q=85"
            alt="Summerfun-båt på Sognefjorden — familie i solskinn"
            fill
            priority
            sizes="100vw"
            style={{ objectFit: 'cover', objectPosition: 'center 40%' }}
          />
          <div className={styles.heroOverlay} />
        </div>
        <div className={`container ${styles.heroContent}`}>
          <FadeUp>
            <span className={styles.heroLabel}>Marine &amp; Fritid</span>
            <h1 className={styles.heroH1}>Fjorden er din å oppdaga.</h1>
            <p className={styles.heroSub}>
              Hasle Summerfun og Silver Boats — båtar bygd for Noregs fjordar. Autorisert Suzuki-service på Kaupanger.
            </p>
          </FadeUp>
        </div>
      </section>

      {/* ── BRAND STORY ──────────────────────────────────────── */}
      <section className={`section`}>
        <div className="container text-center">
          <FadeUp>
            <span className="label">Om oss</span>
            <h2 className={styles.storyH2}>Ikkje berre ein båt. Ein invitasjon.</h2>
            <p className={styles.storyBody}>
              Båtsenteret Sogn på Kaupanger er samlokalisert med Toyota Sogn. Her får du
              både sal og service av båtar under same tak. Med faglærde mekanikarar og
              autorisert Suzuki-service er du alltid trygg på sjøen.
            </p>
          </FadeUp>
        </div>
      </section>

      {/* ── PRODUCT LISTINGS ─────────────────────────────────── */}
      <section className={`section bg-surface`}>
        <div className="container">
          <FadeUp>
            <span className="label">Båtar</span>
            <h2 className={styles.sectionH2}>Våre modellar</h2>
          </FadeUp>
          <div className={styles.boatGrid}>
            {boats.map((boat, i) => (
              <FadeUp key={boat.slug} delay={i * 70}>
                <BoatCard boat={boat} />
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      {/* ── PHILOSOPHY ───────────────────────────────────────── */}
      <section className="section">
        <div className="container">
          <div className={styles.philosophyGrid}>
            {philosophy.map((p, i) => (
              <FadeUp key={p.title} delay={i * 80}>
                <div className={styles.philosophyCard}>
                  <span className={styles.philosophyIcon}><Icon name={p.icon} size={24} /></span>
                  <h3>{p.title}</h3>
                  <p>{p.desc}</p>
                </div>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      {/* ── LIFESTYLE GALLERY ────────────────────────────────── */}
      <section className="section bg-surface">
        <div className="container">
          <FadeUp>
            <span className="label">Galleri</span>
            <h2 className={styles.sectionH2}>Livet på sjøen</h2>
          </FadeUp>
          <div className={styles.gallery}>
            {[
              'https://images.unsplash.com/photo-1622542796254-5b9c46ab0d2f?w=800&q=80',
              'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=800&q=80',
              'https://images.unsplash.com/photo-1567899378494-47b22a2ae96a?w=600&q=80',
              'https://images.unsplash.com/photo-1516189526-cccff1a78b9a?w=600&q=80',
            ].map((src, i) => (
              <FadeUp key={i} delay={i * 60} className={`${styles.galleryItem} ${styles[`galleryItem${i + 1}`]}`}>
                <Image src={src} alt={`Båtliv i Sogn ${i + 1}`} fill style={{ objectFit: 'cover' }} />
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA STRIP ────────────────────────────────────────── */}
      <section className={styles.ctaStrip}>
        <div className="container text-center">
          <FadeUp>
            <h2 className="text-white">Interessert i ein båt?</h2>
            <p className={styles.ctaSub}>Kontakt oss på Kaupanger — me hjelper deg å finne rett modell.</p>
            <Link href="/kontakt" className="btn btn--primary" style={{ marginTop: '2rem' }}>
              Ta kontakt
              <Icon name="arrow-right" size={16} />
            </Link>
          </FadeUp>
        </div>
      </section>

      {/* ── CONTACT FORM ─────────────────────────────────────── */}
      <section className="section">
        <div className="container">
          <ContactForm
            formType="marine"
            heading="Spør om pris eller levering"
            subheading="Fyll ut skjemaet så kjem me tilbake til deg med meir informasjon."
          />
        </div>
      </section>
    </>
  );
}

/* ── Boat card ─────────────────────────────────────────── */
function BoatCard({ boat }: { boat: MarineBoat }) {
  return (
    <Link href={`/marine/${boat.slug}`} className={`card ${styles.boatCard}`}>
      <div className={`img-fill ${styles.boatCardImg}`}>
        <Image
          src={boat.image}
          alt={boat.model_name}
          fill
          sizes="(max-width: 768px) 100vw, 33vw"
          style={{ objectFit: 'cover' }}
        />
      </div>
      <div className={styles.boatCardBody}>
        <h3 className={styles.boatCardTitle}>{boat.model_name}</h3>
        <ul className={styles.boatSpecs}>
          {boat.length  && <li><span>Lengde</span><strong>{boat.length}</strong></li>}
          {boat.persons && <li><span>Personar</span><strong>opptil {boat.persons}</strong></li>}
          {boat.motor_options && <li><span>Motor</span><strong>{boat.motor_options}</strong></li>}
        </ul>
        {boat.price_from && (
          <p className={styles.boatPrice}>Frå kr {boat.price_from},-</p>
        )}
        <span className={styles.boatCta}>
          Sjå meir / Spør om pris
          <Icon name="arrow-right" size={14} />
        </span>
      </div>
    </Link>
  );
}
