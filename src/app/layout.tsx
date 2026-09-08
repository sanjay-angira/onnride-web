import type { Metadata, Viewport } from 'next';
import { GeistSans } from 'geist/font/sans';
import { ContactRailWrapper } from '@/components/layout/ContactRailWrapper';
import { Footer } from '@/components/layout/Footer';
import { Header } from '@/components/layout/Header';
import { GlobalJsonLd } from '@/components/seo/GlobalJsonLd';
import { SupportFabWrapper } from '@/components/support/SupportFabWrapper';
import { AuthHydrator } from '@/providers/AuthHydrator';
import { StoreProvider } from '@/providers/StoreProvider';
import { getSiteUrl } from '@/lib/seo/site-url';
import './globals.css';

const googleSiteVerification = process.env.GOOGLE_SITE_VERIFICATION?.trim();

export const metadata: Metadata = {
  metadataBase: new URL(getSiteUrl()),
  applicationName: 'OnnRide',
  title: {
    default: 'Bike Rental Near Me | Self Drive Bike on Rent | OnnRide',
    template: '%s | OnnRide',
  },
  description:
    'Bike rental near me — self-drive bike rental & bike on rent across India. Verified vendors, transparent pricing, instant online booking.',
  icons: {
    icon: [{ url: '/icon.svg', type: 'image/svg+xml' }],
    apple: [{ url: '/apple-icon.svg', type: 'image/svg+xml' }],
  },
  openGraph: {
    siteName: 'OnnRide',
    locale: 'en_IN',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
  },
  alternates: {
    types: {
      'text/plain': [{ url: '/llms.txt', title: 'OnnRide LLM site guide' }],
    },
  },
  verification: {
    ...(googleSiteVerification ? { google: googleSiteVerification } : {}),
    other: {
      'msvalidate.01': '8FC747632D85BCB72B6A646DC363E507',
    },
  },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#111827',
};


export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en-IN">
      <body className={`${GeistSans.variable} font-sans`}>
        <GlobalJsonLd />
        <StoreProvider>
          <AuthHydrator>
            <div className="flex min-h-screen flex-col">
              <Header />
              <main className="flex-1 bg-white">{children}</main>
              <Footer />
              <ContactRailWrapper />
              <SupportFabWrapper />
            </div>
          </AuthHydrator>
        </StoreProvider>
      </body>
    </html>
  );
}
