import type { Metadata } from 'next';
import Link from 'next/link';
import FadeUp from '@/components/ui/FadeUp';
import Icon from '@/components/ui/Icon';
import ContactForm from '@/components/ui/ContactForm';

export const metadata: Metadata = {
  title: 'Suzuki Båtmotor | MOVE Sogn Marine',
  description: 'Autorisert Suzuki-service og -sal på Kaupanger. Pålitelege påhengarsmotorar for alle båttypar.',
  openGraph: {
    images: [{ url: 'https://images.unsplash.com/photo-1605281317010-fe5ffe798166?w=1200&q=80', width: 1200, height: 630, alt: 'Suzuki Båtmotor — MOVE Sogn Marine' }],
  },
};

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
