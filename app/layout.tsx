import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import { GoogleTagManager } from "@next/third-parties/google";
import "./globals.css";
import { EVENT } from "@/data/siteData";
import { ScrollProgress } from "@/components/ScrollProgress";
import { Preloader } from "@/components/Preloader";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { StickyMobileCTA } from "@/components/StickyMobileCTA";

const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-montserrat",
  display: "swap",
  weight: ["400", "500", "600", "700", "800", "900"],
});

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://indiasolarshow.com";
const GTM_ID = process.env.NEXT_PUBLIC_GTM_ID || "GTM-XXXXXXX";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "India Solar International Show 2026 | Solar Expo in India & Pune",
    template: `%s | ${EVENT.nameWithYear}`,
  },
  description:
    "India Solar International Show 2026 is India's premier solar energy & renewable storage exhibition in Pune. Connect with solar manufacturers, EPC suppliers, and B2B buyers.",
  keywords: [
    "solar expo in india",
    "solar exhibition in india 2026",
    "solar expo in pune",
    "India Solar International Show",
    "renewable energy exhibition india",
    "solar energy trade fair pune",
    "energy storage expo india",
    "rooftop solar exhibition",
    "book stall solar expo",
    "solar pv manufacturers expo",
    "EV charging infrastructure exhibition",
    "Futurex solar show"
  ],
  authors: [{ name: EVENT.organizer.fullName }],
  alternates: { 
    canonical: SITE_URL 
  },
  openGraph: {
    type: "website",
    locale: "en_IN",
    siteName: EVENT.nameWithYear,
    title: "India Solar International Show 2026 | Premier Solar Expo in India",
    description: "Join India's leading solar, energy storage & renewable energy trade fair in Pune. Book stalls or register as a visitor.",
    url: SITE_URL,
    images: [
      {
        url: `${SITE_URL}/opengraph-image.png`,
        width: 1200,
        height: 630,
        alt: `${EVENT.nameWithYear} Banner`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "India Solar International Show 2026 | Solar Expo Pune",
    description: "Join India's premier solar energy & storage exhibition at Auto Cluster, Pune.",
    images: [`${SITE_URL}/opengraph-image.png`],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: [
      { url: "/favicon.ico" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
    ],
    apple: [
      { url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
    ],
  },
  manifest: "/site.webmanifest",
};

// SEO Schemas Component
function JsonLdSchemas() {
  const eventSchema = {
    "@context": "https://schema.org",
    "@type": "Event",
    name: EVENT.nameWithYear,
    description: EVENT.positioning || "Premier Solar and Renewable Energy Exhibition in India",
    startDate: EVENT.dates.start,
    endDate: EVENT.dates.end,
    eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
    eventStatus: "https://schema.org/EventScheduled",
    image: [`${SITE_URL}/opengraph-image.png`],
    location: {
      "@type": "Place",
      name: EVENT.venue.name,
      address: {
        "@type": "PostalAddress",
        streetAddress: EVENT.venue.line,
        addressLocality: EVENT.venue.city,
        addressRegion: EVENT.venue.state,
        addressCountry: "IN",
      },
    },
    offers: {
      "@type": "Offer",
      url: `${SITE_URL}/visitor-registration`,
      price: "0",
      priceCurrency: "INR",
      availability: "https://schema.org/InStock",
      validFrom: "2026-01-01",
    },
    organizer: {
      "@type": "Organization",
      name: EVENT.organizer.fullName,
      url: SITE_URL,
    },
  };

  // Google Sitelinks Navigation Schema (Key for sub-headings in search)
  const siteNavigationSchema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "itemListElement": [
      {
        "@type": "SiteNavigationElement",
        "position": 1,
        "name": "About Show",
        "url": `${SITE_URL}/about`
      },
      {
        "@type": "SiteNavigationElement",
        "position": 2,
        "name": "Exhibitor Profile",
        "url": `${SITE_URL}/exhibitor-profile`
      },
      {
        "@type": "SiteNavigationElement",
        "position": 3,
        "name": "Visitor Profile",
        "url": `${SITE_URL}/visitor-profile`
      },
      {
        "@type": "SiteNavigationElement",
        "position": 4,
        "name": "Book A Stall",
        "url": `${SITE_URL}/exhibitor-registration`
      },
      {
        "@type": "SiteNavigationElement",
        "position": 5,
        "name": "Contact Us",
        "url": `${SITE_URL}/contact`
      }
    ]
  };

  const webSiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": EVENT.nameWithYear,
    "url": SITE_URL,
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(eventSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(siteNavigationSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(webSiteSchema) }}
      />
    </>
  );
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={montserrat.variable} suppressHydrationWarning>
      <body className="bg-white text-[color:var(--color-black)] antialiased">
        <JsonLdSchemas />
        <Preloader />
        <ScrollProgress />
        <Header />
        <main id="main-content">{children}</main>
        <Footer />
        <StickyMobileCTA />
      </body>
      <GoogleTagManager gtmId={GTM_ID} />
    </html>
  );
}