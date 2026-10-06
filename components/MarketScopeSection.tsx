"use client";

import Image from "next/image";

import {
  BatteryCharging,
  Building2,
  Factory,
  Landmark,
  MapPin,
  Network,
  PanelsTopLeft,
  PlugZap,
  TrendingUp,
  Users,
} from "lucide-react";

import {
  motion,
  useReducedMotion,
} from "framer-motion";

import {
  INDIA_MARKET,
  PUNE_MARKET,
} from "@/data/siteData";

import { Container } from "@/components/ui/Container";

/* =========================================================
   Icons
   ========================================================= */

const INDIA_ICONS = [
  TrendingUp,
  PanelsTopLeft,
  BatteryCharging,
  Factory,
  Network,
  Landmark,
] as const;

const PUNE_ICONS = [
  Factory,
  Building2,
  PlugZap,
  Users,
  MapPin,
  Network,
] as const;

/* =========================================================
   Motion
   ========================================================= */

const EASE = [0.16, 1, 0.3, 1] as const;

const parentVariants = {
  hidden: {},

  visible: {
    transition: {
      staggerChildren: 0.055,
      delayChildren: 0.04,
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
   Animated Background
   ========================================================= */

function MarketBackground({
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
      className="
        pointer-events-none
        absolute
        inset-0
        overflow-hidden
      "
    >
      {/* Ambient depth */}

      <div
        className={
          dark
            ? `
              absolute
              -right-52
              -top-40
              size-[34rem]
              rounded-full
              bg-blue/[0.15]
              blur-[135px]
            `
            : `
              absolute
              -right-48
              -top-36
              size-[32rem]
              rounded-full
              bg-solar/[0.08]
              blur-[120px]
            `
        }
      />

      <div
        className={
          dark
            ? `
              absolute
              -bottom-48
              -left-40
              size-[28rem]
              rounded-full
              bg-solar/[0.055]
              blur-[120px]
            `
            : `
              absolute
              -bottom-48
              -left-44
              size-[30rem]
              rounded-full
              bg-blue/[0.05]
              blur-[125px]
            `
        }
      />

      {/* Main orbit */}

      <motion.svg
        viewBox="0 0 900 900"
        fill="none"
        className={`
          absolute
          -right-[370px]
          -top-[370px]
          size-[850px]
          opacity-[0.03]

          sm:-right-[300px]
          sm:size-[930px]

          lg:-right-[210px]
          lg:size-[1040px]

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
        <circle
          cx="450"
          cy="450"
          r="115"
          stroke="currentColor"
        />

        <circle
          cx="450"
          cy="450"
          r="210"
          stroke="currentColor"
          strokeDasharray="3 14"
        />

        <circle
          cx="450"
          cy="450"
          r="320"
          stroke="currentColor"
        />

        <circle
          cx="450"
          cy="450"
          r="395"
          stroke="currentColor"
          strokeDasharray="2 22"
        />

        <path
          d="M450 28V872"
          stroke="currentColor"
        />

        <path
          d="M28 450H872"
          stroke="currentColor"
        />

        <path
          d="M151 151L749 749"
          stroke="currentColor"
        />

        <path
          d="M749 151L151 749"
          stroke="currentColor"
        />

        <circle
          cx="450"
          cy="130"
          r="7"
          fill="#fbb216"
          stroke="none"
        />

        <circle
          cx="770"
          cy="450"
          r="5"
          fill="currentColor"
          stroke="none"
        />
      </motion.svg>

      {/* Counter orbit */}

      <motion.svg
        viewBox="0 0 500 500"
        fill="none"
        className="
          absolute
          -bottom-52
          -left-44
          hidden
          size-[520px]
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
                duration: 205,
                repeat: Infinity,
                ease: "linear",
              }
        }
      >
        <circle
          cx="250"
          cy="250"
          r="105"
          stroke="currentColor"
        />

        <circle
          cx="250"
          cy="250"
          r="175"
          stroke="currentColor"
          strokeDasharray="3 15"
        />

        <circle
          cx="250"
          cy="250"
          r="235"
          stroke="currentColor"
        />

        <path
          d="M250 15V485"
          stroke="currentColor"
        />

        <path
          d="M15 250H485"
          stroke="currentColor"
        />
      </motion.svg>
    </div>
  );
}

/* =========================================================
   Section Label
   ========================================================= */

function SectionLabel({
  children,
  tone = "dark",
}: {
  children: React.ReactNode;
  tone?: "dark" | "light";
}) {
  return (
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
        className={`
          text-[10px]
          font-semibold
          uppercase
          tracking-[0.16em]

          sm:text-[11px]

          ${
            tone === "dark"
              ? "text-solar"
              : "text-blue"
          }
        `}
      >
        {children}
      </span>
    </div>
  );
}

/* =========================================================
   India Market
   ========================================================= */

export function IndiaMarketSection() {
  const reduceMotion = useReducedMotion();

  const featured = INDIA_MARKET.slice(0, 2);
  const secondary = INDIA_MARKET.slice(2);

  return (
    <section
      id="india-market"
      aria-labelledby="india-market-heading"
      className="
        relative
        isolate
        overflow-hidden
        border-b
        border-paper/10
        bg-ink
        text-paper
      "
    >
      <MarketBackground
        tone="dark"
        reduceMotion={reduceMotion}
      />

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
          variants={parentVariants}
          initial={reduceMotion ? false : "hidden"}
          whileInView="visible"
          viewport={{
            once: true,
            amount: 0.16,
            margin: "-40px",
          }}
          className="
            grid
            gap-7
            border-b
            border-paper/10
            pb-9

            lg:grid-cols-[1fr_0.72fr]
            lg:items-end
            lg:gap-16
            lg:pb-11
          "
        >
          <motion.div variants={revealVariants}>
            <SectionLabel>
              Market Opportunity
            </SectionLabel>

            <h2
              id="india-market-heading"
              className="
                mt-4
                max-w-[720px]
                font-display
                text-[clamp(2.2rem,3.6vw,3.75rem)]
                font-semibold
                leading-[0.98]
                tracking-[-0.035em]
                text-paper
              "
            >
              India&apos;s Renewable Energy
              <span className="block text-solar">
                Market Opportunity
              </span>
            </h2>
          </motion.div>

          <motion.div
            variants={revealVariants}
            className="
              max-w-[500px]

              lg:justify-self-end
            "
          >
            <p
              className="
                text-sm
                leading-7
                text-paper/48

                sm:text-[15px]
              "
            >
              Growth across rooftop solar, C&amp;I projects,
              utility-scale PV, and battery storage is expanding
              India&apos;s clean-energy market.
            </p>

            <div
              className="
                mt-5
                flex
                items-center
                gap-3
              "
            >
              <span className="size-1.5 rounded-full bg-solar" />

              <span
                className="
                  text-[9px]
                  font-semibold
                  uppercase
                  tracking-[0.13em]
                  text-paper/28
                "
              >
                Clean Energy · Solar · Storage
              </span>
            </div>
          </motion.div>
        </motion.div>

        {/* =================================================
            Featured Market Opportunities
            ================================================= */}

        <motion.div
          variants={parentVariants}
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
            gap-3

            md:grid-cols-2

            lg:mt-12
          "
        >
          {featured.map((item, index) => {
            const Icon =
              INDIA_ICONS[index] ?? TrendingUp;

            return (
              <motion.article
                key={item.title}
                variants={revealVariants}
                className="
                  group
                  relative
                  min-h-[245px]
                  overflow-hidden
                  rounded-2xl
                  border
                  border-paper/10
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
                {/* solar wash */}

                <div
                  aria-hidden="true"
                  className="
                    absolute
                    -right-16
                    -top-16
                    size-44
                    rounded-full
                    bg-solar/[0.055]
                    blur-[60px]

                    opacity-0
                    transition-opacity
                    duration-500

                    group-hover:opacity-100
                  "
                />

                {/* Top accent */}

                <span
                  aria-hidden="true"
                  className="
                    absolute
                    inset-x-0
                    top-0
                    h-[2px]
                    origin-left
                    scale-x-[0.18]
                    bg-solar

                    transition-transform
                    duration-500

                    group-hover:scale-x-100
                  "
                />

                {/* Large index */}

                <span
                  aria-hidden="true"
                  className="
                    absolute
                    -bottom-7
                    -right-1
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

                <div className="relative z-10">
                  <div
                    className="
                      flex
                      items-center
                      justify-between
                      gap-5
                    "
                  >
                    <div
                      className="
                        flex
                        size-11
                        items-center
                        justify-center
                        rounded-full
                        border
                        border-paper/10
                        bg-paper/[0.04]
                        text-solar

                        transition-[background-color,color,border-color]
                        duration-300

                        group-hover:border-solar
                        group-hover:bg-solar
                        group-hover:text-ink
                      "
                    >
                      <Icon
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
                        tracking-[0.14em]
                        text-paper/22
                      "
                    >
                      Primary Opportunity
                    </span>
                  </div>

                  <h3
                    className="
                      mt-12
                      max-w-[330px]
                      font-display
                      text-[1.4rem]
                      font-semibold
                      leading-[1.08]
                      tracking-[-0.025em]
                      text-paper

                      sm:text-[1.5rem]
                    "
                  >
                    {item.title}
                  </h3>

                  <div
                    aria-hidden="true"
                    className="
                      mt-7
                      flex
                      items-center
                      gap-2
                    "
                  >
                    <span className="h-px w-10 bg-solar" />
                    <span className="size-1 rounded-full bg-solar" />
                  </div>
                </div>
              </motion.article>
            );
          })}
        </motion.div>

        {/* =================================================
            Secondary Opportunities
            ================================================= */}

        <motion.div
          variants={parentVariants}
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
            border
            border-paper/10
            bg-paper/[0.02]

            sm:grid-cols-2

            lg:grid-cols-4
          "
        >
          {secondary.map((item, itemIndex) => {
            const index = itemIndex + 2;

            const Icon =
              INDIA_ICONS[index] ?? TrendingUp;

            return (
              <motion.article
                key={item.title}
                variants={revealVariants}
                className="
                  group
                  relative
                  min-h-[170px]
                  border-paper/10
                  p-5

                  transition-colors
                  duration-400

                  hover:bg-paper/[0.035]

                  sm:border-r

                  sm:[&:nth-child(2n)]:border-r-0

                  lg:min-h-[185px]
                  lg:border-r
                  lg:p-6

                  lg:[&:nth-child(2n)]:border-r
                  lg:[&:last-child]:border-r-0

                  max-sm:border-b
                  max-sm:last:border-b-0

                  sm:max-lg:[&:nth-child(-n+2)]:border-b
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
                      border-paper/10
                      bg-paper/[0.035]
                      text-solar

                      transition-colors
                      duration-300

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
                    mt-7
                    max-w-[230px]
                    font-display
                    text-[1.05rem]
                    font-semibold
                    leading-[1.12]
                    tracking-[-0.018em]
                    text-paper

                    sm:text-[1.1rem]
                  "
                >
                  {item.title}
                </h3>

                <span
                  aria-hidden="true"
                  className="
                    absolute
                    bottom-5
                    left-5
                    h-px
                    w-6
                    bg-paper/15

                    transition-[width,background-color]
                    duration-400

                    group-hover:w-11
                    group-hover:bg-solar

                    lg:bottom-6
                    lg:left-6
                  "
                />
              </motion.article>
            );
          })}
        </motion.div>

        {/* Bottom marker */}

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
            items-center
            justify-between
            gap-4
          "
        >
          <p
            className="
              text-[9px]
              font-medium
              uppercase
              tracking-[0.13em]
              text-paper/24
            "
          >
            India Clean Energy Market · 2026
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
            <span className="h-px w-8 bg-paper/10" />
            <span className="size-1.5 rounded-full bg-blue" />
          </div>
        </motion.div>
      </Container>
    </section>
  );
}

/* =========================================================
   Pune Market
   ========================================================= */

export function PuneMarketSection() {
  const reduceMotion = useReducedMotion();

  return (
    <section
      id="pune-market"
      aria-labelledby="pune-market-heading"
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
      <MarketBackground
        tone="light"
        reduceMotion={reduceMotion}
      />

      <Container
        className="
          relative
          py-16

          sm:py-20

          lg:py-24
        "
      >
        {/* =================================================
            Main Editorial Layout
            ================================================= */}

        <div
          className="
            grid
            gap-8

            lg:grid-cols-[0.88fr_1.12fr]
            lg:items-stretch
            lg:gap-5
          "
        >
          {/* =================================================
              Left Content
              ================================================= */}

          <motion.div
            variants={parentVariants}
            initial={reduceMotion ? false : "hidden"}
            whileInView="visible"
            viewport={{
              once: true,
              amount: 0.15,
              margin: "-40px",
            }}
            className="
              flex
              flex-col
              justify-center

              lg:pr-6
            "
          >
            <motion.div variants={revealVariants}>
              <SectionLabel tone="light">
                Host City Advantage
              </SectionLabel>
            </motion.div>

            <motion.h2
              variants={revealVariants}
              id="pune-market-heading"
              className="
                mt-4
                max-w-[600px]
                font-display
                text-[clamp(2.2rem,3.55vw,3.7rem)]
                font-semibold
                leading-[0.98]
                tracking-[-0.035em]
                text-ink
              "
            >
              Pune: Industrial Access for
              <span className="block text-blue">
                Clean-Energy Growth
              </span>
            </motion.h2>

            <motion.p
              variants={revealVariants}
              className="
                mt-5
                max-w-[550px]
                text-sm
                leading-7
                text-ink/52

                sm:text-[15px]
              "
            >
              Pune&apos;s industrial, automotive, and technology
              ecosystem connects the show with manufacturers,
              EPC companies, C&amp;I buyers, developers, and
              clean-energy stakeholders.
            </motion.p>

            {/* small technical marker */}

            <motion.div
              variants={revealVariants}
              className="
                mt-7
                flex
                flex-wrap
                gap-x-5
                gap-y-2
              "
            >
              {[
                "Manufacturing",
                "Mobility",
                "Technology",
              ].map((label) => (
                <div
                  key={label}
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
                      tracking-[0.12em]
                      text-ink/30
                    "
                  >
                    {label}
                  </span>
                </div>
              ))}
            </motion.div>
          </motion.div>

          {/* =================================================
              Pune Image
              ================================================= */}

          <motion.div
            initial={
              reduceMotion
                ? false
                : {
                    opacity: 0,
                    x: 18,
                  }
            }
            whileInView={{
              opacity: 1,
              x: 0,
            }}
            viewport={{
              once: true,
              amount: 0.16,
              margin: "-40px",
            }}
            transition={{
              duration: 0.6,
              ease: EASE,
            }}
            className="
              group
              relative
              overflow-hidden
              rounded-2xl
              border
              border-ink/[0.08]
              bg-paper
              shadow-[0_18px_55px_rgba(25,25,25,0.06)]
            "
          >
            <div
              className="
                relative
                aspect-[16/9]
                overflow-hidden

                sm:aspect-[16/8]

                lg:min-h-[360px]
                lg:aspect-auto
              "
            >
              <Image
                src="/images/about.webp"
                alt="Clean energy and industrial market in Pune, Maharashtra"
                fill
                sizes="(max-width: 1024px) 100vw, 55vw"
                className="
                  object-cover

                  transition-transform
                  duration-700
                  ease-out

                  group-hover:scale-[1.018]
                "
              />

              <div
                aria-hidden="true"
                className="
                  absolute
                  inset-0
                  bg-gradient-to-t
                  from-ink/80
                  via-ink/10
                  to-transparent
                "
              />

              {/* location */}

              <div
                className="
                  absolute
                  left-4
                  top-4
                  flex
                  items-center
                  gap-2
                  rounded-full
                  border
                  border-paper/30
                  bg-paper/90
                  px-3
                  py-1.5
                  backdrop-blur-md
                "
              >
                <MapPin
                  aria-hidden="true"
                  className="
                    size-3
                    text-blue
                  "
                  strokeWidth={1.8}
                />

                <span
                  className="
                    text-[9px]
                    font-semibold
                    uppercase
                    tracking-[0.13em]
                    text-ink/60
                  "
                >
                  Pune · Maharashtra
                </span>
              </div>

              {/* Image bottom */}

              <div
                className="
                  absolute
                  inset-x-0
                  bottom-0
                  p-5

                  sm:p-6
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
                  Industrial Energy Hub
                </span>

                <p
                  className="
                    mt-2
                    max-w-[460px]
                    font-display
                    text-[1.25rem]
                    font-semibold
                    leading-[1.08]
                    tracking-[-0.025em]
                    text-paper

                    sm:text-[1.4rem]
                  "
                >
                  Industrial Access Meets Clean-Energy Growth
                </p>

                <div
                  aria-hidden="true"
                  className="
                    mt-4
                    flex
                    items-center
                    gap-2
                  "
                >
                  <span className="h-px w-10 bg-solar" />
                  <span className="size-1 rounded-full bg-solar" />
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* =================================================
            Capabilities Rail
            ================================================= */}

        <motion.div
          variants={parentVariants}
          initial={reduceMotion ? false : "hidden"}
          whileInView="visible"
          viewport={{
            once: true,
            amount: 0.08,
            margin: "-50px",
          }}
          className="
            mt-10
            overflow-hidden
            rounded-2xl
            border
            border-ink/[0.08]
            bg-paper/75
            backdrop-blur-sm

            lg:mt-12
          "
        >
          {/* rail header */}

          <motion.div
            variants={revealVariants}
            className="
              flex
              items-center
              justify-between
              gap-5
              border-b
              border-ink/[0.08]
              px-5
              py-4

              sm:px-6
            "
          >
            <div>
              <span
                className="
                  text-[9px]
                  font-semibold
                  uppercase
                  tracking-[0.14em]
                  text-blue
                "
              >
                Pune Advantage
              </span>

              <p
                className="
                  mt-1
                  text-[12px]
                  text-ink/42
                "
              >
                Connected industry ecosystem for clean-energy growth.
              </p>
            </div>

            <span
              aria-hidden="true"
              className="
                hidden
                text-[9px]
                font-semibold
                tracking-[0.13em]
                text-ink/20

                sm:block
              "
            >
              01 — 06
            </span>
          </motion.div>

          {/* Items */}

          <div
            className="
              grid

              sm:grid-cols-2

              lg:grid-cols-3
            "
          >
            {PUNE_MARKET.map((item, index) => {
              const Icon =
                PUNE_ICONS[index] ?? Factory;

              return (
                <motion.article
                  key={item.title}
                  variants={revealVariants}
                  className="
                    group
                    relative
                    min-h-[150px]
                    border-ink/[0.08]
                    p-5

                    transition-colors
                    duration-400

                    hover:bg-solar/[0.035]

                    sm:border-r

                    sm:[&:nth-child(2n)]:border-r-0
                    sm:[&:nth-child(-n+4)]:border-b

                    lg:min-h-[165px]
                    lg:border-r
                    lg:p-6

                    lg:[&:nth-child(2n)]:border-r
                    lg:[&:nth-child(3n)]:border-r-0
                    lg:[&:nth-child(-n+3)]:border-b

                    max-sm:border-b
                    max-sm:last:border-b-0
                  "
                >
                  <span
                    aria-hidden="true"
                    className="
                      absolute
                      left-0
                      top-0
                      h-0
                      w-[2px]
                      bg-solar

                      transition-[height]
                      duration-500

                      group-hover:h-full
                    "
                  />

                  <div
                    className="
                      flex
                      items-start
                      gap-4
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

                    <div
                      className="
                        min-w-0
                        flex-1
                      "
                    >
                      <div
                        className="
                          flex
                          items-start
                          justify-between
                          gap-3
                        "
                      >
                        <h3
                          className="
                            max-w-[240px]
                            font-display
                            text-[1.05rem]
                            font-semibold
                            leading-[1.12]
                            tracking-[-0.018em]
                            text-ink

                            sm:text-[1.1rem]
                          "
                        >
                          {item.title}
                        </h3>

                        <span
                          aria-hidden="true"
                          className="
                            text-[8px]
                            font-semibold
                            tracking-[0.13em]
                            text-ink/18
                          "
                        >
                          {String(index + 1).padStart(2, "0")}
                        </span>
                      </div>

                      <span
                        aria-hidden="true"
                        className="
                          mt-5
                          block
                          h-px
                          w-6
                          bg-blue/15

                          transition-[width,background-color]
                          duration-400

                          group-hover:w-11
                          group-hover:bg-solar
                        "
                      />
                    </div>
                  </div>
                </motion.article>
              );
            })}
          </div>
        </motion.div>

        {/* Bottom accent */}

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
          aria-hidden="true"
          className="
            mt-8
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