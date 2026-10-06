"use client";

import {
  BatteryCharging,
  Factory,
  Landmark,
  Network,
  PanelsTopLeft,
  PlugZap,
} from "lucide-react";

import { motion, useReducedMotion } from "framer-motion";

import { Container } from "@/components/ui/Container";

/* =========================================================
   Data
   ========================================================= */

const CARDS = [
  {
    title: "Solar Technologies",
    desc: "PV modules, hybrid systems, and next-gen solar generation.",
    icon: PanelsTopLeft,
  },
  {
    title: "Energy Storage",
    desc: "Lithium-ion, LFP, and grid-scale storage systems.",
    icon: BatteryCharging,
  },
  {
    title: "Microgrids",
    desc: "Integrated solar + storage systems for resilient power.",
    icon: Network,
  },
  {
    title: "EV Charging Integration",
    desc: "Renewable-powered mobility and charging infrastructure.",
    icon: PlugZap,
  },
  {
    title: "Industrial Adoption",
    desc: "Commercial and industrial-scale renewable deployment.",
    icon: Factory,
  },
  {
    title: "Policy & Investment",
    desc: "Regulatory frameworks, financing, and market growth.",
    icon: Landmark,
  },
] as const;

/* =========================================================
   Motion
   ========================================================= */

const EASE = [0.16, 1, 0.3, 1] as const;

const sectionVariants = {
  hidden: {},

  visible: {
    transition: {
      staggerChildren: 0.065,
      delayChildren: 0.05,
    },
  },
};

const revealVariants = {
  hidden: {
    opacity: 0,
    y: 18,
  },

  visible: {
    opacity: 1,
    y: 0,

    transition: {
      duration: 0.58,
      ease: EASE,
    },
  },
};

/* =========================================================
   Animated Background
   ========================================================= */

function AboutBackground({ reduceMotion }: { reduceMotion: boolean | null }) {
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
      {/* Blue atmospheric glow */}

      <div
        className="
          absolute
          -left-52
          top-1/4
          size-[34rem]
          rounded-full
          bg-blue/[0.04]
          blur-[120px]
        "
      />

      {/* Solar glow */}

      <div
        className="
          absolute
          -right-48
          bottom-0
          size-[30rem]
          rounded-full
          bg-solar/[0.07]
          blur-[110px]
        "
      />

      {/* Solar system geometry */}

      <motion.svg
        viewBox="0 0 900 900"
        fill="none"
        className="
          absolute
          -right-[330px]
          -top-[320px]
          size-[760px]
          text-blue
          opacity-[0.045]

          sm:-right-[280px]
          sm:size-[840px]

          lg:-right-[230px]
          lg:-top-[360px]
          lg:size-[980px]
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
                duration: 110,
                repeat: Infinity,
                ease: "linear",
              }
        }
      >
        <circle cx="450" cy="450" r="165" stroke="currentColor" />

        <circle
          cx="450"
          cy="450"
          r="255"
          stroke="currentColor"
          strokeDasharray="5 15"
        />

        <circle cx="450" cy="450" r="355" stroke="currentColor" />

        <path d="M450 30V870" stroke="currentColor" />

        <path d="M30 450H870" stroke="currentColor" />

        <path d="M153 153L747 747" stroke="currentColor" />

        <path d="M747 153L153 747" stroke="currentColor" />

        <circle cx="450" cy="450" r="8" fill="#fbb216" stroke="none" />
      </motion.svg>

      {/* Small solar pulse */}

      <motion.div
        className="
          absolute
          right-[8%]
          top-[20%]
          hidden
          size-16
          rounded-full
          border
          border-solar/20

          lg:block
        "
        animate={
          reduceMotion
            ? undefined
            : {
                scale: [1, 1.12, 1],
                opacity: [0.25, 0.5, 0.25],
              }
        }
        transition={
          reduceMotion
            ? undefined
            : {
                duration: 5,
                repeat: Infinity,
                ease: "easeInOut",
              }
        }
      />
    </div>
  );
}

/* =========================================================
   About Section
   ========================================================= */

export function AboutSection() {
  const reduceMotion = useReducedMotion();

  return (
    <section
      id="about"
      aria-labelledby="about-heading"
      className="
        relative
        isolate
        overflow-hidden
        bg-paper
        text-ink
      "
    >
      <AboutBackground reduceMotion={reduceMotion} />

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
          variants={sectionVariants}
          initial={reduceMotion ? false : "hidden"}
          whileInView="visible"
          viewport={{
            once: true,
            amount: 0.18,
            margin: "-40px",
          }}
          className="
            grid
            gap-8
            border-b
            border-ink/10
            pb-10

            lg:grid-cols-[1.05fr_0.95fr]
            lg:items-end
            lg:gap-16
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
              <motion.span
                initial={
                  reduceMotion
                    ? false
                    : {
                        scaleX: 0,
                      }
                }
                whileInView={{
                  scaleX: 1,
                }}
                viewport={{
                  once: true,
                }}
                transition={{
                  duration: 0.7,
                  delay: 0.08,
                  ease: EASE,
                }}
                className="
                  h-px
                  w-7
                  origin-left
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
                About the Show
              </span>
            </div>

            <h2
              id="about-heading"
              className="
                mt-4
                max-w-[760px]
                font-display
                text-[clamp(2.35rem,4vw,4.35rem)]
                font-semibold
                leading-[0.97]
                tracking-[-0.035em]
                text-ink
              "
            >
              India&apos;s Premier Solar Exhibition
              <span
                className="
                  block
                  text-blue
                "
              >
                &amp; Renewable Energy Expo
              </span>
            </h2>
          </motion.div>

          {/* Right */}

          <motion.div
            variants={revealVariants}
            className="
              max-w-[570px]

              lg:justify-self-end
            "
          >
            <p
              className="
                text-sm
                leading-7
                tracking-[-0.005em]
                text-ink/58

                sm:text-[15px]
              "
            >
              The 1st Edition of India International Solar Show 2026 is the
              leading solar trade fair in Pune, connecting the entire solar
              energy, PV manufacturing, and energy storage value chain.
            </p>

            <p
              className="
                mt-4
                text-sm
                leading-7
                tracking-[-0.005em]
                text-ink/58

                sm:text-[15px]
              "
            >
              As a landmark{" "}
              <strong className="font-semibold text-ink">
                solar trade show in Pune, Maharashtra
              </strong>
              , this exhibition unites solar PV module manufacturers, EPC
              contractors, battery energy storage systems (BESS), C&amp;I solar
              industrial buyers, and clean energy investors under one roof.
            </p>
          </motion.div>
        </motion.div>

        {/* =================================================
            Capabilities Grid
            ================================================= */}

        <motion.div
          variants={sectionVariants}
          initial={reduceMotion ? false : "hidden"}
          whileInView="visible"
          viewport={{
            once: true,
            amount: 0.12,
            margin: "-50px",
          }}
          className="
            mt-10
            grid
            overflow-hidden
            rounded-2xl
            border
            border-ink/10
            bg-paper/70
            backdrop-blur-sm

            sm:grid-cols-2

            lg:mt-12
            lg:grid-cols-3
          "
        >
          {CARDS.map((card, index) => {
            const Icon = card.icon;

            return (
              <motion.article
                key={card.title}
                variants={revealVariants}
                className="
                  group
                  relative
                  min-h-[190px]
                  overflow-hidden
                  border-ink/10
                  p-5

                  sm:min-h-[200px]
                  sm:p-6

                  lg:min-h-[210px]
                  lg:border-r
                  lg:p-7

                  lg:[&:nth-child(3n)]:border-r-0
                  lg:[&:nth-child(-n+3)]:border-b

                  sm:[&:nth-child(odd)]:border-r
                  sm:[&:nth-child(-n+4)]:border-b

                  lg:[&:nth-child(odd)]:border-r
                "
              >
                {/* Hover wash */}

                <div
                  aria-hidden="true"
                  className="
                    absolute
                    inset-0
                    bg-solar/[0.00]
                    transition-colors
                    duration-500
                    ease-out

                    group-hover:bg-solar/[0.045]
                  "
                />

                {/* Top solar indicator */}

                <span
                  aria-hidden="true"
                  className="
                    absolute
                    left-0
                    top-0
                    h-[2px]
                    w-0
                    bg-solar
                    transition-[width]
                    duration-500
                    ease-out

                    group-hover:w-full
                  "
                />

                {/* Background number */}

                <span
                  aria-hidden="true"
                  className="
                    pointer-events-none
                    absolute
                    -bottom-3
                    -right-1
                    font-display
                    text-[4.5rem]
                    font-semibold
                    leading-none
                    tracking-[-0.06em]
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
                  {/* Top row */}

                  <div
                    className="
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
                      <Icon
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

                  {/* Copy */}

                  <div
                    className="
                      mt-7
                      max-w-[270px]
                    "
                  >
                    <h3
                      className="
                        font-display
                        text-[1.15rem]
                        font-semibold
                        leading-[1.08]
                        tracking-[-0.02em]
                        text-ink

                        sm:text-[1.2rem]
                      "
                    >
                      {card.title}
                    </h3>

                    <p
                      className="
                        mt-2.5
                        text-[13px]
                        leading-6
                        text-ink/50
                      "
                    >
                      {card.desc}
                    </p>
                  </div>

                  {/* Bottom detail */}

                  <div
                    className="
                      mt-auto
                      pt-6
                    "
                  >
                    <span
                      aria-hidden="true"
                      className="
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
                  </div>
                </div>
              </motion.article>
            );
          })}
        </motion.div>
      </Container>
    </section>
  );
}
