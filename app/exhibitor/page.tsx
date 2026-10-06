import type { Metadata } from "next";

import { PageHero } from "@/components/ui/PageHero";
import { ExhibitorProfile } from "@/components/ExhibitorProfile";
import { WhyParticipate } from "@/components/WhyParticipate";
import { ExhibitorOpportunityStrip } from "@/components/ExhibitorOpportunityStrip";

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") ||
  "https://www.indiasolarshow.com";

const PAGE_URL = `${SITE_URL}/exhibitor`;
const SITE_NAME = "India International Solar Show";

const PAGE_TITLE =
  "Exhibit at India International Solar Show 2026 | Solar Expo Pune";

const PAGE_DESCRIPTION =
  "Exhibit at India International Solar Show 2026 in Pune. Showcase solar PV, BESS, energy storage and clean-energy technologies to EPCs, developers, buyers, investors and industry decision-makers.";

export const metadata: Metadata = {
  title: {
    absolute: PAGE_TITLE,
  },

  description: PAGE_DESCRIPTION,

  keywords: [
    "Exhibit at India International Solar Show",
    "India International Solar Show 2026",
    "Solar Expo Pune Exhibitor",
    "Solar Exhibition Stall Booking",
    "Solar Trade Show India",
    "Solar PV Exhibition India",
    "BESS Expo India",
    "Energy Storage Exhibition India",
    "Renewable Energy Exhibition Pune",
    "Solar EPC Exhibition",
    "Solar Manufacturer Exhibition",
    "Solar Stall Booking Pune",
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
        url: "/og-exhibitor.jpg",
        width: 1200,
        height: 630,
        alt: "Exhibit at India International Solar Show 2026 in Pune",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: PAGE_TITLE,
    description: PAGE_DESCRIPTION,
    images: ["/og-exhibitor.jpg"],
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

function ExhibitorPageJsonLd() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
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

    primaryImageOfPage: {
      "@type": "ImageObject",
      url: `${SITE_URL}/og-exhibitor.jpg`,
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
        name: "Exhibit With Us",
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

export default function ExhibitorPage() {
  return (
    <>
      <ExhibitorPageJsonLd />
      <BreadcrumbJsonLd />

      <div className="overflow-hidden bg-paper text-ink">
        <PageHero
          eyebrow="Exhibit With Us"
          title="Showcase Your Innovations at India International Solar Show 2026"
          subtitle="Connect with solar developers, EPC companies, industrial buyers, technology partners, investors and clean-energy decision-makers in Pune."
          breadcrumbs={[
            {
              label: "Home",
              href: "/",
            },
            {
              label: "Exhibit With Us",
            },
          ]}
          meta={[
            {
              label: "Show Dates",
              value: "02–04 October 2026",
            },
            {
              label: "Venue",
              value: "Auto Cluster, Pune",
            },
            {
              label: "Format",
              value: "3-Day B2B Exhibition",
            },
          ]}
        />

        <ExhibitorOpportunityStrip />
        <ExhibitorProfile />
        <WhyParticipate />
      </div>
    </>
  );
}