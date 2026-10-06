"use client";

import {
  useEffect,
  useState,
} from "react";

import {
  motion,
  AnimatePresence,
  useReducedMotion,
} from "framer-motion";

import {
  ArrowUpRight,
  Phone,
} from "lucide-react";

import { Button } from "@/components/ui/Button";

/* =========================================================
   Constants
   ========================================================= */

const STALL_URL =
  "https://app.warpbay.com/E2yy0Klq";

const PHONE_URL =
  "tel:+919871839040";

const EASE =
  [0.16, 1, 0.3, 1] as const;

/* =========================================================
   Component
   ========================================================= */

export function StickyMobileCTA() {
  const [
    visible,
    setVisible,
  ] = useState(false);

  const reduceMotion =
    useReducedMotion();

  useEffect(() => {
    function onScroll() {
      setVisible(
        window.scrollY > 420,
      );
    }

    onScroll();

    window.addEventListener(
      "scroll",
      onScroll,
      {
        passive: true,
      },
    );

    return () => {
      window.removeEventListener(
        "scroll",
        onScroll,
      );
    };
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={
            reduceMotion
              ? false
              : {
                  opacity: 0,
                  y: 28,
                  scale: 0.985,
                }
          }
          animate={{
            opacity: 1,
            y: 0,
            scale: 1,
          }}
          exit={
            reduceMotion
              ? {
                  opacity: 0,
                }
              : {
                  opacity: 0,
                  y: 24,
                  scale: 0.985,
                }
          }
          transition={{
            duration:
              reduceMotion
                ? 0.15
                : 0.42,

            ease: EASE,
          }}
          className="
            fixed
            inset-x-0
            bottom-0
            z-50
            px-3
            pb-[calc(env(safe-area-inset-bottom)+10px)]

            lg:hidden
          "
        >
          <div
            className="
              relative
              mx-auto
              max-w-[560px]
              overflow-hidden
              rounded-[22px]
              border
              border-paper/10
              bg-ink/95
              p-2.5
              shadow-[0_18px_60px_rgba(25,25,25,0.28)]
              backdrop-blur-xl
            "
          >
            {/* solar accent */}

            <span
              aria-hidden="true"
              className="
                absolute
                inset-x-6
                top-0
                h-[2px]
                bg-gradient-to-r
                from-transparent
                via-solar
                to-transparent
              "
            />

            {/* blue glow */}

            <div
              aria-hidden="true"
              className="
                pointer-events-none
                absolute
                -right-12
                -top-14
                size-32
                rounded-full
                bg-blue/[0.22]
                blur-[55px]
              "
            />

            {/* solar glow */}

            <div
              aria-hidden="true"
              className="
                pointer-events-none
                absolute
                -bottom-14
                -left-12
                size-28
                rounded-full
                bg-solar/[0.09]
                blur-[50px]
              "
            />

            <div
              className="
                relative
                z-10
                grid
                grid-cols-[minmax(0,1fr)_auto]
                gap-2
              "
            >
              {/* Primary CTA */}

              <Button
                href={STALL_URL}
                external
                size="md"
                className="
                  group/stall
                  min-h-11
                  w-full
                  justify-between
                  gap-3
                  px-4
                "
              >
                <span
                  className="
                    flex
                    min-w-0
                    flex-col
                    items-start
                    text-left
                  "
                >
                  <span
                    className="
                      text-[10px]
                      font-semibold
                      leading-none
                    "
                  >
                    Book Your Stall
                  </span>

                  <span
                    className="
                      mt-1
                      text-[8px]
                      font-medium
                      leading-none
                      opacity-60
                    "
                  >
                    India Solar Show 2026
                  </span>
                </span>

                <ArrowUpRight
                  aria-hidden="true"
                  className="
                    size-4
                    shrink-0

                    transition-transform
                    duration-300

                    group-hover/stall:translate-x-0.5
                    group-hover/stall:-translate-y-0.5
                  "
                  strokeWidth={1.8}
                />
              </Button>

              {/* Call */}

              <Button
                href={PHONE_URL}
                variant="outline"
                size="md"
                aria-label="Call India Solar Show event team"
                className="
                  min-h-11
                  min-w-11
                  justify-center
                  gap-2
                  border-paper/12
                  bg-paper/[0.04]
                  px-3
                  text-paper

                  hover:border-solar
                  hover:bg-solar
                  hover:text-ink
                "
              >
                <Phone
                  aria-hidden="true"
                  className="size-4"
                  strokeWidth={1.8}
                />

                <span
                  className="
                    hidden
                    text-[10px]
                    font-semibold

                    xs:inline
                  "
                >
                  Call
                </span>
              </Button>
            </div>

            {/* bottom status rail */}

            <div
              aria-hidden="true"
              className="
                relative
                z-10
                mt-2
                flex
                items-center
                justify-between
                gap-3
                px-1
              "
            >
              <div
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
                    text-[8px]
                    font-semibold
                    uppercase
                    tracking-[0.12em]
                    text-paper/30
                  "
                >
                  Exhibitor Registration Open
                </span>
              </div>

              <span
                className="
                  text-[8px]
                  font-semibold
                  uppercase
                  tracking-[0.11em]
                  text-paper/18
                "
              >
                Pune 2026
              </span>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}