"use client";

import {
  ArrowUpRight,
  Check,
  Mail,
  MessageCircle,
  Phone,
  User,
} from "lucide-react";

import {
  FormEvent,
  useState,
} from "react";

import {
  motion,
  useReducedMotion,
} from "framer-motion";

import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";

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

function FinalCTABackground({
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
      {/* Blue ambient glow */}

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

      {/* Solar ambient glow */}

      <div
        className="
          absolute
          -right-44
          -top-28
          size-[30rem]
          rounded-full
          bg-solar/[0.08]
          blur-[110px]
        "
      />

      {/* Main animated geometry */}

      <motion.svg
        viewBox="0 0 900 900"
        fill="none"
        className="
          absolute
          -right-[340px]
          -top-[350px]
          size-[820px]
          text-blue
          opacity-[0.035]

          sm:-right-[280px]
          sm:size-[900px]

          lg:-right-[210px]
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
          stroke="none"
        />
      </motion.svg>

      {/* Bottom counter rotating geometry */}

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
          opacity-[0.045]

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
   Final CTA
   ========================================================= */

export function FinalCTA() {
  const reduceMotion = useReducedMotion();

  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    /*
      Connect API / CRM here.

      Example:

      const formData = new FormData(event.currentTarget);

      await fetch("/api/newsletter", {
        method: "POST",
        body: formData,
      });
    */

    setSubmitted(true);
  }

  return (
    <section
      aria-labelledby="final-cta-title"
      className="
        relative
        isolate
        overflow-hidden
        border-t
        border-ink/[0.08]
        bg-paper
        text-ink
      "
    >
      <FinalCTABackground reduceMotion={reduceMotion} />

      <Container
        className="
          relative
          py-14
          sm:py-16
          lg:py-18
        "
      >
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
            gap-8

            lg:grid-cols-[minmax(0,1fr)_360px]
            lg:items-center
            lg:gap-12

            xl:grid-cols-[minmax(0,1fr)_390px]
            xl:gap-14
          "
        >
          {/* =================================================
              Left Content
              ================================================= */}

          <div className="max-w-[760px]">
            <motion.div
              variants={revealVariants}
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
                Talk to our team
              </span>
            </motion.div>

            <motion.h2
              id="final-cta-title"
              variants={revealVariants}
              className="
                mt-4
                max-w-[700px]
                font-display
                text-[clamp(2.15rem,3.7vw,3.9rem)]
                font-semibold
                leading-[0.98]
                tracking-[-0.035em]
                text-ink
              "
            >
              Ready to be part of
              <span className="text-blue">
                {" "}India&apos;s solar future?
              </span>
            </motion.h2>

            <motion.p
              variants={revealVariants}
              className="
                mt-4
                max-w-[620px]
                text-sm
                leading-7
                text-ink/52

                sm:text-[15px]
              "
            >
              Connect with our team for exhibiting, visiting,
              partnerships, sponsorship opportunities or general
              event enquiries.
            </motion.p>

            {/* Actions */}

            <motion.div
              variants={revealVariants}
              className="
                mt-6
                flex
                flex-col
                gap-2.5

                sm:flex-row
                sm:flex-wrap
              "
            >
              <Button
                href="/contact"
                size="md"
                className="
                  group/contact
                  justify-center
                  gap-3

                  sm:justify-between
                "
              >
                <span>
                  Contact Our Team
                </span>

                <ArrowUpRight
                  aria-hidden="true"
                  className="
                    size-4

                    transition-transform
                    duration-300

                    group-hover/contact:translate-x-0.5
                    group-hover/contact:-translate-y-0.5
                  "
                  strokeWidth={1.8}
                />
              </Button>

              <Button
                href="mailto:namit@futurextrade.com"
                variant="outline"
                size="md"
                className="
                  justify-center
                  gap-2
                  border-ink/15
                  bg-paper/70
                  text-ink

                  hover:border-blue
                  hover:bg-blue
                  hover:text-paper
                "
              >
                <Mail
                  aria-hidden="true"
                  className="size-4"
                  strokeWidth={1.8}
                />

                Email Us
              </Button>

              <Button
                href="/contact"
                variant="outline"
                size="md"
                className="
                  justify-center
                  gap-2
                  border-ink/15
                  bg-paper/70
                  text-ink

                  hover:border-solar
                  hover:bg-solar
                  hover:text-ink
                "
              >
                <MessageCircle
                  aria-hidden="true"
                  className="size-4"
                  strokeWidth={1.8}
                />

                Enquire Now
              </Button>
            </motion.div>

            {/* Supporting rail */}

            <motion.div
              variants={revealVariants}
              className="
                mt-6
                flex
                flex-wrap
                items-center
                gap-x-5
                gap-y-2
              "
            >
              {[
                "Exhibit",
                "Visit",
                "Partner",
                "Sponsor",
              ].map((item) => (
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
                      text-[9px]
                      font-semibold
                      uppercase
                      tracking-[0.12em]
                      text-ink/30
                    "
                  >
                    {item}
                  </span>
                </div>
              ))}
            </motion.div>
          </div>

          {/* =================================================
              Newsletter
              ================================================= */}

          <motion.div
            variants={revealVariants}
            className="
              group/newsletter
              relative
              overflow-hidden
              rounded-2xl
              border
              border-ink/[0.08]
              bg-paper/85
              p-5
              shadow-[0_14px_45px_rgba(25,25,25,0.055)]
              backdrop-blur-sm

              sm:p-6
            "
          >
            {/* Top solar line */}

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

            {/* Card glow */}

            <div
              aria-hidden="true"
              className="
                pointer-events-none
                absolute
                -right-16
                -top-20
                size-[12rem]
                rounded-full
                bg-solar/[0.07]
                blur-[65px]
              "
            />

            {/* Header */}

            <div
              className="
                relative
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
                <Mail
                  aria-hidden="true"
                  className="size-4"
                  strokeWidth={1.8}
                />
              </div>

              <div>
                <span
                  className="
                    block
                    text-[9px]
                    font-semibold
                    uppercase
                    tracking-[0.14em]
                    text-blue
                  "
                >
                  Newsletter
                </span>

                <h3
                  className="
                    mt-0.5
                    font-display
                    text-[1.15rem]
                    font-semibold
                    leading-tight
                    tracking-[-0.02em]
                    text-ink
                  "
                >
                  Stay Updated
                </h3>
              </div>
            </div>

            <p
              className="
                relative
                mt-3
                text-[12px]
                leading-5
                text-ink/45
              "
            >
              Get exhibitor announcements, visitor updates and important
              show information.
            </p>

            {/* =================================================
                Success State
                ================================================= */}

            {submitted ? (
              <motion.div
                initial={
                  reduceMotion
                    ? false
                    : {
                        opacity: 0,
                        y: 8,
                      }
                }
                animate={{
                  opacity: 1,
                  y: 0,
                }}
                transition={{
                  duration: 0.4,
                  ease: EASE,
                }}
                role="status"
                className="
                  relative
                  mt-5
                  flex
                  min-h-[176px]
                  flex-col
                  items-center
                  justify-center
                  rounded-xl
                  border
                  border-solar/25
                  bg-solar/[0.07]
                  px-5
                  text-center
                "
              >
                <div
                  className="
                    flex
                    size-9
                    items-center
                    justify-center
                    rounded-full
                    bg-solar
                    text-ink
                  "
                >
                  <Check
                    aria-hidden="true"
                    className="size-4"
                    strokeWidth={2}
                  />
                </div>

                <p
                  className="
                    mt-3
                    font-display
                    text-base
                    font-semibold
                    text-ink
                  "
                >
                  Thank you
                </p>

                <p
                  className="
                    mt-1
                    max-w-[240px]
                    text-[12px]
                    leading-5
                    text-ink/45
                  "
                >
                  You&apos;re subscribed for future show updates.
                </p>
              </motion.div>
            ) : (
              /* =================================================
                 Form
                 ================================================= */

              <form
                onSubmit={handleSubmit}
                className="
                  relative
                  mt-5
                  space-y-2.5
                "
              >
                {/* Name */}

                <label
                  className="
                    group/input
                    flex
                    min-h-11
                    items-center
                    gap-3
                    rounded-xl
                    border
                    border-ink/[0.08]
                    bg-paper
                    px-3.5

                    transition-[border-color,box-shadow]
                    duration-300

                    focus-within:border-blue/35
                    focus-within:shadow-[0_0_0_3px_rgba(45,90,140,0.06)]
                  "
                >
                  <User
                    aria-hidden="true"
                    className="
                      size-4
                      shrink-0
                      text-ink/25

                      transition-colors

                      group-focus-within/input:text-blue
                    "
                    strokeWidth={1.8}
                  />

                  <input
                    type="text"
                    name="name"
                    required
                    autoComplete="name"
                    placeholder="Your name"
                    className="
                      min-w-0
                      flex-1
                      border-0
                      bg-transparent
                      text-[13px]
                      text-ink
                      outline-none
                      placeholder:text-ink/28
                    "
                  />
                </label>

                {/* Email */}

                <label
                  className="
                    group/input
                    flex
                    min-h-11
                    items-center
                    gap-3
                    rounded-xl
                    border
                    border-ink/[0.08]
                    bg-paper
                    px-3.5

                    transition-[border-color,box-shadow]
                    duration-300

                    focus-within:border-blue/35
                    focus-within:shadow-[0_0_0_3px_rgba(45,90,140,0.06)]
                  "
                >
                  <Mail
                    aria-hidden="true"
                    className="
                      size-4
                      shrink-0
                      text-ink/25

                      transition-colors

                      group-focus-within/input:text-blue
                    "
                    strokeWidth={1.8}
                  />

                  <input
                    type="email"
                    name="email"
                    required
                    autoComplete="email"
                    placeholder="Email address"
                    className="
                      min-w-0
                      flex-1
                      border-0
                      bg-transparent
                      text-[13px]
                      text-ink
                      outline-none
                      placeholder:text-ink/28
                    "
                  />
                </label>

                {/* Phone */}

                <label
                  className="
                    group/input
                    flex
                    min-h-11
                    items-center
                    gap-3
                    rounded-xl
                    border
                    border-ink/[0.08]
                    bg-paper
                    px-3.5

                    transition-[border-color,box-shadow]
                    duration-300

                    focus-within:border-blue/35
                    focus-within:shadow-[0_0_0_3px_rgba(45,90,140,0.06)]
                  "
                >
                  <Phone
                    aria-hidden="true"
                    className="
                      size-4
                      shrink-0
                      text-ink/25

                      transition-colors

                      group-focus-within/input:text-blue
                    "
                    strokeWidth={1.8}
                  />

                  <input
                    type="tel"
                    name="phone"
                    required
                    autoComplete="tel"
                    inputMode="tel"
                    placeholder="Phone number"
                    className="
                      min-w-0
                      flex-1
                      border-0
                      bg-transparent
                      text-[13px]
                      text-ink
                      outline-none
                      placeholder:text-ink/28
                    "
                  />
                </label>

                {/* Submit */}

                <button
                  type="submit"
                  className="
                    group/subscribe
                    mt-1
                    flex
                    min-h-11
                    w-full
                    items-center
                    justify-between
                    rounded-xl
                    bg-blue
                    px-4
                    text-[10px]
                    font-semibold
                    uppercase
                    tracking-[0.13em]
                    text-paper

                    shadow-[0_8px_24px_rgba(45,90,140,0.14)]

                    transition-[transform,background-color,box-shadow]
                    duration-300

                    hover:-translate-y-0.5
                    hover:bg-ink
                    hover:shadow-[0_12px_30px_rgba(25,25,25,0.12)]
                  "
                >
                  Subscribe to Updates

                  <ArrowUpRight
                    aria-hidden="true"
                    className="
                      size-4

                      transition-transform
                      duration-300

                      group-hover/subscribe:translate-x-0.5
                      group-hover/subscribe:-translate-y-0.5
                    "
                    strokeWidth={1.8}
                  />
                </button>

                <p
                  className="
                    px-1
                    pt-0.5
                    text-[9px]
                    leading-4
                    text-ink/28
                  "
                >
                  Event updates only. No unnecessary emails.
                </p>
              </form>
            )}
          </motion.div>
        </motion.div>

        {/* =================================================
            Bottom divider
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
            delay: 0.15,
            ease: EASE,
          }}
          aria-hidden="true"
          className="
            mt-10
            h-px
            origin-left
            bg-ink/[0.08]

            lg:mt-12
          "
        />
      </Container>
    </section>
  );
}