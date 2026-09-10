import type { Metadata } from "next";
import { PageHero } from "@/components/ui/PageHero";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";

export const metadata: Metadata = {
  title: "Floor Plan",
  description:
    "View the exhibition floor plan for the India Solar International Show 2026 at Auto Cluster Exhibition Center, Pune. Contact our team for stall booking and location details.",
};

export default function FloorPlanPage() {
  return (
    <>
      <PageHero
        eyebrow="Floor Plan"
        title="Exhibition Floor Plan"
        subtitle="Explore the layout of the India Solar International Show at Auto Cluster Exhibition Center, Pune."
      />

      <section className="bg-white py-20 sm:py-28">
        <Container>
          <div className="mx-auto max-w-2xl text-center">
            <div className="mx-auto flex h-24 w-24 items-center justify-center rounded-3xl bg-[color:var(--color-gold)]/10">
              <Icon name="LayoutGrid" size={40} />
            </div>
            <h2 className="mt-8 text-2xl font-extrabold text-[color:var(--color-black)] sm:text-3xl">
              Floor Plan Coming Soon
            </h2>
            <p className="mt-4 text-base leading-relaxed text-slate-600">
              The detailed exhibition floor plan will be available soon. Contact our team to discuss
              stall options, premium locations, and booth configurations for the India Solar
              International Show 2026.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-4">
              <Button href="/contact" size="lg" glow className="btn-shine">
                Contact for Stall Booking
              </Button>
              <Button href="/exhibitor" variant="ghost" size="lg">
                Exhibitor Information
              </Button>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
