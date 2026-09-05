import slugify from "slugify";

export const defaultSubstackFeedUrl = "https://jamesfeltonkeith.substack.com/feed";
export const defaultPodcastFeedUrl = "https://anchor.fm/s/ff971f94/podcast/rss";
export const editorialFeedRevalidateSeconds = 60 * 60;

const wikiRe = /\[\[([^\]|#]+)(?:#[^\]|]+)?(?:\|([^\]]+))?\]\]/g;
const stopWords = new Set([
  "about", "after", "again", "against", "also", "and", "are", "because", "being", "between", "but", "can", "does",
  "from", "has", "have", "how", "into", "its", "more", "not", "our", "that", "the", "their", "this", "through",
  "what", "when", "where", "which", "with", "would", "you"
]);

export function getSubstackFeedUrl() {
  return process.env.SUBSTACK_RSS_URL || process.env.NEXT_PUBLIC_SUBSTACK_RSS_URL || defaultSubstackFeedUrl;
}

export function getPodcastFeedUrl() {
  return process.env.PODCAST_RSS_URL || process.env.NEXT_PUBLIC_PODCAST_RSS_URL || defaultPodcastFeedUrl;
}

export function decodeEntities(value = "") {
  return String(value)
    .replace(/<!\[CDATA\[([\s\S]*?)\]\]>/g, "$1")
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&#(\d+);/g, (_, code) => String.fromCharCode(Number(code)))
    .replace(/&#x([a-f0-9]+);/gi, (_, code) => String.fromCharCode(parseInt(code, 16)));
}

export function stripHtml(value = "") {
  return decodeEntities(value)
    .replace(/<script[\s\S]*?<\/script>/gi, " ")
    .replace(/<style[\s\S]*?<\/style>/gi, " ")
    .replace(/<br\s*\/?>/gi, "\n")
    .replace(/<\/p>/gi, "\n\n")
    .replace(/<[^>]+>/g, " ")
    .replace(/[ \t]+/g, " ")
    .replace(/\n{3,}/g, "\n\n")
    .trim();
}

export function tagValue(item, tag) {
  const match = item.match(new RegExp(`<${tag}(?:\\s[^>]*)?>([\\s\\S]*?)<\\/${tag}>`, "i"));
  return match ? decodeEntities(match[1]).trim() : "";
}

export function tagAttribute(item, tag, attribute) {
  const match = item.match(new RegExp(`<${tag}\\s+([^>]*)>`, "i"));
  if (!match) return "";
  const attrMatch = match[1].match(new RegExp(`${attribute}=["']([^"']+)["']`, "i"));
  return attrMatch ? decodeEntities(attrMatch[1]).trim() : "";
}

export function tagAttributes(item, tag) {
  return [...String(item).matchAll(new RegExp(`<${tag}\\s+([^>]*)\\/?>(?:[\\s\\S]*?<\\/${tag}>)?`, "gi"))].map((match) => {
    const attrs = {};
    for (const attrMatch of match[1].matchAll(/([:\w-]+)=["']([^"']+)["']/g)) {
      attrs[attrMatch[1]] = decodeEntities(attrMatch[2]).trim();
    }
    return attrs;
  });
}

export function itemBlocks(xml) {
  return [...String(xml).matchAll(/<item(?:\s[^>]*)?>([\s\S]*?)<\/item>/gi)].map((match) => match[1]);
}

export function feedSlug(title, link) {
  try {
    const url = new URL(link);
    const last = url.pathname.split("/").filter(Boolean).pop();
    if (last) return slugify(last, { lower: true, strict: true });
  } catch {
    // Fall back to title slug below.
  }
  return slugify(title || "untitled", { lower: true, strict: true });
}

function noteTerms(note) {
  const names = [note.title, ...(note.aliases || [])].filter(Boolean);
  return names.flatMap((name) => String(name).toLowerCase().split(/[^a-z0-9]+/)).filter((term) => term.length > 3 && !stopWords.has(term));
}

export function relatedNotesForText(sourceText, notes) {
  const text = String(sourceText).toLowerCase();
  const linkedTitles = new Set([...String(sourceText).matchAll(wikiRe)].map((match) => match[1].trim().toLowerCase()));

  return notes
    .map((note) => {
      const titleKey = note.title.toLowerCase();
      const aliases = (note.aliases || []).map((alias) => String(alias).toLowerCase());
      const terms = noteTerms(note);
      let score = 0;
      const reasons = [];

      if (linkedTitles.has(titleKey) || aliases.some((alias) => linkedTitles.has(alias))) {
        score += 60;
        reasons.push("wikilink match");
      }

      if (text.includes(titleKey)) {
        score += 30;
        reasons.push("title match");
      }

      const matchedTerms = terms.filter((term) => text.includes(term));
      score += Math.min(matchedTerms.length, 6) * 4;
      if (matchedTerms.length) reasons.push(`term match: ${matchedTerms.slice(0, 3).join(", ")}`);

      return { note, score, reason: reasons.join("; ") };
    })
    .filter(({ score }) => score > 0)
    .sort((a, b) => b.score - a.score || a.note.title.localeCompare(b.note.title))
    .slice(0, 10)
    .map(({ note, reason }) => ({
      slug: note.slug,
      title: note.title,
      category: note.category,
      reason
    }));
}

function sortNewestFirst(items) {
  return [...items].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

export function normalizeMediaUrl(value = "") {
  if (!value) return "";
  try {
    const url = new URL(decodeEntities(value));
    if (!["https:", "http:"].includes(url.protocol)) return "";
    return url.toString();
  } catch {
    return "";
  }
}

function firstSupportedImage(...values) {
  for (const value of values.flat().filter(Boolean)) {
    const url = normalizeMediaUrl(value);
    if (url && /\.(avif|gif|jpe?g|png|webp)(\?|$)/i.test(url)) return url;
    if (url && /\/image\/fetch\//i.test(url)) return url;
  }
  return "";
}

function imageFromEnclosure(item) {
  return firstSupportedImage(
    tagAttributes(item, "enclosure")
      .filter((attrs) => String(attrs.type || "").toLowerCase().startsWith("image/"))
      .map((attrs) => attrs.url)
  );
}

function imageFromMediaTags(item) {
  return firstSupportedImage(
    tagAttributes(item, "media:content").map((attrs) => attrs.url),
    tagAttributes(item, "media:thumbnail").map((attrs) => attrs.url),
    tagAttribute(item, "itunes:image", "href"),
    tagAttribute(item, "image", "href")
  );
}

function imageFromHtml(value = "") {
  const img = String(value).match(/<img\b[^>]*\bsrc=["']([^"']+)["'][^>]*>/i);
  return firstSupportedImage(img?.[1]);
}

function metaContent(html, key) {
  const escaped = key.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const propertyFirst = new RegExp(`<meta\\b[^>]*(?:property|name)=["']${escaped}["'][^>]*content=["']([^"']+)["'][^>]*>`, "i");
  const contentFirst = new RegExp(`<meta\\b[^>]*content=["']([^"']+)["'][^>]*(?:property|name)=["']${escaped}["'][^>]*>`, "i");
  return decodeEntities((html.match(propertyFirst) || html.match(contentFirst) || [])[1] || "");
}

async function fetchPageImage(pageUrl, fetcher, tags) {
  if (!pageUrl) return "";
  try {
    const response = await fetcher(pageUrl, {
      headers: { "User-Agent": "Inclusionism editorial media resolver" },
      next: { revalidate: editorialFeedRevalidateSeconds, tags }
    });
    if (!response.ok) return "";
    const html = await response.text();
    return firstSupportedImage(metaContent(html, "og:image"), metaContent(html, "twitter:image"));
  } catch {
    return "";
  }
}

export function spotifyEpisodeIdFromUrl(value = "") {
  const url = normalizeMediaUrl(value);
  if (!url) return "";
  try {
    const parsed = new URL(url);
    const openMatch = parsed.pathname.match(/\/episode\/([A-Za-z0-9]+)/);
    if (openMatch) return openMatch[1];
    const anchorId = parsed.pathname.split("/").filter(Boolean).pop() || "";
    const idMatch = anchorId.match(/-e([A-Za-z0-9]+)$/i);
    return idMatch ? idMatch[1] : "";
  } catch {
    return "";
  }
}

export function spotifyEmbedUrlFromLink(link = "") {
  const id = spotifyEpisodeIdFromUrl(link);
  return id ? `https://open.spotify.com/embed/episode/${id}` : "";
}

export function parseEssaysFeed(xml, notes = []) {
  const source = tagValue(xml, "title") || "Substack";
  const feedArtwork = firstSupportedImage(tagValue(xml, "url"), tagAttribute(xml, "image", "href"));
  return sortNewestFirst(itemBlocks(xml).map((item) => {
    const title = stripHtml(tagValue(item, "title"));
    const link = tagValue(item, "link") || tagValue(item, "guid");
    const date = tagValue(item, "pubDate") || tagValue(item, "dc:date") || new Date(0).toISOString();
    const rawContent = tagValue(item, "content:encoded") || tagValue(item, "description");
    const content = stripHtml(rawContent);
    const summary = stripHtml(tagValue(item, "description")) || content;
    const heroImage = firstSupportedImage(imageFromEnclosure(item), imageFromMediaTags(item), imageFromHtml(rawContent));
    const parsedDate = new Date(date);
    const slug = feedSlug(title, link);

    return {
      slug,
      title,
      date: Number.isNaN(parsedDate.getTime()) ? new Date(0).toISOString() : parsedDate.toISOString(),
      excerpt: summary.replace(/\s+/g, " ").trim().slice(0, 280),
      link,
      source,
      canonicalUrl: link,
      sourceName: source,
      heroImage,
      heroImageAlt: title,
      fallbackImage: feedArtwork,
      content,
      relatedNotes: relatedNotesForText(`${title}\n\n${content}`, notes)
    };
  }).filter((essay) => essay.title && essay.link));
}

export function parsePodcastFeed(xml, notes = []) {
  const source = tagValue(xml, "title") || "Podcast";
  const artwork = firstSupportedImage(tagAttribute(xml, "itunes:image", "href"), tagValue(xml, "url"), tagAttribute(xml, "image", "href"));

  return sortNewestFirst(itemBlocks(xml).map((item) => {
    const title = stripHtml(tagValue(item, "title"));
    const link = tagValue(item, "link") || tagValue(item, "guid");
    const date = tagValue(item, "pubDate") || tagValue(item, "dc:date") || new Date(0).toISOString();
    const rawDescription = tagValue(item, "content:encoded") || tagValue(item, "description") || tagValue(item, "itunes:summary");
    const description = stripHtml(rawDescription).replace(/\s+/g, " ").trim();
    const audioUrl = tagAttribute(item, "enclosure", "url");
    const audioType = tagAttribute(item, "enclosure", "type");
    const duration = tagValue(item, "itunes:duration");
    const episodeArtwork = firstSupportedImage(imageFromMediaTags(item), tagAttribute(item, "itunes:image", "href"));
    const image = episodeArtwork || artwork;
    const spotifyEmbedUrl = spotifyEmbedUrlFromLink(link);
    const parsedDate = new Date(date);
    const slug = feedSlug(title, link || audioUrl);

    return {
      slug,
      title,
      date: Number.isNaN(parsedDate.getTime()) ? new Date(0).toISOString() : parsedDate.toISOString(),
      description,
      link,
      source,
      canonicalUrl: link,
      sourceName: source,
      audioUrl: normalizeMediaUrl(audioUrl),
      audioType,
      duration,
      image,
      episodeArtwork,
      showArtwork: artwork,
      spotifyUrl: link,
      spotifyEmbedUrl,
      relatedNotes: relatedNotesForText(`${title}\n\n${description}`, notes)
    };
  }).filter((episode) => episode.title && (episode.link || episode.audioUrl)));
}

async function fetchFeedXml(feedUrl, fetcher, tags) {
  const response = await fetcher(feedUrl, {
    headers: { "User-Agent": "Inclusionism editorial feed importer" },
    next: { revalidate: editorialFeedRevalidateSeconds, tags }
  });
  if (!response.ok) throw new Error(`Feed returned ${response.status}`);
  return response.text();
}

export async function fetchEssaysFeed({ notes = [], fallback = [], feedUrl = getSubstackFeedUrl(), fetcher = fetch } = {}) {
  try {
    const xml = await fetchFeedXml(feedUrl, fetcher, ["editorial-feeds", "essays-feed"]);
    const essays = parseEssaysFeed(xml, notes);
    return Promise.all(essays.map(async (essay) => ({
      ...essay,
      heroImage: essay.heroImage || await fetchPageImage(essay.link, fetcher, ["editorial-feeds", "essays-feed", "essay-media"]) || essay.fallbackImage || ""
    })));
  } catch (error) {
    console.warn(`[editorial-feeds] Could not refresh essays feed ${feedUrl}: ${error instanceof Error ? error.message : String(error)}`);
    return sortNewestFirst(fallback);
  }
}

export async function fetchPodcastFeed({ notes = [], fallback = [], feedUrl = getPodcastFeedUrl(), fetcher = fetch } = {}) {
  try {
    const xml = await fetchFeedXml(feedUrl, fetcher, ["editorial-feeds", "podcast-feed"]);
    return parsePodcastFeed(xml, notes);
  } catch (error) {
    console.warn(`[editorial-feeds] Could not refresh podcast feed ${feedUrl}: ${error instanceof Error ? error.message : String(error)}`);
    return sortNewestFirst(fallback);
  }
}
