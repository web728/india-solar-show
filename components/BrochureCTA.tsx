import Image from "next/image";
import { FileDown } from "lucide-react";
import { EVENT } from "@/data/siteData";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";

export function BrochureCTA() {
  return (
    <section id="brochure" className="relative overflow-hidden bg-white py-20 sm:py-24">
      <Container>
        <div className="gradient-border relative overflow-hidden rounded-3xl bg-[color:var(--color-black)] px-6 py-14 sm:px-12 sm:py-16">
          <div className="absolute inset-0 bg-solar-grid opacity-10" aria-hidden="true" />
          <div className="absolute -top-20 -right-20 h-72 w-72 rounded-full radial-glow-gold animate-flare-pulse opacity-70" aria-hidden="true" />

          <div className="relative flex flex-col items-center gap-10 text-center sm:flex-row sm:justify-between sm:text-left">
            <div className="max-w-xl">
              <span className="inline-flex items-center gap-2 text-xs sm:text-sm font-semibold tracking-[0.2em] uppercase text-[color:var(--color-gold)]">
                <span className="h-1.5 w-1.5 rounded-full bg-current" />
                Event Brochure
              </span>
              <h2 className="mt-3 text-2xl sm:text-3xl font-extrabold tracking-tight text-white">
                Download Event Brochure
              </h2>
              <p className="mt-3 text-sm sm:text-base leading-relaxed text-white/65">
                Get the full event profile, market scope, exhibitor segments, visitor profile, show highlights, and
                participation benefits for {EVENT.nameWithYear}.
              </p>
              <div className="mt-6">
                <Button href="/downloads" size="lg" glow className="btn-shine shrink-0">
                  <FileDown size={18} aria-hidden="true" />
                  Download Brochure
                </Button>
              </div>
            </div>

            <div className="relative hidden shrink-0 sm:block" aria-hidden="true">
              <div className="absolute -left-3 top-3 h-56 w-40 rotate-[-8deg] rounded-2xl bg-white/10" />
              <div className="absolute -left-1.5 top-1.5 h-56 w-40 rotate-[-4deg] rounded-2xl bg-white/15" />
              <a
                href="/India-Solar-International-Show-Brochure.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="relative block h-56 w-40 overflow-hidden rounded-2xl shadow-2xl"
              >
                <Image
                  src="/brochure-cover.jpg"
                  alt="India Solar Brochure"
                  fill
                  className="object-cover"
                />
              </a>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
