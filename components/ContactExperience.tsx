"use client";

import { Headphones, Mail, MessageSquareText, Sparkles } from "lucide-react";

import { motion, useReducedMotion } from "framer-motion";

import { Container } from "@/components/ui/Container";
import { ContactCards } from "@/components/ContactCards";
import { ContactForm } from "@/components/forms/ContactForm";

/* =========================================================
   Motion
   ========================================================= */

const EASE = [0.16, 1, 0.3, 1] as const;

const groupVariants = {
  hidden: {},

  visible: {
    transition: {
      staggerChildren: 0.055,

      delayChildren: 0.035,
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
   Background
   ========================================================= */

function ContactBackground({ reduceMotion }: { reduceMotion: boolean | null }) {
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
      <div
        className="
          absolute
          -right-44
          -top-40
          size-[32rem]
          rounded-full
          bg-solar/[0.075]
          blur-[125px]
        "
      />

      <div
        className="
          absolute
          -bottom-44
          -left-40
          size-[30rem]
          rounded-full
          bg-blue/[0.045]
          blur-[125px]
        "
      />

      <motion.svg
        viewBox="0 0 900 900"
        fill="none"
        className="
          absolute
          -right-[380px]
          -top-[380px]
          size-[850px]
          text-blue
          opacity-[0.03]

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
        <circle cx="450" cy="450" r="125" stroke="currentColor" />

        <circle
          cx="450"
          cy="450"
          r="220"
          stroke="currentColor"
          strokeDasharray="4 16"
        />

        <circle cx="450" cy="450" r="325" stroke="currentColor" />

        <circle
          cx="450"
          cy="450"
          r="398"
          stroke="currentColor"
          strokeDasharray="2 22"
        />

        <path d="M450 28V872" stroke="currentColor" />

        <path d="M28 450H872" stroke="currentColor" />

        <path d="M152 152L748 748" stroke="currentColor" />

        <path d="M748 152L152 748" stroke="currentColor" />

        <circle cx="450" cy="125" r="7" fill="#fbb216" stroke="none" />
      </motion.svg>

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
        <circle cx="250" cy="250" r="100" stroke="currentColor" />

        <circle
          cx="250"
          cy="250"
          r="170"
          stroke="currentColor"
          strokeDasharray="3 14"
        />

        <circle cx="250" cy="250" r="235" stroke="currentColor" />

        <path d="M250 15V485" stroke="currentColor" />

        <path d="M15 250H485" stroke="currentColor" />
      </motion.svg>
    </div>
  );
}

/* =========================================================
   Component
   ========================================================= */

export function ContactExperience() {
  const reduceMotion = useReducedMotion();

  return (
    <section
      aria-labelledby="contact-heading"
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
      <ContactBackground reduceMotion={reduceMotion} />

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
            amount: 0.15,
            margin: "-40px",
          }}
          className="
            grid
            gap-7
            border-b
            border-ink/[0.08]
            pb-9

            lg:grid-cols-[1fr_0.72fr]
            lg:items-end
            lg:gap-14
            lg:pb-11
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
                  text-blue

                  sm:text-[11px]
                "
              >
                Get in Touch
              </span>
            </div>

            <h2
              id="contact-heading"
              className="
                mt-4
                max-w-[700px]
                font-display
                text-[clamp(2.15rem,3.55vw,3.7rem)]
                font-semibold
                leading-[0.98]
                tracking-[-0.035em]
                text-ink
              "
            >
              Tell Us How We Can
              <span
                className="
                  block
                  text-blue
                "
              >
                Help You Move Forward
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
                text-ink/52

                sm:text-[15px]
              "
            >
              Whether you&apos;re interested in exhibiting, attending,
              sponsoring or collaborating, send us your enquiry and our team
              will connect you with the right information.
            </p>

            <div
              className="
                mt-5
                flex
                flex-wrap
                gap-x-5
                gap-y-2
              "
            >
              {["Exhibit", "Visit", "Sponsor"].map((item) => (
                <div
                  key={item}
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
                        text-[9px]
                        font-semibold
                        uppercase
                        tracking-[0.12em]
                        text-ink/28
                      "
                  >
                    {item}
                  </span>
                </div>
              ))}
            </div>
          </motion.div>
        </motion.div>

        {/* =================================================
            Compact support rail
            ================================================= */}

        <motion.div
          variants={groupVariants}
          initial={reduceMotion ? false : "hidden"}
          whileInView="visible"
          viewport={{
            once: true,
            amount: 0.1,
            margin: "-30px",
          }}
          className="
            mt-8
            grid
            overflow-hidden
            rounded-2xl
            border
            border-ink/[0.08]
            bg-paper/75
            backdrop-blur-sm

            sm:grid-cols-3
          "
        >
          {[
            {
              icon: MessageSquareText,

              label: "General Enquiries",

              value: "Event information & support",
            },

            {
              icon: Headphones,

              label: "Event Team",

              value: "Direct assistance",
            },

            {
              icon: Mail,

              label: "Business Enquiries",

              value: "Exhibit · Visit · Partner",
            },
          ].map((item, index) => {
            const Icon = item.icon;

            return (
              <motion.div
                key={item.label}
                variants={revealVariants}
                className="
                    group
                    relative
                    flex
                    min-h-[96px]
                    items-center
                    gap-3
                    border-ink/[0.08]
                    p-4

                    transition-colors
                    duration-300

                    hover:bg-solar/[0.035]

                    max-sm:border-b
                    max-sm:last:border-b-0

                    sm:border-r
                    sm:last:border-r-0
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

                <div>
                  <span
                    className="
                        block
                        text-[9px]
                        font-semibold
                        uppercase
                        tracking-[0.12em]
                        text-blue
                      "
                  >
                    {item.label}
                  </span>

                  <span
                    className="
                        mt-1
                        block
                        text-[11px]
                        font-medium
                        text-ink/45
                      "
                  >
                    {item.value}
                  </span>
                </div>

                <span
                  aria-hidden="true"
                  className="
                      absolute
                      right-4
                      top-4
                      text-[8px]
                      font-semibold
                      tracking-[0.12em]
                      text-ink/14
                    "
                >
                  {String(index + 1).padStart(2, "0")}
                </span>
              </motion.div>
            );
          })}
        </motion.div>

        {/* =================================================
            Form + Contacts
            ================================================= */}

        <motion.div
          variants={groupVariants}
          initial={reduceMotion ? false : "hidden"}
          whileInView="visible"
          viewport={{
            once: true,
            amount: 0.06,
            margin: "-50px",
          }}
          className="
            mt-4
            grid
            gap-4

            lg:grid-cols-[minmax(0,1.12fr)_minmax(320px,0.88fr)]
            lg:items-stretch
          "
        >
          {/* =================================================
              Form Card
              ================================================= */}

          <motion.div
            variants={revealVariants}
            className="
              relative
              flex
              h-full
              min-h-0
              flex-col
              overflow-hidden
              rounded-2xl
              border
              border-ink/[0.08]
              bg-paper
              p-5
              shadow-[0_14px_42px_rgba(25,25,25,0.045)]

              sm:p-6

              lg:p-7
            "
          >
            <span
              aria-hidden="true"
              className="
                absolute
                inset-x-0
                top-0
                h-[2px]
                bg-solar
              "
            />

            <div
              aria-hidden="true"
              className="
                pointer-events-none
                absolute
                -right-20
                -top-20
                size-56
                rounded-full
                bg-blue/[0.035]
                blur-[80px]
              "
            />

            <div
              className="
                relative
                mb-5
                flex
                items-center
                gap-3
                border-b
                border-ink/[0.07]
                pb-4
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
                <MessageSquareText
                  aria-hidden="true"
                  className="size-4"
                  strokeWidth={1.75}
                />
              </div>

              <div>
                <span
                  className="
                    text-[8px]
                    font-semibold
                    uppercase
                    tracking-[0.14em]
                    text-blue
                  "
                >
                  Send a Message
                </span>

                <h3
                  className="
                    mt-0.5
                    font-display
                    text-[1.15rem]
                    font-semibold
                    leading-tight
                    tracking-[-0.025em]
                    text-ink

                    sm:text-[1.2rem]
                  "
                >
                  Contact the Event Team
                </h3>
              </div>
            </div>

            <div
              className="
                relative
                flex
                min-h-0
                flex-1
                flex-col
              "
            >
              <ContactForm />
            </div>
          </motion.div>

          {/* =================================================
              Contacts
              ================================================= */}

          <motion.aside
            variants={revealVariants}
            className="
              h-full
              min-h-0
            "
          >
            <ContactCards />
          </motion.aside>
        </motion.div>

        {/* Bottom line */}

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
            mt-9
            h-px
            origin-left
            bg-gradient-to-r
            from-solar/70
            via-ink/10
            to-transparent
          "
        />

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
        </motion.div>
      </Container>
    </section>
  );
}
