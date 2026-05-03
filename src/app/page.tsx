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

const bilCards = [
  {
    href: 'https://www.toyotasogn.no',
    external: true,
    label: 'Toyota · Lexus',
    title: 'Toyota Sogn AS',
    desc: 'Din autorisert forhandlar for Toyota og Lexus i Sogn. Opplev verdskjend kvalitet og lokal service i Sogn, hjarta av Norge. Vi hjelper deg med bilkjøp og service.',
    img: '/images/toyota-sogn-hero.jpg',
    pos: 'center 30%',
    cta: 'Besøk Toyota Sogn',
  },
  {
    href: 'https://www.bilhusetforde.no',
    external: true,
    label: 'Mercedes · Kia · Peugeot',
    title: 'Bilhuset Førde AS',
    desc: 'Nye og brukte bilar i Førde. Autorisert forhandlar for Mercedes, Kia og Peugeot.',
    img: '/images/bilhuset-forde-hero.jpg',
    pos: 'center 50%',
    cta: 'Besøk Bilhuset Førde',
  },
  {
    href: '/hertz',
    external: false,
    label: 'Bilutleige',
    title: 'Hertz ANI Bilutleige',
    desc: 'Våre avdelingar i Sogn og Sunnfjord dekker dei fleste behov, og din leigebil er kun nokre få tastetrykk unna. Hent og lever din bil i våre digitale nøkkelboksar 24/7.',
    img: '/images/hero-kaupanger.jpg',
    pos: 'center 50%',
    cta: 'Sjå avdelingar',
  },
];

export default function HeimsidePage() {
  return (
    <>
      {/* ── HERO — scroll-scrub video ────────────────────── */}
      <VideoScrubHero />

      {/* ── BIL CARDS — pulled up 100vh so it sits behind the fading hero ── */}
      <section className={`section bg-surface ${styles.toyotaSection}`}>
        <div className="container">
          <FadeUp className={styles.sectionIntro}>
            <span className="label">Bil</span>
            <h2>Bil i Sogn.</h2>
          </FadeUp>
          <div className={styles.toyotaCards}>
            {bilCards.map((card, i) => (
              <FadeUp key={card.href} delay={i * 80}>
                {card.external ? (
                  <a
                    href={card.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.toyotaCard}
                  >
                    <div className={styles.toyotaCardImg}>
                      <Image
                        src={card.img}
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
                        {card.cta} <Icon name="external-link" size={13} />
                      </span>
                    </div>
                  </a>
                ) : (
                  <Link href={card.href} className={styles.toyotaCard}>
                    <div className={styles.toyotaCardImg}>
                      <Image
                        src={card.img}
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
                        {card.cta} <Icon name="arrow-right" size={13} />
                      </span>
                    </div>
                  </Link>
                )}
              </FadeUp>
            ))}
          </div>
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


      {/* ── HERTZ BILUTLEIGE ─────────────────────────────────── */}
      <section className={`section ${styles.hertzSection}`}>
        <div className="container" style={{ position: 'relative', zIndex: 1 }}>
          <div className={styles.hertzInner}>

            <FadeUp className={styles.hertzText}>
              <span className="label">Bilutleige</span>
              <h2 className={styles.hertzH2}>Hertz ANI<br />Utleige.</h2>
              <p className={styles.hertzSub}>
                Fem stasjonar i Sogn og Sunnfjord — alltid nær deg.
                Personbilar, varebilar og bussar på kort varsel.
              </p>
              <Link href="/hertz" className="btn btn--primary" style={{ marginTop: '2rem' }}>
                Sjå stasjonar
                <Icon name="arrow-right" size={16} />
              </Link>
            </FadeUp>

            <FadeUp delay={80} className={styles.hertzLocations}>
              {[
                { name: 'Kaupanger sentrum',  note: 'Skarpeteigvegen 1, 6854 Kaupanger' },
                { name: 'Kaupanger lufthamn', note: 'Sogndal lufthamn, Haukåsen' },
                { name: 'Sogndal sentrum',    note: 'Sogndal' },
                { name: 'Førde sentrum',      note: 'Førde' },
                { name: 'Førde flyplass',     note: 'Bringeland lufthamn' },
              ].map((loc, i) => (
                <div key={loc.name} className={styles.hertzLocRow}>
                  <span className={styles.hertzLocNum}>0{i + 1}</span>
                  <div className={styles.hertzLocInfo}>
                    <p className={styles.hertzLocName}>{loc.name}</p>
                    <p className={styles.hertzLocNote}>{loc.note}</p>
                  </div>
                </div>
              ))}
            </FadeUp>

          </div>
        </div>
        <div className={styles.hertzGhost} aria-hidden="true">5</div>
      </section>


      {/* ── 40 ÅR LEGACY ────────────────────────────────────── */}
      {/* TODO: [SANITY] Fetch legacy stats and copy from CMS (type: legacyBlock) */}
      <section className={`section--xl ${styles.fortySection}`}>
        <div className={styles.fortyBg} aria-hidden="true">40</div>
        <div className="container text-center">
          <FadeUp>
            <span className="label">Sidan 1982</span>
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
