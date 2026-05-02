import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound, redirect } from 'next/navigation';
import { sanityFetch } from '@/lib/sanity';
import FadeUp from '@/components/ui/FadeUp';
import ContactForm from '@/components/ui/ContactForm';
import Icon from '@/components/ui/Icon';
import styles from './detail.module.css';

interface Spec { label: string; value: string }

interface SykkelSpecs {
  rekkevidde?: string; motor?: string; driv?: string; batteri?: string;
  vekt?: string; ramme?: string; hjulstorleik?: string; brems?: string;
}

interface SykkelProduct {
  slug: string;
  name: string;
  tagline: string;
  category: 'sykkel' | 'scooter' | 'sparkesykkel';
  body: string;
  price_from: string;
  image: string;
  gallery: string[];
  specs: Spec[];
  sykkelSpecs?: SykkelSpecs;
}

export const revalidate = 300;

const placeholderProducts: SykkelProduct[] = [
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
  sykkelSpecs { rekkevidde, motor, driv, batteri, vekt, ramme, hjulstorleik, brems }
}`;

function buildSpecs(p: SykkelProduct): Spec[] {
  if (p.specs?.length) return p.specs;
  if (!p.sykkelSpecs) return [];
  const s = p.sykkelSpecs;
  const add = (label: string, value?: string): Spec | null =>
    value ? { label, value } : null;
  return [
    add('Rekkevidde', s.rekkevidde), add('Motor', s.motor),
    add('Driv', s.driv),            add('Batteri', s.batteri),
    add('Vekt', s.vekt),            add('Ramme', s.ramme),
    add('Hjulstorleik', s.hjulstorleik), add('Brems', s.brems),
  ].filter((x): x is Spec => x !== null);
}

interface Props { params: { slug: string } }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  let products = placeholderProducts;
  try { const f = await sanityFetch<SykkelProduct[]>(QUERY); if (f.length) products = f; } catch {}
  const p = products.find((x) => x.slug === params.slug && x.category === 'sykkel')
         ?? placeholderProducts.find((x) => x.slug === params.slug && x.category === 'sykkel');
  if (!p) return { title: 'Produkt ikkje funnen' };
  return {
    title: `${p.name} — El-sykkel | MOVE Sogn`,
    description: p.tagline ?? `${p.name} hos MOVE Sogn på Kaupanger.`,
  };
}

export async function generateStaticParams() {
  let products = placeholderProducts;
  try { const f = await sanityFetch<SykkelProduct[]>(QUERY); if (f.length) products = f; } catch {}
  return products.filter(p => p.category === 'sykkel').map((p) => ({ slug: p.slug }));
}

export default async function SykkelDetailPage({ params }: Props) {
  let products = placeholderProducts;
  try { const f = await sanityFetch<SykkelProduct[]>(QUERY); if (f.length) products = f; } catch {}

  const allProducts = [...products, ...placeholderProducts];
  const anyMatch = allProducts.find(p => p.slug === params.slug);

  if (anyMatch?.category === 'scooter') redirect(`/elmoped/${params.slug}`);
  if (anyMatch?.category === 'sparkesykkel') redirect(`/sparkesykkel/${params.slug}`);

  const product = products.find((p) => p.slug === params.slug && p.category === 'sykkel')
               ?? placeholderProducts.find((p) => p.slug === params.slug && p.category === 'sykkel');
  if (!product) notFound();

  const specs      = buildSpecs(product);
  const paragraphs = (product.body ?? '').split(/\n\n+/).filter(Boolean);
  const isContact  = product.price_from === 'Kontakt oss';
  const gallery    = (product.gallery ?? []).filter(Boolean);
  const imgSrc     = product.image || '/images/sykkel/sk-03.png';

  return (
    <>
      <section className={styles.hero}>
        <div className={`container ${styles.heroContent}`}>
          <FadeUp>
            <Link href="/sykkel" className={styles.back}>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M19 12H5M12 19l-7-7 7-7"/>
              </svg>
              El-syklar
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
              <span className={styles.categoryLabel}>El-sykkel</span>

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
