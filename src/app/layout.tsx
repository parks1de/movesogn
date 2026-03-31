import type { Metadata } from 'next';
import Script from 'next/script';
import { Syne, DM_Sans, DM_Mono } from 'next/font/google';
import '../styles/globals.css';
import NavBar from '@/components/layout/NavBar';
import Footer from '@/components/layout/Footer';
import CookieBanner from '@/components/ui/CookieBanner';

const syne = Syne({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800'],
  variable: '--font-display',
  display: 'swap',
});

const dmSans = DM_Sans({
  subsets: ['latin'],
  weight: ['300', '400', '500'],
  style: ['normal', 'italic'],
  variable: '--font-body',
  display: 'swap',
});

const dmMono = DM_Mono({
  subsets: ['latin'],
  weight: ['400', '500'],
  variable: '--font-mono',
  display: 'swap',
});

const GA_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;
const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.movesogn.no';

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: 'MOVE Sogn — Bil, båt, sykkel og heim i Sogn',
    template: '%s | MOVE Sogn',
  },
  description:
    'MOVE Sogn tilbyr Toyota, Hertz bilutleige, Summerfun-båtar, Merida el-syklar, NIU moped og eigedom i Sogn. 40 år med mobilitet og lokalkunne.',
  openGraph: {
    siteName: 'MOVE Sogn',
    locale: 'nn_NO',
    type: 'website',
    url: SITE_URL,
    images: [{ url: '/og-default.jpg', width: 1200, height: 630, alt: 'MOVE Sogn' }],
  },
  twitter: {
    card: 'summary_large_image',
    site: '@movesogn',
  },
  icons: {
    icon: '/favicon.ico',
    apple: '/apple-touch-icon.png',
  },
};

const localBusinessSchema = {
  '@context': 'https://schema.org',
  '@type': 'LocalBusiness',
  name: 'MOVE Sogn',
  telephone: '+4757676666',
  email: 'post@movesogn.no',
  url: 'https://www.movesogn.no',
  logo: 'https://www.movesogn.no/images/logo-blue.svg',
  image: 'https://www.movesogn.no/og-default.jpg',
  priceRange: '££',
  address: {
    '@type': 'PostalAddress',
    streetAddress: 'Skarpeteigvegen 1',
    addressLocality: 'Kaupanger',
    postalCode: '6854',
    addressCountry: 'NO',
  },
  geo: {
    '@type': 'GeoCoordinates',
    latitude: 61.1833,
    longitude: 7.2333,
  },
  openingHoursSpecification: [
    {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
      opens: '08:00',
      closes: '17:00',
    },
  ],
  sameAs: [
    'https://www.facebook.com/movesogn',
    'https://www.instagram.com/movesogn',
  ],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="nn" className={`${syne.variable} ${dmSans.variable} ${dmMono.variable}`}>
      <head>
        {/* LocalBusiness JSON-LD — critical for local search visibility */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
        />
      </head>
      <body>
        {/* GA4 — loads only after cookie consent is granted (see CookieBanner) */}
        {GA_ID && (
          <>
            <Script
              id="ga4-init"
              strategy="afterInteractive"
              src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
            />
            <Script id="ga4-config" strategy="afterInteractive">
              {`
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', '${GA_ID}', { anonymize_ip: true });
              `}
            </Script>
          </>
        )}

        <NavBar />
        <main id="main-content">{children}</main>
        <Footer />
        <CookieBanner />
      </body>
    </html>
  );
}
