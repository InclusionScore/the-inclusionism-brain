import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const notes = JSON.parse(fs.readFileSync(path.join(root, "public/data/notes.json"), "utf8"));
const graph = JSON.parse(fs.readFileSync(path.join(root, "public/data/graph.json"), "utf8"));
const slugs = new Set(notes.map((note) => note.slug));
const errors = [];
const titles = new Set();

for (const note of notes) {
  const title = note.title.toLowerCase();
  if (titles.has(title)) errors.push(`duplicate public canon title: ${note.title}`);
  titles.add(title);
  for (const relationship of [...note.links, ...note.backlinks]) {
    if (!slugs.has(relationship.slug)) errors.push(`${note.slug} references missing note ${relationship.slug}`);
  }
}

const nodeIds = new Set(graph.nodes.map((node) => node.id));
for (const link of graph.links) {
  if (!nodeIds.has(link.source) || !nodeIds.has(link.target)) errors.push(`graph edge has missing endpoint: ${link.source} -> ${link.target}`);
}

if (errors.length) {
  console.error(errors.join("\n"));
  process.exit(1);
}

console.log(`Verified ${notes.length} note pages and ${graph.links.length} graph relationships.`);
