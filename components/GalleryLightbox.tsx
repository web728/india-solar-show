"use client";

import { useEffect, useState } from "react";
import { ChevronLeft, ChevronRight, X } from "lucide-react";

type GalleryImage = {
  src: string;
  alt: string;
};

export function GalleryLightbox({
  images,
}: {
  images: GalleryImage[];
}) {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const isOpen = activeIndex !== null;
  const activeImage =
    activeIndex !== null ? images[activeIndex] : null;

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

  useEffect(() => {
    if (!isOpen) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") close();
      if (event.key === "ArrowLeft") previous();
      if (event.key === "ArrowRight") next();
    }

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, images.length]);

  return (
    <>
      <div className="columns-1 gap-4 sm:columns-2 lg:columns-3 lg:gap-5 xl:columns-4">
        {images.map((image, index) => {
          const aspectClass =
            index % 7 === 0
              ? "aspect-[4/5]"
              : index % 5 === 0
                ? "aspect-[16/11]"
                : index % 3 === 0
                  ? "aspect-[5/4]"
                  : "aspect-[4/3]";

          return (
            <div
              key={image.src}
              className="mb-4 break-inside-avoid lg:mb-5"
            >
              <button
                type="button"
                onClick={() => setActiveIndex(index)}
                aria-label="Open gallery image"
                className={`group relative block w-full overflow-hidden rounded-[20px] border border-ink/[0.07] bg-ink/[0.025] shadow-[0_16px_50px_rgba(25,25,25,0.06)] transition-[transform,box-shadow,border-color] duration-500 hover:-translate-y-1 hover:border-ink/[0.11] hover:shadow-[0_24px_70px_rgba(25,25,25,0.11)] ${aspectClass}`}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={image.src}
                  alt={image.alt}
                  loading={index < 6 ? "eager" : "lazy"}
                  decoding="async"
                  className="h-full w-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-[1.025]"
                />
              </button>
            </div>
          );
        })}
      </div>

      {isOpen && activeImage ? (
        <div
          className="fixed inset-0 z-[200] flex items-center justify-center bg-black/90 p-3 backdrop-blur-sm sm:p-6"
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
            aria-label="Close image"
            className="absolute right-4 top-4 z-20 flex size-11 items-center justify-center rounded-full border border-white/15 bg-black/35 text-white transition hover:bg-white hover:text-black sm:right-6 sm:top-6"
          >
            <X className="size-5" strokeWidth={1.8} />
          </button>

          {images.length > 1 ? (
            <>
              <button
                type="button"
                onClick={previous}
                aria-label="Previous image"
                className="absolute left-3 top-1/2 z-20 flex size-10 -translate-y-1/2 items-center justify-center rounded-full border border-white/15 bg-black/35 text-white transition hover:bg-white hover:text-black sm:left-6 sm:size-12"
              >
                <ChevronLeft className="size-5 sm:size-6" strokeWidth={1.8} />
              </button>

              <button
                type="button"
                onClick={next}
                aria-label="Next image"
                className="absolute right-3 top-1/2 z-20 flex size-10 -translate-y-1/2 items-center justify-center rounded-full border border-white/15 bg-black/35 text-white transition hover:bg-white hover:text-black sm:right-6 sm:size-12"
              >
                <ChevronRight className="size-5 sm:size-6" strokeWidth={1.8} />
              </button>
            </>
          ) : null}

          <div className="flex h-full w-full items-center justify-center px-8 py-12 sm:px-16">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={activeImage.src}
              alt={activeImage.alt}
              className="max-h-full max-w-full select-none object-contain"
              draggable={false}
            />
          </div>
        </div>
      ) : null}
    </>
  );
}
