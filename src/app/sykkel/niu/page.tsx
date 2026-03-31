import type { Metadata } from 'next';
import FadeUp from '@/components/ui/FadeUp';
import ContactForm from '@/components/ui/ContactForm';

export const metadata: Metadata = {
  title: 'NIU El-Moped | MOVE Sogn Sykkel',
  description: 'NIU elektriske mopeder — stilreine, raske og miljøvenlege. MOVE Sogn er autorisert NIU-forhandlar i Sogn.',
  openGraph: {
    images: [{ url: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1200&q=80', width: 1200, height: 630, alt: 'NIU elektrisk moped — MOVE Sogn' }],
  },
};

export default function NiuPage() {
  return (
    <>
      <section style={{ paddingTop: 'calc(var(--nav-height) + 5rem)', paddingBottom: '4rem' }}>
        <div className="container">
          <FadeUp>
            <span className="label">Sykkel · NIU</span>
            <h1 style={{ marginTop: '0.5rem', marginBottom: '1.5rem' }}>NIU El-Moped</h1>
            <p style={{ fontSize: 'var(--text-body-lg)', maxWidth: '56ch', marginBottom: '1rem' }}>
              Moderne elektrisk moped for by og bygd.
            </p>
            <p style={{ maxWidth: '56ch', marginBottom: '2.5rem' }}>
              Ta kontakt for å sjå vårt utval og prisar.
            </p>
            {/* TODO: [SANITY] populate NIU models + specs */}
          </FadeUp>
        </div>
      </section>

      <section className="section bg-surface">
        <div className="container">
          <FadeUp style={{ maxWidth: 680, marginInline: 'auto' }}>
            <ContactForm
              formType="contact"
              heading="Spør om NIU"
              subheading="Fyll ut skjemaet så kjem me tilbake til deg."
            />
          </FadeUp>
        </div>
      </section>
    </>
  );
}
