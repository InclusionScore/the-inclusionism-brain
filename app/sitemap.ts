import type { MetadataRoute } from "next";
import { getAllNotes } from "@/lib/content";
import { siteUrl } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = ["", "/graph", "/notes", "/debate", "/pest"].map((path) => ({
    url: siteUrl(path || "/"),
    lastModified: new Date()
  }));

  const noteRoutes = getAllNotes().map((note) => ({
    url: siteUrl(`/notes/${note.slug}`),
    lastModified: new Date()
  }));

  return [...staticRoutes, ...noteRoutes];
}
