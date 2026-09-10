import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL
    ? process.env.NEXT_PUBLIC_SITE_URL.replace(/\/$/, "")
    : "https://indiasolarshow.com";

  const pages = [
    { path: "/", priority: 1.0 },
    { path: "/about", priority: 0.9 },
    { path: "/exhibitor", priority: 0.9 },
    { path: "/visitor", priority: 0.9 },
    { path: "/conference", priority: 0.8 },
    { path: "/sponsors", priority: 0.8 },
    { path: "/media-partners", priority: 0.7 },
    { path: "/venue", priority: 0.8 },
    { path: "/floor-plan", priority: 0.6 },
    { path: "/contact", priority: 0.8 },
    { path: "/gallery", priority: 0.6 },
    { path: "/faq", priority: 0.7 },
    { path: "/downloads", priority: 0.7 },
    { path: "/privacy-policy", priority: 0.3 },
    { path: "/terms-conditions", priority: 0.3 },
  ];

  return pages.map(({ path, priority }) => ({
    url: `${baseUrl}${path}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority,
  }));
}
