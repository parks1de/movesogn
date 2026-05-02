import Link from 'next/link';
import Image from 'next/image';
import Icon from '@/components/ui/Icon';
import styles from './Footer.module.css';

const footerLinks = {
  tenester: [
    { label: 'Bil',       href: '/bil' },
    { label: 'Marine',    href: '/marine' },
    { label: 'Sykkel',    href: '/sykkel' },
    { label: 'Eigedom',   href: '/eigedom' },
  ],
  partnarar: [
    { label: 'Toyota Sogn',        href: 'https://www.toyotasogn.no',       external: true  },
    { label: 'Bihuset Førde',      href: 'https://www.bilhusetforde.no',    external: true  },
    { label: 'Skadesenteret Sogn', href: 'https://www.skadesenteretsogn.no',external: true  },
    { label: 'Hertz Bilutleige',   href: '/hertz',                          external: false },
    { label: 'Silver Boats',       href: 'https://www.silverboats.no',      external: true  },
  ],
  om: [
    { label: 'Om oss',               href: '/om-oss',              external: false },
    { label: 'Kontakt',              href: '/kontakt',             external: false },
    { label: 'Personvernerklæring',  href: '/personvern',          external: false },
    { label: 'Informasjonskapslar',  href: '/informasjonskapslar', external: false },
  ],
};

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={`container ${styles.grid}`}>

        {/* ── Brand column ─────────────────────────────────── */}
        <div className={styles.brand}>
          <Link href="/" aria-label="MOVE Sogn — til startsida" className={styles.logoWrap}>
            <Image
              src="/images/logo-footer-m.svg"
              alt="MOVE"
              width={32}
              height={32}
              style={{ display: 'block' }}
            />
            <span className={styles.logoText}>MOVE<span className={styles.logoSub}>Sogn</span></span>
          </Link>

          <p className={styles.tagline}>Me flyttar deg — gjennom livet.</p>

          <div className={styles.contact}>
            <a href="tel:+4757676666" className={styles.contactRow}>
              <Icon name="phone" size={14} />
              <span>57 67 66 66</span>
            </a>
            <a href="mailto:post@movesogn.no" className={styles.contactRow}>
              <Icon name="mail" size={14} />
              <span>post@movesogn.no</span>
            </a>
            <span className={styles.contactRow}>
              <Icon name="map-pin" size={14} />
              <span>Skarpeteigvegen 1, 6854 Kaupanger</span>
            </span>
          </div>

          <div className={styles.social}>
            <a href="https://www.facebook.com/movesogn" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
              <FacebookIcon />
            </a>
            <a href="https://www.instagram.com/movesogn" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
              <InstagramIcon />
            </a>
          </div>
        </div>

        {/* Tenester */}
        <div className={styles.col}>
          <h3 className={styles.colTitle}>Tenester</h3>
          <ul>
            {footerLinks.tenester.map((l) => (
              <li key={l.href}>
                <Link href={l.href} className={styles.footerLink}>{l.label}</Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Partnarar */}
        <div className={styles.col}>
          <h3 className={styles.colTitle}>Partnarar</h3>
          <ul>
            {footerLinks.partnarar.map((l) => (
              <li key={l.href}>
                {l.external ? (
                  <a
                    href={l.href}
                    className={styles.footerLink}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {l.label}
                  </a>
                ) : (
                  <Link href={l.href} className={styles.footerLink}>{l.label}</Link>
                )}
              </li>
            ))}
          </ul>
        </div>

        {/* Om */}
        <div className={styles.col}>
          <h3 className={styles.colTitle}>Om MOVE</h3>
          <ul>
            {footerLinks.om.map((l) => (
              <li key={l.href}>
                <Link href={l.href} className={styles.footerLink}>{l.label}</Link>
              </li>
            ))}
          </ul>
        </div>

      </div>

      <div className={`container ${styles.bottom}`}>
        <p>© {new Date().getFullYear()} MOVE Sogn AS</p>
        <p>Kaupanger · Sogn og Fjordane</p>
      </div>
    </footer>
  );
}

function FacebookIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
    </svg>
  );
}

function InstagramIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
    </svg>
  );
}
