"use client";

import { useState } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";

import { VALUE_CHAIN } from "@/data/siteData";
import { Container } from "@/components/ui/Container";
import { Icon } from "@/components/ui/Icon";
import { cn } from "@/lib/utils";

function arcOffset(index: number, total: number) {
  return Math.sin((index / (total - 1)) * Math.PI) * -18;
}

export function ValueChainSection() {
  const [active, setActive] = useState(0);
  const reduceMotion = useReducedMotion();

  const activeItem = VALUE_CHAIN[active];
  const total = VALUE_CHAIN.length;

  function previousStage() {
    setActive((current) => (current - 1 + total) % total);
  }

  function nextStage() {
    setActive((current) => (current + 1) % total);
  }

  return (
    <section
      id="value-chain"
      className="relative overflow-hidden border-b border-white/10 bg-ink py-10 text-white sm:py-12 lg:py-14"
      aria-labelledby="value-chain-heading"
    >
      {/* subtle background */}
      <motion.svg
        viewBox="0 0 760 760"
        fill="none"
        aria-hidden="true"
        className="pointer-events-none absolute -right-56 -top-56 h-[620px] w-[620px] text-solar opacity-[0.035]"
        animate={
          reduceMotion
            ? undefined
            : {
                rotate: [0, 2, 0],
                y: [0, 7, 0],
              }
        }
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      >
        <circle cx="380" cy="380" r="145" stroke="currentColor" />
        <circle cx="380" cy="380" r="235" stroke="currentColor" />
        <circle cx="380" cy="380" r="325" stroke="currentColor" />
      </motion.svg>

      <Container className="relative">
        {/* Intro */}
        <div className="grid items-center gap-6 lg:grid-cols-[1.15fr_0.85fr] lg:gap-8">
          <motion.div
            initial={
              reduceMotion
                ? false
                : {
                    opacity: 0,
                    y: 18,
                  }
            }
            whileInView={{
              opacity: 1,
              y: 0,
            }}
            viewport={{
              once: true,
              amount: 0.2,
            }}
            transition={{
              duration: 0.55,
              ease: [0.22, 1, 0.36, 1],
            }}
          >
            <div className="flex items-center gap-2.5">
              <span className="h-[2px] w-7 bg-solar" />

              <span className="text-[10px] font-bold uppercase leading-none tracking-[0.16em] text-white/45 sm:text-[11px]">
                Solar &amp; Clean Energy Ecosystem
              </span>
            </div>

            <h2
              id="value-chain-heading"
              className="
                mt-3 max-w-[760px]
                font-display
                text-[clamp(1.8rem,2.45vw,2.45rem)]
                font-bold uppercase
                leading-[1.08]
                tracking-[0.005em]
                text-white
              "
            >
              Connecting India&apos;s
              <span className="block text-solar">
                Renewable Energy Value Chain
              </span>
            </h2>

            <p
              className="
                mt-3 max-w-[680px]
                text-[13px]
                leading-[1.68]
                tracking-[0.005em]
                text-white/55
                sm:text-sm
              "
            >
              From solar PV generation and battery energy storage to smart
              grids, E-Mobility, financing, and industrial adoption, each
              segment connects at India International Solar Show 2026.
            </p>
          </motion.div>

          {/* Image */}
          <motion.div
            initial={
              reduceMotion
                ? false
                : {
                    opacity: 0,
                    x: 18,
                  }
            }
            whileInView={{
              opacity: 1,
              x: 0,
            }}
            whileHover={
              reduceMotion
                ? undefined
                : {
                    y: -4,
                  }
            }
            viewport={{
              once: true,
              amount: 0.2,
            }}
            transition={{
              duration: 0.55,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="hidden overflow-hidden border border-white/10 bg-white/[0.025] lg:block"
          >
            <motion.div
              className="relative aspect-[16/7.5] overflow-hidden"
              whileHover={
                reduceMotion
                  ? undefined
                  : {
                      scale: 1.025,
                    }
              }
              transition={{
                duration: 0.4,
              }}
            >
              <Image
                src="/images/about.webp"
                alt="Solar, battery storage and electric mobility value chain"
                fill
                sizes="38vw"
                className="object-cover"
              />

              <div
                className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/5 to-transparent"
                aria-hidden="true"
              />

              <div className="absolute inset-x-0 bottom-0 p-4">
                <span className="text-[9px] font-bold uppercase tracking-[0.15em] text-solar">
                  Integrated Ecosystem
                </span>

                <p className="mt-1 font-display text-base font-semibold uppercase leading-[1.1] tracking-[0.01em] text-white">
                  Solar · Storage · Grid · Mobility
                </p>
              </div>
            </motion.div>
          </motion.div>
        </div>

        {/* Desktop flow */}
        <div className="mt-9 hidden lg:block">
          <div className="relative h-[110px]">
            <div
              className="absolute inset-x-0 top-[50px] h-px bg-white/10"
              aria-hidden="true"
            />

            <motion.div
              initial={false}
              animate={{
                width: `${((active + 1) / total) * 100}%`,
              }}
              transition={{
                duration: 0.42,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="absolute left-0 top-[50px] h-[2px] bg-solar"
            />

            <div
              className="absolute inset-x-0 top-[50px] grid"
              style={{
                gridTemplateColumns: `repeat(${total}, minmax(0, 1fr))`,
              }}
            >
              {VALUE_CHAIN.map((item, index) => {
                const isActive = active === index;

                return (
                  <button
                    key={item.title}
                    type="button"
                    onClick={() => setActive(index)}
                    onMouseEnter={() => setActive(index)}
                    aria-pressed={isActive}
                    aria-label={`${item.title} stage`}
                    style={{
                      transform: `translateY(${arcOffset(index, total)}px)`,
                    }}
                    className="group relative -translate-y-1/2 justify-self-center focus-visible:outline-none"
                  >
                    <motion.span
                      animate={{
                        y: isActive ? -3 : 0,
                        scale: isActive ? 1.06 : 1,
                      }}
                      whileHover={{
                        y: -4,
                        scale: 1.07,
                      }}
                      transition={{
                        duration: 0.22,
                      }}
                      className={cn(
                        "relative z-10 flex h-12 w-12 items-center justify-center border text-white transition-colors",
                        isActive
                          ? "border-solar bg-solar text-ink"
                          : "border-white/15 bg-ink text-white/55 group-hover:border-solar/60 group-hover:text-solar",
                      )}
                    >
                      <Icon name={item.icon} size={19} aria-hidden="true" />
                    </motion.span>
                  </button>
                );
              })}
            </div>

            <div
              className="absolute inset-x-0 top-[50px] grid"
              style={{
                gridTemplateColumns: `repeat(${total}, minmax(0, 1fr))`,
              }}
            >
              {VALUE_CHAIN.map((item, index) => (
                <span
                  key={item.title}
                  style={{
                    transform: `translateY(${arcOffset(index, total) + 36}px)`,
                  }}
                  className={cn(
                    "justify-self-center px-1 text-center text-[9px] font-semibold uppercase leading-[1.25] tracking-[0.04em] transition-colors xl:text-[10px]",
                    active === index ? "text-white" : "text-white/38",
                  )}
                >
                  {item.title}
                </span>
              ))}
            </div>
          </div>

          {/* Active stage */}
          <div className="mx-auto mt-8 flex max-w-[820px] items-center gap-3">
            <button
              type="button"
              onClick={previousStage}
              aria-label="Previous stage"
              className="flex h-9 w-9 shrink-0 items-center justify-center border border-white/15 text-white/55 transition-colors hover:border-solar hover:text-solar focus-visible:outline-none"
            >
              <ChevronLeft size={17} strokeWidth={1.8} aria-hidden="true" />
            </button>

            <AnimatePresence mode="wait">
              <motion.div
                key={activeItem.title}
                initial={
                  reduceMotion
                    ? false
                    : {
                        opacity: 0,
                        y: 10,
                      }
                }
                animate={{
                  opacity: 1,
                  y: 0,
                }}
                exit={{
                  opacity: 0,
                  y: -8,
                }}
                transition={{
                  duration: 0.28,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className="relative flex min-h-[120px] flex-1 items-center gap-5 overflow-hidden border border-white/10 bg-white/[0.025] p-5"
              >
                <motion.div
                  initial={false}
                  animate={{
                    rotate: 0,
                    scale: 1,
                  }}
                  whileHover={{
                    rotate: -4,
                    scale: 1.08,
                  }}
                  className="flex h-11 w-11 shrink-0 items-center justify-center bg-solar text-ink"
                >
                  <Icon name={activeItem.icon} size={19} aria-hidden="true" />
                </motion.div>

                <div>
                  <p className="text-[9px] font-bold uppercase leading-none tracking-[0.16em] text-solar">
                    Stage {active + 1} of {total}
                  </p>

                  <h3 className="mt-2 font-display text-[1.15rem] font-semibold uppercase leading-[1.08] tracking-[0.012em] text-white">
                    {activeItem.title}
                  </h3>

                  <p className="mt-2 max-w-2xl text-[13px] leading-[1.65] tracking-[0.004em] text-white/55">
                    {activeItem.desc}
                  </p>
                </div>

                <motion.div
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  className="absolute inset-x-0 bottom-0 h-[2px] origin-left bg-solar"
                />
              </motion.div>
            </AnimatePresence>

            <button
              type="button"
              onClick={nextStage}
              aria-label="Next stage"
              className="flex h-9 w-9 shrink-0 items-center justify-center border border-white/15 text-white/55 transition-colors hover:border-solar hover:text-solar focus-visible:outline-none"
            >
              <ChevronRight size={17} strokeWidth={1.8} aria-hidden="true" />
            </button>
          </div>
        </div>

        {/* Mobile / tablet */}
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{
            once: true,
            amount: 0.08,
          }}
          variants={{
            hidden: {},
            show: {
              transition: {
                staggerChildren: 0.055,
              },
            },
          }}
          className="mt-7 grid gap-2.5 lg:hidden"
        >
          {VALUE_CHAIN.map((item, index) => {
            const isActive = active === index;

            return (
              <motion.div
                key={item.title}
                variants={{
                  hidden: {
                    opacity: 0,
                    y: 14,
                  },
                  show: {
                    opacity: 1,
                    y: 0,
                    transition: {
                      duration: 0.4,
                    },
                  },
                }}
                className="overflow-hidden border border-white/10 bg-white/[0.025]"
              >
                <button
                  type="button"
                  onClick={() => setActive(isActive ? 0 : index)}
                  aria-expanded={isActive}
                  className="flex w-full items-center gap-3 p-3.5 text-left"
                >
                  <motion.span
                    animate={{
                      scale: isActive ? 1.06 : 1,
                      rotate: isActive ? -3 : 0,
                    }}
                    className={cn(
                      "flex h-9 w-9 shrink-0 items-center justify-center border",
                      isActive
                        ? "border-solar bg-solar text-ink"
                        : "border-white/15 text-white/55",
                    )}
                  >
                    <Icon name={item.icon} size={17} aria-hidden="true" />
                  </motion.span>

                  <span className="flex-1">
                    <span className="text-[9px] font-bold uppercase tracking-[0.13em] text-solar/70">
                      Stage {index + 1}
                    </span>

                    <span className="mt-1 block font-display text-[1rem] font-semibold uppercase leading-[1.12] tracking-[0.012em] text-white">
                      {item.title}
                    </span>
                  </span>
                </button>

                <AnimatePresence initial={false}>
                  {isActive && (
                    <motion.div
                      initial={{
                        height: 0,
                        opacity: 0,
                      }}
                      animate={{
                        height: "auto",
                        opacity: 1,
                      }}
                      exit={{
                        height: 0,
                        opacity: 0,
                      }}
                      transition={{
                        duration: 0.25,
                      }}
                    >
                      <p className="border-t border-white/10 px-3.5 py-3 text-[13px] leading-[1.65] text-white/55">
                        {item.desc}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </motion.div>
      </Container>
    </section>
  );
}
