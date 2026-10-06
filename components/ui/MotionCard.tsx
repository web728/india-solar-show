"use client";

import type { ReactNode } from "react";
import { motion, useReducedMotion } from "framer-motion";

type MotionCardProps = {
  children: ReactNode;
  className?: string;
};

export function MotionCard({
  children,
  className,
}: MotionCardProps) {
  const reduceMotion = useReducedMotion();

  return (
    <motion.article
      className={className}
      whileHover={
        reduceMotion
          ? undefined
          : {
              y: -5,
            }
      }
      transition={{
        duration: 0.25,
        ease: [0.22, 1, 0.36, 1],
      }}
    >
      {children}
    </motion.article>
  );
}