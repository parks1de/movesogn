import type { Metadata } from 'next';
import FadeUp from '@/components/ui/FadeUp';
import ContactForm from '@/components/ui/ContactForm';

export const metadata: Metadata = {
  title: 'Marine Service | MOVE Sogn',
  description: 'Bestill service på båt og motor hos MOVE Sogn på Kaupanger. Autorisert Suzuki-verkstad med faglærde mekanikarar.',
};

export default function MarineServicePage() {
  return (
    <>
      <section style={{ paddingTop: 'calc(var(--nav-height) + 5rem)', paddingBottom: '4rem' }}>
        <div className="container">
          <FadeUp>
            <span className="label">Marine · Service</span>
            <h1 style={{ marginTop: '0.5rem', marginBottom: '1.25rem' }}>Bestill service</h1>
            <p style={{ fontSize: 'var(--text-body-lg)', maxWidth: '52ch', marginBottom: '2.5rem' }}>
              Fyll ut skjemaet så tek me kontakt og finn eit tidspunkt som passar deg.
            </p>
          </FadeUp>
        </div>
      </section>

      <section className="section bg-surface">
        <div className="container">
          <FadeUp style={{ maxWidth: 680, marginInline: 'auto' }}>
            <ContactForm
              formType="contact"
              heading="Servicebestilling"
              subheading="Beskriv kva som treng service, så kjem me tilbake til deg."
            />
          </FadeUp>
        </div>
      </section>
    </>
  );
}
