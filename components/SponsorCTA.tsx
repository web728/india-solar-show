import { Award, Star, Lightbulb, Newspaper } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";

const TIERS = [
  { icon: Award, label: "Platinum Partner" },
  { icon: Star, label: "Gold Partner" },
  { icon: Lightbulb, label: "Innovation Partner" },
  { icon: Newspaper, label: "Media Partner" },
];

export function SponsorCTA() {
  return (
    <section className="relative overflow-hidden bg-[color:var(--color-twilight)] py-24 sm:py-32">
      <div className="absolute inset-0 bg-solar-grid opacity-[0.12]" aria-hidden="true" />
      <div className="beam-diagonal top-10 left-[-10%]" aria-hidden="true" />
      <div className="beam-diagonal bottom-0 right-[-10%]" style={{ animationDelay: "2.5s" }} aria-hidden="true" />
      <div
        className="absolute left-1/2 top-0 h-[420px] w-[720px] -translate-x-1/2 rounded-full radial-glow-carrot animate-flare-pulse opacity-70"
        aria-hidden="true"
      />

      <Container className="relative text-center">
        <span className="inline-flex items-center gap-2 text-xs sm:text-sm font-semibold tracking-[0.2em] uppercase text-[color:var(--color-carrot)]">
          <span className="h-1.5 w-1.5 rounded-full bg-current" />
          Partnership
        </span>
        <h2 className="mx-auto mt-4 max-w-3xl text-3xl sm:text-4xl md:text-5xl font-extrabold leading-tight tracking-tight text-white">
          Become a Strategic Partner in India&rsquo;s Clean Energy Growth Story
        </h2>
        <p className="mx-auto mt-5 max-w-2xl text-base sm:text-lg leading-relaxed text-white/70">
          Position your brand in front of renewable energy developers, EPC companies, utilities, investors,
          policymakers, industrial buyers, technology providers, and emerging clean-energy innovators.
        </p>

        <div className="mt-9 flex flex-wrap justify-center gap-3">
          <Button href="/sponsors" size="lg" glow className="btn-shine">
            Sponsor Enquiry
          </Button>
          <Button href="/downloads" variant="outline" size="lg">
            Download Partnership Deck
          </Button>
          <Button href="/contact" variant="ghost" size="lg" className="text-white hover:bg-white/10">
            Contact Sales Team
          </Button>
        </div>

        <div className="mx-auto mt-16 grid max-w-3xl grid-cols-2 gap-4 sm:grid-cols-4">
          {TIERS.map(({ icon: TierIcon, label }) => (
            <div
              key={label}
              className="flex flex-col items-center gap-2.5 rounded-2xl border border-dashed border-white/20 px-4 py-6 transition-colors duration-300 hover:border-[color:var(--color-carrot)]/50"
            >
              <TierIcon size={22} className="text-white/50" aria-hidden="true" />
              <span className="text-xs font-semibold uppercase tracking-wide text-white/50">{label}</span>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
