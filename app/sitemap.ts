import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://horoscope-app-sepia.vercel.app";

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
    },
  ];
}