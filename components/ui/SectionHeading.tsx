"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface SectionHeadingProps {
  eyebrow: string;
  heading: string;
  intro?: string;
  align?: "left" | "center";
  tone?: "light" | "dark";
  as?: "h1" | "h2";
  className?: string;
  id?: string;
}

export function SectionHeading({
  eyebrow,
  heading,
  intro,
  align = "left",
  tone = "dark",
  as = "h2",
  className,
}: SectionHeadingProps) {
  const Heading = as;
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className={cn("max-w-3xl", align === "center" && "mx-auto text-center", className)}
    >
      <span
        className={cn(
          "inline-flex items-center gap-2 text-xs md:text-sm font-semibold tracking-[0.2em] uppercase mb-3 md:mb-4",
          tone === "light" ? "text-[color:var(--color-sky)]" : "text-[color:var(--color-carrot)]"
        )}
      >
        <span className="h-1.5 w-1.5 rounded-full bg-current" aria-hidden="true" />
        {eyebrow}
      </span>
      <Heading
        className={cn(
          "font-extrabold tracking-tight leading-[1.08]",
          as === "h1" ? "text-4xl sm:text-5xl md:text-6xl lg:text-7xl" : "text-3xl sm:text-4xl md:text-5xl",
          tone === "light" ? "text-white" : "text-[color:var(--color-navy)]"
        )}
      >
        {heading}
      </Heading>
      {intro && (
        <p
          className={cn(
            "mt-4 md:mt-5 text-base md:text-lg leading-relaxed",
            tone === "light" ? "text-white/70" : "text-slate-600"
          )}
        >
          {intro}
        </p>
      )}
    </motion.div>
  );
}
