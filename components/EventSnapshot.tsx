"use client";

import {
  CalendarDays,
  Handshake,
  MapPin,
  PanelsTopLeft,
  Zap,
} from "lucide-react";

import {
  motion,
  useReducedMotion,
} from "framer-motion";

import { Container } from "@/components/ui/Container";
import { CountdownTimer } from "@/components/CountdownTimer";

/* =========================================================
   Data
   ========================================================= */

const SNAPSHOT_ITEMS = [
  {
    label: "3-Day B2B Expo",
    icon: CalendarDays,
  },
  {
    label: "Pune, India",
    icon: MapPin,
  },
  {
    label: "Solar + Storage + EV Ecosystem",
    icon: Zap,
  },
  {
    label: "Exhibitions + Workshops",
    icon: PanelsTopLeft,
  },
  {
    label: "Networking + B2B Matchmaking",
    icon: Handshake,
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
      staggerChildren: 0.055,
      delayChildren: 0.04,
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
   Event Snapshot
   ========================================================= */

export function EventSnapshot() {
  const reduceMotion = useReducedMotion();

  return (
    <section
      id="snapshot"
      aria-labelledby="snapshot-heading"
      className="
        relative
        isolate
        overflow-hidden
        bg-paper
        text-ink
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
        <div
          className="
            absolute
            -left-56
            top-16
            size-[32rem]
            rounded-full
            bg-blue/[0.035]
            blur-[110px]
          "
        />

        <div
          className="
            absolute
            -right-44
            bottom-0
            size-[26rem]
            rounded-full
            bg-solar/[0.055]
            blur-[100px]
          "
        />

        {/* Static solar geometry for smoother scroll */}

        <svg
          viewBox="0 0 620 620"
          fill="none"
          className="
            absolute
            -right-52
            top-1/2
            size-[560px]
            -translate-y-1/2
            text-blue
            opacity-[0.035]

            lg:-right-32
            lg:size-[680px]
          "
        >
          <circle
            cx="310"
            cy="310"
            r="130"
            stroke="currentColor"
          />

          <circle
            cx="310"
            cy="310"
            r="210"
            stroke="currentColor"
            strokeDasharray="5 14"
          />

          <circle
            cx="310"
            cy="310"
            r="290"
            stroke="currentColor"
          />

          <path
            d="M310 20V600"
            stroke="currentColor"
          />

          <path
            d="M20 310H600"
            stroke="currentColor"
          />
        </svg>
      </div>

      <Container
        className="
          py-14
          sm:py-16
          lg:py-20
        "
      >
        <motion.div
          variants={sectionVariants}
          initial={reduceMotion ? false : "hidden"}
          whileInView="visible"
          viewport={{
            once: true,
            amount: 0.16,
            margin: "-40px",
          }}
          className="
            grid
            gap-12

            lg:grid-cols-[0.92fr_1.08fr]
            lg:items-center
            lg:gap-16
          "
        >
          {/* =================================================
              Left
              ================================================= */}

          <motion.div
            variants={revealVariants}
            className="
              max-w-[600px]
            "
          >
            {/* Eyebrow */}

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
                Countdown to the Show
              </span>
            </div>

            {/* Heading */}

            <h2
              id="snapshot-heading"
              className="
                mt-4
                max-w-[560px]
                font-display
                text-[clamp(2.25rem,4vw,4.25rem)]
                font-semibold
                leading-[0.98]
                tracking-[-0.035em]
                text-ink
              "
            >
              Doors Open
              <span
                className="
                  block
                  text-blue
                "
              >
                02 October 2026
              </span>
            </h2>

            {/* Description */}

            <p
              className="
                mt-5
                max-w-[560px]
                text-sm
                leading-7
                tracking-[-0.005em]
                text-ink/55

                sm:text-[15px]
              "
            >
              Mark your calendar — three days of exhibitions, workshops,
              and B2B dealmaking at Pune’s premier clean-energy venue.
            </p>

            {/* Countdown */}

            <div
              className="
                mt-7
                max-w-[560px]
              "
            >
              <CountdownTimer />
            </div>
          </motion.div>

          {/* =================================================
              Right
              ================================================= */}

          <motion.div
            variants={sectionVariants}
            className="
              relative
            "
          >
            {/* Rail */}

            <div
              aria-hidden="true"
              className="
                absolute
                bottom-4
                left-[19px]
                top-4
                w-px
                bg-ink/[0.08]
              "
            />

            <div>
              {SNAPSHOT_ITEMS.map((item, index) => {
                const Icon = item.icon;

                return (
                  <motion.div
                    key={item.label}
                    variants={revealVariants}
                    className="
                      group
                      relative
                      flex
                      items-center
                      gap-4
                      py-3.5

                      sm:gap-5
                      sm:py-4
                    "
                  >
                    {/* Icon */}

                    <div
                      className="
                        relative
                        z-10
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
                      <Icon
                        aria-hidden="true"
                        className="size-4"
                        strokeWidth={1.7}
                      />
                    </div>

                    {/* Content */}

                    <div
                      className="
                        flex
                        min-w-0
                        flex-1
                        items-center
                        justify-between
                        gap-4
                        border-b
                        border-ink/[0.08]
                        pb-3.5

                        sm:pb-4
                      "
                    >
                      <div className="min-w-0">
                        <p
                          className="
                            text-[9px]
                            font-semibold
                            uppercase
                            tracking-[0.13em]
                            text-ink/30
                          "
                        >
                          {String(index + 1).padStart(2, "0")}
                        </p>

                        <p
                          className="
                            mt-1
                            font-display
                            text-[1.05rem]
                            font-semibold
                            leading-[1.15]
                            tracking-[-0.018em]
                            text-ink

                            sm:text-[1.15rem]
                            lg:text-[1.22rem]
                          "
                        >
                          {item.label}
                        </p>
                      </div>

                      <span
                        aria-hidden="true"
                        className="
                          hidden
                          h-px
                          w-6
                          shrink-0
                          bg-blue/15
                          transition-[width,background-color]
                          duration-300
                          ease-out

                          group-hover:w-9
                          group-hover:bg-solar

                          sm:block
                        "
                      />
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>
        </motion.div>
      </Container>
    </section>
  );
}