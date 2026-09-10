import type { Metadata } from "next";
import { PageHero } from "@/components/ui/PageHero";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ExhibitorRegistrationForm } from "@/components/forms/ExhibitorRegistrationForm";

export const metadata: Metadata = {
  title: "Exhibitor Registration",
  description:
    "Register your interest to exhibit at the India Solar International Show 2026 in Pune, India. Fill out the exhibitor registration form and our team will connect with you.",
};

export default function ExhibitorRegistrationPage() {
  return (
    <>
      <PageHero
        eyebrow="Register Your Interest"
        title="Exhibitor Registration"
        subtitle="Fill out the form below and our team will get in touch with stall options, pricing, and floor plan details."
      />

      <section className="bg-white py-20 sm:py-28">
        <Container>
          <SectionHeading
            eyebrow="Register Your Interest"
            heading="Exhibitor Registration"
            intro="Fill out the form below and our team will get in touch with stall options, pricing, and floor plan details."
            align="center"
          />
          <div className="mx-auto mt-14 max-w-3xl">
            <div className="relative overflow-hidden rounded-3xl border border-slate-200 bg-[color:var(--color-gray)]/50 p-6 shadow-lg sm:p-10">
              <span
                className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-[color:var(--color-gold)] via-[color:var(--color-gold-light)] to-transparent"
                aria-hidden="true"
              />
              <h2 className="text-2xl font-bold text-[color:var(--color-black)] mb-6">
                Exhibitor Registration Form
              </h2>
              <ExhibitorRegistrationForm />
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}