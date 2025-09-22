import type { Metadata } from 'next';
import { Inter, Playfair_Display } from 'next/font/google';
import { Providers } from './providers';
import './globals.css';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair',
  display: 'swap',
});

export const metadata: Metadata = {
  title: {
    default: 'Vardaan Agro Farm - Pure Organic, Pure Health',
    template: '%s | Vardaan Agro Farm',
  },
  description: 'Premium organic products from Vardaan Agro Farm. Fresh vegetables, fruits, grains, and organic fertilizers delivered to your doorstep. Experience the purity of organic farming.',
  keywords: [
    'organic farming',
    'organic vegetables',
    'organic fruits',
    'organic grains',
    'organic fertilizers',
    'fresh produce',
    'healthy food',
    'sustainable agriculture',
    'farm fresh',
    'pesticide free',
    'Vardaan Agro',
    'Punjab farming',
    'organic delivery',
  ],
  authors: [{ name: 'Vardaan Agro Farm' }],
  creator: 'Vardaan Agro Farm',
  publisher: 'Vardaan Agro Farm',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'website',
    locale: 'en_IN',
    url: '/',
    siteName: 'Vardaan Agro Farm',
    title: 'Vardaan Agro Farm - Pure Organic, Pure Health',
    description: 'Premium organic products from Vardaan Agro Farm. Fresh vegetables, fruits, grains, and organic fertilizers delivered to your doorstep.',
    images: [
      {
        url: '/images/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Vardaan Agro Farm - Organic Products',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Vardaan Agro Farm - Pure Organic, Pure Health',
    description: 'Premium organic products delivered fresh from our farm to your doorstep.',
    images: ['/images/twitter-image.jpg'],
    creator: '@vardaanagro',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'your-google-verification-code',
    yandex: 'your-yandex-verification-code',
  },
  category: 'agriculture',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" href="/icon.svg" type="image/svg+xml" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#22c55e" />
        <meta name="color-scheme" content="light dark" />
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=5" />
        
        {/* Preconnect to external domains */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="preconnect" href="https://res.cloudinary.com" />
        
        {/* Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'Organization',
              name: 'Vardaan Agro Farm',
              url: process.env.NEXT_PUBLIC_SITE_URL,
              logo: `${process.env.NEXT_PUBLIC_SITE_URL}/images/logo.png`,
              description: 'Premium organic farming products and sustainable agriculture solutions',
              address: {
                '@type': 'PostalAddress',
                addressCountry: 'IN',
                addressRegion: 'Haryana',
                addressLocality: 'Haryana',
              },
              contactPoint: {
                '@type': 'ContactPoint',
                telephone: '+91-8283026214',
                contactType: 'customer service',
                availableLanguage: ['English', 'Hindi', 'Punjabi'],
              },
              sameAs: [
                'https://facebook.com/vardaanagro',
                'https://twitter.com/vardaanagro',
                'https://instagram.com/vardaanagro',
              ],
            }),
          }}
        />
      </head>
      <body className={`${inter.variable} ${playfair.variable} font-sans antialiased`}>
        <Providers>
          <div className="relative flex min-h-screen flex-col">
            <div className="flex-1">{children}</div>
          </div>
        </Providers>
        
        {/* Analytics Scripts */}
        {process.env.NODE_ENV === 'production' && (
          <>
            {/* Google Analytics */}
            <script
              async
              src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA_ID}`}
            />
            <script
              dangerouslySetInnerHTML={{
                __html: `
                  window.dataLayer = window.dataLayer || [];
                  function gtag(){dataLayer.push(arguments);}
                  gtag('js', new Date());
                  gtag('config', '${process.env.NEXT_PUBLIC_GA_ID}', {
                    page_title: document.title,
                    page_location: window.location.href,
                  });
                `,
              }}
            />
          </>
        )}
      </body>
    </html>
  );
}