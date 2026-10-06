"use client";

import { ArrowUpRight, FileText, Mail, Scale, ShieldCheck } from "lucide-react";

import { motion, useReducedMotion } from "framer-motion";

import { EVENT } from "@/data/siteData";
import { Container } from "@/components/ui/Container";

/* =========================================================
   Motion
   ========================================================= */

const EASE = [0.16, 1, 0.3, 1] as const;

const groupVariants = {
  hidden: {},

  visible: {
    transition: {
      staggerChildren: 0.04,
      delayChildren: 0.025,
    },
  },
};

const revealVariants = {
  hidden: {
    opacity: 0,
    y: 14,
  },

  visible: {
    opacity: 1,
    y: 0,

    transition: {
      duration: 0.52,
      ease: EASE,
    },
  },
};

/* =========================================================
   Navigation
   ========================================================= */

const CONTENTS = [
  {
    number: "01",
    id: "general",
    label: "General",
  },
  {
    number: "02",
    id: "event-participation",
    label: "Event Participation",
  },
  {
    number: "03",
    id: "registration-fees",
    label: "Registration & Fees",
  },
  {
    number: "04",
    id: "cancellation-refunds",
    label: "Cancellation & Refunds",
  },
  {
    number: "05",
    id: "intellectual-property",
    label: "Intellectual Property",
  },
  {
    number: "06",
    id: "responsibilities",
    label: "Exhibitor & Sponsor Responsibilities",
  },
  {
    number: "07",
    id: "liability",
    label: "Limitation of Liability",
  },
  {
    number: "08",
    id: "photography-media",
    label: "Photography & Media",
  },
  {
    number: "09",
    id: "conduct",
    label: "Code of Conduct",
  },
  {
    number: "10",
    id: "force-majeure",
    label: "Force Majeure",
  },
  {
    number: "11",
    id: "governing-law",
    label: "Governing Law",
  },
  {
    number: "12",
    id: "changes",
    label: "Changes to These Terms",
  },
  {
    number: "13",
    id: "terms-contact",
    label: "Contact",
  },
] as const;

/* =========================================================
   Background
   ========================================================= */

function LegalBackground({ reduceMotion }: { reduceMotion: boolean | null }) {
  return (
    <div
      aria-hidden="true"
      className="
        pointer-events-none
        absolute
        inset-0
        overflow-hidden
      "
    >
      <div
        className="
          absolute
          -right-44
          -top-40
          size-[32rem]
          rounded-full
          bg-blue/[0.045]
          blur-[130px]
        "
      />

      <div
        className="
          absolute
          -bottom-48
          -left-44
          size-[30rem]
          rounded-full
          bg-solar/[0.05]
          blur-[125px]
        "
      />

      <motion.svg
        viewBox="0 0 900 900"
        fill="none"
        className="
          absolute
          -right-[390px]
          -top-[390px]
          size-[860px]
          text-blue
          opacity-[0.022]

          sm:-right-[320px]
          sm:size-[940px]

          lg:-right-[230px]
          lg:size-[1040px]
        "
        animate={
          reduceMotion
            ? undefined
            : {
                rotate: 360,
              }
        }
        transition={
          reduceMotion
            ? undefined
            : {
                duration: 190,
                repeat: Infinity,
                ease: "linear",
              }
        }
      >
        <circle cx="450" cy="450" r="125" stroke="currentColor" />

        <circle
          cx="450"
          cy="450"
          r="220"
          stroke="currentColor"
          strokeDasharray="4 18"
        />

        <circle cx="450" cy="450" r="325" stroke="currentColor" />

        <circle
          cx="450"
          cy="450"
          r="400"
          stroke="currentColor"
          strokeDasharray="2 24"
        />

        <path d="M450 28V872" stroke="currentColor" />

        <path d="M28 450H872" stroke="currentColor" />

        <path d="M152 152L748 748" stroke="currentColor" />

        <path d="M748 152L152 748" stroke="currentColor" />

        <circle cx="450" cy="125" r="7" fill="#fbb216" stroke="none" />
      </motion.svg>

      <motion.svg
        viewBox="0 0 480 480"
        fill="none"
        className="
          absolute
          -bottom-52
          -left-48
          hidden
          size-[500px]
          text-solar
          opacity-[0.027]

          lg:block
        "
        animate={
          reduceMotion
            ? undefined
            : {
                rotate: -360,
              }
        }
        transition={
          reduceMotion
            ? undefined
            : {
                duration: 230,
                repeat: Infinity,
                ease: "linear",
              }
        }
      >
        <circle cx="240" cy="240" r="95" stroke="currentColor" />

        <circle
          cx="240"
          cy="240"
          r="160"
          stroke="currentColor"
          strokeDasharray="3 15"
        />

        <circle cx="240" cy="240" r="225" stroke="currentColor" />

        <path d="M240 15V465" stroke="currentColor" />

        <path d="M15 240H465" stroke="currentColor" />
      </motion.svg>
    </div>
  );
}

/* =========================================================
   Legal Section
   ========================================================= */

function LegalSection({
  number,
  id,
  title,
  children,
}: {
  number: string;
  id: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <motion.section
      id={id}
      variants={revealVariants}
      className="
        scroll-mt-32
        border-b
        border-ink/[0.08]
        py-8

        first:pt-0
        last:border-b-0
        last:pb-0

        sm:py-9
      "
    >
      <div
        className="
          grid
          gap-3

          sm:grid-cols-[42px_minmax(0,1fr)]
          sm:gap-4
        "
      >
        <span
          aria-hidden="true"
          className="
            pt-1
            font-display
            text-[9px]
            font-semibold
            tracking-[0.14em]
            text-blue/45
          "
        >
          {number}
        </span>

        <div className="min-w-0">
          <h2
            className="
              font-display
              text-[1.3rem]
              font-semibold
              leading-[1.1]
              tracking-[-0.025em]
              text-ink

              sm:text-[1.4rem]
            "
          >
            {title}
          </h2>

          <div
            className="
              mt-4
              space-y-4
              text-[13px]
              leading-7
              text-ink/58

              sm:text-[14px]
            "
          >
            {children}
          </div>
        </div>
      </div>
    </motion.section>
  );
}

/* =========================================================
   Bullet List
   ========================================================= */

function LegalList({ children }: { children: React.ReactNode }) {
  return <ul className="space-y-2.5">{children}</ul>;
}

function LegalListItem({ children }: { children: React.ReactNode }) {
  return (
    <li
      className="
        flex
        items-start
        gap-3
      "
    >
      <span
        aria-hidden="true"
        className="
          mt-[11px]
          size-1.5
          shrink-0
          rounded-full
          bg-solar
        "
      />

      <span className="min-w-0">{children}</span>
    </li>
  );
}

/* =========================================================
   Component
   ========================================================= */

export function TermsContent() {
  const reduceMotion = useReducedMotion();

  return (
    <section
      aria-labelledby="terms-document-heading"
      className="
        relative
        isolate
        overflow-hidden
        bg-paper
        text-ink
      "
    >
      <LegalBackground reduceMotion={reduceMotion} />

      <Container className="relative py-14 sm:py-16 lg:py-20">
        {/* =================================================
            Document Header
            ================================================= */}

        <motion.div
          variants={groupVariants}
          initial={reduceMotion ? false : "hidden"}
          whileInView="visible"
          viewport={{
            once: true,
            amount: 0.15,
            margin: "-40px",
          }}
          className="
            grid
            gap-7
            border-b
            border-ink/[0.08]
            pb-9

            lg:grid-cols-[1fr_0.72fr]
            lg:items-end
            lg:gap-14
          "
        >
          <motion.div variants={revealVariants}>
            <div className="flex items-center gap-3">
              <span aria-hidden="true" className="h-px w-7 bg-solar" />

              <span
                className="
                  text-[10px]
                  font-semibold
                  uppercase
                  tracking-[0.16em]
                  text-blue

                  sm:text-[11px]
                "
              >
                Legal Document
              </span>
            </div>

            <h2
              id="terms-document-heading"
              className="
                mt-4
                max-w-[680px]
                font-display
                text-[clamp(2rem,3.3vw,3.4rem)]
                font-semibold
                leading-[0.98]
                tracking-[-0.035em]
                text-ink
              "
            >
              Terms Governing the
              <span className="block text-blue">Website & Event</span>
            </h2>
          </motion.div>

          <motion.p
            variants={revealVariants}
            className="
              max-w-[500px]
              text-sm
              leading-7
              text-ink/50

              sm:text-[15px]

              lg:justify-self-end
            "
          >
            These terms cover website use, registration, participation,
            cancellations, intellectual property, conduct, liability and related
            event obligations.
          </motion.p>
        </motion.div>

        {/* =================================================
            Meta Rail
            ================================================= */}

        <motion.div
          variants={groupVariants}
          initial={reduceMotion ? false : "hidden"}
          whileInView="visible"
          viewport={{
            once: true,
            amount: 0.1,
          }}
          className="
            mt-8
            grid
            overflow-hidden
            rounded-2xl
            border
            border-ink/[0.08]
            bg-paper/80
            backdrop-blur-sm

            sm:grid-cols-3
          "
        >
          {[
            {
              icon: FileText,
              label: "Document",
              value: "Terms & Conditions",
            },

            {
              icon: Scale,
              label: "Jurisdiction",
              value: "Laws of India",
            },

            {
              icon: ShieldCheck,
              label: "Revision",
              value: "July 2025",
            },
          ].map((item, index) => {
            const Icon = item.icon;

            return (
              <motion.div
                key={item.label}
                variants={revealVariants}
                className="
                    relative
                    flex
                    min-h-[94px]
                    items-center
                    gap-3
                    border-ink/[0.08]
                    px-4
                    py-4

                    max-sm:border-b
                    max-sm:last:border-b-0

                    sm:border-r
                    sm:last:border-r-0

                    sm:px-5
                  "
              >
                <div
                  className="
                      flex
                      size-9
                      shrink-0
                      items-center
                      justify-center
                      rounded-full
                      border
                      border-ink/[0.08]
                      bg-paper
                      text-blue
                    "
                >
                  <Icon
                    aria-hidden="true"
                    className="size-4"
                    strokeWidth={1.75}
                  />
                </div>

                <div>
                  <span
                    className="
                        block
                        text-[8px]
                        font-semibold
                        uppercase
                        tracking-[0.13em]
                        text-ink/30
                      "
                  >
                    {item.label}
                  </span>

                  <span
                    className="
                        mt-1
                        block
                        text-[12px]
                        font-semibold
                        text-ink/68
                      "
                  >
                    {item.value}
                  </span>
                </div>

                <span
                  aria-hidden="true"
                  className="
                      absolute
                      right-4
                      top-4
                      text-[8px]
                      font-semibold
                      tracking-[0.12em]
                      text-ink/14
                    "
                >
                  {String(index + 1).padStart(2, "0")}
                </span>
              </motion.div>
            );
          })}
        </motion.div>

        {/* =================================================
            Main Legal Layout
            ================================================= */}

        <div
          className="
            mt-10
            grid
            gap-8

            lg:grid-cols-[245px_minmax(0,1fr)]
            lg:items-start
            lg:gap-12

            xl:grid-cols-[270px_minmax(0,1fr)]
            xl:gap-16
          "
        >
          {/* =================================================
              Sticky Contents
              ================================================= */}

          <motion.aside
            initial={
              reduceMotion
                ? false
                : {
                    opacity: 0,
                    x: -12,
                  }
            }
            whileInView={{
              opacity: 1,
              x: 0,
            }}
            viewport={{
              once: true,
              amount: 0.1,
            }}
            transition={{
              duration: 0.55,
              ease: EASE,
            }}
            className="
              lg:sticky
              lg:top-32
            "
          >
            <div
              className="
                overflow-hidden
                rounded-2xl
                border
                border-ink/[0.08]
                bg-paper/80
                backdrop-blur-md
              "
            >
              <div
                className="
                  border-b
                  border-ink/[0.08]
                  px-4
                  py-4
                "
              >
                <span
                  className="
                    text-[9px]
                    font-semibold
                    uppercase
                    tracking-[0.14em]
                    text-blue
                  "
                >
                  On This Page
                </span>

                <p
                  className="
                    mt-1
                    text-[11px]
                    text-ink/38
                  "
                >
                  13 sections
                </p>
              </div>

              <nav
                aria-label="Terms and conditions sections"
                className="
                  max-h-[430px]
                  overflow-y-auto
                  p-2
                "
              >
                {CONTENTS.map((item) => (
                  <a
                    key={item.id}
                    href={`#${item.id}`}
                    className="
                      group
                      flex
                      items-center
                      gap-3
                      rounded-lg
                      px-2.5
                      py-2

                      transition-colors
                      duration-200

                      hover:bg-blue/[0.045]
                    "
                  >
                    <span
                      className="
                        w-6
                        shrink-0
                        text-[8px]
                        font-semibold
                        tracking-[0.11em]
                        text-ink/20

                        transition-colors
                        group-hover:text-blue
                      "
                    >
                      {item.number}
                    </span>

                    <span
                      className="
                        text-[11px]
                        font-medium
                        leading-4
                        text-ink/48

                        transition-colors
                        group-hover:text-ink
                      "
                    >
                      {item.label}
                    </span>
                  </a>
                ))}
              </nav>
            </div>
          </motion.aside>

          {/* =================================================
              Legal Document
              ================================================= */}

          <motion.article
            variants={groupVariants}
            initial={reduceMotion ? false : "hidden"}
            whileInView="visible"
            viewport={{
              once: true,
              amount: 0.03,
            }}
            className="
              min-w-0
              overflow-hidden
              rounded-2xl
              border
              border-ink/[0.08]
              bg-paper
              px-5
              py-7
              shadow-[0_16px_50px_rgba(25,25,25,0.035)]

              sm:px-7
              sm:py-8

              lg:px-9
              lg:py-10
            "
          >
            {/* 01 */}

            <LegalSection number="01" id="general" title="General">
              <p>
                These Terms and Conditions (&quot;Terms&quot;) govern your use
                of the {EVENT.nameWithYear} website at {EVENT.website} (the
                &quot;Site&quot;) and your participation in the event organized
                by {EVENT.organizer.fullName} (&quot;Organizer,&quot;
                &quot;we,&quot; &quot;us,&quot; or &quot;our&quot;). By
                accessing the Site or registering for the event, you agree to be
                bound by these Terms.
              </p>
            </LegalSection>

            {/* 02 */}

            <LegalSection
              number="02"
              id="event-participation"
              title="Event Participation"
            >
              <div>
                <h3
                  className="
                    font-display
                    text-[1rem]
                    font-semibold
                    text-ink
                  "
                >
                  Exhibitors
                </h3>

                <p className="mt-2">
                  Exhibitor participation is subject to confirmation and
                  acceptance by the Organizer. Stall allocation, pricing, and
                  terms of participation will be communicated upon registration
                  and are subject to the Exhibitor Agreement provided
                  separately.
                </p>
              </div>

              <div>
                <h3
                  className="
                    font-display
                    text-[1rem]
                    font-semibold
                    text-ink
                  "
                >
                  Visitors
                </h3>

                <p className="mt-2">
                  Visitor registration may be subject to eligibility criteria
                  determined by the Organizer. Pre-registration is recommended,
                  and entry may be restricted based on capacity or security
                  considerations.
                </p>
              </div>
            </LegalSection>

            {/* 03 */}

            <LegalSection
              number="03"
              id="registration-fees"
              title="Registration and Fees"
            >
              <LegalList>
                <LegalListItem>
                  All registrations are subject to confirmation by the Organizer
                  and acceptance of the applicable terms.
                </LegalListItem>

                <LegalListItem>
                  Payment terms, deadlines, and refund policies for exhibitors
                  and delegates will be communicated in the respective
                  registration confirmation or agreement.
                </LegalListItem>

                <LegalListItem>
                  The Organizer reserves the right to modify pricing,
                  registration categories, or terms at any time prior to the
                  event.
                </LegalListItem>
              </LegalList>
            </LegalSection>

            {/* 04 */}

            <LegalSection
              number="04"
              id="cancellation-refunds"
              title="Cancellation and Refunds"
            >
              <p>
                Cancellation and refund terms vary by registration type and will
                be specified in the applicable agreement or confirmation
                communication. In general:
              </p>

              <LegalList>
                <LegalListItem>
                  Cancellations made more than 90 days before the event may be
                  eligible for a partial refund, subject to processing fees.
                </LegalListItem>

                <LegalListItem>
                  Cancellations within 90 days of the event may not be eligible
                  for any refund.
                </LegalListItem>

                <LegalListItem>
                  The Organizer reserves the right to cancel or reschedule the
                  event due to unforeseen circumstances, force majeure, or
                  insufficient participation.
                </LegalListItem>
              </LegalList>
            </LegalSection>

            {/* 05 */}

            <LegalSection
              number="05"
              id="intellectual-property"
              title="Intellectual Property"
            >
              <p>
                All content on the Site, including text, graphics, logos,
                images, and software, is the property of the Organizer or its
                licensors and is protected by applicable intellectual property
                laws. You may not reproduce, distribute, modify, or create
                derivative works from any content on the Site without prior
                written permission.
              </p>
            </LegalSection>

            {/* 06 */}

            <LegalSection
              number="06"
              id="responsibilities"
              title="Exhibitor and Sponsor Responsibilities"
            >
              <LegalList>
                <LegalListItem>
                  Exhibitors are responsible for the setup, operation, and
                  breakdown of their exhibition stands in accordance with
                  guidelines provided by the Organizer.
                </LegalListItem>

                <LegalListItem>
                  All exhibits, displays, and marketing materials must comply
                  with applicable laws, regulations, and the event&apos;s code
                  of conduct.
                </LegalListItem>

                <LegalListItem>
                  Exhibitors and sponsors are solely responsible for the
                  accuracy of information they present at the event.
                </LegalListItem>
              </LegalList>
            </LegalSection>

            {/* 07 */}

            <LegalSection
              number="07"
              id="liability"
              title="Limitation of Liability"
            >
              <p>
                To the maximum extent permitted by law, the Organizer shall not
                be liable for any direct, indirect, incidental, special, or
                consequential damages arising from:
              </p>

              <LegalList>
                <LegalListItem>
                  Your participation in or inability to participate in the event
                </LegalListItem>

                <LegalListItem>
                  Any loss or damage to property brought to the venue
                </LegalListItem>

                <LegalListItem>
                  Any personal injury occurring at the venue
                </LegalListItem>

                <LegalListItem>
                  Business losses, lost profits, or missed opportunities
                </LegalListItem>

                <LegalListItem>
                  Technical failures, service interruptions, or website downtime
                </LegalListItem>
              </LegalList>
            </LegalSection>

            {/* 08 */}

            <LegalSection
              number="08"
              id="photography-media"
              title="Photography and Media"
            >
              <p>
                By attending the event, you consent to the use of your image,
                likeness, and voice in photographs, videos, and audio recordings
                taken during the event for promotional and marketing purposes by
                the Organizer, without additional compensation.
              </p>
            </LegalSection>

            {/* 09 */}

            <LegalSection number="09" id="conduct" title="Code of Conduct">
              <p>
                All participants are expected to conduct themselves
                professionally and respectfully. The Organizer reserves the
                right to refuse entry or remove any person whose behavior is
                deemed disruptive, disrespectful, or in violation of these Terms
                or applicable laws.
              </p>
            </LegalSection>

            {/* 10 */}

            <LegalSection number="10" id="force-majeure" title="Force Majeure">
              <p>
                The Organizer shall not be held liable for any failure or delay
                in performing its obligations due to events beyond its
                reasonable control, including but not limited to natural
                disasters, pandemics, government actions, war, terrorism,
                strikes, or infrastructure failures.
              </p>
            </LegalSection>

            {/* 11 */}

            <LegalSection number="11" id="governing-law" title="Governing Law">
              <p>
                These Terms shall be governed by and construed in accordance
                with the laws of India. Any disputes arising from these Terms or
                your participation in the event shall be subject to the
                exclusive jurisdiction of the courts in New Delhi, India.
              </p>
            </LegalSection>

            {/* 12 */}

            <LegalSection
              number="12"
              id="changes"
              title="Changes to These Terms"
            >
              <p>
                We reserve the right to modify these Terms at any time. Changes
                will be posted on this page with an updated revision date. Your
                continued use of the Site or participation in the event
                constitutes acceptance of the revised Terms.
              </p>
            </LegalSection>

            {/* 13 */}

            <LegalSection number="13" id="terms-contact" title="Contact">
              <p>For questions regarding these Terms, please contact:</p>

              <div
                className="
                  mt-4
                  overflow-hidden
                  rounded-xl
                  border
                  border-ink/[0.08]
                  bg-blue/[0.025]
                "
              >
                <div
                  className="
                    grid
                    border-b
                    border-ink/[0.07]
                    px-4
                    py-3

                    sm:grid-cols-[130px_minmax(0,1fr)]
                  "
                >
                  <span
                    className="
                      text-[9px]
                      font-semibold
                      uppercase
                      tracking-[0.12em]
                      text-ink/30
                    "
                  >
                    Organization
                  </span>

                  <span
                    className="
                      mt-1
                      font-medium
                      text-ink/68

                      sm:mt-0
                    "
                  >
                    {EVENT.organizer.fullName}
                  </span>
                </div>

                <div
                  className="
                    grid
                    border-b
                    border-ink/[0.07]
                    px-4
                    py-3

                    sm:grid-cols-[130px_minmax(0,1fr)]
                  "
                >
                  <span
                    className="
                      text-[9px]
                      font-semibold
                      uppercase
                      tracking-[0.12em]
                      text-ink/30
                    "
                  >
                    Website
                  </span>

                  <span
                    className="
                      mt-1
                      break-all
                      font-medium
                      text-ink/68

                      sm:mt-0
                    "
                  >
                    {EVENT.website}
                  </span>
                </div>

                <div
                  className="
                    grid
                    px-4
                    py-3

                    sm:grid-cols-[130px_minmax(0,1fr)]
                  "
                >
                  <span
                    className="
                      text-[9px]
                      font-semibold
                      uppercase
                      tracking-[0.12em]
                      text-ink/30
                    "
                  >
                    Email
                  </span>

                  <a
                    href="mailto:nidhi@futurextrade.com"
                    className="
                      group
                      mt-1
                      inline-flex
                      min-w-0
                      items-center
                      gap-2
                      break-all
                      font-medium
                      text-blue

                      transition-colors
                      hover:text-ink

                      sm:mt-0
                    "
                  >
                    <Mail
                      aria-hidden="true"
                      className="size-3.5 shrink-0"
                      strokeWidth={1.8}
                    />
                    nidhi@futurextrade.com
                    <ArrowUpRight
                      aria-hidden="true"
                      className="
                        size-3
                        shrink-0
                        transition-transform
                        group-hover:translate-x-0.5
                        group-hover:-translate-y-0.5
                      "
                    />
                  </a>
                </div>
              </div>
            </LegalSection>
          </motion.article>
        </div>

        {/* =================================================
            Footer
            ================================================= */}

        <motion.div
          initial={
            reduceMotion
              ? false
              : {
                  opacity: 0,
                  y: 10,
                }
          }
          whileInView={{
            opacity: 1,
            y: 0,
          }}
          viewport={{
            once: true,
          }}
          transition={{
            duration: 0.5,
            ease: EASE,
          }}
          className="
            mt-8
            flex
            flex-col
            gap-3
            border-t
            border-ink/[0.08]
            pt-5

            sm:flex-row
            sm:items-center
            sm:justify-between
          "
        >
          <p
            className="
              max-w-[640px]
              text-[10px]
              leading-5
              text-ink/30
            "
          >
            India International Solar Show · Terms &amp; Conditions · Last
            updated July 2025
          </p>

          <div
            aria-hidden="true"
            className="
              flex
              items-center
              gap-2
            "
          >
            <span className="size-1.5 rounded-full bg-solar" />
            <span className="h-px w-8 bg-ink/10" />
            <span className="size-1.5 rounded-full bg-blue" />
          </div>
        </motion.div>
      </Container>
    </section>
  );
}
