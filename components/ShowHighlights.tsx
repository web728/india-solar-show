import { SHOW_HIGHLIGHTS } from "@/data/siteData";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { AnimatedCard } from "@/components/ui/AnimatedCard";
import { Icon } from "@/components/ui/Icon";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";

export function ShowHighlights() {
  return (
    <section id="highlights" className="relative overflow-hidden bg-[color:var(--color-metal)] py-24 sm:py-32">
      <div className="absolute inset-0 bg-dot-grid opacity-30" aria-hidden="true" />
      <Container className="relative">
        <SectionHeading eyebrow="Show Highlights" heading="What to Expect on the Show Floor" align="center" />

        <div className="mt-14 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4 lg:auto-rows-[190px] lg:grid-flow-dense">
          {SHOW_HIGHLIGHTS.map((item, i) => {
            const featured = i === 0;
            return (
              <AnimatedCard
                key={item.title}
                delay={i * 0.06}
                className={cn(
                  "relative overflow-hidden",
                  featured
                    ? "flex flex-col justify-between border-white/10 bg-[color:var(--color-navy)] p-8 hover:border-[color:var(--color-carrot)]/50 hover:shadow-[0_20px_60px_-20px_rgba(247,148,29,0.4)] sm:col-span-2 lg:col-span-2 lg:row-span-2"
                    : "p-6"
                )}
              >
              {featured && (
  <>
    {/* Background Image */}
    <div
      className="absolute inset-0 bg-cover bg-center opacity-30"
      style={{
        backgroundImage:
          "url('https://iievshow.com/wp-content/uploads/2023/03/plugged-chargers-into-two-electric-cars-charge-station-scaled.jpg')",
      }}
    />

    {/* Dark Overlay */}
    <div className="absolute inset-0 bg-[color:var(--color-navy)]/15" />

    {/* Existing Effects */}
    <div className="absolute inset-0 bg-solar-grid opacity-25" aria-hidden="true" />
    <div
      className="absolute -bottom-16 -right-16 h-56 w-56 rounded-full radial-glow-carrot"
      aria-hidden="true"
    />
  </>
)}
                <div className="relative">
                  <span
                    className={cn(
                      "flex items-center justify-center rounded-2xl transition-transform duration-300 group-hover:-translate-y-1 group-hover:scale-105",
                      featured
                        ? "h-16 w-16 bg-[color:var(--color-carrot)]/20 text-[color:var(--color-carrot)]"
                        : "h-12 w-12 bg-[color:var(--color-carrot)]/10 text-[color:var(--color-carrot)]"
                    )}
                  >
                    <Icon name={item.icon} size={featured ? 30 : 22} aria-hidden="true" />
                  </span>
                  {featured && (
                    <span className="ml-0 mt-4 inline-block rounded-full bg-white/10 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.15em] text-[color:var(--color-sky)]">
                      Featured
                    </span>
                  )}
                  <h3
                    className={cn(
                      "mt-4 font-bold",
                      featured ? "text-2xl text-white" : "text-base text-[color:var(--color-navy)]"
                    )}
                  >
                    {item.title}
                  </h3>
                  <p className={cn("mt-1.5 leading-relaxed", featured ? "max-w-md text-sm text-white/65" : "text-sm text-slate-500")}>
                    {item.desc}
                  </p>
                </div>
              </AnimatedCard>
            );
          })}
        </div>

        <div className="mt-14 flex justify-center">
          <Button href="https://app.warpbay.com/E2yy0Klq" size="lg" glow className="btn-shine">
            Explore Participation Opportunities
          </Button>
        </div>
      </Container>
    </section>
  );
}
