import type { Metadata } from "next";
import { Cormorant_Garamond, Manrope, Noto_Sans_Arabic } from "next/font/google";
import "./globals.css";
import { LanguageProvider } from "@/contexts/LanguageProvider";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import SkipLink from "@/components/ui/SkipLink";
import ServiceWorkerRegister from "@/components/ui/ServiceWorkerRegister";
import {
  SITE_TITLE,
  SITE_TITLE_BILINGUAL,
  SITE_DESCRIPTION,
  OG_DESCRIPTION,
  jsonLdGraph,
} from "@/data/schema";

const SITE_URL = "https://www.toumaiholding.com";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400", "600"],
  variable: "--font-display",
  display: "swap",
  preload: true,
});

const manrope = Manrope({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-sans",
  display: "swap",
  preload: true,
});

const notoArabic = Noto_Sans_Arabic({
  subsets: ["arabic"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-arabic",
  display: "swap",
  preload: true,
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: SITE_TITLE,
    template: `%s | Toumai Holding`,
  },
  description: SITE_DESCRIPTION,
  keywords: [
    "Toumai Holding",
    "توماي القابضة",
    "Toumai",
    "Toumai Chad",
    "Chad",
    "تشاد",
    "Investment Group",
    "Technology Holding",
    "Fintech Africa",
    "Digital Infrastructure",
    "Artificial Intelligence",
    "Logistics",
    "Telecommunications",
    "Africa",
    "أفريقيا",
    "N'Djamena",
    "TPay",
    "THost",
    "TamiAI",
    "TVentures",
    "Digital Transformation",
  ],
  authors: [{ name: SITE_TITLE_BILINGUAL, url: SITE_URL }],
  creator: "Toumai Holding",
  publisher: "Toumai Holding",
  applicationName: "Toumai Holding",
  category: "Technology & Investment",
  classification: "Business",
  referrer: "origin-when-cross-origin",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  alternates: {
    canonical: SITE_URL,
    languages: {
      en: SITE_URL,
      fr: SITE_URL,
      ar: SITE_URL,
      "x-default": SITE_URL,
    },
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    alternateLocale: ["fr_FR", "ar_TD"],
    url: SITE_URL,
    siteName: SITE_TITLE_BILINGUAL,
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: SITE_TITLE_BILINGUAL,
        type: "image/png",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: SITE_TITLE,
    description: OG_DESCRIPTION,
    images: ["/og-image.png"],
    creator: "@toumaiholding",
  },
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/favicon.svg", type: "image/svg+xml" },
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/favicon-48x48.png", sizes: "48x48", type: "image/png" },
      { url: "/favicon-64x64.png", sizes: "64x64", type: "image/png" },
      { url: "/android-chrome-192x192.png", sizes: "192x192", type: "image/png" },
      { url: "/android-chrome-512x512.png", sizes: "512x512", type: "image/png" },
      { url: "/logo.png", sizes: "512x512", type: "image/png" },
    ],
    apple: [
      { url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
    ],
    shortcut: ["/favicon.ico"],
    other: [
      { rel: "mask-icon", url: "/logo.png", color: "#d4af37" },
      { rel: "apple-touch-icon", url: "/apple-touch-icon.png", sizes: "180x180" },
    ],
  },
  manifest: "/manifest.json",
  appleWebApp: {
    capable: true,
    title: "Toumai Holding",
    statusBarStyle: "black-translucent",
  },
  other: {
    "theme-color": "#d4af37",
    "msapplication-TileColor": "#050505",
    "msapplication-TileImage": "/android-chrome-192x192.png",
    "msapplication-config": "/browserconfig.xml",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <head>
        <link rel="canonical" href={SITE_URL} />
        <link rel="alternate" hrefLang="en" href={SITE_URL} />
        <link rel="alternate" hrefLang="fr" href={SITE_URL} />
        <link rel="alternate" hrefLang="ar" href={SITE_URL} />
        <link rel="alternate" hrefLang="x-default" href={SITE_URL} />
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="48x48" href="/favicon-48x48.png" />
        <link rel="icon" type="image/png" sizes="64x64" href="/favicon-64x64.png" />
        <link rel="icon" type="image/png" sizes="192x192" href="/android-chrome-192x192.png" />
        <link rel="icon" type="image/png" sizes="512x512" href="/android-chrome-512x512.png" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="shortcut icon" href="/favicon.ico" />
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#d4af37" media="(prefers-color-scheme: dark)" />
        <meta name="theme-color" content="#d4af37" media="(prefers-color-scheme: light)" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="geo.region" content="TD" />
        <meta name="geo.placename" content="N'Djamena" />
        <meta name="language" content="English, French, Arabic" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(jsonLdGraph),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              url: SITE_URL,
              logo: `${SITE_URL}/logo.png`,
              name: "Toumai Holding",
              alternateName: "توماي القابضة",
            }),
          }}
        />
      </head>
      <body
        className={`${cormorant.variable} ${manrope.variable} ${notoArabic.variable}`}
      >
        <LanguageProvider>
          <SkipLink />
          <Header />
          <main id="main-content">{children}</main>
          <Footer />
          <ServiceWorkerRegister />
        </LanguageProvider>
      </body>
    </html>
  );
}
