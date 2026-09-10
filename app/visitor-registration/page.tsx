import type { Metadata } from "next";
import { PageHero } from "@/components/ui/PageHero";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { VisitorRegistrationForm } from "@/components/forms/VisitorRegistrationForm";

export const metadata: Metadata = {
  title: "Visitor Registration",
  description:
    "Pre-register as a visitor for the India Solar International Show 2026 in Pune, India. Get updates, early-bird offers, and priority access.",
};

export default function VisitorRegistrationPage() {
  return (
    <>
      <PageHero
        eyebrow="Register Your Interest"
        title="Visitor Registration"
        subtitle="Pre-register for the show to receive updates, early-bird offers, and priority access."
      />

      <section className="bg-white py-20 sm:py-28">
        <Container>
          <SectionHeading
            eyebrow="Register Your Interest"
            heading="Visitor Registration"
            intro="Pre-register for the show to receive updates, early-bird offers, and priority access."
            align="center"
          />
          <div className="mx-auto mt-14 max-w-3xl">
            <div className="relative overflow-hidden rounded-3xl border border-slate-200 bg-[color:var(--color-gray)]/50 p-6 shadow-lg sm:p-10">
              <span
                className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-[color:var(--color-gold)] via-[color:var(--color-gold-light)] to-transparent"
                aria-hidden="true"
              />
              <h2 className="text-2xl font-bold text-[color:var(--color-black)] mb-6">
                Visitor Registration Form
              </h2>
              <VisitorRegistrationForm />
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}