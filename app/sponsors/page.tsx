import type { Metadata } from "next";

import { PageHero } from "@/components/ui/PageHero";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { CoLocatedShows } from "@/components/co-located-shows";
import { SponsorshipEnquiryForm } from "@/components/forms/SponsorshipEnquiryForm";

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") ||
  "https://www.indiasolarshow.com";

const PAGE_URL = `${SITE_URL}/sponsors`;
const SITE_NAME = "India International Solar Show";

const PAGE_TITLE =
  "Sponsors & Partners | India International Solar Show 2026";

const PAGE_DESCRIPTION =
  "Explore the sponsors, industry partners, associations, knowledge partners and media partners supporting India International Solar Show 2026 in Pune, and enquire about partnership opportunities.";

export const metadata: Metadata = {
  title: {
    absolute: PAGE_TITLE,
  },

  description: PAGE_DESCRIPTION,

  keywords: [
    "India International Solar Show Sponsors",
    "India International Solar Show Partners",
    "India International Solar Show 2026",
    "Solar Exhibition Sponsorship India",
    "Solar Expo Partnership Pune",
    "Solar Industry Partners India",
    "Renewable Energy Associations India",
    "Solar Media Partners",
    "Energy Storage Industry Partners",
    "Clean Energy Sponsorship India",
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
        url: "/opengraph-image.png",
        width: 1200,
        height: 630,
        alt: "Sponsors and Partners of India International Solar Show 2026",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: PAGE_TITLE,
    description: PAGE_DESCRIPTION,
    images: ["/opengraph-image.png"],
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

function SponsorsPageJsonLd() {
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
        name: "Sponsors & Partners",
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

export default function SponsorsPage() {
  return (
    <>
      <SponsorsPageJsonLd />
      <BreadcrumbJsonLd />

      <div className="overflow-hidden bg-paper text-ink">
        <PageHero
          eyebrow="Sponsors & Partners"
          title="Our Event Partners & Industry Ecosystem"
          subtitle="Meet the organizations, associations, institutions and media platforms supporting India International Solar Show 2026."
          breadcrumbs={[
            {
              label: "Home",
              href: "/",
            },
            {
              label: "Sponsors & Partners",
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
              label: "Ecosystem",
              value: "Industry Partners & Associations",
            },
          ]}
        />

        <CoLocatedShows />

        <section
          id="partnership-enquiry"
          className="border-t border-ink/[0.07] bg-paper py-12 sm:py-14 lg:py-16"
        >
          <Container>
            <SectionHeading
              eyebrow="Partner With the Show"
              heading="Build Your Brand Presence With Us"
              intro="Interested in becoming a sponsor, strategic partner, media partner or industry associate? Share your requirements with us and our team will connect with you to discuss suitable partnership opportunities for India International Solar Show 2026."
              align="center"
            />

            <div className="mx-auto mt-8 max-w-4xl">
              <div className="relative overflow-hidden rounded-[24px] border border-ink/[0.075] bg-white p-3 shadow-[0_18px_55px_rgba(9,25,31,0.055)] sm:p-4 lg:p-5">
                <span
                  aria-hidden="true"
                  className="absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-transparent via-solar to-transparent"
                />

                <SponsorshipEnquiryForm />
              </div>
            </div>
          </Container>
        </section>
      </div>
    </>
  );
}