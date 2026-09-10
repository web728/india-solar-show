"use client";

import { motion } from "framer-motion";
import { Container } from "@/components/ui/Container";

interface PageHeroProps {
  eyebrow: string;
  title: string;
  subtitle?: string;
}

export function PageHero({ eyebrow, title, subtitle }: PageHeroProps) {
  return (
    <section className="relative overflow-hidden bg-[color:var(--color-black)] pt-40 pb-20 sm:pt-48 sm:pb-24">
      <div className="absolute inset-0 bg-solar-grid opacity-[0.08]" aria-hidden="true" />
      <div className="absolute -top-32 right-[-10%] h-[400px] w-[400px] rounded-full radial-glow-gold animate-flare-pulse" aria-hidden="true" />
      <div className="absolute -bottom-20 left-[-8%] h-[300px] w-[300px] rounded-full radial-glow-gold opacity-40" aria-hidden="true" />

      <Container className="relative">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-3xl"
        >
          <span className="inline-flex items-center gap-2 text-xs sm:text-sm font-semibold tracking-[0.2em] uppercase text-[color:var(--color-gold)]">
            <span className="h-1.5 w-1.5 rounded-full bg-current" aria-hidden="true" />
            {eyebrow}
          </span>
          <h1 className="mt-4 text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-white leading-[1.08]">
            {title}
          </h1>
          {subtitle && (
            <p className="mt-5 text-base sm:text-lg leading-relaxed text-white/65 max-w-2xl">
              {subtitle}
            </p>
          )}
        </motion.div>
      </Container>
    </section>
  );
}
