"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { EVENT } from "@/data/siteData";

function getRemaining() {
  const diff = new Date(EVENT.dates.start).getTime() - Date.now();
  const clamped = Math.max(diff, 0);
  return {
    days: Math.floor(clamped / (1000 * 60 * 60 * 24)),
    hours: Math.floor((clamped / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((clamped / (1000 * 60)) % 60),
    seconds: Math.floor((clamped / 1000) % 60),
    ended: diff <= 0,
  };
}

const UNITS: { key: "days" | "hours" | "minutes" | "seconds"; label: string }[] = [
  { key: "days", label: "Days" },
  { key: "hours", label: "Hours" },
  { key: "minutes", label: "Minutes" },
  { key: "seconds", label: "Seconds" },
];

export function CountdownTimer() {
  const [time, setTime] = useState<ReturnType<typeof getRemaining> | null>(null);

  useEffect(() => {
    setTime(getRemaining());
    const interval = setInterval(() => setTime(getRemaining()), 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div
      className=" grid grid-cols-4 gap-2.5 rounded-[28px] bg-[color:var(--color-navy)] p-3 shadow-[0_25px_60px_-20px_rgba(46,49,146,0.5)] sm:gap-4 sm:p-5"
      role="timer"
      aria-label={`Countdown to India Solar International Show 2026, starting ${EVENT.dates.displayLong}`}
    >
      {UNITS.map(({ key, label }, i) => (
        <div key={key} className="relative">
          <div className="relative flex flex-col items-center justify-center overflow-hidden rounded-2xl bg-white/[0.06] py-6 sm:py-9 border border-white/10">
            <div className="absolute inset-0 bg-solar-grid opacity-10" aria-hidden="true" />
            <div className="relative h-9 sm:h-14 overflow-hidden">
              {/* Keyed remount (no AnimatePresence/exit) — React swaps the node on
                  value change synchronously, so a throttled/background tab can
                  never leave stale exit-animation nodes stacked in the DOM. */}
              <motion.span
                key={time ? time[key] : "-"}
                initial={{ y: 16, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                className="block text-3xl sm:text-5xl font-extrabold tabular-nums text-white"
              >
                {time ? String(time[key]).padStart(2, "0") : "--"}
              </motion.span>
            </div>
            <span className="relative mt-1.5 text-[10px] sm:text-xs font-bold uppercase tracking-[0.2em] text-[color:var(--color-sky)]">
              {label}
            </span>
          </div>
          {i < UNITS.length - 1 && (
            <span
              className="absolute top-1/2 -right-[7px] sm:-right-[9px] hidden -translate-y-1/2 text-lg sm:text-2xl font-bold text-[color:var(--color-carrot)]/70 sm:block"
              aria-hidden="true"
            >
              :
            </span>
          )}
        </div>
      ))}
    </div>
  );
}
