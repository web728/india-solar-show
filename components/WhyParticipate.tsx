import { WHY_PARTICIPATE } from "@/data/siteData";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { AnimatedCard } from "@/components/ui/AnimatedCard";
import { Icon } from "@/components/ui/Icon";
import { Button } from "@/components/ui/Button";
import { EnergyPulseLine } from "@/components/EnergyPulseLine";

export function WhyParticipate() {
  return (
    <section className="relative overflow-hidden bg-[color:var(--color-solar-black)] py-24 sm:py-32">
      <div className="absolute inset-0 bg-solar-grid opacity-[0.12]" aria-hidden="true" />
      <EnergyPulseLine className="absolute inset-x-0 top-1/3 h-40 w-full opacity-[0.08]" />
      <Container className="relative">
        <SectionHeading
          eyebrow="Why Exhibit in 2026"
          heading="Why Top Brands Exhibit at India's Solar International Show"
          intro="Discover why global solar PV manufacturers, battery energy storage (BESS) suppliers, EPC contractors, and clean-tech leaders exhibit at India Solar International Show in Pune."
          align="center"
          tone="light"
        />

        <div className="mt-14 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {WHY_PARTICIPATE.map((item, i) => (
            <AnimatedCard key={item.title} tone="dark" delay={i * 0.08} className="p-7">
              <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-[color:var(--color-carrot)]/25 to-[color:var(--color-carrot)]/5 text-[color:var(--color-carrot)] transition-transform duration-300 group-hover:-translate-y-1 group-hover:scale-105">
                <Icon name={item.icon} size={26} aria-hidden="true" />
              </span>
              <h3 className="mt-5 text-lg font-bold text-white">{item.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-white/60">{item.desc}</p>
            </AnimatedCard>
          ))}
        </div>

        {/* High-Intent Conversion CTA Box */}
        <div className="gradient-border mx-auto mt-16 flex max-w-3xl flex-col items-center gap-6 rounded-3xl bg-[color:var(--color-navy)]/50 px-8 py-12 text-center">
          <h3 className="text-2xl font-extrabold text-white sm:text-3xl">
            Book Exhibition Stall at India Solar Show 2026 Pune
          </h3>
          <p className="max-w-md text-sm text-white/60 sm:text-base">
            Secure prime exhibition booth space and high-visibility sponsorship packages for Western India's largest solar energy trade fair.
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <Button
              href="https://app.warpbay.com/E2yy0Klq"
              {...({ target: "_blank", rel: "noopener noreferrer" } as any)}
              size="lg"
              glow
              className="btn-shine"
              aria-label="Book exhibition stall online"
            >
              Book Your Stall Now
            </Button>
            <Button
              href="/sponsors"
              variant="secondary"
              size="lg"
              aria-label="Explore sponsorship opportunities"
            >
              Become a Sponsor
            </Button>
            <Button
              href="/contact"
              variant="outline"
              size="lg"
              aria-label="Contact exhibition sales team"
            >
              Contact Sales Team
            </Button>
          </div>
        </div>
      </Container>
    </section>
  );
}