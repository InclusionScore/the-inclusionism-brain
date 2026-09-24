import assert from "node:assert/strict";
import fs from "node:fs";
import test from "node:test";

const read = (file) => fs.readFileSync(new URL(`../${file}`, import.meta.url), "utf8");

test("public canon index exposes crawlable note links", () => {
  const source = read("app/notes/page.tsx");
  assert.match(source, /href=\{`\/notes\/\$\{note\.slug\}`\}/);
  assert.match(source, /Crawlable Concept Index/);
});

test("stable intellectual entities are reused", () => {
  const entities = read("lib/entities.ts");
  assert.match(entities, /jamesFeltonKeith/);
  assert.match(entities, /keithInstitute/);
  assert.match(entities, /what-is-inclusionism#inclusionism/);
});

test("Technological Constructivism has explicit provenance", () => {
  const note = read("vault/Technological Constructivism.md");
  assert.match(note, /provenance:/);
  assert.match(note, /Technology is constructed by agency and becomes an architecture through which future agency is constructed\./);
});

test("generated public canon has one page per concept title", () => {
  const notes = JSON.parse(read("public/data/notes.json"));
  const titles = notes.map((note) => note.title.toLowerCase());
  assert.equal(new Set(titles).size, titles.length);
  assert.equal(notes.some((note) => note.title.startsWith("#")), false);
});

test("English locale aliases redirect to canonical base routes", () => {
  const config = read("next.config.ts");
  assert.match(config, /source: "\/en\/:path\*"/);
  assert.match(config, /destination: "\/:path\*"/);
});
