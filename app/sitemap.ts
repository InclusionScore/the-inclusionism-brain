import type { MetadataRoute } from "next";
import { getAllEssays, getAllNotes, getAllPodcastEpisodes } from "@/lib/content";
import { siteUrl } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = ["", "/graph", "/notes", "/essays", "/podcast", "/debate", "/pest"].map((path) => ({
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

  const podcastRoutes = getAllPodcastEpisodes().map((episode) => ({
    url: siteUrl(`/podcast/${episode.slug}`),
    lastModified: new Date(episode.date)
  }));

  return [...staticRoutes, ...noteRoutes, ...essayRoutes, ...podcastRoutes];
}
