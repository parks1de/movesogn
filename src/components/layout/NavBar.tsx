'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import styles from './NavBar.module.css';

type SubItem = { href: string; label: string; external?: boolean };
type NavItem = { href: string; label: string; dropdown?: SubItem[] };

const navItems: NavItem[] = [
  { href: '/', label: 'Heim' },
  {
    href: '/bil',
    label: 'Bil',
    dropdown: [
      { href: 'https://www.toyotasogn.no', label: 'Toyota Sogn',    external: true },
      { href: 'https://toyotasogn.no/bruktbilar', label: 'Bruktbilar', external: true },
      { href: '/bil/hertz',                label: 'Hertz Bilutleige' },
    ],
  },
  {
    href: '/marine',
    label: 'Marine',
    dropdown: [
      { href: '/marine/summerfun',    label: 'Summerfun (Hasle)' },
      { href: '/marine/silver-boats', label: 'Silver Boats' },
      { href: '/marine/suzuki',       label: 'Suzuki Båtmotor' },
    ],
  },
  {
    href: '/sykkel',
    label: 'Sykkel',
    dropdown: [
      { href: '/sykkel/merida', label: 'Merida' },
      { href: '/sykkel/niu',    label: 'NIU Moped' },
    ],
  },
  {
    href: '/eigedom',
    label: 'Eigedom',
    dropdown: [
      { href: '/eigedom/naringseigendom', label: 'Sogn næringseigendom' },
      { href: '/eigedom/casa-banderas',   label: 'Casa Banderas' },
    ],
  },
  { href: '/om-oss', label: 'Om oss' },
];

export default function NavBar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen]         = useState(false);
  const pathname                = usePathname();

  const heroPages = ['/', '/bil', '/marine', '/sykkel', '/eigedom', '/om-oss'];
  const isHeroPage = heroPages.some(p => pathname === p);
  const transparent = isHeroPage && !scrolled;

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 48);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const onResize = () => { if (window.innerWidth >= 768) setOpen(false); };
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  useEffect(() => { setOpen(false); }, [pathname]);

  const isActive = (href: string) =>
    href === '/' ? pathname === '/' : pathname === href || pathname.startsWith(href + '/');

  return (
    <header className={`${styles.nav} ${transparent ? styles.transparent : styles.scrolled}`}>
      <div className={`container ${styles.inner}`}>

        {/* ── Logo ─────────────────────────────────────────── */}
        <Link href="/" className={styles.logo} aria-label="MOVE Sogn — til startsida">
          <Image
            src={transparent ? '/images/logo-nav-white.svg' : '/images/logo-nav-colour.svg'}
            alt="MOVE Sogn"
            width={148}
            height={40}
            priority
            style={{ height: 36, width: 'auto' }}
          />
        </Link>

        {/* ── Desktop nav ─────────────────────────────────── */}
        <nav className={styles.links} aria-label="Hovudnavigasjon">
          {navItems.map((item) =>
            item.dropdown ? (
              <div key={item.href} className={styles.dropdownTrigger}>
                <Link
                  href={item.href}
                  className={`${styles.link} ${isActive(item.href) ? styles.linkActive : ''}`}
                >
                  {item.label}
                  <ChevronIcon className={styles.chevron} />
                </Link>
                <div className={styles.dropdownMenu}>
                  {item.dropdown.map((sub) =>
                    sub.external ? (
                      <a
                        key={sub.href}
                        href={sub.href}
                        className={styles.dropdownItem}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {sub.label}
                        <ExternalIcon />
                      </a>
                    ) : (
                      <Link
                        key={sub.href}
                        href={sub.href}
                        className={`${styles.dropdownItem} ${isActive(sub.href) ? styles.dropdownItemActive : ''}`}
                      >
                        {sub.label}
                      </Link>
                    )
                  )}
                </div>
              </div>
            ) : (
              <Link
                key={item.href}
                href={item.href}
                className={`${styles.link} ${isActive(item.href) ? styles.linkActive : ''}`}
              >
                {item.label}
              </Link>
            )
          )}

          {/* ── Orange CTA ──────────────────────────────────── */}
          <Link href="/kontakt" className={styles.ctaLink}>
            Kontakt
          </Link>
        </nav>

        {/* ── Hamburger ─────────────────────────────────────── */}
        <button
          className={styles.hamburger}
          aria-label={open ? 'Lukk meny' : 'Opne meny'}
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
        >
          <span className={`${styles.bar} ${open ? styles.barOpen1 : ''}`} />
          <span className={`${styles.bar} ${open ? styles.barOpen2 : ''}`} />
          <span className={`${styles.bar} ${open ? styles.barOpen3 : ''}`} />
        </button>
      </div>

      {/* ── Mobile drawer ─────────────────────────────────────── */}
      {open && (
        <nav className={styles.drawer} aria-label="Mobil navigasjon">
          {navItems.map((item) => (
            <div key={item.href} className={styles.drawerGroup}>
              <Link
                href={item.href}
                className={styles.drawerLink}
                onClick={() => setOpen(false)}
                style={isActive(item.href) ? { color: 'var(--color-orange)', fontWeight: 600 } : undefined}
              >
                {item.label}
              </Link>
              {item.dropdown && (
                <div className={styles.drawerSub}>
                  {item.dropdown.map((sub) =>
                    sub.external ? (
                      <a
                        key={sub.href}
                        href={sub.href}
                        className={styles.drawerSubLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={() => setOpen(false)}
                      >
                        {sub.label}
                        <ExternalIcon />
                      </a>
                    ) : (
                      <Link
                        key={sub.href}
                        href={sub.href}
                        className={styles.drawerSubLink}
                        onClick={() => setOpen(false)}
                      >
                        {sub.label}
                      </Link>
                    )
                  )}
                </div>
              )}
            </div>
          ))}
          <Link
            href="/kontakt"
            className={`btn btn--primary ${styles.drawerCta}`}
            onClick={() => setOpen(false)}
          >
            Kontakt
          </Link>
        </nav>
      )}
    </header>
  );
}

function ChevronIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      width="10"
      height="10"
      viewBox="0 0 10 10"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.75"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M2 3.5l3 3 3-3" />
    </svg>
  );
}

function ExternalIcon() {
  return (
    <svg
      width="10"
      height="10"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      style={{ opacity: 0.45, flexShrink: 0 }}
      aria-hidden="true"
    >
      <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
      <polyline points="15,3 21,3 21,9" />
      <line x1="10" y1="14" x2="21" y2="3" />
    </svg>
  );
}
