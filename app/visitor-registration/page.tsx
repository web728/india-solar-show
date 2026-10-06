import type { Metadata } from "next";

import { PageHero } from "@/components/ui/PageHero";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { VisitorRegistrationForm } from "@/components/forms/VisitorRegistrationForm";

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") ||
  "https://www.indiasolarshow.com";

const PAGE_URL = `${SITE_URL}https://app.warpbay.com/qPMIy6ii`;
const SITE_NAME = "India International Solar Show";

const PAGE_TITLE =
  "Visitor Registration | India International Solar Show 2026";

const PAGE_DESCRIPTION =
  "Register to visit India International Solar Show 2026 in Pune. Submit your details for visitor access and connect with solar, energy storage, EPC and clean-energy companies.";

export const metadata: Metadata = {
  title: {
    absolute: PAGE_TITLE,
  },

  description: PAGE_DESCRIPTION,

  keywords: [
    "India International Solar Show Visitor Registration",
    "India International Solar Show 2026",
    "Solar Expo Pune Visitor Registration",
    "Solar Exhibition Visitor Pass",
    "Solar Expo Registration Pune",
    "Solar Exhibition India Visitor",
    "BESS Expo Visitor Registration",
    "Energy Storage Exhibition Pune",
    "Renewable Energy Expo Visitor Pass",
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
        alt: "Visitor Registration for India International Solar Show 2026",
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

function VisitorRegistrationJsonLd() {
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

export default function VisitorRegistrationPage() {
  return (
    <>
      <VisitorRegistrationJsonLd />
      <BreadcrumbJsonLd />

      <PageHero
        eyebrow="Visitor Registration"
        title="Register to Visit India International Solar Show 2026"
        subtitle="Register your interest to attend the show and connect with solar manufacturers, EPC companies, energy-storage providers and clean-energy professionals in Pune."
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
            label: "Show Dates",
            value: "02–04 October 2026",
          },
          {
            label: "Venue",
            value: "Auto Cluster, Pune",
          },
          {
            label: "Access",
            value: "Visitor Registration",
          },
        ]}
      />

      <section className="bg-paper py-10 sm:py-12 lg:py-14">
        <Container>
          <SectionHeading
            eyebrow="Register Your Visit"
            heading="Visitor Registration"
            intro="Share your details to register your interest in attending India International Solar Show 2026."
            align="center"
          />

          <div className="mx-auto mt-7 max-w-4xl sm:mt-8">
            <div className="relative overflow-hidden rounded-[24px] border border-ink/[0.075] bg-paper p-3 shadow-[0_18px_55px_rgba(9,25,31,0.055)] sm:p-4 lg:p-5">
              <span
                aria-hidden="true"
                className="absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-transparent via-solar to-transparent"
              />

              <VisitorRegistrationForm />
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}