import type { Metadata } from "next";
import { EVENT } from "@/data/siteData";
import { PageHero } from "@/components/ui/PageHero";
import { Container } from "@/components/ui/Container";

export const metadata: Metadata = {
  title: "Terms & Conditions",
  description: `Terms and conditions for the ${EVENT.nameWithYear} website and event registration. Read about participation rules, cancellation policies, and liability terms.`,
};

export default function TermsConditionsPage() {
  return (
    <>
      <PageHero
        eyebrow="Legal"
        title="Terms & Conditions"
        subtitle={`Last updated: July 2025`}
      />

      <section className="bg-white py-16 sm:py-24">
        <Container>
          <div className="prose prose-slate mx-auto max-w-3xl prose-headings:font-extrabold prose-headings:text-[color:var(--color-black)] prose-a:text-[color:var(--color-gold)] prose-a:no-underline hover:prose-a:underline">
            <h2>1. General</h2>
            <p>
              These Terms and Conditions (&quot;Terms&quot;) govern your use of the {EVENT.nameWithYear}{" "}
              website at {EVENT.website} (the &quot;Site&quot;) and your participation in the event
              organized by {EVENT.organizer.fullName} (&quot;Organizer,&quot; &quot;we,&quot;
              &quot;us,&quot; or &quot;our&quot;). By accessing the Site or registering for the event,
              you agree to be bound by these Terms.
            </p>

            <h2>2. Event Participation</h2>
            <h3>Exhibitors</h3>
            <p>
              Exhibitor participation is subject to confirmation and acceptance by the Organizer.
              Stall allocation, pricing, and terms of participation will be communicated upon
              registration and are subject to the Exhibitor Agreement provided separately.
            </p>
            <h3>Visitors</h3>
            <p>
              Visitor registration may be subject to eligibility criteria determined by the
              Organizer. Pre-registration is recommended, and entry may be restricted based on
              capacity or security considerations.
            </p>

            <h2>3. Registration and Fees</h2>
            <ul>
              <li>
                All registrations are subject to confirmation by the Organizer and acceptance of the
                applicable terms.
              </li>
              <li>
                Payment terms, deadlines, and refund policies for exhibitors and delegates will be
                communicated in the respective registration confirmation or agreement.
              </li>
              <li>
                The Organizer reserves the right to modify pricing, registration categories, or
                terms at any time prior to the event.
              </li>
            </ul>

            <h2>4. Cancellation and Refunds</h2>
            <p>
              Cancellation and refund terms vary by registration type and will be specified in the
              applicable agreement or confirmation communication. In general:
            </p>
            <ul>
              <li>
                Cancellations made more than 90 days before the event may be eligible for a partial
                refund, subject to processing fees.
              </li>
              <li>
                Cancellations within 90 days of the event may not be eligible for any refund.
              </li>
              <li>
                The Organizer reserves the right to cancel or reschedule the event due to
                unforeseen circumstances, force majeure, or insufficient participation.
              </li>
            </ul>

            <h2>5. Intellectual Property</h2>
            <p>
              All content on the Site, including text, graphics, logos, images, and software, is the
              property of the Organizer or its licensors and is protected by applicable intellectual
              property laws. You may not reproduce, distribute, modify, or create derivative works
              from any content on the Site without prior written permission.
            </p>

            <h2>6. Exhibitor and Sponsor Responsibilities</h2>
            <ul>
              <li>
                Exhibitors are responsible for the setup, operation, and breakdown of their
                exhibition stands in accordance with guidelines provided by the Organizer.
              </li>
              <li>
                All exhibits, displays, and marketing materials must comply with applicable laws,
                regulations, and the event&apos;s code of conduct.
              </li>
              <li>
                Exhibitors and sponsors are solely responsible for the accuracy of information they
                present at the event.
              </li>
            </ul>

            <h2>7. Limitation of Liability</h2>
            <p>
              To the maximum extent permitted by law, the Organizer shall not be liable for any
              direct, indirect, incidental, special, or consequential damages arising from:
            </p>
            <ul>
              <li>Your participation in or inability to participate in the event</li>
              <li>Any loss or damage to property brought to the venue</li>
              <li>Any personal injury occurring at the venue</li>
              <li>Business losses, lost profits, or missed opportunities</li>
              <li>Technical failures, service interruptions, or website downtime</li>
            </ul>

            <h2>8. Photography and Media</h2>
            <p>
              By attending the event, you consent to the use of your image, likeness, and voice in
              photographs, videos, and audio recordings taken during the event for promotional and
              marketing purposes by the Organizer, without additional compensation.
            </p>

            <h2>9. Code of Conduct</h2>
            <p>
              All participants are expected to conduct themselves professionally and respectfully.
              The Organizer reserves the right to refuse entry or remove any person whose behavior
              is deemed disruptive, disrespectful, or in violation of these Terms or applicable laws.
            </p>

            <h2>10. Force Majeure</h2>
            <p>
              The Organizer shall not be held liable for any failure or delay in performing its
              obligations due to events beyond its reasonable control, including but not limited to
              natural disasters, pandemics, government actions, war, terrorism, strikes, or
              infrastructure failures.
            </p>

            <h2>11. Governing Law</h2>
            <p>
              These Terms shall be governed by and construed in accordance with the laws of India.
              Any disputes arising from these Terms or your participation in the event shall be
              subject to the exclusive jurisdiction of the courts in New Delhi, India.
            </p>

            <h2>12. Changes to These Terms</h2>
            <p>
              We reserve the right to modify these Terms at any time. Changes will be posted on this
              page with an updated revision date. Your continued use of the Site or participation in
              the event constitutes acceptance of the revised Terms.
            </p>

            <h2>13. Contact</h2>
            <p>For questions regarding these Terms, please contact:</p>
            <ul>
              <li>
                <strong>Organization:</strong> {EVENT.organizer.fullName}
              </li>
              <li>
                <strong>Website:</strong> {EVENT.website}
              </li>
              <li>
                <strong>Email:</strong>{" "}
                <a href="mailto:nidhi@futurextrade.com">nidhi@futurextrade.com</a>
              </li>
            </ul>
          </div>
        </Container>
      </section>
    </>
  );
}
