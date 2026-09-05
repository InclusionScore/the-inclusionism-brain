import type { Essay, Note, PodcastEpisode } from "./types";

export const defaultSubstackFeedUrl: string;
export const defaultPodcastFeedUrl: string;
export const editorialFeedRevalidateSeconds: number;

export function getSubstackFeedUrl(): string;
export function getPodcastFeedUrl(): string;
export function decodeEntities(value?: string): string;
export function stripHtml(value?: string): string;
export function tagValue(item: string, tag: string): string;
export function tagAttribute(item: string, tag: string, attribute: string): string;
export function tagAttributes(item: string, tag: string): Record<string, string>[];
export function itemBlocks(xml: string): string[];
export function feedSlug(title: string, link?: string): string;
export function normalizeMediaUrl(value?: string): string;
export function spotifyEpisodeIdFromUrl(value?: string): string;
export function spotifyEmbedUrlFromLink(link?: string): string;
export function relatedNotesForText(sourceText: string, notes: Note[]): Essay["relatedNotes"];
export function parseEssaysFeed(xml: string, notes?: Note[]): Essay[];
export function parsePodcastFeed(xml: string, notes?: Note[]): PodcastEpisode[];
export function fetchEssaysFeed(options?: {
  notes?: Note[];
  fallback?: Essay[];
  feedUrl?: string;
  fetcher?: typeof fetch;
}): Promise<Essay[]>;
export function fetchPodcastFeed(options?: {
  notes?: Note[];
  fallback?: PodcastEpisode[];
  feedUrl?: string;
  fetcher?: typeof fetch;
}): Promise<PodcastEpisode[]>;
