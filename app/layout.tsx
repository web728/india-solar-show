import type { Metadata, Viewport } from "next";
import { Archivo, DM_Sans } from "next/font/google";
import { GoogleTagManager } from "@next/third-parties/google";

import "./globals.css";

import { EVENT } from "@/data/siteData";
import { MotionProvider } from "@/components/providers/MotionProvider";
import { ScrollProgress } from "@/components/ScrollProgress";
import { Preloader } from "@/components/Preloader";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { StickyMobileCTA } from "@/components/StickyMobileCTA";

/* =========================================================
   FONTS
========================================================= */

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
  preload: true,
});

const archivo = Archivo({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
  preload: true,
});

/* =========================================================
   SITE CONFIG
========================================================= */

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") ||
  "https://www.indiasolarshow.com";

const GTM_ID = process.env.NEXT_PUBLIC_GTM_ID;

const SITE_NAME = "India International Solar Show";

const SITE_TITLE =
  "India International Solar Show 2026 | Solar Expo Pune";

const SITE_DESCRIPTION =
  "India International Solar Show 2026 in Pune brings together solar manufacturers, energy storage companies, clean-energy technology providers, buyers, developers, investors and industry leaders.";

const ORGANIZER_NAME =
  EVENT.organizer?.fullName ||
  "India International Solar Show";

/* =========================================================
   VIEWPORT
========================================================= */

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,

  themeColor: [
    {
      media: "(prefers-color-scheme: light)",
      color: "#fffdf8",
    },
    {
      media: "(prefers-color-scheme: dark)",
      color: "#191919",
    },
  ],

  colorScheme: "light dark",
};

/* =========================================================
   METADATA
========================================================= */

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),

  applicationName: SITE_NAME,

  title: {
    default: SITE_TITLE,
    template: `%s | ${SITE_NAME}`,
  },

  description: SITE_DESCRIPTION,

  keywords: [
    "India International Solar Show",
    "India International Solar Show 2026",
    "India Solar Show",
    "Solar Expo Pune",
    "Solar Exhibition India",
    "Solar Energy Exhibition",
    "Solar Trade Show India",
    "Renewable Energy Expo India",
    "Energy Storage Exhibition India",
    "Clean Energy Expo India",
    "Solar Industry Exhibition",
    "Solar Manufacturers India",
    "Solar Technology Expo",
    "Solar Conference India",
    "Solar Business Expo",
  ],

  authors: [
    {
      name: ORGANIZER_NAME,
    },
  ],

  creator: ORGANIZER_NAME,
  publisher: ORGANIZER_NAME,

  category: "Business Event",

  referrer: "origin-when-cross-origin",

  alternates: {
    canonical: SITE_URL,
  },

  formatDetection: {
    email: false,
    address: false,
    telephone: false,
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

  openGraph: {
    type: "website",
    locale: "en_IN",
    url: SITE_URL,
    siteName: SITE_NAME,
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,

    images: [
      {
        url: "/opengraph-image.png",
        width: 1200,
        height: 630,
        alt: `${SITE_NAME} 2026 — Solar Expo Pune`,
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    images: ["/opengraph-image.png"],
  },

  icons: {
    icon: [
      {
        url: "/favicon.ico",
      },
      {
        url: "/favicon-32x32.png",
        sizes: "32x32",
        type: "image/png",
      },
      {
        url: "/favicon-16x16.png",
        sizes: "16x16",
        type: "image/png",
      },
    ],

    apple: [
      {
        url: "/apple-touch-icon.png",
        sizes: "180x180",
        type: "image/png",
      },
    ],

    shortcut: "/favicon.ico",
  },

  manifest: "/site.webmanifest",
};

/* =========================================================
   JSON-LD
========================================================= */

function safeJsonLd(data: unknown) {
  return JSON.stringify(data).replace(/</g, "\\u003c");
}

function GlobalJsonLd() {
  const organizationId = `${SITE_URL}/#organization`;
  const websiteId = `${SITE_URL}/#website`;

  const graph = {
    "@context": "https://schema.org",

    "@graph": [
      {
        "@type": "Organization",
        "@id": organizationId,

        name: ORGANIZER_NAME,

        url: SITE_URL,

        logo: {
          "@type": "ImageObject",
          url: `${SITE_URL}/logo.png`,
        },
      },

      {
        "@type": "WebSite",
        "@id": websiteId,

        url: SITE_URL,

        name: SITE_NAME,

        alternateName: [
          "India Solar Show",
          "India International Solar Show 2026",
        ],

        description: SITE_DESCRIPTION,

        publisher: {
          "@id": organizationId,
        },

        inLanguage: "en-IN",
      },
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: safeJsonLd(graph),
      }}
    />
  );
}

/* =========================================================
   ROOT LAYOUT
========================================================= */

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en-IN"
      className={`${dmSans.variable} ${archivo.variable}`}
      suppressHydrationWarning
    >
      <body
        suppressHydrationWarning
        className="min-h-dvh overflow-x-clip bg-paper font-body text-ink antialiased"
      >
        <GlobalJsonLd />

        <MotionProvider>
          <Preloader />
          <ScrollProgress />
          <Header />

          <main
            id="main-content"
            className="min-h-[60vh] pt-24 lg:pt-28"
          >
            {children}
          </main>

          <Footer />
          <StickyMobileCTA />
        </MotionProvider>

        {GTM_ID ? (
          <GoogleTagManager gtmId={GTM_ID} />
        ) : null}
      </body>
    </html>
  );
}