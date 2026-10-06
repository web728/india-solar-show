import type { MetadataRoute } from "next";

const BASE_URL =
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") ||
  "https://indiasolarshow.com";

const pages = [
  "/",
  "/about",
  "/exhibitor",
  "/visitor",
  "/conference",
  "/sponsors",
  "/media-partners",
  "/venue",
  "/floor-plan",
  "/contact",
  "/gallery",
  "/faq",
  "/downloads",
  "/privacy-policy",
  "/terms-conditions",
] as const;

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  return pages.map((path) => ({
    url: `${BASE_URL}${path}`,
    lastModified,
  }));
}