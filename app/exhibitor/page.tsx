import type { Metadata } from "next";
import { PageHero } from "@/components/ui/PageHero";
import { ExhibitorProfile } from "@/components/ExhibitorProfile";
import { WhyParticipate } from "@/components/WhyParticipate";

export const metadata: Metadata = {
  title: "Exhibit at India Solar International Show 2026 | Solar & BESS Expo Pune",
  description:
    "Book your stall at India Solar International Show 2026 in Pune. Showcase your solar PV, battery energy storage (BESS), and green energy solutions to 10,000+ qualified buyers, EPCs, and investors.",
  keywords: [
    "Exhibit Solar India 2026",
    "Solar Exhibition Pune Stall Booking",
    "Solar PV Manufacturer Trade Show",
    "BESS Energy Storage Expo India",
    "Renewable Energy Trade Show Pune",
    "Solar B2B Expo Stall Registration",
  ],
  alternates: {
    canonical: "https://indiasolarshow.com/exhibitors",
  },
  openGraph: {
    title: "Exhibit at India Solar International Show 2026 | Pune, India",
    description:
      "Showcase your solar & energy storage technologies to leading developers, EPCs, utilities, and industrial buyers in Pune.",
    url: "https://indiasolarshow.com/exhibitors",
    siteName: "India Solar International Show",
    images: [
      {
        url: "https://indiasolarshow.com/og-exhibitor.jpg",
        width: 1200,
        height: 630,
        alt: "Exhibit at India Solar International Show 2026 Pune",
      },
    ],
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Exhibit at India Solar International Show 2026",
    description:
      "Connect with 10,000+ solar industry decision-makers in Pune. Book your exhibitor booth today.",
    images: ["https://indiasolarshow.com/og-exhibitor.jpg"],
  },
};

export default function ExhibitorPage() {
  // Event Schema JSON-LD for Search Engines Rich Snippets
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BusinessEvent",
    "name": "India Solar International Show 2026 - Exhibitor Opportunities",
    "description":
      "India's leading B2B trade exhibition for solar PV manufacturing, battery energy storage systems (BESS), and renewable energy technology.",
    "url": "https://indiasolarshow.com/exhibitors",
    "eventAttendanceMode": "https://schema.org/OfflineEventAttendanceMode",
    "eventStatus": "https://schema.org/EventScheduled",
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
      "name": "India Solar Show Team",
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
        eyebrow="Exhibitor Registration 2026"
        title="Showcase Your Innovations to India's Solar & Storage Market"
        subtitle="Connect face-to-face with top-tier solar developers, EPC contractors, utilities, industrial energy buyers, and investors at India's premier clean-tech exhibition in Pune."
      />
      
      {/* Hidden H1 for SEO Crawler Priority */}
      <h1 className="sr-only">
        Exhibit at India Solar International Show 2026 Pune - B2B Solar &amp; Battery Storage Trade Fair
      </h1>

      <ExhibitorProfile />
      <WhyParticipate />
    </>
  );
}