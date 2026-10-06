"use client";

import { useMemo, useState } from "react";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";

import {
  ArrowUpRight,
  BadgeCheck,
  Building2,
  Filter,
  Sparkles,
} from "lucide-react";

import { EXHIBITOR_FILTERS, EXHIBITOR_SEGMENTS } from "@/data/siteData";

import { Container } from "@/components/ui/Container";
import { Icon } from "@/components/ui/Icon";
import { Button } from "@/components/ui/Button";

/* =========================================================
   Constants
   ========================================================= */

const STALL_URL = "https://app.warpbay.com/E2yy0Klq";

const EASE = [0.16, 1, 0.3, 1] as const;

/* =========================================================
   Motion
   ========================================================= */

const groupVariants = {
  hidden: {},

  visible: {
    transition: {
      staggerChildren: 0.05,
      delayChildren: 0.025,
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
   Background
   ========================================================= */

function ExhibitorBackground({
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
      {/* blue atmospheric glow */}

      <div
        className="
          absolute
          -right-48
          -top-48
          size-[36rem]
          rounded-full
          bg-blue/[0.055]
          blur-[140px]
        "
      />

      {/* solar atmospheric glow */}

      <div
        className="
          absolute
          -bottom-48
          -left-44
          size-[32rem]
          rounded-full
          bg-solar/[0.065]
          blur-[130px]
        "
      />

      {/* ===================================================
          Main geometry
          =================================================== */}

      <motion.svg
        viewBox="0 0 900 900"
        fill="none"
        className="
          absolute
          -right-[390px]
          -top-[390px]
          size-[860px]
          text-blue
          opacity-[0.027]

          sm:-right-[320px]
          sm:size-[940px]

          lg:-right-[220px]
          lg:size-[1050px]
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
                duration: 170,
                repeat: Infinity,
                ease: "linear",
              }
        }
      >
        <circle cx="450" cy="450" r="125" stroke="currentColor" />

        <circle
          cx="450"
          cy="450"
          r="215"
          stroke="currentColor"
          strokeDasharray="4 17"
        />

        <circle cx="450" cy="450" r="315" stroke="currentColor" />

        <circle
          cx="450"
          cy="450"
          r="400"
          stroke="currentColor"
          strokeDasharray="2 24"
        />

        <path d="M450 28V872" stroke="currentColor" />

        <path d="M28 450H872" stroke="currentColor" />

        <path d="M152 152L748 748" stroke="currentColor" />

        <path d="M748 152L152 748" stroke="currentColor" />

        <circle cx="450" cy="135" r="6" fill="#FBB216" stroke="none" />
      </motion.svg>

      {/* ===================================================
          Counter geometry
          =================================================== */}

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
          opacity-[0.03]

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
                duration: 210,
                repeat: Infinity,
                ease: "linear",
              }
        }
      >
        <circle cx="250" cy="250" r="95" stroke="currentColor" />

        <circle
          cx="250"
          cy="250"
          r="165"
          stroke="currentColor"
          strokeDasharray="3 15"
        />

        <circle cx="250" cy="250" r="232" stroke="currentColor" />

        <path d="M250 18V482" stroke="currentColor" />

        <path d="M18 250H482" stroke="currentColor" />

        <circle cx="250" cy="85" r="4" fill="#FBB216" stroke="none" />
      </motion.svg>
    </div>
  );
}

/* =========================================================
   Filter
   ========================================================= */

function FilterButton({
  label,
  active,
  onClick,
}: {
  label: string;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={`
        relative
        shrink-0
        overflow-hidden
        rounded-full
        border
        px-4
        py-2.5
        text-[10px]
        font-semibold
        tracking-[0.07em]

        transition-[background-color,color,border-color]
        duration-300

        focus-visible:outline-none
        focus-visible:ring-2
        focus-visible:ring-blue/20

        ${
          active
            ? `
              border-blue
              bg-blue
              text-paper
            `
            : `
              border-ink/[0.09]
              bg-paper/75
              text-ink/45

              hover:border-blue/25
              hover:text-blue
            `
        }
      `}
    >
      {label}

      {active && (
        <motion.span
          layoutId="exhibitor-active-filter"
          aria-hidden="true"
          className="
            absolute
            inset-x-4
            bottom-0
            h-[2px]
            bg-solar
          "
          transition={{
            duration: 0.35,
            ease: EASE,
          }}
        />
      )}
    </button>
  );
}

/* =========================================================
   Segment Card
   ========================================================= */

function SegmentCard({
  segment,
  index,
}: {
  segment: (typeof EXHIBITOR_SEGMENTS)[number];
  index: number;
}) {
  const featured = index < 2;

  return (
    <motion.article
      layout
      initial={{
        opacity: 0,
        y: 14,
      }}
      animate={{
        opacity: 1,
        y: 0,
      }}
      exit={{
        opacity: 0,
        y: 8,
      }}
      transition={{
        opacity: {
          duration: 0.28,
        },

        y: {
          duration: 0.4,
          ease: EASE,
        },

        layout: {
          duration: 0.42,
          ease: EASE,
        },
      }}
      className={`
        group
        relative
        isolate
        flex
        flex-col
        overflow-hidden
        rounded-2xl
        border
        border-ink/[0.08]
        bg-paper/90
        backdrop-blur-sm

        transition-[border-color,background-color,box-shadow]
        duration-500

        hover:border-blue/15
        hover:bg-paper
        hover:shadow-[0_18px_50px_rgba(25,25,25,0.05)]

        ${
          featured
            ? `
              min-h-[268px]
              p-5

              sm:p-6
            `
            : `
              min-h-[218px]
              p-5
            `
        }
      `}
    >
      {/* hover glow */}

      <div
        aria-hidden="true"
        className="
          absolute
          -right-16
          -top-20
          size-48
          rounded-full
          bg-blue/[0.05]
          opacity-0
          blur-[70px]

          transition-opacity
          duration-500

          group-hover:opacity-100
        "
      />

      {/* solar accent */}

      <span
        aria-hidden="true"
        className="
          absolute
          inset-x-0
          top-0
          h-[2px]
          origin-left
          scale-x-[0.16]
          bg-solar

          transition-transform
          duration-500

          group-hover:scale-x-100
        "
      />

      {/* background number */}

      <span
        aria-hidden="true"
        className={`
          absolute
          -bottom-5
          -right-1
          font-display
          font-semibold
          leading-none
          tracking-[-0.08em]
          text-ink/[0.025]

          ${featured ? "text-[6.8rem]" : "text-[5.2rem]"}
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
          flex-1
          flex-col
        "
      >
        {/* top */}

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
              bg-blue/[0.05]
              text-blue

              transition-[background-color,color,border-color]
              duration-300

              group-hover:border-solar
              group-hover:bg-solar
              group-hover:text-ink
            "
          >
            <Icon name={segment.icon} size={17} aria-hidden="true" />
          </div>

          <span
            className="
              pt-1
              text-[8px]
              font-semibold
              uppercase
              tracking-[0.13em]
              text-ink/18
            "
          >
            {String(index + 1).padStart(2, "0")}
          </span>
        </div>

        {/* title */}

        <h3
          className={`
            font-display
            font-semibold
            leading-[1.08]
            tracking-[-0.025em]
            text-ink

            ${
              featured
                ? `
                  mt-8
                  text-[1.35rem]

                  sm:text-[1.45rem]
                `
                : `
                  mt-6
                  text-[1.12rem]
                `
            }
          `}
        >
          {segment.title}
        </h3>

        {/* description */}

        <p
          className="
            mt-2.5
            max-w-[440px]
            text-[12px]
            leading-6
            text-ink/48
          "
        >
          {segment.desc}
        </p>

        {/* categories */}

        <div
          className="
            mt-4
            flex
            flex-wrap
            gap-1.5
          "
        >
          {segment.categories.map((category) => (
            <span
              key={category}
              className="
                  rounded-full
                  border
                  border-ink/[0.07]
                  bg-ink/[0.018]
                  px-2.5
                  py-1
                  text-[8px]
                  font-semibold
                  uppercase
                  tracking-[0.09em]
                  text-ink/32
                "
            >
              {category}
            </span>
          ))}
        </div>

        {/* CTA */}

        <a
          href={STALL_URL}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`Book exhibition stall in ${segment.title} segment`}
          className="
            group/link
            mt-auto
            inline-flex
            items-center
            gap-2
            pt-6
            text-[9px]
            font-semibold
            uppercase
            tracking-[0.12em]
            text-blue

            transition-colors
            duration-300

            hover:text-ink
          "
        >
          Exhibit in this segment
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
    </motion.article>
  );
}

/* =========================================================
   Exhibitor Profile
   ========================================================= */

export function ExhibitorProfile() {
  const [filter, setFilter] =
    useState<(typeof EXHIBITOR_FILTERS)[number]>("All");

  const reduceMotion = useReducedMotion();

  const filtered = useMemo(() => {
    if (filter === "All") {
      return EXHIBITOR_SEGMENTS;
    }

    return EXHIBITOR_SEGMENTS.filter((segment) =>
      segment.categories.includes(filter),
    );
  }, [filter]);

  return (
    <section
      id="exhibitors"
      aria-labelledby="exhibitor-profile-heading"
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
      <ExhibitorBackground reduceMotion={reduceMotion} />

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
            amount: 0.15,
            margin: "-40px",
          }}
          className="
            grid
            gap-7
            border-b
            border-ink/[0.08]
            pb-9

            lg:grid-cols-[1fr_0.74fr]
            lg:items-end
            lg:gap-14
            lg:pb-11
          "
        >
          <motion.div variants={revealVariants}>
            {/* eyebrow */}

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
                Exhibitor Profile
              </span>
            </div>

            {/* heading */}

            <h2
              id="exhibitor-profile-heading"
              className="
                mt-4
                max-w-[730px]
                font-display
                text-[clamp(2.1rem,3.5vw,3.6rem)]
                font-semibold
                leading-[0.98]
                tracking-[-0.035em]
                text-ink
              "
            >
              Explore the Complete
              <span
                className="
                  block
                  text-blue
                "
              >
                Clean-Energy Value Chain
              </span>
            </h2>
          </motion.div>

          {/* intro */}

          <motion.div
            variants={revealVariants}
            className="
              max-w-[510px]

              lg:justify-self-end
            "
          >
            <p
              className="
                text-sm
                leading-7
                text-ink/52

                sm:text-[15px]
              "
            >
              Discover exhibitors across solar PV, storage, wind, microgrids,
              EPC, manufacturing, finance, policy and clean-energy innovation.
            </p>

            <div
              className="
                mt-5
                flex
                items-center
                gap-3
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
                <Building2
                  aria-hidden="true"
                  className="size-4"
                  strokeWidth={1.75}
                />
              </div>

              <div>
                <span
                  className="
                    block
                    text-[9px]
                    font-semibold
                    uppercase
                    tracking-[0.13em]
                    text-blue
                  "
                >
                  Industry Coverage
                </span>

                <span
                  className="
                    mt-0.5
                    block
                    text-[11px]
                    font-medium
                    text-ink/45
                  "
                >
                  {EXHIBITOR_SEGMENTS.length} exhibitor segments
                </span>
              </div>
            </div>
          </motion.div>
        </motion.div>

        {/* =================================================
            Filter Rail
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
            amount: 0.2,
          }}
          transition={{
            duration: 0.5,
            ease: EASE,
          }}
          className="
            mt-7
            flex
            items-center
            gap-3
          "
        >
          <div
            className="
              hidden
              size-9
              shrink-0
              items-center
              justify-center
              rounded-full
              border
              border-ink/[0.08]
              bg-paper
              text-blue

              sm:flex
            "
          >
            <Filter aria-hidden="true" className="size-3.5" strokeWidth={1.8} />
          </div>

          <div
            role="group"
            aria-label="Filter exhibitor product segments"
            className="
              flex
              min-w-0
              flex-1
              gap-2
              overflow-x-auto
              pb-1

              [scrollbar-width:none]

              [&::-webkit-scrollbar]:hidden
            "
          >
            {EXHIBITOR_FILTERS.map((item) => (
              <FilterButton
                key={item}
                label={item}
                active={filter === item}
                onClick={() => setFilter(item)}
              />
            ))}
          </div>

          <span
            className="
              hidden
              shrink-0
              text-[9px]
              font-semibold
              uppercase
              tracking-[0.12em]
              text-ink/24

              lg:block
            "
          >
            {filtered.length} shown
          </span>
        </motion.div>

        {/* =================================================
            SEO semantic content
            ================================================= */}

        <div className="sr-only">
          <h3>Full List of Solar and Renewable Energy Exhibitor Categories</h3>

          <ul>
            {EXHIBITOR_SEGMENTS.map((segment) => (
              <li key={segment.title}>
                <h4>{segment.title}</h4>

                <p>{segment.desc}</p>
              </li>
            ))}
          </ul>
        </div>

        {/* =================================================
            Result Grid
            ================================================= */}

        <motion.div
          layout
          className="
            mt-6
            grid
            grid-cols-1
            gap-3

            sm:grid-cols-2

            lg:grid-cols-3
          "
        >
          <AnimatePresence mode="popLayout" initial={false}>
            {filtered.map((segment, index) => (
              <SegmentCard
                key={segment.title}
                segment={segment}
                index={index}
              />
            ))}
          </AnimatePresence>
        </motion.div>

        {/* =================================================
            Empty result fallback
            ================================================= */}

        <AnimatePresence>
          {filtered.length === 0 && (
            <motion.div
              initial={{
                opacity: 0,
                y: 10,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              exit={{
                opacity: 0,
              }}
              transition={{
                duration: 0.4,
                ease: EASE,
              }}
              className="
                mt-6
                rounded-2xl
                border
                border-ink/[0.08]
                bg-paper/80
                px-5
                py-10
                text-center
              "
            >
              <p
                className="
                  font-display
                  text-lg
                  font-semibold
                  text-ink
                "
              >
                No segments found
              </p>

              <p
                className="
                  mt-2
                  text-[12px]
                  text-ink/45
                "
              >
                Select another category to explore exhibitor opportunities.
              </p>
            </motion.div>
          )}
        </AnimatePresence>

        {/* =================================================
            Premium CTA
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
            amount: 0.2,
          }}
          transition={{
            duration: 0.55,
            ease: EASE,
          }}
          className="
            relative
            mt-8
            overflow-hidden
            rounded-2xl
            border
            border-paper/10
            bg-ink
            px-5
            py-5
            text-paper

            sm:px-6
            sm:py-6

            lg:px-7
          "
        >
          {/* solar left accent */}

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

          {/* glow */}

          <div
            aria-hidden="true"
            className="
              absolute
              -right-20
              -top-24
              size-60
              rounded-full
              bg-blue/[0.2]
              blur-[85px]
            "
          />

          {/* background geometry */}

          <motion.svg
            viewBox="0 0 360 360"
            fill="none"
            aria-hidden="true"
            className="
              absolute
              -right-28
              -top-28
              size-[330px]
              text-paper
              opacity-[0.04]
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
            <circle cx="180" cy="180" r="65" stroke="currentColor" />

            <circle
              cx="180"
              cy="180"
              r="112"
              stroke="currentColor"
              strokeDasharray="3 14"
            />

            <circle cx="180" cy="180" r="162" stroke="currentColor" />

            <circle cx="180" cy="68" r="4" fill="#FBB216" stroke="none" />
          </motion.svg>

          <div
            className="
              relative
              grid
              gap-5

              md:grid-cols-[minmax(0,1fr)_auto]
              md:items-center
              md:gap-8
            "
          >
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
                  size-10
                  shrink-0
                  items-center
                  justify-center
                  rounded-full
                  border
                  border-paper/10
                  bg-paper/[0.05]
                  text-solar
                "
              >
                <BadgeCheck
                  aria-hidden="true"
                  className="size-[17px]"
                  strokeWidth={1.8}
                />
              </div>

              <div>
                <span
                  className="
                    text-[9px]
                    font-semibold
                    uppercase
                    tracking-[0.14em]
                    text-solar
                  "
                >
                  Exhibit in Pune
                </span>

                <h3
                  className="
                    mt-1.5
                    max-w-[690px]
                    font-display
                    text-[1.25rem]
                    font-semibold
                    leading-[1.08]
                    tracking-[-0.025em]

                    sm:text-[1.4rem]
                  "
                >
                  Put Your Brand in Front of India&apos;s Clean-Energy Market
                </h3>

                <p
                  className="
                    mt-2
                    max-w-[720px]
                    text-[11px]
                    leading-5
                    text-paper/42

                    sm:text-[12px]
                  "
                >
                  Showcase your technology, meet industry buyers and build
                  commercial partnerships across solar, storage and allied
                  sectors.
                </p>
              </div>
            </div>

            <Button
              href={STALL_URL}
              external
              size="md"
              className="
                group/cta
                w-full
                shrink-0
                justify-between
                gap-4

                md:w-auto
                md:min-w-[205px]
              "
            >
              Book Your Stall
              <ArrowUpRight
                aria-hidden="true"
                className="
                  size-4

                  transition-transform
                  duration-300

                  group-hover/cta:translate-x-0.5
                  group-hover/cta:-translate-y-0.5
                "
                strokeWidth={1.8}
              />
            </Button>
          </div>
        </motion.div>

        {/* =================================================
            Bottom Detail
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
            duration: 0.9,
            delay: 0.08,
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

        <div
          className="
            mt-4
            flex
            items-center
            justify-between
            gap-4
          "
        >
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

          <Sparkles
            aria-hidden="true"
            className="
              size-3
              text-solar
            "
            strokeWidth={1.8}
          />
        </div>
      </Container>
    </section>
  );
}
