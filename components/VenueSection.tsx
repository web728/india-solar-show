"use client";

import {
  Building2,
  Car,
  MapPin,
  Train,
  ArrowUpRight,
} from "lucide-react";

import {
  motion,
  useReducedMotion,
} from "framer-motion";

import { EVENT } from "@/data/siteData";

import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";

/* =========================================================
   Venue Info
   ========================================================= */

const VENUE_INFO = [
  {
    icon: Building2,
    title: "Auto Cluster Exhibition Center",
    desc: "A dedicated exhibition venue within Pune's industrial belt.",
  },
  {
    icon: Car,
    title: "Industrial Access",
    desc: "Well-connected to Pune's major industrial and manufacturing clusters.",
  },
  {
    icon: Train,
    title: "Regional Connectivity",
    desc: "Accessible from Pune and Pimpri-Chinchwad's transit and highway network.",
  },
] as const;

/* =========================================================
   Motion
   ========================================================= */

const EASE = [0.16, 1, 0.3, 1] as const;

const groupVariants = {
  hidden: {},

  visible: {
    transition: {
      staggerChildren: 0.065,
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

function VenueBackground({
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
      {/* Blue atmosphere */}

      <div
        className="
          absolute
          -left-56
          top-[18%]
          size-[34rem]
          rounded-full
          bg-blue/[0.045]
          blur-[125px]
        "
      />

      {/* Solar glow */}

      <div
        className="
          absolute
          -right-44
          -top-24
          size-[30rem]
          rounded-full
          bg-solar/[0.075]
          blur-[110px]
        "
      />

      {/* Main animated geometry */}

      <motion.svg
        viewBox="0 0 900 900"
        fill="none"
        className="
          absolute
          -right-[350px]
          -top-[350px]
          size-[820px]
          text-blue
          opacity-[0.035]

          sm:-right-[285px]
          sm:size-[900px]

          lg:-right-[215px]
          lg:size-[1020px]
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
        <circle
          cx="450"
          cy="450"
          r="145"
          stroke="currentColor"
        />

        <circle
          cx="450"
          cy="450"
          r="235"
          stroke="currentColor"
          strokeDasharray="4 16"
        />

        <circle
          cx="450"
          cy="450"
          r="345"
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

      {/* Bottom technical locator */}

      <motion.svg
        viewBox="0 0 420 420"
        fill="none"
        className="
          absolute
          -bottom-40
          -left-36
          hidden
          size-[470px]
          text-solar
          opacity-[0.04]

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
                duration: 175,
                repeat: Infinity,
                ease: "linear",
              }
        }
      >
        <circle
          cx="210"
          cy="210"
          r="92"
          stroke="currentColor"
        />

        <circle
          cx="210"
          cy="210"
          r="150"
          stroke="currentColor"
          strokeDasharray="3 13"
        />

        <circle
          cx="210"
          cy="210"
          r="195"
          stroke="currentColor"
        />

        <path
          d="M210 20V400"
          stroke="currentColor"
        />

        <path
          d="M20 210H400"
          stroke="currentColor"
        />
      </motion.svg>
    </div>
  );
}

/* =========================================================
   Venue Section
   ========================================================= */

export function VenueSection() {
  const reduceMotion = useReducedMotion();

  return (
    <section
      id="venue"
      aria-labelledby="venue-heading"
      className="
        relative
        isolate
        overflow-hidden
        bg-paper
        text-ink
      "
    >
      <VenueBackground reduceMotion={reduceMotion} />

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
            amount: 0.16,
            margin: "-40px",
          }}
          className="
            grid
            gap-8
            border-b
            border-ink/10
            pb-10

            lg:grid-cols-[1fr_0.82fr]
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
                Venue
              </span>
            </div>

            <h2
              id="venue-heading"
              className="
                mt-4
                max-w-[650px]
                font-display
                text-[clamp(2.3rem,3.8vw,4rem)]
                font-semibold
                leading-[0.98]
                tracking-[-0.035em]
                text-ink
              "
            >
              Auto Cluster
              <span className="block text-blue">
                Exhibition Center
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
                text-ink/55

                sm:text-[15px]
              "
            >
              {EVENT.venue.full}
            </p>

            <div
              className="
                mt-4
                flex
                items-start
                gap-3
              "
            >
              <div
                className="
                  mt-0.5
                  flex
                  size-8
                  shrink-0
                  items-center
                  justify-center
                  rounded-full
                  bg-solar/10
                  text-blue
                "
              >
                <MapPin
                  aria-hidden="true"
                  className="size-4"
                  strokeWidth={1.8}
                />
              </div>

              <span
                className="
                  pt-1
                  text-[13px]
                  leading-6
                  text-ink/50
                "
              >
                {EVENT.venue.line}, {EVENT.venue.city}
              </span>
            </div>
          </motion.div>
        </motion.div>

        {/* =================================================
            Main Venue Layout
            ================================================= */}

        <div
          className="
            mt-10
            grid
            gap-4

            lg:mt-12
            lg:grid-cols-[1.18fr_0.82fr]
            lg:gap-5
          "
        >
          {/* =================================================
              Map
              ================================================= */}

          <motion.article
            initial={
              reduceMotion
                ? false
                : {
                    opacity: 0,
                    y: 18,
                  }
            }
            whileInView={{
              opacity: 1,
              y: 0,
            }}
            viewport={{
              once: true,
              amount: 0.12,
              margin: "-40px",
            }}
            transition={{
              duration: 0.58,
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
              shadow-[0_14px_50px_rgba(25,25,25,0.05)]
            "
          >
            {/* Map */}

            <div
              className="
                relative
                aspect-[4/3]
                overflow-hidden

                sm:aspect-[16/10]

                lg:min-h-[420px]
                lg:aspect-auto
              "
            >
              <iframe
                title="Auto Cluster Exhibition Center"
                src="https://www.google.com/maps?q=Auto+Cluster+Exhibition+Centre,+Pimpri-Chinchwad,+Maharashtra&output=embed"
                className="
                  absolute
                  inset-0
                  h-full
                  w-full
                  border-0
                "
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                allowFullScreen
              />

              {/* Top badge */}

              <div
                className="
                  pointer-events-none
                  absolute
                  left-4
                  top-4
                  z-10
                  flex
                  items-center
                  gap-2
                  rounded-full
                  border
                  border-paper/50
                  bg-paper/90
                  px-3
                  py-1.5
                  shadow-[0_8px_24px_rgba(25,25,25,0.08)]
                  backdrop-blur-md
                "
              >
                <span
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
                    tracking-[0.13em]
                    text-ink/60
                  "
                >
                  Pune · Maharashtra
                </span>
              </div>
            </div>

            {/* Map footer */}

            <div
              className="
                grid
                gap-5
                border-t
                border-ink/[0.08]
                p-5

                sm:grid-cols-[1fr_auto]
                sm:items-center
                sm:p-6
              "
            >
              <div>
                <p
                  className="
                    font-display
                    text-[1.18rem]
                    font-semibold
                    leading-[1.08]
                    tracking-[-0.02em]
                    text-ink

                    sm:text-[1.25rem]
                  "
                >
                  {EVENT.venue.name}
                </p>

                <p
                  className="
                    mt-2
                    text-[13px]
                    leading-6
                    text-ink/50
                  "
                >
                  {EVENT.venue.line}, {EVENT.venue.city}
                </p>
              </div>

              <Button
                href={EVENT.venue.mapsUrl}
                external
                size="md"
                className="
                  group/button
                  w-full
                  justify-center
                  gap-2

                  sm:w-auto
                "
              >
                Get Directions

                <ArrowUpRight
                  aria-hidden="true"
                  className="
                    size-4

                    transition-transform
                    duration-300

                    group-hover/button:translate-x-0.5
                    group-hover/button:-translate-y-0.5
                  "
                  strokeWidth={1.8}
                />
              </Button>
            </div>

            {/* Solar hover accent */}

            <span
              aria-hidden="true"
              className="
                absolute
                inset-x-0
                bottom-0
                h-[2px]
                origin-left
                scale-x-0
                bg-solar

                transition-transform
                duration-500
                ease-out

                group-hover:scale-x-100
              "
            />
          </motion.article>

          {/* =================================================
              Venue Info
              ================================================= */}

          <motion.div
            variants={groupVariants}
            initial={reduceMotion ? false : "hidden"}
            whileInView="visible"
            viewport={{
              once: true,
              amount: 0.12,
              margin: "-40px",
            }}
            className="
              grid
              gap-3

              sm:grid-cols-3

              lg:grid-cols-1
            "
          >
            {VENUE_INFO.map((item, index) => {
              const ItemIcon = item.icon;

              return (
                <motion.article
                  key={item.title}
                  variants={revealVariants}
                  className="
                    group
                    relative
                    min-h-[160px]
                    overflow-hidden
                    rounded-2xl
                    border
                    border-ink/[0.08]
                    bg-paper/85
                    p-5
                    backdrop-blur-sm

                    transition-[border-color,background-color,box-shadow]
                    duration-400
                    ease-out

                    hover:border-blue/20
                    hover:bg-paper
                    hover:shadow-[0_12px_36px_rgba(25,25,25,0.045)]

                    lg:min-h-0
                    lg:p-6
                  "
                >
                  {/* Accent */}

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
                      ease-out

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
                    {/* Icon */}

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
                        bg-paper
                        text-blue

                        shadow-[0_6px_18px_rgba(25,25,25,0.035)]

                        transition-[background-color,border-color,color,transform]
                        duration-300
                        ease-out

                        group-hover:scale-[1.03]
                        group-hover:border-solar
                        group-hover:bg-solar
                        group-hover:text-ink
                      "
                    >
                      <ItemIcon
                        aria-hidden="true"
                        className="size-4"
                        strokeWidth={1.75}
                      />
                    </div>

                    {/* Copy */}

                    <div className="min-w-0">
                      <div
                        className="
                          flex
                          items-start
                          justify-between
                          gap-4
                        "
                      >
                        <h3
                          className="
                            max-w-[260px]
                            font-display
                            text-[1.08rem]
                            font-semibold
                            leading-[1.1]
                            tracking-[-0.018em]
                            text-ink

                            sm:text-[1.12rem]
                          "
                        >
                          {item.title}
                        </h3>

                        <span
                          aria-hidden="true"
                          className="
                            hidden
                            font-display
                            text-[9px]
                            font-semibold
                            tracking-[0.12em]
                            text-ink/20

                            lg:block
                          "
                        >
                          {String(index + 1).padStart(2, "0")}
                        </span>
                      </div>

                      <p
                        className="
                          mt-2.5
                          max-w-sm
                          text-[13px]
                          leading-6
                          text-ink/48
                        "
                      >
                        {item.desc}
                      </p>
                    </div>
                  </div>

                  {/* Bottom line */}

                  <span
                    aria-hidden="true"
                    className="
                      absolute
                      bottom-5
                      left-[76px]
                      h-px
                      w-7
                      bg-blue/15

                      transition-[width,background-color]
                      duration-500
                      ease-out

                      group-hover:w-12
                      group-hover:bg-solar

                      lg:bottom-6
                    "
                  />
                </motion.article>
              );
            })}
          </motion.div>
        </div>

        {/* =================================================
            Bottom Location Rail
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
            margin: "-30px",
          }}
          transition={{
            duration: 0.54,
            ease: EASE,
          }}
          className="
            mt-7
            flex
            flex-col
            gap-3
            border-t
            border-ink/[0.08]
            pt-6

            sm:flex-row
            sm:items-center
            sm:justify-between
          "
        >
          <div
            className="
              flex
              items-center
              gap-3
            "
          >
            <div
              className="
                flex
                size-8
                items-center
                justify-center
                rounded-full
                bg-blue/10
                text-blue
              "
            >
              <MapPin
                aria-hidden="true"
                className="size-4"
                strokeWidth={1.75}
              />
            </div>

            <p
              className="
                text-[11px]
                leading-5
                text-ink/38
              "
            >
              Auto Cluster Exhibition Center · Pune · Maharashtra
            </p>
          </div>

          <div
            aria-hidden="true"
            className="
              flex
              items-center
              gap-2
            "
          >
            <span
              className="
                size-1.5
                rounded-full
                bg-solar
              "
            />

            <span
              className="
                h-px
                w-7
                bg-ink/10
              "
            />

            <span
              className="
                size-1.5
                rounded-full
                bg-blue
              "
            />
          </div>
        </motion.div>
      </Container>
    </section>
  );
}