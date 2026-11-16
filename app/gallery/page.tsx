import type { Metadata } from "next";
import { promises as fs } from "node:fs";
import path from "node:path";

import { ArrowLeft, ImageIcon } from "lucide-react";

import { PageHero } from "@/components/ui/PageHero";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { GalleryLightbox } from "@/components/GalleryLightbox";

export const metadata: Metadata = {
  title: "Gallery",
  description:
    "Explore photos and highlights from the India International Solar Show, including exhibitions, industry interactions, technology showcases and event moments.",
};

// Page build time pe ek baar generate hoga, har request pe folder scan nahi hoga.
export const dynamic = "force-static";

export interface GalleryImage {
  src: string;
  alt: string;
}

const IMAGE_EXTENSIONS = new Set([
  ".jpg",
  ".jpeg",
  ".png",
  ".webp",
  ".avif",
  ".gif",
  ".svg",
  ".bmp",
]);

const FALLBACK_ALT = "India International Solar Show gallery image";

function formatAlt(value: string) {
  return value
    .replace(/\.[^.]+$/, "")
    .replace(/[-_]+/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function createPublicUrl(relativePath: string) {
  return (
    "/" +
    relativePath
      .split(path.sep)
      .map((segment) => encodeURIComponent(segment))
      .join("/")
  );
}

// Async + parallel scan (pehle sync fs calls the, jo server ko block karte the).
async function collectImages(
  directory: string,
  publicRoot: string,
): Promise<GalleryImage[]> {
  let entries;
  try {
    entries = await fs.readdir(directory, { withFileTypes: true });
  } catch {
    return [];
  }

  const nested = await Promise.all(
    entries.map(async (entry): Promise<GalleryImage[]> => {
      if (entry.name.startsWith(".")) return [];

      const absolutePath = path.join(directory, entry.name);

      if (entry.isDirectory()) {
        return collectImages(absolutePath, publicRoot);
      }

      const extension = path.extname(entry.name).toLowerCase();
      if (!IMAGE_EXTENSIONS.has(extension)) return [];

      return [
        {
          src: createPublicUrl(path.relative(publicRoot, absolutePath)),
          alt: formatAlt(entry.name) || FALLBACK_ALT,
        },
      ];
    }),
  );

  return nested.flat();
}

// Module-level cache: process me ek hi baar scan hota hai.
let imagesPromise: Promise<GalleryImage[]> | null = null;

function getGalleryImages() {
  if (!imagesPromise) {
    const publicRoot = path.join(process.cwd(), "public");
    const imagesDirectory = path.join(publicRoot, "images");

    imagesPromise = collectImages(imagesDirectory, publicRoot).then((list) =>
      list.sort((a, b) => (a.src < b.src ? -1 : a.src > b.src ? 1 : 0)),
    );
  }
  return imagesPromise;
}

export default async function GalleryPage() {
  const images = await getGalleryImages();

  return (
    <>
      <PageHero
        eyebrow="Gallery"
        title="Event Gallery"
        subtitle="Explore moments, people, technologies and industry interactions from the India International Solar Show."
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Gallery" },
        ]}
      />

      <section className="relative overflow-hidden bg-paper py-12 sm:py-16 lg:py-[72px]">
        {/* blur-[150px] filters bahut heavy hote hain, gradient same look deta hai bina paint cost ke */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -right-52 top-10 h-[500px] w-[500px] rounded-full bg-[radial-gradient(closest-side,rgba(245,166,35,0.07),transparent)]"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -left-56 top-[42%] h-[520px] w-[520px] rounded-full bg-[radial-gradient(closest-side,rgba(30,90,200,0.06),transparent)]"
        />

        <Container className="relative">
          <div className="mb-8 border-b border-ink/[0.08] pb-7 sm:mb-10 lg:mb-12">
            <div className="flex items-center gap-3">
              <span className="h-px w-7 bg-solar" />
              <span className="font-mono text-[8px] font-semibold uppercase tracking-[0.16em] text-blue sm:text-[9px]">
                Visual Archive
              </span>
            </div>

            <h2 className="mt-4 max-w-[680px] font-display text-[clamp(1.9rem,3.2vw,3rem)] font-semibold leading-[1.02] tracking-[-0.04em] text-ink">
              Moments from across the solar ecosystem.
            </h2>

            <p className="mt-3 max-w-[620px] text-[13px] leading-6 text-ink/48 sm:text-[14px]">
              Exhibition floors, technology showcases, industry conversations and
              event highlights—all in one visual archive.
            </p>
          </div>

          {images.length > 0 ? (
            <GalleryLightbox images={images} />
          ) : (
            <div className="relative mx-auto max-w-[680px] overflow-hidden rounded-[26px] border border-ink/[0.08] bg-white px-6 py-14 text-center shadow-[0_20px_60px_rgba(25,25,25,0.06)] sm:px-10 sm:py-16">
              <div className="relative mx-auto flex h-12 w-12 items-center justify-center rounded-full border border-ink/[0.08] bg-blue/[0.04] text-blue">
                <ImageIcon aria-hidden="true" className="h-5 w-5" strokeWidth={1.7} />
              </div>

              <span className="relative mt-5 block font-mono text-[8px] font-semibold uppercase tracking-[0.15em] text-solar">
                Visual Archive
              </span>

              <h2 className="relative mt-2 font-display text-[clamp(1.8rem,3vw,2.5rem)] font-semibold tracking-[-0.035em] text-ink">
                Gallery coming soon.
              </h2>

              <p className="relative mx-auto mt-3 max-w-[480px] text-[13px] leading-6 text-ink/48">
                Add images inside{" "}
                <code className="rounded-md bg-ink/[0.045] px-1.5 py-0.5 font-mono text-[11px] text-ink/65">
                  public/images/
                </code>{" "}
                and they will automatically appear here.
              </p>

              <div className="relative mt-7 flex flex-wrap justify-center gap-3">
                <Button href="/" variant="ghost" size="md" className="gap-2">
                  <ArrowLeft aria-hidden="true" className="h-4 w-4" strokeWidth={1.7} />
                  Back to Home
                </Button>

                <Button href="/contact" size="md">
                  Contact Us
                </Button>
              </div>
            </div>
          )}
        </Container>
      </section>
    </>
  );
}