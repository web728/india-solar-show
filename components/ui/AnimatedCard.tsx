"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { ReactNode, MouseEvent } from "react";
import { useState } from "react";
import { cn } from "@/lib/utils";

interface AnimatedCardProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  tone?: "light" | "dark";
  tilt?: boolean;
}

export function AnimatedCard({ children, className, delay = 0, tone = "light", tilt = true }: AnimatedCardProps) {
  const reduceMotion = useReducedMotion();
  const [style, setStyle] = useState({ rotateX: 0, rotateY: 0 });

  function handleMouseMove(e: MouseEvent<HTMLDivElement>) {
    if (!tilt || reduceMotion) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width - 0.5;
    const py = (e.clientY - rect.top) / rect.height - 0.5;
    setStyle({ rotateX: py * -6, rotateY: px * 6 });
  }

  function handleMouseLeave() {
    setStyle({ rotateX: 0, rotateY: 0 });
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.55, delay, ease: [0.16, 1, 0.3, 1] }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        transform: `perspective(800px) rotateX(${style.rotateX}deg) rotateY(${style.rotateY}deg)`,
        transformStyle: "preserve-3d",
      }}
      className={cn(
        "group relative rounded-2xl border transition-[box-shadow,border-color,transform] duration-300 will-change-transform",
        tone === "dark"
          ? "glass border-white/10 hover:border-[color:var(--color-carrot)]/50 hover:shadow-[0_0_40px_-10px_rgba(247,148,29,0.35)]"
          : "bg-white border-slate-200 hover:border-[color:var(--color-carrot)]/40 hover:shadow-[0_20px_50px_-20px_rgba(0,0,0,0.2)]",
        className
      )}
    >
      {children}
    </motion.div>
  );
}
