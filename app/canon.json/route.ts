import { getAllNotes } from "@/lib/content";
import { entityIds } from "@/lib/entities";
import { siteUrl } from "@/lib/site";

export function GET() {
  const notes = getAllNotes().filter((note) => note.status === "Canon");
  return Response.json({
    name: "Inclusionism Canon",
    description: "The public canonical concepts of Inclusionism and their relationships.",
    framework: entityIds.inclusionism,
    author: entityIds.jamesFeltonKeith,
    canonicalUrl: siteUrl("/notes"),
    generatedAt: new Date().toISOString(),
    concepts: notes.map((note) => ({
      name: note.title,
      url: siteUrl(`/notes/${note.slug}`),
      description: note.description,
      category: note.category,
      dateModified: note.dateModified,
      relatedConcepts: note.links.map((link) => ({ name: link.title, url: siteUrl(`/notes/${link.slug}`) }))
    }))
  }, { headers: { "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=86400" } });
}
