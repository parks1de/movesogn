import type { Metadata } from 'next';
import Image from 'next/image';
import FadeUp from '@/components/ui/FadeUp';
import Link from 'next/link';
import Icon from '@/components/ui/Icon';
import styles from './page.module.css';

export const metadata: Metadata = {
  title: 'Eigedom — Næringslokale og Casa Banderas',
  description: 'MOVE Eigedom — næringslokale i Kaupanger og eksklusiv feriebolig Casa Banderas på Costa del Sol. Ta kontakt for visning og førespurnad.',
  openGraph: {
    images: [{ url: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=1200&q=80', width: 1200, height: 630, alt: 'Næringslokale i Sogn — MOVE Eigedom' }],
  },
};

export default function EigedomPage() {
  return (
    <>
      {/* ── SPLIT HERO ─────────────────────────────────────── */}
      <section className={styles.splitHero}>

        {/* Left half — Sogn: cool, structured */}
        <div className={styles.heroHalf}>
          <Image
            src="https://images.unsplash.com/photo-1497366216548-37526070297c?w=1000&q=80"
            alt="Næringslokale i Kaupanger, Sogn"
            fill
            priority
            sizes="50vw"
            style={{ objectFit: 'cover' }}
          />
          <div className={styles.heroHalfOverlaySogn} />
          <div className={styles.heroHalfContent}>
            <span className={styles.heroLabelSogn}>Sogn · Noreg</span>
            <h2 className={styles.heroHalfH2}>Strategisk beliggenheit i veksande Sogn</h2>
          </div>
        </div>

        {/* Right half — Spain: warm, aspirational */}
        <div className={styles.heroHalf}>
          <Image
            src="https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=1000&q=80"
            alt="Casa Banderas — terrasse med havutsikt i Spania"
            fill
            sizes="50vw"
            style={{ objectFit: 'cover', objectPosition: 'center 60%' }}
          />
          <div className={styles.heroHalfOverlaySpain} />
          <div className={styles.heroHalfContent}>
            <span className={styles.heroLabelSpain}>Spania · Costa del Sol</span>
            <h2 className={styles.heroHalfH2}>Meir sol. Meir liv.</h2>
          </div>
        </div>

        {/* Centred H1 over the split */}
        <div className={styles.heroTitleWrap}>
          <FadeUp>
            <h1 className={styles.heroH1}>Eigedom for livet du vil leva.</h1>
          </FadeUp>
        </div>
      </section>


      {/* ═══════════════════════════════════════════════════
          SOGN BLOCK — commercial credibility
          Structured. Cool blue. Grid facts. Factual CTA.
      ═══════════════════════════════════════════════════ */}
      <section className={`section ${styles.sognBlock}`}>
        <div className={`container ${styles.block}`}>

          <FadeUp className={styles.blockImg}>
            <div className={styles.blockImgWrap}>
              <Image
                src="https://images.unsplash.com/photo-1497366216548-37526070297c?w=900&q=80"
                alt="Kontor og lager i Kaupanger — MOVE Sogn"
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                style={{ objectFit: 'cover' }}
              />
            </div>
          </FadeUp>

          <FadeUp delay={100} className={styles.blockText}>
            <span className={styles.sognLabel}>Sogn · Næringseigdom</span>
            <h2>Strategisk beliggenheit i veksande Sogn</h2>

            {/* Structured facts grid — business credibility signal */}
            <div className={styles.sognFacts}>
              {[
                { label: 'Lokasjon',   value: 'Kaupanger, Sogndal' },
                { label: 'Type',       value: 'Kontor / Lager' },
                { label: 'Tilkomst',   value: 'E16 · 5 min' },
                { label: 'Status',     value: 'Spør om ledige areal' },
              ].map(f => (
                <div key={f.label} className={styles.sognFact}>
                  <div className={styles.sognFactLabel}>{f.label}</div>
                  <div className={styles.sognFactValue}>{f.value}</div>
                </div>
              ))}
            </div>

            <p>
              MOVE Sogn AS har kontor og lagerlokale på Kaupanger — eit knutepunkt for
              mobilitet og tenester i regionen. Med veksande aktivitet i Sogn er dette ein
              attraktiv lokasjon for verksemder som ønskjer lokal tilknyting og gode
              infrastrukturmessige tilhøve.
            </p>
            <p style={{ marginTop: '1rem' }}>Ta kontakt for meir informasjon om ledige areal og visning.</p>

            <a href="tel:+4757676666" className="btn btn--outline-blue" style={{ marginTop: '1.75rem' }}>
              Ring for visning
              <Icon name="arrow-right" size={16} />
            </a>
          </FadeUp>

        </div>
      </section>


      {/* ═══════════════════════════════════════════════════
          SPAIN / CASA BANDERAS BLOCK — premium aspiration
          Warm. Emotional. Soft edges. Golden tones.
          This must feel different from the Sogn block above.
      ═══════════════════════════════════════════════════ */}
      <section className={`section ${styles.spainBlock}`}>
        <div className={`container ${styles.block} ${styles.blockReverse}`}>

          <FadeUp className={styles.blockImg}>
            <div className={styles.blockImgWrap}>
              <Image
                src="https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=900&q=80"
                alt="Casa Banderas — Middelhavsidyll i Spania"
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                style={{ objectFit: 'cover', objectPosition: 'center 60%' }}
              />
            </div>
          </FadeUp>

          <FadeUp delay={100} className={styles.blockText}>
            <span className={styles.spainLabel}>Casa Banderas · Spania</span>
            <h2>Meir sol. Meir liv.</h2>

            {/* Emotive pull-quote — tone-setter */}
            <p className={styles.spainQuote}>
              Ein stad der dagane er lengre, sola varmar meir, og tida går saktare.
            </p>

            <p>
              For dei som ønskjer noko meir — MOVE Eigedom tilbyr eksklusiv feriebustaden
              Casa Banderas på Costa del Sol, tilpassa norske familiar og pensjonister som
              vil ha det beste frå begge verder.
            </p>

            {/* Feature list — warm dot markers */}
            <div className={styles.spainFeatures} style={{ marginTop: '1.5rem' }}>
              {[
                'Privat terrasse med havutsikt',
                'Fullt utstyrt og klar for innflytting',
                'Tilgjengeleg for privat utleige',
                'Nær golf, strand og flyplass',
              ].map(f => (
                <div key={f} className={styles.spainFeature}>
                  <span className={styles.spainFeatureDot} />
                  {f}
                </div>
              ))}
            </div>

            <Link href="/eigedom/casa-banderas" className={styles.spainCta}>
              Utforsk Casa Banderas
              <Icon name="arrow-right" size={16} />
            </Link>
          </FadeUp>

        </div>
      </section>


      {/* ── CONTACT STRIP ──────────────────────────────────── */}
      <section className={styles.contactStrip}>
        <div className={`container ${styles.contactInner}`}>
          <FadeUp>
            <h2>Spørsmål om eigedom?</h2>
            <p>Ring oss eller send e-post — me svarer innan ein arbeidsdag.</p>
          </FadeUp>
          <FadeUp delay={80} className={styles.contactActions}>
            <Link href="/kontakt" className="btn btn--primary">
              Ta kontakt
              <Icon name="arrow-right" size={16} />
            </Link>
          </FadeUp>
        </div>
      </section>
    </>
  );
}
