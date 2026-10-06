"use client";

import type { ReactNode } from "react";

import {
  ArrowUpRight,
  Award,
  BadgeCheck,
  Check,
  Handshake,
  Lightbulb,
  Newspaper,
  Sparkles,
  Star,
} from "lucide-react";

import {
  motion,
  useReducedMotion,
} from "framer-motion";

import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { ContactCards } from "@/components/ContactCards";
import { SponsorshipEnquiryForm } from "@/components/forms/SponsorshipEnquiryForm";

/* =========================================================
   Data
   ========================================================= */

const TIERS = [
  {
    icon: Award,
    label: "Platinum Partner",
    desc:
      "Maximum brand visibility with prime exhibition positioning, high-impact branding, speaking opportunities and premium networking access.",
  },
  {
    icon: Star,
    label: "Gold Partner",
    desc:
      "Prominent branding across event collaterals, dedicated exhibition visibility, panel participation and targeted B2B engagement.",
  },
  {
    icon: Lightbulb,
    label: "Innovation Partner",
    desc:
      "Align your brand with emerging technologies through innovation showcases, demonstrations and startup-led clean-energy initiatives.",
  },
  {
    icon: Newspaper,
    label: "Media Partner",
    desc:
      "Collaborate on event communication, press access, interviews, content distribution and co-branded media visibility.",
  },
] as const;

const BENEFITS = [
  "Brand visibility across event marketing and communications",
  "Logo placement across website, signage and event collateral",
  "Speaking and panel participation opportunities",
  "Dedicated exhibition or meeting space",
  "Direct access to qualified industry decision-makers",
  "Pre-event and post-event digital marketing visibility",
  "VIP networking and B2B matchmaking opportunities",
  "Association with India's growing renewable-energy ecosystem",
] as const;

/* =========================================================
   Motion
   ========================================================= */

const EASE = [0.16, 1, 0.3, 1] as const;

const groupVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.055,
      delayChildren: 0.035,
    },
  },
};

const revealVariants = {
  hidden: {
    opacity: 0,
    y: 15,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.55,
      ease: EASE,
    },
  },
};

/* =========================================================
   Background
   ========================================================= */

function PartnershipBackground({
  tone,
  reduceMotion,
}: {
  tone: "dark" | "light";
  reduceMotion: boolean | null;
}) {
  const dark = tone === "dark";

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 overflow-hidden"
    >
      <div
        className={
          dark
            ? `
              absolute -right-48 -top-44 size-[34rem]
              rounded-full bg-blue/[0.15] blur-[135px]
            `
            : `
              absolute -right-48 -top-40 size-[32rem]
              rounded-full bg-solar/[0.075] blur-[125px]
            `
        }
      />

      <div
        className={
          dark
            ? `
              absolute -bottom-44 -left-40 size-[30rem]
              rounded-full bg-solar/[0.055] blur-[125px]
            `
            : `
              absolute -bottom-44 -left-40 size-[30rem]
              rounded-full bg-blue/[0.045] blur-[125px]
            `
        }
      />

      <motion.svg
        viewBox="0 0 900 900"
        fill="none"
        className={`
          absolute -right-[380px] -top-[380px]
          size-[850px] opacity-[0.03]

          sm:-right-[310px] sm:size-[930px]
          lg:-right-[220px] lg:size-[1040px]

          ${dark ? "text-paper" : "text-blue"}
        `}
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
                duration: 165,
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
          strokeDasharray="4 16"
        />

        <circle cx="450" cy="450" r="325" stroke="currentColor" />

        <circle
          cx="450"
          cy="450"
          r="398"
          stroke="currentColor"
          strokeDasharray="2 22"
        />

        <path d="M450 28V872" stroke="currentColor" />
        <path d="M28 450H872" stroke="currentColor" />
        <path d="M152 152L748 748" stroke="currentColor" />
        <path d="M748 152L152 748" stroke="currentColor" />

        <circle
          cx="450"
          cy="125"
          r="7"
          fill="#fbb216"
          stroke="none"
        />
      </motion.svg>

      <motion.svg
        viewBox="0 0 500 500"
        fill="none"
        className="
          absolute -bottom-52 -left-44
          hidden size-[520px]
          text-solar opacity-[0.035]
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
                duration: 205,
                repeat: Infinity,
                ease: "linear",
              }
        }
      >
        <circle cx="250" cy="250" r="100" stroke="currentColor" />

        <circle
          cx="250"
          cy="250"
          r="170"
          stroke="currentColor"
          strokeDasharray="3 14"
        />

        <circle cx="250" cy="250" r="235" stroke="currentColor" />

        <path d="M250 15V485" stroke="currentColor" />
        <path d="M15 250H485" stroke="currentColor" />
      </motion.svg>
    </div>
  );
}

/* =========================================================
   Label
   ========================================================= */

function SectionLabel({
  children,
  tone = "dark",
}: {
  children: ReactNode;
  tone?: "dark" | "light";
}) {
  return (
    <div className="flex items-center gap-3">
      <span className="h-px w-7 bg-solar" aria-hidden="true" />

      <span
        className={`
          text-[10px] font-semibold uppercase
          tracking-[0.16em] sm:text-[11px]
          ${tone === "dark" ? "text-solar" : "text-blue"}
        `}
      >
        {children}
      </span>
    </div>
  );
}

/* =========================================================
   Component
   ========================================================= */

export function SponsorsExperience() {
  const reduceMotion = useReducedMotion();

  const featured = TIERS.slice(0, 2);
  const secondary = TIERS.slice(2);

  return (
    <>
      {/* ===================================================
          Sponsorship Tiers
          =================================================== */}

      <section
        aria-labelledby="partnership-tiers-heading"
        className="
          relative isolate overflow-hidden
          border-b border-paper/10
          bg-ink text-paper
        "
      >
        <PartnershipBackground
          tone="dark"
          reduceMotion={reduceMotion}
        />

        <Container className="relative py-16 sm:py-20 lg:py-24">
          <motion.div
            variants={groupVariants}
            initial={reduceMotion ? false : "hidden"}
            whileInView="visible"
            viewport={{
              once: true,
              amount: 0.14,
              margin: "-40px",
            }}
            className="
              grid gap-7
              border-b border-paper/10
              pb-9

              lg:grid-cols-[1fr_0.72fr]
              lg:items-end
              lg:gap-14
              lg:pb-11
            "
          >
            <motion.div variants={revealVariants}>
              <SectionLabel>
                Sponsorship Tiers
              </SectionLabel>

              <h2
                id="partnership-tiers-heading"
                className="
                  mt-4
                  max-w-[720px]
                  font-display
                  text-[clamp(2.15rem,3.55vw,3.7rem)]
                  font-semibold
                  leading-[0.98]
                  tracking-[-0.035em]
                  text-paper
                "
              >
                Choose the Right

                <span className="block text-solar">
                  Partnership Platform
                </span>
              </h2>
            </motion.div>

            <motion.p
              variants={revealVariants}
              className="
                max-w-[500px]
                text-sm
                leading-7
                text-paper/48
                sm:text-[15px]
                lg:justify-self-end
              "
            >
              Build visibility, strengthen industry positioning and
              connect directly with India&apos;s renewable-energy
              ecosystem through a partnership format aligned with your
              brand goals.
            </motion.p>
          </motion.div>

          <motion.div
            variants={groupVariants}
            initial={reduceMotion ? false : "hidden"}
            whileInView="visible"
            viewport={{
              once: true,
              amount: 0.1,
              margin: "-45px",
            }}
            className="
              mt-10 grid gap-3
              md:grid-cols-2
              lg:mt-12
            "
          >
            {featured.map((tier, index) => {
              const TierIcon = tier.icon;

              return (
                <motion.article
                  key={tier.label}
                  variants={revealVariants}
                  className="
                    group relative
                    min-h-[270px]
                    overflow-hidden
                    rounded-2xl
                    border border-paper/10
                    bg-paper/[0.035]
                    p-6
                    backdrop-blur-sm

                    transition-[background-color,border-color]
                    duration-500

                    hover:border-solar/20
                    hover:bg-paper/[0.05]

                    sm:p-7
                  "
                >
                  <div
                    aria-hidden="true"
                    className="
                      absolute -right-14 -top-16
                      size-48 rounded-full
                      bg-solar/[0.055]
                      opacity-0 blur-[65px]

                      transition-opacity duration-500
                      group-hover:opacity-100
                    "
                  />

                  <span
                    aria-hidden="true"
                    className="
                      absolute inset-x-0 top-0
                      h-[2px]
                      origin-left
                      scale-x-[0.18]
                      bg-solar

                      transition-transform duration-500
                      group-hover:scale-x-100
                    "
                  />

                  <span
                    aria-hidden="true"
                    className="
                      absolute -bottom-8 -right-2
                      font-display
                      text-[7rem]
                      font-semibold
                      leading-none
                      tracking-[-0.08em]
                      text-paper/[0.025]
                    "
                  >
                    {String(index + 1).padStart(2, "0")}
                  </span>

                  <div className="relative z-10 flex h-full flex-col">
                    <div className="flex items-start justify-between gap-5">
                      <div
                        className="
                          flex size-11 shrink-0
                          items-center justify-center
                          rounded-full
                          border border-paper/10
                          bg-paper/[0.04]
                          text-solar

                          transition-[background-color,color,border-color]
                          duration-300

                          group-hover:border-solar
                          group-hover:bg-solar
                          group-hover:text-ink
                        "
                      >
                        <TierIcon
                          aria-hidden="true"
                          className="size-[18px]"
                          strokeWidth={1.75}
                        />
                      </div>

                      <span
                        className="
                          text-[9px]
                          font-semibold
                          uppercase
                          tracking-[0.13em]
                          text-paper/22
                        "
                      >
                        Premium Tier
                      </span>
                    </div>

                    <h3
                      className="
                        mt-9
                        max-w-[390px]
                        font-display
                        text-[1.4rem]
                        font-semibold
                        leading-[1.05]
                        tracking-[-0.025em]
                        text-paper
                        sm:text-[1.5rem]
                      "
                    >
                      {tier.label}
                    </h3>

                    <p
                      className="
                        mt-3
                        max-w-[480px]
                        text-[12px]
                        leading-6
                        text-paper/42
                        sm:text-[13px]
                      "
                    >
                      {tier.desc}
                    </p>

                    <div
                      aria-hidden="true"
                      className="mt-auto flex items-center gap-2 pt-7"
                    >
                      <span className="h-px w-9 bg-solar" />
                      <span className="size-1 rounded-full bg-solar" />
                    </div>
                  </div>
                </motion.article>
              );
            })}
          </motion.div>

          <motion.div
            variants={groupVariants}
            initial={reduceMotion ? false : "hidden"}
            whileInView="visible"
            viewport={{
              once: true,
              amount: 0.1,
              margin: "-40px",
            }}
            className="
              mt-3
              grid
              overflow-hidden
              rounded-2xl
              border border-paper/10
              bg-paper/[0.02]
              md:grid-cols-2
            "
          >
            {secondary.map((tier, itemIndex) => {
              const TierIcon = tier.icon;
              const index = itemIndex + 2;

              return (
                <motion.article
                  key={tier.label}
                  variants={revealVariants}
                  className="
                    group relative
                    min-h-[210px]
                    border-paper/10
                    p-5

                    transition-colors duration-400
                    hover:bg-paper/[0.035]

                    first:border-b
                    md:first:border-b-0
                    md:first:border-r

                    sm:p-6
                  "
                >
                  <span
                    aria-hidden="true"
                    className="
                      absolute left-0 top-0
                      h-0 w-[2px]
                      bg-solar
                      transition-[height]
                      duration-500
                      group-hover:h-full
                    "
                  />

                  <div className="flex items-start justify-between gap-4">
                    <div
                      className="
                        flex size-10 shrink-0
                        items-center justify-center
                        rounded-full
                        border border-paper/10
                        bg-paper/[0.035]
                        text-solar

                        transition-[background-color,color]
                        duration-300

                        group-hover:bg-solar
                        group-hover:text-ink
                      "
                    >
                      <TierIcon
                        aria-hidden="true"
                        className="size-4"
                        strokeWidth={1.75}
                      />
                    </div>

                    <span
                      className="
                        font-display
                        text-[9px]
                        font-semibold
                        tracking-[0.13em]
                        text-paper/18
                      "
                    >
                      {String(index + 1).padStart(2, "0")}
                    </span>
                  </div>

                  <h3
                    className="
                      mt-6
                      font-display
                      text-[1.18rem]
                      font-semibold
                      leading-[1.1]
                      tracking-[-0.02em]
                      text-paper
                    "
                  >
                    {tier.label}
                  </h3>

                  <p
                    className="
                      mt-2
                      max-w-[470px]
                      text-[12px]
                      leading-6
                      text-paper/40
                    "
                  >
                    {tier.desc}
                  </p>
                </motion.article>
              );
            })}
          </motion.div>
        </Container>
      </section>

      {/* ===================================================
          Benefits
          =================================================== */}

      <section
        aria-labelledby="sponsorship-benefits-heading"
        className="
          relative isolate overflow-hidden
          border-b border-ink/[0.08]
          bg-paper text-ink
        "
      >
        <PartnershipBackground
          tone="light"
          reduceMotion={reduceMotion}
        />

        <Container className="relative py-16 sm:py-20 lg:py-24">
          <motion.div
            variants={groupVariants}
            initial={reduceMotion ? false : "hidden"}
            whileInView="visible"
            viewport={{
              once: true,
              amount: 0.14,
              margin: "-40px",
            }}
            className="
              grid gap-9

              lg:grid-cols-[0.8fr_1.2fr]
              lg:items-start
              lg:gap-14
            "
          >
            <div>
              <motion.div variants={revealVariants}>
                <SectionLabel tone="light">
                  Why Sponsor
                </SectionLabel>
              </motion.div>

              <motion.h2
                id="sponsorship-benefits-heading"
                variants={revealVariants}
                className="
                  mt-4
                  max-w-[520px]
                  font-display
                  text-[clamp(2.1rem,3.45vw,3.55rem)]
                  font-semibold
                  leading-[0.98]
                  tracking-[-0.035em]
                  text-ink
                "
              >
                Sponsorship Designed for

                <span className="block text-blue">
                  Meaningful Brand Impact
                </span>
              </motion.h2>

              <motion.p
                variants={revealVariants}
                className="
                  mt-5
                  max-w-[500px]
                  text-sm
                  leading-7
                  text-ink/52
                  sm:text-[15px]
                "
              >
                Build industry visibility before, during and after
                the show through branding, networking, content and
                direct engagement opportunities.
              </motion.p>

              <motion.div
                variants={revealVariants}
                className="mt-7 flex items-center gap-3"
              >
                <div
                  className="
                    flex size-9
                    items-center justify-center
                    rounded-full
                    bg-blue text-paper
                  "
                >
                  <Sparkles
                    aria-hidden="true"
                    className="size-4"
                    strokeWidth={1.75}
                  />
                </div>

                <div>
                  <span
                    className="
                      block text-[9px]
                      font-semibold uppercase
                      tracking-[0.13em]
                      text-blue
                    "
                  >
                    Partnership Value
                  </span>

                  <span
                    className="
                      mt-0.5 block
                      text-[12px]
                      font-semibold
                      text-ink/65
                    "
                  >
                    Visibility · Access · Engagement
                  </span>
                </div>
              </motion.div>
            </div>

            <motion.div
              variants={groupVariants}
              className="
                grid overflow-hidden
                rounded-2xl
                border border-ink/[0.08]
                bg-paper/80
                backdrop-blur-sm
                sm:grid-cols-2
              "
            >
              {BENEFITS.map((benefit, index) => (
                <motion.div
                  key={benefit}
                  variants={revealVariants}
                  className="
                    group relative
                    flex min-h-[112px]
                    items-start gap-3.5
                    border-ink/[0.08]
                    p-4

                    transition-colors duration-400
                    hover:bg-solar/[0.035]

                    max-sm:border-b
                    max-sm:last:border-b-0

                    sm:border-r
                    sm:border-b
                    sm:[&:nth-child(2n)]:border-r-0
                    sm:[&:nth-last-child(-n+2)]:border-b-0

                    sm:p-5
                  "
                >
                  <span
                    aria-hidden="true"
                    className="
                      absolute left-0 top-0
                      h-0 w-[2px]
                      bg-solar
                      transition-[height]
                      duration-500
                      group-hover:h-full
                    "
                  />

                  <div
                    className="
                      mt-0.5
                      flex size-7 shrink-0
                      items-center justify-center
                      rounded-full
                      border border-ink/[0.08]
                      bg-paper
                      text-blue

                      transition-[background-color,color,border-color]
                      duration-300

                      group-hover:border-solar
                      group-hover:bg-solar
                      group-hover:text-ink
                    "
                  >
                    <Check
                      aria-hidden="true"
                      className="size-3.5"
                      strokeWidth={2}
                    />
                  </div>

                  <div className="min-w-0 flex-1">
                    <span
                      className="
                        block text-[8px]
                        font-semibold
                        tracking-[0.12em]
                        text-ink/18
                      "
                    >
                      {String(index + 1).padStart(2, "0")}
                    </span>

                    <p
                      className="
                        mt-1
                        text-[12px]
                        font-medium
                        leading-5
                        text-ink/65
                        sm:text-[13px]
                      "
                    >
                      {benefit}
                    </p>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </Container>
      </section>

      {/* ===================================================
          Enquiry
          =================================================== */}

      <section
        id="sponsorship-enquiry"
        aria-labelledby="sponsorship-enquiry-heading"
        className="
          relative isolate overflow-hidden
          bg-paper text-ink
        "
      >
        <div
          aria-hidden="true"
          className="
            pointer-events-none
            absolute -right-40 top-0
            size-[28rem]
            rounded-full
            bg-blue/[0.045]
            blur-[120px]
          "
        />

        <div
          aria-hidden="true"
          className="
            pointer-events-none
            absolute -bottom-40 -left-32
            size-[24rem]
            rounded-full
            bg-solar/[0.055]
            blur-[110px]
          "
        />

        <Container className="relative py-16 sm:py-20 lg:py-24">
          <motion.div
            initial={
              reduceMotion
                ? false
                : {
                    opacity: 0,
                    y: 15,
                  }
            }
            whileInView={{
              opacity: 1,
              y: 0,
            }}
            viewport={{
              once: true,
              amount: 0.2,
              margin: "-40px",
            }}
            transition={{
              duration: 0.55,
              ease: EASE,
            }}
            className="max-w-[720px]"
          >
            <SectionLabel tone="light">
              Get Started
            </SectionLabel>

            <h2
              id="sponsorship-enquiry-heading"
              className="
                mt-4
                font-display
                text-[clamp(2.1rem,3.45vw,3.55rem)]
                font-semibold
                leading-[0.98]
                tracking-[-0.035em]
                text-ink
              "
            >
              Start a Partnership

              <span className="block text-blue">
                Conversation
              </span>
            </h2>

            <p
              className="
                mt-5
                max-w-[620px]
                text-sm
                leading-7
                text-ink/52
                sm:text-[15px]
              "
            >
              Tell us what your brand wants to achieve and our
              partnership team can discuss suitable sponsorship,
              visibility and engagement opportunities.
            </p>
          </motion.div>

          {/* =================================================
              Partnership + Form
              ================================================= */}

          <motion.div
            variants={groupVariants}
            initial={reduceMotion ? false : "hidden"}
            whileInView="visible"
            viewport={{
              once: true,
              amount: 0.08,
              margin: "-50px",
            }}
            className="mt-10 lg:mt-12"
          >
            {/* ===============================================
                Compact full-width partnership banner
                =============================================== */}

            <motion.div
              variants={revealVariants}
              className="
                relative overflow-hidden
                rounded-2xl
                border border-paper/10
                bg-ink
                px-5 py-5
                text-paper

                sm:px-6
                lg:px-7 lg:py-6
              "
            >
              <span
                aria-hidden="true"
                className="
                  absolute inset-y-0 left-0
                  w-[2px]
                  bg-solar
                "
              />

              <div
                aria-hidden="true"
                className="
                  pointer-events-none
                  absolute -right-20 -top-24
                  size-56
                  rounded-full
                  bg-blue/[0.2]
                  blur-[80px]
                "
              />

              <motion.svg
                aria-hidden="true"
                viewBox="0 0 300 300"
                fill="none"
                className="
                  pointer-events-none
                  absolute -right-24 -top-24
                  size-[270px]
                  text-paper
                  opacity-[0.035]
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
                        duration: 150,
                        repeat: Infinity,
                        ease: "linear",
                      }
                }
              >
                <circle
                  cx="150"
                  cy="150"
                  r="55"
                  stroke="currentColor"
                />

                <circle
                  cx="150"
                  cy="150"
                  r="95"
                  stroke="currentColor"
                  strokeDasharray="3 12"
                />

                <circle
                  cx="150"
                  cy="150"
                  r="135"
                  stroke="currentColor"
                />

                <path
                  d="M150 15V285"
                  stroke="currentColor"
                />

                <path
                  d="M15 150H285"
                  stroke="currentColor"
                />

                <circle
                  cx="150"
                  cy="55"
                  r="5"
                  fill="#fbb216"
                  stroke="none"
                />
              </motion.svg>

              <div
                className="
                  relative
                  grid gap-5

                  md:grid-cols-[minmax(0,1fr)_auto]
                  md:items-center
                  md:gap-8
                "
              >
                <div className="flex items-start gap-4">
                  <div
                    className="
                      flex size-10 shrink-0
                      items-center justify-center
                      rounded-full
                      border border-paper/10
                      bg-paper/[0.05]
                      text-solar
                    "
                  >
                    <BadgeCheck
                      aria-hidden="true"
                      className="size-[17px]"
                      strokeWidth={1.8}
                    />
                  </div>

                  <div>
                    <span
                      className="
                        text-[9px]
                        font-semibold
                        uppercase
                        tracking-[0.14em]
                        text-solar
                      "
                    >
                      Partner With the Show
                    </span>

                    <h3
                      className="
                        mt-1.5
                        max-w-[700px]
                        font-display
                        text-[1.2rem]
                        font-semibold
                        leading-[1.08]
                        tracking-[-0.025em]
                        text-paper
                        sm:text-[1.3rem]
                      "
                    >
                      Build a Partnership Around Your Brand Objectives
                    </h3>

                    <p
                      className="
                        mt-2
                        max-w-[720px]
                        text-[11px]
                        leading-5
                        text-paper/42
                        sm:text-[12px]
                      "
                    >
                      Explore exhibition visibility, networking,
                      content, speaking and brand-association
                      opportunities tailored to your partnership
                      goals.
                    </p>
                  </div>
                </div>

                <Button
                  href="/contact"
                  variant="outline"
                  size="md"
                  className="
                    group/contact
                    w-full shrink-0
                    justify-between
                    gap-5
                    border-paper/15
                    bg-paper/[0.035]
                    text-paper

                    hover:border-solar
                    hover:bg-solar
                    hover:text-ink

                    md:w-auto
                    md:min-w-[220px]
                  "
                >
                  Contact Partnership Team

                  <ArrowUpRight
                    aria-hidden="true"
                    className="
                      size-4
                      transition-transform
                      duration-300
                      group-hover/contact:translate-x-0.5
                      group-hover/contact:-translate-y-0.5
                    "
                    strokeWidth={1.8}
                  />
                </Button>
              </div>
            </motion.div>

            {/* ===============================================
                Equal-height columns
                =============================================== */}

            <div
              className="
                mt-4
                grid
                gap-4

                lg:grid-cols-[minmax(0,1.12fr)_minmax(320px,0.88fr)]
                lg:items-stretch
                lg:gap-4
              "
            >
              {/* Form */}

              <motion.div
                variants={revealVariants}
                className="
                  relative
                  flex h-full min-h-0
                  flex-col
                  overflow-hidden
                  rounded-2xl
                  border border-ink/[0.08]
                  bg-paper
                  p-5
                  shadow-[0_14px_42px_rgba(25,25,25,0.045)]

                  sm:p-6
                  lg:p-7
                "
              >
                <span
                  aria-hidden="true"
                  className="
                    absolute inset-x-0 top-0
                    h-[2px]
                    bg-solar
                  "
                />

                <div
                  aria-hidden="true"
                  className="
                    pointer-events-none
                    absolute -right-20 -top-20
                    size-56 rounded-full
                    bg-blue/[0.035]
                    blur-[80px]
                  "
                />

                <div
                  className="
                    relative
                    mb-5
                    flex items-center gap-3
                    border-b border-ink/[0.07]
                    pb-4
                  "
                >
                  <div
                    className="
                      flex size-9 shrink-0
                      items-center justify-center
                      rounded-full
                      bg-blue
                      text-paper
                    "
                  >
                    <Handshake
                      aria-hidden="true"
                      className="size-4"
                      strokeWidth={1.75}
                    />
                  </div>

                  <div>
                    <span
                      className="
                        text-[8px]
                        font-semibold
                        uppercase
                        tracking-[0.14em]
                        text-blue
                      "
                    >
                      Partnership Team
                    </span>

                    <h3
                      className="
                        mt-0.5
                        font-display
                        text-[1.15rem]
                        font-semibold
                        leading-tight
                        tracking-[-0.025em]
                        text-ink
                        sm:text-[1.2rem]
                      "
                    >
                      Sponsorship Enquiry Form
                    </h3>
                  </div>
                </div>

                <div className="relative flex min-h-0 flex-1 flex-col">
                  <SponsorshipEnquiryForm />
                </div>
              </motion.div>

              {/* Contacts */}

              <motion.aside
                variants={revealVariants}
                className="h-full min-h-0"
              >
                <ContactCards />
              </motion.aside>
            </div>
          </motion.div>

          <motion.div
            initial={
              reduceMotion
                ? false
                : {
                    opacity: 0,
                    scaleX: 0,
                  }
            }
            whileInView={{
              opacity: 1,
              scaleX: 1,
            }}
            viewport={{
              once: true,
            }}
            transition={{
              duration: 0.9,
              delay: 0.1,
              ease: EASE,
            }}
            className="
              mt-9
              h-px
              origin-left
              bg-gradient-to-r
              from-solar/70
              via-ink/10
              to-transparent
            "
            aria-hidden="true"
          />
        </Container>
      </section>
    </>
  );
}