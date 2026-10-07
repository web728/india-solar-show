"use client";

import Image from "next/image";
import { useEffect, useMemo, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { ChevronLeft, ChevronRight, X } from "lucide-react";

type GalleryImage = {
  src: string;
  alt: string;
};

const INITIAL_BATCH = 12;
const LOAD_BATCH = 12;

export function GalleryLightbox({ images }: { images: GalleryImage[] }) {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [visibleCount, setVisibleCount] = useState(
    Math.min(INITIAL_BATCH, images.length),
  );
  const [mounted, setMounted] = useState(false);
  const loadMoreRef = useRef<HTMLDivElement | null>(null);

  const visibleImages = useMemo(
    () => images.slice(0, visibleCount),
    [images, visibleCount],
  );

  const activeImage = activeIndex !== null ? images[activeIndex] : null;
  const isOpen = activeIndex !== null && activeImage !== null;

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    const target = loadMoreRef.current;
    if (!target || visibleCount >= images.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (!entries[0]?.isIntersecting) return;
        setVisibleCount((current) =>
          Math.min(current + LOAD_BATCH, images.length),
        );
      },
      { rootMargin: "700px 0px", threshold: 0.01 },
    );

    observer.observe(target);
    return () => observer.disconnect();
  }, [images.length, visibleCount]);

  useEffect(() => {
    if (!isOpen) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setActiveIndex(null);
      if (event.key === "ArrowLeft") {
        setActiveIndex((current) => {
          if (current === null) return null;
          return current === 0 ? images.length - 1 : current - 1;
        });
      }
      if (event.key === "ArrowRight") {
        setActiveIndex((current) => {
          if (current === null) return null;
          return current === images.length - 1 ? 0 : current + 1;
        });
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, images.length]);

  function close() {
    setActiveIndex(null);
  }

  function previous() {
    setActiveIndex((current) => {
      if (current === null) return null;
      return current === 0 ? images.length - 1 : current - 1;
    });
  }

  function next() {
    setActiveIndex((current) => {
      if (current === null) return null;
      return current === images.length - 1 ? 0 : current + 1;
    });
  }

  const lightbox =
    mounted && isOpen && activeImage
      ? createPortal(
          <div
            className="fixed inset-0 z-[99999] flex items-center justify-center bg-black/[0.94] backdrop-blur-md"
            role="dialog"
            aria-modal="true"
            aria-label="Gallery image preview"
            onMouseDown={(event) => {
              if (event.target === event.currentTarget) close();
            }}
          >
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-black/70 to-transparent"
            />

            <button
              type="button"
              onClick={close}
              aria-label="Close image preview"
              className="fixed right-4 top-4 z-[100001] flex size-11 items-center justify-center rounded-full border border-white/20 bg-black/60 text-white shadow-[0_10px_35px_rgba(0,0,0,0.35)] backdrop-blur-md transition hover:border-white/40 hover:bg-white hover:text-black sm:right-6 sm:top-6"
            >
              <X className="size-5" strokeWidth={1.9} />
            </button>

            {images.length > 1 && (
              <>
                <button
                  type="button"
                  onClick={previous}
                  aria-label="Previous image"
                  className="fixed left-3 top-1/2 z-[100001] flex size-10 -translate-y-1/2 items-center justify-center rounded-full border border-white/20 bg-black/55 text-white shadow-lg backdrop-blur-md transition hover:bg-white hover:text-black sm:left-6 sm:size-12"
                >
                  <ChevronLeft className="size-5 sm:size-6" strokeWidth={1.8} />
                </button>

                <button
                  type="button"
                  onClick={next}
                  aria-label="Next image"
                  className="fixed right-3 top-1/2 z-[100001] flex size-10 -translate-y-1/2 items-center justify-center rounded-full border border-white/20 bg-black/55 text-white shadow-lg backdrop-blur-md transition hover:bg-white hover:text-black sm:right-6 sm:size-12"
                >
                  <ChevronRight className="size-5 sm:size-6" strokeWidth={1.8} />
                </button>
              </>
            )}

            <div
              className="relative flex h-dvh w-screen items-center justify-center px-12 pb-6 pt-16 sm:px-20 sm:pb-8 sm:pt-20"
              onMouseDown={(event) => {
                if (event.target === event.currentTarget) close();
              }}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={activeImage.src}
                alt={activeImage.alt}
                className="max-h-[calc(100dvh-6rem)] max-w-[calc(100vw-5rem)] select-none object-contain shadow-[0_24px_90px_rgba(0,0,0,0.5)] sm:max-h-[calc(100dvh-7rem)] sm:max-w-[calc(100vw-10rem)]"
                draggable={false}
              />
            </div>
          </div>,
          document.body,
        )
      : null;

  return (
    <>
      <div className="columns-1 gap-4 sm:columns-2 lg:columns-3 lg:gap-5 xl:columns-4">
        {visibleImages.map((image, index) => {
          const aspectClass =
            index % 7 === 0
              ? "aspect-[4/5]"
              : index % 5 === 0
                ? "aspect-[16/11]"
                : index % 3 === 0
                  ? "aspect-[5/4]"
                  : "aspect-[4/3]";

          return (
            <div key={image.src} className="mb-4 break-inside-avoid lg:mb-5">
              <button
                type="button"
                onClick={() => setActiveIndex(index)}
                aria-label="Open gallery image"
                className={`group relative block w-full cursor-zoom-in overflow-hidden rounded-[20px] border border-ink/[0.07] bg-ink/[0.025] shadow-[0_12px_36px_rgba(25,25,25,0.05)] transition-[transform,box-shadow,border-color] duration-300 hover:-translate-y-0.5 hover:border-ink/[0.11] hover:shadow-[0_18px_50px_rgba(25,25,25,0.09)] ${aspectClass}`}
              >
                <Image
                  src={image.src}
                  alt={image.alt}
                  fill
                  priority={index < 4}
                  quality={72}
                  sizes="(max-width: 639px) 100vw, (max-width: 1023px) 50vw, (max-width: 1279px) 33vw, 25vw"
                  className="object-cover object-center transition-transform duration-500 ease-out group-hover:scale-[1.018]"
                />
              </button>
            </div>
          );
        })}
      </div>

      {visibleCount < images.length && (
        <div ref={loadMoreRef} aria-hidden="true" className="h-px w-full" />
      )}

      {lightbox}
    </>
  );
}
