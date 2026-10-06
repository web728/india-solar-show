"use client";

import {
  Download,
  FileText,
  PanelsTopLeft,
  Sparkles,
  Target,
} from "lucide-react";

import { motion, useReducedMotion } from "framer-motion";

import { Container } from "@/components/ui/Container";
import { BrochureDownloadForm } from "@/components/forms/BrochureDownloadForm";

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

function BrochureBackground({
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
          bg-solar/[0.075]
          blur-[125px]
        "
      />

      <div
        className="
          absolute
          -bottom-44
          -left-40
          size-[30rem]
          rounded-full
          bg-blue/[0.05]
          blur-[125px]
        "
      />

      <motion.svg
        viewBox="0 0 900 900"
        fill="none"
        className="
          absolute
          -right-[370px]
          -top-[370px]
          size-[850px]
          text-blue
          opacity-[0.028]

          sm:-right-[300px]
          sm:size-[930px]

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
                duration: 175,

                repeat: Infinity,

                ease: "linear",
              }
        }
      >
        <circle cx="450" cy="450" r="120" stroke="currentColor" />

        <circle
          cx="450"
          cy="450"
          r="215"
          stroke="currentColor"
          strokeDasharray="4 16"
        />

        <circle cx="450" cy="450" r="315" stroke="currentColor" />

        <circle
          cx="450"
          cy="450"
          r="395"
          stroke="currentColor"
          strokeDasharray="2 23"
        />

        <path d="M450 28V872" stroke="currentColor" />

        <path d="M28 450H872" stroke="currentColor" />

        <circle cx="450" cy="135" r="6" fill="#fbb216" stroke="none" />
      </motion.svg>
    </div>
  );
}

/* =========================================================
   Experience
   ========================================================= */

export function BrochureDownloadExperience() {
  const reduceMotion = useReducedMotion();

  const highlights = [
    {
      icon: FileText,

      label: "Event Overview",

      text: "Key show information, dates, venue and participation context.",
    },

    {
      icon: Target,

      label: "Industry Focus",

      text: "Solar, energy storage, clean mobility and related technologies.",
    },

    {
      icon: PanelsTopLeft,

      label: "Participation",

      text: "Understand exhibitor, visitor and partnership opportunities.",
    },
  ];

  return (
    <section
      aria-labelledby="brochure-download-heading"
      className="
        relative
        isolate
        overflow-hidden
        bg-paper
        text-ink
      "
    >
      <BrochureBackground reduceMotion={reduceMotion} />

      <Container
        className="
          relative
          py-16

          sm:py-20

          lg:py-24
        "
      >
        {/* =================================================
            Intro
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
                  text-blue

                  sm:text-[11px]
                "
              >
                Official Brochure
              </span>
            </div>

            <h2
              id="brochure-download-heading"
              className="
                mt-4
                max-w-[690px]
                font-display
                text-[clamp(2.15rem,3.55vw,3.65rem)]
                font-semibold
                leading-[0.98]
                tracking-[-0.035em]
                text-ink
              "
            >
              Get the Show Overview
              <span
                className="
                  block
                  text-blue
                "
              >
                in One Download
              </span>
            </h2>
          </motion.div>

          <motion.p
            variants={revealVariants}
            className="
              max-w-[500px]
              text-sm
              leading-7
              text-ink/52

              sm:text-[15px]

              lg:justify-self-end
            "
          >
            Submit your details to access the official brochure and explore the
            event format, focus sectors and participation opportunities.
          </motion.p>
        </motion.div>

        {/* =================================================
            Highlights
            ================================================= */}

        <motion.div
          variants={groupVariants}
          initial={reduceMotion ? false : "hidden"}
          whileInView="visible"
          viewport={{
            once: true,

            amount: 0.1,

            margin: "-30px",
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
          {highlights.map((item, index) => {
            const Icon = item.icon;

            return (
              <motion.div
                key={item.label}
                variants={revealVariants}
                className="
                    group
                    relative
                    flex
                    min-h-[108px]
                    items-start
                    gap-3.5
                    border-ink/[0.08]
                    p-4

                    transition-colors
                    duration-300

                    hover:bg-solar/[0.035]

                    max-sm:border-b
                    max-sm:last:border-b-0

                    sm:border-r
                    sm:last:border-r-0

                    sm:p-5
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

                      transition-[background-color,color,border-color]
                      duration-300

                      group-hover:border-solar
                      group-hover:bg-solar
                      group-hover:text-ink
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
                        text-[9px]
                        font-semibold
                        uppercase
                        tracking-[0.12em]
                        text-blue
                      "
                  >
                    {item.label}
                  </span>

                  <p
                    className="
                        mt-1.5
                        max-w-[270px]
                        text-[11px]
                        leading-5
                        text-ink/45
                      "
                  >
                    {item.text}
                  </p>
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
            Form + brochure preview
            ================================================= */}

        <motion.div
          variants={groupVariants}
          initial={reduceMotion ? false : "hidden"}
          whileInView="visible"
          viewport={{
            once: true,

            amount: 0.06,

            margin: "-50px",
          }}
          className="
            mt-4
            grid
            gap-4

            lg:grid-cols-[minmax(0,1.08fr)_minmax(320px,0.92fr)]
            lg:items-stretch
          "
        >
          {/* =================================================
              Form
              ================================================= */}

          <motion.div
            variants={revealVariants}
            className="
              relative
              flex
              h-full
              min-h-0
              flex-col
              overflow-hidden
              rounded-2xl
              border
              border-ink/[0.08]
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
                absolute
                inset-x-0
                top-0
                h-[2px]
                bg-solar
              "
            />

            <div
              aria-hidden="true"
              className="
                absolute
                -right-20
                -top-20
                size-56
                rounded-full
                bg-blue/[0.035]
                blur-[80px]
              "
            />

            <div
              className="
                relative
                mb-5
                flex
                items-center
                gap-3
                border-b
                border-ink/[0.07]
                pb-4
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
                  bg-blue
                  text-paper
                "
              >
                <Download
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
                  Download Access
                </span>

                <h3
                  className="
                    mt-0.5
                    font-display
                    text-[1.15rem]
                    font-semibold
                    tracking-[-0.025em]
                    text-ink

                    sm:text-[1.2rem]
                  "
                >
                  Get the Event Brochure
                </h3>
              </div>
            </div>

            <div
              className="
                relative
                flex
                min-h-0
                flex-1
                flex-col
              "
            >
              <BrochureDownloadForm />
            </div>
          </motion.div>

          {/* =================================================
              Brochure visual
              ================================================= */}

          <motion.aside
            variants={revealVariants}
            className="
              relative
              flex
              h-full
              min-h-[430px]
              overflow-hidden
              rounded-2xl
              bg-ink
              p-5
              text-paper

              sm:p-6

              lg:min-h-0
              lg:p-7
            "
          >
            <span
              aria-hidden="true"
              className="
                absolute
                inset-y-0
                left-0
                w-[2px]
                bg-solar
              "
            />

            <div
              aria-hidden="true"
              className="
                absolute
                -right-24
                -top-20
                size-72
                rounded-full
                bg-blue/[0.22]
                blur-[90px]
              "
            />

            <motion.svg
              viewBox="0 0 500 500"
              fill="none"
              aria-hidden="true"
              className="
                absolute
                -right-44
                -top-40
                size-[470px]
                text-paper
                opacity-[0.045]
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
                      duration: 145,

                      repeat: Infinity,

                      ease: "linear",
                    }
              }
            >
              <circle cx="250" cy="250" r="90" stroke="currentColor" />

              <circle
                cx="250"
                cy="250"
                r="155"
                stroke="currentColor"
                strokeDasharray="3 15"
              />

              <circle cx="250" cy="250" r="225" stroke="currentColor" />
            </motion.svg>

            <div
              className="
                relative
                z-10
                flex
                h-full
                w-full
                flex-col
              "
            >
              <div
                className="
                  flex
                  items-start
                  justify-between
                  gap-4
                "
              >
                <div
                  className="
                    flex
                    size-10
                    items-center
                    justify-center
                    rounded-full
                    border
                    border-paper/10
                    bg-paper/[0.05]
                    text-solar
                  "
                >
                  <FileText
                    aria-hidden="true"
                    className="size-[17px]"
                    strokeWidth={1.75}
                  />
                </div>

                <span
                  className="
                    text-[8px]
                    font-semibold
                    uppercase
                    tracking-[0.14em]
                    text-paper/24
                  "
                >
                  Official PDF
                </span>
              </div>

              <div
                className="
                  my-auto
                  py-10
                "
              >
                <span
                  className="
                    text-[9px]
                    font-semibold
                    uppercase
                    tracking-[0.15em]
                    text-solar
                  "
                >
                  India International Solar Show
                </span>

                <h3
                  className="
                    mt-3
                    max-w-[420px]
                    font-display
                    text-[clamp(2rem,4vw,3rem)]
                    font-semibold
                    leading-[0.96]
                    tracking-[-0.04em]
                    text-paper
                  "
                >
                  Event Brochure
                  <span
                    className="
                      block
                      text-solar
                    "
                  >
                    2026
                  </span>
                </h3>

                <p
                  className="
                    mt-4
                    max-w-[390px]
                    text-[12px]
                    leading-6
                    text-paper/42
                  "
                >
                  A concise introduction to the show, participation
                  opportunities and the technologies shaping India&apos;s
                  clean-energy ecosystem.
                </p>
              </div>

              <div
                className="
                  border-t
                  border-paper/10
                  pt-4
                "
              >
                <div
                  className="
                    flex
                    flex-wrap
                    items-center
                    gap-x-4
                    gap-y-2
                  "
                >
                  {["Solar", "Storage", "Clean Mobility"].map((item) => (
                    <span
                      key={item}
                      className="
                          flex
                          items-center
                          gap-2
                          text-[8px]
                          font-semibold
                          uppercase
                          tracking-[0.12em]
                          text-paper/30
                        "
                    >
                      <span
                        className="
                            size-1
                            rounded-full
                            bg-solar
                          "
                      />

                      {item}
                    </span>
                  ))}
                </div>

                <div
                  className="
                    mt-5
                    flex
                    items-center
                    justify-between
                    gap-3
                  "
                >
                  <span
                    className="
                      text-[9px]
                      font-semibold
                      uppercase
                      tracking-[0.13em]
                      text-paper/22
                    "
                  >
                    Pune · October 2026
                  </span>

                  <Sparkles
                    aria-hidden="true"
                    className="
                      size-3.5
                      text-solar
                    "
                    strokeWidth={1.8}
                  />
                </div>
              </div>
            </div>
          </motion.aside>
        </motion.div>
      </Container>
    </section>
  );
}
