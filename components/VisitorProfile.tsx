import { VISITOR_SEGMENTS } from "@/data/siteData";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { AnimatedCard } from "@/components/ui/AnimatedCard";
import { Icon } from "@/components/ui/Icon";
import { Button } from "@/components/ui/Button";

const ACCENTS = [
  {
    bg: "bg-[color:var(--color-carrot)]/10",
    text: "text-[color:var(--color-carrot)]",
  },
  {
    bg: "bg-[color:var(--color-twilight)]/10",
    text: "text-[color:var(--color-twilight)]",
  },
  {
    bg: "bg-[color:var(--color-sky)]/15",
    text: "text-[color:var(--color-sky)]",
  },
];

export function VisitorProfile() {
  // Schema.org Structured Data for Search Engine Indexing
  const itemListSchema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Target Visitor & Stakeholder Segments for India Solar Show 2026",
    itemListElement: VISITOR_SEGMENTS.map((seg, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: seg.title,
      description: seg.desc,
    })),
  };

  return (
    <section
      id="visitors"
      className="relative overflow-hidden bg-[color:var(--color-metal)] py-24 sm:py-32"
    >
      {/* Structured Data Script for Rich Snippets */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListSchema) }}
      />

      <div
        className="absolute inset-0 bg-dot-grid opacity-40"
        aria-hidden="true"
      />
      <Container className="relative">
        <SectionHeading
          eyebrow="Visitor Profile"
          heading="Who You Will Meet on the Show Floor"
          intro="Fourteen stakeholder groups across the clean-energy value chain — from EPC developers and utilities to institutional investors, media, and academia."
        />

        {/* Hidden Semantic List for Search Engine Crawlers to Index All Visitor Segments */}
        <div className="sr-only">
          <h2>Solar Exhibition Visitor Categories &amp; Attendee Profiles</h2>
          <ul>
            {VISITOR_SEGMENTS.map((seg) => (
              <li key={seg.title}>
                <h3>{seg.title}</h3>
                <p>{seg.desc}</p>
              </li>
            ))}
          </ul>
        </div>

        {/* Grid Display */}
        <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {VISITOR_SEGMENTS.map((seg, i) => {
            const accent = ACCENTS[i % ACCENTS.length];
            return (
              <AnimatedCard
                key={seg.title}
                delay={(i % 4) * 0.06}
                tilt={false}
                className="p-5"
              >
                <span
                  className={`flex h-11 w-11 items-center justify-center rounded-xl transition-transform duration-300 group-hover:-translate-y-0.5 ${accent.bg} ${accent.text}`}
                >
                  <Icon name={seg.icon} size={20} aria-hidden="true" />
                </span>
                <h3 className="mt-3.5 text-sm font-bold leading-snug text-[color:var(--color-navy)]">
                  {seg.title}
                </h3>
                <p className="mt-1.5 text-xs leading-relaxed text-slate-500">
                  {seg.desc}
                </p>
              </AnimatedCard>
            );
          })}
        </div>

        {/* Call to Action Box */}
        <div className="relative mt-14 overflow-hidden rounded-3xl bg-[color:var(--color-navy)] px-8 py-10 text-center sm:px-12">
          <div
            className="absolute inset-0 bg-solar-grid opacity-20"
            aria-hidden="true"
          />
          <div
            className="absolute -top-20 right-0 h-64 w-64 rounded-full radial-glow-sky"
            aria-hidden="true"
          />
          <div className="relative">
            <h3 className="text-xl font-extrabold text-white sm:text-2xl">
              See where you fit in the ecosystem?
            </h3>
            <p className="mx-auto mt-2 max-w-lg text-sm text-white/65 sm:text-base">
              Register your interest today for free access to India's premier
              B2B Solar, BESS, and Green Tech Expo in Pune.
            </p>
            <div className="mt-6">
              <Button
                href="https://app.warpbay.com/qPMIy6ii"
                size="lg"
                glow
                className="btn-shine"
              >
                Register Your Interest
              </Button>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
