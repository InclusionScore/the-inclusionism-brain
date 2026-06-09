import fs from "node:fs/promises";
import path from "node:path";
import matter from "gray-matter";
import slugify from "slugify";

const root = process.cwd();
const vaultDir = path.join(root, "vault");
const outDir = path.join(root, "public", "data");
const defaultSubstackFeedUrl = "https://jamesfeltonkeith.substack.com/feed";
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

function itemBlocks(xml) {
  return [...xml.matchAll(/<item(?:\s[^>]*)?>([\s\S]*?)<\/item>/gi)].map((match) => match[1]);
}

function essaySlug(title, link) {
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

function relatedNotesForEssay(essayText, notes) {
  const text = essayText.toLowerCase();
  const linkedTitles = new Set([...essayText.matchAll(wikiRe)].map((match) => match[1].trim().toLowerCase()));

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
      const slug = essaySlug(title, link);

      return {
        slug,
        title,
        date: new Date(date).toISOString(),
        excerpt: summary.replace(/\s+/g, " ").trim().slice(0, 280),
        link,
        source,
        content,
        relatedNotes: relatedNotesForEssay(`${title}\n\n${content}`, notes)
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

const graph = {
  categories,
  nodes: notes.map((note) => ({
    id: note.slug,
    title: note.title,
    category: note.category,
    backlinks: note.backlinks.length,
    links: note.links.length,
    excerpt: note.excerpt
  })),
  links
};

const search = notes.map((note) => ({
  slug: note.slug,
  title: note.title,
  category: note.category,
  path: note.path,
  excerpt: note.excerpt,
  text: `${note.title} ${note.category} ${note.content}`.toLowerCase()
}));

const essays = await importEssays(notes);

await fs.mkdir(outDir, { recursive: true });
await fs.writeFile(path.join(outDir, "notes.json"), JSON.stringify(notes.sort((a, b) => a.title.localeCompare(b.title)), null, 2));
await fs.writeFile(path.join(outDir, "graph.json"), JSON.stringify(graph, null, 2));
await fs.writeFile(path.join(outDir, "search.json"), JSON.stringify(search.sort((a, b) => a.title.localeCompare(b.title)), null, 2));
await fs.writeFile(path.join(outDir, "essays.json"), JSON.stringify(essays.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()), null, 2));

console.log(`Built ${notes.length} notes, ${links.length} graph edges, and ${essays.length} essays.`);
