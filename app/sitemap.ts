import type { MetadataRoute } from "next";
import { getAllNotes, getEditorialEssays, getEditorialPodcastEpisodes } from "@/lib/content";
import { frameworkComparisons } from "@/lib/frameworks";
import { ideaPages } from "@/lib/ideas";
import { localePath, locales } from "@/lib/i18n";
import { issueLandings } from "@/lib/issues";
import { siteUrl } from "@/lib/site";

export const revalidate = 3600;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const essays = await getEditorialEssays();
  const podcastEpisodes = await getEditorialPodcastEpisodes();
  const staticRoutes = ["", "/what-is-inclusionism", "/issues", "/ideas", "/graph", "/compare", "/notes", "/essays", "/podcast", "/debate", "/pest", "/about/james-felton-keith", "/about/keith-institute", "/publications"].map((path) => ({
    url: siteUrl(path || "/")
  }));

  const noteRoutes = getAllNotes().map((note) => ({
    url: siteUrl(`/notes/${note.slug}`),
    ...(note.dateModified ? { lastModified: new Date(note.dateModified) } : {})
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
    url: siteUrl(`/compare/${framework.slug}`)
  }));

  const issueRoutes = issueLandings.map((issue) => ({
    url: siteUrl(`/issues/${issue.slug}`)
  }));

  const ideaRoutes = ideaPages.map((idea) => ({
    url: siteUrl(`/ideas/${idea.slug}`)
  }));

  const localizedStaticRoutes = locales.filter((locale) => locale !== "en").flatMap((locale) =>
    ["", "/what-is-inclusionism", "/issues", "/graph", "/compare", "/notes", "/debate"].map((path) => ({
      url: siteUrl(localePath(locale, path || "/"))
    }))
  );

  const localizedIssueRoutes = locales.filter((locale) => locale !== "en").flatMap((locale) =>
    issueLandings.map((issue) => ({
      url: siteUrl(localePath(locale, `/issues/${issue.slug}`))
    }))
  );

  return [...staticRoutes, ...noteRoutes, ...essayRoutes, ...podcastRoutes, ...compareRoutes, ...issueRoutes, ...ideaRoutes, ...localizedStaticRoutes, ...localizedIssueRoutes];
}
