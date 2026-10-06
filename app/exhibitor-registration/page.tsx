import type { Metadata } from "next";

import { ExhibitorRegistrationForm } from "@/components/forms/ExhibitorRegistrationForm";
import { Container } from "@/components/ui/Container";
import { PageHero } from "@/components/ui/PageHero";
import { SectionHeading } from "@/components/ui/SectionHeading";

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") ||
  "https://www.indiasolarshow.com";

const PAGE_URL = `${SITE_URL}/exhibitor-registration`;
const SITE_NAME = "India International Solar Show";

const PAGE_TITLE =
  "Exhibitor Registration | India International Solar Show 2026";

const PAGE_DESCRIPTION =
  "Register to exhibit at India International Solar Show 2026 in Pune. Submit your company details and stall requirements to receive availability, pricing and floor plan options.";

export const metadata: Metadata = {
  title: {
    absolute: PAGE_TITLE,
  },

  description: PAGE_DESCRIPTION,

  keywords: [
    "Exhibitor Registration India International Solar Show",
    "India International Solar Show 2026",
    "Solar Expo Pune Exhibitor Registration",
    "Solar Exhibition Stall Booking",
    "Solar Expo Stall Booking Pune",
    "Solar Exhibition India Exhibitor",
    "BESS Exhibition Stall Booking",
    "Energy Storage Expo Exhibitor",
    "Renewable Energy Expo Pune",
    "Solar Trade Show Exhibitor Registration",
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
        alt: "Exhibitor Registration for India International Solar Show 2026",
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

function ExhibitorRegistrationJsonLd() {
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
        name: "Exhibit With Us",
        item: `${SITE_URL}/exhibitor`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: "Exhibitor Registration",
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

export default function ExhibitorRegistrationPage() {
  return (
    <>
      <ExhibitorRegistrationJsonLd />
      <BreadcrumbJsonLd />

      <PageHero
        eyebrow="Exhibitor Registration"
        title="Reserve Your Exhibition Space"
        subtitle="Register your interest to exhibit at India International Solar Show 2026 and receive stall availability, pricing and floor plan options from our team."
        breadcrumbs={[
          {
            label: "Home",
            href: "/",
          },
          {
            label: "Exhibit With Us",
            href: "/exhibitor",
          },
          {
            label: "Exhibitor Registration",
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
            label: "Participation",
            value: "Exhibitor Registration",
          },
        ]}
      />

      <section className="bg-paper py-10 sm:py-12 lg:py-14">
        <Container>
          <SectionHeading
            eyebrow="Exhibit With Us"
            heading="Book Your Exhibition Space"
            intro="Share your company profile and participation requirements. Our team will contact you with suitable stall options, availability, pricing and floor plan details."
            align="center"
          />

          <div className="mx-auto mt-7 max-w-4xl sm:mt-8">
            <div className="relative overflow-hidden rounded-[24px] border border-ink/[0.075] bg-paper p-3 shadow-[0_18px_55px_rgba(9,25,31,0.055)] sm:p-4 lg:p-5">
              <span
                aria-hidden="true"
                className="absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-transparent via-solar to-transparent"
              />

              <ExhibitorRegistrationForm />
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
