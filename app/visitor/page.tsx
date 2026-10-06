import type { Metadata } from "next";

import { PageHero } from "@/components/ui/PageHero";
import { VisitorExperience } from "@/components/VisitorExperience";
import { VisitorProfile } from "@/components/VisitorProfile";

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") ||
  "https://www.indiasolarshow.com";

const PAGE_URL = `${SITE_URL}/visitor`;
const SITE_NAME = "India International Solar Show";

const PAGE_TITLE =
  "Visitor Registration | India International Solar Show 2026 Pune";

const PAGE_DESCRIPTION =
  "Register to visit India International Solar Show 2026 in Pune. Explore solar PV, BESS, energy storage and clean-energy technologies while meeting manufacturers, EPCs, developers and industry professionals.";

export const metadata: Metadata = {
  title: {
    absolute: PAGE_TITLE,
  },

  description: PAGE_DESCRIPTION,

  keywords: [
    "India International Solar Show Visitor Registration",
    "India International Solar Show 2026",
    "Solar Expo Pune Visitor Pass",
    "Solar Exhibition Pune",
    "Solar Exhibition India",
    "Solar Energy Trade Show India",
    "BESS Expo Pune",
    "Energy Storage Exhibition India",
    "Renewable Energy Expo Pune",
    "Solar Manufacturers India",
    "Solar EPC Exhibition",
    "Clean Energy Exhibition India",
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
        url: "/og-visitor.jpg",
        width: 1200,
        height: 630,
        alt: "Visitor Registration for India International Solar Show 2026 Pune",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: PAGE_TITLE,
    description: PAGE_DESCRIPTION,
    images: ["/og-visitor.jpg"],
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

function VisitorPageJsonLd() {
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
      url: `${SITE_URL}/og-visitor.jpg`,
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
        name: "Visitor Registration",
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

export default function VisitorPage() {
  return (
    <>
      <VisitorPageJsonLd />
      <BreadcrumbJsonLd />

      <div className="overflow-hidden bg-paper text-ink">
        <PageHero
          eyebrow="Visitor Registration"
          title="Visit India International Solar Show 2026"
          subtitle="Explore solar PV, energy storage, BESS and clean-energy technologies, meet manufacturers and EPC companies, and build valuable industry connections in Pune."
          breadcrumbs={[
            {
              label: "Home",
              href: "/",
            },
            {
              label: "Visitor Registration",
            },
          ]}
          meta={[
            {
              label: "Entry",
              value: "Visitor Trade Pass",
            },
            {
              label: "Show Dates",
              value: "02–04 October 2026",
            },
            {
              label: "Venue",
              value: "Auto Cluster, Pune",
            },
          ]}
        />

        <VisitorExperience />
        <VisitorProfile />
      </div>
    </>
  );
}