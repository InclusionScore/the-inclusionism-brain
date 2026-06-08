# The Inclusionism Brain

A public Next.js knowledge app for exploring, reading, and debating the Inclusionism markdown vault.

The app ingests the Obsidian-style vault in `vault/`, parses `[[wikilinks]]`, and generates:

- `public/data/notes.json`
- `public/data/graph.json`
- `public/data/search.json`

## Features

- Obsidian-style graph view with category filters and backlink-weighted nodes
- Canon reader with markdown rendering, clickable wikilinks, backlinks, related notes, and search
- Debate Inclusionism page with a local structured response placeholder
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

The first version searches local notes and returns a structured response:

- Inclusionist Position
- Strongest Critique
- Possible Synthesis
- Relevant Notes
- Open Questions
- Suggested Canon Updates

No model key is required. Later, add an AI backend by setting:

```bash
OPENAI_API_KEY=...
```

The route already detects the variable and is designed as the integration point.

## Vercel Deployment

1. Push this project to GitHub.
2. Import it in Vercel as a Next.js project.
3. Keep the default install command: `npm install`.
4. Use the default build command: `npm run build`.
5. The build command runs `npm run build:content` before `next build`.
6. Add `OPENAI_API_KEY` later only when replacing the local Debate placeholder with a real model call.

## Recommended Next Steps

- Add a real retrieval augmented generation flow in `/api/debate`.
- Add note-level PEST tags or frontmatter to improve filtering beyond folder categories.
- Add graph clustering and saved views for major concept maps.
- Add canonical debate threads for unresolved tensions in ownership, recognition, legitimacy, and AI intelligence.
