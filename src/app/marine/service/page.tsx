import type { Metadata } from 'next';
import FadeUp from '@/components/ui/FadeUp';
import ContactForm from '@/components/ui/ContactForm';

export const metadata: Metadata = {
  title: 'Bestill service — Marine | MOVE Sogn',
  description: 'Bestill service på båtmotor hos MOVE Sogn på Kaupanger. Autorisert Suzuki-verkstad. Vi tar alle merke — Suzuki, Yamaha, Mercury, Honda og fleire.',
};

export default function MarineServicePage() {
  return (
    <>
      <section style={{ paddingTop: 'calc(var(--nav-height) + 5rem)', paddingBottom: '4rem', background: 'var(--slate)' }}>
        <div className="container">
          <FadeUp>
            <span className="label" style={{ color: 'var(--color-orange)' }}>Marine · Service</span>
            <h1 style={{ marginTop: '0.5rem', marginBottom: '1rem', color: 'var(--color-white)', fontSize: 'clamp(2rem,5vw,3.5rem)', fontWeight: 800, letterSpacing: '-0.03em' }}>
              Bestill service på båtmotoren.
            </h1>
            <p style={{ fontSize: 'var(--text-body-lg)', maxWidth: '52ch', color: 'rgba(250,250,248,0.62)', fontWeight: 300 }}>
              Autorisert Suzuki-verkstad med faglærde mekanikarar. Vi tar alle merke.
            </p>
          </FadeUp>
        </div>
      </section>

      <div style={{ height: 2, background: 'linear-gradient(90deg, var(--color-blue), var(--color-orange))' }} />

      <section className="section bg-surface">
        <div className="container">
          <div style={{ maxWidth: 680, marginInline: 'auto', background: 'var(--color-white)', borderRadius: 'var(--r-lg)', padding: '3rem', boxShadow: '0 2px 8px rgba(13,14,15,0.06)' }}>
            <ContactForm
              formType="maintenance"
              heading="Servicebestilling"
              subheading="Fyll ut skjemaet så tek me kontakt og finn eit tidspunkt som passar deg."
            />
          </div>
        </div>
      </section>
    </>
  );
}
