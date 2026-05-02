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
  title: 'Sparkesykkel — NIU KQi3 | MOVE Sogn',
  description: 'Elektrisk sparkesykkel frå NIU hos MOVE Sogn. Lett, foldbar og klar for kvardagen i Sogn.',
  openGraph: {
    images: [{ url: 'https://images.unsplash.com/photo-1571068316344-75bc76f77890?w=1200&q=80', width: 1200, height: 630, alt: 'El-sparkesykkel — MOVE Sogn' }],
  },
};

export const revalidate = 300;

const placeholderKickscooters: SykkelProduct[] = [
  {
    slug: 'niu-kqi3-pro',
    name: 'NIU KQi3 Pro',
    category: 'sparkesykkel',
    range_km: '50',
    motor_w: '300',
    weight: '16',
    price_from: '7 990',
    image: '/images/sykkel/sk-02.png',
    images: '',
    body: 'Ikonisk halo-frontlykt, robuste hjul og skivebrems. Lett å folde, passar i bagasjerommet. NIU-app for statistikk og låsing.',
  },
];

const valueProps = [
  { icon: 'leaf'         as const, title: 'Null utslepp',    desc: 'Elektrisk motor — ingen avgasar, ingen støy.' },
  { icon: 'zap'          as const, title: 'Lett og foldbar', desc: 'Berre 16 kg — enkel å ta med på bussen eller i bilen.' },
  { icon: 'trending-up'  as const, title: 'Spar pengar',     desc: 'Lad for nokre øre. Langt billigare enn kollektivt.' },
  { icon: 'clock'        as const, title: 'Spar tid',        desc: 'Slepp parkering. Rull heilt til inngangen.' },
];

export default async function SparkesykkelPage() {
  let products: SykkelProduct[] = placeholderKickscooters;
  try {
    const f = await sanityFetch<SykkelProduct[]>(
      `*[_type == "sykkelProduct" && category == "sparkesykkel"] | order(order asc) {
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
            alt="El-sparkesykkel — MOVE Sogn"
            fill
            priority
            sizes="100vw"
            style={{ objectFit: 'cover', objectPosition: 'center 50%' }}
          />
          <div className={styles.heroOverlay} />
        </div>
        <div className={`container ${styles.heroContent}`}>
          <FadeUp>
            <span className={styles.heroLabel}>Sparkesykkel</span>
            <h1 className={styles.heroH1}>
              Rull fritt.<br />Utan avgasar.
            </h1>
            <p className={styles.heroSub}>
              Elektrisk sparkesykkel — lett, foldbar og alltid klar. Frå Kaupanger.
            </p>
          </FadeUp>
        </div>
      </section>

      {/* ── PRODUCTS ─────────────────────────────────────────── */}
      <section className="section">
        <div className="container">
          <FadeUp>
            <span className="label">NIU</span>
            <h2 className={styles.sectionH2}>Elektriske sparkesyklar</h2>
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
            heading="Spør om sparkesykkel"
            subheading="Ta kontakt for spørsmål om pris, lager eller demo."
          />
        </div>
      </section>
    </>
  );
}

function ProductCard({ product }: { product: SykkelProduct }) {
  return (
    <Link href={`/sparkesykkel/${product.slug}`} className={`card ${styles.productCard}`}>
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
