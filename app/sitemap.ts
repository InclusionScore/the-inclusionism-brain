import type { MetadataRoute } from "next";
import { getAllEssays, getAllPodcastEpisodes, getReadableNotes } from "@/lib/content";
import { frameworkComparisons } from "@/lib/frameworks";
import { siteUrl } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = ["", "/graph", "/compare", "/notes", "/under-development", "/essays", "/podcast", "/debate", "/pest"].map((path) => ({
    url: siteUrl(path || "/"),
    lastModified: new Date()
  }));

  const noteRoutes = getReadableNotes().map((note) => ({
    url: siteUrl(`/notes/${note.slug}`),
    lastModified: new Date()
  }));

  const essayRoutes = getAllEssays().map((essay) => ({
    url: siteUrl(`/essays/${essay.slug}`),
    lastModified: new Date(essay.date)
  }));

  const podcastRoutes = getAllPodcastEpisodes().map((episode) => ({
    url: siteUrl(`/podcast/${episode.slug}`),
    lastModified: new Date(episode.date)
  }));

  const compareRoutes = frameworkComparisons.map((framework) => ({
    url: siteUrl(`/compare/${framework.slug}`),
    lastModified: new Date()
  }));

  return [...staticRoutes, ...noteRoutes, ...essayRoutes, ...podcastRoutes, ...compareRoutes];
}
