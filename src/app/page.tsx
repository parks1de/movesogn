import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import FadeUp from '@/components/ui/FadeUp';
import Icon from '@/components/ui/Icon';
import styles from './page.module.css';

export const metadata: Metadata = {
  title: 'MOVE Sogn — Bil, båt, sykkel og heim i Sogn',
  description: 'Me flyttar deg — gjennom livet. Toyota, Summerfun-båtar, el-syklar og eigedom i Sogn. 40 år med lokal mobilitet.',
};

const mobilitetCards = [
  {
    label: 'Bil',
    title: 'Toyota Sogn',
    desc: 'Verdskjend kvalitet og lokal kunnskap — nye og brukte Toyota på Kaupanger.',
    image: 'https://images.unsplash.com/photo-1617788138017-80ad40651399?w=900&q=80',
    href: 'https://www.toyotasogn.no',
    external: true,
    cta: 'Besøk Toyota Sogn',
  },
  {
    label: 'Bil',
    title: 'Bilhuset Førde',
    desc: 'Mercedes, Peugeot og KIA frå moderne lokale på Øyrane i Førde.',
    image: 'https://images.unsplash.com/photo-1549399542-7e3f8b79c341?w=900&q=80',
    href: 'https://www.bilhusetforde.no',
    external: true,
    cta: 'Besøk Bilhuset Førde',
  },
  {
    label: 'Bilutleige',
    title: 'MOVE Bilutleige',
    desc: 'Hundre leigebiler på fem stader i Sogn og Sunnfjord — alltid på farten.',
    image: 'https://images.unsplash.com/photo-1544636331-e26879cd4d9b?w=900&q=80',
    href: '/mobilitet',
    external: false,
    cta: 'Sjå leigebil',
  },
];

const marinePhilosophy = [
  { icon: 'anchor' as const,  title: 'Enkel å bruka',      desc: 'Designa for alle — frå nybyrjar til erfaren båteigar.' },
  { icon: 'shield' as const,  title: 'Trygg konstruksjon', desc: 'CE-godkjent og bygd for norske farvatn.' },
  { icon: 'compass' as const, title: 'Skapt for fjorden',  desc: 'Kvar modell er valt for Sognefjorden.' },
];

export default function HeimsidePage() {
  return (
    <>
      {/* ── HERO ────────────────────────────────────────────── */}
      <section className={styles.hero}>
        <div className={styles.heroBg}>
          <Image
            src="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1920&q=85"
            alt="Fjordlandskap i Sogn"
            fill
            priority
            sizes="100vw"
            quality={85}
            style={{ objectFit: 'cover', objectPosition: 'center 60%' }}
          />
          <div className={styles.heroOverlay} />
          {/* v3: soft brand-tinted gradient layer */}
          <div className={styles.heroTint} aria-hidden="true" />
        </div>
        <div className={`container ${styles.heroContent}`}>
          <FadeUp>
            <span className={styles.heroEyebrow}>MOVE Sogn</span>
          </FadeUp>
          <FadeUp delay={80}>
            <h1 className={styles.heroH1}>
              Me flyttar deg.<br />Gjennom livet.
            </h1>
          </FadeUp>
          <FadeUp delay={180}>
            <p className={styles.heroSub}>
              Bil, båt, sykkel og heim — alt du treng for å leva godt i Sogn.
            </p>
          </FadeUp>
          <FadeUp delay={280}>
            <Link href="/mobilitet" className="btn btn--primary">
              Utforsk MOVE
              <Icon name="arrow-right" size={16} />
            </Link>
          </FadeUp>
        </div>
        <div className={styles.heroScroll} aria-hidden="true"><span /></div>
      </section>

      {/* ── MOBILITET GATEWAY ───────────────────────────────── */}
      <section className={`section--md ${styles.mobilitetSection}`}>
        <div className="container">
          <FadeUp className={styles.sectionIntro}>
            <span className="label">Mobilitet</span>
            <h2>Vel din måte å bevega deg på.</h2>
          </FadeUp>
          <div className={styles.mobilitetGrid}>
            {mobilitetCards.map((card, i) => (
              <FadeUp key={card.title} delay={i * 80} className={styles.mobilitetCardWrap}>
                <MobilitetCard {...card} />
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      {/* ── MARINE SPOTLIGHT ────────────────────────────────── */}
      <section className={`section bg-warm ${styles.marineSection}`}>
        <div className={`container ${styles.marineSplit}`}>
          <FadeUp className={styles.marineImgWrap}>
            <Image
              src="https://images.unsplash.com/photo-1605281317010-fe5ffe798166?w=1000&q=80"
              alt="Summerfun-båt på Sognefjorden"
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              quality={80}
              style={{ objectFit: 'cover' }}
            />
          </FadeUp>
          <FadeUp delay={120} className={styles.marineText}>
            <span className="label">Marine &amp; Fritid</span>
            <h2>Livet er best på sjøen.</h2>
            <p>
              Frå ungdomsbåten Hasle Summerfun til dei solide Silver-båtane frå Finland —
              me har det du treng for å oppdage Sognefjorden. Autorisert Suzuki-service
              på Kaupanger.
            </p>
            <div className={styles.marineProps}>
              {marinePhilosophy.map((p) => (
                <div key={p.title} className={styles.marineProp}>
                  <Icon name={p.icon} size={18} />
                  <span>{p.title}</span>
                </div>
              ))}
            </div>
            <Link href="/marine" className="btn btn--outline-blue">
              Sjå Summerfun-båtar
              <Icon name="arrow-right" size={16} />
            </Link>
          </FadeUp>
        </div>
      </section>

      {/* ── SYKKEL TEASER ───────────────────────────────────── */}
      <section className={`section bg-dark ${styles.sykkelSection}`}>
        <div className={`container ${styles.sykkelInner}`}>
          <FadeUp className={styles.sykkelText}>
            <span className="label">Mikromobilitet</span>
            <h2 className="text-white">Framtida køyrer elektrisk.</h2>
            <p className={styles.sykkelSub}>
              NIU el-scooterar, Peugeot og Crescent el-syklar — frå kr 7 990. Null utslepp, låge kostnader.
            </p>
            <Link href="/sykkel" className="btn btn--primary" style={{ marginTop: '2rem' }}>
              Sjå el-syklar
              <Icon name="arrow-right" size={16} />
            </Link>
          </FadeUp>
          <FadeUp delay={140} className={styles.sykkelImgWrap}>
            <Image
              src="https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80"
              alt="Elektrisk scooter — MOVE Sogn"
              width={500}
              height={380}
              quality={80}
              sizes="(max-width: 768px) 0px, 500px"
              style={{ objectFit: 'cover', borderRadius: 3, width: '100%', height: 380 }}
            />
          </FadeUp>
        </div>
      </section>

      {/* ── EIGEDOM TEASER ──────────────────────────────────── */}
      <section className="section bg-surface">
        <div className="container">
          <FadeUp className={styles.sectionIntro}>
            <span className="label">Eigedom</span>
            <h2>Eigedom for livet du vil leva.</h2>
          </FadeUp>
          <div className={styles.eigedomGrid}>

            {/* Sogn: structured, business-credibility tone */}
            <FadeUp className={styles.eigedomCardWrap}>
              <Link href="/eigedom" className={`${styles.eigedomCard} ${styles.eigedomSogn}`}>
                <div className={styles.eigedomImgWrap}>
                  <Image
                    src="https://images.unsplash.com/photo-1497366216548-37526070297c?w=900&q=80"
                    alt="Næringslokale i Kaupanger, Sogn"
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    quality={75}
                    style={{ objectFit: 'cover' }}
                  />
                  <div className={styles.eigedomImgOverlay} />
                </div>
                <div className={styles.eigedomCardBody}>
                  <span className="label">Sogn</span>
                  <h3>Næringslokale i veksande Sogn</h3>
                  <p>Kontor og lager på Kaupanger — sjå ledige areal og showroom.</p>
                  <span className={styles.eigedomCta}>
                    Les meir <Icon name="arrow-right" size={14} />
                  </span>
                </div>
              </Link>
            </FadeUp>

            {/* Spain: premium, warm, aspirational tone */}
            <FadeUp delay={100} className={styles.eigedomCardWrap}>
              <Link href="/eigedom/casa-banderas" className={`${styles.eigedomCard} ${styles.eigedomSpain}`}>
                <div className={styles.eigedomImgWrap}>
                  <Image
                    src="https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=900&q=80"
                    alt="Terrasse med havutsikt — Casa Banderas, Spania"
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    quality={75}
                    style={{ objectFit: 'cover' }}
                  />
                  <div className={styles.eigedomImgOverlaySpain} />
                </div>
                <div className={styles.eigedomCardBody}>
                  <span className={`label ${styles.eigedomLabel}`}>Spania</span>
                  <h3>Meir sol. Meir liv.</h3>
                  <p>Middelhavsidyll for dei som ønsker noko ekstra.</p>
                  <span className={styles.eigedomCta}>
                    Les meir <Icon name="arrow-right" size={14} />
                  </span>
                </div>
              </Link>
            </FadeUp>

          </div>
        </div>
      </section>

      {/* ── 40 ÅR ────────────────────────────────────────────── */}
      <section className={`section--xl ${styles.fortySection}`}>
        <div className={styles.fortyBg} aria-hidden="true">40</div>
        <div className="container text-center">
          <FadeUp>
            <span className="label">Sidan 1984</span>
            <h2 className={styles.fortyH2}>40 år med rørsle i Sogn.</h2>
            <p className={styles.fortySub}>
              Frå ANI Bil til MOVE — 60 medarbeidarar og ein ambisjon om å alltid vera der for deg.
            </p>
            <Link href="/om-oss" className="btn btn--ghost" style={{ marginTop: '2rem' }}>
              Les historia vår
              <Icon name="arrow-right" size={16} />
            </Link>
          </FadeUp>
        </div>
      </section>
    </>
  );
}

function MobilitetCard({ label, title, desc, image, href, external, cta }: typeof mobilitetCards[0]) {
  const inner = (
    <article className={`${styles.mobilitetCard}`}>
      <div className={styles.mobilitetCardImgWrap}>
        <Image
          src={image}
          alt={title}
          fill
          sizes="(max-width: 768px) 100vw, 33vw"
          quality={75}
          style={{ objectFit: 'cover', transition: 'transform 0.5s ease' }}
        />
      </div>
      <div className={styles.mobilitetCardBody}>
        <span className="label">{label}</span>
        <h3 className={styles.mobilitetCardTitle}>{title}</h3>
        <p className={styles.mobilitetCardDesc}>{desc}</p>
        <span className={styles.mobilitetCardCta}>
          {cta}
          <Icon name={external ? 'external-link' : 'arrow-right'} size={14} />
        </span>
      </div>
    </article>
  );

  return external
    ? <a href={href} target="_blank" rel="noopener noreferrer" className={styles.mobilitetCardLink}>{inner}</a>
    : <Link href={href} className={styles.mobilitetCardLink}>{inner}</Link>;
}
