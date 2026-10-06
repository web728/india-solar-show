import type { Metadata } from "next";
import { PageHero } from "@/components/ui/PageHero";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { AnimatedCard } from "@/components/ui/AnimatedCard";
import { Icon } from "@/components/ui/Icon";
import { ContactCards } from "@/components/ContactCards";
import { MediaPartnerForm } from "@/components/forms/MediaPartnerForm";

export const metadata: Metadata = {
  title: "Media Partners",
  description:
    "Become a media partner of the India International Solar Show 2026. Collaborate on content, gain press access, conduct interviews, and co-brand with India's premier solar and renewable energy exhibition.",
};

const MEDIA_BENEFITS = [
  {
    title: "Press Access & Coverage",
    desc: "Full press accreditation with priority access to all exhibition areas, conference sessions, and exclusive networking events.",
    icon: "Newspaper",
  },
  {
    title: "On-Site Interviews",
    desc: "Conduct interviews with exhibitors, speakers, policymakers, and industry leaders at a dedicated media lounge.",
    icon: "Mic",
  },
  {
    title: "Co-Branded Content",
    desc: "Collaborate on pre-event and post-event content — articles, newsletters, social media campaigns, and video coverage.",
    icon: "FileText",
  },
  {
    title: "Logo & Brand Placement",
    desc: "Your logo featured on the event website, marketing collaterals, signage, and digital communications.",
    icon: "Eye",
  },
  {
    title: "Audience Reach",
    desc: "Access to an engaged database of 5,000+ renewable energy professionals, decision-makers, and industry stakeholders.",
    icon: "Users",
  },
  {
    title: "Digital & Social Amplification",
    desc: "Cross-promotion across event social media channels, email campaigns, and partner networks.",
    icon: "Share2",
  },
];

export default function MediaPartnersPage() {
  return (
    <>
      <PageHero
        eyebrow="Media Partnership"
        title="Partner with India's Premier Solar & Storage Exhibition"
        subtitle="Collaborate with the India International Solar Show to deliver impactful content, gain exclusive access, and reach the renewable energy industry's most engaged audience."
      />

      {/* Benefits */}
      <section className="bg-white py-20 sm:py-28">
        <Container>
          <SectionHeading
            eyebrow="Why Partner"
            heading="Media Partnership Benefits"
            intro="Join us as a media partner and leverage the India International Solar Show's platform to amplify your brand and content reach."
            align="center"
          />
          <div className="mt-14 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {MEDIA_BENEFITS.map((item, i) => (
              <AnimatedCard key={item.title} delay={i * 0.08} className="p-6">
                <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-[color:var(--color-gold)]/20 to-[color:var(--color-gold)]/5 text-[color:var(--color-gold)] transition-transform duration-300 group-hover:-translate-y-1">
                  <Icon name={item.icon} size={24} aria-hidden="true" />
                </span>
                <h3 className="mt-5 text-base font-bold text-[color:var(--color-black)]">
                  {item.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-500">
                  {item.desc}
                </p>
              </AnimatedCard>
            ))}
          </div>
        </Container>
      </section>

      {/* Enquiry Form */}
      <section className="bg-[color:var(--color-gray)] py-20 sm:py-28">
        <Container>
          <SectionHeading
            eyebrow="Get Started"
            heading="Media Partner Enquiry"
            intro="Fill out the form and our team will share the complete media partnership package with collaboration opportunities."
            align="center"
          />
          <div className="mt-14 grid grid-cols-1 gap-10 lg:grid-cols-[1.15fr_0.85fr]">
            <div className="relative overflow-hidden rounded-3xl border border-slate-200 bg-white p-6 shadow-lg sm:p-9">
              <span
                className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-[color:var(--color-gold)] via-[color:var(--color-gold-light)] to-transparent"
                aria-hidden="true"
              />
              <h2 className="text-2xl font-bold text-[color:var(--color-black)] mb-6">
                Media Partner Enquiry Form
              </h2>
              <MediaPartnerForm />
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
