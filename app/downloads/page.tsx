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
    "Download the official event brochure and event resources for India International Solar Show 2026.",
};

const DOWNLOADS = [
  {
    title: "Event Brochure",
    desc: "Full event profile, market scope, exhibitor segments, visitor profile, show highlights and participation benefits.",
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
        subtitle="Access official event materials for India International Solar Show 2026."
      />

      <section className="bg-white py-12 sm:py-14 lg:py-16">
        <Container>
          <SectionHeading
            eyebrow="Resources"
            heading="Available Downloads"
            intro="Download event materials directly or request additional documents from our team."
            align="center"
          />

          <div className="mx-auto mt-8 grid max-w-3xl grid-cols-1 gap-4">
            {DOWNLOADS.map((item, i) => (
              <AnimatedCard
                key={item.title}
                delay={i * 0.08}
                tilt={false}
                className="flex flex-col gap-4 p-5 sm:flex-row sm:items-center"
              >
                <span className="flex size-12 shrink-0 items-center justify-center rounded-xl bg-solar/10 text-solar">
                  <item.icon size={21} aria-hidden="true" />
                </span>

                <div className="min-w-0 flex-1">
                  <h3 className="font-display text-[15px] font-semibold leading-tight text-ink">
                    {item.title}
                  </h3>

                  <p className="mt-1.5 text-[12px] leading-5 text-ink/50">
                    {item.desc}
                  </p>
                </div>

                <Button
                  href={item.href}
                  external
                  size="sm"
                  className="shrink-0 gap-2 shadow-[0_8px_24px_rgba(251,178,22,0.18)]"
                >
                  <FileDown size={15} aria-hidden="true" />
                  Download
                </Button>
              </AnimatedCard>
            ))}
          </div>
        </Container>
      </section>

      <section className="bg-paper py-12 sm:py-14 lg:py-16">
        <Container>
          <SectionHeading
            eyebrow="Request Materials"
            heading="Get Event Documents"
            intro="Submit your details and our team will share the relevant event materials with you."
            align="center"
          />

          <div className="mt-8 grid grid-cols-1 items-start gap-6 lg:grid-cols-[1.15fr_0.85fr]">
            <div className="relative overflow-hidden rounded-[24px] border border-ink/[0.075] bg-white p-4 shadow-[0_18px_55px_rgba(9,25,31,0.05)] sm:p-5">
              <span
                aria-hidden="true"
                className="absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-transparent via-solar to-transparent"
              />

              <BrochureDownloadForm />
            </div>

            <ContactCards />
          </div>
        </Container>
      </section>
    </>
  );
}