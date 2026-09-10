import { MapPin, Car, Building2, Train } from "lucide-react";
import { EVENT } from "@/data/siteData";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { AnimatedCard } from "@/components/ui/AnimatedCard";
import { Button } from "@/components/ui/Button";
import { SolarGridBackground } from "@/components/SolarGridBackground";

const VENUE_INFO = [
  { icon: Building2, title: "Auto Cluster Exhibition Center", desc: "A dedicated exhibition venue within Pune's industrial belt." },
  { icon: Car, title: "Industrial Access", desc: "Well-connected to Pune's major industrial and manufacturing clusters." },
  { icon: Train, title: "Regional Connectivity", desc: "Accessible from Pune and Pimpri-Chinchwad's transit and highway network." },
];

export function VenueSection() {
  return (
    <section id="venue" className="relative overflow-hidden bg-[color:var(--color-metal)] py-24 sm:py-32">
      <div className="absolute inset-0 bg-dot-grid opacity-30" aria-hidden="true" />
      <Container className="relative">
        <SectionHeading eyebrow="Venue" heading={EVENT.venue.name} intro={EVENT.venue.full} />

        <div className="mt-14 grid grid-cols-1 gap-6 lg:grid-cols-[1.15fr_0.85fr]">
          <div className="relative overflow-hidden rounded-3xl bg-white shadow-[0_25px_70px_-25px_rgba(7,17,31,0.35)]">
            <div className="relative aspect-[4/3] overflow-hidden sm:aspect-[16/10]">
  <iframe
    title="Auto Cluster Exhibition Center"
    src="https://www.google.com/maps?q=Auto+Cluster+Exhibition+Centre,+Pimpri-Chinchwad,+Maharashtra&output=embed"
    className="absolute inset-0 h-full w-full border-0"
    loading="lazy"
    referrerPolicy="no-referrer-when-downgrade"
    allowFullScreen
  />
</div>
            <div className="flex flex-col gap-4 p-7 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="text-base font-bold text-[color:var(--color-navy)]">{EVENT.venue.name}</p>
                <p className="text-sm text-slate-500">{EVENT.venue.line}, {EVENT.venue.city}</p>
              </div>
              <Button href={EVENT.venue.mapsUrl} external size="md" glow className="btn-shine shrink-0">
                Get Directions
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-4">
            {VENUE_INFO.map((item, i) => (
              <AnimatedCard key={item.title} delay={i * 0.08} tilt={false} className="flex items-start gap-4 p-6">
                <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-[color:var(--color-twilight)]/15 to-[color:var(--color-sky)]/10 text-[color:var(--color-twilight)]">
                  <item.icon size={21} aria-hidden="true" />
                </span>
                <div>
                  <h3 className="text-sm font-bold text-[color:var(--color-navy)]">{item.title}</h3>
                  <p className="mt-1 text-sm leading-relaxed text-slate-500">{item.desc}</p>
                </div>
              </AnimatedCard>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
