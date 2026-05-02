import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { sanityFetch } from '@/lib/sanity';
import FadeUp from '@/components/ui/FadeUp';
import ContactForm from '@/components/ui/ContactForm';
import Icon from '@/components/ui/Icon';
import styles from '../product.module.css';

interface Spec { label: string; value: string }

interface SummerfunProduct {
  model_name: string;
  tagline: string;
  price_from: string;
  image: string;
  gallery: string[];
  body: string;
  batSpecs?: {
    lengde?: string; breidde?: string; djupgang?: string;
    vektUtenMotor?: string; maxPersonar?: string; tilraaddMotor?: string;
    maxMotor?: string; skrog?: string; ceKlasse?: string; serie?: string;
  };
}

export const revalidate = 300;

export const metadata: Metadata = {
  title: 'Hasle Summer-Fun — Marine | MOVE Sogn',
  description: 'CE-godkjent rotasjonsstøpt ungdomsbåt frå Hasle. Kjem med Suzuki 9,9 hk EFI med elektrisk start. Frå kr 71 900,-.',
  openGraph: {
    images: [{ url: '/images/summerfun/sf-01.png', width: 1200, height: 630, alt: 'Hasle Summer-Fun' }],
  },
};

const QUERY = `*[_type=="marineBoat" && brand == "summerfun"][0] {
  "model_name": modelName, tagline, "price_from": priceFrom,
  "image": image.asset->url,
  "gallery": gallery[].asset->url,
  body,
  batSpecs { lengde, breidde, djupgang, vektUtenMotor, maxPersonar, tilraaddMotor, maxMotor, skrog, ceKlasse, serie }
}`;

const placeholder: SummerfunProduct = {
  model_name: 'Hasle Summer-Fun',
  tagline: 'CE-godkjent ungdomsbåt — leken, trygg og skapt for fjorden.',
  price_from: '71 900',
  image: '/images/summerfun/sf-01.png',
  gallery: ['/images/summerfun/sf-02.jpg', '/images/summerfun/sf-03.png', '/images/summerfun/sf-04.jpg'],
  body: 'Hasle Summer-Fun er ein rotasjonsstøpt ungdomsbåt i polyetylen. Med 27 års erfaring i båtbransjen og 22 år med rotasjonsstøping har Hasle AS klart å kombinere det beste frå design og tekniske løysingar.\n\nBåten er CE-sertifisert og tilfredsstiller alle krav til stabilitet, styrke og køyreeigenskapar. Sjølvlensande slik at du slepp å tenkje på lensing etter kraftige regnskyll.\n\nLeverast med Suzuki 9,9 hk EFI med elektrisk start. Tilgjengeleg i fleire fargekombinasjonar — spør oss om lagerstatus!',
  batSpecs: {
    lengde: '3,65 m', breidde: '1,55 m', vektUtenMotor: 'ca. 80 kg',
    maxPersonar: '3', tilraaddMotor: 'Suzuki 9,9 hk EFI', maxMotor: '15 hk',
    skrog: 'Polyetylen (rotasjonsstøpt)', ceKlasse: 'D',
  },
};

function buildSpecs(s: SummerfunProduct['batSpecs']): Spec[] {
  if (!s) return [];
  const add = (label: string, v?: string): Spec | null => v ? { label, value: v } : null;
  return [
    add('Lengde', s.lengde), add('Breidde', s.breidde),
    add('Djupgang', s.djupgang), add('Vekt (utan motor)', s.vektUtenMotor),
    add('Maks personar', s.maxPersonar), add('Tilrådd motor', s.tilraaddMotor),
    add('Maks motor', s.maxMotor), add('Skrog', s.skrog),
    add('CE-klasse', s.ceKlasse), add('Serie', s.serie),
  ].filter((x): x is Spec => x !== null);
}

export default async function SummerfunPage() {
  let product = placeholder;
  try {
    const f = await sanityFetch<SummerfunProduct | null>(QUERY);
    if (f?.model_name) product = f;
  } catch {}

  const specs      = buildSpecs(product.batSpecs);
  const paragraphs = (product.body ?? '').split(/\n\n+/).filter(Boolean);
  const gallery    = (product.gallery ?? []).filter(Boolean);
  const imgSrc     = product.image || placeholder.image;
  const isContact  = product.price_from === 'Kontakt oss';

  return (
    <>
      {/* ── Hero ──────────────────────────────────────────── */}
      <section className={styles.hero}>
        <div className={`container ${styles.heroContent}`}>
          <FadeUp>
            <Link href="/marine" className={styles.back}>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M19 12H5M12 19l-7-7 7-7"/>
              </svg>
              Marine
            </Link>
            <h1 className={styles.heroH1}>{product.model_name}</h1>
            {product.tagline && (
              <p className={styles.heroTagline}>{product.tagline}</p>
            )}
            <p className={styles.heroPrice}>
              {isContact ? 'Kontakt oss for pris' : `Frå kr ${product.price_from},-`}
            </p>
          </FadeUp>
        </div>
      </section>

      {/* Blue→orange divider */}
      <div className={styles.divider} />

      {/* ── Product body — image LEFT + specs RIGHT ────────── */}
      <section className={styles.productBody}>
        <div className="container">
          <div className={styles.productBodyGrid}>

            <FadeUp>
              <div className={styles.productImgWrap}>
                <Image
                  src={imgSrc}
                  alt={product.model_name}
                  fill
                  priority
                  sizes="(max-width: 860px) 80vw, 45vw"
                  style={{ objectFit: 'contain', objectPosition: 'center' }}
                />
              </div>
            </FadeUp>

            <FadeUp delay={100} className={styles.specsPanel}>
              <span className={styles.categoryLabel}>Summerfun (Hasle)</span>

              {specs.length > 0 && (
                <div className={styles.specsBox}>
                  <div className={styles.specsBoxHdr}>Spesifikasjonar</div>
                  {specs.map((s) => (
                    <div key={s.label} className={styles.specRow}>
                      <span className={styles.specKey}>{s.label}</span>
                      <span className={styles.specVal}>{s.value}</span>
                    </div>
                  ))}
                </div>
              )}

              <div className={styles.priceBox}>
                <span className={styles.priceAmount}>
                  {isContact ? 'Kontakt oss for pris' : `Frå kr ${product.price_from},-`}
                </span>
                <p className={styles.priceNote}>
                  Inkl. Suzuki 9,9 hk EFI med elektrisk start. Kontakt oss for lagerstatus og fargeval.
                </p>
                <a href="#kontakt-form" className={`btn btn--primary ${styles.priceBtn}`}>
                  Spør om pris / bestill
                  <Icon name="arrow-right" size={14} />
                </a>
              </div>
            </FadeUp>

          </div>
        </div>
      </section>

      {/* ── Description ──────────────────────────────────── */}
      {paragraphs.length > 0 && (
        <section className={`section ${styles.descSection}`}>
          <div className="container">
            <FadeUp>
              <div className={styles.descText}>
                {paragraphs.map((para, i) => <p key={i}>{para}</p>)}
              </div>
            </FadeUp>
          </div>
        </section>
      )}

      {/* ── Gallery ──────────────────────────────────────── */}
      {gallery.length > 0 && (
        <section className={`section ${styles.gallerySection}`}>
          <div className="container">
            <FadeUp>
              <p className={styles.galleryLabel}>Galleri — {gallery.length + 1} bilete</p>
            </FadeUp>
            <div className={styles.galleryGrid}>
              {[imgSrc, ...gallery].map((src, i) => (
                <FadeUp
                  key={i}
                  delay={Math.min(i * 50, 300)}
                  className={[
                    styles.galleryItem,
                    i === 0 ? '' : '',
                    i > 0 && i % 4 === 2 ? styles.galleryItemTall : '',
                  ].filter(Boolean).join(' ')}
                >
                  <Image
                    src={src}
                    alt={`${product.model_name} — bilete ${i + 1}`}
                    fill
                    sizes="(max-width: 600px) 100vw, (max-width: 900px) 50vw, 33vw"
                    style={{ objectFit: 'cover' }}
                  />
                </FadeUp>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── Contact form ─────────────────────────────────── */}
      <section className={`section ${styles.formSection}`} id="kontakt-form">
        <div className="container">
          <div className={styles.formWrap}>
            <ContactForm
              formType="marine"
              prefilledModel={product.model_name}
              heading="Spør om Summer-Fun"
              subheading="Kontakt oss for lagerstatus, fargeval og leveringstid."
            />
          </div>
        </div>
      </section>
    </>
  );
}
