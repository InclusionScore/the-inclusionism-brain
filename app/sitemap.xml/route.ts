import { getAllEssays, getAllNotes, getAllPodcastEpisodes } from "@/lib/content";
import { frameworkComparisons } from "@/lib/frameworks";
import { ideaPages } from "@/lib/ideas";
import { localePath, locales } from "@/lib/i18n";
import { issueLandings } from "@/lib/issues";
import { siteUrl } from "@/lib/site";

export const dynamic = "force-static";

type SitemapEntry = {
  url: string;
  lastModified?: string;
};

function escapeXml(value: string) {
  return value.replace(/[<>&'"]/g, (character) => ({
    "<": "&lt;",
    ">": "&gt;",
    "&": "&amp;",
    "'": "&apos;",
    '"': "&quot;"
  })[character] || character);
}

function entryXml(entry: SitemapEntry) {
  const lastModified = entry.lastModified ? `\n<lastmod>${escapeXml(entry.lastModified)}</lastmod>` : "";
  return `<url>\n<loc>${escapeXml(entry.url)}</loc>${lastModified}\n</url>`;
}

export function GET() {
  const staticRoutes = ["", "/what-is-inclusionism", "/issues", "/ideas", "/graph", "/compare", "/notes", "/essays", "/podcast", "/debate", "/pest", "/about/james-felton-keith", "/about/keith-institute", "/publications"].map((path) => ({
    url: siteUrl(path || "/")
  }));

  const noteRoutes = getAllNotes().map((note) => ({
    url: siteUrl(`/notes/${note.slug}`),
    ...(note.dateModified ? { lastModified: note.dateModified } : {})
  }));

  const essayRoutes = getAllEssays().map((essay) => ({
    url: siteUrl(`/essays/${essay.slug}`),
    lastModified: new Date(essay.date).toISOString()
  }));

  const podcastRoutes = getAllPodcastEpisodes().map((episode) => ({
    url: siteUrl(`/podcast/${episode.slug}`),
    lastModified: new Date(episode.date).toISOString()
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

  const entries: SitemapEntry[] = [
    ...staticRoutes,
    ...noteRoutes,
    ...essayRoutes,
    ...podcastRoutes,
    ...compareRoutes,
    ...issueRoutes,
    ...ideaRoutes,
    ...localizedStaticRoutes,
    ...localizedIssueRoutes
  ];

  const body = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${entries.map(entryXml).join("\n")}\n</urlset>\n`;

  return new Response(body, {
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
      "Cache-Control": "public, s-maxage=86400, stale-while-revalidate=604800",
      "X-Content-Type-Options": "nosniff"
    }
  });
}
