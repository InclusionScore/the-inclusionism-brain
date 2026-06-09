import fs from "node:fs/promises";
import path from "node:path";
import matter from "gray-matter";
import slugify from "slugify";

const root = process.cwd();
const vaultDir = path.join(root, "vault");
const outDir = path.join(root, "public", "data");
const defaultSubstackFeedUrl = "https://jamesfeltonkeith.substack.com/feed";
const defaultPodcastFeedUrl = "https://anchor.fm/s/ff971f94/podcast/rss";
const categories = [
  "Foundations",
  "Data Systems",
  "Economics",
  "Governance",
  "Human Systems",
  "Civilization",
  "AI and Intelligence",
  "Inclusionism Core",
  "Maps of Content"
];

const categoryMap = new Map([
  ["01 Foundations", "Foundations"],
  ["02 Data Systems", "Data Systems"],
  ["03 Economics", "Economics"],
  ["04 Governance", "Governance"],
  ["05 Human Systems", "Human Systems"],
  ["06 Civilization", "Civilization"],
  ["07 AI and Intelligence", "AI and Intelligence"],
  ["08 Inclusionism Core", "Inclusionism Core"],
  ["09 Maps of Content", "Maps of Content"]
]);

const noteStatuses = new Set(["Draft", "Candidate", "Canon", "Deprecated"]);
const wikiRe = /\[\[([^\]|#]+)(?:#[^\]|]+)?(?:\|([^\]]+))?\]\]/g;
const stopWords = new Set([
  "about",
  "after",
  "again",
  "against",
  "also",
  "and",
  "are",
  "because",
  "being",
  "between",
  "but",
  "can",
  "does",
  "from",
  "has",
  "have",
  "how",
  "into",
  "its",
  "more",
  "not",
  "our",
  "that",
  "the",
  "their",
  "this",
  "through",
  "what",
  "when",
  "where",
  "which",
  "with",
  "would",
  "you"
]);

async function walk(dir) {
  const entries = await fs.readdir(dir, { withFileTypes: true });
  const files = await Promise.all(
    entries
      .filter((entry) => !entry.name.startsWith("."))
      .map((entry) => {
        const full = path.join(dir, entry.name);
        return entry.isDirectory() ? walk(full) : full;
      })
  );
  return files.flat().filter((file) => file.endsWith(".md"));
}

function makeSlug(relativePath) {
  const withoutExt = relativePath.replace(/\.md$/i, "");
  return slugify(withoutExt, { lower: true, strict: true });
}

function titleFrom(content, filePath) {
  const heading = content.match(/^#\s+(.+)$/m)?.[1]?.trim();
  return heading || path.basename(filePath, ".md");
}

function categoryFrom(relativePath) {
  const first = relativePath.split(path.sep)[0];
  return categoryMap.get(first) || "Inclusionism Core";
}

function statusFrom(frontmatter) {
  const raw = String(frontmatter.status || frontmatter.canonStatus || "Canon").trim().toLowerCase();
  const normalized = raw === "under development" ? "Candidate" : raw.charAt(0).toUpperCase() + raw.slice(1);
  return noteStatuses.has(normalized) ? normalized : "Canon";
}

function excerpt(content) {
  return content
    .replace(/^---[\s\S]*?---/, "")
    .replace(/^#+\s+/gm, "")
    .replace(wikiRe, "$1")
    .replace(/\s+/g, " ")
    .trim()
    .slice(0, 260);
}

function decodeEntities(value) {
  return value
    .replace(/<!\[CDATA\[([\s\S]*?)\]\]>/g, "$1")
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&#(\d+);/g, (_, code) => String.fromCharCode(Number(code)))
    .replace(/&#x([a-f0-9]+);/gi, (_, code) => String.fromCharCode(parseInt(code, 16)));
}

function stripHtml(value) {
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

function tagValue(item, tag) {
  const match = item.match(new RegExp(`<${tag}(?:\\s[^>]*)?>([\\s\\S]*?)<\\/${tag}>`, "i"));
  return match ? decodeEntities(match[1]).trim() : "";
}

function tagAttribute(item, tag, attribute) {
  const match = item.match(new RegExp(`<${tag}\\s+([^>]*)>`, "i"));
  if (!match) return "";
  const attrMatch = match[1].match(new RegExp(`${attribute}=["']([^"']+)["']`, "i"));
  return attrMatch ? decodeEntities(attrMatch[1]).trim() : "";
}

function itemBlocks(xml) {
  return [...xml.matchAll(/<item(?:\s[^>]*)?>([\s\S]*?)<\/item>/gi)].map((match) => match[1]);
}

function feedSlug(title, link) {
  try {
    const url = new URL(link);
    const last = url.pathname.split("/").filter(Boolean).pop();
    if (last) return slugify(last, { lower: true, strict: true });
  } catch {
    // Fall back to title slug below.
  }
  return slugify(title, { lower: true, strict: true });
}

function noteTerms(note) {
  const names = [note.title, ...note.aliases].filter(Boolean);
  return names.flatMap((name) => String(name).toLowerCase().split(/[^a-z0-9]+/)).filter((term) => term.length > 3 && !stopWords.has(term));
}

function relatedNotesForText(sourceText, notes) {
  const text = sourceText.toLowerCase();
  const linkedTitles = new Set([...sourceText.matchAll(wikiRe)].map((match) => match[1].trim().toLowerCase()));

  return notes
    .map((note) => {
      const titleKey = note.title.toLowerCase();
      const aliases = note.aliases.map((alias) => String(alias).toLowerCase());
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

async function importEssays(notes) {
  const feedUrl = process.env.SUBSTACK_RSS_URL || process.env.NEXT_PUBLIC_SUBSTACK_RSS_URL || defaultSubstackFeedUrl;

  try {
    const response = await fetch(feedUrl, {
      headers: {
        "User-Agent": "Inclusionism content importer"
      }
    });
    if (!response.ok) throw new Error(`RSS feed returned ${response.status}`);

    const xml = await response.text();
    const source = tagValue(xml, "title") || "Substack";
    return itemBlocks(xml).map((item) => {
      const title = stripHtml(tagValue(item, "title"));
      const link = tagValue(item, "link") || tagValue(item, "guid");
      const date = tagValue(item, "pubDate") || tagValue(item, "dc:date") || new Date().toISOString();
      const rawContent = tagValue(item, "content:encoded") || tagValue(item, "description");
      const content = stripHtml(rawContent);
      const summary = stripHtml(tagValue(item, "description")) || content;
      const slug = feedSlug(title, link);

      return {
        slug,
        title,
        date: new Date(date).toISOString(),
        excerpt: summary.replace(/\s+/g, " ").trim().slice(0, 280),
        link,
        source,
        content,
    relatedNotes: relatedNotesForText(`${title}\n\n${content}`, notes)
      };
    }).filter((essay) => essay.title && essay.link);
  } catch (error) {
    console.warn(`Could not import Substack RSS feed: ${error.message}`);
    try {
      const existing = await fs.readFile(path.join(outDir, "essays.json"), "utf8");
      const essays = JSON.parse(existing);
      if (Array.isArray(essays)) {
        console.warn(`Preserving ${essays.length} previously imported essays.`);
        return essays;
      }
    } catch {
      // No previous essay index exists yet.
    }
    return [];
  }
}

async function importPodcastEpisodes(notes) {
  const feedUrl = process.env.PODCAST_RSS_URL || process.env.NEXT_PUBLIC_PODCAST_RSS_URL || defaultPodcastFeedUrl;

  try {
    const response = await fetch(feedUrl, {
      headers: {
        "User-Agent": "Inclusionism content importer"
      }
    });
    if (!response.ok) throw new Error(`Podcast RSS feed returned ${response.status}`);

    const xml = await response.text();
    const source = tagValue(xml, "title") || "Podcast";
    return itemBlocks(xml).map((item) => {
      const title = stripHtml(tagValue(item, "title"));
      const link = tagValue(item, "link") || tagValue(item, "guid");
      const date = tagValue(item, "pubDate") || tagValue(item, "dc:date") || new Date().toISOString();
      const rawDescription = tagValue(item, "content:encoded") || tagValue(item, "description") || tagValue(item, "itunes:summary");
      const description = stripHtml(rawDescription);
      const audioUrl = tagAttribute(item, "enclosure", "url");
      const audioType = tagAttribute(item, "enclosure", "type");
      const duration = tagValue(item, "itunes:duration");
      const slug = feedSlug(title, link || audioUrl);

      return {
        slug,
        title,
        date: new Date(date).toISOString(),
        description: description.replace(/\s+/g, " ").trim(),
        link,
        source,
        audioUrl,
        audioType,
        duration,
        relatedNotes: relatedNotesForText(`${title}\n\n${description}`, notes)
      };
    }).filter((episode) => episode.title && (episode.link || episode.audioUrl));
  } catch (error) {
    console.warn(`Could not import podcast RSS feed: ${error.message}`);
    try {
      const existing = await fs.readFile(path.join(outDir, "podcast.json"), "utf8");
      const episodes = JSON.parse(existing);
      if (Array.isArray(episodes)) {
        console.warn(`Preserving ${episodes.length} previously imported podcast episodes.`);
        return episodes;
      }
    } catch {
      // No previous podcast index exists yet.
    }
    return [];
  }
}

const files = await walk(vaultDir);
const notes = [];
const titleIndex = new Map();

for (const file of files) {
  const raw = await fs.readFile(file, "utf8");
  const parsed = matter(raw);
  const relativePath = path.relative(vaultDir, file);
  const title = titleFrom(parsed.content, file);
  const slug = makeSlug(relativePath);
  const note = {
    slug,
    title,
    path: relativePath.split(path.sep).join("/"),
    category: categoryFrom(relativePath),
    content: parsed.content.trim(),
    excerpt: excerpt(parsed.content),
    status: statusFrom(parsed.data),
    links: [],
    backlinks: [],
    aliases: Array.isArray(parsed.data.aliases) ? parsed.data.aliases : []
  };
  notes.push(note);
  const names = [title, path.basename(file, ".md"), ...note.aliases].map((name) => String(name).toLowerCase());
  for (const name of names) {
    if (!titleIndex.has(name)) titleIndex.set(name, []);
    titleIndex.get(name).push(note);
  }
}

const bySlug = new Map(notes.map((note) => [note.slug, note]));
const links = [];

function resolveLink(source, rawTarget) {
  const normalized = rawTarget.trim().toLowerCase();
  const matches = titleIndex.get(normalized);
  if (!matches?.length) return null;
  if (matches.length === 1) return matches[0];
  const sameCategory = matches.find((candidate) => candidate.category === source.category);
  return sameCategory || matches[0];
}

for (const note of notes) {
  const seen = new Set();
  for (const match of note.content.matchAll(wikiRe)) {
    const rawTarget = match[1];
    const target = resolveLink(note, rawTarget);
    if (!target || target.slug === note.slug || seen.has(target.slug)) continue;
    seen.add(target.slug);
    note.links.push({ slug: target.slug, title: target.title });
    target.backlinks.push({ slug: note.slug, title: note.title });
    links.push({ source: note.slug, target: target.slug });
  }
}

const readableStatuses = new Set(["Canon", "Candidate"]);
const canonNotes = notes.filter((note) => note.status === "Canon");
const candidateNotes = notes.filter((note) => note.status === "Candidate");
const readableNotes = notes.filter((note) => readableStatuses.has(note.status));
const canonSlugs = new Set(canonNotes.map((note) => note.slug));
const readableSlugs = new Set(readableNotes.map((note) => note.slug));

function noteForOutput(note, allowedSlugs) {
  return {
    ...note,
    links: note.links.filter((link) => allowedSlugs.has(link.slug)),
    backlinks: note.backlinks.filter((link) => allowedSlugs.has(link.slug))
  };
}

const graph = {
  categories,
  nodes: canonNotes.map((note) => ({
    id: note.slug,
    title: note.title,
    category: note.category,
    backlinks: note.backlinks.filter((link) => canonSlugs.has(link.slug)).length,
    links: note.links.filter((link) => canonSlugs.has(link.slug)).length,
    excerpt: note.excerpt
  })),
  links: links.filter((link) => canonSlugs.has(link.source) && canonSlugs.has(link.target))
};

const search = canonNotes.map((note) => ({
  slug: note.slug,
  title: note.title,
  category: note.category,
  path: note.path,
  excerpt: note.excerpt,
  status: "Canon",
  text: `${note.title} ${note.category} ${note.content}`.toLowerCase()
}));

const essays = await importEssays(canonNotes);
const podcastEpisodes = await importPodcastEpisodes(canonNotes);

await fs.mkdir(outDir, { recursive: true });
await fs.writeFile(path.join(outDir, "notes.json"), JSON.stringify(canonNotes.map((note) => noteForOutput(note, canonSlugs)).sort((a, b) => a.title.localeCompare(b.title)), null, 2));
await fs.writeFile(path.join(outDir, "candidate-notes.json"), JSON.stringify(candidateNotes.map((note) => noteForOutput(note, readableSlugs)).sort((a, b) => a.title.localeCompare(b.title)), null, 2));
await fs.writeFile(path.join(outDir, "graph.json"), JSON.stringify(graph, null, 2));
await fs.writeFile(path.join(outDir, "search.json"), JSON.stringify(search.sort((a, b) => a.title.localeCompare(b.title)), null, 2));
await fs.writeFile(path.join(outDir, "essays.json"), JSON.stringify(essays.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()), null, 2));
await fs.writeFile(path.join(outDir, "podcast.json"), JSON.stringify(podcastEpisodes.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()), null, 2));

console.log(`Built ${canonNotes.length} canon notes, ${candidateNotes.length} candidate notes, ${graph.links.length} canon graph edges, ${essays.length} essays, and ${podcastEpisodes.length} podcast episodes.`);
