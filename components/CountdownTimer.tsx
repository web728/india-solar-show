"use client";

import { useEffect, useState } from "react";

import { motion, useReducedMotion } from "framer-motion";

import { CalendarDays, Sparkles } from "lucide-react";

import { EVENT } from "@/data/siteData";

/* =========================================================
   Constants
   ========================================================= */

const EASE = [0.16, 1, 0.3, 1] as const;

const UNITS = [
  ["days", "Days"],
  ["hours", "Hours"],
  ["minutes", "Minutes"],
  ["seconds", "Seconds"],
] as const;

/* =========================================================
   Time
   ========================================================= */

function getRemaining() {
  const diff = new Date(EVENT.dates.start).getTime() - Date.now();

  const ms = Math.max(diff, 0);

  return {
    days: Math.floor(ms / 86400000),

    hours: Math.floor((ms / 3600000) % 24),

    minutes: Math.floor((ms / 60000) % 60),

    seconds: Math.floor((ms / 1000) % 60),

    ended: diff <= 0,
  };
}

/* =========================================================
   Background
   ========================================================= */

function CountdownBackground({
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
      <div
        className="
          absolute
          -right-20
          -top-24
          size-56
          rounded-full
          bg-blue/[0.2]
          blur-[85px]
        "
      />

      <div
        className="
          absolute
          -bottom-20
          -left-16
          size-44
          rounded-full
          bg-solar/[0.08]
          blur-[75px]
        "
      />

      <motion.svg
        viewBox="0 0 420 420"
        fill="none"
        className="
          absolute
          -right-36
          -top-36
          size-[390px]
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
        <circle cx="210" cy="210" r="76" stroke="currentColor" />

        <circle
          cx="210"
          cy="210"
          r="128"
          stroke="currentColor"
          strokeDasharray="3 14"
        />

        <circle cx="210" cy="210" r="188" stroke="currentColor" />

        <path d="M210 22V398" stroke="currentColor" />

        <path d="M22 210H398" stroke="currentColor" />

        <circle cx="210" cy="82" r="4" fill="#FBB216" stroke="none" />
      </motion.svg>
    </div>
  );
}

/* =========================================================
   Countdown Item
   ========================================================= */

function CountdownItem({
  value,
  label,
  index,
  reduceMotion,
}: {
  value: number | null;
  label: string;
  index: number;
  reduceMotion: boolean | null;
}) {
  const displayValue = value === null ? "--" : String(value).padStart(2, "0");

  return (
    <div
      className="
        relative
        flex
        min-w-0
        flex-col
        items-center
        justify-center
        px-2
        py-4

        sm:px-4
        sm:py-5

        lg:px-5
      "
    >
      {/* top micro label */}

      <span
        className="
          absolute
          left-1/2
          top-2.5
          -translate-x-1/2
          text-[7px]
          font-semibold
          tracking-[0.14em]
          text-paper/15
        "
      >
        {String(index + 1).padStart(2, "0")}
      </span>

      {/* digit window */}

      <div
        className="
          relative
          mt-2
          h-[38px]
          overflow-hidden

          sm:h-[46px]

          lg:h-[50px]
        "
      >
        <motion.span
          key={displayValue}
          initial={
            reduceMotion
              ? false
              : {
                  opacity: 0,
                  y: 18,
                  filter: "blur(4px)",
                }
          }
          animate={{
            opacity: 1,
            y: 0,
            filter: "blur(0px)",
          }}
          transition={{
            duration: reduceMotion ? 0.1 : 0.34,

            ease: EASE,
          }}
          className="
            block
            font-display
            text-[2rem]
            font-semibold
            leading-none
            tracking-[-0.045em]
            tabular-nums
            text-paper

            sm:text-[2.45rem]

            lg:text-[2.7rem]
          "
        >
          {displayValue}
        </motion.span>
      </div>

      {/* label */}

      <span
        className="
          mt-2
          text-[8px]
          font-semibold
          uppercase
          tracking-[0.14em]
          text-solar

          sm:text-[9px]
        "
      >
        {label}
      </span>

      {/* divider */}

      {index < UNITS.length - 1 && (
        <>
          <span
            aria-hidden="true"
            className="
              absolute
              right-0
              top-1/2
              hidden
              h-[46%]
              w-px
              -translate-y-1/2
              bg-paper/[0.08]

              sm:block
            "
          />

          <span
            aria-hidden="true"
            className="
              absolute
              -right-[2px]
              top-[43%]
              hidden
              size-1
              rounded-full
              bg-solar/70

              sm:block
            "
          />
        </>
      )}
    </div>
  );
}

/* =========================================================
   Countdown
   ========================================================= */

export function CountdownTimer() {
  const reduceMotion = useReducedMotion();

  const [time, setTime] = useState<ReturnType<typeof getRemaining> | null>(
    null,
  );

  useEffect(() => {
    const update = () => setTime(getRemaining());

    update();

    const id = window.setInterval(update, 1000);

    return () => window.clearInterval(id);
  }, []);

  /* =======================================================
     Event Started
     ======================================================= */

  if (time?.ended) {
    return (
      <motion.div
        initial={
          reduceMotion
            ? false
            : {
                opacity: 0,
                y: 12,
              }
        }
        animate={{
          opacity: 1,
          y: 0,
        }}
        transition={{
          duration: 0.5,
          ease: EASE,
        }}
        className="
          relative
          overflow-hidden
          rounded-2xl
          border
          border-paper/10
          bg-ink
          p-5
          text-paper
          shadow-[0_16px_48px_rgba(25,25,25,0.18)]

          sm:p-6
        "
      >
        <CountdownBackground reduceMotion={reduceMotion} />

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
          className="
            relative
            z-10
            flex
            items-center
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
            <Sparkles aria-hidden="true" className="size-4" strokeWidth={1.8} />
          </div>

          <div>
            <span
              className="
                block
                text-[9px]
                font-semibold
                uppercase
                tracking-[0.14em]
                text-solar
              "
            >
              Show Open
            </span>

            <p
              className="
                mt-1
                font-display
                text-[1.2rem]
                font-semibold
                leading-tight
                tracking-[-0.025em]
                text-paper

                sm:text-[1.35rem]
              "
            >
              India International Solar Show 2026
            </p>
          </div>
        </div>
      </motion.div>
    );
  }

  /* =======================================================
     Countdown
     ======================================================= */

  return (
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
        amount: 0.3,
      }}
      transition={{
        duration: 0.55,
        ease: EASE,
      }}
      role="timer"
      aria-live="off"
      aria-label={`Countdown to India International Solar Show 2026, starting ${EVENT.dates.displayLong}`}
      className="
        relative
        isolate
        overflow-hidden
        rounded-2xl
        border
        border-paper/10
        bg-ink
        text-paper
        shadow-[0_18px_55px_rgba(25,25,25,0.18)]
      "
    >
      <CountdownBackground reduceMotion={reduceMotion} />

      {/* solar top line */}

      <span
        aria-hidden="true"
        className="
          absolute
          inset-x-0
          top-0
          h-[2px]
          bg-gradient-to-r
          from-transparent
          via-solar
          to-transparent
        "
      />

      {/* ===================================================
          Header
          =================================================== */}

      <div
        className="
          relative
          z-10
          flex
          items-center
          justify-between
          gap-4
          border-b
          border-paper/[0.08]
          px-4
          py-3

          sm:px-5
        "
      >
        <div
          className="
            flex
            items-center
            gap-3
          "
        >
          <span
            className="
              flex
              size-8
              shrink-0
              items-center
              justify-center
              rounded-full
              border
              border-paper/10
              bg-paper/[0.04]
              text-solar
            "
          >
            <CalendarDays
              aria-hidden="true"
              className="size-3.5"
              strokeWidth={1.8}
            />
          </span>

          <div>
            <span
              className="
                block
                text-[8px]
                font-semibold
                uppercase
                tracking-[0.14em]
                text-solar
              "
            >
              Countdown to Show
            </span>

            <span
              className="
                mt-0.5
                block
                text-[10px]
                font-medium
                text-paper/35
              "
            >
              {EVENT.dates.displayLong}
            </span>
          </div>
        </div>

        <div
          className="
            hidden
            items-center
            gap-2

            sm:flex
          "
        >
          <span
            className="
              size-1.5
              rounded-full
              bg-solar
              shadow-[0_0_12px_rgba(251,178,22,0.7)]
            "
          />

          <span
            className="
              text-[8px]
              font-semibold
              uppercase
              tracking-[0.13em]
              text-paper/25
            "
          >
            Pune · 2026
          </span>
        </div>
      </div>

      {/* ===================================================
          Timer Grid
          =================================================== */}

      <div
        className="
          relative
          z-10
          grid
          grid-cols-4
        "
      >
        {UNITS.map(([key, label], index) => (
          <CountdownItem
            key={key}
            value={time ? time[key] : null}
            label={label}
            index={index}
            reduceMotion={reduceMotion}
          />
        ))}
      </div>

      {/* ===================================================
          Bottom accent
          =================================================== */}

      <div
        aria-hidden="true"
        className="
          relative
          z-10
          mx-4
          h-px
          bg-gradient-to-r
          from-transparent
          via-paper/[0.08]
          to-transparent

          sm:mx-5
        "
      />

      <div
        className="
          relative
          z-10
          flex
          items-center
          justify-between
          gap-4
          px-4
          py-2.5

          sm:px-5
        "
      >
        <span
          className="
            text-[8px]
            font-semibold
            uppercase
            tracking-[0.12em]
            text-paper/20
          "
        >
          India International Solar Show
        </span>

        <span
          className="
            text-[8px]
            font-semibold
            uppercase
            tracking-[0.12em]
            text-blue/80
          "
        >
          Solar · Storage · EV
        </span>
      </div>
    </motion.div>
  );
}
