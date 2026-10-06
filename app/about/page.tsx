import type { Metadata } from "next";

import { PageHero } from "@/components/ui/PageHero";
import { AboutSection } from "@/components/AboutSection";
import {
  IndiaMarketSection,
  PuneMarketSection,
} from "@/components/MarketScopeSection";
import { ValueChainSection } from "@/components/ValueChainSection";
import { EcosystemSection } from "@/components/EcosystemSection";

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") ||
  "https://www.indiasolarshow.com";

const PAGE_URL = `${SITE_URL}/about`;

const SITE_NAME = "India International Solar Show";

const PAGE_TITLE =
  "About India International Solar Show 2026 | Solar Expo Pune";

const PAGE_DESCRIPTION =
  "Learn about India International Solar Show 2026 in Pune, a B2B exhibition connecting solar PV, energy storage, EPC, clean-tech, renewable energy manufacturers, buyers, developers and industry professionals.";

export const metadata: Metadata = {
  title: {
    absolute: PAGE_TITLE,
  },

  description: PAGE_DESCRIPTION,

  keywords: [
    "About India International Solar Show",
    "India International Solar Show 2026",
    "India Solar Show 2026",
    "Solar Expo Pune",
    "Solar Exhibition Pune",
    "Solar Exhibition India",
    "Solar PV Exhibition",
    "Energy Storage Exhibition India",
    "Renewable Energy Expo Pune",
    "Clean Energy Exhibition India",
    "Solar EPC Expo",
  ],

  alternates: {
    canonical: PAGE_URL,
  },

  openGraph: {
    type: "website",
    locale: "en_IN",
    url: PAGE_URL,
    siteName: SITE_NAME,
    title: PAGE_TITLE,
    description: PAGE_DESCRIPTION,

    images: [
      {
        url: "/images/home/solar-show-hero.webp",
        width: 1200,
        height: 630,
        alt: "India International Solar Show 2026 in Pune",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: PAGE_TITLE,
    description: PAGE_DESCRIPTION,
    images: ["/images/home/solar-show-hero.webp"],
  },

  robots: {
    index: true,
    follow: true,

    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
};

function safeJsonLd(data: unknown) {
  return JSON.stringify(data).replace(/</g, "\\u003c");
}

function AboutJsonLd() {
  const schema = {
    "@context": "https://schema.org",

    "@type": "AboutPage",

    "@id": `${PAGE_URL}/#webpage`,

    url: PAGE_URL,

    name: PAGE_TITLE,

    description: PAGE_DESCRIPTION,

    isPartOf: {
      "@type": "WebSite",
      "@id": `${SITE_URL}/#website`,
      name: SITE_NAME,
      url: SITE_URL,
    },

    about: {
      "@type": "Event",
      "@id": `${SITE_URL}/#event`,
      name: "India International Solar Show 2026",
      url: SITE_URL,
    },

    inLanguage: "en-IN",
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: safeJsonLd(schema),
      }}
    />
  );
}

function BreadcrumbJsonLd() {
  const schema = {
    "@context": "https://schema.org",

    "@type": "BreadcrumbList",

    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: SITE_URL,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "About the Show",
        item: PAGE_URL,
      },
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: safeJsonLd(schema),
      }}
    />
  );
}

export default function AboutPage() {
  return (
    <>
      <AboutJsonLd />
      <BreadcrumbJsonLd />

      <div className="relative overflow-hidden bg-paper">
        <PageHero
          eyebrow="About the Show"
          title="India International Solar Show 2026"
          subtitle="Discover India's B2B platform connecting solar technologies, energy storage, EPC, clean mobility and the wider renewable-energy ecosystem in Pune."
          breadcrumbs={[
            {
              label: "Home",
              href: "/",
            },
            {
              label: "About the Show",
            },
          ]}
          meta={[
            {
              label: "Show Dates",
              value: "02–04 October 2026",
            },
            {
              label: "Location",
              value: "Pune, Maharashtra",
            },
            {
              label: "Format",
              value: "3-Day B2B Exhibition",
            },
          ]}
        />

        <AboutSection />
        <IndiaMarketSection />
        <PuneMarketSection />
        <ValueChainSection />
        <EcosystemSection />
      </div>
    </>
  );
}