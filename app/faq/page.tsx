import type { Metadata } from "next";

import { PageHero } from "@/components/ui/PageHero";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { FAQ_ITEMS } from "@/data/siteData";
import { FAQAccordion } from "./FAQAccordion";

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") ||
  "https://www.indiasolarshow.com";

const PAGE_URL = `${SITE_URL}/faq`;
const SITE_NAME = "India International Solar Show";

const PAGE_TITLE =
  "Frequently Asked Questions | India International Solar Show 2026";

const PAGE_DESCRIPTION =
  "Find answers to common questions about India International Solar Show 2026, including visitor registration, exhibiting, conference, sponsorship, venue, travel and event participation.";

export const metadata: Metadata = {
  title: {
    absolute: PAGE_TITLE,
  },

  description: PAGE_DESCRIPTION,

  keywords: [
    "India International Solar Show FAQ",
    "India International Solar Show 2026",
    "Solar Expo Pune FAQ",
    "Solar Exhibition Visitor Questions",
    "Solar Expo Exhibitor Information",
    "Solar Conference Pune",
    "Solar Show Venue Pune",
    "Solar Exhibition Registration FAQ",
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
        alt: "India International Solar Show 2026 Frequently Asked Questions",
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

function FAQJsonLd() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "@id": `${PAGE_URL}/#faq`,

    url: PAGE_URL,
    name: PAGE_TITLE,
    description: PAGE_DESCRIPTION,

    isPartOf: {
      "@type": "WebSite",
      "@id": `${SITE_URL}/#website`,
      name: SITE_NAME,
      url: SITE_URL,
    },

    mainEntity: FAQ_ITEMS.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),

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
        name: "Frequently Asked Questions",
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

export default function FAQPage() {
  return (
    <>
      <FAQJsonLd />
      <BreadcrumbJsonLd />

      <PageHero
        eyebrow="FAQ"
        title="Frequently Asked Questions"
        subtitle="Find answers about visiting, exhibiting, conference participation, sponsorship, venue information and India International Solar Show 2026."
        breadcrumbs={[
          {
            label: "Home",
            href: "/",
          },
          {
            label: "FAQ",
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
            label: "Event",
            value: "India International Solar Show",
          },
        ]}
      />

      <section className="bg-paper py-10 sm:py-12 lg:py-14">
        <Container>
          <SectionHeading
            eyebrow="Questions & Answers"
            heading="Everything You Need to Know"
            intro="Find quick answers about registration, participation, venue, conference and other show-related information."
            align="center"
          />

          <div className="mx-auto mt-7 max-w-3xl sm:mt-8">
            <FAQAccordion
              items={
                FAQ_ITEMS as unknown as {
                  question: string;
                  answer: string;
                }[]
              }
            />
          </div>
        </Container>
      </section>
    </>
  );
}