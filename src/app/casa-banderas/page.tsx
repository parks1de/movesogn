import type { Metadata } from 'next';
import Image from 'next/image';
import FadeUp from '@/components/ui/FadeUp';
import Icon from '@/components/ui/Icon';
import ContactForm from '@/components/ui/ContactForm';
import styles from './page.module.css';

export const metadata: Metadata = {
  title: 'Casa Banderas — Eksklusiv feriebolig i Spania',
  description: 'Casa Banderas — privat luksusbustad på Costa del Sol. Panoramautsikt over Middelhavet, fullt utstyrt og tilgjengeleg for eksklusiv utleige.',
  openGraph: {
    images: [{ url: '/images/casa-banderas/cb-01.jpg', width: 1200, height: 630, alt: 'Casa Banderas — terrasse med havutsikt' }],
  },
};

const galleryImages = [
  { src: '/images/casa-banderas/cb-01.jpg', alt: 'Casa Banderas — eksteriør',        wide: true,  tall: false },
  { src: '/images/casa-banderas/cb-02.jpg', alt: 'Casa Banderas — interiør',         wide: false, tall: true  },
  { src: '/images/casa-banderas/cb-03.jpg', alt: 'Casa Banderas — stove og utsikt',  wide: false, tall: false },
  { src: '/images/casa-banderas/cb-04.jpg', alt: 'Casa Banderas — hage og basseng',  wide: false, tall: false },
  { src: '/images/casa-banderas/cb-05.jpg', alt: 'Casa Banderas — terrasse',         wide: true,  tall: false },
  { src: '/images/casa-banderas/cb-06.jpg', alt: 'Casa Banderas — soverom',          wide: false, tall: false },
  { src: '/images/casa-banderas/cb-07.jpg', alt: 'Casa Banderas — utsikt',           wide: false, tall: true  },
  { src: '/images/casa-banderas/cb-08.jpg', alt: 'Casa Banderas — omgjevnadar',      wide: false, tall: false },
];

const amenities = [
  { icon: 'home',    label: '3 soverom',              desc: 'Kingsize-senger, luftige rom og havutsikt frå hovudrommet' },
  { icon: 'star',    label: 'Privat basseng',         desc: 'Oppvarma basseng med automatisk reinsing, 10×5 m' },
  { icon: 'compass', label: 'Panoramaterrasse',       desc: '80 m² solterrasse med 180° utsikt over Middelhavet' },
  { icon: 'shield',  label: 'Fullt utstyrt',          desc: 'Profesjonelt kjøkken, Nespresso, Sonos, Smart TV, Wi-Fi' },
  { icon: 'map-pin', label: '5 min til stranda',      desc: 'Privat strand tilgjengeleg for gjester, parkering inkl.' },
  { icon: 'anchor',  label: 'Golf & marina nærby',    desc: 'Tre golfbanar innanfor 15 min køyring, marinaen 8 min' },
];

export default function CasaBanderasPage() {
  return (
    <>
      {/* ── HERO ─────────────────────────────────────────────── */}
      <section className={styles.hero}>
        <Image
          src="/images/casa-banderas/cb-01.jpg"
          alt="Casa Banderas — panoramautsikt over Middelhavet"
          fill
          priority
          sizes="100vw"
          style={{ objectFit: 'cover', objectPosition: 'center 55%' }}
        />
        <div className={styles.heroOverlay} />

        <div className={styles.heroContent}>
          <FadeUp>
            <p className={styles.heroLocation}>Costa del Sol · Spania</p>
            <h1 className={styles.heroTitle}>Casa Banderas</h1>
            <p className={styles.heroTagline}>
              Ein stad der dagane er lengre, sola varmar meir, og havet aldri er langt unna.
            </p>
          </FadeUp>
          <FadeUp delay={180}>
            <a href="#enquiry" className={styles.heroCtaScroll}>
              Spør om tilgjengelegheit
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 5v14M5 12l7 7 7-7"/>
              </svg>
            </a>
          </FadeUp>
        </div>

        <div className={styles.heroScroll} aria-hidden="true"><span /></div>
      </section>


      {/* ── INTRO ────────────────────────────────────────────── */}
      <section className={`section--xl ${styles.introSection}`}>
        <div className="container">
          <FadeUp className={styles.introWrap}>
            <p className={styles.introLabel}>Om eigedomen</p>
            <h2 className={styles.introTitle}>
              Luksus og ro — på eit av Europas vakreste strandstader.
            </h2>
            <div className={styles.introRule} />
            <p className={styles.introBody}>
              Casa Banderas er ein eksklusiv privat feriebustaden berekna for dei som forventar
              det aller beste. Med panoramautsikt over Middelhavet frå alle hovudrom, eige
              basseng og ein romsleg terrasse i sørveggen — dette er ein stad ein kjem attende til.
            </p>
            <p className={styles.introBody}>
              Bustaden er fullt møblert og utstyrt til ein standard du gjenkjenner frå dei beste
              hotella. Samstundes er det intimt, privat og personleg — din eigen heim i Spania.
              Tilgjengeleg for eksklusiv kortidsleige for norske familiar og bedrifter som ønskjer
              noko utanom det vanlege.
            </p>
            <p className={styles.introBody}>
              Minimumsbooking 7 dagar. Kontakt oss for prisar, tilgjengelegheit og private
              tilpassingar. Me hjelper deg med alt frå flybillettar til transferservice.
            </p>
          </FadeUp>
        </div>
      </section>


      {/* ── GALLERY ──────────────────────────────────────────── */}
      <section className={`section ${styles.gallerySection}`}>
        <div className="container">
          <FadeUp className={styles.galleryHeader}>
            <p className={styles.galleryLabel}>Galleri — {galleryImages.length} bilete</p>
            <h2 className={styles.galleryTitle}>Sjå bustaden</h2>
          </FadeUp>

          <div className={styles.galleryGrid}>
            {galleryImages.map((img, i) => (
              <FadeUp
                key={i}
                delay={Math.min(i * 40, 280)}
                className={[
                  styles.galleryItem,
                  img.wide ? styles.galleryItemWide : '',
                  img.tall ? styles.galleryItemTall : '',
                ].filter(Boolean).join(' ')}
              >
                <Image
                  src={img.src}
                  alt={img.alt}
                  fill
                  sizes="(max-width: 600px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  style={{ objectFit: 'cover' }}
                />
              </FadeUp>
            ))}
          </div>
        </div>
      </section>


      {/* ── AMENITIES ────────────────────────────────────────── */}
      <section className={`section ${styles.amenitiesSection}`}>
        <div className="container">
          <FadeUp className={styles.amenitiesHeader}>
            <p className={styles.amenitiesLabel}>Fasiliteter</p>
            <h2 className={styles.amenitiesTitle}>Alt inkludert i leiga.</h2>
          </FadeUp>

          <div className={styles.amenitiesGrid}>
            {amenities.map((a, i) => (
              <FadeUp key={a.label} delay={i * 60} className={styles.amenityCard}>
                <div className={styles.amenityIcon}>
                  <Icon name={a.icon as any} size={24} />
                </div>
                <h3 className={styles.amenityLabel}>{a.label}</h3>
                <p className={styles.amenityDesc}>{a.desc}</p>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>


      {/* ── LOCATION ─────────────────────────────────────────── */}
      <section className={`section ${styles.locationSection}`}>
        <div className="container">
          <div className={styles.locationGrid}>
            <FadeUp className={styles.locationText}>
              <p className={styles.locationLabel}>Beleg</p>
              <h2 className={styles.locationTitle}>Costa del Sol, Andalucía</h2>
              <p className={styles.locationBody}>
                Casa Banderas ligg på Costa del Sol — ei av Europas mest ettertrakta
                kystliner, kjend for sitt milde klima, kvite sandstrender og verdsklasse
                golfbanar. Flyplass 25 minutt unna. Marbella 20 minutt. Puerto Banús 15
                minutt. Alvor for den som ønskjer sjarmerende gamleby.
              </p>
              <ul className={styles.locationList}>
                {[
                  'Internasjonalt flysamband direkte frå Bergen og Oslo',
                  '5 min gange til privat strandatkomst',
                  'Tre golfbanar innanfor 15 min køyring',
                  '20 min til Marbella og Puerto Banús',
                  'Lokal bilutleige tilretta ved behov',
                ].map(item => (
                  <li key={item} className={styles.locationListItem}>
                    <span className={styles.locationDot} />
                    {item}
                  </li>
                ))}
              </ul>
            </FadeUp>

            <FadeUp delay={100} className={styles.locationMapWrap}>
              <iframe
                title="Casa Banderas — Costa del Sol"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d204718!2d-4.9!3d36.5!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xd7326796aa06ce1%3A0x40c10b73ee50b30!2sCosta+del+Sol!5e0!3m2!1sen!2ses!4v1"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </FadeUp>
          </div>
        </div>
      </section>


      {/* ── ENQUIRY ──────────────────────────────────────────── */}
      <section id="enquiry" className={`section--xl ${styles.enquirySection}`}>
        <div className="container">
          <FadeUp className={styles.enquiryHeader}>
            <p className={styles.enquiryLabel}>Kontakt</p>
            <h2 className={styles.enquiryTitle}>Spør om tilgjengelegheit.</h2>
            <p className={styles.enquirySub}>
              Me svarar innan 24 timar. Alle førespurnader er diskrete og utan forplikting.
            </p>
          </FadeUp>

          <FadeUp delay={100} className={styles.enquiryFormWrap}>
            <ContactForm
              formType="contact"
              heading=""
              subheading=""
            />
          </FadeUp>
        </div>
      </section>
    </>
  );
}
