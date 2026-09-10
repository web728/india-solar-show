"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";

export function Preloader() {
  const [visible, setVisible] = useState(true);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    document.body.style.overflow = "hidden";
    const t = setTimeout(() => setVisible(false), reduceMotion ? 200 : 1500);
    return () => clearTimeout(t);
  }, [reduceMotion]);

  useEffect(() => {
    if (!visible) document.body.style.overflow = "";
  }, [visible]);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          role="status"
          aria-live="polite"
          aria-label="Loading India Solar International Show"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6, ease: "easeInOut" }}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-[color:var(--color-black)] overflow-hidden"
        >
          <div className="absolute inset-0 bg-solar-grid opacity-40" aria-hidden="true" />

          <div
            className="absolute left-1/2 top-1/2 h-[420px] w-[420px] -translate-x-1/2 -translate-y-1/2 rounded-full radial-glow-gold animate-flare-pulse"
            aria-hidden="true"
          />

          <svg
            className="absolute inset-0 h-full w-full"
            viewBox="0 0 800 400"
            preserveAspectRatio="xMidYMid slice"
            aria-hidden="true"
          >
            <g fill="none" stroke="url(#preloaderGrad)" strokeWidth="1">
              {[80, 160, 240, 320].map((y) => (
                <line
                  key={y}
                  x1="0"
                  y1={y}
                  x2="800"
                  y2={y}
                  strokeDasharray="900"
                  className="animate-grid-draw"
                  style={{ animationDelay: `${y * 0.6}ms` }}
                />
              ))}
            </g>
            <defs>
              <linearGradient id="preloaderGrad" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0%" stopColor="#F7941D" stopOpacity="0" />
                <stop offset="50%" stopColor="#FFB454" stopOpacity="0.6" />
                <stop offset="100%" stopColor="#F7941D" stopOpacity="0" />
              </linearGradient>
            </defs>
          </svg>

          <div className="relative z-10 flex flex-col items-center px-6 text-center">
            <motion.p
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.25, duration: 0.5 }}
              className="text-lg sm:text-2xl md:text-3xl font-extrabold tracking-tight text-white"
            >
              INDIA <span className="text-gradient-solar">SOLAR</span> INTERNATIONAL SHOW{" "}
              <span className="text-[color:var(--color-gold-light)]">2026</span>
            </motion.p>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.5 }}
              className="mt-2 text-xs sm:text-sm font-semibold tracking-[0.3em] text-[color:var(--color-gold)]"
            >
              CONNECTING SOLAR INDUSTRY
            </motion.p>

            <div className="mt-8 h-[2px] w-48 overflow-hidden rounded-full bg-white/10">
              <div className="h-full w-1/2 bg-gradient-to-r from-transparent via-[color:var(--color-gold)] to-transparent animate-loading-bar" />
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
