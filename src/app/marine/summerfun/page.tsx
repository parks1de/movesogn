import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import FadeUp from '@/components/ui/FadeUp';
import Icon from '@/components/ui/Icon';
import ContactForm from '@/components/ui/ContactForm';

export const metadata: Metadata = {
  title: 'Hasle Summer-Fun | MOVE Sogn Marine',
  description: 'Summerfun fritidsbåtar frå Hasle — lette, lekre og perfekte for Sognefjorden. MOVE Sogn er autorisert forhandlar.',
  openGraph: {
    images: [{ url: '/images/summerfun/sf-01.png', width: 1200, height: 630, alt: 'Summerfun båt på Sognefjorden' }],
  },
};

const galleryImages = [
  { src: '/images/summerfun/sf-01.png', alt: 'Hasle Summer-Fun — båtpakke' },
  { src: '/images/summerfun/sf-02.jpg', alt: 'Hasle Summer-Fun — på sjøen' },
  { src: '/images/summerfun/sf-03.png', alt: 'Hasle Summer-Fun — båtpakkar' },
  { src: '/images/summerfun/sf-04.jpg', alt: 'Hasle Summer-Fun — på fjorden' },
];

export default function SummerfunPage() {
  return (
    <>
      <section style={{ paddingTop: 'calc(var(--nav-height) + 5rem)', paddingBottom: '4rem' }}>
        <div className="container">
          <FadeUp>
            <span className="label">Marine</span>
            <h1 style={{ marginTop: '0.5rem', marginBottom: '1.5rem' }}>Hasle Summer-Fun</h1>
            <p style={{ fontSize: 'var(--text-body-lg)', maxWidth: '56ch', marginBottom: '1.25rem' }}>
              Sporty og tøff ungdomsbåt — perfekt for Sognefjorden.
            </p>
            <p style={{ marginBottom: '0.75rem' }}>
              <strong>Kampanjepris kr 71.900,-</strong>
            </p>
            <p style={{ fontSize: '0.875rem', color: 'var(--ink-light)', marginBottom: '2.5rem' }}>
              * Veil. kr 74.900,- &nbsp;|&nbsp; Pris kun båt kr 40.900,-
            </p>
            {/* TODO: [SANITY] populate full specs */}
          </FadeUp>
        </div>
      </section>

      {/* ── IMAGE GALLERY ─────────────────────────────────── */}
      <section className="section bg-mist">
        <div className="container">
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
            gap: '1rem',
          }}>
            {galleryImages.map((img, i) => (
              <FadeUp key={i} delay={i * 60}>
                <div style={{ position: 'relative', aspectRatio: '4/3', borderRadius: 4, overflow: 'hidden' }}>
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
              heading="Spør om Summer-Fun"
              subheading="Fyll ut skjemaet så kjem me tilbake til deg."
            />
          </FadeUp>
        </div>
      </section>
    </>
  );
}
