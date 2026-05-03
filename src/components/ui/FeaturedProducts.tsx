import Image from 'next/image';
import Link from 'next/link';
import { sanityFetch } from '@/lib/sanity';
import styles from './FeaturedProducts.module.css';

interface FeaturedProduct {
  _id: string;
  _type: string;
  title: string;
  slug: string;
  priceFrom: string | null;
  category: string | null;
  brand: string | null;
  imageUrl: string | null;
}

const QUERY = `*[
  _type in ["sykkelProduct", "marineBoat", "suzukiEngine"]
  && featuredOnHomepage == true
] | order(order asc) {
  _id, _type,
  "title": coalesce(name, modelName),
  "slug": slug.current,
  "priceFrom": priceFrom,
  category,
  brand,
  "imageUrl": image.asset->url
}`;

function productUrl(item: FeaturedProduct): string {
  if (item._type === 'sykkelProduct') {
    if (item.category === 'scooter')      return `/elmoped/${item.slug}`;
    if (item.category === 'sparkesykkel') return `/sparkesykkel/${item.slug}`;
    return `/sykkel/${item.slug}`;
  }
  if (item._type === 'marineBoat') return `/marine/${item.slug}`;
  if (item._type === 'suzukiEngine') return `/marine/suzuki-batmotor`;
  return '/';
}

function categoryLabel(item: FeaturedProduct): string {
  if (item._type === 'sykkelProduct') {
    if (item.category === 'scooter')      return 'El-moped';
    if (item.category === 'sparkesykkel') return 'Sparkesykkel';
    return 'El-sykkel';
  }
  if (item._type === 'marineBoat') return 'Marine';
  if (item._type === 'suzukiEngine') return 'Suzuki Motor';
  return '';
}

export default async function FeaturedProducts() {
  let items: FeaturedProduct[] = [];
  try {
    const data = await sanityFetch<FeaturedProduct[]>(QUERY);
    if (data?.length) items = data;
  } catch {}

  if (items.length === 0) return null;

  return (
    <section className={`section ${styles.section}`}>
      <div className="container">
        <span className="label">Utvalde produkt</span>
        <h2 className={styles.heading}>Aktuelt.</h2>
      </div>
      <div className={styles.trackWrap}>
        <ul className={styles.track} role="list">
          {items.map((item) => (
            <li key={item._id} className={styles.item}>
              <Link href={productUrl(item)} className={styles.card}>
                <div className={styles.cardImg}>
                  {item.imageUrl ? (
                    <Image
                      src={item.imageUrl}
                      alt={item.title}
                      fill
                      sizes="(max-width: 768px) 72vw, 280px"
                      style={{ objectFit: 'cover' }}
                    />
                  ) : (
                    <div className={styles.imgFallback} />
                  )}
                </div>
                <div className={styles.cardBody}>
                  <span className={styles.cardLabel}>{categoryLabel(item)}</span>
                  <h3 className={styles.cardTitle}>{item.title}</h3>
                  {item.priceFrom && (
                    <p className={styles.cardPrice}>
                      {item.priceFrom === 'Kontakt oss'
                        ? 'Kontakt oss'
                        : `Frå kr ${item.priceFrom},-`}
                    </p>
                  )}
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
