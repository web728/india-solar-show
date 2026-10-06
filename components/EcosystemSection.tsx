"use client";

import Image from "next/image";

import { ArrowUpRight, Equal, Plus } from "lucide-react";

import { motion, useReducedMotion } from "framer-motion";

import { CO_LOCATED } from "@/data/siteData";

import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";

/* =========================================================
   Data
   ========================================================= */

const PLATFORMS = [
  {
    name: "India International Solar Show 2026",
    edition: "",
    logo: "/logos/india-solar-logo.png",
    website: "https://indiasolarshow.com/",
    blurb:
      "India's premier B2B solar exhibition in Pune focusing on solar PV manufacturing, rooftop solar systems, utility-scale projects, and hybrid renewable energy solutions.",
    role: "Solar Generation",
  },
  ...CO_LOCATED.map((item, index) => ({
    ...item,
    role: index === 0 ? "Battery Storage" : "E-Mobility",
  })),
] as const;

const ECOSYSTEM_ITEMS = [
  "Solar Energy Generation",
  "Battery Energy Storage (BESS)",
  "EV & Clean Mobility",
] as const;

/* =========================================================
   Motion
   ========================================================= */

const EASE = [0.16, 1, 0.3, 1] as const;

const groupVariants = {
  hidden: {},

  visible: {
    transition: {
      staggerChildren: 0.06,
      delayChildren: 0.04,
    },
  },
};

const revealVariants = {
  hidden: {
    opacity: 0,
    y: 16,
  },

  visible: {
    opacity: 1,
    y: 0,

    transition: {
      duration: 0.56,
      ease: EASE,
    },
  },
};

/* =========================================================
   Background
   ========================================================= */

function EcosystemBackground({
  reduceMotion,
}: {
  reduceMotion: boolean | null;
}) {
  return (
    <div
      aria-hidden="true"
      className="
        pointer-events-none
        absolute
        inset-0
        -z-10
        overflow-hidden
      "
    >
      {/* Blue atmosphere */}

      <div
        className="
          absolute
          -left-56
          top-[20%]
          size-[36rem]
          rounded-full
          bg-blue/[0.14]
          blur-[130px]
        "
      />

      {/* Solar atmosphere */}

      <div
        className="
          absolute
          -right-48
          -top-36
          size-[32rem]
          rounded-full
          bg-solar/[0.07]
          blur-[110px]
        "
      />

      {/* Main solar geometry */}

      <motion.svg
        viewBox="0 0 900 900"
        fill="none"
        className="
          absolute
          -right-[340px]
          -top-[360px]
          size-[840px]
          text-paper
          opacity-[0.03]

          sm:-right-[280px]
          sm:size-[920px]

          lg:-right-[220px]
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
                duration: 135,
                repeat: Infinity,
                ease: "linear",
              }
        }
      >
        <circle cx="450" cy="450" r="150" stroke="currentColor" />

        <circle
          cx="450"
          cy="450"
          r="240"
          stroke="currentColor"
          strokeDasharray="4 16"
        />

        <circle cx="450" cy="450" r="350" stroke="currentColor" />

        <path d="M450 30V870" stroke="currentColor" />

        <path d="M30 450H870" stroke="currentColor" />

        <path d="M153 153L747 747" stroke="currentColor" />

        <path d="M747 153L153 747" stroke="currentColor" />

        <circle cx="450" cy="450" r="8" fill="#fbb216" />
      </motion.svg>

      {/* Bottom counter-rotation */}

      <motion.svg
        viewBox="0 0 420 420"
        fill="none"
        className="
          absolute
          -bottom-36
          -left-36
          hidden
          size-[460px]
          text-solar
          opacity-[0.035]

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
                duration: 165,
                repeat: Infinity,
                ease: "linear",
              }
        }
      >
        <circle cx="210" cy="210" r="90" stroke="currentColor" />

        <circle
          cx="210"
          cy="210"
          r="150"
          stroke="currentColor"
          strokeDasharray="3 13"
        />

        <circle cx="210" cy="210" r="195" stroke="currentColor" />

        <path d="M210 20V400" stroke="currentColor" />

        <path d="M20 210H400" stroke="currentColor" />
      </motion.svg>
    </div>
  );
}

/* =========================================================
   Ecosystem Section
   ========================================================= */

export function EcosystemSection() {
  const reduceMotion = useReducedMotion();

  return (
    <section
      aria-labelledby="ecosystem-heading"
      className="
        relative
        isolate
        overflow-hidden
        bg-ink
        text-paper
      "
    >
      <EcosystemBackground reduceMotion={reduceMotion} />

      <Container
        className="
          relative
          py-16
          sm:py-20
          lg:py-24
        "
      >
        {/* =================================================
            Heading
            ================================================= */}

        <motion.div
          variants={groupVariants}
          initial={reduceMotion ? false : "hidden"}
          whileInView="visible"
          viewport={{
            once: true,
            amount: 0.16,
            margin: "-40px",
          }}
          className="
            grid
            gap-8
            border-b
            border-paper/10
            pb-10

            lg:grid-cols-[1fr_0.8fr]
            lg:items-end
            lg:gap-16
            lg:pb-12
          "
        >
          <motion.div variants={revealVariants}>
            <div
              className="
                flex
                items-center
                gap-3
              "
            >
              <span
                aria-hidden="true"
                className="
                  h-px
                  w-7
                  bg-solar
                "
              />

              <span
                className="
                  text-[10px]
                  font-semibold
                  uppercase
                  tracking-[0.16em]
                  text-solar

                  sm:text-[11px]
                "
              >
                Co-located Clean Energy Ecosystem 2026
              </span>
            </div>

            <h2
              id="ecosystem-heading"
              className="
                mt-4
                max-w-[700px]
                font-display
                text-[clamp(2.25rem,3.8vw,4rem)]
                font-semibold
                leading-[0.98]
                tracking-[-0.035em]
                text-paper
              "
            >
              Integrated Solar, Storage
              <span className="block text-solar">
                &amp; E-Mobility Trade Shows
              </span>
            </h2>
          </motion.div>

          <motion.p
            variants={revealVariants}
            className="
              max-w-[520px]
              text-sm
              leading-7
              text-paper/48

              sm:text-[15px]

              lg:justify-self-end
            "
          >
            Three co-located clean-energy platforms bringing together solar,
            battery storage and electric mobility industries in Pune.
          </motion.p>
        </motion.div>

        {/* =================================================
            Platform Cards
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
          className="
            relative
            mt-10

            lg:mt-12
          "
        >
          {/* Desktop connector */}

          <div
            aria-hidden="true"
            className="
              pointer-events-none
              absolute
              left-[16.66%]
              right-[16.66%]
              top-[22px]
              hidden

              lg:block
            "
          >
            <div className="h-px bg-paper/10" />

            {[0, 50, 100].map((position) => (
              <span
                key={position}
                className="
                  absolute
                  top-1/2
                  size-2
                  -translate-x-1/2
                  -translate-y-1/2
                  rounded-full
                  bg-solar
                "
                style={{
                  left: `${position}%`,
                }}
              />
            ))}
          </div>

          <div
            className="
              grid
              gap-4

              md:grid-cols-2

              lg:grid-cols-3
            "
          >
            {PLATFORMS.map((platform, index) => (
              <motion.article
                key={platform.name}
                variants={revealVariants}
                className="
                  group
                  relative
                  min-h-[360px]
                  overflow-hidden
                  rounded-2xl
                  border
                  border-paper/10
                  bg-paper/[0.035]
                  p-5
                  backdrop-blur-sm

                  transition-[border-color,background-color,box-shadow]
                  duration-500
                  ease-out

                  hover:border-solar/25
                  hover:bg-paper/[0.05]
                  hover:shadow-[0_22px_60px_rgba(0,0,0,0.18)]

                  sm:p-6

                  lg:min-h-[380px]
                "
              >
                {/* Top accent */}

                <span
                  aria-hidden="true"
                  className="
                    absolute
                    inset-x-0
                    top-0
                    h-[2px]
                    origin-left
                    scale-x-0
                    bg-solar

                    transition-transform
                    duration-500
                    ease-out

                    group-hover:scale-x-100
                  "
                />

                {/* Background index */}

                <span
                  aria-hidden="true"
                  className="
                    pointer-events-none
                    absolute
                    -bottom-4
                    -right-2
                    font-display
                    text-[5rem]
                    font-semibold
                    leading-none
                    tracking-[-0.07em]
                    text-paper/[0.025]
                  "
                >
                  {String(index + 1).padStart(2, "0")}
                </span>

                <div
                  className="
                    relative
                    z-10
                    flex
                    h-full
                    flex-col
                  "
                >
                  {/* Meta */}

                  <div
                    className="
                      flex
                      min-h-7
                      items-start
                      justify-between
                      gap-4
                    "
                  >
                    <span
                      className="
                        text-[9px]
                        font-semibold
                        uppercase
                        leading-5
                        tracking-[0.15em]
                        text-solar

                        sm:text-[10px]
                      "
                    >
                      {String(index + 1).padStart(2, "0")}
                      {" · "}
                      {platform.role}
                    </span>

                    {platform.edition ? (
                      <span
                        className="
                          shrink-0
                          rounded-full
                          border
                          border-paper/10
                          bg-paper/[0.035]
                          px-2.5
                          py-1
                          text-[8px]
                          font-semibold
                          uppercase
                          tracking-[0.12em]
                          text-paper/45
                        "
                      >
                        {platform.edition}
                      </span>
                    ) : null}
                  </div>

                  {/* Logo */}

                  <div
                    className="
                      mt-5
                      flex
                      h-[105px]
                      items-center
                      justify-center
                      overflow-hidden
                      rounded-xl
                      border
                      border-paper/10
                      bg-paper
                      px-5
                      py-4
                    "
                  >
                    <Image
                      src={platform.logo}
                      alt={`${platform.name} logo`}
                      width={250}
                      height={90}
                      className="
                        max-h-[62px]
                        w-auto
                        max-w-[86%]
                        object-contain
                      "
                    />
                  </div>

                  {/* Content */}

                  <div className="mt-6">
                    <h3
                      className="
                        max-w-[340px]
                        font-display
                        text-[1.22rem]
                        font-semibold
                        leading-[1.08]
                        tracking-[-0.02em]
                        text-paper

                        sm:text-[1.3rem]
                      "
                    >
                      {platform.name}
                    </h3>

                    <p
                      className="
                        mt-3
                        max-w-sm
                        text-[13px]
                        leading-6
                        text-paper/45
                      "
                    >
                      {platform.blurb}
                    </p>
                  </div>

                  {/* Website */}

                  <div
                    className="
                      mt-auto
                      pt-6
                    "
                  >
                    <span
                      aria-hidden="true"
                      className="
                        mb-4
                        block
                        h-px
                        w-8
                        bg-paper/15

                        transition-[width,background-color]
                        duration-500
                        ease-out

                        group-hover:w-14
                        group-hover:bg-solar
                      "
                    />

                    <a
                      href={platform.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="
                        group/link
                        inline-flex
                        items-center
                        gap-2
                        text-[10px]
                        font-semibold
                        uppercase
                        tracking-[0.13em]
                        text-paper/50

                        transition-colors
                        duration-300

                        hover:text-solar
                      "
                    >
                      Visit Website
                      <ArrowUpRight
                        aria-hidden="true"
                        className="
                          size-3.5

                          transition-transform
                          duration-300

                          group-hover/link:translate-x-0.5
                          group-hover/link:-translate-y-0.5
                        "
                        strokeWidth={1.8}
                      />
                    </a>
                  </div>
                </div>
              </motion.article>
            ))}
          </div>
        </motion.div>

        {/* =================================================
            Ecosystem Equation
            ================================================= */}

        <motion.div
          initial={
            reduceMotion
              ? false
              : {
                  opacity: 0,
                  y: 16,
                }
          }
          whileInView={{
            opacity: 1,
            y: 0,
          }}
          viewport={{
            once: true,
            amount: 0.18,
            margin: "-30px",
          }}
          transition={{
            duration: 0.56,
            ease: EASE,
          }}
          className="
            mt-10
            overflow-hidden
            rounded-2xl
            border
            border-paper/10
            bg-paper/[0.03]
            px-5
            py-6
            backdrop-blur-sm

            sm:px-6
            sm:py-7

            lg:mt-12
          "
        >
          <div
            className="
              flex
              flex-col
              items-center
              justify-center
              gap-3

              lg:flex-row
              lg:flex-wrap
              lg:gap-3
            "
          >
            {ECOSYSTEM_ITEMS.map((label, index) => (
              <div
                key={label}
                className="
                  flex
                  w-full
                  flex-col
                  items-center
                  gap-3

                  lg:w-auto
                  lg:flex-row
                "
              >
                <div
                  className="
                    flex
                    min-h-[48px]
                    w-full
                    items-center
                    justify-center
                    rounded-xl
                    border
                    border-paper/10
                    bg-paper/[0.035]
                    px-4
                    py-2.5
                    text-center
                    text-[12px]
                    font-medium
                    leading-5
                    text-paper/70

                    lg:w-auto
                    lg:min-w-[190px]
                  "
                >
                  {label}
                </div>

                {index < ECOSYSTEM_ITEMS.length - 1 ? (
                  <div
                    className="
                      flex
                      size-7
                      shrink-0
                      items-center
                      justify-center
                      rounded-full
                      border
                      border-solar/25
                      bg-solar/[0.06]
                      text-solar
                    "
                  >
                    <Plus
                      aria-hidden="true"
                      className="size-3.5"
                      strokeWidth={1.8}
                    />
                  </div>
                ) : null}
              </div>
            ))}

            <div
              className="
                flex
                size-7
                shrink-0
                items-center
                justify-center
                rounded-full
                border
                border-solar/25
                bg-solar/[0.06]
                text-solar
              "
            >
              <Equal
                aria-hidden="true"
                className="size-3.5"
                strokeWidth={1.8}
              />
            </div>

            <div
              className="
                flex
                min-h-[48px]
                w-full
                items-center
                justify-center
                rounded-xl
                bg-solar
                px-5
                py-2.5
                text-center
                text-[12px]
                font-semibold
                leading-5
                text-ink

                lg:w-auto
                lg:min-w-[240px]
              "
            >
              Integrated Clean Energy Ecosystem 2026
            </div>
          </div>
        </motion.div>

        {/* =================================================
            CTA
            ================================================= */}

        <motion.div
          initial={
            reduceMotion
              ? false
              : {
                  opacity: 0,
                  y: 12,
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
            duration: 0.52,
            ease: EASE,
          }}
          className="
            mt-8
            flex
            justify-center
          "
        >
          <Button
            href="/about"
            variant="outline"
            size="lg"
            className="
              border-paper/15
              bg-paper/[0.025]
              text-paper

              hover:border-solar
              hover:bg-solar
              hover:text-ink
            "
          >
            Explore the Co-located Ecosystem
          </Button>
        </motion.div>
      </Container>
    </section>
  );
}
