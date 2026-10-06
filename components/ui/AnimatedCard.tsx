"use client";

import type { MouseEvent, ReactNode } from "react";
import {
  motion,
  useMotionValue,
  useSpring,
} from "framer-motion";

import { cn } from "@/lib/utils";

interface AnimatedCardProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  tone?: "light" | "dark";
  tilt?: boolean;
}

export function AnimatedCard({
  children,
  className,
  delay = 0,
  tone = "light",
  tilt = true,
}: AnimatedCardProps) {
  const rotateXBase = useMotionValue(0);
  const rotateYBase = useMotionValue(0);

  const rotateX = useSpring(rotateXBase, {
    stiffness: 260,
    damping: 22,
  });

  const rotateY = useSpring(rotateYBase, {
    stiffness: 260,
    damping: 22,
  });

  function handleMouseMove(
    e: MouseEvent<HTMLDivElement>,
  ) {
    if (!tilt) return;

    const rect =
      e.currentTarget.getBoundingClientRect();

    const x =
      (e.clientX - rect.left) /
        rect.width -
      0.5;

    const y =
      (e.clientY - rect.top) /
        rect.height -
      0.5;

    rotateXBase.set(y * -5);
    rotateYBase.set(x * 5);
  }

  function handleMouseLeave() {
    rotateXBase.set(0);
    rotateYBase.set(0);
  }

  return (
    <motion.div
      initial="hidden"
      whileInView="show"
      whileHover="hover"
      viewport={{
        once: true,
        amount: 0.15,
      }}
      variants={{
        hidden: {
          opacity: 0,
          y: 24,
        },

        show: {
          opacity: 1,
          y: 0,
          scale: 1,
          transition: {
            duration: 0.55,
            delay,
            ease: [0.22, 1, 0.36, 1],
          },
        },

        hover: {
          y: -8,
          scale: 1.015,
          boxShadow:
            tone === "dark"
              ? "0 24px 60px rgba(0,0,0,0.32)"
              : "0 22px 50px rgba(25,25,25,0.13)",
          transition: {
            duration: 0.28,
            ease: [0.22, 1, 0.36, 1],
          },
        },
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX,
        rotateY,
        transformPerspective: 900,
      }}
      className={cn(
        "group relative overflow-hidden border will-change-transform",
        tone === "dark"
          ? "border-white/10 bg-white/[0.025]"
          : "border-border bg-white",
        className,
      )}
    >
      {/* Hover background */}
      <motion.div
        aria-hidden="true"
        variants={{
          hidden: { opacity: 0 },
          show: { opacity: 0 },
          hover: { opacity: 1 },
        }}
        transition={{
          duration: 0.25,
        }}
        className={cn(
          "pointer-events-none absolute inset-0",
          tone === "dark"
            ? "bg-solar/[0.06]"
            : "bg-solar/[0.04]",
        )}
      />

      {/* Top yellow line */}
      <motion.div
        aria-hidden="true"
        variants={{
          hidden: {
            scaleX: 0,
          },
          show: {
            scaleX: 0,
          },
          hover: {
            scaleX: 1,
          },
        }}
        transition={{
          duration: 0.35,
          ease: [0.22, 1, 0.36, 1],
        }}
        className="pointer-events-none absolute inset-x-0 top-0 h-[3px] origin-left bg-solar"
      />

      {/* Glow */}
      <motion.div
        aria-hidden="true"
        variants={{
          hidden: {
            opacity: 0,
            scale: 0.7,
          },
          show: {
            opacity: 0,
            scale: 0.7,
          },
          hover: {
            opacity: 1,
            scale: 1,
          },
        }}
        transition={{
          duration: 0.35,
        }}
        className="pointer-events-none absolute -right-16 -top-16 h-44 w-44 rounded-full bg-solar/15 blur-3xl"
      />

      <div className="relative z-10">
        {children}
      </div>
    </motion.div>
  );
}