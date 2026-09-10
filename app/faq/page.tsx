import type { Metadata } from "next";
import { PageHero } from "@/components/ui/PageHero";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { FAQ_ITEMS } from "@/data/siteData";
import { FAQAccordion } from "./FAQAccordion";

export const metadata: Metadata = {
  title: "Frequently Asked Questions",
  description:
    "Find answers to common questions about the India Solar International Show 2026 — registration, exhibition, conference, sponsorship, venue, and more.",
};

export default function FAQPage() {
  return (
    <>
      <PageHero
        eyebrow="FAQ"
        title="Frequently Asked Questions"
        subtitle="Find answers to the most common questions about the India Solar International Show 2026."
      />

      <section className="bg-white py-20 sm:py-28">
        <Container>
          <SectionHeading
            eyebrow="Questions & Answers"
            heading="Everything You Need to Know"
            intro="Can't find the answer you're looking for? Contact our team directly."
            align="center"
          />
          <div className="mx-auto mt-14 max-w-3xl">
            <FAQAccordion items={FAQ_ITEMS as unknown as { question: string; answer: string }[]} />
          </div>
        </Container>
      </section>
    </>
  );
}
