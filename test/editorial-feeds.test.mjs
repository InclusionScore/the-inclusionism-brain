import assert from "node:assert/strict";
import test from "node:test";
import {
  fetchEssaysFeed,
  fetchPodcastFeed,
  feedSlug,
  parseEssaysFeed,
  parsePodcastFeed
} from "../lib/editorial-feeds.js";

const notes = [
  { slug: "value", title: "Value", category: "Inclusionism Core", aliases: [] },
  { slug: "agency", title: "Agency", category: "Inclusionism Core", aliases: [] },
  { slug: "recognition", title: "Recognition", category: "Inclusionism Core", aliases: [] }
];

const essayXml = `
  <rss><channel><title>James Felton Keith</title>
    <item>
      <title>Older Value Essay</title>
      <link>https://example.com/p/older-value</link>
      <pubDate>Mon, 01 Jan 2024 10:00:00 GMT</pubDate>
      <description><![CDATA[An older essay about [[Value]].]]></description>
      <content:encoded><![CDATA[Value and Agency emerge through interaction.]]></content:encoded>
    </item>
    <item>
      <title>New Recognition Essay</title>
      <link>https://example.com/p/new-recognition</link>
      <pubDate>Mon, 01 Jan 2025 10:00:00 GMT</pubDate>
      <description><![CDATA[A newer essay about Recognition.]]></description>
    </item>
  </channel></rss>
`;

const podcastXml = `
  <rss><channel><title>Inclusionism Podcast</title><itunes:image href="https://example.com/show.jpg" />
    <item>
      <title>Older Episode</title>
      <link>https://example.com/e/older</link>
      <pubDate>Mon, 01 Jan 2024 10:00:00 GMT</pubDate>
      <description>Older episode about Value.</description>
      <itunes:duration>12:34</itunes:duration>
      <enclosure url="https://example.com/older.mp3" type="audio/mpeg" />
    </item>
    <item>
      <title>Newest Episode</title>
      <link>https://example.com/e/newest</link>
      <pubDate>Mon, 01 Jan 2025 10:00:00 GMT</pubDate>
      <description>New episode about Agency and Recognition.</description>
      <enclosure url="https://example.com/newest.mp3" type="audio/mpeg" />
    </item>
  </channel></rss>
`;

test("parses RSS essays and sorts newest first", () => {
  const essays = parseEssaysFeed(essayXml, notes);
  assert.equal(essays.length, 2);
  assert.equal(essays[0].slug, "new-recognition");
  assert.equal(essays[1].slug, "older-value");
  assert.ok(essays[1].relatedNotes.some((note) => note.slug === "value"));
});

test("filters malformed essay feed items", () => {
  const essays = parseEssaysFeed(`
    <rss><channel>
      <item><title></title><link>https://example.com/p/missing-title</link></item>
      <item><title>Missing Link</title></item>
      <item><title>Valid Item</title><link>https://example.com/p/valid-item</link></item>
    </channel></rss>
  `, notes);
  assert.deepEqual(essays.map((essay) => essay.slug), ["valid-item"]);
});

test("parses podcast RSS and sorts newest first", () => {
  const episodes = parsePodcastFeed(podcastXml, notes);
  assert.equal(episodes.length, 2);
  assert.equal(episodes[0].slug, "newest");
  assert.equal(episodes[0].audioUrl, "https://example.com/newest.mp3");
  assert.equal(episodes[0].image, "https://example.com/show.jpg");
  assert.ok(episodes[0].relatedNotes.some((note) => note.slug === "agency"));
});

test("filters malformed podcast feed items", () => {
  const episodes = parsePodcastFeed(`
    <rss><channel>
      <item><title></title><enclosure url="https://example.com/blank.mp3" type="audio/mpeg" /></item>
      <item><title>No Link Or Audio</title></item>
      <item><title>Valid Audio Only</title><enclosure url="https://example.com/valid.mp3" type="audio/mpeg" /></item>
    </channel></rss>
  `, notes);
  assert.deepEqual(episodes.map((episode) => episode.slug), ["validmp3"]);
});

test("feed fetch failure returns newest-first fallback content", async () => {
  const fallback = [
    { slug: "old", title: "Old", date: "2024-01-01T00:00:00.000Z" },
    { slug: "new", title: "New", date: "2025-01-01T00:00:00.000Z" }
  ];
  const essays = await fetchEssaysFeed({
    notes,
    fallback,
    feedUrl: "https://example.com/feed",
    fetcher: async () => {
      throw new Error("network down");
    }
  });
  assert.deepEqual(essays.map((essay) => essay.slug), ["new", "old"]);
});

test("new essay can be discovered without deployment-time JSON", async () => {
  const essays = await fetchEssaysFeed({
    notes,
    fallback: [],
    feedUrl: "https://example.com/feed",
    fetcher: async () => new Response(essayXml, { status: 200 })
  });
  assert.ok(essays.find((essay) => essay.slug === "new-recognition"));
});

test("new podcast episode can be discovered without deployment-time JSON", async () => {
  const episodes = await fetchPodcastFeed({
    notes,
    fallback: [],
    feedUrl: "https://example.com/feed",
    fetcher: async () => new Response(podcastXml, { status: 200 })
  });
  assert.ok(episodes.find((episode) => episode.slug === "newest"));
});

test("dynamic detail route lookup can resolve newly fetched items", async () => {
  const dynamicSlug = feedSlug("Brand New Article", "https://example.com/p/brand-new-article");
  const essays = await fetchEssaysFeed({
    notes,
    fallback: [],
    feedUrl: "https://example.com/feed",
    fetcher: async () => new Response(`
      <rss><channel>
        <item>
          <title>Brand New Article</title>
          <link>https://example.com/p/brand-new-article</link>
          <pubDate>Mon, 01 Jan 2026 10:00:00 GMT</pubDate>
          <description>Newly fetched content.</description>
        </item>
      </channel></rss>
    `, { status: 200 })
  });
  assert.equal(essays.find((essay) => essay.slug === dynamicSlug)?.title, "Brand New Article");
});
