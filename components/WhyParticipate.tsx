"use client";

import {
  ArrowUpRight,
  BookOpen,
  Cpu,
  Eye,
  Handshake,
  MapPin,
  Users,
} from "lucide-react";

import { motion, useReducedMotion } from "framer-motion";

import { WHY_PARTICIPATE } from "@/data/siteData";

import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";

/* =========================================================
   Icons
   ========================================================= */

const ICONS = [Handshake, Cpu, Eye, Users, BookOpen, MapPin] as const;

/* =========================================================
   Motion
   ========================================================= */

const EASE = [0.16, 1, 0.3, 1] as const;

const groupVariants = {
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

function WhyParticipateBackground({
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
      {/* Blue depth */}

      <div
        className="
          absolute
          -left-60
          top-[15%]
          size-[38rem]
          rounded-full
          bg-blue/[0.15]
          blur-[135px]
        "
      />

      {/* Solar wash */}

      <div
        className="
          absolute
          -right-48
          -top-36
          size-[32rem]
          rounded-full
          bg-solar/[0.07]
          blur-[115px]
        "
      />

      {/* Main solar geometry */}

      <motion.svg
        viewBox="0 0 900 900"
        fill="none"
        className="
          absolute
          -left-[360px]
          -top-[360px]
          size-[850px]
          text-paper
          opacity-[0.03]

          sm:-left-[300px]
          sm:size-[930px]

          lg:-left-[240px]
          lg:size-[1040px]
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
                duration: 145,
                repeat: Infinity,
                ease: "linear",
              }
        }
      >
        <circle cx="450" cy="450" r="150" stroke="currentColor" />

        <circle
          cx="450"
          cy="450"
          r="240"
          stroke="currentColor"
          strokeDasharray="4 16"
        />

        <circle cx="450" cy="450" r="350" stroke="currentColor" />

        <path d="M450 30V870" stroke="currentColor" />

        <path d="M30 450H870" stroke="currentColor" />

        <path d="M153 153L747 747" stroke="currentColor" />

        <path d="M747 153L153 747" stroke="currentColor" />

        <circle cx="450" cy="450" r="8" fill="#fbb216" />
      </motion.svg>

      {/* Secondary ring */}

      <motion.svg
        viewBox="0 0 420 420"
        fill="none"
        className="
          absolute
          -bottom-40
          -right-36
          hidden
          size-[470px]
          text-solar
          opacity-[0.035]

          lg:block
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
                duration: 175,
                repeat: Infinity,
                ease: "linear",
              }
        }
      >
        <circle cx="210" cy="210" r="92" stroke="currentColor" />

        <circle
          cx="210"
          cy="210"
          r="150"
          stroke="currentColor"
          strokeDasharray="3 13"
        />

        <circle cx="210" cy="210" r="195" stroke="currentColor" />

        <path d="M210 20V400" stroke="currentColor" />

        <path d="M20 210H400" stroke="currentColor" />
      </motion.svg>
    </div>
  );
}

/* =========================================================
   Why Participate
   ========================================================= */

export function WhyParticipate() {
  const reduceMotion = useReducedMotion();

  return (
    <section
      aria-labelledby="why-participate-heading"
      className="
        relative
        isolate
        overflow-hidden
        bg-ink
        text-paper
      "
    >
      <WhyParticipateBackground reduceMotion={reduceMotion} />

      <Container
        className="
          relative
          py-16
          sm:py-20
          lg:py-24
        "
      >
        {/* =================================================
            Heading
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

            lg:grid-cols-[1fr_0.8fr]
            lg:items-end
            lg:gap-16
            lg:pb-12
          "
        >
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
                Why Exhibit in 2026
              </span>
            </div>

            <h2
              id="why-participate-heading"
              className="
                mt-4
                max-w-[760px]
                font-display
                text-[clamp(2.25rem,3.8vw,4rem)]
                font-semibold
                leading-[0.98]
                tracking-[-0.035em]
                text-paper
              "
            >
              Why Top Brands Exhibit at India Solar
              <span className="block text-solar">International Show</span>
            </h2>
          </motion.div>

          <motion.p
            variants={revealVariants}
            className="
              max-w-[520px]
              text-sm
              leading-7
              text-paper/48

              sm:text-[15px]

              lg:justify-self-end
            "
          >
            Discover why global solar PV manufacturers, battery energy storage
            suppliers, EPC contractors, and clean-tech leaders exhibit at India
            Solar International Show in Pune.
          </motion.p>
        </motion.div>

        {/* =================================================
            Benefits Grid
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
            mt-10
            grid
            overflow-hidden
            rounded-2xl
            border
            border-paper/10
            bg-paper/[0.025]

            sm:grid-cols-2

            lg:mt-12
            lg:grid-cols-3
          "
        >
          {WHY_PARTICIPATE.map((item, index) => {
            const Icon = ICONS[index] ?? Handshake;

            return (
              <motion.article
                key={item.title}
                variants={revealVariants}
                className="
                  group
                  relative
                  min-h-[210px]
                  overflow-hidden
                  border-paper/10
                  p-5

                  transition-colors
                  duration-500
                  ease-out

                  hover:bg-paper/[0.035]

                  sm:min-h-[220px]
                  sm:p-6

                  lg:min-h-[230px]
                  lg:border-r
                  lg:p-7

                  lg:[&:nth-child(3n)]:border-r-0
                  lg:[&:nth-child(-n+3)]:border-b

                  sm:[&:nth-child(odd)]:border-r
                  sm:[&:nth-child(-n+4)]:border-b

                  lg:[&:nth-child(odd)]:border-r
                "
              >
                {/* Hover accent */}

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

                {/* Background index */}

                <span
                  aria-hidden="true"
                  className="
                    pointer-events-none
                    absolute
                    -bottom-4
                    -right-2
                    font-display
                    text-[4.8rem]
                    font-semibold
                    leading-none
                    tracking-[-0.07em]
                    text-paper/[0.025]

                    transition-[opacity,transform]
                    duration-500

                    group-hover:-translate-x-1
                    group-hover:text-paper/[0.045]
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

                  {/* Copy */}

                  <div
                    className="
                      mt-7
                      max-w-[310px]
                    "
                  >
                    <h3
                      className="
                        font-display
                        text-[1.18rem]
                        font-semibold
                        leading-[1.08]
                        tracking-[-0.02em]
                        text-paper

                        sm:text-[1.24rem]
                      "
                    >
                      {item.title}
                    </h3>

                    <p
                      className="
                        mt-2.5
                        text-[13px]
                        leading-6
                        text-paper/45
                      "
                    >
                      {item.desc}
                    </p>
                  </div>

                  {/* Bottom accent */}

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
          })}
        </motion.div>

        {/* =================================================
            Conversion CTA
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
            amount: 0.16,
            margin: "-30px",
          }}
          transition={{
            duration: 0.56,
            ease: EASE,
          }}
          className="
    relative
    mt-10
    overflow-hidden
    rounded-2xl
    border
    border-paper/10
    bg-paper/[0.035]
    backdrop-blur-sm

    lg:mt-12
  "
        >
          {/* =====================================================
      Background details
      ===================================================== */}

          <div
            aria-hidden="true"
            className="
      pointer-events-none
      absolute
      -right-32
      -top-36
      size-[24rem]
      rounded-full
      bg-solar/[0.07]
      blur-[100px]
    "
          />

          <div
            aria-hidden="true"
            className="
      pointer-events-none
      absolute
      -bottom-32
      left-[35%]
      size-[22rem]
      rounded-full
      bg-blue/[0.08]
      blur-[110px]
    "
          />

          {/* =====================================================
      Content
      ===================================================== */}

          <div
            className="
      relative
      z-10
      grid
      gap-8
      p-6

      sm:p-7

      lg:grid-cols-[minmax(0,1fr)_280px]
      lg:items-center
      lg:gap-12
      lg:p-9

      xl:grid-cols-[minmax(0,1fr)_300px]
      xl:gap-16
    "
          >
            {/* ===================================================
        Left copy
        =================================================== */}

            <div className="max-w-[760px]">
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
            text-[10px]
            font-semibold
            uppercase
            tracking-[0.16em]
            text-solar

            sm:text-[11px]
          "
                >
                  Exhibition Opportunities
                </span>
              </div>

              <h3
                className="
          mt-4
          max-w-[680px]
          font-display
          text-[clamp(1.65rem,2.5vw,2.55rem)]
          font-semibold
          leading-[1.04]
          tracking-[-0.03em]
          text-paper
        "
              >
                Book Exhibition Stall at India International Solar Show 2026
              </h3>

              <p
                className="
          mt-4
          max-w-[640px]
          text-sm
          leading-7
          text-paper/48

          sm:text-[15px]
        "
              >
                Secure exhibition booth space and explore sponsorship
                opportunities to build visibility across the solar and
                renewable-energy value chain.
              </p>

              {/* Small supporting detail */}

              <div
                className="
          mt-6
          flex
          flex-wrap
          items-center
          gap-x-5
          gap-y-2
        "
              >
                {["Exhibit", "Sponsor", "Connect"].map((item) => (
                  <div
                    key={item}
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
                text-[10px]
                font-medium
                uppercase
                tracking-[0.12em]
                text-paper/35
              "
                    >
                      {item}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* ===================================================
        Actions
        =================================================== */}

            <div
              className="
        grid
        w-full
        gap-2.5

        sm:grid-cols-3

        lg:grid-cols-1
        lg:self-stretch
        lg:content-center
      "
            >
              {/* Primary */}

              <Button
                href="https://app.warpbay.com/E2yy0Klq"
                external
                size="lg"
                className="
          group/button
          min-h-12
          w-full
          justify-between
          gap-3
          px-5
        "
              >
                <span>Book Your Stall</span>

                <ArrowUpRight
                  aria-hidden="true"
                  className="
            size-4
            shrink-0

            transition-transform
            duration-300

            group-hover/button:translate-x-0.5
            group-hover/button:-translate-y-0.5
          "
                  strokeWidth={1.8}
                />
              </Button>

              {/* Sponsor */}

              <Button
                href="/sponsors"
                variant="outline"
                size="lg"
                className="
          min-h-12
          w-full
          justify-center
          border-paper/15
          bg-paper/[0.025]
          px-5
          text-paper

          hover:border-solar
          hover:bg-solar
          hover:text-ink
        "
              >
                Become a Sponsor
              </Button>

              {/* Contact */}

              <Button
                href="/contact"
                variant="outline"
                size="lg"
                className="
          min-h-12
          w-full
          justify-center
          border-paper/15
          bg-paper/[0.025]
          px-5
          text-paper

          hover:border-paper/30
          hover:bg-paper/[0.07]
          hover:text-paper
        "
              >
                Contact Sales
              </Button>
            </div>
          </div>

          {/* =====================================================
      Bottom accent
      ===================================================== */}

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
              delay: 0.15,
              ease: EASE,
            }}
            className="
      absolute
      inset-x-0
      bottom-0
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
