import type { Metadata } from "next";

import { PageHero } from "@/components/ui/PageHero";
import { BrochureDownloadExperience } from "@/components/BrochureDownloadExperience";

/* =========================================================
   Constants
   ========================================================= */

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") ||
  "https://www.indiasolarshow.com";

const PAGE_URL = `${SITE_URL}/brochure`;

/* =========================================================
   Metadata
   ========================================================= */

export const metadata: Metadata = {
  title: "Download Brochure | India International Solar Show 2026",

  description:
    "Download the India International Solar Show 2026 brochure for event highlights, exhibitor opportunities, visitor information, market focus and participation details.",

  alternates: {
    canonical: PAGE_URL,
  },

  openGraph: {
    title: "Download India International Solar Show 2026 Brochure",

    description:
      "Get the official India International Solar Show 2026 brochure with event highlights, participation information and clean-energy opportunities.",

    url: PAGE_URL,

    siteName: "India International Solar Show 2026",

    locale: "en_IN",

    type: "website",
  },

  robots: {
    index: true,
    follow: true,
  },
};

/* =========================================================
   Structured Data
   ========================================================= */

const breadcrumbJsonLd = {
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
      name: "Download Brochure",
      item: PAGE_URL,
    },
  ],
};

/* =========================================================
   Page
   ========================================================= */

export default function BrochurePage() {
  const breadcrumbSchema = JSON.stringify(breadcrumbJsonLd).replace(
    /</g,
    "\\u003c",
  );

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: breadcrumbSchema,
        }}
      />

      <main
        className="
          overflow-hidden
          bg-paper
          text-ink
        "
      >
        <PageHero
          eyebrow="Event Brochure"
          title="Download the India International Solar Show 2026 Brochure"
          subtitle="Get a concise overview of the show, industry focus, participation opportunities and the clean-energy ecosystem coming together in Pune."
          breadcrumbs={[
            {
              label: "Home",
              href: "/",
            },

            {
              label: "Download Brochure",
            },
          ]}
          meta={[
            {
              label: "Format",
              value: "PDF Brochure",
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

        <BrochureDownloadExperience />
      </main>
    </>
  );
}
