import Image from "next/image";
import { INDIA_MARKET, PUNE_MARKET } from "@/data/siteData";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { AnimatedCard } from "@/components/ui/AnimatedCard";
import { Icon } from "@/components/ui/Icon";
import { NetworkMapBackground } from "@/components/NetworkMapBackground";
import { CityGridBackground } from "@/components/CityGridBackground";

export function IndiaMarketSection() {
  return (
    <section id="india-market" className="relative overflow-hidden bg-[color:var(--color-solar-black)] py-24 sm:py-32">
      <div className="absolute inset-0 bg-solar-grid opacity-[0.12]" aria-hidden="true" />
      <NetworkMapBackground className="absolute right-0 top-0 h-full w-[55%] opacity-40" />
      <div
        className="absolute left-1/2 top-1/2 h-[600px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full radial-glow-sky opacity-40"
        aria-hidden="true"
      />
      <Container className="relative">
        <SectionHeading
          eyebrow="Market Opportunity"
          heading="Solar & Renewable Energy Market Growth in India"
          intro="India is one of the fastest-growing solar energy and renewable tech markets globally. With expanding rooftop solar adoption, commercial & industrial (C&I) solar, utility-scale solar PV plants, and BESS energy storage integration, India is accelerating towards grid modernization and green transition."
          tone="light"
        />
        <div className="mt-14 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {INDIA_MARKET.map((item, i) => {
            const isCarrot = i % 2 === 0;
            return (
              <AnimatedCard
                key={item.title}
                tone="dark"
                delay={i * 0.07}
                className="relative overflow-hidden p-6"
              >
                <span
                  className="absolute inset-x-0 top-0 h-[3px]"
                  style={{
                    background: isCarrot
                      ? "linear-gradient(90deg, var(--color-carrot), transparent)"
                      : "linear-gradient(90deg, var(--color-sky), transparent)",
                  }}
                  aria-hidden="true"
                />
                <span
                  className={`flex h-14 w-14 items-center justify-center rounded-2xl text-2xl transition-transform duration-300 group-hover:-translate-y-1 ${
                    isCarrot
                      ? "bg-[color:var(--color-carrot)]/15 text-[color:var(--color-carrot)]"
                      : "bg-[color:var(--color-sky)]/15 text-[color:var(--color-sky)]"
                  }`}
                >
                  <Icon name={item.icon} size={24} aria-hidden="true" />
                </span>
                <h3 className="mt-5 text-base font-bold leading-snug text-white">{item.title}</h3>
              </AnimatedCard>
            );
          })}
        </div>
      </Container>
    </section>
  );
}

export function PuneMarketSection() {
  return (
    <section className="relative overflow-hidden bg-white py-24 sm:py-32">
      <CityGridBackground className="absolute inset-x-0 bottom-0 h-56 w-full opacity-70" />
      <div className="absolute -top-24 right-0 h-72 w-72 rounded-full bg-[color:var(--color-carrot)]/10 blur-3xl" aria-hidden="true" />
      <Container className="relative">
        <div className="grid items-center gap-10 lg:grid-cols-2">
          {/* Left Content */}
          <div>
            <SectionHeading
              eyebrow="Host City Advantage"
              heading="Pune: The Hub for Solar Exhibition & Clean-Tech Industrial Demand"
              intro="As a premier industrial, automotive, and IT center in Maharashtra, Pune is a prime hotspot for C&I rooftop solar installations, battery storage, and EV charging infrastructure. Exhibiting at the solar expo in Pune gives direct access to regional factory owners, real estate developers, EPC buyers, and government stakeholders."
            />

            <div className="mt-6 h-px w-28 bg-gradient-to-r from-[color:var(--color-carrot)] via-[color:var(--color-sky)] to-transparent" />
          </div>

          {/* Right Image */}
          <div className="relative overflow-hidden rounded-3xl shadow-2xl">
            <Image
              src="https://iievshow.com/wp-content/uploads/2024/04/ev-expo-4-min-scaled.jpg"
              alt="Pune Solar Trade Fair & Renewable Energy Exhibition Center"
              width={600}
              height={320}
              className="h-[320px] w-full object-cover transition duration-500 hover:scale-105"
            />

            {/* Optional Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />
          </div>
        </div>

        <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {PUNE_MARKET.map((item, i) => (
            <AnimatedCard key={item.title} delay={i * 0.07} className="p-6">
              <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-[color:var(--color-twilight)]/15 to-[color:var(--color-sky)]/10 text-[color:var(--color-twilight)] transition-transform duration-300 group-hover:-translate-y-1">
                <Icon name={item.icon} size={24} aria-hidden="true" />
              </span>
              <h3 className="mt-5 text-base font-bold leading-snug text-[color:var(--color-navy)]">{item.title}</h3>
            </AnimatedCard>
          ))}
        </div>
      </Container>
    </section>
  );
}