import type { Metadata } from "next";
import { Award, Star, Lightbulb, Newspaper } from "lucide-react";
import { PageHero } from "@/components/ui/PageHero";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { AnimatedCard } from "@/components/ui/AnimatedCard";
import { ContactCards } from "@/components/ContactCards";
import { SponsorshipEnquiryForm } from "@/components/forms/SponsorshipEnquiryForm";

export const metadata: Metadata = {
  title: "Sponsorship & Partnership Opportunities | India Solar International Show 2026",
  description:
    "Become a strategic partner at the India Solar International Show 2026 in Pune. Explore Platinum, Gold, Innovation, and Media partnership tiers to showcase your brand to 5,000+ clean energy decision-makers.",
  keywords: [
    "Solar Show Sponsorship India",
    "Renewable Energy Partnerships Pune",
    "Solar Industry Media Partner",
    "Clean Energy Event Sponsors 2026",
    "BESS Battery Storage Trade Show Partner",
  ],
  alternates: {
    canonical: "https://indiasolarshow.com/sponsors",
  },
  openGraph: {
    title: "Sponsorship Opportunities - India Solar International Show 2026",
    description:
      "Position your brand in front of C-level executives, EPC developers, and policymakers. Partner with Western India's premier B2B solar expo.",
    url: "https://indiasolarshow.com/sponsors",
    siteName: "India Solar International Show",
    images: [
      {
        url: "https://indiasolarshow.com/og-sponsors.jpg",
        width: 1200,
        height: 630,
        alt: "Sponsorship Opportunities India Solar International Show 2026",
      },
    ],
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Sponsor India Solar International Show 2026",
    description:
      "Explore Platinum, Gold & Media partnership options to elevate your clean-tech brand in Pune.",
    images: ["https://indiasolarshow.com/og-sponsors.jpg"],
  },
};

const TIERS = [
  {
    icon: Award,
    label: "Platinum Partner",
    desc: "Maximum brand visibility with prime booth location, keynote speaking slots, logo placement on all materials, and exclusive networking events.",
  },
  {
    icon: Star,
    label: "Gold Partner",
    desc: "Prominent branding across event collaterals, dedicated exhibition space, panel participation, and targeted B2B meeting access.",
  },
  {
    icon: Lightbulb,
    label: "Innovation Partner",
    desc: "Sponsor the Innovation Awards, technology demonstrations, or startup showcase to align your brand with cutting-edge clean energy solutions.",
  },
  {
    icon: Newspaper,
    label: "Media Partner",
    desc: "Collaborate on event promotion, gain press access, conduct on-site interviews, and leverage co-branded content distribution.",
  },
];

const BENEFITS = [
  "Brand visibility across all event marketing and communications",
  "Logo placement on event website, backdrop, signage, and brochures",
  "Speaking and panel participation opportunities",
  "Dedicated exhibition or meeting space",
  "Direct access to 5,000+ qualified industry decision-makers",
  "Pre-event and post-event digital marketing reach",
  "VIP networking events and B2B matchmaking sessions",
  "Association with India's growing renewable energy ecosystem",
];

export default function SponsorsPage() {
  // Schema.org Structured Data for Search Engine Rich Snippets
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BusinessEvent",
    "name": "India Solar International Show 2026 - Sponsorship & Partnership",
    "description":
      "Strategic partnership opportunities for solar manufacturers, EPC developers, and clean-tech brands at Pune Expo.",
    "url": "https://indiasolarshow.com/sponsors",
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
      {/* Inject Structured Data for Search Engines */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <PageHero
        eyebrow="Partnership &amp; Sponsorship"
        title="Become a Strategic Partner in India's Clean Energy Growth Story"
        subtitle="Position your brand in front of renewable energy developers, EPC companies, utilities, investors, policymakers, industrial buyers, technology providers, and emerging clean-energy innovators."
      />

      {/* Hidden H1 Heading for Crawler Hierarchy */}
      <h1 className="sr-only">
        Sponsorship &amp; Brand Partnership Packages - India Solar International Show 2026
      </h1>

      {/* Sponsorship Tiers */}
      <section className="relative overflow-hidden bg-[color:var(--color-black)] py-24 sm:py-32">
        <div className="absolute inset-0 bg-solar-grid opacity-[0.08]" aria-hidden="true" />
        <div
          className="absolute left-1/2 top-0 h-[420px] w-[720px] -translate-x-1/2 rounded-full radial-glow-gold animate-flare-pulse opacity-70"
          aria-hidden="true"
        />
        <Container className="relative">
          <SectionHeading
            eyebrow="Sponsorship Tiers"
            heading="Choose Your Partnership Level"
            intro="From Platinum to Media partnerships, each tier offers strategic visibility and direct access to India's renewable energy ecosystem."
            tone="light"
            align="center"
          />
          <div className="mt-14 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {TIERS.map(({ icon: TierIcon, label, desc }, i) => (
              <AnimatedCard key={label} tone="dark" delay={i * 0.08} className="flex flex-col p-6">
                <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[color:var(--color-gold)]/15 text-[color:var(--color-gold)] transition-transform duration-300 group-hover:-translate-y-1">
                  <TierIcon size={24} aria-hidden="true" />
                </span>
                <h3 className="mt-5 text-lg font-bold text-white">{label}</h3>
                <p className="mt-2 flex-1 text-sm leading-relaxed text-white/60">{desc}</p>
              </AnimatedCard>
            ))}
          </div>
        </Container>
      </section>

      {/* Benefits */}
      <section className="bg-white py-20 sm:py-28">
        <Container>
          <SectionHeading
            eyebrow="Why Sponsor"
            heading="Sponsorship Benefits"
            intro="Strategic sponsorship at the India Solar International Show delivers measurable impact and ROI for your brand."
            align="center"
          />
          <ul className="mx-auto mt-12 grid max-w-4xl grid-cols-1 gap-4 sm:grid-cols-2">
            {BENEFITS.map((benefit) => (
              <li key={benefit} className="flex items-start gap-3 rounded-xl border border-slate-100 bg-slate-50 p-4">
                <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[color:var(--color-gold)]/15 text-[color:var(--color-gold)]">
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
                    <path d="M2 7l3.5 3.5L12 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </span>
                <span className="text-sm leading-relaxed text-slate-700">{benefit}</span>
              </li>
            ))}
          </ul>
        </Container>
      </section>

      {/* Enquiry Form */}
      <section className="bg-[color:var(--color-gray)] py-20 sm:py-28">
        <Container>
          <SectionHeading
            eyebrow="Get Started"
            heading="Sponsorship Enquiry"
            intro="Interested in sponsoring the India Solar International Show? Submit your enquiry and our partnership team will reach out with customized options."
            align="center"
          />
          <div className="mt-14 grid grid-cols-1 gap-10 lg:grid-cols-[1.15fr_0.85fr]">
            <div className="relative overflow-hidden rounded-3xl border border-slate-200 bg-white p-6 shadow-lg sm:p-9">
              <span
                className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-[color:var(--color-gold)] via-[color:var(--color-gold-light)] to-transparent"
                aria-hidden="true"
              />
              <h2 className="text-2xl font-bold text-[color:var(--color-black)] mb-6">
                Sponsorship Enquiry Form
              </h2>
              <SponsorshipEnquiryForm />
            </div>
            <div className="flex flex-col gap-4">
              <ContactCards />
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}