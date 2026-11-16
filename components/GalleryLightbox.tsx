"use client";

import Image from "next/image";
import {
  memo,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { createPortal } from "react-dom";
import { ChevronLeft, ChevronRight, X } from "lucide-react";

type GalleryImage = {
  src: string;
  alt: string;
};

const INITIAL_BATCH = 12;
const LOAD_BATCH = 12;

const ASPECTS = ["aspect-[4/5]", "aspect-[16/11]", "aspect-[5/4]", "aspect-[4/3]"];

function getAspect(index: number) {
  if (index % 7 === 0) return ASPECTS[0];
  if (index % 5 === 0) return ASPECTS[1];
  if (index % 3 === 0) return ASPECTS[2];
  return ASPECTS[3];
}

/**
 * Memoized: lightbox open/close ya naya batch load hone par
 * purane cards dobara render nahi honge.
 */
const GalleryItem = memo(function GalleryItem({
  image,
  index,
  onOpen,
}: {
  image: GalleryImage;
  index: number;
  onOpen: (index: number) => void;
}) {
  return (
    <div className="mb-4 break-inside-avoid lg:mb-5">
      <button
        type="button"
        onClick={() => onOpen(index)}
        aria-label="Open gallery image"
        className={`group relative block w-full cursor-zoom-in overflow-hidden rounded-[20px] border border-ink/[0.07] bg-ink/[0.025] shadow-[0_12px_36px_rgba(25,25,25,0.05)] transition-[transform,box-shadow,border-color] duration-300 hover:-translate-y-0.5 hover:border-ink/[0.11] hover:shadow-[0_18px_50px_rgba(25,25,25,0.09)] ${getAspect(index)}`}
      >
        <Image
          src={image.src}
          alt={image.alt}
          fill
          // Sirf pehli 2 images priority, baaki lazy. Zyada priority = sab ek saath fetch.
          priority={index < 2}
          // quality prop hata di: default 75 already configured hai, warning nahi aayegi.
          sizes="(max-width: 639px) 100vw, (max-width: 1023px) 50vw, (max-width: 1279px) 33vw, 25vw"
          className="object-cover object-center transition-transform duration-500 ease-out group-hover:scale-[1.018]"
        />
      </button>
    </div>
  );
});

export function GalleryLightbox({ images }: { images: GalleryImage[] }) {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [visibleCount, setVisibleCount] = useState(
    Math.min(INITIAL_BATCH, images.length),
  );
  const [mounted, setMounted] = useState(false);
  const loadMoreRef = useRef<HTMLDivElement | null>(null);

  const total = images.length;

  const visibleImages = useMemo(
    () => images.slice(0, visibleCount),
    [images, visibleCount],
  );

  const activeImage = activeIndex !== null ? images[activeIndex] : null;
  const isOpen = activeImage !== null;

  useEffect(() => {
    setMounted(true);
  }, []);

  // Infinite load
  useEffect(() => {
    const target = loadMoreRef.current;
    if (!target || visibleCount >= total) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (!entries[0]?.isIntersecting) return;
        setVisibleCount((current) => Math.min(current + LOAD_BATCH, total));
      },
      { rootMargin: "1000px 0px", threshold: 0 },
    );

    observer.observe(target);
    return () => observer.disconnect();
  }, [total, visibleCount]);

  const open = useCallback((index: number) => setActiveIndex(index), []);
  const close = useCallback(() => setActiveIndex(null), []);

  const previous = useCallback(() => {
    setActiveIndex((c) => (c === null ? null : c === 0 ? total - 1 : c - 1));
  }, [total]);

  const next = useCallback(() => {
    setActiveIndex((c) => (c === null ? null : c === total - 1 ? 0 : c + 1));
  }, [total]);

  // Keyboard + body scroll lock
  useEffect(() => {
    if (!isOpen) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") close();
      else if (event.key === "ArrowLeft") previous();
      else if (event.key === "ArrowRight") next();
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, close, previous, next]);

  // Aage-peeche wali image pehle se load kar lo, arrow dabate hi instantly dikhe.
  useEffect(() => {
    if (activeIndex === null) return;

    const neighbours = [
      images[(activeIndex + 1) % total],
      images[(activeIndex - 1 + total) % total],
    ];
    neighbours.forEach((img) => {
      if (!img) return;
      const preload = new window.Image();
      preload.src = img.src;
    });
  }, [activeIndex, images, total]);

  const lightbox =
    mounted && activeImage
      ? createPortal(
          <div
            className="fixed inset-0 z-[99999] flex items-center justify-center bg-black/95"
            role="dialog"
            aria-modal="true"
            aria-label="Gallery image preview"
            onMouseDown={(event) => {
              if (event.target === event.currentTarget) close();
            }}
          >
            <button
              type="button"
              onClick={close}
              aria-label="Close image preview"
              className="fixed right-4 top-4 z-[100001] flex size-11 items-center justify-center rounded-full border border-white/20 bg-black/60 text-white transition hover:border-white/40 hover:bg-white hover:text-black sm:right-6 sm:top-6"
            >
              <X className="size-5" strokeWidth={1.9} />
            </button>

            {total > 1 && (
              <>
                <button
                  type="button"
                  onClick={previous}
                  aria-label="Previous image"
                  className="fixed left-3 top-1/2 z-[100001] flex size-10 -translate-y-1/2 items-center justify-center rounded-full border border-white/20 bg-black/55 text-white transition hover:bg-white hover:text-black sm:left-6 sm:size-12"
                >
                  <ChevronLeft className="size-5 sm:size-6" strokeWidth={1.8} />
                </button>

                <button
                  type="button"
                  onClick={next}
                  aria-label="Next image"
                  className="fixed right-3 top-1/2 z-[100001] flex size-10 -translate-y-1/2 items-center justify-center rounded-full border border-white/20 bg-black/55 text-white transition hover:bg-white hover:text-black sm:right-6 sm:size-12"
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
                key={activeImage.src}
                src={activeImage.src}
                alt={activeImage.alt}
                decoding="async"
                className="max-h-[calc(100dvh-6rem)] max-w-[calc(100vw-5rem)] select-none object-contain sm:max-h-[calc(100dvh-7rem)] sm:max-w-[calc(100vw-10rem)]"
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
        {visibleImages.map((image, index) => (
          <GalleryItem
            key={image.src}
            image={image}
            index={index}
            onOpen={open}
          />
        ))}
      </div>

      {visibleCount < total && (
        <div ref={loadMoreRef} aria-hidden="true" className="h-px w-full" />
      )}

      {lightbox}
    </>
  );
}