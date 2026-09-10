"use client";

import { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { EXHIBITOR_FILTERS, EXHIBITOR_SEGMENTS } from "@/data/siteData";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Icon } from "@/components/ui/Icon";
import { FilterChip } from "@/components/ui/FilterChip";
import { Button } from "@/components/ui/Button";

const ACCENTS = ["var(--color-carrot)", "var(--color-twilight)", "var(--color-sky)"];

export function ExhibitorProfile() {
  const [filter, setFilter] = useState<(typeof EXHIBITOR_FILTERS)[number]>("All");

  const filtered = useMemo(
    () =>
      filter === "All"
        ? EXHIBITOR_SEGMENTS
        : EXHIBITOR_SEGMENTS.filter((seg) => seg.categories.includes(filter as never)),
    [filter]
  );

  return (
    <section id="exhibitors" className="relative overflow-hidden bg-white py-24 sm:py-32">
      <div className="absolute inset-0 bg-solar-grid-light" aria-hidden="true" />
      <Container className="relative">
        <SectionHeading
          eyebrow="Exhibitor Profile &amp; Product Categories"
          heading="Who Exhibits at India Solar International Show 2026"
          intro="Explore 15 key segments across the solar PV, battery storage (BESS), and green energy supply chain — filter by category to find where your business fits."
        />

        {/* Filter Navigation */}
        <div
          className="mt-9 flex gap-2.5 overflow-x-auto pb-2 [scrollbar-width:thin]"
          role="group"
          aria-label="Filter exhibitor product segments"
        >
          {EXHIBITOR_FILTERS.map((f) => (
            <FilterChip key={f} label={f} active={filter === f} onClick={() => setFilter(f)} />
          ))}
        </div>

        {/* Hidden Semantic List for Search Engine Crawlers */}
        <div className="sr-only">
          <h3>Full List of Solar &amp; Renewable Energy Exhibitor Categories</h3>
          <ul>
            {EXHIBITOR_SEGMENTS.map((seg) => (
              <li key={seg.title}>
                <h4>{seg.title}</h4>
                <p>{seg.desc}</p>
              </li>
            ))}
          </ul>
        </div>

        {/* Interactive Segment Grid */}
        <motion.div layout className="mt-9 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          <AnimatePresence mode="popLayout">
            {filtered.map((seg, i) => {
              const accent = ACCENTS[i % ACCENTS.length];
              return (
                <motion.div
                  key={seg.title}
                  layout
                  initial={{ opacity: 0, scale: 0.94 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.94 }}
                  transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                  className="group relative overflow-hidden rounded-2xl border border-slate-200 bg-white p-6 pt-7 transition-all duration-300 hover:-translate-y-1 hover:border-transparent hover:shadow-[0_25px_60px_-20px_rgba(46,49,146,0.3)]"
                >
                  <span className="absolute inset-x-0 top-0 h-[3px]" style={{ background: accent }} aria-hidden="true" />
                  <span
                    className="flex h-12 w-12 items-center justify-center rounded-xl transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:scale-105"
                    style={{ background: `color-mix(in srgb, ${accent} 14%, white)`, color: accent }}
                  >
                    <Icon name={seg.icon} size={21} aria-hidden="true" />
                  </span>
                  <h3 className="mt-4 text-base font-bold text-[color:var(--color-navy)]">{seg.title}</h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-slate-500">{seg.desc}</p>

                  <a
                    href="https://app.warpbay.com/E2yy0Klq"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-4 inline-flex items-center gap-1 text-xs font-bold uppercase tracking-wide transition-opacity duration-300 group-hover:opacity-100 sm:opacity-0"
                    style={{ color: accent }}
                    aria-label={`Book exhibition stall in ${seg.title} segment`}
                  >
                    Exhibit in {seg.title}
                    <ArrowUpRight size={14} aria-hidden="true" />
                  </a>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </motion.div>

        {/* Call to Action */}
        <div className="mt-14 flex flex-col items-center justify-center text-center">
          <Button href="https://app.warpbay.com/E2yy0Klq" size="lg" glow className="btn-shine">
            Book Your Exhibition Space in Pune
          </Button>
          <p className="mt-3 text-xs font-medium text-slate-500">
            Join 200+ global exhibitors showcasing solar PV, energy storage, and clean energy solutions.
          </p>
        </div>
      </Container>
    </section>
  );
}