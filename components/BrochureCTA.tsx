"use client";

import Image from "next/image";
import { ArrowUpRight, FileDown } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";

import { EVENT } from "@/data/siteData";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";

const EASE = [0.16, 1, 0.3, 1] as const;

export function BrochureCTA() {
  const reduceMotion = useReducedMotion();

  return (
    <section
      id="brochure"
      aria-labelledby="brochure-heading"
      className="
        relative
        overflow-hidden
        bg-paper
        py-10
        sm:py-12
        lg:py-14
      "
    >
      <Container>
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
            amount: 0.15,
            margin: "-30px",
          }}
          transition={{
            duration: 0.55,
            ease: EASE,
          }}
          className="
            relative
            isolate
            overflow-hidden
            rounded-2xl
            border
            border-paper/10
            bg-ink
            text-paper
            shadow-[0_18px_60px_rgba(25,25,25,0.10)]
          "
        >
          {/* =================================================
              Background
              ================================================= */}

          <div
            aria-hidden="true"
            className="
              pointer-events-none
              absolute
              -right-24
              -top-24
              size-[20rem]
              rounded-full
              bg-solar/[0.08]
              blur-[90px]
            "
          />

          <div
            aria-hidden="true"
            className="
              pointer-events-none
              absolute
              -bottom-28
              left-[20%]
              size-[22rem]
              rounded-full
              bg-blue/[0.10]
              blur-[100px]
            "
          />

          <motion.svg
            viewBox="0 0 700 700"
            fill="none"
            aria-hidden="true"
            className="
              pointer-events-none
              absolute
              -right-[260px]
              -top-[280px]
              size-[620px]
              text-paper
              opacity-[0.028]

              lg:size-[700px]
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
                    duration: 150,
                    repeat: Infinity,
                    ease: "linear",
                  }
            }
          >
            <circle
              cx="350"
              cy="350"
              r="120"
              stroke="currentColor"
            />

            <circle
              cx="350"
              cy="350"
              r="205"
              stroke="currentColor"
              strokeDasharray="4 15"
            />

            <circle
              cx="350"
              cy="350"
              r="300"
              stroke="currentColor"
            />

            <path
              d="M350 30V670"
              stroke="currentColor"
            />

            <path
              d="M30 350H670"
              stroke="currentColor"
            />

            <path
              d="M125 125L575 575"
              stroke="currentColor"
            />

            <path
              d="M575 125L125 575"
              stroke="currentColor"
            />

            <circle
              cx="350"
              cy="350"
              r="7"
              fill="#fbb216"
            />
          </motion.svg>

          {/* =================================================
              Layout
              ================================================= */}

          <div
            className="
              relative
              z-10
              grid
              items-center
              gap-7
              px-5
              py-6

              sm:px-7
              sm:py-7

              md:grid-cols-[minmax(0,1fr)_180px]

              lg:grid-cols-[minmax(0,1fr)_200px]
              lg:gap-10
              lg:px-9
              lg:py-8
            "
          >
            {/* =================================================
                Content
                ================================================= */}

            <div className="max-w-[700px]">
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
                    w-6
                    bg-solar
                  "
                />

                <span
                  className="
                    text-[9px]
                    font-semibold
                    uppercase
                    tracking-[0.15em]
                    text-solar

                    sm:text-[10px]
                  "
                >
                  Event Brochure
                </span>
              </div>

              <h2
                id="brochure-heading"
                className="
                  mt-3
                  max-w-[590px]
                  font-display
                  text-[clamp(1.9rem,3vw,3rem)]
                  font-semibold
                  leading-[1]
                  tracking-[-0.035em]
                  text-paper
                "
              >
                Download the Official
                <span className="block text-solar">
                  Event Brochure
                </span>
              </h2>

              <p
                className="
                  mt-4
                  max-w-[610px]
                  text-[13px]
                  leading-6
                  text-paper/48

                  sm:text-sm
                "
              >
                Get the full event profile, exhibitor segments, visitor
                profile, show highlights and participation benefits for{" "}
                {EVENT.nameWithYear}.
              </p>

              {/* Actions */}

              <div
                className="
                  mt-5
                  flex
                  flex-col
                  gap-2.5

                  sm:flex-row
                  sm:items-center
                "
              >
                <Button
                  href="/downloads"
                  size="md"
                  className="
                    group/button
                    justify-center
                    gap-2

                    sm:justify-start
                  "
                >
                  <FileDown
                    aria-hidden="true"
                    className="
                      size-4
                      transition-transform
                      duration-300

                      group-hover/button:translate-y-0.5
                    "
                    strokeWidth={1.8}
                  />

                  Download Brochure
                </Button>

                <a
                  href={EVENT.brochurePath}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="
                    group/link
                    inline-flex
                    min-h-10
                    items-center
                    justify-center
                    gap-2
                    px-2
                    text-[10px]
                    font-semibold
                    uppercase
                    tracking-[0.13em]
                    text-paper/45

                    transition-colors
                    duration-300

                    hover:text-solar

                    sm:justify-start
                  "
                >
                  Preview PDF

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
            </div>

            {/* =================================================
                Compact Brochure Preview
                ================================================= */}

            <motion.a
              href={EVENT.brochurePath}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`Preview ${EVENT.nameWithYear} brochure`}
              initial={
                reduceMotion
                  ? false
                  : {
                      opacity: 0,
                      x: 14,
                    }
              }
              whileInView={{
                opacity: 1,
                x: 0,
              }}
              viewport={{
                once: true,
                amount: 0.3,
              }}
              transition={{
                duration: 0.58,
                delay: 0.06,
                ease: EASE,
              }}
              className="
                group
                relative
                mx-auto
                w-full
                max-w-[160px]

                md:max-w-none
              "
            >
              {/* Back sheet */}

              <div
                aria-hidden="true"
                className="
                  absolute
                  inset-0
                  translate-x-2.5
                  translate-y-2.5
                  rounded-xl
                  border
                  border-paper/10
                  bg-paper/[0.04]
                "
              />

              {/* Main cover */}

              <div
                className="
                  relative
                  overflow-hidden
                  rounded-xl
                  border
                  border-paper/15
                  bg-paper
                  shadow-[0_18px_44px_rgba(0,0,0,0.25)]

                  transition-[transform,box-shadow]
                  duration-500
                  ease-out

                  group-hover:-translate-y-1
                  group-hover:shadow-[0_24px_55px_rgba(0,0,0,0.32)]
                "
              >
                <div className="relative aspect-[3/4.2]">
                  <Image
                    src="/brochure-cover.jpg"
                    alt={`${EVENT.nameWithYear} brochure cover`}
                    fill
                    sizes="
                      (max-width: 768px) 160px,
                      200px
                    "
                    className="
                      object-cover
                      transition-transform
                      duration-700
                      ease-out

                      group-hover:scale-[1.015]
                    "
                  />

                  <div
                    aria-hidden="true"
                    className="
                      absolute
                      inset-0
                      bg-gradient-to-t
                      from-ink/15
                      via-transparent
                      to-transparent
                    "
                  />

                  {/* Mini PDF button */}

                  <div
                    className="
                      absolute
                      bottom-3
                      right-3
                      flex
                      size-7
                      items-center
                      justify-center
                      rounded-full
                      bg-solar
                      text-ink

                      transition-transform
                      duration-300

                      group-hover:translate-x-0.5
                      group-hover:-translate-y-0.5
                    "
                  >
                    <ArrowUpRight
                      aria-hidden="true"
                      className="size-3.5"
                      strokeWidth={1.8}
                    />
                  </div>
                </div>
              </div>

              <div
                className="
                  mt-3
                  flex
                  items-center
                  justify-between
                  gap-3
                "
              >
                <span
                  className="
                    text-[8px]
                    font-semibold
                    uppercase
                    tracking-[0.13em]
                    text-paper/35
                  "
                >
                  Official Brochure
                </span>

                <span
                  className="
                    text-[8px]
                    font-semibold
                    uppercase
                    tracking-[0.12em]
                    text-solar
                  "
                >
                  PDF
                </span>
              </div>
            </motion.a>
          </div>

          {/* Bottom accent */}

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
              duration: 0.9,
              delay: 0.12,
              ease: EASE,
            }}
            className="
              absolute
              inset-x-0
              bottom-0
              z-10
              h-[2px]
              origin-left
              bg-solar
            "
          />
        </motion.div>
      </Container>
    </section>
  );
}