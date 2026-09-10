import type { Metadata } from "next";
import { PageHero } from "@/components/ui/PageHero";
import { AboutSection } from "@/components/AboutSection";
import { IndiaMarketSection, PuneMarketSection } from "@/components/MarketScopeSection";
import { ValueChainSection } from "@/components/ValueChainSection";
import { EcosystemSection } from "@/components/EcosystemSection";

export const metadata: Metadata = {
  title: "About India Solar International Show 2026 | Premier B2B Solar Expo Pune",
  description:
    "Discover India Solar International Show 2026 — India's premier B2B solar energy exhibition & conference in Pune. Connect with solar PV manufacturers, EPC contractors, battery storage, and clean-tech leaders.",
  keywords: [
    "India Solar International Show 2026",
    "Solar Exhibition Pune",
    "B2B Solar Trade Fair India",
    "Renewable Energy Expo Pune",
    "Solar PV Manufacturer Trade Show",
    "Battery Storage Exhibition India",
  ],
  alternates: {
    canonical: "https://indiasolarshow.com/about",
  },
  openGraph: {
    title: "About India Solar International Show 2026 | Solar Expo Pune",
    description:
      "India's leading B2B exhibition & conference for solar PV, energy storage, microgrids, and clean mobility in Pune, Maharashtra.",
    url: "https://indiasolarshow.com/about",
    siteName: "India Solar International Show",
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "About India Solar International Show 2026 | B2B Solar Expo",
    description:
      "Join top solar manufacturers, EPCs, and energy storage innovators at Pune's premier renewable energy marketplace.",
  },
};

export default function AboutPage() {
  // Structured Data (JSON-LD) for Search Engine Rich Snippets
  const eventJsonLd = {
    "@context": "https://schema.org",
    "@type": "ExhibitionEvent",
    name: "India Solar International Show 2026",
    description:
      "Premier B2B solar energy exhibition and conference bringing together manufacturers, developers, EPC contractors, and policymakers in Pune, India.",
    startDate: "2026-10-15",
    endDate: "2026-10-17",
    eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
    eventStatus: "https://schema.org/EventScheduled",
    location: {
      "@type": "Place",
      name: "Pune Exhibition Centre",
      address: {
        "@type": "PostalAddress",
        addressLocality: "Pune",
        addressRegion: "Maharashtra",
        addressCountry: "IN",
      },
    },
    organizer: {
      "@type": "Organization",
      name: "India Solar International Show",
      url: "https://indiasolarshow.com",
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(eventJsonLd) }}
      />
      <PageHero
        eyebrow="About the Show"
        title="India's Premier Solar & Renewable Energy Exhibition in Pune"
        subtitle="The 1st Edition of India Solar International Show brings together PV manufacturers, EPC developers, investors, policymakers, and B2B buyers across the solar value chain."
      />
      <AboutSection />
      <IndiaMarketSection />
      <PuneMarketSection />
      <ValueChainSection />
      <EcosystemSection />
    </>
  );
}