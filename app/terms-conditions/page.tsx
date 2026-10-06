import type { Metadata } from "next";

import { EVENT } from "@/data/siteData";
import { PageHero } from "@/components/ui/PageHero";
import { TermsContent } from "@/components/TermsContent";

/* =========================================================
   Constants
   ========================================================= */

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") ||
  "https://www.indiasolarshow.com";

const PAGE_URL = `${SITE_URL}/terms`;

/* =========================================================
   Metadata
   ========================================================= */

export const metadata: Metadata = {
  title: "Terms & Conditions | India International Solar Show 2026",

  description: `Terms and conditions for the ${EVENT.nameWithYear} website and event registration. Read about participation rules, cancellation policies, intellectual property, liability and event terms.`,

  alternates: {
    canonical: PAGE_URL,
  },

  openGraph: {
    title: "Terms & Conditions | India International Solar Show 2026",

    description: `Terms governing use of the ${EVENT.nameWithYear} website, registration and event participation.`,

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
      name: "Terms & Conditions",
      item: PAGE_URL,
    },
  ],
};

/* =========================================================
   Page
   ========================================================= */

export default function TermsConditionsPage() {
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
          eyebrow="Legal"
          title="Terms & Conditions"
          subtitle="Please review the terms governing use of this website, event registration and participation in India International Solar Show."
          breadcrumbs={[
            {
              label: "Home",
              href: "/",
            },

            {
              label: "Terms & Conditions",
            },
          ]}
          meta={[
            {
              label: "Document",
              value: "Terms & Conditions",
            },

            {
              label: "Last Updated",
              value: "July 2025",
            },

            {
              label: "Applies To",
              value: "Website & Event",
            },
          ]}
        />

        <TermsContent />
      </main>
    </>
  );
}
