"use client";

import {
  ArrowUpRight,
  BadgeCheck,
  Users,
} from "lucide-react";

import {
  motion,
  useReducedMotion,
} from "framer-motion";

import { VISITOR_SEGMENTS } from "@/data/siteData";

import { Container } from "@/components/ui/Container";
import { Icon } from "@/components/ui/Icon";
import { Button } from "@/components/ui/Button";

/* =========================================================
   Constants
   ========================================================= */

const VISITOR_URL =
  "https://app.warpbay.com/qPMIy6ii";

const EASE =
  [0.16, 1, 0.3, 1] as const;

/* =========================================================
   Motion
   ========================================================= */

const groupVariants = {
  hidden: {},

  visible: {
    transition: {
      staggerChildren: 0.05,
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
   Background
   ========================================================= */

function VisitorProfileBackground({
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
      {/* Blue atmospheric glow */}

      <div
        className="
          absolute
          -right-48
          -top-44
          size-[34rem]
          rounded-full
          bg-blue/[0.14]
          blur-[135px]
        "
      />

      {/* Solar atmospheric glow */}

      <div
        className="
          absolute
          -bottom-44
          -left-40
          size-[30rem]
          rounded-full
          bg-solar/[0.055]
          blur-[125px]
        "
      />

      {/* Main rotating geometry */}

      <motion.svg
        viewBox="0 0 900 900"
        fill="none"
        className="
          absolute
          -right-[380px]
          -top-[370px]
          size-[850px]
          text-paper
          opacity-[0.027]

          sm:-right-[310px]
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
                duration: 165,
                repeat: Infinity,
                ease: "linear",
              }
        }
      >
        <circle
          cx="450"
          cy="450"
          r="125"
          stroke="currentColor"
        />

        <circle
          cx="450"
          cy="450"
          r="220"
          stroke="currentColor"
          strokeDasharray="4 16"
        />

        <circle
          cx="450"
          cy="450"
          r="325"
          stroke="currentColor"
        />

        <circle
          cx="450"
          cy="450"
          r="400"
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
          d="M152 152L748 748"
          stroke="currentColor"
        />

        <path
          d="M748 152L152 748"
          stroke="currentColor"
        />

        <circle
          cx="450"
          cy="125"
          r="7"
          fill="#fbb216"
          stroke="none"
        />

        <circle
          cx="775"
          cy="450"
          r="4"
          fill="#fbb216"
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
          r="100"
          stroke="currentColor"
        />

        <circle
          cx="250"
          cy="250"
          r="170"
          stroke="currentColor"
          strokeDasharray="3 14"
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
   Visitor Profile
   ========================================================= */

export function VisitorProfile() {
  const reduceMotion =
    useReducedMotion();

  const featuredSegments =
    VISITOR_SEGMENTS.slice(0, 2);

  const remainingSegments =
    VISITOR_SEGMENTS.slice(2);

  /* =======================================================
     Structured Data
     ======================================================= */

  const itemListSchema = {
    "@context":
      "https://schema.org",

    "@type":
      "ItemList",

    name:
      "Target Visitor & Stakeholder Segments for India Solar Show 2026",

    itemListElement:
      VISITOR_SEGMENTS.map(
        (segment, index) => ({
          "@type":
            "ListItem",

          position:
            index + 1,

          name:
            segment.title,

          description:
            segment.desc,
        }),
      ),
  };

  const jsonLd =
    JSON.stringify(
      itemListSchema,
    ).replace(
      /</g,
      "\\u003c",
    );

  return (
    <section
      id="visitors"
      aria-labelledby="visitor-profile-heading"
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
      {/* Structured Data */}

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: jsonLd,
        }}
      />

      <VisitorProfileBackground
        reduceMotion={
          reduceMotion
        }
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
          variants={
            groupVariants
          }
          initial={
            reduceMotion
              ? false
              : "hidden"
          }
          whileInView="visible"
          viewport={{
            once: true,
            amount: 0.14,
            margin: "-40px",
          }}
          className="
            grid
            gap-7
            border-b
            border-paper/10
            pb-9

            lg:grid-cols-[1fr_0.7fr]
            lg:items-end
            lg:gap-14
            lg:pb-11
          "
        >
          <motion.div
            variants={
              revealVariants
            }
          >
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
                Visitor Profile
              </span>
            </div>

            <h2
              id="visitor-profile-heading"
              className="
                mt-4
                max-w-[740px]
                font-display
                text-[clamp(2.15rem,3.55vw,3.7rem)]
                font-semibold
                leading-[0.98]
                tracking-[-0.035em]
                text-paper
              "
            >
              Who You Will Meet
              <span
                className="
                  block
                  text-solar
                "
              >
                Across the Show Floor
              </span>
            </h2>
          </motion.div>

          <motion.div
            variants={
              revealVariants
            }
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
              Stakeholder groups from
              across the clean-energy
              value chain — including
              developers, EPC companies,
              industrial buyers,
              investors, institutions,
              media and academia.
            </p>

            <div
              className="
                mt-5
                flex
                items-center
                gap-3
              "
            >
              <span
                className="
                  flex
                  size-7
                  items-center
                  justify-center
                  rounded-full
                  bg-solar/10
                  text-solar
                "
              >
                <Users
                  className="size-3.5"
                  strokeWidth={1.8}
                />
              </span>

              <span
                className="
                  text-[9px]
                  font-semibold
                  uppercase
                  tracking-[0.13em]
                  text-paper/28
                "
              >
                B2B · Industry · Decision Makers
              </span>
            </div>
          </motion.div>
        </motion.div>

        {/* =================================================
            Featured Visitor Segments
            ================================================= */}

        <motion.div
          variants={
            groupVariants
          }
          initial={
            reduceMotion
              ? false
              : "hidden"
          }
          whileInView="visible"
          viewport={{
            once: true,
            amount: 0.1,
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
          {featuredSegments.map(
            (
              segment,
              index,
            ) => (
              <motion.article
                key={
                  segment.title
                }
                variants={
                  revealVariants
                }
                className="
                  group
                  relative
                  min-h-[250px]
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
                {/* Hover wash */}

                <div
                  aria-hidden="true"
                  className="
                    absolute
                    -right-16
                    -top-16
                    size-44
                    rounded-full
                    bg-solar/[0.055]
                    opacity-0
                    blur-[65px]

                    transition-opacity
                    duration-500

                    group-hover:opacity-100
                  "
                />

                {/* top accent */}

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

                {/* big number */}

                <span
                  aria-hidden="true"
                  className="
                    absolute
                    -bottom-8
                    -right-2
                    font-display
                    text-[7.2rem]
                    font-semibold
                    leading-none
                    tracking-[-0.08em]
                    text-paper/[0.025]
                  "
                >
                  {String(
                    index + 1,
                  ).padStart(
                    2,
                    "0",
                  )}
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
                        name={
                          segment.icon
                        }
                        size={18}
                        aria-hidden="true"
                      />
                    </div>

                    <span
                      className="
                        text-[9px]
                        font-semibold
                        uppercase
                        tracking-[0.13em]
                        text-paper/22
                      "
                    >
                      Core Visitor
                    </span>
                  </div>

                  <h3
                    className="
                      mt-9
                      max-w-[360px]
                      font-display
                      text-[1.35rem]
                      font-semibold
                      leading-[1.08]
                      tracking-[-0.025em]
                      text-paper

                      sm:text-[1.5rem]
                    "
                  >
                    {
                      segment.title
                    }
                  </h3>

                  <p
                    className="
                      mt-3
                      max-w-[440px]
                      text-[12px]
                      leading-6
                      text-paper/42

                      sm:text-[13px]
                    "
                  >
                    {
                      segment.desc
                    }
                  </p>

                  <div
                    aria-hidden="true"
                    className="
                      mt-auto
                      flex
                      items-center
                      gap-2
                      pt-7
                    "
                  >
                    <span
                      className="
                        h-px
                        w-9
                        bg-solar
                      "
                    />

                    <span
                      className="
                        size-1
                        rounded-full
                        bg-solar
                      "
                    />
                  </div>
                </div>
              </motion.article>
            ),
          )}
        </motion.div>

        {/* =================================================
            Stakeholder Matrix
            ================================================= */}

        <motion.div
          variants={
            groupVariants
          }
          initial={
            reduceMotion
              ? false
              : "hidden"
          }
          whileInView="visible"
          viewport={{
            once: true,
            amount: 0.06,
            margin: "-50px",
          }}
          className="
            mt-3
            overflow-hidden
            rounded-2xl
            border
            border-paper/10
            bg-paper/[0.02]
          "
        >
          {/* matrix header */}

          <motion.div
            variants={
              revealVariants
            }
            className="
              flex
              items-center
              justify-between
              gap-5
              border-b
              border-paper/10
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
                  text-solar
                "
              >
                Industry Network
              </span>

              <p
                className="
                  mt-1
                  text-[12px]
                  text-paper/36
                "
              >
                A cross-section of buyers, professionals and stakeholders.
              </p>
            </div>

            <span
              className="
                hidden
                font-display
                text-[9px]
                font-semibold
                tracking-[0.13em]
                text-paper/18

                sm:block
              "
            >
              {String(
                VISITOR_SEGMENTS.length,
              ).padStart(
                2,
                "0",
              )}{" "}
              SEGMENTS
            </span>
          </motion.div>

          {/* Matrix */}

          <div
            className="
              grid

              sm:grid-cols-2

              lg:grid-cols-3

              xl:grid-cols-4
            "
          >
            {remainingSegments.map(
              (
                segment,
                itemIndex,
              ) => {
                const index =
                  itemIndex + 2;

                return (
                  <motion.article
                    key={
                      segment.title
                    }
                    variants={
                      revealVariants
                    }
                    className="
                      group
                      relative
                      min-h-[190px]
                      border-paper/10
                      p-5

                      transition-colors
                      duration-400

                      hover:bg-paper/[0.035]

                      max-sm:border-b
                      max-sm:last:border-b-0

                      sm:border-r
                      sm:border-b
                      sm:[&:nth-child(2n)]:border-r-0

                      lg:[&:nth-child(2n)]:border-r
                      lg:[&:nth-child(3n)]:border-r-0

                      xl:min-h-[205px]
                      xl:border-r
                      xl:[&:nth-child(3n)]:border-r
                      xl:[&:nth-child(4n)]:border-r-0
                    "
                  >
                    {/* side accent */}

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

                    {/* background number */}

                    <span
                      aria-hidden="true"
                      className="
                        absolute
                        -bottom-5
                        -right-1
                        font-display
                        text-[4.8rem]
                        font-semibold
                        leading-none
                        tracking-[-0.07em]
                        text-paper/[0.02]
                      "
                    >
                      {String(
                        index + 1,
                      ).padStart(
                        2,
                        "0",
                      )}
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
                            border-paper/10
                            bg-paper/[0.035]
                            text-solar

                            transition-[background-color,color,border-color]
                            duration-300

                            group-hover:border-solar
                            group-hover:bg-solar
                            group-hover:text-ink
                          "
                        >
                          <Icon
                            name={
                              segment.icon
                            }
                            size={16}
                            aria-hidden="true"
                          />
                        </div>

                        <span
                          className="
                            font-display
                            text-[8px]
                            font-semibold
                            tracking-[0.12em]
                            text-paper/18
                          "
                        >
                          {String(
                            index + 1,
                          ).padStart(
                            2,
                            "0",
                          )}
                        </span>
                      </div>

                      <h3
                        className="
                          mt-6
                          max-w-[250px]
                          font-display
                          text-[1.05rem]
                          font-semibold
                          leading-[1.12]
                          tracking-[-0.018em]
                          text-paper

                          sm:text-[1.1rem]
                        "
                      >
                        {
                          segment.title
                        }
                      </h3>

                      <p
                        className="
                          mt-2
                          max-w-[270px]
                          text-[11px]
                          leading-5
                          text-paper/38
                        "
                      >
                        {
                          segment.desc
                        }
                      </p>

                      <span
                        aria-hidden="true"
                        className="
                          mt-auto
                          h-px
                          w-6
                          bg-paper/15

                          transition-[width,background-color]
                          duration-400

                          group-hover:w-11
                          group-hover:bg-solar
                        "
                      />
                    </div>
                  </motion.article>
                );
              },
            )}
          </div>
        </motion.div>

        {/* =================================================
            CTA
            ================================================= */}

        <motion.div
          initial={
            reduceMotion
              ? false
              : {
                  opacity: 0,
                  y: 16,
                }
          }
          whileInView={{
            opacity: 1,
            y: 0,
          }}
          viewport={{
            once: true,
            amount: 0.15,
            margin: "-40px",
          }}
          transition={{
            duration: 0.58,
            ease: EASE,
          }}
          className="
            relative
            mt-10
            overflow-hidden
            rounded-2xl
            border
            border-paper/10
            bg-paper/[0.04]
            p-5

            sm:p-6

            lg:mt-12
            lg:p-7
          "
        >
          {/* CTA glow */}

          <div
            aria-hidden="true"
            className="
              pointer-events-none
              absolute
              -right-24
              -top-24
              size-64
              rounded-full
              bg-blue/[0.18]
              blur-[85px]
            "
          />

          {/* CTA solar accent */}

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
            className="
              relative
              grid
              gap-6

              lg:grid-cols-[minmax(0,1fr)_280px]
              lg:items-center
              lg:gap-10
            "
          >
            {/* copy */}

            <div>
              <div
                className="
                  flex
                  items-center
                  gap-3
                "
              >
                <BadgeCheck
                  aria-hidden="true"
                  className="
                    size-4
                    text-solar
                  "
                  strokeWidth={1.8}
                />

                <span
                  className="
                    text-[9px]
                    font-semibold
                    uppercase
                    tracking-[0.14em]
                    text-solar
                  "
                >
                  Visitor Registration
                </span>
              </div>

              <h3
                className="
                  mt-3
                  max-w-[620px]
                  font-display
                  text-[clamp(1.55rem,2.4vw,2.35rem)]
                  font-semibold
                  leading-[1]
                  tracking-[-0.03em]
                  text-paper
                "
              >
                See Where You Fit in
                the Clean-Energy Ecosystem
              </h3>

              <p
                className="
                  mt-3
                  max-w-[590px]
                  text-[12px]
                  leading-6
                  text-paper/42

                  sm:text-[13px]
                "
              >
                Register your interest
                and join industry buyers,
                developers, EPCs,
                investors and technology
                professionals at India
                Solar International Show
                2026 in Pune.
              </p>
            </div>

            {/* CTA button */}

            <div
              className="
                lg:justify-self-end
              "
            >
              <Button
                href={
                  VISITOR_URL
                }
                external
                size="lg"
                className="
                  group/register
                  w-full
                  justify-between
                  gap-5

                  sm:w-auto

                  lg:min-w-[250px]
                "
              >
                Register Your Interest

                <ArrowUpRight
                  aria-hidden="true"
                  className="
                    size-4

                    transition-transform
                    duration-300

                    group-hover/register:translate-x-0.5
                    group-hover/register:-translate-y-0.5
                  "
                  strokeWidth={
                    1.8
                  }
                />
              </Button>
            </div>
          </div>
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
            delay: 0.12,
            ease: EASE,
          }}
          aria-hidden="true"
          className="
            mt-8
            h-px
            origin-left
            bg-gradient-to-r
            from-solar/70
            via-paper/10
            to-transparent
          "
        />
      </Container>
    </section>
  );
}