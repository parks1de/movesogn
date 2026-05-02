import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { sanityFetch } from '@/lib/sanity';
import FadeUp from '@/components/ui/FadeUp';
import ContactForm from '@/components/ui/ContactForm';
import Icon from '@/components/ui/Icon';
import styles from '../product.module.css';

interface Spec { label: string; value: string }

interface BatSpecs {
  lengde?: string; breidde?: string; djupgang?: string;
  vektUtenMotor?: string; maxPersonar?: string; tilraaddMotor?: string;
  maxMotor?: string; skrog?: string; ceKlasse?: string; serie?: string;
}

interface MarineBoat {
  slug: string;
  model_name: string;
  brand: string;
  tagline?: string;
  price_from: string;
  image: string;
  gallery: string[];
  body: string;
  batSpecs?: BatSpecs;
  specs_table?: string;
}

export const revalidate = 300;

const placeholderBoats: MarineBoat[] = [
  {
    slug: 'silver-beaver-br',
    model_name: 'Silver Beaver BR',
    brand: 'silver',
    tagline: 'Smidig og romsleg — perfekt for nybyrjar og erfaren båteigar.',
    price_from: '239 000',
    image: '/images/silver/sv-01.jpg',
    gallery: ['/images/silver/sv-02.jpg', '/images/silver/sv-04.jpg', '/images/silver/sv-05.jpg'],
    body: 'Silvers minste båtmodell — 4,8 meter som passar alle. Med sin storleik, smidigheit og omfattande utrustning er Beaver perfekt for nybyrjarar, men passar like godt for erfarne båteigarar.\n\nSolid aluminiumsskrog produsert i Finland. Alle Silver-båtar er designa for nordiske tilhøve — robuste, stabile og enkle å vedlikehalde.\n\nBeaver BR leverast standard med vindskjerm, styrekonsoll og sitjebenk. Kan utrustast med kabintopp og anna tilleggsutrustning etter ønske.',
    batSpecs: {
      lengde: '4,80 m', breidde: '1,90 m', maxPersonar: '6',
      tilraaddMotor: 'Suzuki 50 hk', skrog: 'Aluminium', serie: 'X — Aluminium',
    },
  },
  {
    slug: 'silver-hawk-br',
    model_name: 'Silver Hawk BR',
    brand: 'silver',
    tagline: 'Familiebåten for Sognefjorden — trygg, rask og komfortabel.',
    price_from: '379 000',
    image: '/images/silver/sv-03.jpg',
    gallery: ['/images/silver/sv-04.jpg', '/images/silver/sv-05.jpg', '/images/silver/sv-06.jpg'],
    body: 'Silvers populære storfavoritt i ny versjon frå 2019. Heilt nytt skrog, nytt interiør og heilt nye konsollar gjer Hawk BR til eit nytt kapittel i Silver-historia.\n\nSpesielt eigna for utflukter i skjærgarden, som landstedsbåt og for fornøyelses-køyring. Romsleg akterdekk og god stabilitet gjer Hawk til eit trygt val for heile familien.\n\nHawk BR er tilgjengeleg med eit bredt utval av motorar og utstyrspakkar. Autorisert Suzuki-service på Kaupanger.',
    batSpecs: {
      lengde: '5,30 m', breidde: '2,05 m', maxPersonar: '7',
      tilraaddMotor: 'Suzuki 90 hk', skrog: 'Aluminium', serie: 'X — Aluminium',
    },
  },
];

const QUERY = `*[_type=="marineBoat" && brand in ["silver", "other"]] | order(order asc) {
  "slug": slug.current, "model_name": modelName, brand, tagline,
  "price_from": priceFrom,
  "image": image.asset->url,
  "gallery": gallery[].asset->url,
  body,
  batSpecs { lengde, breidde, djupgang, vektUtenMotor, maxPersonar, tilraaddMotor, maxMotor, skrog, ceKlasse, serie }
}`;

function buildSpecs(boat: MarineBoat): Spec[] {
  if (boat.batSpecs) {
    const s = boat.batSpecs;
    return [
      s.lengde         && { label: 'Lengde',            value: s.lengde },
      s.breidde        && { label: 'Breidde',           value: s.breidde },
      s.djupgang       && { label: 'Djupgang',          value: s.djupgang },
      s.vektUtenMotor  && { label: 'Vekt (utan motor)', value: s.vektUtenMotor },
      s.maxPersonar    && { label: 'Maks personar',     value: s.maxPersonar },
      s.tilraaddMotor  && { label: 'Tilrådd motor',     value: s.tilraaddMotor },
      s.maxMotor       && { label: 'Maks motor',        value: s.maxMotor },
      s.skrog          && { label: 'Skrog',             value: s.skrog },
      s.ceKlasse       && { label: 'CE-klasse',         value: s.ceKlasse },
      s.serie          && { label: 'Serie',             value: s.serie },
    ].filter((x): x is Spec => Boolean(x));
  }
  try {
    const table = boat.specs_table ? JSON.parse(boat.specs_table) : {};
    return Object.entries(table).map(([label, value]) => ({ label, value: String(value) }));
  } catch {
    return [];
  }
}

interface Props { params: { slug: string } }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  let boats = placeholderBoats;
  try { const f = await sanityFetch<MarineBoat[]>(QUERY); if (f.length) boats = f; } catch {}
  const boat = boats.find((b) => b.slug === params.slug)
            ?? placeholderBoats.find((b) => b.slug === params.slug);
  if (!boat) return { title: 'Båt ikkje funnen' };
  return {
    title: `${boat.model_name} — Marine | MOVE Sogn`,
    description: boat.tagline ?? `${boat.model_name} frå MOVE Sogn. Frå kr ${boat.price_from},-`,
  };
}

export async function generateStaticParams() {
  let boats = placeholderBoats;
  try { const f = await sanityFetch<MarineBoat[]>(QUERY); if (f.length) boats = f; } catch {}
  return boats.map((b) => ({ slug: b.slug }));
}

export default async function BoatDetailPage({ params }: Props) {
  let boats = placeholderBoats;
  try { const f = await sanityFetch<MarineBoat[]>(QUERY); if (f.length) boats = f; } catch {}

  const boat = boats.find((b) => b.slug === params.slug)
            ?? placeholderBoats.find((b) => b.slug === params.slug);
  if (!boat) notFound();

  const specs      = buildSpecs(boat);
  const paragraphs = (boat.body ?? '').split(/\n\n+/).filter(Boolean);
  const gallery    = (boat.gallery ?? []).filter(Boolean);
  const imgSrc     = boat.image || '/images/silver/sv-01.jpg';
  const isContact  = boat.price_from === 'Kontakt oss';
  const backHref   = boat.brand === 'silver' ? '/marine/silver-boats' : '/marine';
  const backLabel  = boat.brand === 'silver' ? 'Silver Boats' : 'Marine';

  return (
    <>
      {/* ── Hero ──────────────────────────────────────────── */}
      <section className={styles.hero}>
        <div className={`container ${styles.heroContent}`}>
          <FadeUp>
            <Link href={backHref} className={styles.back}>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M19 12H5M12 19l-7-7 7-7"/>
              </svg>
              {backLabel}
            </Link>
            <h1 className={styles.heroH1}>{boat.model_name}</h1>
            {boat.tagline && (
              <p className={styles.heroTagline}>{boat.tagline}</p>
            )}
            <p className={styles.heroPrice}>
              {isContact ? 'Kontakt oss for pris' : `Frå kr ${boat.price_from},-`}
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
                  alt={boat.model_name}
                  fill
                  priority
                  sizes="(max-width: 860px) 80vw, 45vw"
                  style={{ objectFit: 'cover', objectPosition: 'center' }}
                />
              </div>
            </FadeUp>

            <FadeUp delay={100} className={styles.specsPanel}>
              <span className={styles.categoryLabel}>
                {boat.brand === 'silver' ? 'Silver Boats' : 'Marine'}
              </span>

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
                  {isContact ? 'Kontakt oss for pris' : `Frå kr ${boat.price_from},-`}
                </span>
                <p className={styles.priceNote}>
                  Inkl. Suzuki-motor. Kontakt oss for tilbod, utstyrspakkar og leveringstid.
                </p>
                <a href="#kontakt-form" className={`btn btn--primary ${styles.priceBtn}`}>
                  Spør om pris
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
              <p className={styles.galleryLabel}>Galleri — {gallery.length} bilete</p>
            </FadeUp>
            <div className={styles.galleryGrid}>
              {gallery.map((src, i) => {
                const isTall = i > 0 && i % 4 === 2;
                return (
                  <FadeUp
                    key={i}
                    delay={Math.min(i * 50, 300)}
                    className={[
                      styles.galleryItem,
                      i === 0 ? styles.galleryItemWide : '',
                      isTall  ? styles.galleryItemTall : '',
                    ].filter(Boolean).join(' ')}
                  >
                    <Image
                      src={src}
                      alt={`${boat.model_name} — bilete ${i + 1}`}
                      fill
                      sizes="(max-width: 600px) 100vw, (max-width: 900px) 50vw, 33vw"
                      style={{ objectFit: 'cover' }}
                    />
                    {i === gallery.length - 1 && gallery.length >= 6 && (
                      <span className={styles.galleryCount}>{gallery.length} bilete</span>
                    )}
                  </FadeUp>
                );
              })}
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
              prefilledModel={boat.model_name}
              heading={`Interessert i ${boat.model_name}?`}
              subheading="Fyll ut skjemaet så kontaktar me deg med pris og leveringstid."
            />
          </div>
        </div>
      </section>
    </>
  );
}
