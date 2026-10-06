"use client";

import { Mail, MessageCircle, Phone, UserRound } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";

import { CONTACTS } from "@/data/siteData";
import { Button } from "@/components/ui/Button";

const EASE = [0.16, 1, 0.3, 1] as const;

const groupVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.05,
      delayChildren: 0.02,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 10 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.42, ease: EASE },
  },
};

function CardGeometry({ reduceMotion }: { reduceMotion: boolean | null }) {
  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
      <div className="absolute -right-10 -top-12 size-28 rounded-full bg-blue/[0.045] blur-[46px]" />

      <motion.svg
        viewBox="0 0 220 220"
        fill="none"
        className="absolute -right-20 -top-20 size-[190px] text-blue opacity-[0.018]"
        animate={reduceMotion ? undefined : { rotate: 360 }}
        transition={reduceMotion ? undefined : { duration: 150, repeat: Infinity, ease: "linear" }}
      >
        <circle cx="110" cy="110" r="42" stroke="currentColor" />
        <circle cx="110" cy="110" r="72" stroke="currentColor" strokeDasharray="3 12" />
        <circle cx="110" cy="110" r="98" stroke="currentColor" />
        <path d="M110 12V208" stroke="currentColor" />
        <path d="M12 110H208" stroke="currentColor" />
        <circle cx="110" cy="38" r="3.5" fill="#fbb216" stroke="none" />
      </motion.svg>
    </div>
  );
}

export function ContactCards() {
  const reduceMotion = useReducedMotion();

  return (
    <motion.div
      variants={groupVariants}
      initial={reduceMotion ? false : "hidden"}
      whileInView="visible"
      viewport={{ once: true, amount: 0.08, margin: "-30px" }}
      className="grid grid-cols-1 items-start gap-2.5 sm:grid-cols-2 lg:grid-cols-1"
    >
      {CONTACTS.map((person, index) => (
        <motion.article
          key={person.name}
          variants={cardVariants}
          className="group relative isolate overflow-hidden rounded-[18px] border border-ink/[0.075] bg-paper p-4 shadow-[0_8px_24px_rgba(25,25,25,0.028)] transition-all duration-300 hover:border-blue/15 hover:shadow-[0_12px_28px_rgba(25,25,25,0.045)]"
        >
          <CardGeometry reduceMotion={reduceMotion} />

          <span
            aria-hidden="true"
            className="absolute inset-x-0 top-0 h-[2px] origin-left scale-x-[0.22] bg-solar transition-transform duration-300 group-hover:scale-x-100"
          />

          <div className="relative z-10">
            <div className="flex items-start justify-between gap-3">
              <div className="flex min-w-0 items-center gap-2.5">
                <span className="flex size-8 shrink-0 items-center justify-center rounded-full border border-ink/[0.07] bg-blue/[0.05] text-blue transition-all duration-300 group-hover:border-solar group-hover:bg-solar group-hover:text-ink">
                  <UserRound aria-hidden="true" className="size-3.5" strokeWidth={1.8} />
                </span>

                <div className="min-w-0">
                  <span className="block text-[7.5px] font-semibold uppercase leading-none tracking-[0.1em] text-blue">
                    Event Team
                  </span>
                  <h3 className="mt-1 truncate font-display text-[15px] font-semibold leading-[1.08] tracking-[-0.012em] text-ink">
                    {person.name}
                  </h3>
                </div>
              </div>

              <span
                aria-hidden="true"
                className="pt-0.5 font-display text-[7.5px] font-semibold leading-none tracking-[0.07em] text-ink/16"
              >
                {String(index + 1).padStart(2, "0")}
              </span>
            </div>

            <div className="mt-3 space-y-1.5 border-t border-ink/[0.06] pt-3">
              <a
                href={person.phoneHref}
                className="group/phone flex items-center gap-2 text-[10.5px] font-medium leading-[1.3] text-ink/52 transition-colors duration-200 hover:text-ink"
              >
                <span className="flex size-5.5 shrink-0 items-center justify-center rounded-full bg-blue/[0.045] text-blue transition-all duration-200 group-hover/phone:bg-blue group-hover/phone:text-paper">
                  <Phone aria-hidden="true" className="size-[11px]" strokeWidth={1.8} />
                </span>
                <span>{person.phone}</span>
              </a>

              <a
                href={`mailto:${person.email}`}
                className="group/email flex items-center gap-2 text-[10.5px] font-medium leading-[1.3] text-ink/52 transition-colors duration-200 hover:text-ink"
              >
                <span className="flex size-5.5 shrink-0 items-center justify-center rounded-full bg-blue/[0.045] text-blue transition-all duration-200 group-hover/email:bg-blue group-hover/email:text-paper">
                  <Mail aria-hidden="true" className="size-[11px]" strokeWidth={1.8} />
                </span>
                <span className="min-w-0 break-all">{person.email}</span>
              </a>
            </div>

            <div className="mt-3 grid grid-cols-3 gap-1.5">
              <Button
                href={person.phoneHref}
                size="sm"
                className="min-h-8 w-full justify-center gap-1 px-2 text-[10px] leading-none"
                aria-label={`Call ${person.name}`}
              >
                <Phone aria-hidden="true" className="size-3" strokeWidth={1.8} />
                Call
              </Button>

              <Button
                href={`mailto:${person.email}`}
                size="sm"
                variant="outline"
                className="min-h-8 w-full justify-center gap-1 border-ink/10 bg-paper px-2 text-[10px] leading-none text-ink hover:border-blue hover:bg-blue hover:text-paper"
                aria-label={`Email ${person.name}`}
              >
                <Mail aria-hidden="true" className="size-3" strokeWidth={1.8} />
                Email
              </Button>

              <Button
                href={person.whatsapp}
                external
                size="sm"
                variant="outline"
                className="min-h-8 w-full justify-center gap-1 border-ink/10 bg-paper px-2 text-[10px] leading-none text-ink hover:border-solar hover:bg-solar hover:text-ink"
                aria-label={`WhatsApp ${person.name}`}
              >
                <MessageCircle aria-hidden="true" className="size-3" strokeWidth={1.8} />
                <span className="hidden xl:inline">WhatsApp</span>
                <span className="xl:hidden">Chat</span>
              </Button>
            </div>
          </div>
        </motion.article>
      ))}
    </motion.div>
  );
}
