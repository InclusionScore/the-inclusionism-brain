import fs from "node:fs/promises";
import path from "node:path";
import matter from "gray-matter";
import slugify from "slugify";

const root = process.cwd();
const vaultDir = path.join(root, "vault");
const outDir = path.join(root, "public", "data");
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

await fs.mkdir(outDir, { recursive: true });
await fs.writeFile(path.join(outDir, "notes.json"), JSON.stringify(notes.sort((a, b) => a.title.localeCompare(b.title)), null, 2));
await fs.writeFile(path.join(outDir, "graph.json"), JSON.stringify(graph, null, 2));
await fs.writeFile(path.join(outDir, "search.json"), JSON.stringify(search.sort((a, b) => a.title.localeCompare(b.title)), null, 2));

console.log(`Built ${notes.length} notes and ${links.length} graph edges.`);
