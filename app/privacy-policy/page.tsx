import type { Metadata } from "next";
import { EVENT } from "@/data/siteData";
import { PageHero } from "@/components/ui/PageHero";
import { Container } from "@/components/ui/Container";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: `Privacy policy for the ${EVENT.nameWithYear} website. Learn how we collect, use, and protect your personal information.`,
};

export default function PrivacyPolicyPage() {
  return (
    <>
      <PageHero
        eyebrow="Legal"
        title="Privacy Policy"
        subtitle={`Last updated: July 2025`}
      />

      <section className="bg-white py-16 sm:py-24">
        <Container>
          <div className="prose prose-slate mx-auto max-w-3xl prose-headings:font-extrabold prose-headings:text-[color:var(--color-black)] prose-a:text-[color:var(--color-gold)] prose-a:no-underline hover:prose-a:underline">
            <h2>1. Introduction</h2>
            <p>
              {EVENT.organizer.fullName} (&quot;we,&quot; &quot;us,&quot; or &quot;our&quot;) operates the{" "}
              {EVENT.nameWithYear} website at {EVENT.website} (the &quot;Site&quot;). This Privacy
              Policy describes how we collect, use, disclose, and safeguard your information when you
              visit our Site, register for the event, or interact with our services.
            </p>

            <h2>2. Information We Collect</h2>
            <h3>Personal Information</h3>
            <p>
              When you register as a visitor, exhibitor, sponsor, or media partner, or submit an
              enquiry form, we may collect:
            </p>
            <ul>
              <li>Full name and designation</li>
              <li>Company or organization name</li>
              <li>Email address</li>
              <li>Phone number</li>
              <li>Business address</li>
              <li>Nature of business or industry segment</li>
              <li>Any additional information you voluntarily provide</li>
            </ul>

            <h3>Automatically Collected Information</h3>
            <p>
              When you visit the Site, we may automatically collect certain information, including:
            </p>
            <ul>
              <li>IP address</li>
              <li>Browser type and version</li>
              <li>Operating system</li>
              <li>Referring website</li>
              <li>Pages visited and time spent on each page</li>
              <li>Date and time of access</li>
            </ul>

            <h2>3. How We Use Your Information</h2>
            <p>We use the information we collect to:</p>
            <ul>
              <li>Process your event registration and provide event-related services</li>
              <li>Send event updates, schedules, and logistics information</li>
              <li>Respond to your enquiries and support requests</li>
              <li>Share relevant exhibitor, sponsor, or partnership information</li>
              <li>Improve our website, services, and event experience</li>
              <li>Comply with legal obligations and enforce our terms</li>
            </ul>

            <h2>4. Sharing of Information</h2>
            <p>
              We do not sell your personal information. We may share your information with:
            </p>
            <ul>
              <li>
                <strong>Event partners and co-located show organizers</strong> for the purpose of
                event coordination and relevant communications
              </li>
              <li>
                <strong>Service providers</strong> who assist with website hosting, email delivery,
                analytics, and event management
              </li>
              <li>
                <strong>Legal authorities</strong> when required by applicable law or to protect our
                rights
              </li>
            </ul>

            <h2>5. Data Security</h2>
            <p>
              We implement appropriate technical and organizational measures to protect your personal
              information against unauthorized access, alteration, disclosure, or destruction.
              However, no method of transmission over the Internet or electronic storage is
              completely secure, and we cannot guarantee absolute security.
            </p>

            <h2>6. Cookies</h2>
            <p>
              Our Site may use cookies and similar tracking technologies to enhance your browsing
              experience and collect analytics data. You can configure your browser to refuse cookies
              or alert you when cookies are being sent. Some features of the Site may not function
              properly without cookies.
            </p>

            <h2>7. Third-Party Links</h2>
            <p>
              Our Site may contain links to third-party websites. We are not responsible for the
              privacy practices or content of those websites. We encourage you to read the privacy
              policies of any third-party sites you visit.
            </p>

            <h2>8. Your Rights</h2>
            <p>Depending on your jurisdiction, you may have the right to:</p>
            <ul>
              <li>Access, correct, or delete your personal information</li>
              <li>Withdraw your consent to data processing</li>
              <li>Object to or restrict certain processing activities</li>
              <li>Request a copy of your data in a portable format</li>
            </ul>
            <p>
              To exercise any of these rights, please contact us using the information provided
              below.
            </p>

            <h2>9. Changes to This Policy</h2>
            <p>
              We may update this Privacy Policy from time to time. Changes will be posted on this
              page with an updated revision date. Your continued use of the Site after any changes
              constitutes acceptance of the updated policy.
            </p>

            <h2>10. Contact Us</h2>
            <p>
              If you have questions or concerns about this Privacy Policy, please contact us:
            </p>
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
