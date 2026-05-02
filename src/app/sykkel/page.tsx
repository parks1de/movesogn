import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { sanityFetch } from '@/lib/sanity';
import FadeUp from '@/components/ui/FadeUp';
import Icon from '@/components/ui/Icon';
import ContactForm from '@/components/ui/ContactForm';
import styles from './page.module.css';

interface SykkelProduct {
  slug: string; name: string; category: string;
  range_km: string; motor_w: string; weight: string;
  price_from: string; image: string; images: string; body: string;
}

export const metadata: Metadata = {
  title: 'El-syklar — MOVE Sogn',
  description: 'Elektriske syklar hos MOVE Sogn i Kaupanger. Opptil 150 km rekkevidde — for pendling og eventyr i Sogn.',
  openGraph: {
    images: [{ url: 'https://images.unsplash.com/photo-1571068316344-75bc76f77890?w=1200&q=80', width: 1200, height: 630, alt: 'El-sykkel på fjordveg i Sogn' }],
  },
};

export const revalidate = 300;

const placeholderBikes: SykkelProduct[] = [
  {
    slug: 'merida-e-crossway',
    name: 'Merida eSPRESSO CROSS',
    category: 'sykkel',
    range_km: '150',
    motor_w: '250',
    weight: '22',
    price_from: 'Kontakt oss',
    image: '/images/sykkel/sk-03.png',
    images: '',
    body: 'El-sykkel for terreng og asfalt — lett aluminiumsramme, Shimano driv og Lithium-ion-batteri. Opptil 150 km rekkevidde.',
  },
  {
    slug: 'merida-e-speeder',
    name: 'Merida eSPEEDER',
    category: 'sykkel',
    range_km: '130',
    motor_w: '250',
    weight: '20',
    price_from: 'Kontakt oss',
    image: '/images/sykkel/sk-04.png',
    images: '',
    body: 'Rask og elegant el-sykkel for dagleg pendling — aerodynamisk design og integrert batteri. Perfekt for bykøyring i Sogn.',
  },
];

const valueProps = [
  { icon: 'leaf'         as const, title: 'Null utslepp',  desc: 'Elektrisk motor — bra for lommeboka og naturen.' },
  { icon: 'zap'          as const, title: 'Opptil 150 km', desc: 'Kraftig batteri som held deg i salen heile dagen.' },
  { icon: 'trending-up'  as const, title: 'Spar pengar',   desc: 'Lad for nokre kroner — ikkje 200 kr/liter.' },
  { icon: 'clock'        as const, title: 'Spar tid',      desc: 'Sykkelsti, ikkje kø. Du kjem fram raskare.' },
];

export default async function ElSyklarPage() {
  let products: SykkelProduct[] = placeholderBikes;
  try {
    const f = await sanityFetch<SykkelProduct[]>(
      `*[_type == "sykkelProduct" && category == "sykkel"] | order(order asc) {
        "slug": slug.current, name, category,
        "range_km": rangeKm, "motor_w": motorW, weight,
        "price_from": priceFrom,
        "image": image,
        "images": array::join(gallery, ","),
        body
      }`
    );
    if (f.length > 0) products = f;
  } catch {}

  return (
    <>
      {/* ── HERO ─────────────────────────────────────────────── */}
      <section className={styles.hero}>
        <div className={styles.heroBg}>
          <Image
            src="/images/sykkel-hero.png"
            alt="El-sykkel — MOVE Sogn"
            fill
            priority
            sizes="100vw"
            style={{ objectFit: 'cover', objectPosition: 'center 50%' }}
          />
          <div className={styles.heroOverlay} />
        </div>
        <div className={`container ${styles.heroContent}`}>
          <FadeUp>
            <span className={styles.heroLabel}>El-syklar</span>
            <h1 className={styles.heroH1}>
              Kjenn fridom<br />på kvar pedaltak.
            </h1>
            <p className={styles.heroSub}>
              Elektriske syklar for fjord og fjell — levert frå Kaupanger.
            </p>
          </FadeUp>
        </div>
      </section>

      {/* ── PRODUCTS ─────────────────────────────────────────── */}
      <section className="section">
        <div className="container">
          <FadeUp>
            <span className="label">Sortiment</span>
            <h2 className={styles.sectionH2}>El-syklar</h2>
          </FadeUp>
          <div className={styles.productGrid}>
            {products.map((product, i) => (
              <FadeUp key={product.slug} delay={i * 70}>
                <ProductCard product={product} />
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      {/* ── VALUE PROPS ──────────────────────────────────────── */}
      <section className="section bg-surface">
        <div className="container">
          <div className={styles.valueGrid}>
            {valueProps.map((v, i) => (
              <FadeUp key={v.title} delay={i * 60}>
                <div className={styles.valueCard}>
                  <span className={styles.valueIcon}><Icon name={v.icon} size={20} /></span>
                  <h3>{v.title}</h3>
                  <p>{v.desc}</p>
                </div>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      {/* ── CONTACT ──────────────────────────────────────────── */}
      <section className="section">
        <div className="container">
          <ContactForm
            formType="sykkel"
            heading="Prøvekøyr ein el-sykkel"
            subheading="Ta kontakt for test-køyring, prisførespurnad eller leveringstid."
          />
        </div>
      </section>
    </>
  );
}

function ProductCard({ product }: { product: SykkelProduct }) {
  return (
    <Link href={`/sykkel/${product.slug}`} className={`card ${styles.productCard}`}>
      <div className={`img-fill ${styles.productImg}`}>
        <Image
          src={product.image}
          alt={product.name}
          fill
          sizes="(max-width: 768px) 100vw, 33vw"
          style={{ objectFit: 'cover' }}
        />
      </div>
      <div className={styles.productBody}>
        <h3 className={styles.productName}>{product.name}</h3>
        <div className={styles.productMeta}>
          {product.range_km && <span>Rekkevidde {product.range_km} km</span>}
        </div>
        <p className={styles.productDesc}>{(product.body ?? '').slice(0, 100)}…</p>
        <div className={styles.productFooter}>
          <strong className={styles.productPrice}>
            {product.price_from.startsWith('k') || product.price_from === 'Kontakt oss'
              ? product.price_from
              : `Frå kr ${product.price_from},-`}
          </strong>
          <span className={styles.productCta}>Sjå meir →</span>
        </div>
      </div>
    </Link>
  );
}
