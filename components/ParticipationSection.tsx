"use client";

import {
  ArrowUpRight,
  Handshake,
  LayoutGrid,
  Users,
} from "lucide-react";

import {
  motion,
  useReducedMotion,
} from "framer-motion";

import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";

/* =========================================================
   Data
   ========================================================= */

const PARTICIPATION_OPTIONS = [
  {
    title: "Exhibit",
    description:
      "Showcase products, technologies and solutions to buyers, EPC companies, project developers and industry professionals.",
    href: "/exhibitor",
    buttonLabel: "Exhibitor Information",
    icon: LayoutGrid,
  },
  {
    title: "Visit",
    description:
      "Explore technologies, meet suppliers and connect with businesses working across solar and energy storage.",
    href: "/visitor",
    buttonLabel: "Visitor Information",
    icon: Users,
  },
  {
    title: "Partner",
    description:
      "Explore sponsorship and partnership opportunities designed for industry visibility and direct engagement.",
    href: "/sponsors",
    buttonLabel: "Partnership Options",
    icon: Handshake,
  },
] as const;

/* =========================================================
   Motion
   ========================================================= */

const EASE = [0.16, 1, 0.3, 1] as const;

const groupVariants = {
  hidden: {},

  visible: {
    transition: {
      staggerChildren: 0.07,
      delayChildren: 0.05,
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

function ParticipationBackground({
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
          -left-52
          top-[20%]
          size-[34rem]
          rounded-full
          bg-blue/[0.045]
          blur-[125px]
        "
      />

      {/* Solar atmosphere */}

      <div
        className="
          absolute
          -right-44
          -top-28
          size-[30rem]
          rounded-full
          bg-solar/[0.08]
          blur-[110px]
        "
      />

      {/* Animated solar geometry */}

      <motion.svg
        viewBox="0 0 900 900"
        fill="none"
        className="
          absolute
          -right-[340px]
          -top-[350px]
          size-[820px]
          text-blue
          opacity-[0.035]

          sm:-right-[280px]
          sm:size-[900px]

          lg:-right-[210px]
          lg:size-[1020px]
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
        <circle
          cx="450"
          cy="450"
          r="145"
          stroke="currentColor"
        />

        <circle
          cx="450"
          cy="450"
          r="235"
          stroke="currentColor"
          strokeDasharray="4 16"
        />

        <circle
          cx="450"
          cy="450"
          r="345"
          stroke="currentColor"
        />

        <path
          d="M450 30V870"
          stroke="currentColor"
        />

        <path
          d="M30 450H870"
          stroke="currentColor"
        />

        <path
          d="M153 153L747 747"
          stroke="currentColor"
        />

        <path
          d="M747 153L153 747"
          stroke="currentColor"
        />

        <circle
          cx="450"
          cy="450"
          r="8"
          fill="#fbb216"
          stroke="none"
        />
      </motion.svg>

      {/* Secondary ring */}

      <motion.svg
        viewBox="0 0 420 420"
        fill="none"
        className="
          absolute
          -bottom-40
          -left-40
          hidden
          size-[470px]
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
                duration: 170,
                repeat: Infinity,
                ease: "linear",
              }
        }
      >
        <circle
          cx="210"
          cy="210"
          r="92"
          stroke="currentColor"
        />

        <circle
          cx="210"
          cy="210"
          r="150"
          stroke="currentColor"
          strokeDasharray="3 13"
        />

        <path
          d="M210 20V400"
          stroke="currentColor"
        />

        <path
          d="M20 210H400"
          stroke="currentColor"
        />
      </motion.svg>
    </div>
  );
}

/* =========================================================
   Participation Section
   ========================================================= */

export function ParticipationSection() {
  const reduceMotion = useReducedMotion();

  return (
    <section
      aria-labelledby="participation-heading"
      className="
        relative
        isolate
        overflow-hidden
        bg-paper
        text-ink
      "
    >
      <ParticipationBackground reduceMotion={reduceMotion} />

      <Container
        className="
          relative
          py-16
          sm:py-20
          lg:py-24
        "
      >
        {/* =================================================
            Header
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
            border-ink/10
            pb-10

            lg:grid-cols-[0.95fr_1.05fr]
            lg:items-end
            lg:gap-18
            lg:pb-12
          "
        >
          {/* Left */}

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
                Participate
              </span>
            </div>

            <h2
              id="participation-heading"
              className="
                mt-4
                max-w-[620px]
                font-display
                text-[clamp(2.25rem,3.8vw,4rem)]
                font-semibold
                leading-[0.98]
                tracking-[-0.035em]
                text-ink
              "
            >
              Choose Your Way
              <span
                className="
                  block
                  text-blue
                "
              >
                Into the Show
              </span>
            </h2>
          </motion.div>

          {/* Right */}

          <motion.div
            variants={revealVariants}
            className="
              max-w-[560px]

              lg:justify-self-end
            "
          >
            <p
              className="
                text-sm
                leading-7
                text-ink/55

                sm:text-[15px]
              "
            >
              Three clear routes to take part in India Solar International
              Show 2026.
            </p>

            <p
              className="
                mt-3
                text-sm
                leading-7
                text-ink/55

                sm:text-[15px]
              "
            >
              Showcase technology, source new solutions or build your
              presence across the solar and energy-storage industry.
            </p>
          </motion.div>
        </motion.div>

        {/* =================================================
            Options
            ================================================= */}

        <motion.div
          variants={groupVariants}
          initial={reduceMotion ? false : "hidden"}
          whileInView="visible"
          viewport={{
            once: true,
            amount: 0.1,
            margin: "-50px",
          }}
          className="
            mt-10
            grid
            overflow-hidden
            rounded-2xl
            border
            border-ink/[0.08]
            bg-paper/70
            backdrop-blur-sm

            lg:mt-12
            lg:grid-cols-3
          "
        >
          {PARTICIPATION_OPTIONS.map((item, index) => {
            const ItemIcon = item.icon;

            return (
              <motion.article
                key={item.title}
                variants={revealVariants}
                className="
                  group
                  relative
                  min-h-[275px]
                  overflow-hidden
                  border-ink/[0.08]
                  p-5

                  transition-colors
                  duration-500
                  ease-out

                  hover:bg-solar/[0.035]

                  sm:p-6

                  lg:min-h-[300px]
                  lg:border-r
                  lg:p-7

                  lg:[&:last-child]:border-r-0

                  max-lg:border-b
                  max-lg:[&:last-child]:border-b-0
                "
              >
                {/* Hover top line */}

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

                {/* Background number */}

                <span
                  aria-hidden="true"
                  className="
                    pointer-events-none
                    absolute
                    -bottom-5
                    -right-2
                    font-display
                    text-[5rem]
                    font-semibold
                    leading-none
                    tracking-[-0.07em]
                    text-ink/[0.035]

                    transition-[opacity,transform]
                    duration-500

                    group-hover:-translate-x-1
                    group-hover:text-ink/[0.055]
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
                  {/* Top */}

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
                        shrink-0
                        items-center
                        justify-center
                        rounded-full
                        border
                        border-ink/[0.08]
                        bg-paper
                        text-blue

                        shadow-[0_6px_18px_rgba(25,25,25,0.04)]

                        transition-[background-color,border-color,color,transform]
                        duration-300
                        ease-out

                        group-hover:scale-[1.03]
                        group-hover:border-solar
                        group-hover:bg-solar
                        group-hover:text-ink
                      "
                    >
                      <ItemIcon
                        aria-hidden="true"
                        className="size-4"
                        strokeWidth={1.75}
                      />
                    </div>

                    <span
                      className="
                        font-display
                        text-[10px]
                        font-semibold
                        tracking-[0.14em]
                        text-ink/20
                      "
                    >
                      {String(index + 1).padStart(2, "0")}
                    </span>
                  </div>

                  {/* Content */}

                  <div
                    className="
                      mt-8
                      max-w-[320px]
                    "
                  >
                    <h3
                      className="
                        font-display
                        text-[1.4rem]
                        font-semibold
                        leading-[1.05]
                        tracking-[-0.025em]
                        text-ink

                        sm:text-[1.5rem]
                      "
                    >
                      {item.title}
                    </h3>

                    <p
                      className="
                        mt-3
                        text-[13px]
                        leading-6
                        text-ink/50
                      "
                    >
                      {item.description}
                    </p>
                  </div>

                  {/* CTA */}

                  <div
                    className="
                      mt-auto
                      pt-7
                    "
                  >
                    <span
                      aria-hidden="true"
                      className="
                        mb-5
                        block
                        h-px
                        w-8
                        bg-blue/20

                        transition-[width,background-color]
                        duration-500
                        ease-out

                        group-hover:w-14
                        group-hover:bg-solar
                      "
                    />

                    <Button
                      href={item.href}
                      size="sm"
                      variant="outline"
                      className="
                        group/button
                        border-ink/15
                        bg-paper/60
                        text-ink

                        hover:border-blue
                        hover:bg-blue
                        hover:text-paper
                      "
                    >
                      <span>
                        {item.buttonLabel}
                      </span>

                      <ArrowUpRight
                        aria-hidden="true"
                        className="
                          size-3.5

                          transition-transform
                          duration-300

                          group-hover/button:translate-x-0.5
                          group-hover/button:-translate-y-0.5
                        "
                        strokeWidth={1.8}
                      />
                    </Button>
                  </div>
                </div>
              </motion.article>
            );
          })}
        </motion.div>

        {/* =================================================
            Bottom detail
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
            margin: "-30px",
          }}
          transition={{
            duration: 0.54,
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
          <p
            className="
              text-[11px]
              leading-5
              text-ink/35
            "
          >
            One platform. Three ways to connect with the clean-energy market.
          </p>

          <div
            aria-hidden="true"
            className="
              flex
              items-center
              gap-2
            "
          >
            {PARTICIPATION_OPTIONS.map((item, index) => (
              <div
                key={item.title}
                className="
                  flex
                  items-center
                  gap-2
                "
              >
                <span
                  className="
                    size-1.5
                    rounded-full
                    bg-solar
                  "
                />

                {index < PARTICIPATION_OPTIONS.length - 1 ? (
                  <span
                    className="
                      h-px
                      w-5
                      bg-ink/10
                    "
                  />
                ) : null}
              </div>
            ))}
          </div>
        </motion.div>
      </Container>
    </section>
  );
}