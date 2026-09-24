# Discoverability and Indexing

Inclusionism.org treats search discovery as part of the canon architecture. Every public Canon note is rendered as server HTML, linked from `/notes`, represented in the sitemap, and connected to neighboring concepts with ordinary links. The graph remains an exploration interface rather than the only navigation system.

## Entity architecture

Stable JSON-LD identifiers connect the site, Inclusionism, James Felton Keith, the Inclusionism Canon, and Keith Institute. Reuse the identifiers in `lib/entities.ts` when adding structured data. Do not create page-specific copies with unrelated `@id` values.

Google-supported structured-data features and general Schema.org vocabulary are deliberately distinguished. Article, Breadcrumb, Organization, ProfilePage, and WebSite data follow Google's documented patterns. `DefinedTerm`, `DefinedTermSet`, `PodcastEpisode`, and book entities improve semantic legibility but are not presented as promises of Google rich-result eligibility.

## Adding a canon concept

1. Add the markdown note to `vault/` with `status: Canon`, a precise `description`, factual `provenance`, intellectual `antecedents`, and `dateModified` when known.
2. Use meaningful `[[wikilinks]]` to connect adjacent concepts. The build converts those relationships to ordinary HTML links and graph edges.
3. Run `npm run build:content`. This regenerates `notes.json`, `search.json`, and `graph.json`.
4. Run `npm run check:links`, `npm test`, `npm run typecheck`, `npm run lint`, and `npm run build`.

A Canon note automatically receives a canonical page, metadata, canonical URL, sitemap entry, graph node, related-concept links, Open Graph data, and structured semantic representation. Related essays are selected from the existing editorial relationship data. The system does not generate or publish derivative articles.

When legacy vault folders contain a short pointer note with the same title as a substantive Canon note, ingestion keeps both source files intact but publishes only the most substantive version. Wikilinks resolve to that canonical version. This prevents duplicate search pages and duplicate graph nodes without deleting repository history.

## Google Search Console checklist

1. Verify the `https://www.inclusionism.org/` URL-prefix property or the `inclusionism.org` domain property.
2. Submit `https://www.inclusionism.org/sitemap.xml` in Sitemaps.
3. Use URL Inspection for the homepage, `/what-is-inclusionism`, `/notes`, `/notes/technological-constructivism`, `/ideas`, and important comparison pages. Request indexing after material revisions, not for every deploy.
4. Review Page Indexing for excluded, duplicate, crawled-not-indexed, and soft-404 URLs.
5. Review Search Results by page and query. Separate branded queries containing “Inclusionism” or “James Felton Keith” from non-branded problem queries about AI ownership, agency, value, technology, equity, and personhood.
6. Monitor impressions, clicks, click-through rate, and average position over time. A page gaining impressions before clicks usually needs a clearer title or description; a page with no impressions may need stronger substance or internal links.
7. Check Crawl Stats and Core Web Vitals for access or rendering regressions. Use Rich Results Test only for Google-supported result types.

Search Console submission helps Google discover and diagnose pages; it does not guarantee indexing or rankings.

## Machine-readable access

- `/canon.json` gives a compact public concept and relationship index.
- `/feed.xml` publishes recent essays and podcast episodes.
- `/llms.txt` provides a concise orientation and citation guide. It supplements normal HTML crawling, canonical URLs, and sitemaps; it is not assumed to be universally honored by AI systems.

## Reference guidance

- Google Article structured data: https://developers.google.com/search/docs/appearance/structured-data/article
- Google ProfilePage structured data: https://developers.google.com/search/docs/appearance/structured-data/profile-page
- Google Organization structured data: https://developers.google.com/search/docs/appearance/structured-data/organization
- Google site names: https://developers.google.com/search/docs/appearance/site-names
- Google Breadcrumb structured data: https://developers.google.com/search/docs/appearance/structured-data/breadcrumb
- Google canonical URL guidance: https://developers.google.com/search/docs/crawling-indexing/consolidate-duplicate-urls
