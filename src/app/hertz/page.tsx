import type { Metadata } from 'next';
import FadeUp from '@/components/ui/FadeUp';
import Icon from '@/components/ui/Icon';
import styles from './page.module.css';

export const metadata: Metadata = {
  title: 'Hertz Bilutleige | MOVE Sogn',
  description: 'Hertz ANI Utleige — fem stasjonar i Sogn og Sunnfjord. Lei personbil, varebil eller buss i Kaupanger, Sogndal og Førde.',
};

interface Location {
  name: string;
  address: string;
  weekdays: string;
  weekend: string;
  phone: string;
  tel: string;
  bookingUrl: string;
}

const sognLocations: Location[] = [
  {
    name: 'Kaupanger',
    address: 'Skarpeteigvegen 1, 6854 Kaupanger',
    weekdays: '08:00–16:00',
    weekend: 'Stengt',
    phone: '+47 91 86 25 27',
    tel: '+4791862527',
    bookingUrl: 'https://www.hertz.no/p/leiebil/norge/sogndal',
  },
  {
    name: 'Sogndal lufthamn',
    address: 'Haukåsen Airport, 6856 Sogndal',
    weekdays: '08:00–16:00',
    weekend: 'Stengt',
    phone: '+47 91 86 25 27',
    tel: '+4791862527',
    bookingUrl: 'https://www.hertz.no/p/leiebil/norge/sogndal',
  },
  {
    name: 'Sogndal',
    address: 'Hovevegen 6–10, 6856 Sogndal',
    weekdays: '08:00–16:00',
    weekend: 'Stengt',
    phone: '+47 91 86 25 27',
    tel: '+4791862527',
    bookingUrl: 'https://www.hertz.no/p/leiebil/norge/sogndal',
  },
];

const sunfjordLocations: Location[] = [
  {
    name: 'Førde lufthamn',
    address: 'Bringeland, 6977 Førde',
    weekdays: '08:00–16:00',
    weekend: 'Stengt',
    phone: '+47 91 86 61 71',
    tel: '+4791866171',
    bookingUrl: 'https://www.hertz.no/p/leiebil/norge/forde',
  },
  {
    name: 'Førde',
    address: 'Øyrane 6, 6800 Førde',
    weekdays: '08:00–16:00',
    weekend: 'Etter avtale',
    phone: '+47 91 86 61 71',
    tel: '+4791866171',
    bookingUrl: 'https://www.hertz.no/p/leiebil/norge/forde',
  },
];

const fleet = [
  {
    label: 'Personbil',
    desc: 'Alle klassar frå kompakt til komfort — inkludert heilelektriske alternativ.',
  },
  {
    label: 'Varebil',
    desc: 'Alle storleiker for flytting, frakt og varetransport. Med og utan hengar.',
  },
  {
    label: 'Buss',
    desc: '8-, 9- og 17-seter — for lag, grupper, skuleturar og bedriftsreiser.',
  },
];

export default function HertzPage() {
  return (
    <>
      {/* ── Hero ─────────────────────────────────────────────── */}
      <section className={styles.hero}>
        <div className={styles.heroGlow} aria-hidden="true" />
        <div className="container" style={{ position: 'relative' }}>
          <FadeUp>
            <span className="label" style={{ color: 'var(--color-orange)' }}>Bilutleige</span>
            <h1 className={styles.heroH1}>Hertz ANI Utleige.</h1>
            <p className={styles.heroSub}>
              Fem stasjonar i Sogn og Sunnfjord — alltid nær deg.
              Personbilar, varebilar og bussar på kort varsel.
            </p>
          </FadeUp>
        </div>
      </section>

      <div className={styles.gradientBar} aria-hidden="true" />

      {/* ── Locations ────────────────────────────────────────── */}
      <section className="section">
        <div className="container">
          <FadeUp>
            <span className="label">Stasjonar</span>
            <h2 className={styles.sectionH2}>Vel din stasjon.</h2>
          </FadeUp>

          <div className={styles.regionGroup}>
            <p className={styles.regionLabel}>Sognefjord</p>
            <div className={styles.locationGrid3}>
              {sognLocations.map((loc, i) => (
                <FadeUp key={loc.name} delay={i * 60}>
                  <LocationCard loc={loc} />
                </FadeUp>
              ))}
            </div>
          </div>

          <div className={styles.regionGroup}>
            <p className={styles.regionLabel}>Sunnfjord</p>
            <div className={styles.locationGrid2}>
              {sunfjordLocations.map((loc, i) => (
                <FadeUp key={loc.name} delay={i * 60}>
                  <LocationCard loc={loc} />
                </FadeUp>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Fleet ────────────────────────────────────────────── */}
      <section className="section bg-surface">
        <div className="container">
          <FadeUp>
            <span className="label">Flåte</span>
            <h2 className={styles.sectionH2}>Vi har det du treng.</h2>
          </FadeUp>
          <div className={styles.fleetGrid}>
            {fleet.map((item, i) => (
              <FadeUp key={item.label} delay={i * 70}>
                <div className={styles.fleetCard}>
                  <span className={styles.fleetIcon}>
                    <Icon name="car" size={20} />
                  </span>
                  <h3 className={styles.fleetName}>{item.label}</h3>
                  <p className={styles.fleetDesc}>{item.desc}</p>
                </div>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      {/* ── Contact ──────────────────────────────────────────── */}
      <section className="section">
        <div className="container">
          <FadeUp>
            <div className={styles.contactCard}>
              <div className={styles.contactInfo}>
                <span className="label">Kontakt</span>
                <h3 className={styles.contactName}>Peter Sundberg</h3>
                <p className={styles.contactRole}>Area Manager — Hertz ANI Utleige</p>
              </div>
              <address className={styles.contactDetails}>
                <a href="tel:+4757677790" className={styles.contactItem}>
                  <Icon name="phone" size={14} />
                  +47 57 67 77 90
                </a>
                <a href="tel:+4797151687" className={styles.contactItem}>
                  <Icon name="phone" size={14} />
                  +47 97 15 16 87
                </a>
                <a href="mailto:sogndal@hertz.no" className={styles.contactItem}>
                  <Icon name="mail" size={14} />
                  sogndal@hertz.no
                </a>
              </address>
            </div>
          </FadeUp>
        </div>
      </section>
    </>
  );
}

function LocationCard({ loc }: { loc: Location }) {
  return (
    <div className={styles.locCard}>
      <div className={styles.locHeader}>
        <h3 className={styles.locName}>{loc.name}</h3>
      </div>

      <div className={styles.locBody}>
        <div className={styles.locRow}>
          <Icon name="map-pin" size={13} />
          <span>{loc.address}</span>
        </div>

        <div className={styles.locRow}>
          <Icon name="phone" size={13} />
          <a href={`tel:${loc.tel}`} className={styles.locPhone}>{loc.phone}</a>
        </div>

        <div className={styles.locHoursBlock}>
          <div className={styles.locRow}>
            <Icon name="clock" size={13} />
            <span className={styles.locHoursHeading}>Opningstider</span>
          </div>
          <dl className={styles.hoursGrid}>
            <dt>Man–fre</dt><dd>{loc.weekdays}</dd>
            <dt>Lør–søn</dt>
            <dd className={loc.weekend === 'Stengt' ? styles.closed : undefined}>
              {loc.weekend}
            </dd>
          </dl>
        </div>
      </div>

      <div className={styles.locFooter}>
        <a
          href={loc.bookingUrl}
          target="_blank"
          rel="noopener noreferrer"
          className={styles.bookBtn}
        >
          Book bil
          <Icon name="external-link" size={12} />
        </a>
      </div>
    </div>
  );
}
