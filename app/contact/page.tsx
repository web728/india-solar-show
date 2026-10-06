import type { Metadata } from "next";

import { PageHero } from "@/components/ui/PageHero";
import { ContactExperience } from "@/components/ContactExperience";

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") ||
  "https://www.indiasolarshow.com";

const PAGE_URL = `${SITE_URL}/contact`;
const SITE_NAME = "India International Solar Show";

const PAGE_TITLE =
  "Contact India International Solar Show 2026 | Pune";

const PAGE_DESCRIPTION =
  "Contact the India International Solar Show 2026 team for exhibitor bookings, visitor registration, sponsorship, media partnerships and general event enquiries in Pune.";

export const metadata: Metadata = {
  title: {
    absolute: PAGE_TITLE,
  },

  description: PAGE_DESCRIPTION,

  keywords: [
    "Contact India International Solar Show",
    "India International Solar Show 2026",
    "Solar Expo Pune Contact",
    "Solar Exhibition Pune Contact",
    "Exhibitor Enquiry Solar Expo",
    "Visitor Registration Enquiry",
    "Solar Expo Sponsorship Enquiry",
    "Media Partnership Solar Expo",
    "Solar Exhibition Contact India",
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
        alt: "Contact India International Solar Show 2026",
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

function ContactPageJsonLd() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "ContactPage",
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
        name: "Contact Us",
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

export default function ContactPage() {
  return (
    <>
      <ContactPageJsonLd />
      <BreadcrumbJsonLd />

      <div className="overflow-hidden bg-paper text-ink">
        <PageHero
          eyebrow="Contact Us"
          title="Connect with the India International Solar Show Team"
          subtitle="Get in touch for exhibitor bookings, visitor registration, sponsorship, media partnerships and general event enquiries."
          breadcrumbs={[
            {
              label: "Home",
              href: "/",
            },
            {
              label: "Contact Us",
            },
          ]}
          meta={[
            {
              label: "Event",
              value: "India International Solar Show 2026",
            },
            {
              label: "Venue",
              value: "Auto Cluster, Pune",
            },
            {
              label: "Show Dates",
              value: "02–04 October 2026",
            },
          ]}
        />

        <ContactExperience />
      </div>
    </>
  );
}