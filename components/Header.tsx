"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ArrowRight, ChevronDown } from "lucide-react";
import { NAV_ITEMS, EVENT } from "@/data/siteData";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";

type NavChild = { label: string; href: string };
type NavItem = { label: string; href: string; children?: readonly NavChild[] };

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [openMobileGroup, setOpenMobileGroup] = useState<string | null>(null);
  const pathname = usePathname();

  useEffect(() => {
    function onScroll() {
      setScrolled(window.scrollY > 24);
    }
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  useEffect(() => {
    setMenuOpen(false);
    setOpenMobileGroup(null);
  }, [pathname]);

  const items = NAV_ITEMS as unknown as NavItem[];

  return (
    <header
      className={cn(
        "fixed top-0 inset-x-0 z-50 transition-all duration-300",
        scrolled ? "py-0" : "py-0 sm:py-0",
      )}
    >
      <div className="w-full overflow-hidden bg-[color:var(--color-black)] border-b border-white/10">
        <div className="flex w-max animate-marquee">
          {[...Array(6)].map((_, i) => (
            <span
              key={i}
              className="shrink-0 px-10 py-2 text-lg sm:text-xl lg:text-xl font-bold tracking-wide uppercase text-[color:var(--color-gold)]"
            >
              {EVENT.tagline} &bull; {EVENT.dates.display}
            </span>
          ))}
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-3 py-2 sm:px-6 lg:px-8">
        <div
          className={cn(
            "flex items-center justify-between rounded-2xl px-2.5 sm:px-4 py-2 transition-all duration-300 border",
            scrolled
              ? "glass-strong shadow-[0_12px_40px_-12px_rgba(0,0,0,0.65)] border-white/10"
              : "bg-transparent border-transparent",
          )}
        >
          <Link
            href="/"
            className="flex items-center gap-2.5 sm:gap-3 rounded-xl bg-white px-3 py-1.5 sm:py-2 shadow-[0_6px_20px_-6px_rgba(0,0,0,0.35)] ring-1 ring-black/5 transition-transform duration-300 hover:scale-[1.02]"
          >
            <Image
              src="/logos/india-solar-logo.png"
              alt="India Solar International Show"
              width={220}
              height={52}
              priority
              className="h-8 sm:h-10 lg:h-11 w-auto"
            />
          </Link>

          <nav
            aria-label="Primary"
            className="hidden lg:flex items-center gap-0.5"
          >
            {items.map((item) => {
              const isActive =
                pathname === item.href ||
                (item.href !== "/" && pathname.startsWith(item.href)) ||
                (item.children?.some(
                  (c) => pathname === c.href || pathname.startsWith(c.href),
                ) ??
                  false);

              if (item.children && item.children.length > 0) {
                const isOpen = openDropdown === item.label;
                return (
                  <div
                    key={item.label}
                    className="relative"
                    onMouseEnter={() => setOpenDropdown(item.label)}
                    onMouseLeave={() => setOpenDropdown(null)}
                  >
                    <Link
                      href={item.href}
                      className={cn(
                        "relative flex items-center gap-1 px-4 py-2.5 text-[15px] font-semibold transition-colors rounded-full",
                        isActive
                          ? "text-[color:var(--color-gold)]"
                          : "text-white/85 hover:text-white",
                      )}
                    >
                      {item.label}
                      <ChevronDown
                        size={14}
                        className={cn(
                          "transition-transform duration-200",
                          isOpen && "rotate-180",
                        )}
                        aria-hidden="true"
                      />
                      {isActive && (
                        <motion.span
                          layoutId="nav-underline"
                          className="absolute left-4 right-4 -bottom-0.5 h-[2.5px] rounded-full bg-[color:var(--color-gold)] shadow-[0_0_10px_2px_rgba(247,148,29,0.7)]"
                          transition={{
                            type: "spring",
                            stiffness: 400,
                            damping: 32,
                          }}
                        />
                      )}
                    </Link>

                    <AnimatePresence>
                      {isOpen && (
                        <motion.div
                          initial={{ opacity: 0, y: -6 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -6 }}
                          transition={{
                            duration: 0.18,
                            ease: [0.16, 1, 0.3, 1],
                          }}
                          className="absolute left-0 top-full pt-2 min-w-[220px]"
                        >
                          <div className="overflow-hidden rounded-xl border border-white/10 bg-[color:var(--color-black)] shadow-[0_20px_50px_-15px_rgba(0,0,0,0.6)]">
                            {item.children.map((child) => {
                              const childActive = pathname === child.href;
                              return (
                                <Link
                                  key={child.href}
                                  href={child.href}
                                  className={cn(
                                    "block px-4 py-3 text-sm font-medium transition-colors",
                                    childActive
                                      ? "bg-white/5 text-[color:var(--color-gold)]"
                                      : "text-white/85 hover:bg-white/5 hover:text-white",
                                  )}
                                >
                                  {child.label}
                                </Link>
                              );
                            })}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              }

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "relative px-4 py-2.5 text-[15px] font-semibold transition-colors rounded-full",
                    isActive
                      ? "text-[color:var(--color-gold)]"
                      : "text-white/85 hover:text-white",
                  )}
                >
                  {item.label}
                  {isActive && (
                    <motion.span
                      layoutId="nav-underline"
                      className="absolute left-4 right-4 -bottom-0.5 h-[2.5px] rounded-full bg-[color:var(--color-gold)] shadow-[0_0_10px_2px_rgba(247,148,29,0.7)]"
                      transition={{
                        type: "spring",
                        stiffness: 400,
                        damping: 32,
                      }}
                    />
                  )}
                </Link>
              );
            })}
          </nav>

          <div className="hidden lg:block">
            <Button
              href="https://app.warpbay.com/E2yy0Klq"
              size="md"
              glow
              className="btn-shine"
            >
              Book Your Stall
              <ArrowRight size={16} aria-hidden="true" />
            </Button>
          </div>

          <button
            type="button"
            onClick={() => setMenuOpen((v) => !v)}
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            className="lg:hidden inline-flex items-center justify-center h-11 w-11 rounded-full transition-colors text-white bg-white/10"
          >
            {menuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            id="mobile-menu"
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="lg:hidden mx-3 mt-2 overflow-hidden rounded-2xl border border-white/10 bg-[color:var(--color-black)] shadow-2xl"
          >
            <div className="h-1 w-full bg-gradient-to-r from-[color:var(--color-gold)] via-[color:var(--color-gold-light)] to-[color:var(--color-gold)]" />
            <nav aria-label="Mobile" className="flex flex-col p-3">
              {items.map((item, i) => {
                const isLast = i === items.length - 1;

                if (item.children && item.children.length > 0) {
                  const isGroupOpen = openMobileGroup === item.label;
                  const groupActive = item.children.some(
                    (c) => pathname === c.href,
                  );
                  return (
                    <div
                      key={item.label}
                      className={cn(!isLast && "border-b border-white/5")}
                    >
                      <button
                        type="button"
                        onClick={() =>
                          setOpenMobileGroup(isGroupOpen ? null : item.label)
                        }
                        aria-expanded={isGroupOpen}
                        className={cn(
                          "flex w-full items-center justify-between px-4 py-4 text-base font-semibold transition-colors",
                          groupActive
                            ? "text-[color:var(--color-gold)]"
                            : "text-white/90 hover:bg-white/5 hover:text-[color:var(--color-gold)]",
                        )}
                      >
                        {item.label}
                        <ChevronDown
                          size={18}
                          className={cn(
                            "transition-transform duration-200",
                            isGroupOpen && "rotate-180",
                          )}
                          aria-hidden="true"
                        />
                      </button>
                      <AnimatePresence>
                        {isGroupOpen && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.2 }}
                            className="overflow-hidden bg-white/[0.03]"
                          >
                            {item.children.map((child) => (
                              <Link
                                key={child.href}
                                href={child.href}
                                className={cn(
                                  "block px-8 py-3 text-sm font-medium transition-colors",
                                  pathname === child.href
                                    ? "text-[color:var(--color-gold)]"
                                    : "text-white/75 hover:text-white",
                                )}
                              >
                                {child.label}
                              </Link>
                            ))}
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  );
                }

                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={cn(
                      "px-4 py-4 text-base font-semibold transition-colors",
                      pathname === item.href
                        ? "text-[color:var(--color-gold)]"
                        : "text-white/90 hover:bg-white/5 hover:text-[color:var(--color-gold)]",
                      !isLast && "border-b border-white/5",
                    )}
                  >
                    {item.label}
                  </Link>
                );
              })}
              <div className="mt-3 grid grid-cols-1 gap-2.5 p-1">
                <Button
                  href="https://app.warpbay.com/E2yy0Klq"
                  className="w-full"
                  glow
                >
                  Book Your Stall
                </Button>
                <Button
                  href="https://app.warpbay.com/qPMIy6ii"
                  variant="outline"
                  className="w-full"
                >
                  Register as Visitor
                </Button>
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
