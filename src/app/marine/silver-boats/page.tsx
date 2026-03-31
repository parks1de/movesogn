import type { Metadata } from 'next';
import Image from 'next/image';
import FadeUp from '@/components/ui/FadeUp';
import ContactForm from '@/components/ui/ContactForm';

export const metadata: Metadata = {
  title: 'Silver Boats | MOVE Sogn Marine',
  description: 'Silver Boats frå Finland — solide og stilreine fritidsbåtar for norske farvatn. MOVE Sogn er autorisert forhandlar.',
  openGraph: {
    images: [{ url: '/images/silver/sv-01.jpg', width: 1200, height: 630, alt: 'Silver Boats — MOVE Sogn Marine' }],
  },
};

const galleryImages = [
  { src: '/images/silver/sv-01.jpg', alt: 'Silver Beaver BR — side' },
  { src: '/images/silver/sv-02.jpg', alt: 'Silver Beaver BR — aksjon' },
  { src: '/images/silver/sv-03.jpg', alt: 'Silver Hawk BR — aksjon 2019' },
  { src: '/images/silver/sv-04.jpg', alt: 'Silver Hawk BR — på sjøen' },
  { src: '/images/silver/sv-05.jpg', alt: 'Silver Shark BRx — aksjon' },
  { src: '/images/silver/sv-06.jpg', alt: 'Silver Tiger BRz — aksjon' },
];

export default function SilverBoatsPage() {
  return (
    <>
      <section style={{ paddingTop: 'calc(var(--nav-height) + 5rem)', paddingBottom: '4rem' }}>
        <div className="container">
          <FadeUp>
            <span className="label">Marine</span>
            <h1 style={{ marginTop: '0.5rem', marginBottom: '1.5rem' }}>Silver Boats</h1>
            <p style={{ fontSize: 'var(--text-body-lg)', maxWidth: '56ch', marginBottom: '1rem' }}>
              Kvalitetsbåtar for alle høve — Beaver, Hawk, Shark, Tiger, Viper.
            </p>
            <p style={{ maxWidth: '56ch', marginBottom: '2.5rem' }}>
              Ta kontakt for prisar og tilgjengelegheit.
            </p>
            {/* TODO: [SANITY] populate models */}
          </FadeUp>
        </div>
      </section>

      {/* ── IMAGE GALLERY ─────────────────────────────────── */}
      <section className="section bg-mist">
        <div className="container">
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
            gap: '1rem',
          }}>
            {galleryImages.map((img, i) => (
              <FadeUp key={i} delay={i * 50}>
                <div style={{ position: 'relative', aspectRatio: '16/10', borderRadius: 4, overflow: 'hidden' }}>
                  <Image
                    src={img.src}
                    alt={img.alt}
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    style={{ objectFit: 'cover' }}
                  />
                </div>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      <section className="section bg-surface">
        <div className="container">
          <FadeUp style={{ maxWidth: 680, marginInline: 'auto' }}>
            <ContactForm
              formType="contact"
              heading="Spør om Silver Boats"
              subheading="Fyll ut skjemaet så kjem me tilbake til deg."
            />
          </FadeUp>
        </div>
      </section>
    </>
  );
}
