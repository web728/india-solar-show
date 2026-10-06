"use client";

import { useEffect, useState } from "react";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

import {
  AnimatePresence,
  motion,
  useMotionValueEvent,
  useScroll,
} from "framer-motion";

import {
  ArrowUpRight,
  BookOpen,
  Building2,
  ChevronDown,
  ClipboardCheck,
  Download,
  Handshake,
  Images,
  Menu,
  Presentation,
  UserCheck,
  X,
} from "lucide-react";

import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { cn } from "@/lib/utils";

/* =========================================================
   Types
   ========================================================= */

type NavChild = {
  label: string;
  href: string;
  icon?: React.ElementType;
  description?: string;
};

type NavItem = {
  label: string;
  href?: string;
  children?: readonly NavChild[];
};

/* =========================================================
   URLs
   ========================================================= */

const STALL_URL = "https://app.warpbay.com/E2yy0Klq";
const VISITOR_URL = "https://app.warpbay.com/qPMIy6ii";

/* =========================================================
   Main Navigation
   ========================================================= */

const HEADER_NAV: NavItem[] = [
  {
    label: "Home",
    href: "/",
  },

  {
    label: "About",
    href: "/about",
    children: [
      {
        label: "About the Show",
        href: "/about",
        icon: BookOpen,
        description: "Discover India International Solar Show 2026.",
      },
      {
        label: "Venue",
        href: "/venue",
        icon: Building2,
        description: "Auto Cluster Exhibition Center, Pune.",
      },
    ],
  },

  {
    label: "Exhibit",
    href: "/exhibitor",
    children: [
      {
        label: "Exhibitor Information",
        href: "/exhibitor",
        icon: Building2,
        description: "Explore exhibiting benefits, opportunities and show details.",
      },
      {
        label: "Exhibitor Registration",
        href: "/exhibitor-registration",
        icon: ClipboardCheck,
        description: "Register your interest and request stall options and pricing.",
      },
    ],
  },

  {
    label: "Visit",
    href: "/visitor",
    children: [
      {
        label: "Visitor Information",
        href: "/visitor",
        icon: BookOpen,
        description: "Plan your visit and discover what to expect at the show.",
      },
      {
        label: "Visitor Registration",
        href: "/visitor-registration",
        icon: UserCheck,
        description: "Register as a visitor for India International Solar Show 2026.",
      },
    ],
  },

  {
    label: "Participate",
    children: [
      {
        label: "Sponsors & Partners",
        href: "/sponsors",
        icon: Handshake,
        description: "Explore sponsorship and partnership opportunities.",
      },
      {
        label: "Conference",
        href: "https://bharatemmsummit.com/",
        icon: Presentation,
        description: "Explore conference sessions and industry dialogue.",
      },
    ],
  },

  {
    label: "Media",
    children: [
      {
        label: "Gallery",
        href: "/gallery",
        icon: Images,
        description: "Explore event moments, highlights and show visuals.",
      },
      {
        label: "Download Brochure",
        href: "/brochure",
        icon: Download,
        description: "Access the official event brochure and downloads.",
      },
    ],
  },

  {
    label: "Contact",
    href: "/contact",
  },
];

/* =========================================================
   Top Strip
   ========================================================= */

const TICKER = [
  "India International Solar Show 2026",
  "02–04 October 2026",
  "Auto Cluster, Pune",
  "3-Day B2B Expo",
  "Solar + Storage + EV Ecosystem",
];

/* =========================================================
   Motion
   ========================================================= */

const EASE = [0.16, 1, 0.3, 1] as const;

/* =========================================================
   Desktop Dropdown
   ========================================================= */

function DesktopDropdown({
  item,
  pathname,
}: {
  item: NavItem;
  pathname: string;
}) {
  if (!item.children?.length) {
    return null;
  }

  return (
    <motion.div
      initial={{
        opacity: 0,
        y: 8,
        scale: 0.985,
      }}
      animate={{
        opacity: 1,
        y: 0,
        scale: 1,
      }}
      exit={{
        opacity: 0,
        y: 6,
        scale: 0.985,
      }}
      transition={{
        duration: 0.22,
        ease: EASE,
      }}
      className="
        absolute
        left-1/2
        top-full
        w-[340px]
        -translate-x-1/2
        pt-3
      "
    >
      <div
        className="
          relative
          overflow-hidden
          rounded-2xl
          border
          border-ink/[0.08]
          bg-paper/[0.98]
          p-2
          shadow-[0_24px_65px_rgba(25,25,25,0.14)]
          backdrop-blur-xl
        "
      >
        <div
          aria-hidden="true"
          className="
            absolute
            inset-x-0
            top-0
            h-[2px]
            bg-gradient-to-r
            from-solar
            via-solar/70
            to-transparent
          "
        />

        <motion.div
          aria-hidden="true"
          className="
            pointer-events-none
            absolute
            -right-14
            -top-14
            size-36
            rounded-full
            bg-solar/[0.08]
            blur-3xl
          "
          animate={{
            scale: [1, 1.08, 1],
            opacity: [0.7, 1, 0.7],
          }}
          transition={{
            duration: 4.5,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />

        <div className="relative">
          {item.children.map((child) => {
            const Icon = child.icon;

            const childActive =
              pathname === child.href ||
              (!child.href.includes("#") &&
                child.href !== "/" &&
                pathname.startsWith(child.href));

            return (
              <Link
                key={child.href}
                href={child.href}
                className={cn(
                  `
                    group/drop
                    flex
                    items-start
                    gap-3.5
                    rounded-xl
                    px-3.5
                    py-3
                    transition-colors
                    duration-200
                  `,
                  childActive
                    ? "bg-blue/[0.065]"
                    : "hover:bg-solar/[0.07]",
                )}
              >
                {Icon ? (
                  <div
                    className={cn(
                      `
                        mt-0.5
                        flex
                        size-9
                        shrink-0
                        items-center
                        justify-center
                        rounded-full
                        border
                        transition-[background-color,border-color,color,transform]
                        duration-300
                      `,
                      childActive
                        ? "border-blue/15 bg-blue text-paper"
                        : `
                          border-ink/[0.08]
                          bg-paper
                          text-blue
                          group-hover/drop:scale-[1.04]
                          group-hover/drop:border-solar
                          group-hover/drop:bg-solar
                          group-hover/drop:text-ink
                        `,
                    )}
                  >
                    <Icon
                      aria-hidden="true"
                      className="size-4"
                      strokeWidth={1.75}
                    />
                  </div>
                ) : null}

                <div className="min-w-0 flex-1">
                  <div className="flex items-center justify-between gap-3">
                    <span
                      className={cn(
                        "text-[13px] font-semibold",
                        childActive ? "text-blue" : "text-ink",
                      )}
                    >
                      {child.label}
                    </span>

                    <ArrowUpRight
                      aria-hidden="true"
                      className="
                        size-3.5
                        shrink-0
                        text-ink/20
                        transition-[transform,color]
                        duration-300
                        group-hover/drop:translate-x-0.5
                        group-hover/drop:-translate-y-0.5
                        group-hover/drop:text-blue
                      "
                      strokeWidth={1.8}
                    />
                  </div>

                  {child.description ? (
                    <p
                      className="
                        mt-1
                        text-[11px]
                        leading-[1.55]
                        text-ink/42
                      "
                    >
                      {child.description}
                    </p>
                  ) : null}
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </motion.div>
  );
}

/* =========================================================
   Header
   ========================================================= */

export function Header() {
  const pathname = usePathname();
  const { scrollY } = useScroll();

  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [desktopDropdown, setDesktopDropdown] = useState<string | null>(null);
  const [mobileDropdown, setMobileDropdown] = useState<string | null>(null);

  useMotionValueEvent(scrollY, "change", (latest) => {
    setScrolled(latest > 16);
  });

  useEffect(() => {
    setMenuOpen(false);
    setDesktopDropdown(null);
    setMobileDropdown(null);
  }, [pathname]);

  useEffect(() => {
    if (!menuOpen) {
      document.body.style.overflow = "";
      return;
    }

    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  function isItemActive(item: NavItem) {
    const parentActive =
      item.href &&
      (pathname === item.href ||
        (item.href !== "/" && pathname.startsWith(item.href)));

    const childActive = item.children?.some((child) => {
      if (child.href.includes("#")) {
        return false;
      }

      return (
        pathname === child.href ||
        (child.href !== "/" && pathname.startsWith(child.href))
      );
    });

    return Boolean(parentActive || childActive);
  }

  return (
    <header
      className="
        fixed
        inset-x-0
        top-0
        z-50
      "
    >
      {/* ===================================================
          Premium top ticker
          =================================================== */}

      <div
        className="
          relative
          overflow-hidden
          border-b
          border-paper/10
          bg-ink
          text-paper
        "
      >
        <div
          aria-hidden="true"
          className="
            pointer-events-none
            absolute
            right-0
            top-1/2
            size-40
            -translate-y-1/2
            rounded-full
            bg-solar/10
            blur-3xl
          "
        />

        <motion.div
          className="
            relative
            flex
            w-max
            min-w-max
            flex-nowrap
            items-center
            will-change-transform
          "
          animate={{
            x: ["0%", "-50%"],
          }}
          transition={{
            duration: 36,
            repeat: Infinity,
            ease: "linear",
          }}
        >
          {[...TICKER, ...TICKER].map((item, index) => (
            <div
              key={`${item}-${index}`}
              className="
                flex
                h-8
                shrink-0
                items-center
                gap-3
                px-5
                sm:px-7
              "
            >
              <span
                aria-hidden="true"
                className="size-1.5 rounded-full bg-solar"
              />

              <span
                className="
                  whitespace-nowrap
                  text-[9px]
                  font-semibold
                  uppercase
                  tracking-[0.14em]
                  text-paper/65
                  sm:text-[10px]
                "
              >
                {item}
              </span>
            </div>
          ))}
        </motion.div>
      </div>

      {/* ===================================================
          Main navigation
          =================================================== */}

      <motion.div
        animate={{
          boxShadow: scrolled
            ? "0 14px 42px rgba(25,25,25,0.09)"
            : "0 0 0 rgba(25,25,25,0)",
        }}
        transition={{
          duration: 0.3,
          ease: EASE,
        }}
        className="
          border-b
          border-ink/[0.08]
          bg-paper/[0.94]
          backdrop-blur-xl
        "
      >
        <Container>
          <div
            className="
              flex
              h-[68px]
              items-center
              justify-between
              gap-4
              sm:h-[72px]
              lg:h-[76px]
              lg:gap-4
            "
          >
            {/* Logo */}

            <Link
              href="/"
              aria-label="India International Solar Show home"
              className="relative z-10 shrink-0"
            >
              <Image
                src="/logos/india-solar-logo.png"
                alt="India International Solar Show 2026"
                width={230}
                height={60}
                priority
                className="
                  h-auto
                  w-auto
                  max-w-[158px]
                  object-contain
                  sm:max-w-[178px]
                  lg:max-w-[185px]
                  xl:max-w-[195px]
                "
              />
            </Link>

            {/* Desktop Navigation */}

            <nav
              aria-label="Primary navigation"
              className="
                hidden
                h-full
                min-w-0
                flex-1
                justify-center
                lg:flex
              "
            >
              {HEADER_NAV.map((item) => {
                const hasChildren = Boolean(item.children?.length);
                const open = desktopDropdown === item.label;
                const active = isItemActive(item);

                return (
                  <div
                    key={item.label}
                    className="relative flex h-full items-center"
                    onMouseEnter={() => {
                      if (hasChildren) {
                        setDesktopDropdown(item.label);
                      }
                    }}
                    onMouseLeave={() => {
                      if (hasChildren) {
                        setDesktopDropdown(null);
                      }
                    }}
                  >
                    {item.href ? (
                      <Link
                        href={item.href}
                        className={cn(
                          `
                            group/nav
                            relative
                            flex
                            h-full
                            items-center
                            gap-1.5
                            px-2.5
                            text-[12px]
                            font-semibold
                            tracking-[-0.005em]
                            transition-colors
                            duration-300
                            xl:px-3.5
                            xl:text-[13px]
                          `,
                          active
                            ? "text-blue"
                            : "text-ink/58 hover:text-ink",
                        )}
                      >
                        {item.label}

                        {hasChildren ? (
                          <ChevronDown
                            aria-hidden="true"
                            className={cn(
                              `
                                size-3.5
                                text-ink/30
                                transition-transform
                                duration-300
                              `,
                              open && "rotate-180 text-blue",
                            )}
                            strokeWidth={1.8}
                          />
                        ) : null}

                        {active ? (
                          <motion.span
                            layoutId="header-active-link"
                            aria-hidden="true"
                            transition={{
                              duration: 0.3,
                              ease: EASE,
                            }}
                            className="
                              absolute
                              inset-x-2.5
                              bottom-0
                              h-[2px]
                              bg-solar
                              xl:inset-x-3.5
                            "
                          />
                        ) : null}
                      </Link>
                    ) : (
                      <button
                        type="button"
                        className={cn(
                          `
                            group/nav
                            relative
                            flex
                            h-full
                            items-center
                            gap-1.5
                            px-2.5
                            text-[12px]
                            font-semibold
                            tracking-[-0.005em]
                            transition-colors
                            duration-300
                            xl:px-3.5
                            xl:text-[13px]
                          `,
                          active || open
                            ? "text-blue"
                            : "text-ink/58 hover:text-ink",
                        )}
                      >
                        {item.label}

                        <ChevronDown
                          aria-hidden="true"
                          className={cn(
                            `
                              size-3.5
                              text-ink/30
                              transition-transform
                              duration-300
                            `,
                            open && "rotate-180 text-blue",
                          )}
                          strokeWidth={1.8}
                        />

                        {active ? (
                          <motion.span
                            layoutId="header-active-link"
                            aria-hidden="true"
                            className="
                              absolute
                              inset-x-2.5
                              bottom-0
                              h-[2px]
                              bg-solar
                            "
                          />
                        ) : null}
                      </button>
                    )}

                    <AnimatePresence>
                      {hasChildren && open ? (
                        <DesktopDropdown
                          item={item}
                          pathname={pathname}
                        />
                      ) : null}
                    </AnimatePresence>
                  </div>
                );
              })}
            </nav>

            {/* Desktop CTA */}

            <div className="hidden shrink-0 items-center gap-2 lg:flex">
              <Button
                href={STALL_URL}
                external
                size="md"
                className="group/stall whitespace-nowrap"
              >
                Book Your Stall

                <ArrowUpRight
                  aria-hidden="true"
                  className="
                    size-3.5
                    transition-transform
                    duration-300
                    group-hover/stall:translate-x-0.5
                    group-hover/stall:-translate-y-0.5
                  "
                  strokeWidth={1.8}
                />
              </Button>
            </div>

            {/* Mobile trigger */}

            <button
              type="button"
              onClick={() => setMenuOpen((current) => !current)}
              aria-expanded={menuOpen}
              aria-controls="mobile-navigation"
              aria-label={
                menuOpen ? "Close navigation menu" : "Open navigation menu"
              }
              className="
                relative
                flex
                size-10
                shrink-0
                items-center
                justify-center
                rounded-xl
                border
                border-ink/[0.08]
                bg-paper
                text-ink
                shadow-[0_5px_18px_rgba(25,25,25,0.035)]
                transition-[border-color,background-color]
                duration-300
                hover:border-blue/20
                hover:bg-blue/[0.05]
                lg:hidden
              "
            >
              <AnimatePresence initial={false} mode="wait">
                {menuOpen ? (
                  <motion.span
                    key="close"
                    initial={{
                      opacity: 0,
                      scale: 0.8,
                      rotate: -40,
                    }}
                    animate={{
                      opacity: 1,
                      scale: 1,
                      rotate: 0,
                    }}
                    exit={{
                      opacity: 0,
                      scale: 0.8,
                      rotate: 40,
                    }}
                    transition={{
                      duration: 0.18,
                    }}
                  >
                    <X className="size-5" strokeWidth={1.8} />
                  </motion.span>
                ) : (
                  <motion.span
                    key="menu"
                    initial={{
                      opacity: 0,
                      scale: 0.8,
                      rotate: 40,
                    }}
                    animate={{
                      opacity: 1,
                      scale: 1,
                      rotate: 0,
                    }}
                    exit={{
                      opacity: 0,
                      scale: 0.8,
                      rotate: -40,
                    }}
                    transition={{
                      duration: 0.18,
                    }}
                  >
                    <Menu className="size-5" strokeWidth={1.8} />
                  </motion.span>
                )}
              </AnimatePresence>
            </button>
          </div>
        </Container>
      </motion.div>

      {/* ===================================================
          Mobile menu
          =================================================== */}

      <AnimatePresence>
        {menuOpen ? (
          <>
            <motion.button
              type="button"
              aria-label="Close menu"
              onClick={() => setMenuOpen(false)}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="
                fixed
                inset-0
                -z-10
                bg-ink/25
                backdrop-blur-[2px]
                lg:hidden
              "
            />

            <motion.div
              id="mobile-navigation"
              initial={{
                opacity: 0,
                y: -10,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              exit={{
                opacity: 0,
                y: -8,
              }}
              transition={{
                duration: 0.25,
                ease: EASE,
              }}
              className="
                absolute
                inset-x-0
                top-full
                max-h-[calc(100svh-100px)]
                overflow-y-auto
                border-t
                border-ink/[0.08]
                bg-paper
                shadow-[0_25px_60px_rgba(25,25,25,0.14)]
                lg:hidden
              "
            >
              <Container>
                <nav aria-label="Mobile navigation" className="py-3">
                  <div
                    className="
                      overflow-hidden
                      rounded-2xl
                      border
                      border-ink/[0.08]
                      bg-paper
                    "
                  >
                    {HEADER_NAV.map((item) => {
                      const hasChildren = Boolean(item.children?.length);
                      const open = mobileDropdown === item.label;
                      const active = isItemActive(item);

                      return (
                        <div
                          key={item.label}
                          className="
                            border-b
                            border-ink/[0.07]
                            last:border-b-0
                          "
                        >
                          <div className="flex items-center">
                            {item.href ? (
                              <Link
                                href={item.href}
                                className={cn(
                                  `
                                    relative
                                    flex
                                    min-h-[52px]
                                    flex-1
                                    items-center
                                    px-4
                                    text-[14px]
                                    font-semibold
                                    transition-colors
                                  `,
                                  active
                                    ? "bg-blue/[0.045] text-blue"
                                    : "text-ink/70",
                                )}
                              >
                                {item.label}

                                {active ? (
                                  <span
                                    aria-hidden="true"
                                    className="
                                      absolute
                                      bottom-0
                                      left-4
                                      h-[2px]
                                      w-7
                                      bg-solar
                                    "
                                  />
                                ) : null}
                              </Link>
                            ) : (
                              <button
                                type="button"
                                onClick={() =>
                                  setMobileDropdown(
                                    open ? null : item.label,
                                  )
                                }
                                className={cn(
                                  `
                                    relative
                                    flex
                                    min-h-[52px]
                                    flex-1
                                    items-center
                                    px-4
                                    text-left
                                    text-[14px]
                                    font-semibold
                                  `,
                                  active
                                    ? "bg-blue/[0.045] text-blue"
                                    : "text-ink/70",
                                )}
                              >
                                {item.label}
                              </button>
                            )}

                            {hasChildren ? (
                              <button
                                type="button"
                                onClick={() =>
                                  setMobileDropdown(
                                    open ? null : item.label,
                                  )
                                }
                                aria-expanded={open}
                                aria-label={`Toggle ${item.label} menu`}
                                className="
                                  flex
                                  size-[52px]
                                  shrink-0
                                  items-center
                                  justify-center
                                  border-l
                                  border-ink/[0.07]
                                  text-ink/45
                                "
                              >
                                <ChevronDown
                                  aria-hidden="true"
                                  className={cn(
                                    `
                                      size-4
                                      transition-transform
                                      duration-300
                                    `,
                                    open && "rotate-180 text-blue",
                                  )}
                                  strokeWidth={1.8}
                                />
                              </button>
                            ) : null}
                          </div>

                          <AnimatePresence initial={false}>
                            {hasChildren && open ? (
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
                                  ease: EASE,
                                }}
                                className="overflow-hidden"
                              >
                                <div
                                  className="
                                    border-t
                                    border-ink/[0.06]
                                    bg-blue/[0.025]
                                    p-2
                                  "
                                >
                                  {item.children?.map((child) => {
                                    const Icon = child.icon;
                                    const childActive =
                                      pathname === child.href ||
                                      pathname.startsWith(child.href);

                                    return (
                                      <Link
                                        key={child.href}
                                        href={child.href}
                                        className={cn(
                                          `
                                            group/mobile-child
                                            flex
                                            items-center
                                            gap-3
                                            rounded-xl
                                            px-3
                                            py-2.5
                                            transition-colors
                                          `,
                                          childActive
                                            ? "bg-paper text-blue"
                                            : "hover:bg-paper",
                                        )}
                                      >
                                        {Icon ? (
                                          <div
                                            className={cn(
                                              `
                                                flex
                                                size-8
                                                shrink-0
                                                items-center
                                                justify-center
                                                rounded-full
                                                border
                                              `,
                                              childActive
                                                ? "border-blue/15 bg-blue text-paper"
                                                : "border-ink/[0.07] bg-paper text-blue",
                                            )}
                                          >
                                            <Icon
                                              aria-hidden="true"
                                              className="size-3.5"
                                              strokeWidth={1.8}
                                            />
                                          </div>
                                        ) : null}

                                        <div className="min-w-0 flex-1">
                                          <div className="flex items-center justify-between gap-3">
                                            <span
                                              className={cn(
                                                "text-[13px] font-semibold",
                                                childActive
                                                  ? "text-blue"
                                                  : "text-ink/70",
                                              )}
                                            >
                                              {child.label}
                                            </span>

                                            <ArrowUpRight
                                              aria-hidden="true"
                                              className="
                                                size-3
                                                text-ink/20
                                              "
                                              strokeWidth={1.8}
                                            />
                                          </div>

                                          {child.description ? (
                                            <p
                                              className="
                                                mt-0.5
                                                text-[10px]
                                                leading-4
                                                text-ink/38
                                              "
                                            >
                                              {child.description}
                                            </p>
                                          ) : null}
                                        </div>
                                      </Link>
                                    );
                                  })}
                                </div>
                              </motion.div>
                            ) : null}
                          </AnimatePresence>
                        </div>
                      );
                    })}
                  </div>

                  {/* Mobile CTA */}

                  <div
                    className="
                      grid
                      gap-2.5
                      py-4
                      sm:grid-cols-2
                    "
                  >
                    <Button
                      href={STALL_URL}
                      external
                      fullWidth
                      size="lg"
                      className="
                        group/stall-mobile
                        justify-between
                      "
                    >
                      Book Your Stall

                      <ArrowUpRight
                        aria-hidden="true"
                        className="
                          size-4
                          transition-transform
                          duration-300
                          group-hover/stall-mobile:translate-x-0.5
                          group-hover/stall-mobile:-translate-y-0.5
                        "
                        strokeWidth={1.8}
                      />
                    </Button>

                    <Button
                      href={VISITOR_URL}
                      external
                      fullWidth
                      size="lg"
                      variant="outline"
                      className="
                        border-blue/20
                        bg-blue/[0.05]
                        text-blue
                        hover:border-blue
                        hover:bg-blue
                        hover:text-paper
                      "
                    >
                      Register as Visitor
                    </Button>
                  </div>
                </nav>
              </Container>
            </motion.div>
          </>
        ) : null}
      </AnimatePresence>
    </header>
  );
}
