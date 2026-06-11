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

type CanvasNode = GraphNode & { x: number; y: number };
type CanvasLink = { source: CanvasNode | string; target: CanvasNode | string };

function nodeSize(node: GraphNode) {
  return Math.max(7, Math.sqrt((node.backlinks || 0) + 2) * 4.2);
}

type GraphLabels = {
  kicker: string;
  title: string;
  description: string;
  select: string;
  all: string;
  backlinks: string;
  outgoing: string;
  openNote: string;
};

const defaultLabels: GraphLabels = {
  kicker: "Obsidian-style graph",
  title: "Explore the Canon",
  description:
    "Each note is a square block. Wikilinks become engineered paths. Node size follows backlinks, revealing which concepts act as load-bearing structures in the canon.",
  select: "Select a node to inspect its role in the Inclusionist knowledge graph.",
  all: "All",
  backlinks: "backlinks",
  outgoing: "outgoing links",
  openNote: "Open note"
};

export default function GraphExplorer({ graph, labels = defaultLabels, noteHrefPrefix = "/notes" }: { graph: GraphData; labels?: GraphLabels; noteHrefPrefix?: string }) {
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
              {item === "All" ? labels.all : item}
            </button>
          ))}
        </div>
        <div className="pointer-events-none absolute inset-0 z-0 opacity-50">
          <div className="absolute left-1/2 top-0 h-full w-px bg-signal/20" />
          <div className="absolute left-0 top-1/2 h-px w-full bg-signal/20" />
        </div>
        <ForceGraph2D
          graphData={filtered}
          backgroundColor="rgba(0,0,0,0)"
          nodeId="id"
          nodeLabel={(node) => (node as GraphNode).title}
          nodeRelSize={4}
          nodeVal={(node) => nodeSize(node as GraphNode)}
          linkColor={() => "rgba(255, 255, 255, 0)"}
          linkWidth={0}
          linkCanvasObject={(link, ctx, globalScale) => {
            const item = link as CanvasLink;
            if (typeof item.source === "string" || typeof item.target === "string") return;
            const source = item.source;
            const target = item.target;
            const midX = source.x + (target.x - source.x) * 0.5;
            const alpha = Math.max(0.16, Math.min(0.42, 0.28 / Math.sqrt(globalScale)));

            ctx.save();
            ctx.beginPath();
            ctx.moveTo(source.x, source.y);
            ctx.lineTo(midX, source.y);
            ctx.lineTo(midX, target.y);
            ctx.lineTo(target.x, target.y);
            ctx.strokeStyle = `rgba(255,255,255,${alpha})`;
            ctx.lineWidth = Math.max(0.55, 1 / globalScale);
            ctx.stroke();

            ctx.beginPath();
            ctx.moveTo(midX - 2 / globalScale, source.y);
            ctx.lineTo(midX + 2 / globalScale, source.y);
            ctx.moveTo(midX - 2 / globalScale, target.y);
            ctx.lineTo(midX + 2 / globalScale, target.y);
            ctx.strokeStyle = "rgba(0,128,251,0.22)";
            ctx.stroke();
            ctx.restore();
          }}
          nodeCanvasObject={(node, ctx, globalScale) => {
            const item = node as CanvasNode;
            const size = nodeSize(item);
            const half = size / 2;
            const color = palette[item.category] || "#0080fb";

            ctx.save();
            ctx.shadowBlur = color === "#e4300f" ? 12 : 9;
            ctx.shadowColor = color;
            ctx.fillStyle = color;
            ctx.fillRect(item.x - half, item.y - half, size, size);

            ctx.shadowBlur = 0;
            ctx.lineWidth = Math.max(1, 1.4 / globalScale);
            ctx.strokeStyle = color === "#ffffff" ? "rgba(0,0,0,0.82)" : "rgba(255,255,255,0.86)";
            ctx.strokeRect(item.x - half, item.y - half, size, size);

            if (item.backlinks > 8) {
              const outer = size + 5;
              ctx.strokeStyle = "rgba(0,128,251,0.55)";
              ctx.strokeRect(item.x - outer / 2, item.y - outer / 2, outer, outer);
            }

            if (globalScale > 1.8) {
              ctx.font = `900 ${12 / globalScale}px Arial Narrow, Arial, sans-serif`;
              ctx.fillStyle = "rgba(255,255,255,0.92)";
              ctx.fillText(item.title, item.x + half + 3, item.y + 4);
            }
            ctx.restore();
          }}
          onNodeClick={(node) => setSelected(node as GraphNode)}
        />
      </section>
      <aside className="border-t border-white/15 bg-black p-5 lg:border-l lg:border-t-0 lg:p-7">
        <p className="brand-kicker">{labels.kicker}</p>
        <h1 className="brand-title mt-3 text-4xl leading-none xl:text-5xl">{labels.title}</h1>
        <p className="mt-4 border-l-4 border-red pl-4 text-sm leading-6 text-white/70">
          {labels.description}
        </p>
        <div className="ink-panel mt-7 p-5">
          {selected ? (
            <>
              <p className="text-xs font-black uppercase tracking-[0.28em] text-signal">{selected.category}</p>
              <h2 className="brand-title mt-3 text-4xl leading-none">{selected.title}</h2>
              <p className="mt-4 text-sm leading-6 text-white/70">{selected.excerpt || "No excerpt available."}</p>
              <p className="mt-5 text-xs font-bold uppercase tracking-wider text-white/45">
                {selected.backlinks} {labels.backlinks} · {selected.links} {labels.outgoing}
              </p>
              <Link href={`${noteHrefPrefix}/${selected.id}`} className="hard-button mt-6 inline-flex px-4 py-3 text-xs">
                {labels.openNote}
              </Link>
            </>
          ) : (
            <p className="text-sm leading-6 text-white/70">{labels.select}</p>
          )}
        </div>
      </aside>
    </div>
  );
}
