"use client";

import type { ReactNode, SVGProps } from "react";

import Image from "next/image";
import Link from "next/link";

import { motion, useReducedMotion } from "framer-motion";

import {
  ArrowUpRight,
  CalendarDays,
  Download,
  Images,
  Mail,
  MapPin,
  Phone,
} from "lucide-react";

import { CONTACTS, EVENT, FOOTER_LINKS } from "@/data/siteData";

import { Container } from "@/components/ui/Container";

/* =========================================================
   Motion
   ========================================================= */

const EASE = [0.16, 1, 0.3, 1] as const;

const groupVariants = {
  hidden: {},

  visible: {
    transition: {
      staggerChildren: 0.055,
      delayChildren: 0.03,
    },
  },
};

const revealVariants = {
  hidden: {
    opacity: 0,
    y: 14,
  },

  visible: {
    opacity: 1,
    y: 0,

    transition: {
      duration: 0.52,
      ease: EASE,
    },
  },
};

/* =========================================================
   Social Icons
   ========================================================= */

function FacebookIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...props}>
      <path d="M13.5 22v-9h3l.45-3.5H13.5V7.25c0-1.01.28-1.7 1.74-1.7H17V2.42c-.3-.04-1.34-.13-2.56-.13-2.53 0-4.27 1.55-4.27 4.39V9.5H7.3V13h2.87v9h3.33Z" />
    </svg>
  );
}

function InstagramIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      {...props}
    >
      <rect x="3" y="3" width="18" height="18" rx="5" />

      <circle cx="12" cy="12" r="4" />

      <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
    </svg>
  );
}

function LinkedInIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...props}>
      <path d="M5.34 3.5A2.34 2.34 0 1 1 5.33 8.18 2.34 2.34 0 0 1 5.34 3.5ZM3.3 9.8h4.07V21H3.3V9.8Zm6.64 0h3.9v1.53h.05c.54-1.03 1.87-2.12 3.85-2.12 4.12 0 4.88 2.71 4.88 6.24V21h-4.06v-4.92c0-1.17-.02-2.68-1.64-2.68-1.64 0-1.89 1.28-1.89 2.6V21H9.94V9.8Z" />
    </svg>
  );
}

/* =========================================================
   Data
   ========================================================= */

const SOCIALS = [
  {
    label: "Facebook",
    href: "https://www.facebook.com/indiasolarshow/",
    icon: FacebookIcon,
  },
  {
    label: "Instagram",
    href: "https://www.instagram.com/indiasolarshow/",
    icon: InstagramIcon,
  },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/company/indiasolarshow/",
    icon: LinkedInIcon,
  },
] as const;

const QUICK_LINKS = FOOTER_LINKS.slice(0, 8);
const MORE_LINKS = FOOTER_LINKS.slice(8);

const MEDIA_LINKS = [
  {
    label: "Gallery",
    href: "/gallery",
    icon: Images,
  },
  {
    label: "Download Brochure",
    href: "/downloads",
    icon: Download,
  },
  {
    label: "Conference",
    href: "/conference",
  },
] as const;

/* =========================================================
   Background
   ========================================================= */

function FooterBackground({ reduceMotion }: { reduceMotion: boolean | null }) {
  return (
    <div
      aria-hidden="true"
      className="
        pointer-events-none
        absolute
        inset-0
        overflow-hidden
      "
    >
      {/* Blue depth */}

      <div
        className="
          absolute
          -right-48
          top-[10%]
          size-[34rem]
          rounded-full
          bg-blue/[0.13]
          blur-[135px]
        "
      />

      {/* Solar glow */}

      <div
        className="
          absolute
          -bottom-48
          -left-40
          size-[28rem]
          rounded-full
          bg-solar/[0.055]
          blur-[120px]
        "
      />

      {/* Main rotating geometry */}

      <motion.svg
        viewBox="0 0 900 900"
        fill="none"
        className="
          absolute
          -right-[390px]
          -top-[350px]
          size-[850px]
          text-paper
          opacity-[0.025]

          sm:-right-[330px]
          sm:size-[930px]

          lg:-right-[250px]
          lg:size-[1050px]
        "
        animate={
          reduceMotion
            ? undefined
            : {
                rotate: 360,
              }
        }
        transition={
          reduceMotion
            ? undefined
            : {
                duration: 165,
                repeat: Infinity,
                ease: "linear",
              }
        }
      >
        <circle cx="450" cy="450" r="145" stroke="currentColor" />

        <circle
          cx="450"
          cy="450"
          r="235"
          stroke="currentColor"
          strokeDasharray="4 16"
        />

        <circle cx="450" cy="450" r="345" stroke="currentColor" />

        <path d="M450 30V870" stroke="currentColor" />

        <path d="M30 450H870" stroke="currentColor" />

        <path d="M153 153L747 747" stroke="currentColor" />

        <path d="M747 153L153 747" stroke="currentColor" />

        <circle cx="450" cy="450" r="8" fill="#fbb216" />
      </motion.svg>

      {/* Secondary geometry */}

      <motion.svg
        viewBox="0 0 420 420"
        fill="none"
        className="
          absolute
          -bottom-44
          -left-40
          hidden
          size-[500px]
          text-solar
          opacity-[0.03]

          lg:block
        "
        animate={
          reduceMotion
            ? undefined
            : {
                rotate: -360,
              }
        }
        transition={
          reduceMotion
            ? undefined
            : {
                duration: 190,
                repeat: Infinity,
                ease: "linear",
              }
        }
      >
        <circle cx="210" cy="210" r="90" stroke="currentColor" />

        <circle
          cx="210"
          cy="210"
          r="150"
          stroke="currentColor"
          strokeDasharray="3 13"
        />

        <circle cx="210" cy="210" r="195" stroke="currentColor" />

        <path d="M210 20V400" stroke="currentColor" />

        <path d="M20 210H400" stroke="currentColor" />
      </motion.svg>
    </div>
  );
}

/* =========================================================
   Footer
   ========================================================= */

export function Footer() {
  const reduceMotion = useReducedMotion();

  return (
    <footer
      className="
        relative
        isolate
        overflow-hidden
        bg-ink
        text-paper
      "
    >
      {/* Brand accent */}

      <div
        aria-hidden="true"
        className="
          absolute
          inset-x-0
          top-0
          z-20
          h-[2px]
          bg-solar
        "
      />

      <FooterBackground reduceMotion={reduceMotion} />

      <Container className="relative">
        {/* =================================================
            Event information rail
            ================================================= */}

        <motion.div
          initial={
            reduceMotion
              ? false
              : {
                  opacity: 0,
                  y: 12,
                }
          }
          whileInView={{
            opacity: 1,
            y: 0,
          }}
          viewport={{
            once: true,
            amount: 0.3,
          }}
          transition={{
            duration: 0.52,
            ease: EASE,
          }}
          className="
            grid
            border-b
            border-paper/10
            py-5

            sm:grid-cols-2
            sm:gap-4

            lg:grid-cols-[1fr_1fr_auto]
            lg:items-center
            lg:gap-8
          "
        >
          {/* Date */}

          <EventDetail
            icon={CalendarDays}
            label="Show Dates"
            value="02–04 October 2026"
          />

          {/* Venue */}

          <EventDetail
            icon={MapPin}
            label="Exhibition Venue"
            value="Auto Cluster, Pune"
          />

          {/* Link */}

          <Link
            href="/visitor"
            className="
              group/visit
              mt-4
              inline-flex
              min-h-10
              items-center
              gap-2
              text-[11px]
              font-semibold
              uppercase
              tracking-[0.11em]
              text-solar

              transition-colors

              hover:text-paper

              sm:col-span-2

              lg:col-span-1
              lg:mt-0
              lg:justify-self-end
            "
          >
            Plan Your Visit
            <ArrowUpRight
              aria-hidden="true"
              className="
                size-3.5

                transition-transform
                duration-300

                group-hover/visit:translate-x-0.5
                group-hover/visit:-translate-y-0.5
              "
              strokeWidth={1.8}
            />
          </Link>
        </motion.div>

        {/* =================================================
            Main footer
            ================================================= */}

        <motion.div
          variants={groupVariants}
          initial={reduceMotion ? false : "hidden"}
          whileInView="visible"
          viewport={{
            once: true,
            amount: 0.08,
            margin: "-30px",
          }}
          className="
            grid
            gap-9
            py-10

            sm:grid-cols-2
            sm:gap-x-10
            sm:gap-y-10

            lg:grid-cols-[1.45fr_0.8fr_0.8fr_1.15fr]
            lg:gap-10
            lg:py-12

            xl:grid-cols-[1.55fr_0.8fr_0.8fr_1.15fr]
            xl:gap-14
          "
        >
          {/* =================================================
              Brand
              ================================================= */}

          <motion.div
            variants={revealVariants}
            className="
              max-w-[390px]
            "
          >
            <Link
              href="/"
              aria-label="India International Solar Show 2026 home"
              className="
                inline-flex
                rounded-xl
                bg-paper
                px-3
                py-2.5
                shadow-[0_8px_28px_rgba(0,0,0,0.12)]

                transition-transform
                duration-300

                hover:-translate-y-0.5
              "
            >
              <Image
                src="/logos/india-solar-logo.png"
                alt="India International Solar Show 2026"
                width={230}
                height={60}
                className="
                  h-auto
                  w-auto
                  max-w-[175px]
                  object-contain

                  sm:max-w-[190px]
                "
              />
            </Link>

            <p
              className="
                mt-5
                max-w-[340px]
                text-[10px]
                font-semibold
                uppercase
                tracking-[0.15em]
                text-solar
              "
            >
              {EVENT.tagline}
            </p>

            <p
              className="
                mt-3
                max-w-[360px]
                text-[13px]
                leading-6
                text-paper/46
              "
            >
              {EVENT.dates.display}
              <br />
              {EVENT.venue.name}, {EVENT.venue.line}, {EVENT.venue.city},{" "}
              {EVENT.venue.country}
            </p>

            {/* Social */}

            <div
              className="
                mt-5
                flex
                items-center
                gap-2
              "
            >
              {SOCIALS.map(({ label, href, icon: SocialIcon }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="
                      group/social
                      flex
                      size-9
                      items-center
                      justify-center
                      rounded-full
                      border
                      border-paper/12
                      bg-paper/[0.035]
                      text-paper/55

                      transition-[transform,background-color,border-color,color]
                      duration-300

                      hover:-translate-y-0.5
                      hover:border-solar
                      hover:bg-solar
                      hover:text-ink
                    "
                >
                  <SocialIcon
                    className="
                        size-[15px]
                      "
                  />
                </a>
              ))}
            </div>
          </motion.div>

          {/* =================================================
              Quick Links
              ================================================= */}

          <motion.div variants={revealVariants}>
            <FooterColumn title="Explore">
              {QUICK_LINKS.map((item) => (
                <FooterLink key={item.href} href={item.href}>
                  {item.label}
                </FooterLink>
              ))}
            </FooterColumn>
          </motion.div>

          {/* =================================================
              Media / More
              ================================================= */}

          <motion.div variants={revealVariants}>
            <FooterColumn title="Discover">
              {MEDIA_LINKS.map((item) => (
                <FooterLink key={item.href} href={item.href}>
                  {item.label}
                </FooterLink>
              ))}

              {MORE_LINKS.slice(0, 4).map((item) => (
                <FooterLink key={item.href} href={item.href}>
                  {item.label}
                </FooterLink>
              ))}
            </FooterColumn>
          </motion.div>

          {/* =================================================
              Contact
              ================================================= */}

          <motion.div variants={revealVariants}>
            <FooterTitle>Contact</FooterTitle>

            <div
              className="
                mt-5
                space-y-4
              "
            >
              {CONTACTS.map((contact) => (
                <div
                  key={contact.email}
                  className="
                    rounded-xl
                    border
                    border-paper/[0.08]
                    bg-paper/[0.025]
                    p-3.5
                  "
                >
                  <a
                    href={`mailto:${contact.email}`}
                    className="
                      group/contact
                      flex
                      items-start
                      gap-3
                      text-[12px]
                      leading-5
                      text-paper/48

                      transition-colors

                      hover:text-paper
                    "
                  >
                    <Mail
                      aria-hidden="true"
                      className="
                        mt-0.5
                        size-3.5
                        shrink-0
                        text-solar
                      "
                      strokeWidth={1.8}
                    />

                    <span
                      className="
                        min-w-0
                        break-all
                      "
                    >
                      {contact.email}
                    </span>
                  </a>

                  <a
                    href={contact.phoneHref}
                    className="
                      group/phone
                      mt-2.5
                      flex
                      items-center
                      gap-3
                      text-[12px]
                      text-paper/48

                      transition-colors

                      hover:text-paper
                    "
                  >
                    <Phone
                      aria-hidden="true"
                      className="
                        size-3.5
                        shrink-0
                        text-solar
                      "
                      strokeWidth={1.8}
                    />

                    {contact.phone}
                  </a>
                </div>
              ))}
            </div>

            {/* Organizer */}

            <div
              className="
                mt-5
                border-t
                border-paper/10
                pt-4
              "
            >
              <p
                className="
                  text-[9px]
                  font-semibold
                  uppercase
                  tracking-[0.14em]
                  text-paper/30
                "
              >
                Organised By
              </p>

              <p
                className="
                  mt-1.5
                  text-[12px]
                  font-semibold
                  leading-5
                  text-paper/68
                "
              >
                {EVENT.organizer.fullName}
              </p>
            </div>
          </motion.div>
        </motion.div>

        {/* =================================================
            Mid utility rail
            ================================================= */}

        <motion.div
          initial={
            reduceMotion
              ? false
              : {
                  opacity: 0,
                  y: 10,
                }
          }
          whileInView={{
            opacity: 1,
            y: 0,
          }}
          viewport={{
            once: true,
          }}
          transition={{
            duration: 0.5,
            ease: EASE,
          }}
          className="
            grid
            gap-3
            border-t
            border-paper/10
            py-5

            sm:grid-cols-2
          "
        >
          {/* Gallery */}

          <FooterUtilityLink
            href="/gallery"
            icon={Images}
            label="Event Gallery"
            description="Explore photos and show highlights."
          />

          {/* Brochure */}

          <FooterUtilityLink
            href="/downloads"
            icon={Download}
            label="Official Brochure"
            description="Download event information and participation details."
          />
        </motion.div>

        {/* =================================================
            Bottom
            ================================================= */}

        <div
          className="
            flex
            flex-col
            gap-3
            border-t
            border-paper/10
            py-5
            text-[10px]
            leading-5
            text-paper/30

            sm:flex-row
            sm:items-center
            sm:justify-between
          "
        >
          <p>
            © {new Date().getFullYear()} {EVENT.nameWithYear}. All rights
            reserved.
          </p>

          <div
            className="
              flex
              flex-wrap
              gap-x-5
              gap-y-1.5
            "
          >
            <Link
              href="/privacy-policy"
              className="
                transition-colors
                hover:text-paper
              "
            >
              Privacy Policy
            </Link>

            <Link
              href="/terms-conditions"
              className="
                transition-colors
                hover:text-paper
              "
            >
              Terms & Conditions
            </Link>
          </div>
        </div>
      </Container>
    </footer>
  );
}

/* =========================================================
   Event Detail
   ========================================================= */

function EventDetail({
  icon: Icon,
  label,
  value,
}: {
  icon: React.ElementType;
  label: string;
  value: string;
}) {
  return (
    <div
      className="
        flex
        items-center
        gap-3
        py-2
      "
    >
      <div
        className="
          flex
          size-9
          shrink-0
          items-center
          justify-center
          rounded-full
          border
          border-paper/10
          bg-paper/[0.035]
          text-solar
        "
      >
        <Icon aria-hidden="true" className="size-4" strokeWidth={1.8} />
      </div>

      <div>
        <p
          className="
            text-[9px]
            font-semibold
            uppercase
            tracking-[0.13em]
            text-paper/30
          "
        >
          {label}
        </p>

        <p
          className="
            mt-0.5
            text-[12px]
            font-semibold
            text-paper/76
          "
        >
          {value}
        </p>
      </div>
    </div>
  );
}

/* =========================================================
   Footer Column
   ========================================================= */

function FooterColumn({
  title,
  children,
}: {
  title: string;
  children: ReactNode;
}) {
  return (
    <div>
      <FooterTitle>{title}</FooterTitle>

      <div
        className="
          mt-5
          flex
          flex-col
          gap-2.5
        "
      >
        {children}
      </div>
    </div>
  );
}

/* =========================================================
   Footer Title
   ========================================================= */

function FooterTitle({ children }: { children: ReactNode }) {
  return (
    <div
      className="
        flex
        items-center
        gap-2.5
      "
    >
      <span
        aria-hidden="true"
        className="
          h-px
          w-5
          bg-solar
        "
      />

      <h3
        className="
          font-body
          text-[10px]
          font-semibold
          uppercase
          tracking-[0.14em]
          text-paper/80
        "
      >
        {children}
      </h3>
    </div>
  );
}

/* =========================================================
   Footer Link
   ========================================================= */

function FooterLink({ href, children }: { href: string; children: ReactNode }) {
  return (
    <Link
      href={href}
      className="
        group/link
        flex
        w-fit
        items-center
        gap-2
        text-[12px]
        leading-5
        text-paper/46

        transition-colors
        duration-300

        hover:text-paper
      "
    >
      <span
        aria-hidden="true"
        className="
          h-px
          w-2
          bg-paper/18

          transition-[width,background-color]
          duration-300

          group-hover/link:w-4
          group-hover/link:bg-solar
        "
      />

      {children}
    </Link>
  );
}

/* =========================================================
   Utility Link
   ========================================================= */

function FooterUtilityLink({
  href,
  icon: Icon,
  label,
  description,
}: {
  href: string;
  icon: React.ElementType;
  label: string;
  description: string;
}) {
  return (
    <Link
      href={href}
      className="
        group/utility
        flex
        items-center
        gap-3
        rounded-xl
        border
        border-paper/[0.08]
        bg-paper/[0.025]
        px-4
        py-3

        transition-[background-color,border-color]
        duration-300

        hover:border-paper/15
        hover:bg-paper/[0.045]
      "
    >
      <div
        className="
          flex
          size-9
          shrink-0
          items-center
          justify-center
          rounded-full
          bg-solar/10
          text-solar

          transition-[background-color,color]
          duration-300

          group-hover/utility:bg-solar
          group-hover/utility:text-ink
        "
      >
        <Icon aria-hidden="true" className="size-4" strokeWidth={1.8} />
      </div>

      <div className="min-w-0 flex-1">
        <p
          className="
            text-[11px]
            font-semibold
            text-paper/78
          "
        >
          {label}
        </p>

        <p
          className="
            mt-0.5
            truncate
            text-[10px]
            text-paper/32
          "
        >
          {description}
        </p>
      </div>

      <ArrowUpRight
        aria-hidden="true"
        className="
          size-3.5
          shrink-0
          text-paper/20

          transition-[transform,color]
          duration-300

          group-hover/utility:translate-x-0.5
          group-hover/utility:-translate-y-0.5
          group-hover/utility:text-solar
        "
        strokeWidth={1.8}
      />
    </Link>
  );
}
