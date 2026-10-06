"use client";

import {
  ArrowUpRight,
  BadgeCheck,
  Handshake,
  PanelsTopLeft,
  ScanSearch,
  Users,
  Zap,
} from "lucide-react";

import { motion, useReducedMotion } from "framer-motion";

import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";

/* =========================================================
   Constants
   ========================================================= */

const VISITOR_URL = "https://app.warpbay.com/qPMIy6ii";

const EASE = [0.16, 1, 0.3, 1] as const;

/* =========================================================
   Motion
   ========================================================= */

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
   Visitor Benefits
   ========================================================= */

const BENEFITS = [
  {
    icon: PanelsTopLeft,
    number: "01",
    label: "Discover",
    title: "Latest Technologies",
    description:
      "Explore solar PV, storage and integrated clean-energy solutions.",
  },

  {
    icon: Users,
    number: "02",
    label: "Meet",
    title: "Industry Suppliers",
    description:
      "Connect directly with manufacturers, EPCs and solution providers.",
  },

  {
    icon: Handshake,
    number: "03",
    label: "Connect",
    title: "B2B Opportunities",
    description: "Build new supplier, technology and commercial relationships.",
  },

  {
    icon: ScanSearch,
    number: "04",
    label: "Compare",
    title: "Solutions in One Place",
    description:
      "Evaluate technologies and suppliers across the clean-energy value chain.",
  },
] as const;

/* =========================================================
   Background
   ========================================================= */

function VisitorBackground({ reduceMotion }: { reduceMotion: boolean | null }) {
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
      {/* Solar glow */}

      <div
        className="
          absolute
          -right-40
          -top-40
          size-[30rem]
          rounded-full
          bg-solar/[0.08]
          blur-[120px]
        "
      />

      {/* Blue depth */}

      <div
        className="
          absolute
          -bottom-48
          left-[18%]
          size-[30rem]
          rounded-full
          bg-blue/[0.05]
          blur-[130px]
        "
      />

      {/* Main rotating solar geometry */}

      <motion.svg
        viewBox="0 0 900 900"
        fill="none"
        className="
          absolute
          -right-[380px]
          -top-[380px]
          size-[850px]
          text-blue
          opacity-[0.035]

          sm:-right-[310px]
          sm:size-[930px]

          lg:-right-[210px]
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
                duration: 160,
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

        <circle cx="450" cy="125" r="7" fill="#fbb216" stroke="none" />

        <circle cx="775" cy="450" r="4" fill="currentColor" stroke="none" />
      </motion.svg>

      {/* Counter orbit */}

      <motion.svg
        viewBox="0 0 480 480"
        fill="none"
        className="
          absolute
          -bottom-52
          -left-44
          hidden
          size-[500px]
          text-solar
          opacity-[0.045]

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
        <circle cx="240" cy="240" r="95" stroke="currentColor" />

        <circle
          cx="240"
          cy="240"
          r="160"
          stroke="currentColor"
          strokeDasharray="3 14"
        />

        <circle cx="240" cy="240" r="225" stroke="currentColor" />

        <path d="M240 15V465" stroke="currentColor" />

        <path d="M15 240H465" stroke="currentColor" />
      </motion.svg>
    </div>
  );
}

/* =========================================================
   Component
   ========================================================= */

export function VisitorExperience() {
  const reduceMotion = useReducedMotion();

  return (
    <section
      aria-labelledby="visitor-experience-heading"
      className="
        relative
        isolate
        overflow-hidden
        border-b
        border-ink/[0.08]
        bg-paper
        text-ink
      "
    >
      <VisitorBackground reduceMotion={reduceMotion} />

      <Container
        className="
          relative
          py-14

          sm:py-16

          lg:py-20
        "
      >
        {/* =================================================
            Main intro
            ================================================= */}

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
            grid
            gap-8

            lg:grid-cols-[minmax(0,1fr)_340px]
            lg:items-center
            lg:gap-14
          "
        >
          {/* Left */}

          <div>
            <motion.div
              variants={revealVariants}
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
                Visitor Experience
              </span>
            </motion.div>

            <motion.h2
              id="visitor-experience-heading"
              variants={revealVariants}
              className="
                mt-4
                max-w-[720px]
                font-display
                text-[clamp(2.1rem,3.45vw,3.6rem)]
                font-semibold
                leading-[0.98]
                tracking-[-0.035em]
                text-ink
              "
            >
              Discover Technologies.
              <span
                className="
                  block
                  text-blue
                "
              >
                Build Industry Connections.
              </span>
            </motion.h2>

            <motion.p
              variants={revealVariants}
              className="
                mt-5
                max-w-[640px]
                text-sm
                leading-7
                text-ink/52

                sm:text-[15px]
              "
            >
              Experience three days of technology discovery, supplier meetings,
              business networking and conversations across the solar, storage
              and clean-energy ecosystem.
            </motion.p>

            {/* CTAs */}

            <motion.div
              variants={revealVariants}
              className="
                mt-6
                flex
                flex-col
                gap-2.5

                sm:flex-row
                sm:items-center
              "
            >
              <Button
                href={VISITOR_URL}
                external
                size="md"
                className="
                  group/pass
                  justify-between
                  gap-5
                "
              >
                Register Free
                <ArrowUpRight
                  aria-hidden="true"
                  className="
                    size-4

                    transition-transform
                    duration-300

                    group-hover/pass:translate-x-0.5
                    group-hover/pass:-translate-y-0.5
                  "
                  strokeWidth={1.8}
                />
              </Button>

              <Button
                href="/venue"
                variant="outline"
                size="md"
                className="
                  border-ink/12
                  bg-paper/70
                  text-ink

                  hover:border-blue
                  hover:bg-blue
                  hover:text-paper
                "
              >
                Plan Your Visit
              </Button>
            </motion.div>
          </div>

          {/* =================================================
              Free Pass Panel
              ================================================= */}

          <motion.div
            variants={revealVariants}
            className="
              relative
              overflow-hidden
              rounded-2xl
              border
              border-ink/[0.08]
              bg-ink
              p-5
              text-paper
              shadow-[0_18px_55px_rgba(25,25,25,0.12)]

              sm:p-6
            "
          >
            {/* Accent */}

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

            {/* glow */}

            <div
              aria-hidden="true"
              className="
                absolute
                -right-12
                -top-14
                size-40
                rounded-full
                bg-blue/[0.18]
                blur-[60px]
              "
            />

            <div
              className="
                relative
                flex
                items-start
                justify-between
                gap-5
              "
            >
              <div
                className="
                  flex
                  size-10
                  items-center
                  justify-center
                  rounded-full
                  bg-solar
                  text-ink
                "
              >
                <BadgeCheck
                  aria-hidden="true"
                  className="
                    size-[18px]
                  "
                  strokeWidth={1.8}
                />
              </div>

              <span
                className="
                  text-[9px]
                  font-semibold
                  uppercase
                  tracking-[0.14em]
                  text-paper/28
                "
              >
                2026
              </span>
            </div>

            <div
              className="
                relative
                mt-7
              "
            >
              <span
                className="
                  text-[9px]
                  font-semibold
                  uppercase
                  tracking-[0.14em]
                  text-solar
                "
              >
                Visitor Trade Pass
              </span>

              <h3
                className="
                  mt-2
                  font-display
                  text-[1.55rem]
                  font-semibold
                  leading-[1]
                  tracking-[-0.03em]

                  sm:text-[1.7rem]
                "
              >
                Your Access to the Clean-Energy Marketplace
              </h3>

              <p
                className="
                  mt-4
                  text-[12px]
                  leading-5
                  text-paper/45
                "
              >
                Register your visitor pass and connect with exhibitors,
                suppliers and clean-energy professionals in Pune.
              </p>
            </div>

            {/* Pass metadata */}

            <div
              className="
                relative
                mt-6
                grid
                grid-cols-2
                overflow-hidden
                rounded-xl
                border
                border-paper/10
              "
            >
              <div
                className="
                  border-r
                  border-paper/10
                  p-3
                "
              >
                <span
                  className="
                    block
                    text-[8px]
                    font-semibold
                    uppercase
                    tracking-[0.12em]
                    text-paper/25
                  "
                >
                  Dates
                </span>

                <span
                  className="
                    mt-1
                    block
                    text-[11px]
                    font-semibold
                    text-paper/75
                  "
                >
                  02–04 Oct.
                </span>
              </div>

              <div
                className="
                  p-3
                "
              >
                <span
                  className="
                    block
                    text-[8px]
                    font-semibold
                    uppercase
                    tracking-[0.12em]
                    text-paper/25
                  "
                >
                  City
                </span>

                <span
                  className="
                    mt-1
                    block
                    text-[11px]
                    font-semibold
                    text-paper/75
                  "
                >
                  Pune
                </span>
              </div>
            </div>
          </motion.div>
        </motion.div>

        {/* =================================================
            Benefit Grid
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
            mt-10
            grid
            overflow-hidden
            rounded-2xl
            border
            border-ink/[0.08]
            bg-paper/80
            backdrop-blur-sm

            sm:grid-cols-2

            lg:mt-12
            lg:grid-cols-4
          "
        >
          {BENEFITS.map(({ icon: Icon, number, label, title, description }) => (
            <motion.article
              key={title}
              variants={revealVariants}
              className="
                  group
                  relative
                  min-h-[205px]
                  overflow-hidden
                  border-ink/[0.08]
                  p-5

                  transition-colors
                  duration-400

                  hover:bg-solar/[0.035]

                  max-sm:border-b
                  max-sm:last:border-b-0

                  sm:border-r
                  sm:[&:nth-child(2n)]:border-r-0
                  sm:[&:nth-child(-n+2)]:border-b

                  lg:min-h-[220px]
                  lg:border-r
                  lg:border-b-0
                  lg:p-6
                  lg:[&:nth-child(2n)]:border-r
                  lg:last:border-r-0
                "
            >
              {/* Hover accent */}

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

                    group-hover:scale-x-100
                  "
              />

              {/* Huge index */}

              <span
                aria-hidden="true"
                className="
                    absolute
                    -bottom-5
                    -right-2
                    font-display
                    text-[5rem]
                    font-semibold
                    leading-none
                    tracking-[-0.07em]
                    text-ink/[0.028]
                  "
              >
                {number}
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
                        size-9
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

                  <span
                    className="
                        text-[8px]
                        font-semibold
                        uppercase
                        tracking-[0.13em]
                        text-ink/22
                      "
                  >
                    {label}
                  </span>
                </div>

                <h3
                  className="
                      mt-6
                      max-w-[230px]
                      font-display
                      text-[1.08rem]
                      font-semibold
                      leading-[1.1]
                      tracking-[-0.02em]
                      text-ink

                      sm:text-[1.15rem]
                    "
                >
                  {title}
                </h3>

                <p
                  className="
                      mt-2
                      max-w-[240px]
                      text-[11px]
                      leading-5
                      text-ink/42
                    "
                >
                  {description}
                </p>

                <span
                  aria-hidden="true"
                  className="
                      mt-auto
                      h-px
                      w-7
                      bg-blue/15

                      transition-[width,background-color]
                      duration-400

                      group-hover:w-12
                      group-hover:bg-solar
                    "
                />
              </div>
            </motion.article>
          ))}
        </motion.div>

        {/* =================================================
            Bottom rail
            ================================================= */}

        <motion.div
          initial={
            reduceMotion
              ? false
              : {
                  opacity: 0,
                  y: 8,
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
            mt-7
            flex
            flex-col
            gap-3

            sm:flex-row
            sm:items-center
            sm:justify-between
          "
        >
          <div
            className="
              flex
              flex-wrap
              items-center
              gap-x-5
              gap-y-2
            "
          >
            {[
              "Solar PV",
              "Energy Storage",
              "Clean Mobility",
              "B2B Networking",
            ].map((item) => (
              <div
                key={item}
                className="
                    flex
                    items-center
                    gap-2
                  "
              >
                <span
                  aria-hidden="true"
                  className="
                      size-1.5
                      rounded-full
                      bg-solar
                    "
                />

                <span
                  className="
                      text-[9px]
                      font-semibold
                      uppercase
                      tracking-[0.11em]
                      text-ink/28
                    "
                >
                  {item}
                </span>
              </div>
            ))}
          </div>

          <div
            aria-hidden="true"
            className="
              hidden
              items-center
              gap-2

              sm:flex
            "
          >
            <Zap
              className="
                size-3
                text-solar
              "
              strokeWidth={1.8}
            />

            <span
              className="
                text-[9px]
                font-semibold
                uppercase
                tracking-[0.12em]
                text-ink/22
              "
            >
              India International Solar Show 2026
            </span>
          </div>
        </motion.div>
      </Container>
    </section>
  );
}
  