import type { Metadata } from 'next';
import Link from 'next/link';
import FadeUp from '@/components/ui/FadeUp';
import Icon from '@/components/ui/Icon';

export const metadata: Metadata = {
  title: 'Sparkesykkel | MOVE Sogn',
  description: 'El-sparkesyklar hos MOVE Sogn på Kaupanger. Enkelt, grønt og praktisk transport i Sogn.',
};

export default function SparkesykkelPage() {
  return (
    <>
      <section style={{ paddingTop: 'calc(var(--nav-height) + 6rem)', paddingBottom: '6rem' }}>
        <div className="container">
          <FadeUp>
            <span className="label">Sykkel</span>
            <h1 style={{ marginTop: '0.5rem', marginBottom: '1.5rem' }}>Sparkesykkel</h1>
            <p style={{ fontSize: 'var(--text-body-lg)', marginBottom: '2.5rem' }}>
              {/* TODO: [SANITY] Fetch sparkesykkel intro from CMS */}
              Me kjem snart med el-sparkesyklar hos MOVE Sogn. Ta kontakt for meir informasjon.
            </p>
            <Link href="/kontakt" className="btn btn--primary">
              Ta kontakt
              <Icon name="arrow-right" size={16} />
            </Link>
          </FadeUp>
        </div>
      </section>
    </>
  );
}
