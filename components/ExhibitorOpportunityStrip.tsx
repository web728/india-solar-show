"use client";

import {
  ArrowUpRight,
  Building2,
  Handshake,
  PanelsTopLeft,
  Users,
} from "lucide-react";

import {
  motion,
  useReducedMotion,
} from "framer-motion";

import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";

/* =========================================================
   Constants
   ========================================================= */

const STALL_URL =
  "https://app.warpbay.com/E2yy0Klq";

const EASE =
  [0.16, 1, 0.3, 1] as const;

/* =========================================================
   Motion
   ========================================================= */

const parentVariants = {
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
    y: 14,
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
   Highlights
   ========================================================= */

const HIGHLIGHTS = [
  {
    icon: Users,
    label: "Meet",
    value: "Industry Buyers",
  },
  {
    icon: Building2,
    label: "Reach",
    value: "EPCs & Developers",
  },
  {
    icon: PanelsTopLeft,
    label: "Showcase",
    value: "Solar + Storage",
  },
  {
    icon: Handshake,
    label: "Build",
    value: "B2B Partnerships",
  },
] as const;

/* =========================================================
   Component
   ========================================================= */

export function ExhibitorOpportunityStrip() {
  const reduceMotion =
    useReducedMotion();

  return (
    <section
      aria-labelledby="exhibitor-opportunity-heading"
      className="
        relative
        isolate
        overflow-hidden
        border-b
        border-ink/[0.08]
        bg-paper
      "
    >
      {/* ===================================================
          Background atmosphere
          =================================================== */}

      <div
        aria-hidden="true"
        className="
          pointer-events-none
          absolute
          inset-0
          overflow-hidden
        "
      >
        {/* solar glow */}

        <div
          className="
            absolute
            -right-36
            -top-32
            size-[26rem]
            rounded-full
            bg-solar/[0.075]
            blur-[110px]
          "
        />

        {/* blue glow */}

        <div
          className="
            absolute
            -bottom-40
            left-[18%]
            size-[26rem]
            rounded-full
            bg-blue/[0.045]
            blur-[120px]
          "
        />

        {/* Main orbit */}

        <motion.svg
          viewBox="0 0 700 700"
          fill="none"
          className="
            absolute
            -right-[280px]
            -top-[280px]
            size-[650px]
            text-blue
            opacity-[0.035]

            sm:size-[720px]

            lg:-right-[190px]
            lg:size-[800px]
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
                  duration: 155,
                  repeat: Infinity,
                  ease: "linear",
                }
          }
        >
          <circle
            cx="350"
            cy="350"
            r="105"
            stroke="currentColor"
          />

          <circle
            cx="350"
            cy="350"
            r="185"
            stroke="currentColor"
            strokeDasharray="4 15"
          />

          <circle
            cx="350"
            cy="350"
            r="275"
            stroke="currentColor"
          />

          <path
            d="M350 25V675"
            stroke="currentColor"
          />

          <path
            d="M25 350H675"
            stroke="currentColor"
          />

          <path
            d="M120 120L580 580"
            stroke="currentColor"
          />

          <path
            d="M580 120L120 580"
            stroke="currentColor"
          />

          <circle
            cx="350"
            cy="75"
            r="6"
            fill="#fbb216"
            stroke="none"
          />
        </motion.svg>

        {/* Secondary orbit */}

        <motion.svg
          viewBox="0 0 400 400"
          fill="none"
          className="
            absolute
            -bottom-40
            -left-32
            hidden
            size-[430px]
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
                  duration: 190,
                  repeat: Infinity,
                  ease: "linear",
                }
          }
        >
          <circle
            cx="200"
            cy="200"
            r="85"
            stroke="currentColor"
          />

          <circle
            cx="200"
            cy="200"
            r="145"
            stroke="currentColor"
            strokeDasharray="3 13"
          />

          <circle
            cx="200"
            cy="200"
            r="185"
            stroke="currentColor"
          />

          <path
            d="M200 15V385"
            stroke="currentColor"
          />

          <path
            d="M15 200H385"
            stroke="currentColor"
          />
        </motion.svg>
      </div>

      {/* ===================================================
          Content
          =================================================== */}

      <Container
        className="
          relative
          py-12

          sm:py-14

          lg:py-16
        "
      >
        <motion.div
          variants={parentVariants}
          initial={
            reduceMotion
              ? false
              : "hidden"
          }
          whileInView="visible"
          viewport={{
            once: true,
            amount: 0.14,
            margin: "-35px",
          }}
          className="
            grid
            gap-8

            lg:grid-cols-[minmax(0,1fr)_330px]
            lg:items-center
            lg:gap-12

            xl:grid-cols-[minmax(0,1fr)_360px]
          "
        >
          {/* =================================================
              Content
              ================================================= */}

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
                Exhibit in 2026
              </span>
            </motion.div>

            <motion.h2
              id="exhibitor-opportunity-heading"
              variants={revealVariants}
              className="
                mt-4
                max-w-[700px]
                font-display
                text-[clamp(2rem,3.3vw,3.45rem)]
                font-semibold
                leading-[0.98]
                tracking-[-0.035em]
                text-ink
              "
            >
              Put Your Brand in Front of
              <span className="block text-blue">
                India&apos;s Clean-Energy Market
              </span>
            </motion.h2>

            <motion.p
              variants={revealVariants}
              className="
                mt-4
                max-w-[620px]
                text-sm
                leading-7
                text-ink/52

                sm:text-[15px]
              "
            >
              Position your products, technologies
              and solutions directly in front of
              professionals across solar generation,
              battery storage, project development
              and industrial energy adoption.
            </motion.p>

            {/* CTA */}

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
                href={STALL_URL}
                external
                size="md"
                className="
                  group/stall
                  justify-between
                  gap-5
                "
              >
                Book Your Stall

                <ArrowUpRight
                  aria-hidden="true"
                  className="
                    size-4

                    transition-transform
                    duration-300

                    group-hover/stall:translate-x-0.5
                    group-hover/stall:-translate-y-0.5
                  "
                  strokeWidth={1.8}
                />
              </Button>

              <Button
                href="/contact"
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
                Talk to Our Team
              </Button>
            </motion.div>
          </div>

          {/* =================================================
              Opportunity Panel
              ================================================= */}

          <motion.div
            variants={revealVariants}
            className="
              relative
              overflow-hidden
              rounded-2xl
              border
              border-ink/[0.08]
              bg-paper/80
              shadow-[0_16px_50px_rgba(25,25,25,0.055)]
              backdrop-blur-md
            "
          >
            {/* top accent */}

            <div
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
              className="
                border-b
                border-ink/[0.08]
                px-5
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
                Exhibition Opportunity
              </span>

              <p
                className="
                  mt-1
                  font-display
                  text-[1.05rem]
                  font-semibold
                  tracking-[-0.02em]
                  text-ink
                "
              >
                Connect. Showcase. Grow.
              </p>
            </div>

            <div>
              {HIGHLIGHTS.map(
                (
                  {
                    icon: Icon,
                    label,
                    value,
                  },
                  index,
                ) => (
                  <div
                    key={label}
                    className="
                      group/item
                      relative
                      flex
                      min-h-[70px]
                      items-center
                      gap-3
                      border-b
                      border-ink/[0.07]
                      px-5
                      py-3.5

                      last:border-b-0

                      transition-colors
                      duration-300

                      hover:bg-solar/[0.035]
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

                        group-hover/item:border-solar
                        group-hover/item:bg-solar
                        group-hover/item:text-ink
                      "
                    >
                      <Icon
                        aria-hidden="true"
                        className="size-4"
                        strokeWidth={1.75}
                      />
                    </div>

                    <div
                      className="
                        min-w-0
                        flex-1
                      "
                    >
                      <span
                        className="
                          block
                          text-[8px]
                          font-semibold
                          uppercase
                          tracking-[0.12em]
                          text-ink/30
                        "
                      >
                        {label}
                      </span>

                      <span
                        className="
                          mt-0.5
                          block
                          text-[12px]
                          font-semibold
                          text-ink/70
                        "
                      >
                        {value}
                      </span>
                    </div>

                    <span
                      aria-hidden="true"
                      className="
                        font-display
                        text-[9px]
                        font-semibold
                        tracking-[0.12em]
                        text-ink/16
                      "
                    >
                      {String(
                        index + 1,
                      ).padStart(2, "0")}
                    </span>
                  </div>
                ),
              )}
            </div>
          </motion.div>
        </motion.div>

        {/* =================================================
            Bottom line
            ================================================= */}

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
            duration: 0.85,
            delay: 0.12,
            ease: EASE,
          }}
          aria-hidden="true"
          className="
            mt-9
            h-px
            origin-left
            bg-gradient-to-r
            from-solar/70
            via-ink/10
            to-transparent
          "
        />
      </Container>
    </section>
  );
}