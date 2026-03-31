import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { fetchSykkelProducts, type SykkelProduct } from '@/lib/sheets';
import FadeUp from '@/components/ui/FadeUp';
import Icon from '@/components/ui/Icon';
import ContactForm from '@/components/ui/ContactForm';
import styles from './page.module.css';

export const metadata: Metadata = {
  title: 'Sykkel — Merida el-syklar og NIU moped',
  description:
    'MOVE Sogn sel Merida el-syklar og NIU el-moped i Sogn. Null utslepp, låge kostnader. Kaupanger i Sogn.',
  openGraph: {
    images: [{ url: 'https://images.unsplash.com/photo-1571068316344-75bc76f77890?w=1200&q=80', width: 1200, height: 630, alt: 'El-sykkel på fjordveg i Sogn' }],
  },
};

export const revalidate = 300;

const placeholderProducts: SykkelProduct[] = [
  {
    slug: 'niu-nqi-sport',
    name: 'NIU NQi Sport',
    category: 'scooter',
    range_km: '70',
    motor_w: '1500',
    weight: '70',
    price_from: '24 990',
    image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80',
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
    image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80',
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
    image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80',
    images: '',
    body: 'Scooteren med best rekkevidde i NIU-serien. Morosam, rask og kvalitetssikker — pendling og skule er enkelt.',
  },
  {
    slug: 'niu-kqi3-pro',
    name: 'NIU KQi3 Pro',
    category: 'sparkesykkel',
    range_km: '50',
    motor_w: '300',
    weight: '16',
    price_from: '7 990',
    image: 'https://images.unsplash.com/photo-1571068316344-75bc76f77890?w=800&q=80',
    images: '',
    body: 'Ikonisk halo-frontlykt, robuste hjul og skivebrems. Lett å folde, passar i bagasjerommet. NIU-app for statistikk og låsing.',
  },
  {
    slug: 'merida-e-crossway',
    name: 'Merida eSPRESSO CROSS',
    category: 'sykkel',
    range_km: '150',
    motor_w: '250',
    weight: '22',
    price_from: 'Kontakt oss',
    image: 'https://images.unsplash.com/photo-1571068316344-75bc76f77890?w=800&q=80',
    images: '',
    body: 'Merida el-sykkel for terreng og asfalt — lett aluminiumsramme, Shimano driv og Lithium-ion-batteri. Opptil 150 km rekkevidde.',
  },
  {
    slug: 'merida-e-speeder',
    name: 'Merida eSPEEDER',
    category: 'sykkel',
    range_km: '130',
    motor_w: '250',
    weight: '20',
    price_from: 'Kontakt oss',
    image: 'https://images.unsplash.com/photo-1571068316344-75bc76f77890?w=800&q=80',
    images: '',
    body: 'Rask og elegant Merida el-sykkel for dagleg pendling — aerodynamisk design og integrert batteri. Perfekt for bykøyring i Sogn.',
  },
];

const categories = [
  { key: 'scooter',      label: 'NIU Moped' },
  { key: 'sparkesykkel', label: 'Sparkesykkel' },
  { key: 'sykkel',       label: 'Merida El-sykkel' },
];

const valueProps = [
  { icon: 'leaf'        as const, title: 'Null utslepp', desc: 'Elektrisk drift — bra for lommeboka og naturen.' },
  { icon: 'clock'       as const, title: 'Spar tid',     desc: 'Slepp kø og parkering. Kom deg dit du skal raskare.' },
  { icon: 'trending-up' as const, title: 'Spar pengar',  desc: 'Ladekostnad er ein brøkdel av bensin.' },
  { icon: 'zap'         as const, title: 'Betre helse',  desc: 'El-sykkel gir mosjon utan for stor innsats.' },
];

export default async function SykkelPage() {
  let products: SykkelProduct[] = [];
  try {
    const f = await fetchSykkelProducts();
    products = f.length > 0 ? f : placeholderProducts;
  } catch {
    products = placeholderProducts;
  }

  const grouped = categories.reduce((acc, cat) => {
    acc[cat.key] = products.filter((p) => p.category === cat.key);
    return acc;
  }, {} as Record<string, SykkelProduct[]>);

  return (
    <>
      {/* ── HERO ─────────────────────────────────────────────── */}
      <section className={styles.hero}>
        <div className={styles.heroBg}>
          <Image
            src="https://images.unsplash.com/photo-1571068316344-75bc76f77890?w=1920&q=85"
            alt="El-sykkel på fjordveg i Sogn"
            fill
            priority
            sizes="100vw"
            style={{ objectFit: 'cover', objectPosition: 'center 50%' }}
          />
          <div className={styles.heroOverlay} />
        </div>
        <div className={`container ${styles.heroContent}`}>
          <FadeUp>
            <span className={styles.heroLabel}>Mikromobilitet</span>
            <h1 className={styles.heroH1}>
              Framtida er elektrisk.<br />Og ho ser bra ut.
            </h1>
            <p className={styles.heroSub}>
              Merida el-syklar og NIU el-moped — levert frå Kaupanger.
            </p>
          </FadeUp>
        </div>
      </section>

      {/* ── CATEGORIES ───────────────────────────────────────── */}
      {categories.map(({ key, label }) =>
        grouped[key]?.length > 0 ? (
          <section key={key} className="section">
            <div className="container">
              <FadeUp>
                <span className="label">{label}</span>
                <h2 className={styles.sectionH2}>{label}</h2>
              </FadeUp>
              <div className={styles.productGrid}>
                {grouped[key].map((product, i) => (
                  <FadeUp key={product.slug} delay={i * 70}>
                    <ProductCard product={product} />
                  </FadeUp>
                ))}
              </div>
            </div>
          </section>
        ) : null
      )}

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
            heading="Kom innom eller kontakt oss"
            subheading="Spør om test-køyring, tilbod eller lager. Me svarer raskt."
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
        <p className={styles.productDesc}>{product.body.slice(0, 100)}…</p>
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
