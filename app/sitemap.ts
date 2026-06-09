import type { MetadataRoute } from "next";
import { getAllEssays, getAllNotes } from "@/lib/content";
import { siteUrl } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = ["", "/graph", "/notes", "/essays", "/debate", "/pest"].map((path) => ({
    url: siteUrl(path || "/"),
    lastModified: new Date()
  }));

  const noteRoutes = getAllNotes().map((note) => ({
    url: siteUrl(`/notes/${note.slug}`),
    lastModified: new Date()
  }));

  const essayRoutes = getAllEssays().map((essay) => ({
    url: siteUrl(`/essays/${essay.slug}`),
    lastModified: new Date(essay.date)
  }));

  return [...staticRoutes, ...noteRoutes, ...essayRoutes];
}
