import type { Metadata } from "next";
import { HeroSection } from "@/components/HeroSection";
import { EventSnapshot } from "@/components/EventSnapshot";
import { AboutSection } from "@/components/AboutSection";
import { ShowHighlights } from "@/components/ShowHighlights";
import { WhyParticipate } from "@/components/WhyParticipate";
import { EcosystemSection } from "@/components/EcosystemSection";
import { VenueSection } from "@/components/VenueSection";
import { BrochureCTA } from "@/components/BrochureCTA";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Button } from "@/components/ui/Button";
import { AnimatedCard } from "@/components/ui/AnimatedCard";
import { Icon } from "@/components/ui/Icon";

export const metadata: Metadata = {
  title: "India Solar International Show 2026 | Premier Solar Show in India",
  description:
    "India Solar International Show 2026 is India's leading solar energy & battery storage exhibition in Pune. Meet top B2B solar technology buyers, EPC contractors & manufacturers.",
  keywords: [
    "solar show in india",
    "solar exhibition pune",
    "India Solar International Show 2026",
    "renewable energy expo india",
    "solar energy trade show",
    "battery storage exhibition india"
  ],
  alternates: {
    canonical: "https://indiasolarshow.com",
  },
};

const CTA_LINKS = [
  {
    title: "Exhibit at the Show",
    desc: "Showcase your solar PV, battery storage, and renewable energy solutions to qualified B2B buyers and industry leaders at India's top solar expo.",
    href: "https://indiasolarshow.com/exhibitor",
    btnLabel: "Exhibitor Info",
    icon: "LayoutGrid",
  },
  {
    title: "Visit the Show",
    desc: "Explore cutting-edge solar technologies, network with renewable energy pioneers, and discover new B2B business opportunities.",
    href: "https://indiasolarshow.com/visitor",
    btnLabel: "Visitor Info",
    icon: "Users",
  },
  {
    title: "Become a Sponsor",
    desc: "Position your brand at the forefront of India's clean energy growth story at the premier solar exhibition in Pune.",
    href: "/sponsors",
    btnLabel: "Sponsorship Options",
    icon: "Award",
  },
];

export default function Home() {
  return (
    <>
      <HeroSection />
      <EventSnapshot />
      <AboutSection />
      <ShowHighlights />

      {/* Participate CTA Section */}
      <section className="relative overflow-hidden bg-[color:var(--color-black)] py-24 sm:py-32">
        <div className="absolute inset-0 bg-solar-grid opacity-[0.08]" aria-hidden="true" />
        <div
          className="absolute -top-32 right-[-10%] h-[400px] w-[400px] rounded-full radial-glow-gold animate-flare-pulse"
          aria-hidden="true"
        />
        <Container className="relative">
          <SectionHeading
            eyebrow="Participate"
            heading="Be Part of India's Premier Solar Industry Show 2026"
            intro="Whether you are an exhibitor, visitor, B2B delegate, or sponsor — connect with the clean energy ecosystem at the India Solar International Show in Pune."
            tone="light"
            align="center"
          />
          <div className="mt-14 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {CTA_LINKS.map((item, i) => (
              <AnimatedCard key={item.title} tone="dark" delay={i * 0.08} className="flex flex-col p-6">
                <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[color:var(--color-gold)]/15 text-[color:var(--color-gold)] transition-transform duration-300 group-hover:-translate-y-1">
                  <Icon name={item.icon} size={24} aria-hidden="true" />
                </span>
                <h3 className="mt-5 text-lg font-bold text-white">{item.title}</h3>
                <p className="mt-2 flex-1 text-sm leading-relaxed text-white/60">{item.desc}</p>
                <div className="mt-5">
                  <Button href={item.href} size="sm">
                    {item.btnLabel}
                  </Button>
                </div>
              </AnimatedCard>
            ))}
          </div>
        </Container>
      </section>

      <WhyParticipate />
      <EcosystemSection />
      <VenueSection />
      <BrochureCTA />

      {/* Contact CTA Section */}
      <section className="relative overflow-hidden bg-white py-20 sm:py-28">
        <div className="absolute inset-0 bg-dot-grid opacity-30" aria-hidden="true" />
        <Container className="relative text-center">
          <SectionHeading
            eyebrow="Get in Touch"
            heading="Have Questions About India's Top Solar Exhibition?"
            intro="Reach out to our team for stall bookings, visitor registrations, sponsorship enquiries, or venue details for India Solar International Show 2026."
            align="center"
          />
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Button href="/contact" size="lg" glow className="btn-shine">
              Contact Us
            </Button>
            <Button href="/faq" variant="ghost" size="lg">
              View FAQ
            </Button>
          </div>
        </Container>
      </section>
    </>
  );
}