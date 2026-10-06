"use client";

import {
  motion,
  useReducedMotion,
  useScroll,
  useSpring,
} from "framer-motion";

export function ScrollProgress() {
  const { scrollYProgress } =
    useScroll();

  const reduceMotion =
    useReducedMotion();

  const smoothProgress =
    useSpring(
      scrollYProgress,
      reduceMotion
        ? {
            stiffness: 1000,
            damping: 100,
            mass: 0.01,
          }
        : {
            stiffness: 160,
            damping: 28,
            mass: 0.28,
            restDelta: 0.001,
          },
    );

  return (
    <div
      aria-hidden="true"
      className="
        pointer-events-none
        fixed
        inset-x-0
        top-0
        z-[80]
        h-[3px]
        overflow-hidden
        bg-ink/[0.04]
      "
    >
      <motion.div
        style={{
          scaleX:
            smoothProgress,
        }}
        className="
          relative
          h-full
          w-full
          origin-left
          bg-gradient-to-r
          from-blue
          via-solar
          to-solar
        "
      >
        {/* soft leading glow */}

        <motion.span
          className="
            absolute
            right-0
            top-1/2
            size-[7px]
            -translate-y-1/2
            translate-x-1/2
            rounded-full
            bg-solar
            shadow-[0_0_14px_rgba(251,178,22,0.75)]
          "
        />
      </motion.div>
    </div>
  );
}