"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { VALUE_CHAIN } from "@/data/siteData";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Icon } from "@/components/ui/Icon";
import { cn } from "@/lib/utils";
import Image from "next/image";

// Gentle arc offset per node index — turns the flat row into a memorable curved flow.
function arcOffset(i: number, total: number) {
  return Math.sin((i / (total - 1)) * Math.PI) * -26;
}

export function ValueChainSection() {
  const [active, setActive] = useState(0);
  const activeItem = VALUE_CHAIN[active];
  const total = VALUE_CHAIN.length;

  return (
    <section className="relative overflow-hidden bg-[color:var(--color-navy)] py-24 sm:py-32">
      <div className="absolute inset-0 bg-solar-grid opacity-[0.15]" aria-hidden="true" />
      <div className="absolute top-0 right-0 h-[480px] w-[480px] rounded-full radial-glow-carrot opacity-60" aria-hidden="true" />
      <div className="absolute bottom-0 left-0 h-[420px] w-[420px] rounded-full radial-glow-sky opacity-50" aria-hidden="true" />

      <Container className="relative">
        <div className="grid items-center gap-10 lg:grid-cols-[1.2fr_0.8fr]">
          {/* Left Content */}
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.25em] text-[color:var(--color-carrot)]">
              The Solar &amp; Clean Energy Ecosystem
            </p>

            <h2 className="mt-3 text-4xl font-bold leading-tight text-white lg:text-5xl">
              Uniting India's Renewable Energy &amp; Solar Value Chain
            </h2>

            <p className="mt-5 max-w-2xl text-lg leading-8 text-white/70">
              From solar PV generation and battery energy storage (BESS) to smart grid integration, E-Mobility, clean-tech financing, and industrial adoption — explore how every segment connects at India Solar International Show 2026.
            </p>
          </div>

          {/* Right Image */}
          <div className="hidden lg:block">
            <div className="overflow-hidden rounded-3xl border border-white/10 shadow-[0_20px_60px_-20px_rgba(0,0,0,0.6)]">
              <Image
                src="https://iievshow.com/wp-content/uploads/2024/04/energy-car-concept-vehicle-ev-charge-battery-electric-on-station-blur-cityscape-on-panoramic-banner-blue-background-with-icon-illustration-environment-earth-friendly-idea-green-eco-energy-technology-photo-scaled.jpg"
                alt="Solar Energy, Battery Storage, and EV Infrastructure Ecosystem in Pune India"
                width={900}
                height={550}
                className="h-[260px] w-full object-cover transition-transform duration-500 hover:scale-105"
              />
            </div>
          </div>
        </div>

        {/* Hidden Semantic List for Search Engine Crawlers */}
        <div className="sr-only">
          <h3>Solar &amp; Renewable Energy Value Chain Stages</h3>
          <ul>
            {VALUE_CHAIN.map((stage) => (
              <li key={stage.title}>
                <h4>{stage.title}</h4>
                <p>{stage.desc}</p>
              </li>
            ))}
          </ul>
        </div>

        {/* Desktop arc flow */}
        <div className="mt-24 hidden lg:block">
          <div className="relative h-32">
            <div className="absolute left-0 right-0 top-16 h-[2px] rounded-full bg-white/10" aria-hidden="true" />
            <motion.div
              className="absolute left-0 top-16 h-[2px] rounded-full bg-gradient-to-r from-[color:var(--color-carrot)] via-[color:var(--color-sky)] to-[color:var(--color-carrot)]"
              initial={false}
              animate={{ width: `${((active + 1) / total) * 100}%` }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              style={{ boxShadow: "0 0 18px 3px rgba(90,200,242,0.65)" }}
            />
            <div className="absolute inset-x-0 top-16 grid grid-cols-9">
              {VALUE_CHAIN.map((item, i) => {
                const isActive = active === i;
                return (
                  <button
                    key={item.title}
                    type="button"
                    onClick={() => setActive(i)}
                    onMouseEnter={() => setActive(i)}
                    aria-pressed={isActive}
                    aria-label={`${item.title} stage`}
                    style={{ transform: `translateY(${arcOffset(i, total)}px)` }}
                    className="group relative -translate-y-1/2 justify-self-center focus-visible:outline-none"
                  >
                    <span
                      className={cn(
                        "relative z-10 flex h-16 w-16 items-center justify-center rounded-2xl border-2 transition-all duration-300",
                        isActive
                          ? "border-[color:var(--color-carrot)] bg-gradient-to-br from-[color:var(--color-carrot)] to-[color:var(--color-carrot-light)] text-white scale-110 shadow-[0_0_30px_6px_rgba(247,148,29,0.55)]"
                          : "border-white/15 bg-[color:var(--color-navy)] text-white/55 group-hover:border-white/40 group-hover:text-white/80"
                      )}
                    >
                      <Icon name={item.icon} size={26} aria-hidden="true" />
                      <span className="absolute -top-2 -right-2 flex h-5 w-5 items-center justify-center rounded-full bg-white/10 text-[9px] font-bold text-white/60">
                        {i + 1}
                      </span>
                    </span>
                  </button>
                );
              })}
            </div>
            <div className="absolute inset-x-0 top-16 grid grid-cols-9">
              {VALUE_CHAIN.map((item, i) => (
                <span
                  key={item.title}
                  style={{ transform: `translateY(${arcOffset(i, total) + 46}px)` }}
                  className={cn(
                    "justify-self-center px-1 text-center text-[11px] font-semibold leading-tight transition-colors",
                    active === i ? "text-white" : "text-white/45"
                  )}
                >
                  {item.title}
                </span>
              ))}
            </div>
          </div>

          <div className="mx-auto mt-16 flex max-w-3xl items-center gap-4">
            <button
              type="button"
              onClick={() => setActive((a) => (a - 1 + total) % total)}
              aria-label="Previous stage"
              className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-white/15 text-white/60 transition-colors hover:border-[color:var(--color-carrot)] hover:text-[color:var(--color-carrot)] focus-visible:outline-none"
            >
              <ChevronLeft size={20} aria-hidden="true" />
            </button>

            <AnimatePresence mode="wait">
              <motion.div
                key={activeItem.title}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.35 }}
                className="gradient-border flex flex-1 items-center gap-6 rounded-3xl bg-[color:var(--color-navy)] p-7 text-left shadow-[0_20px_60px_-20px_rgba(0,0,0,0.6)]"
              >
                <span className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-[color:var(--color-carrot)]/25 to-[color:var(--color-sky)]/15 text-[color:var(--color-carrot)]">
                  <Icon name={activeItem.icon} size={30} aria-hidden="true" />
                </span>
                <div>
                  <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-[color:var(--color-sky)]">
                    Stage {active + 1} of {total}
                  </p>
                  <h3 className="mt-1 text-xl font-bold text-white">{activeItem.title}</h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-white/65">{activeItem.desc}</p>
                </div>
              </motion.div>
            </AnimatePresence>

            <button
              type="button"
              onClick={() => setActive((a) => (a + 1) % total)}
              aria-label="Next stage"
              className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-white/15 text-white/60 transition-colors hover:border-[color:var(--color-carrot)] hover:text-[color:var(--color-carrot)] focus-visible:outline-none"
            >
              <ChevronRight size={20} aria-hidden="true" />
            </button>
          </div>
        </div>

        {/* Mobile / tablet vertical timeline */}
        <div className="mt-14 space-y-1 lg:hidden">
          {VALUE_CHAIN.map((item, i) => {
            const isActive = active === i;
            return (
              <div key={item.title} className="relative flex gap-4 pb-7 last:pb-0">
                <div className="flex flex-col items-center">
                  <button
                    type="button"
                    onClick={() => setActive(isActive ? -1 : i)}
                    aria-expanded={isActive}
                    className={cn(
                      "flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border-2 transition-all duration-300",
                      isActive
                        ? "border-[color:var(--color-carrot)] bg-gradient-to-br from-[color:var(--color-carrot)] to-[color:var(--color-carrot-light)] text-white shadow-[0_0_20px_4px_rgba(247,148,29,0.45)]"
                        : "border-white/15 text-white/60"
                    )}
                  >
                    <Icon name={item.icon} size={20} aria-hidden="true" />
                  </button>
                  {i < total - 1 && (
                    <span
                      className={cn(
                        "mt-1 w-0.5 flex-1 rounded-full transition-colors",
                        isActive ? "bg-[color:var(--color-carrot)]" : "bg-white/10"
                      )}
                    />
                  )}
                </div>
                <button type="button" onClick={() => setActive(isActive ? -1 : i)} className="flex-1 pt-2 text-left">
                  <p className={cn("text-base font-bold", isActive ? "text-white" : "text-white/75")}>
                    {item.title}
                  </p>
                  <AnimatePresence>
                    {isActive && (
                      <motion.p
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.25 }}
                        className="mt-1.5 text-sm leading-relaxed text-white/60"
                      >
                        {item.desc}
                      </motion.p>
                    )}
                  </AnimatePresence>
                </button>
              </div>
            );
          })}
        </div>
      </Container>
    </section>
  );
}