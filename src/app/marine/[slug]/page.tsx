import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { sanityFetch } from '@/lib/sanity';

interface MarineBoat {
  slug: string; model_name: string; length: string; persons: string;
  motor_options: string; price_from: string; image: string;
  images: string; body: string; specs_table: string;
}
import FadeUp from '@/components/ui/FadeUp';
import ContactForm from '@/components/ui/ContactForm';
import styles from './detail.module.css';

export const revalidate = 300;

const placeholderBoats: MarineBoat[] = [
  {
    slug: 'hasle-summerfun',
    model_name: 'Hasle Summerfun',
    length: '3,65 m',
    persons: '3',
    motor_options: 'Suzuki 9,9 hk EFI elektrisk start',
    price_from: '65 900',
    image: 'https://images.unsplash.com/photo-1605281317010-fe5ffe798166?w=1600&q=85',
    images: [
      'https://images.unsplash.com/photo-1622542796254-5b9c46ab0d2f?w=1200&q=80',
      'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=1200&q=80',
      'https://images.unsplash.com/photo-1567899378494-47b22a2ae96a?w=1200&q=80',
      'https://images.unsplash.com/photo-1516189526-cccff1a78b9a?w=1200&q=80',
      'https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=1200&q=80',
    ].join(','),
    body: `Hasle Summerfun er ein rotasjonsstøpt ungdomsbåt i polyetylen. Med 27 års erfaring i båtbransjen og 22 år med rotasjonsstøping har Hasle AS klart å kombinere det beste frå design og tekniske løysingar.

Båten er CE-sertifisert og tilfredsstiller alle tekniske krav til stabilitet, styrke og køyreeigenskapar. Sjølvlensande slik at du slepp å tenkje på lensing etter kraftige regnskyll.

Leveres med Suzuki 9,9 hk med EFI og elektrisk start — mange fargekombinasjonar tilgjengelege, spør oss om lagerstatus!`,
    specs_table: JSON.stringify({
      'Lengde': '3,65 m',
      'Breidde': '1,55 m',
      'Vekt (utan motor)': 'ca. 80 kg',
      'Maks personar': '3',
      'Maks motor': '15 hk',
      'CE-klasse': 'D',
      'Material': 'Polyetylen (rotasjonsstøpt)',
      'Pris inkl. motor': 'kr 65 900,-',
    }),
  },
  {
    slug: 'silver-beaver-br',
    model_name: 'Silver Beaver BR',
    length: '4,8 m',
    persons: '6',
    motor_options: 'Suzuki 50 hk',
    price_from: '239 000',
    image: 'https://images.unsplash.com/photo-1567899378494-47b22a2ae96a?w=1600&q=85',
    images: [
      'https://images.unsplash.com/photo-1516189526-cccff1a78b9a?w=1200&q=80',
      'https://images.unsplash.com/photo-1605281317010-fe5ffe798166?w=1200&q=80',
      'https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=1200&q=80',
      'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=1200&q=80',
      'https://images.unsplash.com/photo-1622542796254-5b9c46ab0d2f?w=1200&q=80',
      'https://images.unsplash.com/photo-1587160803091-96d7cffbe95c?w=1200&q=80',
    ].join(','),
    body: `Silvers minste båtmodell — 4,8 meter som passar alle. Med sin storleik, smidigheit og omfattande utrustning er Beaver perfekt for nybyrjarar, men passar like godt for erfarne båteigarar.

Solid aluminiumsskrog produsert i Finland av lidenskapelege båtbyggjarar. Alle Silver-båtar er designa for nordiske tilhøve — robuste, stabile og enkle å vedlikehalde.

Beaver BR leveras standard med vindskjerm, styrekonsoll og sitjebenk. Kan utrustast med kabintopp og anna tilleggsutrustning etter ønske.`,
    specs_table: JSON.stringify({
      'Lengde': '4,80 m',
      'Breidde': '1,90 m',
      'Maks personar': '6',
      'Motor': 'Suzuki 50 hk',
      'Skrogmaterial': 'Aluminium',
      'Serie': 'X — Aluminium',
      'Pris m/motor': 'kr 239 000,-',
    }),
  },
  {
    slug: 'silver-hawk-br',
    model_name: 'Silver Hawk BR',
    length: '5,3 m',
    persons: '7',
    motor_options: 'Suzuki 90 hk',
    price_from: '379 000',
    image: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=1600&q=85',
    images: [
      'https://images.unsplash.com/photo-1567899378494-47b22a2ae96a?w=1200&q=80',
      'https://images.unsplash.com/photo-1605281317010-fe5ffe798166?w=1200&q=80',
      'https://images.unsplash.com/photo-1516189526-cccff1a78b9a?w=1200&q=80',
      'https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=1200&q=80',
    ].join(','),
    body: `Silvers populære storfavoritt i ny versjon frå 2019. Heilt nytt skrog, nytt interiør og heilt nye konsollar gjer Hawk BR til eit nytt kapittel i Silver-historia.

Spesielt eigna for utflukter i skjærgarden, som landstedsbåt og for fornøyelses-køyring. Romsleg akterdekk og god stabilitert gjer Hawk til eit trygt val for heile familien.

Hawk BR er tilgjengeleg med eit bredt utval av motorar og utstyrspakkar. Autorisert Suzuki-service på Kaupanger.`,
    specs_table: JSON.stringify({
      'Lengde': '5,30 m',
      'Breidde': '2,05 m',
      'Maks personar': '7',
      'Motor': 'Suzuki 90 hk',
      'Skrogmaterial': 'Aluminium',
      'Serie': 'X — Aluminium',
      'Pris m/motor': 'kr 379 000,-',
    }),
  },
];

interface Props { params: { slug: string }; }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  let boats = placeholderBoats;
  try { const f = await sanityFetch<MarineBoat[]>(`*[_type=="marineBoat"]|order(order asc){"slug":slug.current,"model_name":modelName,length,persons,"motor_options":motorOptions,"price_from":priceFrom,"image":image.asset->url,"images":array::join(gallery[].asset->url,","),body,"specs_table":specsTable}`); if (f.length) boats = f; } catch {}
  const boat = boats.find((b) => b.slug === params.slug);
  if (!boat) return { title: 'Båt ikkje funnen' };
  return {
    title: `${boat.model_name} — Marine`,
    description: `${boat.model_name} — ${boat.length}, opptil ${boat.persons} personar. Frå kr ${boat.price_from}. Kjøp hos MOVE Sogn på Kaupanger.`,
  };
}

export async function generateStaticParams() {
  let boats = placeholderBoats;
  try { const f = await sanityFetch<MarineBoat[]>(`*[_type=="marineBoat"]|order(order asc){"slug":slug.current,"model_name":modelName,length,persons,"motor_options":motorOptions,"price_from":priceFrom,"image":image.asset->url,"images":array::join(gallery[].asset->url,","),body,"specs_table":specsTable}`); if (f.length) boats = f; } catch {}
  return boats.map((b) => ({ slug: b.slug }));
}

export default async function BoatDetailPage({ params }: Props) {
  let boats = placeholderBoats;
  try { const f = await sanityFetch<MarineBoat[]>(`*[_type=="marineBoat"]|order(order asc){"slug":slug.current,"model_name":modelName,length,persons,"motor_options":motorOptions,"price_from":priceFrom,"image":image.asset->url,"images":array::join(gallery[].asset->url,","),body,"specs_table":specsTable}`); if (f.length) boats = f; } catch {}

  const boat = boats.find((b) => b.slug === params.slug);
  if (!boat) notFound();

  // All images: hero first, then extras
  const allImages = [
    boat.image,
    ...(boat.images ? boat.images.split(',').map(s => s.trim()).filter(Boolean) : []),
  ];

  let specs: Record<string, string> = {};
  try { specs = boat.specs_table ? JSON.parse(boat.specs_table) : {}; } catch {}

  // Gallery items after the hero image (index 1+)
  const galleryImages = allImages.slice(1);

  return (
    <>
      {/* ── HERO ───────────────────────────────────────────── */}
      <section className={styles.hero}>
        <Image
          src={allImages[0]}
          alt={`${boat.model_name} — MOVE Sogn`}
          fill
          priority
          sizes="100vw"
          style={{ objectFit: 'cover', objectPosition: 'center 50%' }}
        />
        <div className={styles.heroOverlay} />
        <div className={`container ${styles.heroContent}`}>
          <FadeUp>
            <Link href="/marine" className={styles.back}>
              ← Alle båtar
            </Link>
            <h1 className={styles.heroH1}>{boat.model_name}</h1>
            {boat.price_from && (
              <p className={styles.heroPrice}>Frå kr {boat.price_from},-</p>
            )}
          </FadeUp>
        </div>
      </section>

      {/* ── BODY + SPECS ───────────────────────────────────── */}
      <section className="section">
        <div className={`container ${styles.contentGrid}`}>
          <FadeUp className={styles.bodyCol}>
            <span className="label">Om modellen</span>
            <h2>{boat.model_name}</h2>
            <p className={styles.bodyText}>{boat.body}</p>
          </FadeUp>

          {Object.keys(specs).length > 0 && (
            <FadeUp delay={100} className={styles.specsCol}>
              <h3 className={styles.specsTitle}>Spesifikasjonar</h3>
              <table className={styles.specsTable}>
                <tbody>
                  {Object.entries(specs).map(([k, v]) => (
                    <tr key={k}>
                      <th>{k}</th>
                      <td>{v}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </FadeUp>
          )}
        </div>
      </section>

      {/* ── GALLERY — 5-15 images, masonry grid ────────────── */}
      {galleryImages.length > 0 && (
        <section className={`section ${styles.gallerySection}`}>
          <div className="container">
            <FadeUp>
              <p className={styles.galleryHeading}>
                Galleri — {galleryImages.length + 1} bilete
              </p>
            </FadeUp>
            <div className={styles.galleryGrid}>
              {galleryImages.map((src, i) => {
                // Layout logic: first item wide, every 4th item tall
                const isFirst = i === 0;
                const isTall  = !isFirst && (i % 4 === 2);
                const className = [
                  styles.galleryItem,
                  isFirst  ? styles.galleryItemWide : '',
                  isTall   ? styles.galleryItemTall : '',
                ].filter(Boolean).join(' ');

                return (
                  <FadeUp key={i} delay={Math.min(i * 50, 300)} className={className}>
                    <Image
                      src={src}
                      alt={`${boat.model_name} — bilete ${i + 2}`}
                      fill
                      sizes="(max-width: 560px) 100vw, (max-width: 900px) 50vw, 33vw"
                      style={{ objectFit: 'cover' }}
                    />
                    {/* Show total count badge on last visible item */}
                    {i === galleryImages.length - 1 && galleryImages.length >= 8 && (
                      <span className={styles.galleryCount}>
                        {allImages.length} bilete
                      </span>
                    )}
                  </FadeUp>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* ── CONTACT FORM — centred, full focus ─────────────── */}
      <section className={`section ${styles.formSection}`}>
        <div className="container">
          <div className={styles.formWrap}>
            <ContactForm
              formType="marine"
              prefilledModel={boat.model_name}
              heading={`Interessert i ${boat.model_name}?`}
              subheading="Fyll ut skjemaet så kontaktar me deg med pris og leveringstid."
            />
          </div>
        </div>
      </section>
    </>
  );
}
