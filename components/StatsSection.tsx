"use client";

import { BatteryCharging, Building2, CalendarDays, MapPin } from "lucide-react";

import { motion, useReducedMotion } from "framer-motion";

import { Container } from "@/components/ui/Container";

/* =========================================================
   Data
   ========================================================= */

const STATS = [
  {
    index: "01",
    value: "02-03-04",
    suffix: "Oct. 2026",
    label: "Show Dates",
    icon: CalendarDays,
  },
  {
    index: "02",
    value: "Auto Cluster",
    suffix: "Pune",
    label: "Exhibition Venue",
    icon: MapPin,
  },
  {
    index: "03",
    value: "Futurex",
    suffix: "Trade Fair & Events",
    label: "Organised By",
    icon: Building2,
  },
  {
    index: "04",
    value: "Battery + EV",
    suffix: "Co-located Shows",
    label: "Energy Ecosystem",
    icon: BatteryCharging,
  },
] as const;

/* =========================================================
   Motion
   ========================================================= */

const EASE = [0.16, 1, 0.3, 1] as const;

const containerVariants = {
  hidden: {},

  visible: {
    transition: {
      staggerChildren: 0.09,
      delayChildren: 0.08,
    },
  },
};

const statVariants = {
  hidden: {
    opacity: 0,
    y: 28,
  },

  visible: {
    opacity: 1,
    y: 0,

    transition: {
      duration: 0.72,
      ease: EASE,
    },
  },
};

/* =========================================================
   Stats Section
   ========================================================= */

export function StatsSection() {
  const reduceMotion = useReducedMotion();

  return (
    <section
      aria-label="India International Solar Show event highlights"
      className="
        relative
        isolate
        overflow-hidden
        bg-ink
        text-paper
      "
    >
      {/* ===================================================
          Background
          =================================================== */}

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
        {/* Solar wash */}

        <div
          className="
            absolute
            -right-44
            -top-52
            size-[34rem]
            rounded-full
            bg-solar/[0.08]
            blur-[110px]
          "
        />

        {/* Blue wash */}

        <div
          className="
            absolute
            -bottom-52
            -left-40
            size-[34rem]
            rounded-full
            bg-blue/[0.17]
            blur-[120px]
          "
        />

        {/* Solar geometry */}

        <motion.svg
          viewBox="0 0 520 520"
          fill="none"
          className="
            absolute
            -right-48
            -top-60
            size-[580px]
            text-paper
            opacity-[0.035]

            lg:-right-28
            lg:size-[680px]
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
                  duration: 100,
                  repeat: Infinity,
                  ease: "linear",
                }
          }
        >
          <circle cx="260" cy="260" r="110" stroke="currentColor" />

          <circle
            cx="260"
            cy="260"
            r="180"
            stroke="currentColor"
            strokeDasharray="4 12"
          />

          <circle cx="260" cy="260" r="245" stroke="currentColor" />

          <path d="M260 0V520" stroke="currentColor" />

          <path d="M0 260H520" stroke="currentColor" />
        </motion.svg>
      </div>

      {/* ===================================================
          Solar top accent
          =================================================== */}

      <motion.div
        aria-hidden="true"
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
          duration: 1,
          ease: EASE,
        }}
        className="
          absolute
          inset-x-0
          top-0
          h-[3px]
          origin-left
          bg-solar
        "
      />

      <Container
        className="
          py-10
          sm:py-12
          lg:py-0
        "
      >
        <motion.div
          variants={containerVariants}
          initial={reduceMotion ? false : "hidden"}
          whileInView="visible"
          viewport={{
            once: true,
            amount: 0.2,
          }}
          className="
            grid

            sm:grid-cols-2

            lg:grid-cols-4
          "
        >
          {STATS.map((stat, index) => {
            const Icon = stat.icon;

            return (
              <motion.article
                key={stat.label}
                variants={statVariants}
                className="
                  group
                  relative
                  flex
                  min-h-[190px]
                  flex-col
                  justify-between
                  border-paper/10
                  py-7

                  sm:min-h-[210px]
                  sm:px-6
                  sm:py-8
                  sm:[&:nth-child(odd)]:border-r
                  sm:[&:nth-child(-n+2)]:border-b

                  lg:min-h-[230px]
                  lg:border-b-0
                  lg:border-r
                  lg:px-7
                  lg:py-9
                  lg:[&:nth-child(4)]:border-r-0

                  xl:px-9
                "
              >
                {/* -----------------------------------------
                    Top
                    ----------------------------------------- */}

                <div
                  className="
                    flex
                    items-center
                    justify-between
                    gap-5
                  "
                >
                  <span
                    className="
                      font-display
                      text-[11px]
                      font-semibold
                      tracking-[0.16em]
                      text-paper/25
                    "
                  >
                    {stat.index}
                  </span>

                  <div
                    className="
                      flex
                      size-10
                      shrink-0
                      items-center
                      justify-center
                      rounded-full
                      border
                      border-paper/10
                      bg-paper/[0.04]
                      text-solar
                      transition-all
                      duration-500

                      group-hover:border-solar
                      group-hover:bg-solar
                      group-hover:text-ink
                    "
                  >
                    <Icon
                      aria-hidden="true"
                      className="size-[17px]"
                      strokeWidth={1.7}
                    />
                  </div>
                </div>

                {/* -----------------------------------------
                    Stat
                    ----------------------------------------- */}

                <div className="mt-9">
                  <p
                    className="
                      text-[10px]
                      font-semibold
                      uppercase
                      tracking-[0.15em]
                      text-paper/35
                    "
                  >
                    {stat.label}
                  </p>

                  <div className="mt-2.5">
                    <p
                      className="
                        font-display
                        text-[clamp(1.65rem,2.5vw,2.35rem)]
                        font-semibold
                        leading-[0.98]
                        tracking-[-0.035em]
                        text-paper
                      "
                    >
                      {stat.value}
                    </p>

                    <p
                      className="
                        mt-1.5
                        text-[12px]
                        font-medium
                        leading-5
                        text-paper/42
                      "
                    >
                      {stat.suffix}
                    </p>
                  </div>
                </div>

                {/* Hover line */}

                <span
                  aria-hidden="true"
                  className="
                    absolute
                    inset-x-0
                    bottom-0
                    h-px
                    bg-paper/10
                  "
                />

                <span
                  aria-hidden="true"
                  className="
                    absolute
                    bottom-0
                    left-0
                    h-px
                    w-0
                    bg-solar
                    transition-[width]
                    duration-700
                    ease-out

                    group-hover:w-full
                  "
                />

                {/* First card solar marker */}

                {index === 0 ? (
                  <span
                    aria-hidden="true"
                    className="
                      absolute
                      left-0
                      top-1/2
                      hidden
                      h-12
                      w-[3px]
                      -translate-y-1/2
                      rounded-full
                      bg-solar

                      lg:block
                    "
                  />
                ) : null}
              </motion.article>
            );
          })}
        </motion.div>
      </Container>
    </section>
  );
}
