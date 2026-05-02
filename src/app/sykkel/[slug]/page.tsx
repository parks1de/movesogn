/*
  Sanity schema — sykkelProduct — expected fields:
  ─────────────────────────────────────────────────
  slug        slug           → route key
  name        string         → product name
  tagline     string         → one-line slogan (shown in hero + below H2)
  category    string         → 'sykkel' | 'scooter' | 'sparkesykkel'
  body        text           → description (double newline = new paragraph)
  image       image          → hero/card image (product on transparent/white bg)
  gallery     array<image>   → additional photos
  priceFrom   string         → "24 990" or "Kontakt oss"
  specs       array          → [{ label: string, value: string }]
  ─────────────────────────────────────────────────
*/

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

interface SykkelProduct {
  slug: string;
  name: string;
  tagline: string;
  category: string;
  body: string;
  price_from: string;
  image: string;
  images: string;
  specs: Spec[];
  range_km: string;
  motor_w: string;
  weight: string;
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
    images: '',
    specs: [
      { label: 'Rekkevidde',    value: '70 km' },
      { label: 'Motor',         value: '1 500 W' },
      { label: 'Toppfart',      value: '45 km/t' },
      { label: 'Ladetid',       value: '4–5 t' },
      { label: 'Vekt',          value: '70 kg' },
      { label: 'Max last',      value: '100 kg' },
    ],
    range_km: '70', motor_w: '1500', weight: '70',
  },
  {
    slug: 'niu-uqi-gt-sport',
    name: 'NIU UQi GT Sport',
    tagline: 'Retro-design. Moderne driv. For alle som vil skilje seg ut.',
    category: 'scooter',
    body: 'NIU UQi GT Sport kombinerer eit ikonisk retrodesign med moderne elektrisk teknologi. Lett og smidig — perfekt for ungdommar og pendlarar som vil ha noko annleis.\n\nLav vekt gjer den enkel å handtere. Ladar på vanleg stikkontakt. God NIU-appintegrasjon med statistikk, rekkevidde og fjernlåsing.',
    price_from: '19 990',
    image: '/images/sykkel/sk-01.png',
    images: '',
    specs: [
      { label: 'Rekkevidde',    value: '50 km' },
      { label: 'Motor',         value: '1 200 W' },
      { label: 'Toppfart',      value: '45 km/t' },
      { label: 'Ladetid',       value: '6–8 t' },
      { label: 'Vekt',          value: '62 kg' },
      { label: 'Batteri',       value: '60V Li-ion' },
    ],
    range_km: '50', motor_w: '1200', weight: '62',
  },
  {
    slug: 'niu-mqi-sport',
    name: 'NIU MQi+ Sport',
    tagline: 'Rekkeviddemesteren — 100 km på éi lading.',
    category: 'scooter',
    body: 'Med imponerande 100 km rekkevidde er NIU MQi+ Sport den best eigna scooteren for lengre turar og daglege pendlarar i distrikta. Kraftig 2 000 W-motor gjev god akselerasjon og kjøyreglede.\n\nRobust konstruksjon og stor bagasjerom under setet. Kjem med full NIU-appintegrasjon og serviceavtale.',
    price_from: '22 990',
    image: '/images/sykkel/sk-01.png',
    images: '',
    specs: [
      { label: 'Rekkevidde',    value: '100 km' },
      { label: 'Motor',         value: '2 000 W' },
      { label: 'Toppfart',      value: '45 km/t' },
      { label: 'Ladetid',       value: '5–6 t' },
      { label: 'Vekt',          value: '72 kg' },
      { label: 'Max last',      value: '100 kg' },
    ],
    range_km: '100', motor_w: '2000', weight: '72',
  },
  {
    slug: 'niu-kqi3-pro',
    name: 'NIU KQi3 Pro',
    tagline: 'Lett å folde. Alltid klar. Rull heilt til døra.',
    category: 'sparkesykkel',
    body: 'NIU KQi3 Pro er sparkesykkelen for deg som vil ha fridom utan bagasje. Berre 16 kg, enkel å folde og passar i bagasjerommet eller under pulten.\n\nIkonisk halo-frontlykt og robuste 10-tommars hjul gjev god stabilitet. Skivebrems på begge hjul. NIU-appen gir deg statistikk, reiseoversikt og fjernlåsing.',
    price_from: '7 990',
    image: '/images/sykkel/sk-02.png',
    images: '',
    specs: [
      { label: 'Rekkevidde',    value: '50 km' },
      { label: 'Motor',         value: '300 W' },
      { label: 'Toppfart',      value: '25 km/t' },
      { label: 'Ladetid',       value: '5–6 t' },
      { label: 'Vekt',          value: '16 kg' },
      { label: 'Hjulstorleik',  value: '10"' },
    ],
    range_km: '50', motor_w: '300', weight: '16',
  },
  {
    slug: 'merida-e-crossway',
    name: 'Merida eSPRESSO CROSS',
    tagline: 'Terreng og asfalt — éin sykkel for alt.',
    category: 'sykkel',
    body: 'Merida eSPRESSO CROSS er allroundarens sykkel — like heime på grusvegar i Sogndal som på asfalt langs fjorden. Lett aluminiumsramme og Shimano Altus 8-gir gjer turen behageleg uansett underlag.\n\nIntegrert Lithium-ion-batteri gir opptil 150 km rekkevidde avhengig av terrenget. Perfekt for deg som syklar til jobb, men ikkje vil gi slepp på helgeeventyret.',
    price_from: 'Kontakt oss',
    image: '/images/sykkel/sk-03.png',
    images: '',
    specs: [
      { label: 'Rekkevidde',   value: 'Opptil 150 km' },
      { label: 'Motor',        value: '250 W (Shimano)' },
      { label: 'Driv',         value: 'Shimano Altus 8-gir' },
      { label: 'Batteri',      value: '418 Wh Li-Ion' },
      { label: 'Vekt',         value: '22 kg' },
      { label: 'Ramme',        value: 'Aluminium' },
    ],
    range_km: '150', motor_w: '250', weight: '22',
  },
  {
    slug: 'merida-e-speeder',
    name: 'Merida eSPEEDER',
    tagline: 'Kjapp. Elegant. Skapt for dagleg pendling.',
    category: 'sykkel',
    body: 'Merida eSPEEDER er el-sykkelen for deg som verdset design like mykje som funksjon. Det integrerte batteriet og den aerodynamiske ramma gjer det nærast umogleg å sjå at dette er ein el-sykkel.\n\nShimano 8-gir og 250 W motor gjev god ytelse i alle fart. Opptil 130 km rekkevidde — meir enn nok for ein full arbeidsdag med pendling.',
    price_from: 'Kontakt oss',
    image: '/images/sykkel/sk-04.png',
    images: '',
    specs: [
      { label: 'Rekkevidde',   value: 'Opptil 130 km' },
      { label: 'Motor',        value: '250 W integrert' },
      { label: 'Driv',         value: 'Shimano 8-gir' },
      { label: 'Batteri',      value: '378 Wh integrert' },
      { label: 'Vekt',         value: '20 kg' },
      { label: 'Ramme',        value: 'Aluminium' },
    ],
    range_km: '130', motor_w: '250', weight: '20',
  },
];

const QUERY = `*[_type=="sykkelProduct"] | order(order asc) {
  "slug": slug.current, name, tagline, category,
  "range_km": rangeKm, "motor_w": motorW, weight,
  "price_from": priceFrom,
  "image": image,
  "images": array::join(gallery, ","),
  body,
  specs[]{ label, value }
}`;

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

  const galleryImages: string[] = product.images
    ? product.images.split(',').map((s) => s.trim()).filter(Boolean)
    : [];

  const specs: Spec[] = product.specs?.length
    ? product.specs
    : ([
        product.range_km && { label: 'Rekkevidde', value: `${product.range_km} km` },
        product.motor_w  && { label: 'Motor',      value: `${product.motor_w} W` },
        product.weight   && { label: 'Vekt',       value: `${product.weight} kg` },
      ].filter(Boolean) as Spec[]);

  const paragraphs = (product.body ?? '').split(/\n\n+/).filter(Boolean);
  const catLabel   = categoryLabel[product.category] ?? 'Produkt';
  const backHref   = categoryBack[product.category]  ?? '/sykkel';
  const isContact  = product.price_from === 'Kontakt oss';

  return (
    <>
      {/* ── Hero — dark bg, product image contained right ─── */}
      <section className={styles.hero}>
        <Image
          src={product.image}
          alt={product.name}
          fill
          priority
          sizes="100vw"
          className={styles.heroImg}
          style={{ objectFit: 'contain', objectPosition: 'center right' }}
        />
        <div className={styles.heroOverlay} />
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

      {/* Orange→blue divider */}
      <div className={styles.divider} />

      {/* ── Detail — description left + specs/price right ─── */}
      <section className={styles.detail}>
        <div className="container">
          <div className={styles.detailGrid}>

            {/* Left: description */}
            <FadeUp className={styles.detailLeft}>
              <span className={styles.categoryLabel}>{catLabel}</span>
              <h2 className={styles.detailH2}>{product.name}</h2>
              {product.tagline && (
                <p className={styles.detailTagline}>{product.tagline}</p>
              )}
              <div className={styles.descText}>
                {paragraphs.map((p, i) => <p key={i}>{p}</p>)}
              </div>
            </FadeUp>

            {/* Right: specs + price */}
            <FadeUp delay={100} className={styles.detailRight}>
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

      {/* ── Gallery ─────────────────────────────────────────── */}
      {galleryImages.length > 0 && (
        <section className={`section ${styles.gallerySection}`}>
          <div className="container">
            <FadeUp>
              <p className={styles.galleryLabel}>
                Galleri — {galleryImages.length} bilete
              </p>
            </FadeUp>
            <div className={styles.galleryGrid}>
              {galleryImages.map((src, i) => {
                const isTall = i > 0 && i % 4 === 2;
                return (
                  <FadeUp
                    key={i}
                    delay={Math.min(i * 50, 300)}
                    className={[
                      styles.galleryItem,
                      i === 0        ? styles.galleryItemWide : '',
                      isTall         ? styles.galleryItemTall : '',
                    ].filter(Boolean).join(' ')}
                  >
                    <Image
                      src={src}
                      alt={`${product.name} — bilete ${i + 1}`}
                      fill
                      sizes="(max-width: 600px) 100vw, (max-width: 900px) 50vw, 33vw"
                      style={{ objectFit: 'cover' }}
                    />
                    {i === galleryImages.length - 1 && galleryImages.length >= 6 && (
                      <span className={styles.galleryCount}>{galleryImages.length} bilete</span>
                    )}
                  </FadeUp>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* ── Contact form ────────────────────────────────────── */}
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
