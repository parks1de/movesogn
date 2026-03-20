import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import FadeUp from '@/components/ui/FadeUp';
import Icon from '@/components/ui/Icon';
import ContactForm from '@/components/ui/ContactForm';
import styles from './page.module.css';

export const metadata: Metadata = {
  title: 'Casa Banderas — Eksklusiv feriebolig i Spania',
  description: 'Casa Banderas — privat luksusbustad på Costa del Sol. Panoramautsikt over Middelhavet, fullt utstyrt og tilgjengeleg for eksklusiv utleige.',
};

// 10-20 gallery images — placeholders ready for real images
const galleryImages = [
  { src: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=1600&q=85', alt: 'Casa Banderas — terrasse med havutsikt', wide: true, tall: false },
  { src: 'https://images.unsplash.com/photo-1613977257363-707ba9348227?w=1200&q=80', alt: 'Stoveseksjon med panoramavindauge',     wide: false, tall: true  },
  { src: 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=1200&q=80', alt: 'Hovudsoverom med balkong',               wide: false, tall: false },
  { src: 'https://images.unsplash.com/photo-1560185893-a55cbc8c57e8?w=1200&q=80', alt: 'Kjøkken i marmor og bøk',                  wide: false, tall: false },
  { src: 'https://images.unsplash.com/photo-1582268611958-ebfd161ef9cf?w=1200&q=80', alt: 'Privat basseng',                          wide: true,  tall: false },
  { src: 'https://images.unsplash.com/photo-1615571022219-eb45cf7faa9d?w=1200&q=80', alt: 'Terrasse med solstolar og havutsikt',    wide: false, tall: false },
  { src: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?w=1200&q=80', alt: 'Baderom i marmor',                        wide: false, tall: true  },
  { src: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1200&q=80', alt: 'Soverom 2',                               wide: false, tall: false },
  { src: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1200&q=80', alt: 'Spisestove med terrassedør',             wide: false, tall: false },
  { src: 'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=1200&q=80', alt: 'Kveldsstemning på terrassen',            wide: true,  tall: false },
  { src: 'https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?w=1200&q=80', alt: 'Nærleik til golfbane',                   wide: false, tall: false },
  { src: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=1200&q=80', alt: 'Stranda 5 min unna',                     wide: false, tall: false },
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
      {/* ═══════════════════════════════════════════════════
          HERO — cinematic, full viewport
          This is not a website hero. This is an invitation.
      ═══════════════════════════════════════════════════ */}
      <section className={styles.hero}>
        <Image
          src="https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=1920&q=90"
          alt="Casa Banderas — panoramautsikt over Middelhavet"
          fill
          priority
          sizes="100vw"
          style={{ objectFit: 'cover', objectPosition: 'center 55%' }}
        />
        <div className={styles.heroOverlay} />

        {/* Back breadcrumb */}
        <Link href="/eigedom" className={styles.heroBreadcrumb}>
          ← Eigedom
        </Link>

        {/* Centred title block */}
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

        {/* Scroll cue */}
        <div className={styles.heroScroll} aria-hidden="true"><span /></div>
      </section>


      {/* ═══════════════════════════════════════════════════
          INTRO — emotional, generous white space
      ═══════════════════════════════════════════════════ */}
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


      {/* ═══════════════════════════════════════════════════
          GALLERY — masonry, 10-20 images
          Cinematic. No captions. Let the images speak.
      ═══════════════════════════════════════════════════ */}
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


      {/* ═══════════════════════════════════════════════════
          AMENITIES — what's included
          Premium icons. Generous spacing.
      ═══════════════════════════════════════════════════ */}
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


      {/* ═══════════════════════════════════════════════════
          LOCATION BLOCK — map + text
      ═══════════════════════════════════════════════════ */}
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


      {/* ═══════════════════════════════════════════════════
          ENQUIRY FORM — centred, premium treatment
          This is the conversion point. Give it space.
      ═══════════════════════════════════════════════════ */}
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
