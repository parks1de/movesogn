import type { Metadata } from 'next';
import Link from 'next/link';
import ContactForm from '@/components/ui/ContactForm';
import Icon from '@/components/ui/Icon';
import FadeUp from '@/components/ui/FadeUp';
import { sanityFetch } from '@/lib/sanity';
import styles from './page.module.css';

// MANAGED VIA SANITY — siteSettings → openingHours
type OpeningHours = {
  weekdays?: string;
  saturday?: string;
  saturdayNote?: string;
  sunday?: string;
};

export const metadata: Metadata = {
  title: 'Kontakt oss',
  description: 'Ta kontakt med MOVE Sogn på Kaupanger. Ring 57 67 66 66 eller send e-post til post@movesogn.no.',
  openGraph: {
    images: [{ url: '/og-default.jpg', width: 1200, height: 630, alt: 'MOVE Sogn — Kontakt oss' }],
  },
};

const channels = [
  {
    icon: 'phone' as const,
    label: 'Telefon',
    value: '57 67 66 66',
    href: 'tel:+4757676666',
    desc: 'Måndag–fredag 08–17',
  },
  {
    icon: 'mail' as const,
    label: 'E-post',
    value: 'post@movesogn.no',
    href: 'mailto:post@movesogn.no',
    desc: 'Svar innan ein arbeidsdag',
  },
  {
    icon: 'map-pin' as const,
    label: 'Besøk oss',
    value: 'Skarpeteigvegen 1',
    href: 'https://maps.google.com/?q=Skarpeteigvegen+1+Kaupanger',
    desc: '6854 Kaupanger',
  },
];

const locations = [
  {
    name: 'MOVE Sogn / Toyota Sogn',
    address: 'Skarpeteigvegen 1, 6854 Kaupanger',
    phone: '57 67 66 66',
    email: 'post@movesogn.no',
    note: 'Hovudkontor — bil, båt, sykkel',
  },
  {
    name: 'Skadesenteret Sogn',
    address: 'Skarpeteigvegen 1, 6854 Kaupanger',
    phone: '57 67 66 66',
    email: 'post@movesogn.no',
    note: 'Karosseri & skadereparasjon',
  },
  {
    name: 'Hertz Sogndal',
    address: 'Sogndal lufthamn, Haukåsen',
    phone: '57 67 66 66',
    email: 'post@movesogn.no',
    note: 'Bilutleige',
  },
];

export default async function KontaktPage() {
  // MANAGED VIA SANITY — siteSettings → openingHours
  let openingHours: OpeningHours = {
    weekdays: '07.30–16.00',
    saturday: '10.00–13.00',
    saturdayNote: 'Sommartid',
    sunday: 'Stengt',
  };
  try {
    const fetched = await sanityFetch<OpeningHours>(
      `*[_type == "siteSettings"][0]{openingHours}.openingHours`
    );
    if (fetched) openingHours = fetched;
  } catch {}

  return (
    <>
      {/* ── HERO HEADER ────────────────────────────────────── */}
      <section className={styles.header}>
        <div className="container">
          <FadeUp>
            <span className="label">Kontakt</span>
            <h1 className={styles.title}>Ta kontakt med oss.</h1>
            <p className={styles.sub}>
              Me er her for deg — anten du vil kjøpe bil, spørje om ein båt, eller berre slå av ein prat.
            </p>
          </FadeUp>
        </div>
      </section>

      {/* ── CHANNEL CARDS ──────────────────────────────────── */}
      <section className="section--sm">
        <div className="container">
          <div className={styles.channelGrid}>
            {channels.map((c, i) => (
              <FadeUp key={c.label} delay={i * 60}>
                <a
                  href={c.href}
                  className={styles.channelCard}
                  target={c.icon === 'map-pin' ? '_blank' : undefined}
                  rel="noopener noreferrer"
                >
                  <span className={styles.channelIcon}>
                    <Icon name={c.icon} size={22} />
                  </span>
                  <span className={styles.channelLabel}>{c.label}</span>
                  <span className={styles.channelValue}>{c.value}</span>
                  <span className={styles.channelDesc}>{c.desc}</span>
                </a>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      {/* ── CONTACT FORM — CENTRED, FULL FOCUS ─────────────── */}
      <section className={`section ${styles.formSection}`}>
        <div className="container">
          <FadeUp className={styles.formWrap}>
            <ContactForm
              formType="contact"
              heading="Send oss ei melding"
              subheading="Fyll ut skjemaet så kjem me tilbake til deg så snart som mogleg."
            />
          </FadeUp>
        </div>
      </section>

      {/* ── OPENING HOURS ─────────────────────────────────── */}
      {/* MANAGED VIA SANITY — siteSettings → openingHours */}
      <section className="section--sm">
        <div className="container">
          <FadeUp className={styles.hoursSection}>
            <span className="label">Opningstider</span>
            <div className={styles.hoursGrid}>
              <div className={styles.hoursCell}>
                <span className={styles.hoursDayLabel}>Kvardagar</span>
                <span className={styles.hoursTimeVal}>{openingHours.weekdays}</span>
              </div>
              <div className={styles.hoursCell}>
                <span className={styles.hoursDayLabel}>
                  Laurdag
                  {openingHours.saturdayNote && (
                    <span className={styles.hoursNote}> ({openingHours.saturdayNote})</span>
                  )}
                </span>
                <span className={styles.hoursTimeVal}>{openingHours.saturday}</span>
              </div>
              <div className={styles.hoursCell}>
                <span className={styles.hoursDayLabel}>Sundag</span>
                <span className={styles.hoursTimeVal}>{openingHours.sunday}</span>
              </div>
            </div>
          </FadeUp>
        </div>
      </section>

      {/* ── LOCATIONS GRID ─────────────────────────────────── */}
      <section className={`section--md ${styles.locationsSection}`}>
        <div className="container">
          <FadeUp>
            <span className="label">Finn oss</span>
            <h2 className={styles.locTitle}>Våre lokasjonar</h2>
          </FadeUp>
          <div className={styles.locGrid}>
            {locations.map((loc, i) => (
              <FadeUp key={loc.name} delay={i * 60} className={styles.locCard}>
                <p className={styles.locNote}>{loc.note}</p>
                <h3 className={styles.locName}>{loc.name}</h3>
                <address className={styles.locAddress}>
                  <span>{loc.address}</span>
                  <a href={`tel:+47${loc.phone.replace(/\s/g, '')}`}>{loc.phone}</a>
                  <a href={`mailto:${loc.email}`}>{loc.email}</a>
                </address>
              </FadeUp>
            ))}
          </div>

          {/* Map */}
          <FadeUp delay={100} className={styles.mapWrap}>
            <iframe
              title="MOVE Sogn — Skarpeteigvegen 1, 6854 Kaupanger"
              src="https://maps.google.com/maps?q=Skarpeteigvegen+1,+6854+Kaupanger&output=embed"
              width="100%"
              height="280"
              style={{ border: 0, borderRadius: 4, display: 'block' }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </FadeUp>
        </div>
      </section>
    </>
  );
}
