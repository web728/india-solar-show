import { EVENT_SNAPSHOT } from "@/data/siteData";
import { Container } from "@/components/ui/Container";
import { Icon } from "@/components/ui/Icon";
import { AnimatedCard } from "@/components/ui/AnimatedCard";
import { CountdownTimer } from "@/components/CountdownTimer";

export function EventSnapshot() {
  return (
    <section id="snapshot" className="relative overflow-hidden bg-[color:var(--color-metal)] py-20 sm:py-24">
      <div className="absolute inset-0 bg-dot-grid opacity-40" aria-hidden="true" />
      <Container className="relative">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-[0.95fr_1.05fr] lg:items-center lg:gap-16">
          <div>
            <span className="inline-flex items-center gap-2 text-xs sm:text-sm font-bold tracking-[0.2em] uppercase text-[color:var(--color-twilight)]">
              <span className="h-1.5 w-1.5 rounded-full bg-current" />
              Countdown to the Show
            </span>
            <h2 className="mt-3 text-3xl sm:text-4xl font-extrabold tracking-tight text-[color:var(--color-navy)]">
              Doors Open 02 October 2026
            </h2>
            <p className="mt-3 max-w-md text-sm sm:text-base text-slate-500">
              Mark your calendar &mdash; three days of exhibitions, workshops, and B2B dealmaking at Pune&rsquo;s
              premier clean-energy venue.
            </p>
            <div className="mt-8">
              <CountdownTimer />
            </div>
          </div>

          <div className="grid grid-cols-1 gap-3.5 sm:grid-cols-2">
            {EVENT_SNAPSHOT.map((item, i) => (
              <AnimatedCard
                key={item.label}
                delay={i * 0.06}
                className="relative overflow-hidden p-5 pl-6"
                tilt={false}
              >
                <span
                  className="absolute left-0 top-0 h-full w-1 bg-gradient-to-b from-[color:var(--color-carrot)] to-[color:var(--color-sky)]"
                  aria-hidden="true"
                />
                <div className="flex items-center gap-3.5">
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-[color:var(--color-carrot)]/15 to-[color:var(--color-sky)]/15 text-[color:var(--color-carrot)] transition-transform duration-300 group-hover:scale-110">
                    <Icon name={item.icon} size={21} aria-hidden="true" />
                  </span>
                  <span className="text-sm font-bold leading-snug text-[color:var(--color-navy)]">{item.label}</span>
                </div>
              </AnimatedCard>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
