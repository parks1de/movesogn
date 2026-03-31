import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import FadeUp from '@/components/ui/FadeUp';
import Icon from '@/components/ui/Icon';
import ContactForm from '@/components/ui/ContactForm';

export const metadata: Metadata = {
  title: 'Suzuki Båtmotor | MOVE Sogn Marine',
  description: 'Autorisert Suzuki-service og -sal på Kaupanger. Pålitelege påhengarsmotorar for alle båttypar.',
  openGraph: {
    images: [{ url: '/images/suzuki/sz-01.png', width: 1200, height: 630, alt: 'Suzuki Båtmotor — MOVE Sogn Marine' }],
  },
};

const motorImages = [
  { src: '/images/suzuki/sz-01.png', alt: 'Suzuki båtmotor' },
  { src: '/images/suzuki/sz-02.jpg', alt: 'Suzuki DF115 — påhengarsmotor' },
  { src: '/images/suzuki/sz-03.jpg', alt: 'Suzuki DF150 — påhengarsmotor' },
];

export default function SuzukiPage() {
  return (
    <>
      <section style={{ paddingTop: 'calc(var(--nav-height) + 5rem)', paddingBottom: '4rem' }}>
        <div className="container">
          <FadeUp>
            <span className="label">Marine · Suzuki</span>
            <h1 style={{ marginTop: '0.5rem', marginBottom: '1.5rem' }}>Suzuki Båtmotor</h1>

            <p style={{ fontSize: 'var(--text-body-lg)', maxWidth: '56ch', marginBottom: '1rem' }}>
              DF9,9B — 9,9 HK med EFI (Elektronisk bensininnsprøytning), Lean Burn forbrenningskontroll, vekt frå 44 kg.
              Leverast i manuell og el.start utgåve.
            </p>
            <p style={{ maxWidth: '56ch', marginBottom: '2rem' }}>
              Autorisert Suzuki-verkstad — faglærde mekanikarar.
            </p>

            <Link href="/marine/service" className="btn btn--primary" style={{ marginBottom: '2.5rem' }}>
              Bestill service
              <Icon name="arrow-right" size={16} />
            </Link>
            {/* TODO: [SANITY] populate motor models + service offerings */}
          </FadeUp>
        </div>
      </section>

      {/* ── MOTOR IMAGES ──────────────────────────────────── */}
      <section className="section bg-mist">
        <div className="container">
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))',
            gap: '1rem',
          }}>
            {motorImages.map((img, i) => (
              <FadeUp key={i} delay={i * 60}>
                <div style={{ position: 'relative', aspectRatio: '4/3', borderRadius: 4, overflow: 'hidden', background: 'var(--surface)' }}>
                  <Image
                    src={img.src}
                    alt={img.alt}
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    style={{ objectFit: 'contain', padding: '1rem' }}
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
              heading="Spør om Suzuki-motor"
              subheading="Fyll ut skjemaet så kjem me tilbake til deg."
            />
          </FadeUp>
        </div>
      </section>
    </>
  );
}
