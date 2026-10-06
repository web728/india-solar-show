"use client";

import type { ReactNode } from "react";
import { motion, useReducedMotion } from "framer-motion";

type StaggerProps = {
  children: ReactNode;
  className?: string;
};

export function Stagger({
  children,
  className,
}: StaggerProps) {
  const reduceMotion = useReducedMotion();

  return (
    <motion.div
      className={className}
      initial={reduceMotion ? false : "hidden"}
      whileInView="show"
      viewport={{
        once: true,
        amount: 0.12,
      }}
      variants={{
        hidden: {},
        show: {
          transition: {
            staggerChildren: 0.09,
          },
        },
      }}
    >
      {children}
    </motion.div>
  );
}

export function StaggerItem({
  children,
  className,
}: StaggerProps) {
  return (
    <motion.div
      className={className}
      variants={{
        hidden: {
          opacity: 0,
          y: 20,
        },
        show: {
          opacity: 1,
          y: 0,
          transition: {
            duration: 0.55,
            ease: [0.22, 1, 0.36, 1],
          },
        },
      }}
    >
      {children}
    </motion.div>
  );
}