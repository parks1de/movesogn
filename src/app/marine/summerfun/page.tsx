import type { Metadata } from 'next';
import Link from 'next/link';
import FadeUp from '@/components/ui/FadeUp';
import Icon from '@/components/ui/Icon';
import ContactForm from '@/components/ui/ContactForm';

export const metadata: Metadata = {
  title: 'Hasle Summer-Fun | MOVE Sogn Marine',
  description: 'Summerfun fritidsbåtar frå Hasle — lette, lekre og perfekte for Sognefjorden. MOVE Sogn er autorisert forhandlar.',
  openGraph: {
    images: [{ url: 'https://images.unsplash.com/photo-1605281317010-fe5ffe798166?w=1200&q=80', width: 1200, height: 630, alt: 'Summerfun båt på Sognefjorden' }],
  },
};

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
