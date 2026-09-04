import type { MetadataRoute } from "next";
import { getEditorialEssays, getEditorialPodcastEpisodes, getReadableNotes } from "@/lib/content";
import { frameworkComparisons } from "@/lib/frameworks";
import { localePath, locales } from "@/lib/i18n";
import { issueLandings } from "@/lib/issues";
import { siteUrl } from "@/lib/site";

export const revalidate = 3600;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const essays = await getEditorialEssays();
  const podcastEpisodes = await getEditorialPodcastEpisodes();
  const staticRoutes = ["", "/what-is-inclusionism", "/issues", "/graph", "/compare", "/notes", "/under-development", "/essays", "/podcast", "/debate", "/pest"].map((path) => ({
    url: siteUrl(path || "/"),
    lastModified: new Date()
  }));

  const noteRoutes = getReadableNotes().map((note) => ({
    url: siteUrl(`/notes/${note.slug}`),
    lastModified: new Date()
  }));

  const essayRoutes = essays.map((essay) => ({
    url: siteUrl(`/essays/${essay.slug}`),
    lastModified: new Date(essay.date)
  }));

  const podcastRoutes = podcastEpisodes.map((episode) => ({
    url: siteUrl(`/podcast/${episode.slug}`),
    lastModified: new Date(episode.date)
  }));

  const compareRoutes = frameworkComparisons.map((framework) => ({
    url: siteUrl(`/compare/${framework.slug}`),
    lastModified: new Date()
  }));

  const issueRoutes = issueLandings.map((issue) => ({
    url: siteUrl(`/issues/${issue.slug}`),
    lastModified: new Date()
  }));

  const localizedStaticRoutes = locales.flatMap((locale) =>
    ["", "/what-is-inclusionism", "/issues", "/graph", "/compare", "/notes", "/debate"].map((path) => ({
      url: siteUrl(localePath(locale, path || "/")),
      lastModified: new Date()
    }))
  );

  const localizedIssueRoutes = locales.flatMap((locale) =>
    issueLandings.map((issue) => ({
      url: siteUrl(localePath(locale, `/issues/${issue.slug}`)),
      lastModified: new Date()
    }))
  );

  const localizedNoteRoutes = locales.flatMap((locale) =>
    getReadableNotes().map((note) => ({
      url: siteUrl(localePath(locale, `/notes/${note.slug}`)),
      lastModified: new Date()
    }))
  );

  return [...staticRoutes, ...noteRoutes, ...essayRoutes, ...podcastRoutes, ...compareRoutes, ...issueRoutes, ...localizedStaticRoutes, ...localizedIssueRoutes, ...localizedNoteRoutes];
}
