"use client";

import dynamic from "next/dynamic";
import Link from "next/link";
import { useMemo, useState } from "react";
import type { GraphData, GraphNode } from "@/lib/types";

const ForceGraph2D = dynamic(() => import("react-force-graph-2d"), { ssr: false });

const palette: Record<string, string> = {
  Foundations: "#ffffff",
  "Data Systems": "#0080fb",
  Economics: "#ffffff",
  Governance: "#e4300f",
  "Human Systems": "#0080fb",
  Civilization: "#ffffff",
  "AI and Intelligence": "#0080fb",
  "Inclusionism Core": "#ffffff",
  "Maps of Content": "#e4300f"
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
    <div className="grid min-h-[calc(100vh-65px)] bg-black lg:grid-cols-[1fr_380px]">
      <section className="relative min-h-[70vh] overflow-hidden brain-grid lg:min-h-[calc(100vh-65px)]">
        <div className="pointer-events-none absolute inset-x-0 top-0 z-10 h-24 bg-gradient-to-b from-black via-black/70 to-transparent" />
        <div className="absolute left-3 top-3 z-20 flex max-h-28 max-w-[calc(100%-1.5rem)] flex-wrap gap-2 overflow-y-auto pr-1 sm:left-5 sm:top-5 sm:max-h-none">
          {["All", ...graph.categories].map((item) => (
            <button
              key={item}
              onClick={() => setCategory(item)}
              className={`border px-3 py-2 text-[0.68rem] font-black uppercase tracking-wider transition ${
                category === item
                  ? "border-signal bg-signal text-white"
                  : "border-white/20 bg-black/80 text-white/70 hover:border-white hover:text-white"
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
          linkColor={() => "rgba(255, 255, 255, 0.2)"}
          linkWidth={0.55}
          nodeCanvasObject={(node, ctx, globalScale) => {
            const item = node as GraphNode & { x: number; y: number };
            const radius = Math.max(4, Math.sqrt(item.backlinks + 2) * 2.5);
            const color = palette[item.category] || "#0080fb";
            ctx.beginPath();
            ctx.arc(item.x, item.y, radius, 0, 2 * Math.PI, false);
            ctx.fillStyle = color;
            ctx.shadowBlur = color === "#e4300f" ? 24 : 18;
            ctx.shadowColor = color;
            ctx.fill();
            ctx.shadowBlur = 0;
            if (globalScale > 1.8) {
              ctx.font = `900 ${12 / globalScale}px Arial Narrow, Arial, sans-serif`;
              ctx.fillStyle = "rgba(255,255,255,0.92)";
              ctx.fillText(item.title, item.x + radius + 2, item.y + 3);
            }
          }}
          onNodeClick={(node) => setSelected(node as GraphNode)}
        />
      </section>
      <aside className="border-t border-white/15 bg-black p-5 lg:border-l lg:border-t-0 lg:p-7">
        <p className="brand-kicker">Obsidian-style graph</p>
        <h1 className="brand-title mt-3 text-4xl leading-none xl:text-5xl">Explore<br />the Canon</h1>
        <p className="mt-4 border-l-4 border-red pl-4 text-sm leading-6 text-white/70">
          Each note is a node. Wikilinks become edges. Node size follows backlinks, revealing which concepts the canon recognizes most often.
        </p>
        <div className="ink-panel mt-7 p-5">
          {selected ? (
            <>
              <p className="text-xs font-black uppercase tracking-[0.28em] text-signal">{selected.category}</p>
              <h2 className="brand-title mt-3 text-4xl leading-none">{selected.title}</h2>
              <p className="mt-4 text-sm leading-6 text-white/70">{selected.excerpt || "No excerpt available."}</p>
              <p className="mt-5 text-xs font-bold uppercase tracking-wider text-white/45">
                {selected.backlinks} backlinks · {selected.links} outgoing links
              </p>
              <Link href={`/notes/${selected.id}`} className="hard-button mt-6 inline-flex px-4 py-3 text-xs">
                Open note
              </Link>
            </>
          ) : (
            <p className="text-sm leading-6 text-white/70">Select a node to inspect its role in the Inclusionist knowledge graph.</p>
          )}
        </div>
      </aside>
    </div>
  );
}
