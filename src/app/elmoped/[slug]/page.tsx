import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { sanityFetch } from '@/lib/sanity';
import FadeUp from '@/components/ui/FadeUp';
import ContactForm from '@/components/ui/ContactForm';
import Icon from '@/components/ui/Icon';
import styles from '../../sykkel/[slug]/detail.module.css';

interface Spec { label: string; value: string }

interface ScooterSpecs {
  rekkevidde?: string; motor?: string; toppfart?: string; ladetid?: string;
  vekt?: string; maxLast?: string; batteri?: string; sertifikat?: string;
}

interface SykkelProduct {
  slug: string;
  name: string;
  tagline: string;
  category: 'scooter';
  body: string;
  price_from: string;
  image: string;
  gallery: string[];
  specs: Spec[];
  scooterSpecs?: ScooterSpecs;
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
];

const QUERY = `*[_type=="sykkelProduct" && category=="scooter"] | order(order asc) {
  "slug": slug.current, name, tagline, category,
  "price_from": priceFrom,
  "image": image.asset->url,
  "gallery": gallery[].asset->url,
  body,
  scooterSpecs { rekkevidde, motor, toppfart, ladetid, vekt, maxLast, batteri, sertifikat }
}`;

function buildSpecs(p: SykkelProduct): Spec[] {
  if (p.specs?.length) return p.specs;
  if (!p.scooterSpecs) return [];
  const s = p.scooterSpecs;
  const add = (label: string, value?: string): Spec | null =>
    value ? { label, value } : null;
  return [
    add('Rekkevidde', s.rekkevidde), add('Motor', s.motor),
    add('Toppfart', s.toppfart),    add('Ladetid', s.ladetid),
    add('Vekt', s.vekt),            add('Max last', s.maxLast),
    add('Batteri', s.batteri),      add('Sertifikat', s.sertifikat),
  ].filter((x): x is Spec => x !== null);
}

interface Props { params: { slug: string } }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  let products = placeholderProducts;
  try { const f = await sanityFetch<SykkelProduct[]>(QUERY); if (f.length) products = f; } catch {}
  const p = products.find((x) => x.slug === params.slug)
         ?? placeholderProducts.find((x) => x.slug === params.slug);
  if (!p) return { title: 'Produkt ikkje funnen' };
  return {
    title: `${p.name} — El-moped | MOVE Sogn`,
    description: p.tagline ?? `${p.name} hos MOVE Sogn på Kaupanger.`,
  };
}

export async function generateStaticParams() {
  let products = placeholderProducts;
  try { const f = await sanityFetch<SykkelProduct[]>(QUERY); if (f.length) products = f; } catch {}
  return products.map((p) => ({ slug: p.slug }));
}

export default async function ElmopedDetailPage({ params }: Props) {
  let products = placeholderProducts;
  try { const f = await sanityFetch<SykkelProduct[]>(QUERY); if (f.length) products = f; } catch {}

  const product = products.find((p) => p.slug === params.slug)
               ?? placeholderProducts.find((p) => p.slug === params.slug);
  if (!product) notFound();

  const specs      = buildSpecs(product);
  const paragraphs = (product.body ?? '').split(/\n\n+/).filter(Boolean);
  const isContact  = product.price_from === 'Kontakt oss';
  const gallery    = (product.gallery ?? []).filter(Boolean);
  const imgSrc     = product.image || '/images/sykkel/sk-01.png';

  return (
    <>
      <section className={styles.hero}>
        <div className={`container ${styles.heroContent}`}>
          <FadeUp>
            <Link href="/elmoped" className={styles.back}>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M19 12H5M12 19l-7-7 7-7"/>
              </svg>
              El-moped
            </Link>
            <h1 className={styles.heroH1}>{product.name}</h1>
            {product.tagline && <p className={styles.heroTagline}>{product.tagline}</p>}
            <p className={styles.heroPrice}>
              {isContact ? 'Kontakt oss for pris' : `Frå kr ${product.price_from},-`}
            </p>
          </FadeUp>
        </div>
      </section>

      <div className={styles.divider} />

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
              <span className={styles.categoryLabel}>El-moped</span>

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

      {gallery.length > 0 && (
        <section className={`section ${styles.gallerySection}`}>
          <div className="container">
            <FadeUp>
              <p className={styles.galleryLabel}>Galleri — {gallery.length} bilete</p>
            </FadeUp>
            <div className={styles.galleryGrid}>
              {gallery.map((src, i) => (
                <FadeUp key={i} delay={Math.min(i * 50, 300)}
                  className={[styles.galleryItem, i === 0 ? styles.galleryItemWide : ''].filter(Boolean).join(' ')}>
                  <Image src={src} alt={`${product.name} — bilete ${i + 1}`} fill
                    sizes="(max-width: 600px) 100vw, (max-width: 900px) 50vw, 33vw"
                    style={{ objectFit: 'cover' }} />
                </FadeUp>
              ))}
            </div>
          </div>
        </section>
      )}

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
