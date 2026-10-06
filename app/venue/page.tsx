import type { Metadata } from "next";
import { Building2, Car, MapPin, Plane, Train } from "lucide-react";

import { PageHero } from "@/components/ui/PageHero";
import { VenueSection } from "@/components/VenueSection";
import { Container } from "@/components/ui/Container";

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") ||
  "https://www.indiasolarshow.com";

const PAGE_URL = `${SITE_URL}/venue`;
const SITE_NAME = "India International Solar Show";

const PAGE_TITLE =
  "Venue & Directions | India International Solar Show 2026 Pune";

const PAGE_DESCRIPTION =
  "Find the venue, address and travel information for India International Solar Show 2026 at Auto Cluster Exhibition Centre, Chinchwad, Pune, Maharashtra.";

export const metadata: Metadata = {
  title: {
    absolute: PAGE_TITLE,
  },

  description: PAGE_DESCRIPTION,

  keywords: [
    "India International Solar Show Venue",
    "India International Solar Show Pune",
    "Auto Cluster Exhibition Centre Pune",
    "Auto Cluster Chinchwad",
    "Solar Expo Pune Venue",
    "Solar Exhibition Pune Location",
    "Pimpri Chinchwad Exhibition Centre",
    "Solar Show Pune Directions",
    "Auto Cluster Exhibition Centre Directions",
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
        url: "/og-venue.jpg",
        width: 1200,
        height: 630,
        alt: "Auto Cluster Exhibition Centre Pune - India International Solar Show 2026 Venue",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: PAGE_TITLE,
    description: PAGE_DESCRIPTION,
    images: ["/og-venue.jpg"],
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

const ACCESS_ITEMS = [
  {
    icon: Building2,
    label: "Venue",
    value: "Auto Cluster Exhibition Centre",
  },
  {
    icon: MapPin,
    label: "Location",
    value: "Chinchwad, Pune",
  },
  {
    icon: Car,
    label: "Road Access",
    value: "Connected to Pune's industrial corridors",
  },
  {
    icon: Train,
    label: "Rail Connectivity",
    value: "Accessible from Pune & Pimpri-Chinchwad",
  },
  {
    icon: Plane,
    label: "Regional Access",
    value: "Connected with Pune's wider transport network",
  },
] as const;

function safeJsonLd(data: unknown) {
  return JSON.stringify(data).replace(/</g, "\\u003c");
}

function VenueJsonLd() {
  const placeId = `${PAGE_URL}/#venue`;

  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      {
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
          "@id": placeId,
        },

        inLanguage: "en-IN",
      },

      {
        "@type": "Place",
        "@id": placeId,

        name: "Auto Cluster Exhibition Centre",

        description:
          "The venue for India International Solar Show 2026 in Chinchwad, Pune, Maharashtra.",

        url: PAGE_URL,

        address: {
          "@type": "PostalAddress",
          streetAddress: "H-Block, Plot No. C-181, Chinchwad",
          addressLocality: "Pimpri-Chinchwad",
          addressRegion: "Maharashtra",
          postalCode: "411019",
          addressCountry: "IN",
        },

        geo: {
          "@type": "GeoCoordinates",
          latitude: 18.6401,
          longitude: 73.8055,
        },

        hasMap:
          "https://maps.google.com/?q=Auto+Cluster+Exhibition+Centre+Pune",

        event: {
          "@type": "Event",
          "@id": `${SITE_URL}/#event`,
          name: "India International Solar Show 2026",
          url: SITE_URL,
        },
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
        name: "Venue & Directions",
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

export default function VenuePage() {
  return (
    <>
      <VenueJsonLd />
      <BreadcrumbJsonLd />

      <div className="overflow-hidden bg-paper text-ink">
        <PageHero
          eyebrow="Venue & Directions"
          title="Auto Cluster Exhibition Centre, Pune"
          subtitle="Plan your visit to India International Solar Show 2026 at Auto Cluster Exhibition Centre in Chinchwad, Pune, with convenient access to major road, rail and regional transport networks."
          breadcrumbs={[
            {
              label: "Home",
              href: "/",
            },
            {
              label: "Venue & Directions",
            },
          ]}
          meta={[
            {
              label: "Venue",
              value: "Auto Cluster Exhibition Centre",
            },
            {
              label: "Location",
              value: "Chinchwad, Pune",
            },
            {
              label: "Show Dates",
              value: "02–04 October 2026",
            },
          ]}
        />

        <section
          aria-label="Venue access overview"
          className="relative z-10 border-b border-ink/[0.08] bg-paper"
        >
          <Container>
            <div className="grid overflow-hidden sm:grid-cols-2 lg:grid-cols-5">
              {ACCESS_ITEMS.map(({ icon: Icon, label, value }) => (
                <div
                  key={label}
                  className="group relative flex min-h-[104px] items-start gap-3 border-ink/[0.08] px-4 py-4 transition-colors duration-300 hover:bg-blue/[0.025] max-sm:border-b max-sm:last:border-b-0 sm:max-lg:border-b sm:max-lg:[&:nth-child(odd)]:border-r sm:max-lg:[&:nth-last-child(-n+2)]:border-b-0 lg:border-r lg:px-5 lg:last:border-r-0"
                >
                  <span
                    aria-hidden="true"
                    className="absolute inset-x-0 top-0 h-[2px] origin-left scale-x-0 bg-solar transition-transform duration-300 group-hover:scale-x-100"
                  />

                  <span className="flex size-9 shrink-0 items-center justify-center rounded-full border border-ink/[0.08] bg-paper text-blue transition-all duration-300 group-hover:border-solar group-hover:bg-solar group-hover:text-ink">
                    <Icon
                      aria-hidden="true"
                      className="size-4"
                      strokeWidth={1.8}
                    />
                  </span>

                  <div className="min-w-0">
                    <p className="text-[8px] font-semibold uppercase leading-none tracking-[0.1em] text-ink/30">
                      {label}
                    </p>

                    <p className="mt-1.5 text-[11px] font-semibold leading-[1.45] text-ink/70">
                      {value}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </Container>
        </section>

        <VenueSection />
      </div>
    </>
  );
}