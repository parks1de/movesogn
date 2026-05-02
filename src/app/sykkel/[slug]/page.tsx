import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { sanityFetch } from '@/lib/sanity';
import FadeUp from '@/components/ui/FadeUp';
import ContactForm from '@/components/ui/ContactForm';
import Icon from '@/components/ui/Icon';
import styles from './detail.module.css';

interface Spec { label: string; value: string }

interface ScooterSpecs {
  rekkevidde?: string; motor?: string; toppfart?: string; ladetid?: string;
  vekt?: string; maxLast?: string; batteri?: string; sertifikat?: string;
}
interface SykkelSpecs {
  rekkevidde?: string; motor?: string; driv?: string; batteri?: string;
  vekt?: string; ramme?: string; hjulstorleik?: string; brems?: string;
}
interface SparkesykkelSpecs {
  rekkevidde?: string; motor?: string; toppfart?: string; ladetid?: string;
  vekt?: string; hjulstorleik?: string; brems?: string; foldbar?: boolean;
}

interface SykkelProduct {
  slug: string;
  name: string;
  tagline: string;
  category: 'scooter' | 'sykkel' | 'sparkesykkel';
  body: string;
  price_from: string;
  image: string;
  gallery: string[];
  specs: Spec[];
  scooterSpecs?: ScooterSpecs;
  sykkelSpecs?: SykkelSpecs;
  sparkesykkelSpecs?: SparkesykkelSpecs;
}

export const revalidate = 300;

const placeholderProducts: SykkelProduct[] = [
  {
    slug: 'niu-nqi-sport',
    name: 'NIU NQi Sport',
    tagline: 'Best rekkevidde i klassen — kom lengre med éi lading.',
    category: 'scooter',
    body: 'NIU NQi Sport er vår mestselgande elektriske scooter. Med 70 km rekkevidde, stilig design og minimal vedlikehald er den eit naturleg val for pendlarar og unge i Sogn.\n\nLadar frå vanleg stikkontakt på 4–5 timar. Inkluderer NIU-appen med GPS-sporing, statistikk og smarte låsefunksjonar. Serviceavtale er inkludert i prisen.',
    price_from: '24 990',
    image: '/images/sykkel/sk-01.png',
    gallery: [],
    specs: [
      { label: 'Rekkevidde', value: '70 km' },
      { label: 'Motor',      value: '1 500 W' },
      { label: 'Toppfart',   value: '45 km/t' },
      { label: 'Ladetid',    value: '4–5 t' },
      { label: 'Vekt',       value: '70 kg' },
      { label: 'Max last',   value: '100 kg' },
    ],
  },
  {
    slug: 'niu-uqi-gt-sport',
    name: 'NIU UQi GT Sport',
    tagline: 'Retro-design. Moderne driv. For alle som vil skilje seg ut.',
    category: 'scooter',
    body: 'NIU UQi GT Sport kombinerer eit ikonisk retrodesign med moderne elektrisk teknologi. Lett og smidig — perfekt for ungdommar og pendlarar som vil ha noko annleis.\n\nLav vekt gjer den enkel å handtere. Ladar på vanleg stikkontakt. God NIU-appintegrasjon med statistikk, rekkevidde og fjernlåsing.',
    price_from: '19 990',
    image: '/images/sykkel/sk-01.png',
    gallery: [],
    specs: [
      { label: 'Rekkevidde', value: '50 km' },
      { label: 'Motor',      value: '1 200 W' },
      { label: 'Toppfart',   value: '45 km/t' },
      { label: 'Ladetid',    value: '6–8 t' },
      { label: 'Vekt',       value: '62 kg' },
      { label: 'Batteri',    value: '60V Li-ion' },
    ],
  },
  {
    slug: 'niu-mqi-sport',
    name: 'NIU MQi+ Sport',
    tagline: 'Rekkeviddemesteren — 100 km på éi lading.',
    category: 'scooter',
    body: 'Med imponerande 100 km rekkevidde er NIU MQi+ Sport den best eigna scooteren for lengre turar og daglege pendlarar i distrikta. Kraftig 2 000 W-motor gjev god akselerasjon og kjøyreglede.\n\nRobust konstruksjon og stor bagasjerom under setet. Kjem med full NIU-appintegrasjon og serviceavtale.',
    price_from: '22 990',
    image: '/images/sykkel/sk-01.png',
    gallery: [],
    specs: [
      { label: 'Rekkevidde', value: '100 km' },
      { label: 'Motor',      value: '2 000 W' },
      { label: 'Toppfart',   value: '45 km/t' },
      { label: 'Ladetid',    value: '5–6 t' },
      { label: 'Vekt',       value: '72 kg' },
      { label: 'Max last',   value: '100 kg' },
    ],
  },
  {
    slug: 'niu-kqi3-pro',
    name: 'NIU KQi3 Pro',
    tagline: 'Lett å folde. Alltid klar. Rull heilt til døra.',
    category: 'sparkesykkel',
    body: 'NIU KQi3 Pro er sparkesykkelen for deg som vil ha fridom utan bagasje. Berre 16 kg, enkel å folde og passar i bagasjerommet eller under pulten.\n\nIkonisk halo-frontlykt og robuste 10-tommars hjul gjev god stabilitet. Skivebrems på begge hjul. NIU-appen gir deg statistikk, reiseoversikt og fjernlåsing.',
    price_from: '7 990',
    image: '/images/sykkel/sk-02.png',
    gallery: [],
    specs: [
      { label: 'Rekkevidde',   value: '50 km' },
      { label: 'Motor',        value: '300 W' },
      { label: 'Toppfart',     value: '25 km/t' },
      { label: 'Ladetid',      value: '5–6 t' },
      { label: 'Vekt',         value: '16 kg' },
      { label: 'Hjulstorleik', value: '10"' },
    ],
  },
  {
    slug: 'merida-e-crossway',
    name: 'Merida eSPRESSO CROSS',
    tagline: 'Terreng og asfalt — éin sykkel for alt.',
    category: 'sykkel',
    body: 'Merida eSPRESSO CROSS er allroundarens sykkel — like heime på grusvegar i Sogndal som på asfalt langs fjorden. Lett aluminiumsramme og Shimano Altus 8-gir gjer turen behageleg uansett underlag.\n\nIntegrert Lithium-ion-batteri gir opptil 150 km rekkevidde avhengig av terrenget. Perfekt for deg som syklar til jobb, men ikkje vil gi slepp på helgeeventyret.',
    price_from: 'Kontakt oss',
    image: '/images/sykkel/sk-03.png',
    gallery: [],
    specs: [
      { label: 'Rekkevidde',  value: 'Opptil 150 km' },
      { label: 'Motor',       value: '250 W (Shimano)' },
      { label: 'Driv',        value: 'Shimano Altus 8-gir' },
      { label: 'Batteri',     value: '418 Wh Li-Ion' },
      { label: 'Vekt',        value: '22 kg' },
      { label: 'Ramme',       value: 'Aluminium' },
    ],
  },
  {
    slug: 'merida-e-speeder',
    name: 'Merida eSPEEDER',
    tagline: 'Kjapp. Elegant. Skapt for dagleg pendling.',
    category: 'sykkel',
    body: 'Merida eSPEEDER er el-sykkelen for deg som verdset design like mykje som funksjon. Det integrerte batteriet og den aerodynamiske ramma gjer det nærast umogleg å sjå at dette er ein el-sykkel.\n\nShimano 8-gir og 250 W motor gjev god ytelse i alle fart. Opptil 130 km rekkevidde — meir enn nok for ein full arbeidsdag med pendling.',
    price_from: 'Kontakt oss',
    image: '/images/sykkel/sk-04.png',
    gallery: [],
    specs: [
      { label: 'Rekkevidde',  value: 'Opptil 130 km' },
      { label: 'Motor',       value: '250 W integrert' },
      { label: 'Driv',        value: 'Shimano 8-gir' },
      { label: 'Batteri',     value: '378 Wh integrert' },
      { label: 'Vekt',        value: '20 kg' },
      { label: 'Ramme',       value: 'Aluminium' },
    ],
  },
];

const QUERY = `*[_type=="sykkelProduct"] | order(order asc) {
  "slug": slug.current, name, tagline, category,
  "price_from": priceFrom,
  "image": image.asset->url,
  "gallery": gallery[].asset->url,
  body,
  scooterSpecs { rekkevidde, motor, toppfart, ladetid, vekt, maxLast, batteri, sertifikat },
  sykkelSpecs { rekkevidde, motor, driv, batteri, vekt, ramme, hjulstorleik, brems },
  sparkesykkelSpecs { rekkevidde, motor, toppfart, ladetid, vekt, hjulstorleik, brems, foldbar }
}`;

function buildSpecs(p: SykkelProduct): Spec[] {
  if (p.specs?.length) return p.specs;

  const add = (label: string, value?: string | boolean): Spec | null =>
    value !== undefined && value !== '' ? { label, value: String(value) } : null;

  if (p.category === 'scooter' && p.scooterSpecs) {
    const s = p.scooterSpecs;
    return [
      add('Rekkevidde', s.rekkevidde), add('Motor', s.motor),
      add('Toppfart', s.toppfart),    add('Ladetid', s.ladetid),
      add('Vekt', s.vekt),            add('Max last', s.maxLast),
      add('Batteri', s.batteri),      add('Sertifikat', s.sertifikat),
    ].filter((x): x is Spec => x !== null);
  }
  if (p.category === 'sykkel' && p.sykkelSpecs) {
    const s = p.sykkelSpecs;
    return [
      add('Rekkevidde', s.rekkevidde), add('Motor', s.motor),
      add('Driv', s.driv),            add('Batteri', s.batteri),
      add('Vekt', s.vekt),            add('Ramme', s.ramme),
      add('Hjulstorleik', s.hjulstorleik), add('Brems', s.brems),
    ].filter((x): x is Spec => x !== null);
  }
  if (p.category === 'sparkesykkel' && p.sparkesykkelSpecs) {
    const s = p.sparkesykkelSpecs;
    return [
      add('Rekkevidde', s.rekkevidde), add('Motor', s.motor),
      add('Toppfart', s.toppfart),    add('Ladetid', s.ladetid),
      add('Vekt', s.vekt),            add('Hjulstorleik', s.hjulstorleik),
      add('Brems', s.brems),
      s.foldbar !== undefined ? { label: 'Foldbar', value: s.foldbar ? 'Ja' : 'Nei' } : null,
    ].filter((x): x is Spec => x !== null);
  }
  return [];
}

const categoryLabel: Record<string, string> = {
  sykkel:       'El-sykkel',
  scooter:      'El-moped',
  sparkesykkel: 'Sparkesykkel',
};

const categoryBack: Record<string, string> = {
  sykkel:       '/sykkel/merida',
  scooter:      '/elmoped',
  sparkesykkel: '/sparkesykkel',
};

interface Props { params: { slug: string } }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  let products = placeholderProducts;
  try { const f = await sanityFetch<SykkelProduct[]>(QUERY); if (f.length) products = f; } catch {}
  const p = products.find((x) => x.slug === params.slug)
         ?? placeholderProducts.find((x) => x.slug === params.slug);
  if (!p) return { title: 'Produkt ikkje funnen' };
  return {
    title: `${p.name} — ${categoryLabel[p.category] ?? 'Sykkel'} | MOVE Sogn`,
    description: p.tagline ?? `${p.name} hos MOVE Sogn på Kaupanger.`,
  };
}

export async function generateStaticParams() {
  let products = placeholderProducts;
  try { const f = await sanityFetch<SykkelProduct[]>(QUERY); if (f.length) products = f; } catch {}
  return products.map((p) => ({ slug: p.slug }));
}

export default async function ProductDetailPage({ params }: Props) {
  let products = placeholderProducts;
  try { const f = await sanityFetch<SykkelProduct[]>(QUERY); if (f.length) products = f; } catch {}

  const product = products.find((p) => p.slug === params.slug)
               ?? placeholderProducts.find((p) => p.slug === params.slug);
  if (!product) notFound();

  const specs      = buildSpecs(product);
  const paragraphs = (product.body ?? '').split(/\n\n+/).filter(Boolean);
  const catLabel   = categoryLabel[product.category] ?? 'Produkt';
  const backHref   = categoryBack[product.category]  ?? '/sykkel';
  const isContact  = product.price_from === 'Kontakt oss';
  const gallery    = (product.gallery ?? []).filter(Boolean);
  const imgSrc     = product.image || '/images/sykkel/sk-01.png';

  return (
    <>
      {/* ── Hero — dark slate, name + tagline + price ─────── */}
      <section className={styles.hero}>
        <div className={`container ${styles.heroContent}`}>
          <FadeUp>
            <Link href={backHref} className={styles.back}>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M19 12H5M12 19l-7-7 7-7"/>
              </svg>
              {catLabel}
            </Link>
            <h1 className={styles.heroH1}>{product.name}</h1>
            {product.tagline && (
              <p className={styles.heroTagline}>{product.tagline}</p>
            )}
            <p className={styles.heroPrice}>
              {isContact ? 'Kontakt oss for pris' : `Frå kr ${product.price_from},-`}
            </p>
          </FadeUp>
        </div>
      </section>

      {/* Orange→blue brand divider */}
      <div className={styles.divider} />

      {/* ── Product body — 1:1 image LEFT + specs RIGHT ────── */}
      <section className={styles.productBody}>
        <div className="container">
          <div className={styles.productBodyGrid}>

            <FadeUp>
              <div className={styles.productImgWrap}>
                <Image
                  src={imgSrc}
                  alt={product.name}
                  fill
                  priority
                  sizes="(max-width: 860px) 80vw, 45vw"
                  style={{ objectFit: 'contain', objectPosition: 'center' }}
                />
              </div>
            </FadeUp>

            <FadeUp delay={100} className={styles.specsPanel}>
              <span className={styles.categoryLabel}>{catLabel}</span>

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
                  Inkl. levering til Kaupanger. Kontakt oss for tilbod og lagerstatus.
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

      {/* ── Description — full width ─────────────────────── */}
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

      {/* ── Gallery ─────────────────────────────────────── */}
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
                      alt={`${product.name} — bilete ${i + 1}`}
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

      {/* ── Contact form ────────────────────────────────── */}
      <section className={`section ${styles.formSection}`} id="kontakt-form">
        <div className="container">
          <div className={styles.formWrap}>
            <ContactForm
              formType="sykkel"
              prefilledModel={product.name}
              heading={`Interessert i ${product.name}?`}
              subheading="Kontakt oss for test-køyring, tilbod eller lagerstatus."
            />
          </div>
        </div>
      </section>
    </>
  );
}
