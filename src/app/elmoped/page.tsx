import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { sanityFetch } from '@/lib/sanity';
import FadeUp from '@/components/ui/FadeUp';
import Icon from '@/components/ui/Icon';
import ContactForm from '@/components/ui/ContactForm';
import styles from '../sykkel/page.module.css';

interface SykkelProduct {
  slug: string; name: string; category: string;
  range_km: string; motor_w: string; weight: string;
  price_from: string; image: string; images: string; body: string;
}

export const metadata: Metadata = {
  title: 'El-moped — NIU | MOVE Sogn',
  description: 'NIU elektriske mopedscooterar hos MOVE Sogn i Kaupanger. Null utslepp, lad på stikkontakt. Enkelt og stilig.',
  openGraph: {
    images: [{ url: 'https://images.unsplash.com/photo-1571068316344-75bc76f77890?w=1200&q=80', width: 1200, height: 630, alt: 'NIU el-moped — MOVE Sogn' }],
  },
};

export const revalidate = 300;

const placeholderScooters: SykkelProduct[] = [
  {
    slug: 'niu-nqi-sport',
    name: 'NIU NQi Sport',
    category: 'scooter',
    range_km: '70',
    motor_w: '1500',
    weight: '70',
    price_from: '24 990',
    image: '/images/sykkel/sk-01.png',
    images: '',
    body: 'Vår mestseljande elektriske scooter. God rekkevidde, lading på vanleg stikkontakt, minimal vedlikehald. Inkl. basis serviceavtale.',
  },
  {
    slug: 'niu-uqi-gt-sport',
    name: 'NIU UQi GT Sport',
    category: 'scooter',
    range_km: '50',
    motor_w: '1200',
    weight: '62',
    price_from: '19 990',
    image: '/images/sykkel/sk-01.png',
    images: '',
    body: 'Enkel og prisgunstig elektrisk scooter med innovativt retro-design. For alle — ungdommar eller pendlarar i sentrale strøk.',
  },
  {
    slug: 'niu-mqi-sport',
    name: 'NIU MQi+ Sport',
    category: 'scooter',
    range_km: '100',
    motor_w: '2000',
    weight: '72',
    price_from: '22 990',
    image: '/images/sykkel/sk-01.png',
    images: '',
    body: 'Scooteren med best rekkevidde i NIU-serien. Morosam, rask og kvalitetssikker — pendling og skule er enkelt.',
  },
];

const valueProps = [
  { icon: 'leaf'         as const, title: 'Null utslepp', desc: 'Elektrisk motor — ingen avgasar, ingen støy.' },
  { icon: 'zap'          as const, title: 'Lad heime',    desc: 'Vanleg stikkontakt held batteriet fullt over natta.' },
  { icon: 'trending-up'  as const, title: 'Spar pengar',  desc: 'Ladekostnad er ein brøkdel av bensin og forsikring.' },
  { icon: 'clock'        as const, title: 'Spar tid',     desc: 'Slepp kø og parkering i sentrum.' },
];

export default async function ElMopedPage() {
  let products: SykkelProduct[] = placeholderScooters;
  try {
    const f = await sanityFetch<SykkelProduct[]>(
      `*[_type == "sykkelProduct" && category == "scooter"] | order(order asc) {
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
            alt="NIU el-moped — MOVE Sogn"
            fill
            priority
            sizes="100vw"
            style={{ objectFit: 'cover', objectPosition: 'center 50%' }}
          />
          <div className={styles.heroOverlay} />
        </div>
        <div className={`container ${styles.heroContent}`}>
          <FadeUp>
            <span className={styles.heroLabel}>El-moped</span>
            <h1 className={styles.heroH1}>
              Smart mobilitet.<br />Null kompromiss.
            </h1>
            <p className={styles.heroSub}>
              NIU el-moped — lad heime, køyr kvar dag. Frå Kaupanger.
            </p>
          </FadeUp>
        </div>
      </section>

      {/* ── PRODUCTS ─────────────────────────────────────────── */}
      <section className="section">
        <div className="container">
          <FadeUp>
            <span className="label">NIU</span>
            <h2 className={styles.sectionH2}>El-mopedscooterar</h2>
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
            heading="Prøv ein NIU el-moped"
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
