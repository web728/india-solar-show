"use client";

import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { motion } from "framer-motion";

import { Container } from "@/components/ui/Container";

interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface MetaItem {
  label: string;
  value: string;
}

interface PageHeroProps {
  eyebrow: string;
  title: string;
  subtitle?: string;
  breadcrumbs?: BreadcrumbItem[];
  meta?: MetaItem[];
}

const EASE = [0.22, 1, 0.36, 1] as const;

const groupVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.075,
      delayChildren: 0.08,
    },
  },
};

const revealVariants = {
  hidden: {
    opacity: 0,
    y: 18,
    filter: "blur(8px)",
  },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: {
      duration: 0.72,
      ease: EASE,
    },
  },
};

const wordVariants = {
  hidden: {
    opacity: 0,
    y: 34,
    rotateX: 14,
    filter: "blur(10px)",
  },
  visible: {
    opacity: 1,
    y: 0,
    rotateX: 0,
    filter: "blur(0px)",
    transition: {
      duration: 0.78,
      ease: EASE,
    },
  },
};

const PARTICLES = [
  { left: "8%", top: "26%", delay: 0.1, duration: 4.8 },
  { left: "21%", top: "72%", delay: 1.1, duration: 5.2 },
  { left: "39%", top: "22%", delay: 0.55, duration: 4.6 },
  { left: "58%", top: "70%", delay: 1.6, duration: 5.6 },
  { left: "77%", top: "28%", delay: 0.9, duration: 4.9 },
  { left: "91%", top: "63%", delay: 1.9, duration: 5.4 },
] as const;

function PageHeroBackground() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 overflow-hidden"
    >
      {/* ambient light */}
      <motion.div
        className="absolute -left-[14%] top-[-16%] size-[32rem] rounded-full bg-blue/[0.14] blur-[150px]"
        animate={{
          x: [0, 42, 16, 0],
          y: [0, 12, -10, 0],
          scale: [1, 1.08, 1.03, 1],
        }}
        transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
      />

      <motion.div
        className="absolute right-[-8%] top-[-45%] size-[36rem] rounded-full bg-solar/[0.085] blur-[165px]"
        animate={{
          x: [0, -32, 0],
          y: [0, 24, 0],
          scale: [1, 1.1, 1],
        }}
        transition={{ duration: 13, repeat: Infinity, ease: "easeInOut" }}
      />

      <motion.div
        className="absolute bottom-[-80%] left-[35%] size-[34rem] rounded-full bg-blue/[0.06] blur-[170px]"
        animate={{ x: [0, 30, 0], scale: [1, 1.08, 1] }}
        transition={{ duration: 16, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* premium technical grid */}
      <motion.div
        className="absolute inset-0 opacity-[0.028]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,.24) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.24) 1px, transparent 1px)",
          backgroundSize: "72px 72px",
          maskImage:
            "linear-gradient(to bottom, transparent 0%, black 14%, black 82%, transparent 100%)",
          WebkitMaskImage:
            "linear-gradient(to bottom, transparent 0%, black 14%, black 82%, transparent 100%)",
        }}
        animate={{ backgroundPosition: ["0px 0px", "72px 72px"] }}
        transition={{ duration: 22, repeat: Infinity, ease: "linear" }}
      />

      {/* animated energy network */}
      <svg
        viewBox="0 0 1600 520"
        preserveAspectRatio="none"
        fill="none"
        className="absolute inset-0 h-full w-full"
      >
        <defs>
          <linearGradient id="heroFlowA" x1="0" y1="0" x2="1600" y2="0">
            <stop offset="0%" stopColor="#FBB216" stopOpacity="0" />
            <stop offset="28%" stopColor="#FBB216" stopOpacity="0.18" />
            <stop offset="52%" stopColor="#FFFDF8" stopOpacity="0.28" />
            <stop offset="72%" stopColor="#2D5A8C" stopOpacity="0.2" />
            <stop offset="100%" stopColor="#2D5A8C" stopOpacity="0" />
          </linearGradient>

          <linearGradient id="heroFlowB" x1="1600" y1="0" x2="0" y2="0">
            <stop offset="0%" stopColor="#2D5A8C" stopOpacity="0" />
            <stop offset="30%" stopColor="#2D5A8C" stopOpacity="0.18" />
            <stop offset="55%" stopColor="#FBB216" stopOpacity="0.24" />
            <stop offset="100%" stopColor="#FBB216" stopOpacity="0" />
          </linearGradient>

          <radialGradient id="heroNodeGlow">
            <stop offset="0%" stopColor="#FBB216" stopOpacity="0.9" />
            <stop offset="100%" stopColor="#FBB216" stopOpacity="0" />
          </radialGradient>
        </defs>

        {/* base contour lines */}
        <path
          d="M-120 126C160 76 360 186 610 146S1045 84 1282 132S1510 176 1720 116"
          stroke="rgba(255,255,255,0.045)"
        />
        <path
          d="M-120 266C190 205 405 338 690 276S1110 190 1392 246S1570 300 1710 268"
          stroke="rgba(255,255,255,0.052)"
        />
        <path
          d="M-100 405C195 342 440 460 728 400S1145 310 1420 366S1590 420 1720 394"
          stroke="rgba(255,255,255,0.038)"
        />

        {/* flowing strokes */}
        <motion.path
          d="M-120 126C160 76 360 186 610 146S1045 84 1282 132S1510 176 1720 116"
          stroke="url(#heroFlowA)"
          strokeWidth="1.25"
          strokeLinecap="round"
          strokeDasharray="4 26"
          animate={{ strokeDashoffset: [0, -330] }}
          transition={{ duration: 9.5, repeat: Infinity, ease: "linear" }}
        />

        <motion.path
          d="M-120 266C190 205 405 338 690 276S1110 190 1392 246S1570 300 1710 268"
          stroke="url(#heroFlowB)"
          strokeWidth="1.35"
          strokeLinecap="round"
          strokeDasharray="5 24"
          animate={{ strokeDashoffset: [0, 300] }}
          transition={{ duration: 8.2, repeat: Infinity, ease: "linear" }}
        />

        <motion.path
          d="M-100 405C195 342 440 460 728 400S1145 310 1420 366S1590 420 1720 394"
          stroke="rgba(251,178,22,0.13)"
          strokeWidth="1.1"
          strokeLinecap="round"
          strokeDasharray="3 30"
          animate={{ strokeDashoffset: [0, -290] }}
          transition={{ duration: 12.5, repeat: Infinity, ease: "linear" }}
        />

        {/* travelling light ribbon */}
        <motion.path
          d="M-120 316C230 244 465 352 748 300S1180 210 1720 276"
          stroke="url(#heroFlowA)"
          strokeWidth="1.8"
          strokeDasharray="110 1600"
          strokeLinecap="round"
          animate={{ strokeDashoffset: [280, -1580] }}
          transition={{
            duration: 6,
            repeat: Infinity,
            repeatDelay: 0.9,
            ease: [0.4, 0, 0.2, 1],
          }}
        />

        {/* orbital system */}
        <motion.g
          style={{ transformOrigin: "1325px 165px" }}
          animate={{ rotate: 360 }}
          transition={{ duration: 34, repeat: Infinity, ease: "linear" }}
        >
          <circle cx="1325" cy="165" r="54" stroke="rgba(255,255,255,.07)" />
          <circle
            cx="1325"
            cy="165"
            r="88"
            stroke="rgba(251,178,22,.12)"
            strokeDasharray="3 10"
          />
          <circle cx="1379" cy="165" r="3" fill="#FBB216" fillOpacity="0.8" />
          <circle cx="1325" cy="77" r="2.5" fill="#FFFDF8" fillOpacity="0.55" />
        </motion.g>

        <motion.circle
          cx="1325"
          cy="165"
          r="18"
          fill="url(#heroNodeGlow)"
          animate={{ r: [16, 24, 16], opacity: [0.42, 0.8, 0.42] }}
          transition={{ duration: 3.2, repeat: Infinity, ease: "easeInOut" }}
        />
      </svg>

      {/* animated contour field */}
      <motion.svg
        viewBox="0 0 1600 520"
        preserveAspectRatio="none"
        fill="none"
        className="absolute inset-0 h-full w-full opacity-[0.42]"
        animate={{ x: [0, -18, 0], y: [0, 6, 0] }}
        transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
      >
        <motion.path
          d="M-80 92C210 18 410 128 650 88S1080 40 1320 88S1530 126 1690 78"
          stroke="rgba(251,178,22,.11)"
          strokeWidth="1"
          strokeDasharray="2 18"
          animate={{ strokeDashoffset: [0, -220] }}
          transition={{ duration: 11, repeat: Infinity, ease: "linear" }}
        />
        <motion.path
          d="M-120 448C170 382 420 492 720 434S1160 346 1430 402S1590 448 1710 424"
          stroke="rgba(255,255,255,.075)"
          strokeWidth="1"
          strokeDasharray="2 22"
          animate={{ strokeDashoffset: [0, 240] }}
          transition={{ duration: 13, repeat: Infinity, ease: "linear" }}
        />
      </motion.svg>

      {/* secondary orbit - gives constant visible motion */}
      <motion.div
        className="absolute right-[7%] top-[18%] hidden size-[190px] rounded-full border border-paper/[0.055] lg:block"
        animate={{ rotate: [0, 360] }}
        transition={{ duration: 28, repeat: Infinity, ease: "linear" }}
      >
        <div className="absolute left-1/2 top-[-4px] size-2 -translate-x-1/2 rounded-full bg-solar shadow-[0_0_18px_rgba(251,178,22,.65)]" />
        <div className="absolute bottom-[17%] left-[4%] size-1.5 rounded-full bg-paper/50" />
        <div className="absolute right-[8%] top-[22%] size-1 rounded-full bg-blue" />
      </motion.div>

      <motion.div
        className="absolute right-[calc(7%+30px)] top-[calc(18%+30px)] hidden size-[130px] rounded-full border border-solar/[0.08] lg:block"
        animate={{ rotate: [360, 0] }}
        transition={{ duration: 19, repeat: Infinity, ease: "linear" }}
      >
        <div className="absolute right-[-3px] top-1/2 size-1.5 -translate-y-1/2 rounded-full bg-solar/80" />
      </motion.div>

      {/* vertical scanner */}
      <motion.div
        className="absolute inset-y-0 w-px bg-gradient-to-b from-transparent via-solar/20 to-transparent blur-[0.5px]"
        initial={{ left: "10%", opacity: 0 }}
        animate={{ left: ["10%", "90%"], opacity: [0, 0.55, 0] }}
        transition={{ duration: 8.5, repeat: Infinity, repeatDelay: 2.2, ease: "easeInOut" }}
      />

      {/* moving horizontal light rail */}
      <div className="absolute left-[4%] right-[4%] top-[57%] h-px overflow-hidden bg-paper/[0.025]">
        <motion.span
          className="absolute inset-y-0 w-[280px] bg-gradient-to-r from-transparent via-solar/45 to-transparent blur-[1px]"
          initial={{ x: "-280px" }}
          animate={{ x: "calc(100vw + 280px)" }}
          transition={{
            duration: 6.5,
            repeat: Infinity,
            repeatDelay: 1.2,
            ease: [0.4, 0, 0.2, 1],
          }}
        />
      </div>

      {/* diagonal glass sweep */}
      <motion.div
        className="absolute -top-[75%] left-[-26%] h-[260%] w-[14%] rotate-[14deg] bg-gradient-to-r from-transparent via-paper/[0.035] to-transparent blur-xl"
        animate={{ x: ["-22vw", "165vw"] }}
        transition={{
          duration: 12.5,
          repeat: Infinity,
          repeatDelay: 4.5,
          ease: "easeInOut",
        }}
      />

      {/* micro particles */}
      {PARTICLES.map((particle, index) => (
        <motion.span
          key={`${particle.left}-${particle.top}`}
          className="absolute size-[3px] rounded-full bg-paper/30"
          style={{ left: particle.left, top: particle.top }}
          animate={{
            opacity: [0.08, 0.6, 0.08],
            y: [0, -9, 0],
            scale: [0.8, 1.25, 0.8],
          }}
          transition={{
            duration: particle.duration,
            delay: particle.delay,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}

      {/* depth + readability */}
      <div className="absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-ink/30 to-transparent" />
      <div className="absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-ink/45 to-transparent" />
      <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(6,21,27,0.70)_0%,rgba(6,21,27,0.34)_48%,rgba(6,21,27,0.08)_100%)]" />
    </div>
  );
}

export function PageHero({
  eyebrow,
  title,
  subtitle,
  breadcrumbs,
  meta,
}: PageHeroProps) {
  const titleWords = title.split(" ");

  return (
    <section
      className="relative isolate overflow-hidden border-b border-paper/[0.07] bg-ink text-paper pt-[104px] pb-8 sm:pt-[110px] sm:pb-9 lg:min-h-[390px] lg:pt-[114px] lg:pb-10 [background-image:radial-gradient(circle_at_78%_28%,rgba(251,178,22,.045),transparent_28%),radial-gradient(circle_at_18%_72%,rgba(45,90,140,.08),transparent_32%)]"
    >
      <PageHeroBackground />

      <Container className="relative">
        <motion.div
          aria-hidden="true"
          className="absolute left-[46%] top-[-28px] hidden h-24 w-40 rounded-full bg-solar/[0.035] blur-3xl lg:block"
          animate={{ opacity: [0.2, 0.65, 0.2], scale: [0.96, 1.08, 0.96] }}
          transition={{ duration: 5.5, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          variants={groupVariants}
          initial="hidden"
          animate="visible"
          className="relative z-10 max-w-[900px]"
        >
          {breadcrumbs?.length ? (
            <motion.nav
              variants={revealVariants}
              aria-label="Breadcrumb"
              className="mb-4 flex flex-wrap items-center gap-1.5 font-mono text-[8px] font-medium uppercase tracking-[0.08em] text-paper/30"
            >
              {breadcrumbs.map((item, index) => (
                <div
                  key={`${item.label}-${index}`}
                  className="flex items-center gap-1.5"
                >
                  {item.href ? (
                    <Link
                      href={item.href}
                      className="transition-colors duration-300 hover:text-solar"
                    >
                      {item.label}
                    </Link>
                  ) : (
                    <span className="text-paper/48">{item.label}</span>
                  )}

                  {index < breadcrumbs.length - 1 ? (
                    <ChevronRight
                      aria-hidden="true"
                      className="size-3 text-paper/15"
                      strokeWidth={1.6}
                    />
                  ) : null}
                </div>
              ))}
            </motion.nav>
          ) : null}

          <motion.div
            variants={revealVariants}
            className="flex items-center gap-3"
          >
            <span className="relative flex size-2">
              <motion.span
                className="absolute inset-0 rounded-full bg-solar"
                animate={{ scale: [1, 2.15, 1], opacity: [0.45, 0, 0.45] }}
                transition={{ duration: 2.4, repeat: Infinity, ease: "easeOut" }}
              />
              <span className="relative size-2 rounded-full bg-solar shadow-[0_0_18px_rgba(251,178,22,.55)]" />
            </span>

            <span className="font-mono text-[9px] font-semibold uppercase tracking-[0.18em] text-solar sm:text-[10px]">
              {eyebrow}
            </span>

            <motion.span
              initial={{ scaleX: 0, opacity: 0 }}
              animate={{ scaleX: 1, opacity: 1 }}
              transition={{ duration: 0.85, delay: 0.34, ease: EASE }}
              className="h-px w-11 origin-left bg-gradient-to-r from-solar/60 to-transparent"
            />
          </motion.div>

          <motion.h1
            className="mt-4 max-w-[860px] font-display text-[clamp(2.7rem,4.7vw,5.15rem)] font-semibold leading-[0.93] tracking-[-0.05em] text-paper [perspective:1000px]"
            variants={{
              hidden: {},
              visible: {
                transition: {
                  staggerChildren: 0.055,
                  delayChildren: 0.16,
                },
              },
            }}
            initial="hidden"
            animate="visible"
          >
            {titleWords.map((word, index) => (
              <motion.span
                key={`${word}-${index}`}
                variants={wordVariants}
                className="mr-[0.22em] inline-block origin-bottom"
              >
                {word}
              </motion.span>
            ))}
          </motion.h1>

          <motion.div
            initial={{ scaleX: 0, opacity: 0 }}
            animate={{ scaleX: 1, opacity: 1 }}
            transition={{ duration: 1, delay: 0.55, ease: EASE }}
            className="relative mt-4 h-[2px] w-20 origin-left overflow-hidden rounded-full bg-gradient-to-r from-solar via-solar/55 to-transparent"
          >
            <motion.span
              className="absolute inset-y-0 w-8 bg-gradient-to-r from-transparent via-paper/90 to-transparent"
              initial={{ x: -36 }}
              animate={{ x: 112 }}
              transition={{ duration: 1.8, delay: 1.1, repeat: Infinity, repeatDelay: 3.8, ease: "easeInOut" }}
            />
          </motion.div>

          {subtitle ? (
            <motion.p
              variants={revealVariants}
              className="mt-4 max-w-[680px] text-[14px] leading-[1.72] tracking-[-0.008em] text-paper/50 sm:text-[15px]"
            >
              {subtitle}
            </motion.p>
          ) : null}

          {meta?.length ? (
            <motion.div
              variants={revealVariants}
              className="mt-5 flex flex-wrap gap-x-6 gap-y-2 border-t border-paper/[0.07] pt-4"
            >
              {meta.map((item) => (
                <div key={`${item.label}-${item.value}`} className="flex items-center gap-2">
                  <span className="text-[9px] font-semibold uppercase tracking-[0.13em] text-paper/28">
                    {item.label}
                  </span>
                  <span className="text-[11px] font-medium text-paper/62">
                    {item.value}
                  </span>
                </div>
              ))}
            </motion.div>
          ) : null}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scaleX: 0 }}
          animate={{ opacity: 1, scaleX: 1 }}
          transition={{ duration: 1, delay: 0.2, ease: EASE }}
          aria-hidden="true"
          className="mt-7 h-px origin-left bg-gradient-to-r from-solar/65 via-paper/[0.08] to-transparent"
        />
      </Container>
    </section>
  );
}
