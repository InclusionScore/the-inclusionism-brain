"use client";

import dynamic from "next/dynamic";
import Link from "next/link";
import { useMemo, useState } from "react";
import type { GraphData, GraphNode } from "@/lib/types";

const ForceGraph2D = dynamic(() => import("react-force-graph-2d"), { ssr: false });

const palette: Record<string, string> = {
  Foundations: "#8bd3dd",
  "Data Systems": "#9ecf93",
  Economics: "#e7c76f",
  Governance: "#c6a6ff",
  "Human Systems": "#e68aa7",
  Civilization: "#8fb7ff",
  "AI and Intelligence": "#74e0c2",
  "Inclusionism Core": "#f0f4f8",
  "Maps of Content": "#ffb86b"
};

export default function GraphExplorer({ graph }: { graph: GraphData }) {
  const [category, setCategory] = useState("All");
  const [selected, setSelected] = useState<GraphNode | null>(null);

  const filtered = useMemo(() => {
    if (category === "All") return graph;
    const ids = new Set(graph.nodes.filter((node) => node.category === category).map((node) => node.id));
    return {
      categories: graph.categories,
      nodes: graph.nodes.filter((node) => ids.has(node.id)),
      links: graph.links.filter((link) => ids.has(String(link.source)) && ids.has(String(link.target)))
    };
  }, [category, graph]);

  return (
    <div className="grid min-h-[calc(100vh-65px)] lg:grid-cols-[1fr_360px]">
      <section className="relative min-h-[620px] overflow-hidden brain-grid">
        <div className="absolute left-4 top-4 z-10 flex max-w-[calc(100%-2rem)] flex-wrap gap-2">
          {["All", ...graph.categories].map((item) => (
            <button
              key={item}
              onClick={() => setCategory(item)}
              className={`rounded-md border px-3 py-2 text-xs font-medium ${
                category === item
                  ? "border-signal bg-signal/15 text-white"
                  : "border-white/10 bg-ink/70 text-slate-300 hover:border-white/30"
              }`}
            >
              {item}
            </button>
          ))}
        </div>
        <ForceGraph2D
          graphData={filtered}
          backgroundColor="rgba(0,0,0,0)"
          nodeId="id"
          nodeLabel={(node) => (node as GraphNode).title}
          nodeRelSize={4}
          nodeVal={(node) => Math.max(3, Math.sqrt(((node as GraphNode).backlinks || 0) + 2) * 4)}
          linkColor={() => "rgba(139, 211, 221, 0.22)"}
          linkWidth={0.7}
          nodeCanvasObject={(node, ctx, globalScale) => {
            const item = node as GraphNode & { x: number; y: number };
            const radius = Math.max(4, Math.sqrt(item.backlinks + 2) * 2.5);
            ctx.beginPath();
            ctx.arc(item.x, item.y, radius, 0, 2 * Math.PI, false);
            ctx.fillStyle = palette[item.category] || "#8bd3dd";
            ctx.shadowBlur = 14;
            ctx.shadowColor = ctx.fillStyle;
            ctx.fill();
            ctx.shadowBlur = 0;
            if (globalScale > 1.8) {
              ctx.font = `${11 / globalScale}px Inter, sans-serif`;
              ctx.fillStyle = "rgba(233,238,244,0.88)";
              ctx.fillText(item.title, item.x + radius + 2, item.y + 3);
            }
          }}
          onNodeClick={(node) => setSelected(node as GraphNode)}
        />
      </section>
      <aside className="border-l border-white/10 bg-panel/75 p-6">
        <p className="text-xs uppercase tracking-[0.28em] text-signal">Obsidian-style graph</p>
        <h1 className="mt-3 text-3xl font-semibold">Explore the Canon</h1>
        <p className="mt-3 text-sm leading-6 text-slate-300">
          Each note is a node. Wikilinks become edges. Node size follows backlinks, revealing which concepts the canon recognizes most often.
        </p>
        <div className="mt-6 rounded-md border border-white/10 bg-ink/60 p-4">
          {selected ? (
            <>
              <p className="text-xs text-slate-400">{selected.category}</p>
              <h2 className="mt-2 text-xl font-semibold">{selected.title}</h2>
              <p className="mt-3 text-sm leading-6 text-slate-300">{selected.excerpt || "No excerpt available."}</p>
              <p className="mt-4 text-xs text-slate-400">
                {selected.backlinks} backlinks · {selected.links} outgoing links
              </p>
              <Link href={`/notes/${selected.id}`} className="mt-5 inline-flex rounded-md bg-signal px-4 py-2 text-sm font-semibold text-ink">
                Open note
              </Link>
            </>
          ) : (
            <p className="text-sm leading-6 text-slate-300">Select a node to inspect its role in the Inclusionist knowledge graph.</p>
          )}
        </div>
      </aside>
    </div>
  );
}
