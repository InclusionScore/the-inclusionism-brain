# Inclusionism

A public Next.js knowledge app for exploring, reading, and debating the Inclusionism markdown vault.

Before changing design, navigation, branding, or feature direction, read:

- `docs/GOVERNING_SPECIFICATIONS.md`
- `docs/VERCEL_CUSTOM_DOMAIN_CHECKLIST.md`

The app ingests the Obsidian-style vault in `vault/`, parses `[[wikilinks]]`, and generates:

- `public/data/notes.json`
- `public/data/graph.json`
- `public/data/search.json`
- `public/data/essays.json`
- `public/data/podcast.json`

## Features

- Obsidian-style graph view with category filters and backlink-weighted nodes
- Compare Frameworks section for political, economic, and future-oriented comparisons
- Canon reader with markdown rendering, clickable wikilinks, backlinks, related notes, and search
- Essays section that imports Substack RSS posts and connects think pieces to related canon notes
- Podcast section that imports RSS episodes, audio links, and related canon notes
- Debate Inclusionism page with local retrieval, OpenAI responses when configured, and a local fallback
- PEST Lens page for political, economic, sociocultural, and technological exploration
- Dark, graph-centered public interface

## Setup

```bash
npm install
npm run build:content
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Content Pipeline

The ingestion script reads every `.md` file under `vault/`:

```bash
npm run build:content
```

It extracts note title, category, markdown body, excerpt, outgoing wikilinks, backlinks, graph nodes, graph edges, and a local search index.

Supported wikilink forms include:

- `[[Agency]]`
- `[[Value|value emergence]]`
- `[[Universal Basic Ownership#Section]]`

## Essays / Substack RSS

The app imports essays from James Felton Keith's Substack feed by default:

```bash
https://jamesfeltonkeith.substack.com/feed
```

To override the feed, set this environment variable:

```bash
SUBSTACK_RSS_URL=https://jamesfeltonkeith.substack.com/feed
```

The build writes `public/data/essays.json`. Each imported essay gets:

- title, date, excerpt, and original Substack link
- local detail page under `/essays/[slug]`
- related canon notes matched by terms and Obsidian-style wikilinks
- Debate Mode links for “Debate this essay” and “Suggest Canon Updates”

If the feed cannot be reached, the app still builds and shows an empty-state message on `/essays`.

## Podcast RSS

The app imports podcast episodes from this RSS feed by default:

```bash
https://anchor.fm/s/ff971f94/podcast/rss
```

To override the feed, set this environment variable:

```bash
PODCAST_RSS_URL=https://anchor.fm/s/ff971f94/podcast/rss
```

The build writes `public/data/podcast.json`. Each imported episode gets:

- title, date, description, audio URL, duration, and source link
- local detail page under `/podcast/[slug]`
- related canon notes matched by terms and Obsidian-style wikilinks
- Debate Mode links for “Debate this episode” and “Suggest Canon Updates”

If the feed cannot be reached, the app preserves the last imported podcast index when available.

## Debate API

`POST /api/debate`

Body:

```json
{
  "question": "What part of Inclusionism do you disagree with?"
}
```

The route searches local notes and returns a structured response:

- Inclusionist Position
- Strongest Critique
- Possible Synthesis
- Relevant Notes
- Open Questions
- Suggested Canon Updates

No model key is required. To enable real AI mode, set:

```bash
OPENAI_API_KEY=...
```

Optional model override:

```bash
OPENAI_MODEL=gpt-4.1-mini
```

When `OPENAI_API_KEY` is present, the route sends the user question plus retrieved note excerpts to the OpenAI Responses API. When the key is missing or the API call fails, it falls back to the local structured response.

## Vercel Deployment

1. Push this project to GitHub.
2. Import it in Vercel as a Next.js project.
3. Keep the default install command: `npm install`.
4. Use the default build command: `npm run build`.
5. The build command runs `npm run build:content` before `next build`.
6. Add `OPENAI_API_KEY` in Vercel Environment Variables to enable AI Debate Mode.
7. Optional: add `SUBSTACK_RSS_URL` in Vercel Environment Variables if you want to override the default Substack feed.
8. Optional: add `PODCAST_RSS_URL` in Vercel Environment Variables if you want to override the default podcast feed.

## Recommended Next Steps

- Expand retrieval with embeddings or note-level tags for stronger Debate Mode grounding.
- Add note-level PEST tags or frontmatter to improve filtering beyond folder categories.
- Add graph clustering and saved views for major concept maps.
- Add canonical debate threads for unresolved tensions in ownership, recognition, legitimacy, and AI intelligence.
