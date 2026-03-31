import type { Metadata } from 'next';
import Image from 'next/image';
import Icon from '@/components/ui/Icon';
import styles from './page.module.css';

export const metadata: Metadata = {
  title: 'Bruktbilar | MOVE Sogn',
  description: 'MOVE Sogn sitt bruktbiluval finn du hjå Toyota Sogn AS — alltid oppdatert, alltid sertifisert.',
};

export default function BruktbilarPage() {
  return (
    <section className={styles.gateway}>
      <div className={styles.heroBg}>
        <Image
          src="/images/toyota-sogn-hero.jpg"
          alt="Toyota Sogn — bruktbilar på Kaupanger"
          fill
          priority
          sizes="100vw"
          quality={85}
          style={{ objectFit: 'cover', objectPosition: 'center 45%' }}
        />
        <div className={styles.overlay} />
      </div>

      <div className={`container ${styles.content}`}>
        <h1 className={styles.heading}>Finn din neste bil</h1>
        <p className={styles.body}>
          MOVE Sogn sitt bruktbiluval finn du hjå Toyota Sogn AS —
          alltid oppdatert, alltid sertifisert.
        </p>
        <a
          href="https://toyotasogn.no/bruktbil"
          target="_blank"
          rel="noopener noreferrer"
          className={`btn btn--primary ${styles.cta}`}
        >
          Sjå bruktbilar hjå Toyota Sogn
          <Icon name="external-link" size={18} />
        </a>
      </div>
    </section>
  );
}
