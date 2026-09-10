import type { Metadata } from "next";
import { FileDown } from "lucide-react";
import { EVENT } from "@/data/siteData";
import { PageHero } from "@/components/ui/PageHero";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { AnimatedCard } from "@/components/ui/AnimatedCard";
import { Button } from "@/components/ui/Button";
import { ContactCards } from "@/components/ContactCards";
import { BrochureDownloadForm } from "@/components/forms/BrochureDownloadForm";

export const metadata: Metadata = {
  title: "Downloads",
  description:
    "Download the official event brochure, exhibitor manual, and other documents for the India Solar International Show 2026.",
};

const DOWNLOADS = [
  {
    title: "Event Brochure",
    desc: "Full event profile, market scope, exhibitor segments, visitor profile, show highlights, and participation benefits.",
    icon: FileDown,
    href: EVENT.brochurePath,
  },
];

export default function DownloadsPage() {
  return (
    <>
      <PageHero
        eyebrow="Downloads"
        title="Event Downloads & Resources"
        subtitle="Access the official event brochure, exhibitor manual, and other documents for the India Solar International Show 2026."
      />

      {/* Direct Downloads */}
      <section className="bg-white py-20 sm:py-28">
        <Container>
          <SectionHeading
            eyebrow="Resources"
            heading="Available Downloads"
            intro="Download event materials directly or request additional documents from our team."
            align="center"
          />
          <div className="mx-auto mt-14 grid max-w-3xl grid-cols-1 gap-5">
            {DOWNLOADS.map((item, i) => (
              <AnimatedCard key={item.title} delay={i * 0.08} tilt={false} className="flex items-center gap-5 p-6">
                <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-[color:var(--color-gold)]/15 text-[color:var(--color-gold)]">
                  <item.icon size={24} aria-hidden="true" />
                </span>
                <div className="flex-1">
                  <h3 className="text-base font-bold text-[color:var(--color-black)]">{item.title}</h3>
                  <p className="mt-1 text-sm leading-relaxed text-slate-500">{item.desc}</p>
                </div>
                <Button href={item.href} external size="sm" glow className="btn-shine shrink-0">
                  <FileDown size={16} aria-hidden="true" />
                  Download
                </Button>
              </AnimatedCard>
            ))}
          </div>
        </Container>
      </section>

      {/* Download Form */}
      <section className="bg-[color:var(--color-gray)] py-20 sm:py-28">
        <Container>
          <SectionHeading
            eyebrow="Request Materials"
            heading="Get Event Documents"
            intro="Submit your details and we will send you the complete set of event materials."
            align="center"
          />
          <div className="mt-14 grid grid-cols-1 gap-10 lg:grid-cols-[1.15fr_0.85fr]">
            <div className="relative overflow-hidden rounded-3xl border border-slate-200 bg-white p-6 shadow-lg sm:p-9">
              <span
                className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-[color:var(--color-gold)] via-[color:var(--color-gold-light)] to-transparent"
                aria-hidden="true"
              />
              <h2 className="text-2xl font-bold text-[color:var(--color-black)] mb-6">
                Request Event Materials
              </h2>
              <BrochureDownloadForm />
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
