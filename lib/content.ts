import fs from "node:fs";
import path from "node:path";
import { marked } from "marked";
import { fetchEssaysFeed, fetchPodcastFeed } from "./editorial-feeds.js";
import type { Essay, GraphData, Note, PodcastEpisode, SearchEntry } from "./types";

const dataDir = path.join(process.cwd(), "public", "data");

function readJson<T>(name: string): T {
  const filePath = path.join(dataDir, name);
  return JSON.parse(fs.readFileSync(filePath, "utf8")) as T;
}

export function getAllNotes(): Note[] {
  return readJson<Note[]>("notes.json");
}

export function getCandidateNotes(): Note[] {
  return readJson<Note[]>("candidate-notes.json");
}

export function getReadableNotes(): Note[] {
  return [...getAllNotes(), ...getCandidateNotes()];
}

export function getGraph(): GraphData {
  return readJson<GraphData>("graph.json");
}

export function getSearchIndex(): SearchEntry[] {
  return readJson<SearchEntry[]>("search.json");
}

export function getAllEssays(): Essay[] {
  return readJson<Essay[]>("essays.json");
}

export function getEssay(slug: string): Essay | undefined {
  return getAllEssays().find((essay) => essay.slug === slug);
}

export function getAllPodcastEpisodes(): PodcastEpisode[] {
  return readJson<PodcastEpisode[]>("podcast.json");
}

export function getPodcastEpisode(slug: string): PodcastEpisode | undefined {
  return getAllPodcastEpisodes().find((episode) => episode.slug === slug);
}

export async function getEditorialEssays(): Promise<Essay[]> {
  return fetchEssaysFeed({ notes: getAllNotes(), fallback: getAllEssays() }) as Promise<Essay[]>;
}

export async function getEditorialEssay(slug: string): Promise<Essay | undefined> {
  return (await getEditorialEssays()).find((essay) => essay.slug === slug);
}

export async function getEditorialPodcastEpisodes(): Promise<PodcastEpisode[]> {
  return fetchPodcastFeed({ notes: getAllNotes(), fallback: getAllPodcastEpisodes() }) as Promise<PodcastEpisode[]>;
}

export async function getEditorialPodcastEpisode(slug: string): Promise<PodcastEpisode | undefined> {
  return (await getEditorialPodcastEpisodes()).find((episode) => episode.slug === slug);
}

export function getNote(slug: string): Note | undefined {
  return getReadableNotes().find((note) => note.slug === slug);
}

export function searchNotes(query: string, limit = 8): SearchEntry[] {
  const terms = query.toLowerCase().split(/\s+/).filter(Boolean);
  if (!terms.length) return [];
  return getSearchIndex()
    .map((entry) => {
      const score = terms.reduce((sum, term) => {
        if (entry.title.toLowerCase().includes(term)) return sum + 8;
        if (entry.category.toLowerCase().includes(term)) return sum + 4;
        if (entry.text.includes(term)) return sum + 1;
        return sum;
      }, 0);
      return { entry, score };
    })
    .filter(({ score }) => score > 0)
    .sort((a, b) => b.score - a.score || a.entry.title.localeCompare(b.entry.title))
    .slice(0, limit)
    .map(({ entry }) => entry);
}

export function renderNoteMarkdown(note: Note, allNotes = note.status === "Canon" ? getAllNotes() : getReadableNotes()): string {
  const byTitle = new Map(allNotes.map((item) => [item.title.toLowerCase(), item]));
  const byFile = new Map(allNotes.map((item) => [item.path.split("/").pop()?.replace(/\.md$/i, "").toLowerCase(), item]));
  const htmlReady = note.content.replace(/\[\[([^\]|#]+)(?:#[^\]|]+)?(?:\|([^\]]+))?\]\]/g, (_, rawTarget: string, alias: string) => {
    const key = rawTarget.trim().toLowerCase();
    const target = byTitle.get(key) || byFile.get(key);
    const label = alias || rawTarget;
    return target ? `[${label}](/notes/${target.slug})` : label;
  });
  return marked.parse(htmlReady, { async: false }) as string;
}
