import type { Metadata } from "next";
import { PageHero } from "@/components/ui/PageHero";
import { VenueSection } from "@/components/VenueSection";

export const metadata: Metadata = {
  title: "Venue & Directions | Auto Cluster Exhibition Centre Pune | India Solar Show 2026",
  description:
    "Find venue details, location maps, and travel directions for India Solar International Show 2026 at Auto Cluster Exhibition Centre, Chinchwad, Pimpri-Chinchwad, Pune.",
  keywords: [
    "Auto Cluster Exhibition Centre Pune",
    "India Solar Show Venue",
    "Pimpri Chinchwad Exhibition Hall",
    "Solar Expo Location Pune",
    "Directions to Auto Cluster Chinchwad",
  ],
  alternates: {
    canonical: "https://indiasolarshow.com/venue",
  },
  openGraph: {
    title: "Venue & Directions - Auto Cluster Exhibition Centre, Pune",
    description:
      "Explore the venue details, route directions, and nearby transit options for the India Solar International Show 2026 in Pune.",
    url: "https://indiasolarshow.com/venue",
    siteName: "India Solar International Show",
    images: [
      {
        url: "https://indiasolarshow.com/og-venue.jpg",
        width: 1200,
        height: 630,
        alt: "Auto Cluster Exhibition Centre Pune Venue",
      },
    ],
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Venue & Location - India Solar Show 2026 Pune",
    description:
      "Auto Cluster Exhibition Centre, Chinchwad, Pune. View route maps and venue info.",
    images: ["https://indiasolarshow.com/og-venue.jpg"],
  },
};

export default function VenuePage() {
  // Local SEO Schema for Event Venue / Place
  const venueJsonLd = {
    "@context": "https://schema.org",
    "@type": "Place",
    "name": "Auto Cluster Exhibition Centre",
    "description": "Premier exhibition and convention venue located in Pune's industrial hub.",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "H-Block, Plot No. C-181, Chinchwad",
      "addressLocality": "Pimpri-Chinchwad",
      "addressRegion": "Maharashtra",
      "postalCode": "411019",
      "addressCountry": "IN",
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": "18.6401",
      "longitude": "73.8055",
    },
    "hasMap": "https://maps.google.com/?q=Auto+Cluster+Exhibition+Centre+Pune",
  };

  return (
    <>
      {/* Inject Structured Data for Google Local Search & Maps */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(venueJsonLd) }}
      />

      <PageHero
        eyebrow="Exhibition Venue"
        title="Auto Cluster Exhibition Centre, Pune"
        subtitle="A state-of-the-art exhibition venue within Pune's primary industrial belt, seamless connection to major highway corridors, airport, and railway networks."
      />

      {/* Hidden Heading for Semantic Heading Hierarchy */}
      <h1 className="sr-only">
        Venue Location &amp; Travel Directions - Auto Cluster Exhibition Centre Pune
      </h1>

      <VenueSection />
    </>
  );
}