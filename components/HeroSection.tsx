"use client";

import Image from "next/image";
import { ArrowUpRight, CalendarDays, Download } from "lucide-react";
import { motion } from "framer-motion";

import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";

const HIGHLIGHTS = [
  "3-Day B2B Expo",
  "Solar + Storage + EV",
  "B2B Matchmaking",
  "Policy & Investment",
] as const;

const EASE = [0.16, 1, 0.3, 1] as const;

const heroSequence = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.12,
    },
  },
};

const reveal = {
  hidden: {
    opacity: 0,
    y: 24,
    filter: "blur(8px)",
  },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: {
      duration: 0.78,
      ease: EASE,
    },
  },
};

const headingReveal = {
  hidden: {
    opacity: 0,
    y: 42,
    rotateX: 14,
  },
  visible: {
    opacity: 1,
    y: 0,
    rotateX: 0,
    transition: {
      duration: 0.9,
      ease: EASE,
    },
  },
};

function AnimatedSolarBackground() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 -z-10 overflow-hidden"
    >
      {/* Ambient glows */}
      <motion.div
        className="absolute -right-[14%] -top-[56%] size-[58rem] rounded-full bg-solar/[0.11] blur-[125px]"
        animate={{
          scale: [1, 1.08, 1],
          opacity: [0.55, 0.9, 0.55],
          x: [0, -16, 0],
        }}
        transition={{
          duration: 9,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      <motion.div
        className="absolute -bottom-[70%] -left-[18%] size-[56rem] rounded-full bg-blue/[0.08] blur-[145px]"
        animate={{
          x: [0, 44, 0],
          y: [0, -24, 0],
          scale: [1, 1.05, 1],
        }}
        transition={{
          duration: 14,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* Animated technical network */}
      <svg
        viewBox="0 0 1600 900"
        preserveAspectRatio="xMidYMid slice"
        className="absolute inset-0 h-full w-full text-blue"
      >
        <defs>
          <pattern
            id="hero-grid-fixed"
            width="72"
            height="72"
            patternUnits="userSpaceOnUse"
          >
            <path
              d="M72 0H0V72"
              fill="none"
              stroke="currentColor"
              strokeOpacity="0.055"
              strokeWidth="1"
            />
          </pattern>

          <linearGradient id="hero-beam-fixed" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0" stopColor="currentColor" stopOpacity="0" />
            <stop offset="0.42" stopColor="currentColor" stopOpacity="0.3" />
            <stop offset="0.58" stopColor="#fbb216" stopOpacity="0.78" />
            <stop offset="1" stopColor="currentColor" stopOpacity="0" />
          </linearGradient>

          <radialGradient id="hero-node-fixed">
            <stop offset="0" stopColor="#fbb216" stopOpacity="0.95" />
            <stop offset="1" stopColor="#fbb216" stopOpacity="0" />
          </radialGradient>
        </defs>

        <rect
          width="1600"
          height="900"
          fill="url(#hero-grid-fixed)"
          opacity="0.75"
        />

        {/* Flow line 1 */}
        <motion.path
          d="M-180 245 C 160 115, 390 330, 690 192 S 1180 115, 1780 205"
          fill="none"
          stroke="currentColor"
          strokeOpacity="0.14"
          strokeWidth="1.1"
          strokeDasharray="5 20"
          initial={{ strokeDashoffset: 0 }}
          animate={{ strokeDashoffset: -300 }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: "linear",
          }}
        />

        {/* Flow line 2 - solar beam */}
        <motion.path
          d="M-180 390 C 140 260, 430 505, 735 330 S 1210 265, 1780 315"
          fill="none"
          stroke="url(#hero-beam-fixed)"
          strokeWidth="1.6"
          strokeDasharray="11 19"
          initial={{ strokeDashoffset: 0 }}
          animate={{ strokeDashoffset: -360 }}
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: "linear",
          }}
        />

        {/* Flow line 3 */}
        <motion.path
          d="M-180 548 C 175 415, 405 660, 760 495 S 1240 430, 1780 500"
          fill="none"
          stroke="currentColor"
          strokeOpacity="0.11"
          strokeWidth="1"
          strokeDasharray="3 18"
          initial={{ strokeDashoffset: 0 }}
          animate={{ strokeDashoffset: -280 }}
          transition={{
            duration: 18,
            repeat: Infinity,
            ease: "linear",
          }}
        />

        {/* Flow line 4 */}
        <motion.path
          d="M-180 700 C 190 565, 470 790, 805 625 S 1255 575, 1780 630"
          fill="none"
          stroke="currentColor"
          strokeOpacity="0.08"
          strokeWidth="1"
          strokeDasharray="2 22"
          initial={{ strokeDashoffset: 0 }}
          animate={{ strokeDashoffset: -330 }}
          transition={{
            duration: 22,
            repeat: Infinity,
            ease: "linear",
          }}
        />

        {/* Hydration-safe moving light nodes.
            DOM never changes: only transforms animate. */}
        <motion.g
          initial={{ x: -80, y: 0, opacity: 0 }}
          animate={{
            x: [-80, 360, 820, 1280, 1680],
            y: [0, -82, 5, -58, -35],
            opacity: [0, 0.8, 0.65, 0.8, 0],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "linear",
          }}
        >
          <circle cx="0" cy="390" r="9" fill="url(#hero-node-fixed)" />
          <circle cx="0" cy="390" r="3.2" fill="#fbb216" />
        </motion.g>

        <motion.g
          initial={{ x: -150, y: 0, opacity: 0 }}
          animate={{
            x: [-150, 280, 760, 1210, 1700],
            y: [0, 95, -10, 62, 48],
            opacity: [0, 0.35, 0.45, 0.3, 0],
          }}
          transition={{
            duration: 14,
            repeat: Infinity,
            ease: "linear",
            delay: 1.8,
          }}
        >
          <circle cx="0" cy="245" r="4" fill="currentColor" />
        </motion.g>

        {/* Orbital solar system */}
        <g transform="translate(1320 160)">
          <motion.g
            initial={{ rotate: 0 }}
            animate={{ rotate: 360 }}
            transition={{
              duration: 48,
              repeat: Infinity,
              ease: "linear",
            }}
            style={{ transformOrigin: "0px 0px" }}
          >
            <circle
              r="104"
              fill="none"
              stroke="currentColor"
              strokeOpacity="0.18"
              strokeWidth="1.1"
            />
            <circle
              r="166"
              fill="none"
              stroke="currentColor"
              strokeOpacity="0.12"
              strokeDasharray="5 11"
            />
            <circle
              r="228"
              fill="none"
              stroke="currentColor"
              strokeOpacity="0.075"
              strokeDasharray="2 14"
            />
            <circle cx="166" cy="0" r="6" fill="#fbb216" />
            <circle
              cx="-92"
              cy="-208"
              r="4"
              fill="currentColor"
              fillOpacity="0.48"
            />
          </motion.g>

          <motion.circle
            r="25"
            fill="url(#hero-node-fixed)"
            animate={{
              scale: [0.72, 1.25, 0.72],
              opacity: [0.35, 0.88, 0.35],
            }}
            transition={{
              duration: 3.4,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            style={{ transformOrigin: "0px 0px" }}
          />
          <circle r="5" fill="#fbb216" />
        </g>
      </svg>

      {/* Slow scanning light */}
      <motion.div
        className="absolute -left-[22%] top-[14%] h-[70%] w-[15%] -skew-x-12 bg-gradient-to-r from-transparent via-solar/[0.09] to-transparent blur-2xl"
        initial={{ x: "0vw", opacity: 0 }}
        animate={{
          x: ["0vw", "142vw"],
          opacity: [0, 0.75, 0.75, 0],
        }}
        transition={{
          duration: 10.5,
          repeat: Infinity,
          repeatDelay: 1.5,
          ease: "linear",
        }}
      />

      {/* Horizon accent */}
      <motion.div
        className="absolute bottom-[11%] right-0 h-px w-[54%] bg-gradient-to-r from-transparent via-blue/25 to-transparent"
        animate={{
          x: [40, -60, 40],
          opacity: [0.22, 0.72, 0.22],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-ink/10 to-transparent" />
    </div>
  );
}

export function HeroSection() {
  return (
    <section
      aria-labelledby="home-hero-heading"
      className="relative isolate overflow-hidden bg-paper text-ink lg:h-[calc(100svh-7rem)] lg:min-h-[600px] lg:max-h-[760px]"
    >
      <AnimatedSolarBackground />

      <Container className="relative flex h-full flex-col justify-center py-7 sm:py-8 lg:py-5">
        <div className="grid items-center gap-8 lg:grid-cols-[minmax(0,1.08fr)_minmax(360px,0.92fr)] lg:gap-10 xl:gap-14">
          {/* CONTENT */}
          <motion.div
            variants={heroSequence}
            initial="hidden"
            animate="visible"
            className="relative z-10 max-w-[790px]"
          >
            <motion.div
              variants={reveal}
              className="inline-flex items-center gap-2.5 rounded-full border border-blue/10 bg-blue/[0.035] px-3 py-1.5 backdrop-blur-sm"
            >
              <span className="relative flex size-2">
                <motion.span
                  className="absolute inset-0 rounded-full bg-solar"
                  animate={{
                    scale: [1, 2.1, 1],
                    opacity: [0.55, 0, 0.55],
                  }}
                  transition={{
                    duration: 2.6,
                    repeat: Infinity,
                    ease: "easeOut",
                  }}
                />
                <span className="relative size-2 rounded-full bg-solar" />
              </span>

              <span className="text-[10px] font-semibold uppercase tracking-[0.18em] text-blue sm:text-[11px]">
                India&apos;s Renewable Energy Marketplace
              </span>
            </motion.div>

            <motion.h1
              id="home-hero-heading"
              variants={reveal}
              className="mt-4 max-w-[790px] font-display text-[clamp(2.75rem,5.3vw,5.8rem)] font-semibold leading-[0.93] tracking-[-0.05em] text-ink"
            >
              <span className="block overflow-hidden pb-[0.08em] [perspective:900px]">
                <motion.span
                  variants={headingReveal}
                  className="inline-block origin-bottom"
                >
                  India International
                </motion.span>
              </span>

              <span className="relative inline-block overflow-visible [perspective:900px]">
                <motion.span
                  variants={headingReveal}
                  className="inline-block origin-bottom text-blue"
                >
                  Solar Show
                </motion.span>

                <motion.span
                  aria-hidden="true"
                  className="absolute -bottom-2 left-0 h-[4px] w-[31%] origin-left rounded-full bg-solar"
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{
                    duration: 0.95,
                    delay: 0.85,
                    ease: EASE,
                  }}
                />
              </span>

              {/* <motion.span
                variants={reveal}
                className="ml-3 inline-block align-middle font-sans text-[0.18em] font-semibold tracking-[0.08em] text-ink/35 sm:ml-4"
              >
                2026
              </motion.span> */}
            </motion.h1>

            <motion.p
              variants={reveal}
              className="mt-5 max-w-[610px] text-[14px] leading-6 tracking-[-0.01em] text-ink/60 sm:text-[15px] sm:leading-7 xl:text-base"
            >
              Discover the technologies, partnerships and ideas shaping the next era
              of solar, energy storage and electric mobility.
            </motion.p>

            <motion.div
              variants={reveal}
              className="mt-6 flex flex-wrap gap-2.5"
            >
              <Button
                href="https://app.warpbay.com/E2yy0Klq"
                external
                size="md"
                className="group gap-5 shadow-[0_12px_28px_rgba(0,0,0,0.06)] sm:min-w-[176px] sm:justify-between"
              >
                <span>Book Your Stall</span>
                <ArrowUpRight
                  aria-hidden="true"
                  className="size-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                  strokeWidth={1.8}
                />
              </Button>

              <Button
                href="https://app.warpbay.com/qPMIy6ii"
                external
                size="md"
                variant="outline"
                className="border-ink/15 bg-paper/70 text-ink backdrop-blur-md hover:border-blue hover:bg-blue hover:text-paper"
              >
                Register as Visitor
              </Button>

              <Button
                href="/downloads"
                size="md"
                variant="ghost"
                className="gap-2 text-ink/50 hover:bg-ink/[0.04] hover:text-ink"
              >
                <Download
                  aria-hidden="true"
                  className="size-4"
                  strokeWidth={1.8}
                />
                Brochure
              </Button>
            </motion.div>

            <motion.div
              variants={reveal}
              className="mt-5 flex max-w-[670px] flex-wrap gap-x-5 gap-y-1.5 border-t border-ink/[0.08] pt-4"
            >
              {HIGHLIGHTS.map((item) => (
                <div key={item} className="flex items-center gap-2">
                  <span className="size-1 rounded-full bg-solar" />
                  <span className="text-[10.5px] font-medium leading-5 text-ink/45 xl:text-[11px]">
                    {item}
                  </span>
                </div>
              ))}
            </motion.div>
          </motion.div>

          {/* IMAGE */}
          <motion.div
            initial={{
              opacity: 0,
              x: 42,
              scale: 0.96,
              filter: "blur(10px)",
            }}
            animate={{
              opacity: 1,
              x: 0,
              scale: 1,
              filter: "blur(0px)",
            }}
            transition={{
              duration: 1,
              delay: 0.22,
              ease: EASE,
            }}
            className="relative mx-auto w-full max-w-[610px] lg:mx-0 lg:max-w-none"
          >
            {/* very subtle continuous float after load */}
            <motion.div
              animate={{ y: [0, -5, 0] }}
              transition={{
                duration: 5.8,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 1.2,
              }}
              className="relative rounded-[1.65rem] border border-ink/[0.08] bg-paper/50 p-2 shadow-[0_24px_70px_rgba(20,30,45,0.10)] backdrop-blur-xl"
            >
              <div className="group relative aspect-[16/10] overflow-hidden rounded-[1.25rem] bg-ink lg:h-[clamp(315px,44vh,430px)] lg:aspect-auto">
                <Image
                  src="/images/hero.webp"
                  alt="India International Solar Show 2026 exhibition"
                  fill
                  priority
                  fetchPriority="high"
                  sizes="(max-width: 768px) 100vw, (max-width: 1024px) 90vw, 43vw"
                  className="object-cover object-center transition-transform duration-[1400ms] ease-out group-hover:scale-[1.025]"
                />

                <div className="absolute inset-0 bg-gradient-to-b from-ink/10 via-transparent to-ink/85" />

                {/* Repeating glass sheen */}
                <motion.div
                  aria-hidden="true"
                  className="absolute inset-y-0 -left-1/3 w-1/4 -skew-x-12 bg-gradient-to-r from-transparent via-paper/14 to-transparent blur-lg"
                  initial={{ x: "0%" }}
                  animate={{ x: "680%" }}
                  transition={{
                    duration: 4.6,
                    repeat: Infinity,
                    repeatDelay: 2.4,
                    ease: "easeInOut",
                  }}
                />

                <div className="absolute left-4 top-4 inline-flex items-center gap-2 rounded-full border border-paper/15 bg-ink/45 px-3 py-1.5 backdrop-blur-xl sm:left-5 sm:top-5">
                  <motion.span
                    className="size-1.5 rounded-full bg-solar"
                    animate={{
                      opacity: [1, 0.35, 1],
                      scale: [1, 1.35, 1],  
                    }}
                    transition={{
                      duration: 2.4,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                  />
                  {/* <span className="text-[9px] font-semibold uppercase tracking-[0.15em] text-paper">
                    3-Day B2B Expo
                  </span> */}
                </div>

                <div className="absolute inset-x-0 bottom-0 p-5 sm:p-6">
                  {/* <p className="max-w-[470px] font-display text-[clamp(1.8rem,3vw,2.8rem)] font-semibold leading-[0.98] tracking-[-0.04em] text-paper">
                    Powering the future of clean energy.
                  </p> */}

                  <div className="mt-4 flex items-center gap-3 text-paper/65">
                    <CalendarDays
                      className="size-4 text-solar"
                      strokeWidth={1.7}
                    />
                    <span className="text-[10.5px] font-medium tracking-[0.01em]">
                      02–04 October 2026
                    </span>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </Container>
    </section>
  );
}
