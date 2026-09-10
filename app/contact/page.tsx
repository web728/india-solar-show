import type { Metadata } from "next";
import { PageHero } from "@/components/ui/PageHero";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ContactCards } from "@/components/ContactCards";
import { ContactForm } from "@/components/forms/ContactForm";

export const metadata: Metadata = {
  title: "Contact Us",
  description:
    "Get in touch with the India Solar International Show 2026 team for exhibitor bookings, visitor registration, sponsorship enquiries, or general questions.",
};

export default function ContactPage() {
  return (
    <>
      <PageHero
        eyebrow="Contact Us"
        title="Connect with the Event Team"
        subtitle="Have questions about exhibiting, visiting, sponsoring, or partnering? Our team is here to help."
      />

      <section className="bg-white py-20 sm:py-28">
        <Container>
          <SectionHeading
            eyebrow="Get in Touch"
            heading="Send Us a Message"
            intro="Tell us what you're looking for and our team will get back to you with the right information."
            align="center"
          />
          <div className="mt-14 grid grid-cols-1 gap-10 lg:grid-cols-[1.15fr_0.85fr]">
            <div className="relative overflow-hidden rounded-3xl border border-slate-200 bg-[color:var(--color-gray)]/50 p-6 shadow-lg sm:p-9">
              <span
                className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-[color:var(--color-gold)] via-[color:var(--color-gold-light)] to-transparent"
                aria-hidden="true"
              />
              <ContactForm />
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
