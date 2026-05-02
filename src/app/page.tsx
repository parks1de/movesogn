import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import FadeUp from '@/components/ui/FadeUp';
import Icon from '@/components/ui/Icon';
import StatCounter from '@/components/ui/StatCounter';
import VideoScrubHero from '@/components/ui/VideoScrubHero';
import styles from './page.module.css';

export const metadata: Metadata = {
  title: 'MOVE Sogn — Bil, båt, sykkel og heim i Sogn',
  description: 'Me flyttar deg — gjennom livet. Toyota, Summerfun-båtar, el-syklar og eigedom i Sogn. 40 år med lokal mobilitet.',
};

const marineProps = [
  { icon: 'anchor'  as const, title: 'Enkel å bruka',      desc: 'Designa for alle — frå nybyrjar til erfaren båteigar.' },
  { icon: 'shield'  as const, title: 'Trygg konstruksjon', desc: 'CE-godkjent og bygd for norske farvatn.' },
  { icon: 'compass' as const, title: 'Skapt for fjorden',  desc: 'Kvar modell er valt for Sognefjorden.' },
];

const toyotaCards = [
  {
    href: 'https://www.toyotasogn.no',
    label: 'Nye bilar',
    title: 'Ferske modellar',
    desc: 'Utforsk heile Toyota-sortimentet — hybrid, elektrisk og bensin. Prøvekøyr på Kaupanger.',
    pos: 'center 25%',
  },
  {
    href: 'https://www.toyotasogn.no/bruktbil',
    label: 'Brukt',
    title: 'Brukte bilar',
    desc: 'Godkjende bruktbilar med historikk og tryggleik. Frå Toyota og fleire merke.',
    pos: 'center 50%',
  },
  {
    href: 'https://www.toyotasogn.no/verkstedtjenester/bestill-service',
    label: 'Verkstad',
    title: 'Bestill service',
    desc: 'Autorisert for Toyota, Lexus og Mercedes — men me tek alle merke. Kaupanger, Sogn.',
    pos: 'center 70%',
  },
];

export default function HeimsidePage() {
  return (
    <>
      {/* ── HERO — scroll-scrub video ────────────────────── */}
      <VideoScrubHero />


      <div className="page-break-accent" />

      {/* ── TOYOTA CARDS ────────────────────────────────────── */}
      <section className="section bg-surface">
        <div className="container">
          <FadeUp className={styles.sectionIntro}>
            <span className="label">Bil</span>
            <h2>Toyota Sogn.</h2>
          </FadeUp>
          <div className={styles.toyotaCards}>
            {toyotaCards.map((card, i) => (
              <FadeUp key={card.href} delay={i * 80}>
                <a
                  href={card.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.toyotaCard}
                >
                  <div className={styles.toyotaCardImg}>
                    <Image
                      src="/images/toyota-sogn-hero.jpg"
                      alt={card.title}
                      fill
                      sizes="(max-width: 768px) 100vw, 33vw"
                      quality={80}
                      style={{ objectFit: 'cover', objectPosition: card.pos }}
                    />
                    <div className={styles.toyotaCardOverlay} />
                  </div>
                  <div className={styles.toyotaCardBody}>
                    <span className="label">{card.label}</span>
                    <h3 className={styles.toyotaCardTitle}>{card.title}</h3>
                    <p className={styles.toyotaCardDesc}>{card.desc}</p>
                    <span className={styles.toyotaCardCta}>
                      Gå til nettstad <Icon name="external-link" size={13} />
                    </span>
                  </div>
                </a>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>


      {/* ── MARINE TEASER ───────────────────────────────────── */}
      {/* TODO: [SANITY] Fetch image, headline, body text, props list from CMS (type: marineSectionBlock) */}
      <section className={`section bg-mist ${styles.marineSection}`}>
        <div className={`container ${styles.marineSplit}`}>
          <FadeUp className={styles.marineImgWrap}>
            <Image
              src="/images/marine-hero.jpg"
              alt="Silver-båt på Sognefjorden"
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              quality={80}
              style={{ objectFit: 'cover' }}
            />
          </FadeUp>
          <FadeUp delay={120} className={styles.marineText}>
            <span className="label">Marine</span>
            <h2>Livet er best på sjøen.</h2>
            <p>
              Frå ungdomsbåten Hasle Summerfun til dei solide Silver Boats frå Finland —
              me har det du treng for å oppdage Sognefjorden. Autorisert Suzuki-service
              på Kaupanger.
            </p>
            <div className={styles.marineProps}>
              {marineProps.map((p) => (
                <div key={p.title} className={styles.marineProp}>
                  <Icon name={p.icon} size={18} />
                  <span>{p.title}</span>
                </div>
              ))}
            </div>
            <Link href="/marine" className="btn btn--outline-blue">
              Sjå båtar
              <Icon name="arrow-right" size={16} />
            </Link>
          </FadeUp>
        </div>
      </section>


      {/* ── SYKKEL TEASER ───────────────────────────────────── */}
      {/* TODO: [SANITY] Fetch headline, body, image from CMS (type: sykkelSectionBlock) */}
      <section className={`section bg-dark ${styles.sykkelSection}`}>
        <div className={`container ${styles.sykkelInner}`}>
          <FadeUp className={styles.sykkelText}>
            <span className="label">Sykkel</span>
            <h2 className="text-white">Framtida køyrer elektrisk.</h2>
            <p className={styles.sykkelSub}>
              Merida el-syklar og NIU el-moped — null utslepp, låge kostnader, fri rørsle i Sogn.
            </p>
            <Link href="/sykkel" className="btn btn--primary" style={{ marginTop: '2rem' }}>
              Sjå el-syklar
              <Icon name="arrow-right" size={16} />
            </Link>
          </FadeUp>
          <FadeUp delay={140} className={styles.sykkelImgWrap}>
            <Image
              src="/images/sykkel-hero.png"
              alt="Merida el-sykkel — MOVE Sogn"
              width={500}
              height={380}
              quality={80}
              sizes="(max-width: 768px) 0px, 500px"
              style={{ objectFit: 'cover', borderRadius: 3, width: '100%', height: 380 }}
            />
          </FadeUp>
        </div>
      </section>


      <div className="page-break-accent" />

      {/* ── EIGEDOM TEASER ──────────────────────────────────── */}
      {/* TODO: [SANITY] Fetch eigedom cards from CMS (type: eigedomCard) */}
      <section className="section bg-canvas">
        <div className="container">
          <FadeUp className={styles.sectionIntro}>
            <span className="label">Eigedom</span>
            <h2>Eigedom for livet du vil leva.</h2>
          </FadeUp>
          <div className={styles.eigedomGrid}>

            <FadeUp className={styles.eigedomCardWrap}>
              <Link href="/eigedom/naringseigendom" className={`${styles.eigedomCard} ${styles.eigedomSogn}`}>
                <div className={styles.eigedomImgWrap}>
                  <Image
                    src="/images/eigedom-hero.png"
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

            <FadeUp delay={100} className={styles.eigedomCardWrap}>
              <Link href="/eigedom/casa-banderas" className={`${styles.eigedomCard} ${styles.eigedomSpain}`}>
                <div className={styles.eigedomImgWrap}>
                  <Image
                    src="/images/casa-banderas/cb-01.jpg"
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


      {/* ── 40 ÅR LEGACY ────────────────────────────────────── */}
      {/* TODO: [SANITY] Fetch legacy stats and copy from CMS (type: legacyBlock) */}
      <section className={`section--xl ${styles.fortySection}`}>
        <div className={styles.fortyBg} aria-hidden="true">40</div>
        <div className="container text-center">
          <FadeUp>
            <span className="label">Sidan 1984</span>
            <h2 className={styles.fortyH2}>40 år med rørsle i Sogn.</h2>
          </FadeUp>
          <StatCounter items={[
            { value: 40, suffix: '+', label: 'År i Sogn',      duration: 1200 },
            { value: 60, suffix: '+', label: 'Medarbeidarar',  duration: 1600 },
            { value: 4,  suffix: '',  label: 'Avdelingar',     duration: 800  },
          ]} />
          <FadeUp>
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
