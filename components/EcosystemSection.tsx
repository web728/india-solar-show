"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Plus, Equal } from "lucide-react";
import { CO_LOCATED } from "@/data/siteData";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Button } from "@/components/ui/Button";

const PLATFORMS = [
  {
    name: "India Solar International Show",
    edition: "",
    logo: "/logos/india-solar-logo.png",
    blurb: "India's premier B2B solar exhibition in Pune focusing on solar PV manufacturing, rooftop solar systems, utility-scale projects, and hybrid renewable energy solutions.",
    role: "Solar Generation",
    highlight: true,
  },
  ...CO_LOCATED.map((p, i) => ({
    ...p,
    role: i === 0 ? "Battery Storage" : "E-Mobility",
    highlight: false,
  })),
];

export function EcosystemSection() {
  return (
    <section className="relative overflow-hidden bg-[color:var(--color-twilight)] py-24 sm:py-32">
      <div className="absolute inset-0 bg-solar-grid opacity-[0.1]" aria-hidden="true" />
      <div className="absolute -bottom-40 left-1/2 h-[560px] w-[760px] -translate-x-1/2 rounded-full radial-glow-carrot opacity-60" aria-hidden="true" />
      <div className="beam-diagonal -top-10 left-1/4" aria-hidden="true" />

      <Container className="relative">
        <SectionHeading
          eyebrow="Co-located Clean Energy Ecosystem 2026"
          heading="Integrated Solar International Show & E-Mobility Trade Show in India"
          intro="Explore two co-located clean energy trade platforms in Pune bringing together solar PV manufacturers, battery energy storage systems (BESS) suppliers, and electric mobility leaders under one roof."
          align="center"
          tone="light"
        />

        <div className="relative mt-20">
          {/* Connecting energy rail (desktop only, decorative) */}
          <div className="pointer-events-none absolute inset-x-8 -top-8 hidden h-px lg:block" aria-hidden="true">
            <div className="h-px w-full bg-gradient-to-r from-transparent via-white/25 to-transparent" />
            {[16.6, 50, 83.3].map((pos) => (
              <span
                key={pos}
                className="absolute top-1/2 h-2.5 w-2.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[color:var(--color-carrot)] shadow-[0_0_14px_3px_rgba(247,148,29,0.7)]"
                style={{ left: `${pos}%` }}
              />
            ))}
          </div>

          <div className="grid grid-cols-1 gap-7 lg:grid-cols-3">
            {PLATFORMS.map((p, i) => (
              <motion.div
                key={p.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.55, delay: i * 0.12, ease: [0.16, 1, 0.3, 1] }}
                className={`glass relative rounded-3xl p-7 sm:p-8 border border-white/10 transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_0_60px_-15px_rgba(247,148,29,0.45)] ${
                  p.highlight
                    ? "border-[color:var(--color-carrot)]/40 shadow-[0_0_60px_-15px_rgba(247,148,29,0.55)]"
                    : ""
                }`}
              >
                {p.edition && (
                  <span className="absolute -top-3 left-7 rounded-full bg-[color:var(--color-carrot)] px-3 py-1 text-[11px] font-bold uppercase tracking-wide text-white">
                    {p.edition}
                  </span>
                )}
                <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-[color:var(--color-sky)]">
                  {String(i + 1).padStart(2, "0")} &middot; {p.role}
                </span>
                <div className="mt-4 flex h-28 items-center justify-center rounded-2xl bg-white p-1">
                  <Image
                    src={p.logo}
                    alt={`${p.name} Logo - ${p.role} Exhibition in Pune`}
                    width={220}
                    height={80}
                    className="max-h-16 w-auto object-contain"
                  />
                </div>
                <h3 className="mt-4 text-xl font-bold text-white">{p.name}</h3>
                <p className="mt-2 text-sm leading-relaxed text-white/75">{p.blurb}</p>
              </motion.div>
            ))}
          </div>
        </div>

        <div className="gradient-border mx-auto mt-20 flex max-w-4xl flex-wrap items-center justify-center gap-4 rounded-3xl bg-[color:var(--color-navy)]/60 px-6 py-8 text-center sm:gap-5">
          {["Solar Energy Generation", "Battery Energy Storage (BESS)", "EV & Clean Mobility"].map((label, i) => (
            <div key={label} className="flex items-center gap-4 sm:gap-5">
              <span className="rounded-2xl bg-white/8 px-5 py-3.5 text-sm font-bold text-white sm:text-base">
                {label}
              </span>
              {i < 2 ? (
                <Plus className="text-[color:var(--color-carrot)]" size={22} aria-hidden="true" />
              ) : (
                <Equal className="text-[color:var(--color-carrot)]" size={22} aria-hidden="true" />
              )}
            </div>
          ))}
          <span className="rounded-2xl bg-[color:var(--color-carrot)] px-6 py-3.5 text-sm font-extrabold text-white shadow-[0_0_36px_-6px_rgba(247,148,29,0.8)] sm:text-base">
            Integrated Clean Energy Ecosystem 2026
          </span>
        </div>

        <div className="mt-14 flex justify-center">
          <Button href="/about" variant="outline" size="lg">
            Explore the Co-located Solar &amp; Storage Ecosystem
          </Button>
        </div>
      </Container>
    </section>
  );
}