"use client";

import {
  Award,
  BatteryCharging,
  Handshake,
  Landmark,
  LayoutGrid,
  Network,
  Presentation,
} from "lucide-react";

import {
  motion,
  useReducedMotion,
} from "framer-motion";

import { SHOW_HIGHLIGHTS } from "@/data/siteData";

import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";

/* =========================================================
   Icons
   ========================================================= */

const ICONS = [
  LayoutGrid,
  BatteryCharging,
  Network,
  Presentation,
  Handshake,
  Award,
  Landmark,
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

function HighlightsBackground({
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
      {/* Solar atmosphere */}
      <div
        className="
          absolute
          -right-40
          -top-36
          size-[30rem]
          rounded-full
          bg-solar/[0.07]
          blur-[110px]
        "
      />

      {/* Blue depth */}
      <div
        className="
          absolute
          -bottom-52
          -left-44
          size-[36rem]
          rounded-full
          bg-blue/[0.16]
          blur-[130px]
        "
      />

      {/* Solar orbital geometry */}
      <motion.svg
        viewBox="0 0 900 900"
        fill="none"
        className="
          absolute
          -right-[320px]
          -top-[360px]
          size-[820px]
          text-paper
          opacity-[0.028]

          lg:-right-[220px]
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
                duration: 130,
                repeat: Infinity,
                ease: "linear",
              }
        }
      >
        <circle
          cx="450"
          cy="450"
          r="155"
          stroke="currentColor"
        />

        <circle
          cx="450"
          cy="450"
          r="245"
          stroke="currentColor"
          strokeDasharray="4 15"
        />

        <circle
          cx="450"
          cy="450"
          r="350"
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
        />
      </motion.svg>
    </div>
  );
}

/* =========================================================
   Highlight Item
   ========================================================= */

function HighlightItem({
  item,
  index,
  featured = false,
}: {
  item: (typeof SHOW_HIGHLIGHTS)[number];
  index: number;
  featured?: boolean;
}) {
  const Icon = ICONS[index] ?? LayoutGrid;

  return (
    <motion.article
      variants={revealVariants}
      className={`
        group
        relative
        overflow-hidden
        rounded-2xl
        border
        border-paper/10
        bg-paper/[0.035]
        backdrop-blur-sm

        ${
          featured
            ? "p-6 sm:p-7 lg:p-8"
            : "p-5 sm:p-6"
        }
      `}
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

          group-hover:bg-solar/[0.035]
        "
      />

      {/* Accent rail */}
      <span
        aria-hidden="true"
        className="
          absolute
          left-0
          top-0
          h-0
          w-[3px]
          bg-solar
          transition-[height]
          duration-500
          ease-out

          group-hover:h-full
        "
      />

      {/* Large background number */}
      <span
        aria-hidden="true"
        className={`
          pointer-events-none
          absolute
          -bottom-3
          -right-1
          font-display
          font-semibold
          leading-none
          tracking-[-0.07em]
          text-paper/[0.025]
          transition-[opacity,transform]
          duration-500

          group-hover:-translate-x-1
          group-hover:text-paper/[0.045]

          ${
            featured
              ? "text-[5.2rem]"
              : "text-[4.3rem]"
          }
        `}
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
              border-paper/10
              bg-paper/[0.04]
              text-solar
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
              text-paper/20
            "
          >
            {String(index + 1).padStart(2, "0")}
          </span>
        </div>

        {/* Content */}
        <div
          className={
            featured
              ? "mt-10 max-w-[420px]"
              : "mt-7 max-w-[300px]"
          }
        >
          <h3
            className={
              featured
                ? `
                    font-display
                    text-[1.4rem]
                    font-semibold
                    leading-[1.05]
                    tracking-[-0.025em]
                    text-paper

                    sm:text-[1.55rem]
                  `
                : `
                    font-display
                    text-[1.08rem]
                    font-semibold
                    leading-[1.1]
                    tracking-[-0.018em]
                    text-paper

                    sm:text-[1.15rem]
                  `
            }
          >
            {item.title}
          </h3>

          <p
            className="
              mt-2.5
              max-w-md
              text-[13px]
              leading-6
              text-paper/45
            "
          >
            {item.desc}
          </p>
        </div>

        {/* Bottom line */}
        <div
          className="
            mt-auto
            pt-7
          "
        >
          <span
            aria-hidden="true"
            className="
              block
              h-px
              w-7
              bg-paper/15
              transition-[width,background-color]
              duration-500
              ease-out

              group-hover:w-12
              group-hover:bg-solar
            "
          />
        </div>
      </div>
    </motion.article>
  );
}

/* =========================================================
   Show Highlights
   ========================================================= */

export function ShowHighlights() {
  const reduceMotion = useReducedMotion();

  const primaryHighlights = SHOW_HIGHLIGHTS.slice(0, 2);
  const remainingHighlights = SHOW_HIGHLIGHTS.slice(2);

  return (
    <section
      id="highlights"
      aria-labelledby="highlights-heading"
      className="
        relative
        isolate
        overflow-hidden
        bg-ink
        text-paper
      "
    >
      <HighlightsBackground reduceMotion={reduceMotion} />

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
            amount: 0.16,
            margin: "-40px",
          }}
          className="
            grid
            gap-8
            border-b
            border-paper/10
            pb-10

            lg:grid-cols-[0.92fr_1.08fr]
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
                  text-solar

                  sm:text-[11px]
                "
              >
                Show Highlights
              </span>
            </div>

            <h2
              id="highlights-heading"
              className="
                mt-4
                max-w-[590px]
                font-display
                text-[clamp(2.25rem,3.7vw,3.85rem)]
                font-semibold
                leading-[0.98]
                tracking-[-0.035em]
                text-paper
              "
            >
              What to Expect
              <span
                className="
                  block
                  text-solar
                "
              >
                on the Show Floor
              </span>
            </h2>
          </motion.div>

          {/* Right */}

          <motion.div
            variants={revealVariants}
            className="
              max-w-[520px]

              lg:justify-self-end
            "
          >
            <p
              className="
                text-sm
                leading-7
                tracking-[-0.005em]
                text-paper/48

                sm:text-[15px]
              "
            >
              Solar technologies, energy storage, microgrids,
              technical workshops, B2B matchmaking, innovation,
              and policy participation.
            </p>

        
          </motion.div>
        </motion.div>

        {/* =================================================
            Featured Highlights
            ================================================= */}

        <motion.div
          variants={groupVariants}
          initial={reduceMotion ? false : "hidden"}
          whileInView="visible"
          viewport={{
            once: true,
            amount: 0.14,
            margin: "-50px",
          }}
          className="
            mt-10
            grid
            gap-3

            lg:mt-12
            lg:grid-cols-2
          "
        >
          {primaryHighlights.map((item, index) => (
            <HighlightItem
              key={item.title}
              item={item}
              index={index}
              featured
            />
          ))}
        </motion.div>

        {/* =================================================
            Secondary Highlights
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
            mt-3
            grid
            gap-3

            sm:grid-cols-2
            lg:grid-cols-3
          "
        >
          {remainingHighlights.map((item, itemIndex) => {
            const realIndex = itemIndex + 2;

            return (
              <HighlightItem
                key={item.title}
                item={item}
                index={realIndex}
              />
            );
          })}
        </motion.div>

        {/* =================================================
            Footer / CTA
            ================================================= */}

        <motion.div
          initial={
            reduceMotion
              ? false
              : {
                  opacity: 0,
                  y: 14,
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
            duration: 0.56,
            ease: EASE,
          }}
          className="
            mt-9
            flex
            flex-col
            gap-5
            border-t
            border-paper/10
            pt-7

            sm:flex-row
            sm:items-center
            sm:justify-between
          "
        >
          <p
            className="
              max-w-md
              text-[12px]
              leading-6
              text-paper/35
            "
          >
            Explore participation opportunities across India&apos;s
            growing solar, storage and clean-energy ecosystem.
          </p>

          <Button
            href="https://app.warpbay.com/E2yy0Klq"
            external
            size="lg"
          >
            Explore Participation Opportunities
          </Button>
        </motion.div>
      </Container>
    </section>
  );
}