import type { Metadata } from "next";

import fs from "node:fs";
import path from "node:path";

import { ArrowLeft, ArrowUpRight, ImageIcon } from "lucide-react";

import { PageHero } from "@/components/ui/PageHero";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";

/* =========================================================
   Metadata
========================================================= */

export const metadata: Metadata = {
  title: "Gallery",

  description:
    "Explore photos and highlights from the India Solar International Show, including exhibitions, industry interactions, technology showcases and event moments.",
};

/* =========================================================
   Types
========================================================= */

interface GalleryImage {
  src: string;
  alt: string;
  filename: string;
  category: string;
}

/* =========================================================
   Supported Formats
========================================================= */

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

/* =========================================================
   Helpers
========================================================= */

function formatLabel(value: string) {
  return value
    .replace(/\.[^.]+$/, "")
    .replace(/[-_]+/g, " ")
    .replace(/\s+/g, " ")
    .trim()
    .replace(/\b\w/g, (char) => char.toUpperCase());
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

function collectImages(
  directory: string,
  publicRoot: string,
): GalleryImage[] {
  if (!fs.existsSync(directory)) {
    return [];
  }

  const entries = fs.readdirSync(directory, {
    withFileTypes: true,
  });

  const images: GalleryImage[] = [];

  for (const entry of entries) {
    if (entry.name.startsWith(".")) {
      continue;
    }

    const absolutePath = path.join(
      directory,
      entry.name,
    );

    if (entry.isDirectory()) {
      images.push(
        ...collectImages(
          absolutePath,
          publicRoot,
        ),
      );

      continue;
    }

    const extension = path
      .extname(entry.name)
      .toLowerCase();

    if (!IMAGE_EXTENSIONS.has(extension)) {
      continue;
    }

    const relativePath = path.relative(
      publicRoot,
      absolutePath,
    );

    const relativeDirectory =
      path.dirname(relativePath);

    const folderName =
      relativeDirectory === "."
        ? "Gallery"
        : relativeDirectory
            .split(path.sep)
            .at(-1) ?? "Gallery";

    images.push({
      src: createPublicUrl(relativePath),

      alt: formatLabel(entry.name),

      filename: formatLabel(entry.name),

      category: formatLabel(folderName),
    });
  }

  return images;
}

function getGalleryImages() {
  const publicRoot = path.join(
    process.cwd(),
    "public",
  );

  const imagesDirectory = path.join(
    publicRoot,
    "images",
  );

  return collectImages(
    imagesDirectory,
    publicRoot,
  ).sort((a, b) =>
    a.src.localeCompare(b.src),
  );
}

/* =========================================================
   Gallery Card
========================================================= */

function GalleryCard({
  image,
  index,
}: {
  image: GalleryImage;
  index: number;
}) {
  /*
   * Different aspect ratios create a premium editorial
   * grid without needing image dimensions.
   */
  const aspectClass =
    index % 7 === 0
      ? "aspect-[4/5]"
      : index % 5 === 0
        ? "aspect-[16/11]"
        : index % 3 === 0
          ? "aspect-[5/4]"
          : "aspect-[4/3]";

  return (
    <figure
      className="
        group
        relative
        break-inside-avoid
        overflow-hidden

        rounded-[20px]

        border
        border-ink/[0.07]

        bg-ink/[0.025]

        shadow-[0_16px_50px_rgba(25,25,25,0.06)]

        transition-[transform,box-shadow,border-color]
        duration-500

        hover:-translate-y-1

        hover:border-ink/[0.11]

        hover:shadow-[0_24px_70px_rgba(25,25,25,0.11)]
      "
    >
      <div
        className={`
          relative
          overflow-hidden
          ${aspectClass}
        `}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={image.src}
          alt={image.alt}
          loading={
            index < 6
              ? "eager"
              : "lazy"
          }
          decoding="async"
          className="
            h-full
            w-full

            object-cover
            object-center

            transition-transform
            duration-700
            ease-out

            group-hover:scale-[1.045]
          "
        />

        {/* subtle image treatment */}

        <div
          aria-hidden="true"
          className="
            absolute inset-0

            bg-gradient-to-t

            from-ink/75
            via-ink/[0.03]
            to-transparent

            opacity-80

            transition-opacity
            duration-500

            group-hover:opacity-95
          "
        />

        <div
          aria-hidden="true"
          className="
            absolute inset-0

            bg-gradient-to-br

            from-solar/[0.045]
            via-transparent
            to-blue/[0.05]

            opacity-0

            transition-opacity
            duration-500

            group-hover:opacity-100
          "
        />

        {/* top index */}

        <div
          className="
            absolute
            left-4
            top-4

            flex
            items-center
            gap-2

            rounded-full

            border
            border-paper/10

            bg-ink/35

            px-2.5
            py-1.5

            backdrop-blur-md
          "
        >
          <span
            className="
              h-1
              w-1

              rounded-full

              bg-solar
            "
          />

          <span
            className="
              font-mono

              text-[7px]

              font-semibold

              tracking-[0.13em]

              text-paper/70
            "
          >
            {String(index + 1).padStart(
              2,
              "0",
            )}
          </span>
        </div>

        {/* bottom content */}

        <figcaption
          className="
            absolute
            inset-x-0
            bottom-0

            p-4

            sm:p-5
          "
        >
          <span
            className="
              font-mono

              text-[7px]

              font-semibold
              uppercase

              tracking-[0.15em]

              text-solar/85
            "
          >
            {image.category}
          </span>

          <div
            className="
              mt-1.5

              flex
              items-end
              justify-between

              gap-4
            "
          >
            <p
              className="
                line-clamp-2

                max-w-[85%]

                font-display

                text-[15px]

                font-semibold

                leading-[1.15]

                tracking-[-0.02em]

                text-paper

                sm:text-[16px]
              "
            >
              {image.filename}
            </p>

            <ArrowUpRight
              aria-hidden="true"
              strokeWidth={1.6}
              className="
                h-4
                w-4

                shrink-0

                text-paper/45

                transition-all
                duration-300

                group-hover:-translate-y-0.5
                group-hover:translate-x-0.5

                group-hover:text-solar
              "
            />
          </div>
        </figcaption>
      </div>
    </figure>
  );
}

/* =========================================================
   Gallery Page
========================================================= */

export default function GalleryPage() {
  const images = getGalleryImages();

  return (
    <>
      <PageHero
        eyebrow="Gallery"
        title="Event Gallery"
        subtitle="Explore moments, people, technologies and industry interactions from the India Solar International Show."
        breadcrumbs={[
          {
            label: "Home",
            href: "/",
          },
          {
            label: "Gallery",
          },
        ]}
      />

      <section
        className="
          relative
          isolate
          overflow-hidden

          bg-paper

          py-12

          sm:py-16

          lg:py-[72px]
        "
      >
        {/* =================================================
            Atmosphere
        ================================================= */}

        <div
          aria-hidden="true"
          className="
            pointer-events-none

            absolute
            -right-52
            top-10

            h-[500px]
            w-[500px]

            rounded-full

            bg-solar/[0.035]

            blur-[150px]
          "
        />

        <div
          aria-hidden="true"
          className="
            pointer-events-none

            absolute
            -left-56
            top-[42%]

            h-[520px]
            w-[520px]

            rounded-full

            bg-blue/[0.03]

            blur-[160px]
          "
        />

        <Container className="relative">
          {/* =================================================
              Intro
          ================================================= */}

          <div
            className="
              mb-8

              grid
              gap-5

              border-b
              border-ink/[0.08]

              pb-7

              sm:mb-10
              sm:grid-cols-[minmax(0,1fr)_auto]
              sm:items-end

              lg:mb-12
            "
          >
            <div>
              <div
                className="
                  flex
                  items-center
                  gap-3
                "
              >
                <span className="h-px w-7 bg-solar" />

                <span
                  className="
                    font-mono

                    text-[8px]

                    font-semibold
                    uppercase

                    tracking-[0.16em]

                    text-blue

                    sm:text-[9px]
                  "
                >
                  Visual Archive
                </span>
              </div>

              <h2
                className="
                  mt-4

                  max-w-[680px]

                  font-display

                  text-[clamp(1.9rem,3.2vw,3rem)]

                  font-semibold

                  leading-[1.02]

                  tracking-[-0.04em]

                  text-ink
                "
              >
                Moments from across the solar ecosystem.
              </h2>

              <p
                className="
                  mt-3

                  max-w-[620px]

                  text-[13px]

                  leading-6

                  text-ink/48

                  sm:text-[14px]
                "
              >
                Exhibition floors, technology
                showcases, industry conversations and
                event highlights—all in one visual
                archive.
              </p>
            </div>

            {images.length > 0 ? (
              <div
                className="
                  flex
                  items-center
                  gap-3
                "
              >
                <span className="h-px w-8 bg-ink/10" />

                <span
                  className="
                    font-mono

                    text-[8px]

                    font-semibold
                    uppercase

                    tracking-[0.13em]

                    text-ink/30
                  "
                >
                  {images.length}{" "}
                  {images.length === 1
                    ? "Image"
                    : "Images"}
                </span>
              </div>
            ) : null}
          </div>

          {/* =================================================
              Gallery
          ================================================= */}

          {images.length > 0 ? (
            <div
              className="
                columns-1

                gap-4

                sm:columns-2

                lg:columns-3
                lg:gap-5

                xl:columns-4
              "
            >
              {images.map(
                (image, index) => (
                  <div
                    key={image.src}
                    className="
                      mb-4
                      break-inside-avoid

                      lg:mb-5
                    "
                  >
                    <GalleryCard
                      image={image}
                      index={index}
                    />
                  </div>
                ),
              )}
            </div>
          ) : (
            /* =================================================
               Empty State
            ================================================= */

            <div
              className="
                relative

                mx-auto

                max-w-[680px]

                overflow-hidden

                rounded-[26px]

                border
                border-ink/[0.08]

                bg-white

                px-6
                py-14

                text-center

                shadow-[0_20px_60px_rgba(25,25,25,0.06)]

                sm:px-10
                sm:py-16
              "
            >
              <div
                aria-hidden="true"
                className="
                  absolute

                  -right-24
                  -top-24

                  h-64
                  w-64

                  rounded-full

                  bg-solar/[0.07]

                  blur-[90px]
                "
              />

              <div
                aria-hidden="true"
                className="
                  absolute

                  -bottom-24
                  -left-24

                  h-64
                  w-64

                  rounded-full

                  bg-blue/[0.05]

                  blur-[90px]
                "
              />

              <div
                className="
                  relative

                  mx-auto

                  flex
                  h-12
                  w-12

                  items-center
                  justify-center

                  rounded-full

                  border
                  border-ink/[0.08]

                  bg-blue/[0.04]

                  text-blue
                "
              >
                <ImageIcon
                  aria-hidden="true"
                  className="h-5 w-5"
                  strokeWidth={1.7}
                />
              </div>

              <span
                className="
                  relative

                  mt-5
                  block

                  font-mono

                  text-[8px]

                  font-semibold
                  uppercase

                  tracking-[0.15em]

                  text-solar
                "
              >
                Visual Archive
              </span>

              <h2
                className="
                  relative

                  mt-2

                  font-display

                  text-[clamp(1.8rem,3vw,2.5rem)]

                  font-semibold

                  tracking-[-0.035em]

                  text-ink
                "
              >
                Gallery coming soon.
              </h2>

              <p
                className="
                  relative

                  mx-auto
                  mt-3

                  max-w-[480px]

                  text-[13px]

                  leading-6

                  text-ink/48
                "
              >
                Add images inside{" "}
                <code
                  className="
                    rounded-md

                    bg-ink/[0.045]

                    px-1.5
                    py-0.5

                    font-mono

                    text-[11px]

                    text-ink/65
                  "
                >
                  public/images/
                </code>{" "}
                and they will automatically appear
                here.
              </p>

              <div
                className="
                  relative

                  mt-7

                  flex
                  flex-wrap
                  justify-center

                  gap-3
                "
              >
                <Button
                  href="/"
                  variant="ghost"
                  size="md"
                  className="gap-2"
                >
                  <ArrowLeft
                    aria-hidden="true"
                    className="h-4 w-4"
                    strokeWidth={1.7}
                  />

                  Back to Home
                </Button>

                <Button
                  href="/contact"
                  size="md"
                >
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