import { Network, BatteryCharging, Sun, Factory, TrendingUp, Landmark, Cpu, PlugZap, Combine } from "lucide-react";
import { WORKSHOP_THEMES } from "@/data/siteData";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { AnimatedCard } from "@/components/ui/AnimatedCard";
import { Button } from "@/components/ui/Button";

const THEME_ICONS = [Network, BatteryCharging, Sun, Factory, TrendingUp, Landmark, Cpu, PlugZap, Combine];

export function WorkshopThemes() {
  return (
    <section className="relative overflow-hidden bg-white py-24 sm:py-32">
      <div className="absolute inset-0 bg-dot-grid opacity-30" aria-hidden="true" />
      <Container className="relative">
        <SectionHeading
          eyebrow="Knowledge Track"
          heading="Technical Workshops & Conference Themes"
          intro="The show will feature focused knowledge sessions covering renewable energy adoption, grid integration, storage innovation, financing, and industrial energy applications."
        />

        <div className="mt-12 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-3">
          {WORKSHOP_THEMES.map((theme, i) => {
            const ThemeIcon = THEME_ICONS[i % THEME_ICONS.length];
            return (
              <AnimatedCard key={theme} delay={i * 0.05} tilt={false} className="flex items-center gap-3.5 p-5">
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[color:var(--color-carrot)]/10 text-[color:var(--color-carrot)]">
                  <ThemeIcon size={20} aria-hidden="true" />
                </span>
                <span className="text-sm font-bold leading-snug text-[color:var(--color-navy)]">{theme}</span>
              </AnimatedCard>
            );
          })}
        </div>

      
      </Container>
    </section>
  );
}
