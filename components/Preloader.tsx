"use client";

import { useEffect, useMemo, useState } from "react";

import { AnimatePresence, motion } from "framer-motion";

/* =========================================================
   MOTION
========================================================= */

const EASE = [0.22, 1, 0.36, 1] as const;
const SOFT_EASE = [0.4, 0, 0.2, 1] as const;

const WORDS = ["India", "International", "Solar", "Show"] as const;

const PARTICLES = [
  {
    left: "11%",
    top: "24%",
    delay: 0,
    duration: 3.8,
  },
  {
    left: "23%",
    top: "72%",
    delay: 0.7,
    duration: 4.3,
  },
  {
    left: "36%",
    top: "18%",
    delay: 1.2,
    duration: 3.9,
  },
  {
    left: "65%",
    top: "77%",
    delay: 0.35,
    duration: 4.6,
  },
  {
    left: "79%",
    top: "25%",
    delay: 1,
    duration: 4.2,
  },
  {
    left: "89%",
    top: "66%",
    delay: 1.6,
    duration: 4.5,
  },
] as const;

/* =========================================================
   ANIMATED WORD
========================================================= */

function AnimatedWord({
  word,
  startDelay,
  accent = false,
}: {
  word: string;
  startDelay: number;
  accent?: boolean;
}) {
  const letters = useMemo(() => Array.from(word), [word]);

  return (
    <span
      aria-label={word}
      className="
        inline-flex
        overflow-hidden
        pb-[0.1em]
      "
    >
      {letters.map((letter, index) => (
        <motion.span
          key={`${word}-${index}`}
          aria-hidden="true"
          initial={{
            y: "115%",
            opacity: 0,
            rotateX: -22,
          }}
          animate={{
            y: "0%",
            opacity: 1,
            rotateX: 0,
          }}
          transition={{
            duration: 0.78,
            delay: startDelay + index * 0.038,
            ease: EASE,
          }}
          className={`
            inline-block
            origin-bottom

            ${accent ? "text-solar" : "text-paper"}
          `}
        >
          {letter}
        </motion.span>
      ))}
    </span>
  );
}

/* =========================================================
   BACKGROUND
========================================================= */

function PreloaderBackground() {
  return (
    <div
      aria-hidden="true"
      className="
        pointer-events-none
        absolute inset-0
        overflow-hidden
      "
    >
      {/* =================================================
          AMBIENT GLOWS
      ================================================= */}

      <motion.div
        className="
          absolute
          -left-[20%]
          top-[5%]
          h-[600px]
          w-[600px]
          rounded-full
          bg-blue/[0.08]
          blur-[170px]
        "
        animate={{
          x: [0, 35, 8, 0],
          y: [0, -22, 12, 0],
          scale: [1, 1.08, 1.03, 1],
        }}
        transition={{
          duration: 9,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      <motion.div
        className="
          absolute
          -right-[18%]
          bottom-[-24%]
          h-[650px]
          w-[650px]
          rounded-full
          bg-solar/[0.07]
          blur-[180px]
        "
        animate={{
          x: [0, -34, -10, 0],
          y: [0, 20, -8, 0],
          scale: [1, 1.09, 1.04, 1],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* =================================================
          GRID
      ================================================= */}

      <div
        className="
          absolute inset-0
          opacity-[0.024]
        "
        style={{
          backgroundImage: `
            linear-gradient(
              rgba(255,255,255,0.35) 1px,
              transparent 1px
            ),
            linear-gradient(
              90deg,
              rgba(255,255,255,0.35) 1px,
              transparent 1px
            )
          `,
          backgroundSize: "72px 72px",

          maskImage:
            "radial-gradient(circle at center, black 0%, rgba(0,0,0,.7) 35%, transparent 76%)",

          WebkitMaskImage:
            "radial-gradient(circle at center, black 0%, rgba(0,0,0,.7) 35%, transparent 76%)",
        }}
      />

      {/* =================================================
          SVG SYSTEM
      ================================================= */}

      <svg
        viewBox="0 0 1600 900"
        preserveAspectRatio="none"
        fill="none"
        className="
          absolute inset-0
          h-full w-full
        "
      >
        <defs>
          <linearGradient id="loader-main-line" x1="0" y1="0" x2="1600" y2="0">
            <stop offset="0%" stopColor="#FBB216" stopOpacity="0" />

            <stop offset="28%" stopColor="#FBB216" stopOpacity="0.1" />

            <stop offset="48%" stopColor="#FBB216" stopOpacity="0.38" />

            <stop offset="52%" stopColor="#FFFDF8" stopOpacity="0.65" />

            <stop offset="72%" stopColor="#FBB216" stopOpacity="0.1" />

            <stop offset="100%" stopColor="#FBB216" stopOpacity="0" />
          </linearGradient>

          <radialGradient id="loader-solar-core" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#FBB216" stopOpacity="0.3" />

            <stop offset="32%" stopColor="#FBB216" stopOpacity="0.1" />

            <stop offset="100%" stopColor="#FBB216" stopOpacity="0" />
          </radialGradient>
        </defs>

        {/* Static architecture lines */}

        <path
          d="
            M-80 535
            C210 475 390 585 660 520
            S1120 390 1680 475
          "
          stroke="rgba(255,255,255,0.045)"
          strokeWidth="1"
        />

        <path
          d="
            M-80 245
            C220 155 420 305 670 245
            S1120 125 1680 225
          "
          stroke="rgba(255,255,255,0.027)"
          strokeWidth="1"
        />

        {/* Moving primary signal */}

        <motion.path
          d="
            M-80 535
            C210 475 390 585 660 520
            S1120 390 1680 475
          "
          stroke="url(#loader-main-line)"
          strokeWidth="1.35"
          strokeDasharray="4 18"
          animate={{
            strokeDashoffset: [0, -320],
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: "linear",
          }}
        />

        {/* Moving upper signal */}

        <motion.path
          d="
            M-80 245
            C220 155 420 305 670 245
            S1120 125 1680 225
          "
          stroke="rgba(251,178,22,0.13)"
          strokeWidth="1"
          strokeDasharray="2 22"
          animate={{
            strokeDashoffset: [0, 260],
          }}
          transition={{
            duration: 8.5,
            repeat: Infinity,
            ease: "linear",
          }}
        />

        {/* Centre glow */}

        <motion.circle
          cx="800"
          cy="450"
          r="285"
          fill="url(#loader-solar-core)"
          animate={{
            opacity: [0.55, 0.9, 0.55],
            r: [270, 295, 270],
          }}
          transition={{
            duration: 3.5,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />

        {/* Animated ring 1 */}

        <motion.circle
          cx="800"
          cy="450"
          r="132"
          stroke="#FBB216"
          strokeOpacity="0.16"
          strokeWidth="1.1"
          strokeDasharray="190 640"
          animate={{
            strokeDashoffset: [0, -830],
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: "linear",
          }}
        />

        {/* Animated ring 2 */}

        <motion.circle
          cx="800"
          cy="450"
          r="194"
          stroke="#FFFDF8"
          strokeOpacity="0.055"
          strokeWidth="1"
          strokeDasharray="3 17"
          animate={{
            strokeDashoffset: [0, 180],
          }}
          transition={{
            duration: 9,
            repeat: Infinity,
            ease: "linear",
          }}
        />

        {/* Animated ring 3 */}

        <motion.circle
          cx="800"
          cy="450"
          r="270"
          stroke="#FBB216"
          strokeOpacity="0.075"
          strokeWidth="1"
          strokeDasharray="210 1500"
          strokeLinecap="round"
          animate={{
            strokeDashoffset: [0, -1710],
          }}
          transition={{
            duration: 18,
            repeat: Infinity,
            ease: "linear",
          }}
        />
      </svg>

      {/* =================================================
          CENTRAL BREATHING RING
      ================================================= */}

      <motion.div
        className="
          absolute
          left-1/2
          top-1/2

          h-[270px]
          w-[270px]

          -translate-x-1/2
          -translate-y-1/2

          rounded-full

          border
          border-solar/[0.09]
        "
        animate={{
          scale: [0.94, 1.07, 0.94],
          opacity: [0.28, 0.65, 0.28],
        }}
        transition={{
          duration: 3.2,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* Second pulse */}

      <motion.div
        className="
          absolute
          left-1/2
          top-1/2

          h-[165px]
          w-[165px]

          -translate-x-1/2
          -translate-y-1/2

          rounded-full

          border
          border-solar/[0.1]
        "
        animate={{
          scale: [0.96, 1.12, 0.96],
          opacity: [0.2, 0.52, 0.2],
        }}
        transition={{
          duration: 2.5,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* =================================================
          CENTER SIGNAL
      ================================================= */}

      <motion.span
        className="
          absolute
          left-1/2
          top-1/2

          h-2
          w-2

          -translate-x-1/2
          -translate-y-1/2

          rounded-full

          bg-solar

          shadow-[0_0_30px_rgba(251,178,22,0.9)]
        "
        animate={{
          scale: [0.9, 1.5, 0.9],
          opacity: [0.6, 1, 0.6],
        }}
        transition={{
          duration: 1.6,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* =================================================
          ORBIT 01
      ================================================= */}

      <motion.div
        className="
          absolute
          left-1/2
          top-1/2

          h-[330px]
          w-[330px]

          -translate-x-1/2
          -translate-y-1/2
        "
        animate={{
          rotate: 360,
        }}
        transition={{
          duration: 11,
          repeat: Infinity,
          ease: "linear",
        }}
      >
        <motion.span
          className="
            absolute
            left-1/2
            top-0

            h-1.5
            w-1.5

            -translate-x-1/2

            rounded-full

            bg-solar

            shadow-[0_0_15px_rgba(251,178,22,0.9)]
          "
          animate={{
            opacity: [0.45, 1, 0.45],
            scale: [0.8, 1.25, 0.8],
          }}
          transition={{
            duration: 1.8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      </motion.div>

      {/* =================================================
          ORBIT 02
      ================================================= */}

      <motion.div
        className="
          absolute
          left-1/2
          top-1/2

          h-[470px]
          w-[470px]

          -translate-x-1/2
          -translate-y-1/2
        "
        animate={{
          rotate: -360,
        }}
        transition={{
          duration: 19,
          repeat: Infinity,
          ease: "linear",
        }}
      >
        <motion.span
          className="
            absolute
            right-4
            top-1/2

            h-1
            w-1

            rounded-full
            bg-paper/70
          "
          animate={{
            opacity: [0.2, 0.8, 0.2],
            scale: [0.8, 1.3, 0.8],
          }}
          transition={{
            duration: 2.1,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      </motion.div>

      {/* =================================================
          HORIZONTAL ENERGY BEAM
      ================================================= */}

      <motion.div
        initial={{
          opacity: 0,
          scaleX: 0.5,
        }}
        animate={{
          opacity: 1,
          scaleX: 1,
        }}
        transition={{
          duration: 0.9,
          delay: 0.2,
          ease: EASE,
        }}
        className="
          absolute
          left-1/2
          top-1/2

          h-px
          w-[min(92vw,1000px)]

          -translate-x-1/2
          -translate-y-1/2

          overflow-hidden

          bg-paper/[0.035]
        "
      >
        <motion.span
          initial={{
            x: "-220%",
          }}
          animate={{
            x: "620%",
          }}
          transition={{
            duration: 2.6,
            repeat: Infinity,
            repeatDelay: 0.15,
            ease: SOFT_EASE,
          }}
          className="
            absolute
            inset-y-0

            w-56

            bg-gradient-to-r

            from-transparent
            via-solar/90
            to-transparent

            blur-[1px]
          "
        />
      </motion.div>

      {/* =================================================
          PARTICLES
      ================================================= */}

      {PARTICLES.map((particle, index) => (
        <motion.span
          key={`${particle.left}-${particle.top}`}
          className="
              absolute
              h-1
              w-1
              rounded-full
              bg-paper/35
            "
          style={{
            left: particle.left,
            top: particle.top,
          }}
          animate={{
            opacity: [0.08, 0.55, 0.08],

            y: [0, -8, 0],

            scale: [0.8, 1.2, 0.8],
          }}
          transition={{
            duration: particle.duration,

            delay: particle.delay,

            repeat: Infinity,

            ease: "easeInOut",
          }}
        />
      ))}

      {/* =================================================
          VIGNETTE
      ================================================= */}

      <div
        className="
          absolute inset-0

          bg-[radial-gradient(circle_at_center,transparent_9%,rgba(9,15,18,0.10)_45%,rgba(6,12,15,0.72)_100%)]
        "
      />

      <div
        className="
          absolute
          inset-x-0
          top-0

          h-44

          bg-gradient-to-b

          from-ink/40
          to-transparent
        "
      />

      <div
        className="
          absolute
          inset-x-0
          bottom-0

          h-48

          bg-gradient-to-t

          from-ink/65
          to-transparent
        "
      />
    </div>
  );
}

/* =========================================================
   PROGRESS
========================================================= */

function LoadingProgress() {
  return (
    <motion.div
      initial={{
        opacity: 0,
        y: 18,
      }}
      animate={{
        opacity: 1,
        y: 0,
      }}
      transition={{
        duration: 0.7,
        delay: 1.4,
        ease: EASE,
      }}
      className="
        mt-9
        w-full
        max-w-[350px]
      "
    >
      {/* Rail */}

      <div
        className="
          relative
          h-[2px]

          overflow-visible

          rounded-full

          bg-paper/[0.1]
        "
      >
        <motion.div
          initial={{
            scaleX: 0,
          }}
          animate={{
            scaleX: 1,
          }}
          transition={{
            duration: 1.15,
            delay: 1.48,
            ease: EASE,
          }}
          className="
            absolute inset-0

            origin-left

            rounded-full

            bg-gradient-to-r

            from-blue
            via-solar
            to-paper/80
          "
        />

        <motion.span
          initial={{
            left: "0%",
            opacity: 0,
          }}
          animate={{
            left: "100%",
            opacity: [0, 1, 1],
          }}
          transition={{
            left: {
              duration: 1.15,
              delay: 1.48,
              ease: EASE,
            },

            opacity: {
              duration: 0.3,
              delay: 1.48,
            },
          }}
          className="
            absolute
            top-1/2

            h-2
            w-2

            -translate-x-1/2
            -translate-y-1/2

            rounded-full

            bg-solar

            shadow-[0_0_18px_rgba(251,178,22,0.95)]
          "
        />
      </div>

      {/* Meta */}

      <div
        className="
          mt-4

          flex
          items-center
          justify-between

          gap-5
        "
      >
        <span
          className="
            font-mono

            text-[8px]
            font-medium
            uppercase

            tracking-[0.15em]

            text-paper/35
          "
        >
          Solar · Storage · EV
        </span>

        <motion.span
          animate={{
            opacity: [0.35, 1, 0.35],
          }}
          transition={{
            duration: 1.3,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="
            flex
            items-center
            gap-2

            font-mono

            text-[8px]
            font-semibold
            uppercase

            tracking-[0.15em]

            text-solar
          "
        >
          <motion.span
            animate={{
              scale: [0.75, 1.3, 0.75],
            }}
            transition={{
              duration: 1.3,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="
              h-1
              w-1
              rounded-full
              bg-solar
            "
          />
          Initializing
        </motion.span>
      </div>
    </motion.div>
  );
}

/* =========================================================
   PRELOADER
========================================================= */

export function Preloader() {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const previousOverflow = document.body.style.overflow;

    document.body.style.overflow = "hidden";

    const timer = window.setTimeout(() => {
      setVisible(false);
    }, 3150);

    return () => {
      window.clearTimeout(timer);

      document.body.style.overflow = previousOverflow;
    };
  }, []);

  useEffect(() => {
    if (!visible) {
      document.body.style.overflow = "";
    }
  }, [visible]);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          key="site-preloader"
          role="status"
          aria-live="polite"
          aria-label="Loading India International Solar Show 2026"
          initial={{
            opacity: 1,
          }}
          animate={{
            opacity: 1,
          }}
          exit={{
            opacity: 0,
          }}
          transition={{
            duration: 0.75,
            ease: EASE,
          }}
          className="
            fixed
            inset-0
            z-[9999]

            flex
            items-center
            justify-center

            overflow-hidden

            bg-ink
            text-paper
          "
        >
          {/* Background */}

          <PreloaderBackground />

          {/* =================================================
              MAIN CONTENT
          ================================================= */}

          <motion.div
            initial={{
              opacity: 1,
            }}
            animate={{
              opacity: 1,
            }}
            exit={{
              opacity: 0,

              y: -22,

              scale: 0.985,
            }}
            transition={{
              duration: 0.55,
              ease: EASE,
            }}
            className="
              relative
              z-20

              flex
              w-full
              max-w-[1100px]
              flex-col
              items-center

              px-5

              text-center

              sm:px-8
            "
          >
            {/* =================================================
                EYEBROW
            ================================================= */}

            <motion.div
              initial={{
                opacity: 0,
                y: 14,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              transition={{
                duration: 0.72,
                delay: 0.08,
                ease: EASE,
              }}
              className="
                flex
                items-center
                justify-center

                gap-3
              "
            >
              <motion.span
                initial={{
                  scaleX: 0,
                }}
                animate={{
                  scaleX: 1,
                }}
                transition={{
                  duration: 0.8,
                  delay: 0.15,
                  ease: EASE,
                }}
                className="
                  h-px
                  w-9

                  origin-right

                  bg-gradient-to-l

                  from-solar
                  to-transparent
                "
              />

              <span
                className="
                  font-mono

                  text-[9px]
                  font-semibold
                  uppercase

                  tracking-[0.18em]

                  text-solar

                  sm:text-[10px]
                "
              >
                Connecting Solar Industry
              </span>

              <motion.span
                initial={{
                  scaleX: 0,
                }}
                animate={{
                  scaleX: 1,
                }}
                transition={{
                  duration: 0.8,
                  delay: 0.15,
                  ease: EASE,
                }}
                className="
                  h-px
                  w-9

                  origin-left

                  bg-gradient-to-r

                  from-solar
                  to-transparent
                "
              />
            </motion.div>

            {/* =================================================
                MAIN TITLE
            ================================================= */}

            <motion.h1
              initial={{
                scale: 0.975,
              }}
              animate={{
                scale: 1,
              }}
              transition={{
                duration: 1.25,
                ease: EASE,
              }}
              aria-label="India International Solar Show"
              className="
                relative

                mt-7

                flex
                max-w-[1050px]
                flex-wrap
                items-center
                justify-center

                gap-x-[0.27em]
                gap-y-[0.04em]

                font-display

                text-[clamp(2.5rem,6vw,5rem)]

                font-semibold

                leading-[0.94]

                tracking-[-0.052em]

                text-paper
              "
            >
              <AnimatedWord word={WORDS[0]} startDelay={0.18} />

              {/* SOLAR */}

              <span className="relative">
                <motion.span
                  className="
                    absolute
                    left-1/2
                    top-1/2

                    h-[120%]
                    w-[145%]

                    -translate-x-1/2
                    -translate-y-1/2

                    rounded-full

                    bg-solar/[0.12]

                    blur-[28px]
                  "
                  animate={{
                    opacity: [0.45, 0.9, 0.45],

                    scale: [0.94, 1.08, 0.94],
                  }}
                  transition={{
                    duration: 2.4,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                />

                <span className="relative">
                  <AnimatedWord word={WORDS[1]} startDelay={0.4} accent />
                </span>
              </span>

              <AnimatedWord word={WORDS[2]} startDelay={0.62} />

              <AnimatedWord word={WORDS[3]} startDelay={0.98} />
            </motion.h1>

            {/* =================================================
                YEAR
            ================================================= */}

            <motion.div
              initial={{
                opacity: 0,
                y: 12,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              transition={{
                duration: 0.65,
                delay: 1.22,
                ease: EASE,
              }}
              className="
                mt-6

                flex
                items-center
                justify-center

                gap-3
              "
            >
              <motion.span
                initial={{
                  scaleX: 0,
                }}
                animate={{
                  scaleX: 1,
                }}
                transition={{
                  duration: 0.7,
                  delay: 1.28,
                  ease: EASE,
                }}
                className="
                  h-px
                  w-10

                  origin-right

                  bg-paper/15
                "
              />

              <span
                className="
                  font-mono

                  text-[10px]
                  font-semibold

                  tracking-[0.3em]

                  text-paper/50
                "
              >
                2026
              </span>

              <motion.span
                initial={{
                  scaleX: 0,
                }}
                animate={{
                  scaleX: 1,
                }}
                transition={{
                  duration: 0.7,
                  delay: 1.28,
                  ease: EASE,
                }}
                className="
                  h-px
                  w-10

                  origin-left

                  bg-paper/15
                "
              />
            </motion.div>

            {/* Loader */}

            <LoadingProgress />
          </motion.div>

          {/* =================================================
              TOP LEFT
          ================================================= */}

          <motion.div
            initial={{
              opacity: 0,
              y: -6,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              duration: 0.7,
              delay: 0.8,
              ease: EASE,
            }}
            className="
              absolute
              left-6
              top-6

              z-20

              hidden

              items-center
              gap-2.5

              sm:flex

              lg:left-8
              lg:top-8
            "
          >
            <motion.span
              animate={{
                opacity: [0.35, 1, 0.35],
                scale: [0.8, 1.2, 0.8],
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="
                h-1.5
                w-1.5

                rounded-full

                bg-solar
              "
            />

            <span
              className="
                font-mono

                text-[7px]
                font-medium

                uppercase

                tracking-[0.15em]

                text-paper/30
              "
            >
              Energy network online
            </span>
          </motion.div>

          {/* =================================================
              TOP RIGHT
          ================================================= */}

          <motion.span
            initial={{
              opacity: 0,
              y: -6,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              duration: 0.7,
              delay: 0.9,
              ease: EASE,
            }}
            className="
              absolute
              right-6
              top-6

              z-20

              hidden

              font-mono

              text-[7px]
              font-medium

              uppercase

              tracking-[0.16em]

              text-paper/25

              sm:block

              lg:right-8
              lg:top-8
            "
          >
            ISI / 2026
          </motion.span>

          {/* =================================================
              BOTTOM META
          ================================================= */}

          <motion.div
            initial={{
              opacity: 0,
              y: 10,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              duration: 0.65,
              delay: 1.45,
              ease: EASE,
            }}
            className="
              absolute
              inset-x-0
              bottom-7

              z-20

              flex
              items-center
              justify-center

              gap-3

              px-5

              sm:bottom-8
            "
          >
            <span className="h-px w-6 bg-paper/15" />

            <span
              className="
                font-mono

                text-[8px]
                font-medium

                uppercase

                tracking-[0.16em]

                text-paper/35
              "
            >
              Pune · 02–04 October 2026
            </span>

            <span className="h-px w-6 bg-paper/15" />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
