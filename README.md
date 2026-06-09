# Inclusionism

A public Next.js knowledge app for exploring, reading, and debating the Inclusionism markdown vault.

Before changing design, navigation, branding, or feature direction, read:

- `docs/GOVERNING_SPECIFICATIONS.md`
- `docs/VERCEL_CUSTOM_DOMAIN_CHECKLIST.md`

The app ingests the Obsidian-style vault in `vault/`, parses `[[wikilinks]]`, and generates:

- `public/data/notes.json`
- `public/data/graph.json`
- `public/data/search.json`

## Features

- Obsidian-style graph view with category filters and backlink-weighted nodes
- Canon reader with markdown rendering, clickable wikilinks, backlinks, related notes, and search
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

## Recommended Next Steps

- Expand retrieval with embeddings or note-level tags for stronger Debate Mode grounding.
- Add note-level PEST tags or frontmatter to improve filtering beyond folder categories.
- Add graph clustering and saved views for major concept maps.
- Add canonical debate threads for unresolved tensions in ownership, recognition, legitimacy, and AI intelligence.
