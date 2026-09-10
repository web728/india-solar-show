import { ABOUT_CARDS } from "@/data/siteData";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { AnimatedCard } from "@/components/ui/AnimatedCard";
import { Icon } from "@/components/ui/Icon";

const ACCENTS = [
  { text: "text-[color:var(--color-carrot)]", grad: "from-[color:var(--color-carrot)]/20 to-[color:var(--color-carrot)]/5" },
  { text: "text-[color:var(--color-twilight)]", grad: "from-[color:var(--color-twilight)]/20 to-[color:var(--color-twilight)]/5" },
  { text: "text-[color:var(--color-sky)]", grad: "from-[color:var(--color-sky)]/25 to-[color:var(--color-sky)]/5" },
];

export function AboutSection() {
  return (
    <section id="about" className="relative overflow-hidden bg-white py-20 sm:py-28">
      <div className="absolute inset-0 bg-solar-grid-light" aria-hidden="true" />
      <div className="absolute -top-32 -left-32 h-80 w-80 rounded-full bg-[color:var(--color-sky)]/10 blur-3xl" aria-hidden="true" />
      <div className="absolute -bottom-32 -right-32 h-96 w-96 rounded-full bg-[color:var(--color-carrot)]/10 blur-3xl" aria-hidden="true" />

      <Container className="relative">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-[1fr_1.1fr] lg:gap-16">
          <div className="lg:sticky lg:top-32 lg:self-start">
            <SectionHeading
              eyebrow="About the Show"
              heading="India's Premier Solar Exhibition & Renewable Energy Expo"
              intro="The 1st Edition of India Solar International Show 2026 is the leading solar trade fair in Pune, connecting the entire solar energy, PV manufacturing, and energy storage value chain."
            />
            <p className="mt-5 max-w-xl text-base leading-relaxed text-slate-600">
              As a landmark <strong>solar trade show in Pune, Maharashtra</strong>, this exhibition unites solar PV module manufacturers, EPC contractors, battery energy storage systems (BESS), C&amp;I solar industrial buyers, and clean energy investors under one roof to accelerate India’s clean energy transition.
            </p>
            <div className="mt-8 h-px w-24 bg-gradient-to-r from-[color:var(--color-carrot)] to-transparent" />
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {ABOUT_CARDS.map((card, i) => {
              const accent = ACCENTS[i % ACCENTS.length];
              return (
                <AnimatedCard
                  key={card.title}
                  delay={i * 0.08}
                  className={`p-6 ${i % 2 === 1 ? "sm:translate-y-5" : ""}`}
                >
                  <span
                    className={`flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br ${accent.grad} ${accent.text} shadow-inner transition-transform duration-300 group-hover:-translate-y-1 group-hover:scale-105`}
                  >
                    <Icon name={card.icon} size={23} aria-hidden="true" />
                  </span>
                  <h3 className="mt-4 text-base font-bold text-[color:var(--color-navy)]">{card.title}</h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-slate-500">{card.desc}</p>
                </AnimatedCard>
              );
            })}
          </div>
        </div>
      </Container>
    </section>
  );
}