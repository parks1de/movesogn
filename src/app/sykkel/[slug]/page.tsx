import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { fetchSykkelProducts, type SykkelProduct } from '@/lib/sheets';
import FadeUp from '@/components/ui/FadeUp';
import ContactForm from '@/components/ui/ContactForm';
import styles from './detail.module.css';

export const revalidate = 300;

const placeholderProducts: SykkelProduct[] = [
  { slug: 'niu-nqi-sport', name: 'NIU NQi Sport', category: 'scooter', range_km: '70', motor_w: '1500', weight: '70', price_from: '24 990', image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1200&q=80', images: '', body: 'Vår mestseljande elektriske scooter med god rekkevidde og lading på vanleg stikkontakt. Vedlikehaldskostnadene er minimale. Inkluderer eigen NIU-app med smarte funksjonar.' },
  { slug: 'niu-uqi-gt-sport', name: 'NIU UQi GT Sport', category: 'scooter', range_km: '50', motor_w: '1200', weight: '62', price_from: '19 990', image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1200&q=80', images: '', body: 'Enkel og prisgunstig elektrisk scooter med innovativt retro-design og god NIU-kvalitet. For alle — ungdommar eller pendlarar.' },
  { slug: 'niu-mqi-sport', name: 'NIU MQi+ Sport', category: 'scooter', range_km: '100', motor_w: '2000', weight: '72', price_from: '22 990', image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1200&q=80', images: '', body: 'Scooteren med best rekkevidde i NIU-serien. Morosam, rask og kvalitetssikker. Perfekt for pendling og skule.' },
  { slug: 'niu-kqi3-pro', name: 'NIU KQi3 Pro', category: 'sparkesykkel', range_km: '50', motor_w: '300', weight: '16', price_from: '7 990', image: 'https://images.unsplash.com/photo-1571068316344-75bc76f77890?w=1200&q=80', images: '', body: 'Ikonisk halo-frontlykt, robuste hjul og skivebrems. Lett å folde, passar i bagasjerommet. NIU-app for statistikk og låsing.' },
  { slug: 'peugeot-el-sykkel', name: 'Peugeot El-sykkel', category: 'sykkel', range_km: '140', motor_w: '250', weight: '22', price_from: 'Kontakt oss', image: 'https://images.unsplash.com/photo-1571068316344-75bc76f77890?w=1200&q=80', images: '', body: 'Peugeot el-sykkel med lett aluminiumsramme og Lithium-ion-batteri. Fire nivå pedalassistanse. Rekkevidde opptil 140 km.' },
  { slug: 'crescent-el-sykkel', name: 'Crescent El-sykkel', category: 'sykkel', range_km: '120', motor_w: '250', weight: '20', price_from: 'Kontakt oss', image: 'https://images.unsplash.com/photo-1571068316344-75bc76f77890?w=1200&q=80', images: '', body: 'Crescent el-sykkel designa for norske forhold. Pedelec-system for assistert innsats. Perfekt for bykøyring og terreng.' },
];

interface Props { params: { slug: string } }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  let products = placeholderProducts;
  try { const f = await fetchSykkelProducts(); if (f.length) products = f; } catch {}
  const p = products.find((x) => x.slug === params.slug);
  if (!p) return { title: 'Produkt ikkje funnen' };
  return {
    title: `${p.name} — Sykkel`,
    description: `${p.name} — rekkevidde ${p.range_km} km. ${p.price_from !== 'Kontakt oss' ? `Frå kr ${p.price_from}.` : ''} Kjøp hos MOVE Sogn på Kaupanger.`,
  };
}

export async function generateStaticParams() {
  let products = placeholderProducts;
  try { const f = await fetchSykkelProducts(); if (f.length) products = f; } catch {}
  return products.map((p) => ({ slug: p.slug }));
}

export default async function SykkelDetailPage({ params }: Props) {
  let products = placeholderProducts;
  try { const f = await fetchSykkelProducts(); if (f.length) products = f; } catch {}

  const product = products.find((p) => p.slug === params.slug);
  if (!product) notFound();

  const allImages = [
    product.image,
    ...(product.images ? product.images.split(',').map((s: string) => s.trim()).filter(Boolean) : []),
  ];
  const galleryImages = allImages.slice(1);

  const specs = [
    product.range_km  && { label: 'Rekkevidde',   value: `${product.range_km} km` },
    product.motor_w   && { label: 'Motor',         value: `${product.motor_w} W` },
    product.weight    && { label: 'Vekt',          value: `${product.weight} kg` },
  ].filter(Boolean) as { label: string; value: string }[];

  return (
    <>
      <section className={styles.hero}>
        <Image src={allImages[0]} alt={product.name} fill priority sizes="100vw" style={{ objectFit: 'cover', objectPosition: 'center 40%' }} />
        <div className={styles.heroOverlay} />
        <div className={`container ${styles.heroContent}`}>
          <FadeUp>
            <Link href="/sykkel" className={styles.back}>← Alle produkt</Link>
            <h1 className={styles.heroH1}>{product.name}</h1>
            {product.price_from && (
              <p className={styles.heroPrice}>
                {product.price_from === 'Kontakt oss' ? 'Kontakt oss for pris' : `Frå kr ${product.price_from},-`}
              </p>
            )}
          </FadeUp>
        </div>
      </section>

      <section className="section">
        <div className={`container ${styles.contentGrid}`}>
          <FadeUp className={styles.bodyCol}>
            <span className="label">{product.category === 'sykkel' ? 'El-sykkel' : product.category === 'scooter' ? 'El-scooter' : 'Sparkesykkel'}</span>
            <h2>{product.name}</h2>
            <p className={styles.bodyText}>{product.body}</p>
          </FadeUp>
          {specs.length > 0 && (
            <FadeUp delay={100} className={styles.specsCol}>
              <h3 className={styles.specsTitle}>Spesifikasjonar</h3>
              <table className={styles.specsTable}>
                <tbody>
                  {specs.map((s) => (
                    <tr key={s.label}>
                      <th>{s.label}</th>
                      <td>{s.value}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
              {product.price_from !== 'Kontakt oss' && (
                <div className={styles.priceBlock}>
                  <span className={styles.priceBig}>Frå kr {product.price_from},-</span>
                  <p className={styles.priceNote}>Inkl. leveringsomkostningar til Kaupanger. Kontakt oss for tilbod.</p>
                </div>
              )}
            </FadeUp>
          )}
        </div>
      </section>

      {/* Gallery */}
      {galleryImages.length > 0 && (
        <section className={`section ${styles.gallerySection}`}>
          <div className="container">
            <FadeUp>
              <p className={styles.galleryHeading}>
                Galleri — {galleryImages.length + 1} bilete
              </p>
            </FadeUp>
            <div className={styles.galleryGrid}>
              {galleryImages.map((src: string, i: number) => {
                const isFirst = i === 0;
                const isTall  = !isFirst && (i % 4 === 2);
                const className = [
                  styles.galleryItem,
                  isFirst ? styles.galleryItemWide : '',
                  isTall  ? styles.galleryItemTall : '',
                ].filter(Boolean).join(' ');
                return (
                  <FadeUp key={i} delay={Math.min(i * 50, 300)} className={className}>
                    <Image
                      src={src}
                      alt={`${product.name} — bilete ${i + 2}`}
                      fill
                      sizes="(max-width: 560px) 100vw, (max-width: 900px) 50vw, 33vw"
                      style={{ objectFit: 'cover' }}
                    />
                    {i === galleryImages.length - 1 && galleryImages.length >= 8 && (
                      <span className={styles.galleryCount}>{allImages.length} bilete</span>
                    )}
                  </FadeUp>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* Centred form */}
      <section className={`section ${styles.formSection}`}>
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
