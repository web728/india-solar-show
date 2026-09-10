import type { Metadata } from "next";
import { PageHero } from "@/components/ui/PageHero";
import { VisitorProfile } from "@/components/VisitorProfile";

export const metadata: Metadata = {
  title: "Visitor Registration & Free Trade Pass | India Solar International Show 2026",
  description:
    "Register for a free visitor trade pass for India Solar International Show 2026 in Pune. Connect with 200+ solar PV manufacturers, BESS suppliers, and clean-tech innovators.",
  keywords: [
    "Solar Exhibition Pune Visitor Pass",
    "Free Visitor Registration Solar Expo 2026",
    "Solar Energy Trade Show India",
    "BESS Battery Storage Expo Pune",
    "Renewable Energy Buyers Meet India",
  ],
  alternates: {
    canonical: "https://indiasolarshow.com/visitors",
  },
  openGraph: {
    title: "Register as Visitor | India Solar International Show 2026 Pune",
    description:
      "Get free entry to Western India's premier B2B Solar, Energy Solar Show & E-Mobility Exhibition. Connect with top developers, EPCs, and suppliers.",
    url: "https://indiasolarshow.com/visitors",
    siteName: "India Solar International Show",
    images: [
      {
        url: "https://indiasolarshow.com/og-visitor.jpg",
        width: 1200,
        height: 630,
        alt: "Visitor Registration India Solar International Show 2026",
      },
    ],
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Free Visitor Trade Pass - India Solar Show 2026",
    description:
      "Explore latest Solar PV, Rooftop, and Battery Storage technologies in Pune. Get your visitor pass now.",
    images: ["https://indiasolarshow.com/og-visitor.jpg"],
  },
};

export default function VisitorPage() {
  // Schema.org Event JSON-LD for Search Engine Rich Snippets
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ExhibitionEvent",
    "name": "India Solar International Show 2026 - Visitor Expo",
    "description":
      "Explore cutting-edge solar PV technology, battery storage solutions, and network with leading renewable energy developers and suppliers in Pune.",
    "url": "https://indiasolarshow.com/visitors",
    "eventAttendanceMode": "https://schema.org/OfflineEventAttendanceMode",
    "eventStatus": "https://schema.org/EventScheduled",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "INR",
      "availability": "https://schema.org/InStock",
      "validFrom": "2026-01-01",
      "url": "https://indiasolarshow.com/visitors",
    },
    "location": {
      "@type": "Place",
      "name": "Auto Cluster Exhibition Centre",
      "address": {
        "@type": "PostalAddress",
        "addressLocality": "Pune",
        "addressRegion": "Maharashtra",
        "addressCountry": "IN",
      },
    },
    "organizer": {
      "@type": "Organization",
      "name": "India Solar Show Organizers",
      "url": "https://indiasolarshow.com",
    },
  };

  return (
    <>
      {/* Inject Structured Data for Google Rich Snippets */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <PageHero
        eyebrow="Visitor Pass Registration"
        title="Explore the Future of Solar, Storage & Clean Energy"
        subtitle="Discover cutting-edge technologies, connect with 200+ leading manufacturers & EPC developers, and unlock new B2B opportunities across the renewable energy value chain in Pune."
      />

      {/* Hidden H1 for SEO Crawler Focus */}
      <h1 className="sr-only">
        Visitor Trade Registration - India Solar International Show 2026 Pune Expo
      </h1>

      <VisitorProfile />
    </>
  );
}