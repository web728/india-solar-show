import type { Metadata } from "next";

import { EVENT } from "@/data/siteData";

import { HeroSection } from "@/components/HeroSection";
import { StatsSection } from "@/components/StatsSection";
import { EventSnapshot } from "@/components/EventSnapshot";
import { AboutSection } from "@/components/AboutSection";
import { ShowHighlights } from "@/components/ShowHighlights";
import { CoLocatedShows } from "@/components/co-located-shows";
import { EcosystemSection } from "@/components/EcosystemSection";
import { ParticipationSection } from "@/components/ParticipationSection";
import { WhyParticipate } from "@/components/WhyParticipate";
import { VenueSection } from "@/components/VenueSection";
import { BrochureCTA } from "@/components/BrochureCTA";
import { FinalCTA } from "@/components/FinalCTA";

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") ||
  "https://www.indiasolarshow.com";

const SITE_NAME = "India International Solar Show";

const HOME_TITLE =
  "India International Solar Show 2026 | Solar Expo Pune";

const HOME_DESCRIPTION =
  "India International Solar Show 2026 takes place 2–4 October in Pune, bringing together solar manufacturers, energy storage companies, EPC firms, technology providers, buyers, developers, investors and clean-energy professionals.";

export const metadata: Metadata = {
  title: HOME_TITLE,
  description: HOME_DESCRIPTION,

  keywords: [
    "India International Solar Show",
    "India International Solar Show 2026",
    "India Solar Show",
    "Solar Expo Pune",
    "Solar Exhibition Pune",
    "Solar Exhibition India",
    "Solar Energy Expo India",
    "Solar Trade Show India",
    "Energy Storage Exhibition",
    "Renewable Energy Expo India",
    "Clean Energy Expo",
    "Solar Manufacturers India",
    "Solar EPC Exhibition",
    "Solar Technology Expo",
    "Solar Conference India",
  ],

  alternates: {
    canonical: "/",
  },

  openGraph: {
    type: "website",
    locale: "en_IN",
    url: SITE_URL,
    siteName: SITE_NAME,
    title: HOME_TITLE,
    description: HOME_DESCRIPTION,
    images: [
      {
        url: "/opengraph-image.png",
        width: 1200,
        height: 630,
        alt: `${SITE_NAME} 2026 — Solar Expo Pune`,
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: HOME_TITLE,
    description: HOME_DESCRIPTION,
    images: ["/opengraph-image.png"],
  },
};

function safeJsonLd(data: unknown) {
  return JSON.stringify(data).replace(/</g, "\\u003c");
}

function EventJsonLd() {
  const organizationId = `${SITE_URL}/#organization`;
  const eventId = `${SITE_URL}/#event`;

  const eventSchema = {
    "@context": "https://schema.org",
    "@type": "Event",
    "@id": eventId,

    name: "India International Solar Show 2026",

    alternateName: [
      "India Solar Show 2026",
      "India International Solar Expo 2026",
    ],

    description: HOME_DESCRIPTION,

    url: SITE_URL,

    startDate: EVENT.dates.start,
    endDate: EVENT.dates.end,

    eventStatus:
      "https://schema.org/EventScheduled",

    eventAttendanceMode:
      "https://schema.org/OfflineEventAttendanceMode",

    image: [
      `${SITE_URL}/opengraph-image.png`,
    ],

    location: {
      "@type": "Place",

      name: EVENT.venue.name,

      address: {
        "@type": "PostalAddress",

        streetAddress: EVENT.venue.line,
        addressLocality: EVENT.venue.city,
        addressRegion: EVENT.venue.state,
        addressCountry: "IN",
      },
    },

    organizer: {
      "@type": "Organization",
      "@id": organizationId,
      name: EVENT.organizer.fullName,
      url: SITE_URL,
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: safeJsonLd(eventSchema),
      }}
    />
  );
}

function HomeBreadcrumbJsonLd() {
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",

    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "India International Solar Show",
        item: SITE_URL,
      },
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: safeJsonLd(breadcrumbSchema),
      }}
    />
  );
}

export default function HomePage() {
  return (
    <>
      <EventJsonLd />
      <HomeBreadcrumbJsonLd />

      <HeroSection />
      <StatsSection />
      <EventSnapshot />
      <AboutSection />
      <ShowHighlights />
      <CoLocatedShows />
      <EcosystemSection />
      <ParticipationSection />
      <WhyParticipate />
      <VenueSection />
      <BrochureCTA />
      <FinalCTA />
    </>
  );
}