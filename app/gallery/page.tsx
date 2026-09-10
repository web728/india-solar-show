import type { Metadata } from "next";
import { PageHero } from "@/components/ui/PageHero";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";

export const metadata: Metadata = {
  title: "Gallery",
  description:
    "View photos and highlights from the India Solar International Show. Gallery will be updated with images from the 2026 edition.",
};

export default function GalleryPage() {
  return (
    <>
      <PageHero
        eyebrow="Gallery"
        title="Event Gallery"
        subtitle="Photos and highlights from the India Solar International Show."
      />

      <section className="bg-white py-20 sm:py-28">
        <Container>
          <div className="mx-auto max-w-2xl text-center">
            <div className="mx-auto flex h-24 w-24 items-center justify-center rounded-3xl bg-[color:var(--color-gold)]/10">
              <Icon name="Image" size={40} />
            </div>
            <h2 className="mt-8 text-2xl font-extrabold text-[color:var(--color-black)] sm:text-3xl">
              Gallery Coming Soon
            </h2>
            <p className="mt-4 text-base leading-relaxed text-slate-600">
              The gallery will be updated with photos, highlights, and behind-the-scenes coverage
              from the India Solar International Show 2026. Stay tuned for updates.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-4">
              <Button href="/" variant="ghost" size="lg">
                Back to Home
              </Button>
              <Button href="/contact" size="lg" glow className="btn-shine">
                Contact Us
              </Button>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
