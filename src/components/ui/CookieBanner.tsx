'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import styles from './CookieBanner.module.css';

const STORAGE_KEY = 'move_cookie_consent';

export default function CookieBanner() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (!stored) setVisible(true);
  }, []);

  const accept = () => {
    localStorage.setItem(STORAGE_KEY, 'accepted');
    setVisible(false);
    // Enable GA4 if consent granted
    if (typeof window !== 'undefined' && (window as any).gtag) {
      (window as any).gtag('consent', 'update', {
        analytics_storage: 'granted',
      });
    }
  };

  const decline = () => {
    localStorage.setItem(STORAGE_KEY, 'declined');
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div className={styles.banner} role="dialog" aria-live="polite" aria-label="Samtykke til informasjonskapslar">
      <div className={styles.inner}>
        <p className={styles.text}>
          Me brukar informasjonskapslar (cookies) for å forbetre opplevinga di og analysere trafikk med Google Analytics.{' '}
          <Link href="/informasjonskapslar" className={styles.learnMore}>Les meir</Link>.
        </p>
        <div className={styles.actions}>
          <button className={`btn btn--outline-white ${styles.decline}`} onClick={decline}>
            Avslå
          </button>
          <button className={`btn btn--primary`} onClick={accept}>
            Godta alle
          </button>
        </div>
      </div>
    </div>
  );
}
