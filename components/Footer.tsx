import Image from "next/image";
import Link from "next/link";
import { EVENT, FOOTER_LINKS, CONTACTS } from "@/data/siteData";
import { Container } from "@/components/ui/Container";

const SOCIALS = [
  { initial: "f", label: "Facebook", href: "https://www.facebook.com/indiasolarshow/" },
  { initial: "ig", label: "Instagram", href: "https://www.instagram.com/indiasolarshow/" },
  { initial: "in", label: "LinkedIn", href: "https://www.linkedin.com/company/indiasolarshow/" },
];

const QUICK_LINKS = FOOTER_LINKS.slice(0, 8);
const MORE_LINKS = FOOTER_LINKS.slice(8);

export function Footer() {
  return (
    <footer className="relative bg-[color:var(--color-black)] pt-20 pb-8 text-white/70">
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[color:var(--color-gold)]/60 to-transparent" aria-hidden="true" />
      <div className="absolute inset-0 bg-solar-grid opacity-[0.06]" aria-hidden="true" />
      <Container className="relative">
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-5">
          <div className="lg:col-span-2">
            <Image
              src="/logos/india-solar-logo.png"
              alt="India Solar International Show"
              width={400}
              height={60}
              className="h-22 w-50 rounded-lg bg-white/95 px-1.5 py-0.5"
            />
            <p className="mt-4 text-sm font-semibold uppercase tracking-[0.15em] text-[color:var(--color-gold)]">
              {EVENT.tagline}
            </p>
            <p className="mt-4 text-sm leading-relaxed">
              {EVENT.dates.display}
              <br />
              {EVENT.venue.name}, {EVENT.venue.line}, {EVENT.venue.city}, {EVENT.venue.country}
            </p>
            <div className="mt-5 flex gap-3">
              {SOCIALS.map(({ initial, label, href }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="flex h-9 w-9 items-center justify-center rounded-full bg-white/5 text-xs font-bold uppercase transition-colors hover:bg-[color:var(--color-gold)] hover:text-white"
                >
                  {initial}
                </a>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-sm font-bold uppercase tracking-wide text-white">Quick Links</h3>
            <ul className="mt-4 space-y-2.5">
              {QUICK_LINKS.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className="text-sm transition-colors hover:text-[color:var(--color-gold)]">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-bold uppercase tracking-wide text-white">More</h3>
            <ul className="mt-4 space-y-2.5">
              {MORE_LINKS.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className="text-sm transition-colors hover:text-[color:var(--color-gold)]">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-bold uppercase tracking-wide text-white">Contact</h3>
            <ul className="mt-4 space-y-2.5 text-sm">
              {CONTACTS.map((c) => (
                <li key={c.email}>
                  <a href={`mailto:${c.email}`} className="transition-colors hover:text-[color:var(--color-gold)]">
                    {c.email}
                  </a>
                  <br />
                  <a href={c.phoneHref} className="transition-colors hover:text-[color:var(--color-gold)]">
                    {c.phone}
                  </a>
                </li>
              ))}
            </ul>
            <div className="mt-4">
              <h3 className="text-sm font-bold uppercase tracking-wide text-white">Organised By</h3>
              <p className="mt-2 text-sm">{EVENT.organizer.fullName}</p>
            </div>
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-3 border-t border-white/10 pt-6 text-xs sm:flex-row sm:items-center sm:justify-between">
          <p>
            &copy; {new Date().getFullYear()} {EVENT.nameWithYear}. All rights reserved.
          </p>
          <div className="flex gap-4">
            <Link href="/privacy-policy" className="hover:text-[color:var(--color-gold)] transition-colors">
              Privacy Policy
            </Link>
            <Link href="/terms-conditions" className="hover:text-[color:var(--color-gold)] transition-colors">
              Terms & Conditions
            </Link>
          </div>
        </div>
      </Container>
    </footer>
  );
}
