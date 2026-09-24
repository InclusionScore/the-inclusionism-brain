import { getEditorialEssays, getEditorialPodcastEpisodes } from "@/lib/content";
import { siteConfig, siteUrl } from "@/lib/site";

export const revalidate = 3600;

function xml(value: string) {
  return value.replace(/[<>&'"]/g, (character) => ({
    "<": "&lt;",
    ">": "&gt;",
    "&": "&amp;",
    "'": "&apos;",
    '"': "&quot;"
  })[character] || character);
}

export async function GET() {
  const [essays, episodes] = await Promise.all([getEditorialEssays(), getEditorialPodcastEpisodes()]);
  const items = [
    ...essays.map((item) => ({ ...item, kind: "Essay", description: item.excerpt })),
    ...episodes.map((item) => ({ ...item, kind: "Podcast", description: item.description }))
  ]
    .sort((a, b) => Date.parse(b.date) - Date.parse(a.date))
    .slice(0, 40);

  const body = `<?xml version="1.0" encoding="UTF-8" ?>
<rss version="2.0"><channel>
<title>${xml(siteConfig.name)}</title>
<link>${xml(siteUrl("/"))}</link>
<description>${xml(siteConfig.description)}</description>
<language>en-us</language>
${items.map((item) => `<item><title>${xml(item.title)}</title><link>${xml(siteUrl(`/${item.kind === "Essay" ? "essays" : "podcast"}/${item.slug}`))}</link><guid isPermaLink="true">${xml(siteUrl(`/${item.kind === "Essay" ? "essays" : "podcast"}/${item.slug}`))}</guid><pubDate>${new Date(item.date).toUTCString()}</pubDate><category>${item.kind}</category><description>${xml(item.description)}</description></item>`).join("\n")}
</channel></rss>`;

  return new Response(body, {
    headers: { "Content-Type": "application/rss+xml; charset=utf-8", "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=86400" }
  });
}
