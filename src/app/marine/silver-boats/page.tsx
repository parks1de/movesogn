import type { Metadata } from 'next';
import FadeUp from '@/components/ui/FadeUp';
import ContactForm from '@/components/ui/ContactForm';

export const metadata: Metadata = {
  title: 'Silver Boats | MOVE Sogn Marine',
  description: 'Silver Boats frå Finland — solide og stilreine fritidsbåtar for norske farvatn. MOVE Sogn er autorisert forhandlar.',
  openGraph: {
    images: [{ url: 'https://images.unsplash.com/photo-1605281317010-fe5ffe798166?w=1200&q=80', width: 1200, height: 630, alt: 'Silver Boats — MOVE Sogn Marine' }],
  },
};

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
