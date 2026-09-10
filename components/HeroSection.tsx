"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import {
  CalendarDays,
  MapPin,
  Building2,
  Layers,
  ChevronDown,
  Radio,
  Zap,
} from "lucide-react";
import { EVENT } from "@/data/siteData";
import { Button } from "@/components/ui/Button";
import { SolarGridBackground } from "@/components/SolarGridBackground";
import { ParticleField } from "@/components/ParticleField";
import { EnergyPulseLine } from "@/components/EnergyPulseLine";

const FACTS = [
  { icon: CalendarDays, label: "Show Dates", value: EVENT.dates.display },
  { icon: MapPin, label: "Exhibition Venue", value: "Auto Cluster, Pune" },
  { icon: Building2, label: "Organised By", value: EVENT.organizer.name },
  { icon: Layers, label: "Co-located Shows", value: "Battery + EV" },
];

const READOUTS = [
  { color: "var(--color-gold)", label: "3-Day B2B Expo" },
  { color: "var(--color-gold-light)", label: "Solar + Storage + EV Ecosystem" },
  { color: "var(--color-gold)", label: "Exhibitions + Workshops" },
  { color: "var(--color-gold-light)", label: "B2B Matchmaking" },
  { color: "var(--color-gold)", label: "Policy & Investment Dialogue" },
];

export function HeroSection() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const contentY = useTransform(scrollYProgress, [0, 1], ["0%", "12%"]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  return (
    <section
      id="home"
      ref={ref}
      className="relative flex min-h-[100svh] items-center overflow-hidden bg-[color:var(--color-black)] pt-32 pb-20 sm:pt-40"
    >
      <motion.div
        style={{ y: bgY }}
        className="absolute inset-0"
        aria-hidden="true"
      >
        <div className="absolute inset-0 bg-gradient-to-b from-[color:var(--color-black-light)] via-[color:var(--color-black)] to-[color:var(--color-black)]" />
        <div className="absolute -top-48 right-[-14%] h-[620px] w-[620px] rounded-full radial-glow-gold animate-flare-pulse" />
        <div className="absolute bottom-[-25%] left-[-12%] h-[560px] w-[560px] rounded-full radial-glow-gold opacity-50" />
        <SolarGridBackground className="absolute inset-x-0 bottom-0 h-[75%] w-full opacity-70" />
        <ParticleField className="absolute inset-0" />
        <div className="absolute inset-0 bg-dot-grid-dark opacity-[0.15] mix-blend-screen" />
      </motion.div>

      <motion.div
        style={{ y: contentY, opacity: contentOpacity }}
        className="relative z-10 w-full"
      >
        <div className="mx-auto grid max-w-7xl grid-cols-1 gap-14 px-5 sm:px-8 lg:grid-cols-[1.12fr_0.88fr] lg:gap-10 lg:px-10">
          <div>
            <motion.span
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.15 }}
              className="inline-flex items-center gap-2.5 rounded-full border border-white/20 bg-white/[0.07] px-5 py-2 text-xs sm:text-sm font-bold tracking-[0.18em] text-[color:var(--color-gold)] uppercase shadow-[0_0_30px_-8px_rgba(247,148,29,0.5)]"
            >
              <span className="h-1.5 w-1.5 rounded-full bg-[color:var(--color-gold)] animate-pulse-soft" />
              02&ndash;04 October 2026 &middot; Pune, India
            </motion.span>

            <motion.h1
              initial={{ opacity: 0, y: 28 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.75,
                delay: 0.25,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="mt-6 text-[2.6rem] leading-[1.02] font-extrabold tracking-tight text-white sm:text-6xl md:text-7xl"
            >
              India <span className="text-gradient-solar">Solar</span>{" "}
              International
              <br className="hidden sm:block" /> Show{" "}
              <span className="text-[color:var(--color-gold-light)]">2026</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="mt-5 text-xl font-extrabold tracking-[0.08em] text-[color:var(--color-gold)] uppercase sm:text-2xl"
            >
              {EVENT.tagline}
            </motion.p>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="mt-5 max-w-xl text-base leading-relaxed text-white/70 sm:text-lg"
            >
              {EVENT.positioning}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="mt-9 flex flex-col gap-3 sm:flex-row sm:flex-wrap"
            >
              <Button
                href="https://app.warpbay.com/E2yy0Klq"
                size="lg"
                glow
                className="btn-shine"
              >
                Book Your Stall
              </Button>
              <Button
                href="https://app.warpbay.com/qPMIy6ii"
                variant="secondary"
                size="lg"
              >
                Register as Visitor
              </Button>
              <Button href="/downloads" variant="outline" size="lg">
                Download Brochure
              </Button>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.72 }}
              className="mt-12 grid grid-cols-2 gap-3 sm:grid-cols-4 sm:gap-4"
            >
              {FACTS.map(({ icon: Icon, label, value }) => (
                <div
                  key={label}
                  className="glass rounded-2xl border-white/10 p-4 transition-colors duration-300 hover:border-[color:var(--color-gold)]/40"
                >
                  <Icon
                    size={18}
                    className="text-[color:var(--color-gold)]"
                    aria-hidden="true"
                  />
                  <p className="mt-2.5 text-sm sm:text-base font-bold leading-tight text-white">
                    {value}
                  </p>
                  <p className="mt-0.5 text-[11px] font-semibold uppercase tracking-[0.12em] text-white/45">
                    {label}
                  </p>
                </div>
              ))}
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.94 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="relative hidden lg:block"
          >
            <motion.span
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
              className="glass absolute -top-6 -left-6 z-20 flex items-center gap-1.5 rounded-2xl px-4 py-2.5 text-xs font-bold text-white shadow-xl"
            >
              <MapPin
                size={13}
                className="text-[color:var(--color-gold)]"
                aria-hidden="true"
              />
              Pune &middot; 2026
            </motion.span>
            <motion.span
              animate={{ y: [0, 10, 0] }}
              transition={{
                duration: 6,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 0.5,
              }}
              className="glass absolute -bottom-5 -right-5 z-20 flex items-center gap-1.5 rounded-2xl px-4 py-2.5 text-xs font-bold text-[color:var(--color-gold)] shadow-xl"
            >
              <Zap size={13} aria-hidden="true" />
              Solar &middot; Storage &middot; EV
            </motion.span>

            <div className="relative min-h-[600px] md:min-h-[700px] lg:min-h-[800px] overflow-hidden rounded-3xl border border-white/10">
              <div
                className="absolute inset-0 -z-10 bg-cover bg-center scale-105"
                style={{
                  backgroundImage:
                    "url('https://iievshow.com/wp-content/uploads/2024/04/ev-expo-12-min-scaled.jpg')",
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/20 to-black/80" />
              <div className="absolute inset-0 bg-solar-grid opacity-0.2" />
              <div className="absolute -top-16 -right-16 h-72 w-72 rounded-full radial-glow-gold animate-flare-pulse" />

              <div className="relative flex h-full flex-col justify-center p-6">
                <div className="flex items-center justify-between">
                  <p className="text-xs font-bold uppercase tracking-[0.22em] text-[color:var(--color-gold)]">
                    Energy Command Panel
                  </p>
                  <span className="flex items-center gap-1.5 rounded-full bg-white/10 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide text-emerald-400">
                    <Radio
                      size={11}
                      className="animate-pulse-soft"
                      aria-hidden="true"
                    />
                    Live
                  </span>
                </div>

                <div className="mt-6">
                  <EnergyPulseLine className="h-24 w-full" />
                  <p className="mt-2 text-center text-[11px] font-semibold uppercase tracking-[0.15em] text-white/60">
                    Generation &rarr; Storage &rarr; Grid &rarr; Mobility
                  </p>
                </div>

                <div className="mt-8 ml-2 flex-1 w-80 space-y-3">
                  {READOUTS.map((item, i) => (
                    <motion.div
                      key={item.label}
                      initial={{ opacity: 0, x: 12 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.4, delay: 0.15 + i * 0.08 }}
                      className="group flex items-center gap-3 rounded-xl border border-white/15 bg-black/55 backdrop-blur-md px-4 py-3 shadow-lg"
                    >
                      <span
                        className="h-2.5 w-2.5 rounded-full transition-transform duration-300 group-hover:scale-125"
                        style={{
                          background: item.color,
                          boxShadow: `0 0 14px 2px ${item.color}`,
                        }}
                      />
                      <span className="text-sm font-semibold text-white">
                        {item.label}
                      </span>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </motion.div>

      <motion.a
        href="#snapshot"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.1, duration: 0.6 }}
        className="absolute bottom-6 left-1/2 z-10 -translate-x-1/2 text-white/60 hover:text-white transition-colors"
        aria-label="Scroll to next section"
      >
        <motion.span
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
          className="flex flex-col items-center gap-1"
        >
          <span className="text-[10px] font-semibold tracking-[0.25em] uppercase">
            Scroll
          </span>
          <ChevronDown size={18} aria-hidden="true" />
        </motion.span>
      </motion.a>
    </section>
  );
}
