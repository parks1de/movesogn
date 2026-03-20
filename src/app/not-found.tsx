import Link from 'next/link';
import type { Metadata } from 'next';
import styles from './not-found.module.css';

export const metadata: Metadata = {
  title: '404 — Sida vart ikkje funnen',
};

export default function NotFound() {
  return (
    <div className={styles.page}>
      <div className={styles.inner}>
        <span className={styles.code}>404</span>
        <h1 className={styles.title}>Sida vart ikkje funnen.</h1>
        <p className={styles.sub}>
          Det ser ut til at sida du leitar etter ikkje finst — kanskje lenka er utdatert, eller du har skrive feil adresse.
        </p>
        <div className={styles.actions}>
          <Link href="/" className="btn btn--primary">
            Tilbake til startsida
          </Link>
          <Link href="/mobilitet" className="btn btn--outline-blue">
            Sjå Mobilitet
          </Link>
        </div>
      </div>
    </div>
  );
}
