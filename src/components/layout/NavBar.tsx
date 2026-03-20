'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import styles from './NavBar.module.css';

const links = [
  { href: '/mobilitet', label: 'Mobilitet' },
  { href: '/marine',    label: 'Marine' },
  { href: '/sykkel',    label: 'Sykkel' },
  { href: '/eigedom',   label: 'Eigedom' },
  { href: '/om-oss',    label: 'Om oss' },
  { href: '/kontakt',   label: 'Kontakt' },
];

export default function NavBar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen]         = useState(false);
  const pathname                = usePathname();

  const heroPages = ['/', '/mobilitet', '/marine', '/sykkel', '/eigedom', '/om-oss'];
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

        {/* ── Logo: full MOVE Sogn wordmark in nav ─────────── */}
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

        {/* ── Desktop links ─────────────────────────────── */}
        <nav className={styles.links} aria-label="Hovudnavigasjon">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className={`${styles.link} ${isActive(l.href) ? styles.linkActive : ''}`}
            >
              {l.label}
            </Link>
          ))}
        </nav>

        {/* ── Hamburger ─────────────────────────────────── */}
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

      {/* ── Mobile drawer ─────────────────────────────────── */}
      {open && (
        <nav className={styles.drawer} aria-label="Mobil navigasjon">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className={styles.drawerLink}
              onClick={() => setOpen(false)}
              style={isActive(l.href) ? { color: 'var(--color-orange)', fontWeight: 600 } : undefined}
            >
              {l.label}
            </Link>
          ))}
        </nav>
      )}
    </header>
  );
}
