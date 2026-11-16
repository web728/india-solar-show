"use client";

import { useState } from "react";
import { Film, ImageIcon, Play } from "lucide-react";
import { GalleryLightbox } from "@/components/GalleryLightbox";

export interface GalleryImage {
  src: string;
  alt: string;
}

export interface GalleryVideo {
  src: string;
  title: string;
  poster?: string;
}

interface GalleryTabsProps {
  images: GalleryImage[];
  videos: GalleryVideo[];
}

export function GalleryTabs({ images, videos }: GalleryTabsProps) {
  const [tab, setTab] = useState<"photos" | "videos">(
    images.length > 0 ? "photos" : "videos",
  );
  const [playingVideo, setPlayingVideo] = useState<string | null>(null);

  return (
    <div>
      {/* Centered Photos / Videos toggle */}
      <div className="mb-9 flex justify-center sm:mb-11">
        <div
          className="inline-flex rounded-full border border-ink/10 bg-white p-1.5 shadow-sm"
          role="group"
          aria-label="Gallery type"
        >
          <button
            type="button"
            aria-pressed={tab === "photos"}
            onClick={() => {
              setTab("photos");
              setPlayingVideo(null);
            }}
            className={`flex items-center gap-2 rounded-full px-5 py-3 text-sm font-semibold transition-colors sm:px-7 ${
              tab === "photos"
                ? "bg-blue text-white shadow-sm"
                : "text-ink/65 hover:bg-ink/[0.05] hover:text-ink"
            }`}
          >
            <ImageIcon className="h-4 w-4" aria-hidden="true" />
            Photos 
          </button>
          <button
            type="button"
            aria-pressed={tab === "videos"}
            onClick={() => setTab("videos")}
            className={`flex items-center gap-2 rounded-full px-5 py-3 text-sm font-semibold transition-colors sm:px-7 ${
              tab === "videos"
                ? "bg-blue text-white shadow-sm"
                : "text-ink/65 hover:bg-ink/[0.05] hover:text-ink"
            }`}
          >
            <Film className="h-4 w-4" aria-hidden="true" />
            Videos 
          </button>
        </div>
      </div>

      {tab === "photos" ? (
        images.length > 0 ? (
          <GalleryLightbox images={images} />
        ) : (
          <p className="py-12 text-center text-sm text-ink/55">No photos yet.</p>
        )
      ) : videos.length === 0 ? (
        <p className="py-12 text-center text-sm text-ink/55">
          No videos yet. Add MP4 or WebM files to public/video/.
        </p>
      ) : (
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {videos.map((video) => (
            <article
              key={video.src}
              className="overflow-hidden rounded-2xl border border-ink/[0.08] bg-white shadow-sm"
            >
              <div className="relative aspect-video overflow-hidden bg-ink">
                {playingVideo === video.src ? (
                  <video
                    key={video.src}
                    className="h-full w-full object-contain"
                    controls
                    autoPlay
                    playsInline
                    preload="none"
                    poster={video.poster}
                    aria-label={video.title}
                  >
                    <source
                      src={video.src}
                      type={video.src.toLowerCase().endsWith(".webm") ? "video/webm" : "video/mp4"}
                    />
                    Your browser does not support HTML video.
                  </video>
                ) : (
                  <button
                    type="button"
                    onClick={() => setPlayingVideo(video.src)}
                    className="group relative flex h-full w-full items-center justify-center"
                    aria-label={`Play ${video.title}`}
                  >
                    {video.poster ? (
                      // Thumbnails are already optimized WebP files.
                      // eslint-disable-next-line @next/next/no-img-element
                      <img
                        src={video.poster}
                        alt=""
                        loading="lazy"
                        decoding="async"
                        className="absolute inset-0 h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                      />
                    ) : (
                      <Film className="h-14 w-14 text-white/25" aria-hidden="true" />
                    )}
                    <span className="relative z-10 flex h-14 w-14 items-center justify-center rounded-full bg-white/95 text-ink shadow-lg transition-transform group-hover:scale-110">
                      <Play className="ml-0.5 h-6 w-6 fill-current" aria-hidden="true" />
                    </span>
                  </button>
                )}
              </div>
              
            </article>
          ))}
        </div>
      )}
    </div>
  );
}
