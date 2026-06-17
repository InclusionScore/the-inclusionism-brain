"use client";

import dynamic from "next/dynamic";
import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";
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

const tourSteps = [
  { id: "connectivity", label: "Connectivity", copy: "Life becomes meaningful through connection." },
  { id: "participation", label: "Participation", copy: "Participation is how connection becomes part of a shared system." },
  { id: "value", label: "Value", copy: "Value emerges through interaction and participation." },
  { id: "recognition", label: "Recognition", copy: "Recognition makes value visible." },
  { id: "relational-attribution", label: "Attribution", copy: "Attribution connects value to the agents and communities who helped create it." },
  { id: "agency", label: "Agency", copy: "Agency is the power to shape, direct, and benefit from the systems one participates in." },
  { id: "equity", label: "Equity", copy: "Equity exists when value is returned as meaningful agency to those who help create it." },
  { id: "legitimacy", label: "Legitimacy", copy: "Legitimacy emerges when systems recognize contribution accurately enough to be trusted." },
  { id: "belonging", label: "Belonging", copy: "Belonging is the lived experience of being recognized as a meaningful participant in the system." }
];

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
  const graphRef = useRef<any>(null);
  const [category, setCategory] = useState("All");
  const [selected, setSelected] = useState<GraphNode | null>(null);
  const [tourActive, setTourActive] = useState(false);
  const [tourIndex, setTourIndex] = useState(0);

  const filtered = useMemo(() => {
    if (category === "All") return graph;
    const ids = new Set(graph.nodes.filter((node) => node.category === category).map((node) => node.id));
    return {
      categories: graph.categories,
      nodes: graph.nodes.filter((node) => ids.has(node.id)),
      links: graph.links.filter((link) => ids.has(String(link.source)) && ids.has(String(link.target)))
    };
  }, [category, graph]);

  const tourStep = tourActive ? tourSteps[tourIndex] : null;
  const tourNode = tourStep ? graph.nodes.find((node) => node.id === tourStep.id) || null : null;
  const tourNeighbors = useMemo(() => {
    if (!tourStep) return new Set<string>();
    const ids = new Set<string>([tourStep.id]);
    for (const link of graph.links) {
      const source = String(link.source);
      const target = String(link.target);
      if (source === tourStep.id) ids.add(target);
      if (target === tourStep.id) ids.add(source);
    }
    return ids;
  }, [graph.links, tourStep]);

  useEffect(() => {
    if (!tourStep) return;
    const node = filtered.nodes.find((item) => item.id === tourStep.id) as CanvasNode | undefined;
    if (!node) return;
    setSelected(node);

    const timer = window.setTimeout(() => {
      if (typeof node.x === "number" && typeof node.y === "number") {
        graphRef.current?.centerAt(node.x, node.y, 700);
        graphRef.current?.zoom(2.4, 700);
      }
    }, 240);

    return () => window.clearTimeout(timer);
  }, [filtered.nodes, tourStep]);

  function startTour() {
    setCategory("All");
    setTourIndex(0);
    setTourActive(true);
  }

  function exitTour() {
    setTourActive(false);
  }

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
          ref={graphRef}
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
            const touchesTourNode = tourStep && (source.id === tourStep.id || target.id === tourStep.id);
            const inTourNeighborhood = tourStep && tourNeighbors.has(source.id) && tourNeighbors.has(target.id);
            const alpha = tourStep
              ? touchesTourNode
                ? 0.72
                : inTourNeighborhood
                  ? 0.24
                  : 0.035
              : Math.max(0.16, Math.min(0.42, 0.28 / Math.sqrt(globalScale)));

            ctx.save();
            ctx.beginPath();
            ctx.moveTo(source.x, source.y);
            ctx.lineTo(midX, source.y);
            ctx.lineTo(midX, target.y);
            ctx.lineTo(target.x, target.y);
            ctx.strokeStyle = touchesTourNode ? "rgba(0,128,251,0.72)" : `rgba(255,255,255,${alpha})`;
            ctx.lineWidth = Math.max(touchesTourNode ? 1.2 : 0.55, 1 / globalScale);
            ctx.stroke();

            ctx.beginPath();
            ctx.moveTo(midX - 2 / globalScale, source.y);
            ctx.lineTo(midX + 2 / globalScale, source.y);
            ctx.moveTo(midX - 2 / globalScale, target.y);
            ctx.lineTo(midX + 2 / globalScale, target.y);
            ctx.strokeStyle = touchesTourNode ? "rgba(228,48,15,0.72)" : "rgba(0,128,251,0.22)";
            ctx.stroke();
            ctx.restore();
          }}
          nodeCanvasObject={(node, ctx, globalScale) => {
            const item = node as CanvasNode;
            const size = nodeSize(item);
            const half = size / 2;
            const color = palette[item.category] || "#0080fb";
            const isTourNode = tourStep?.id === item.id;
            const isTourNeighbor = tourStep ? tourNeighbors.has(item.id) : true;

            ctx.save();
            ctx.globalAlpha = tourStep ? (isTourNode ? 1 : isTourNeighbor ? 0.42 : 0.11) : 1;
            ctx.shadowBlur = isTourNode ? 22 : color === "#e4300f" ? 12 : 9;
            ctx.shadowColor = color;
            ctx.fillStyle = color;
            ctx.fillRect(item.x - half, item.y - half, size, size);

            ctx.shadowBlur = 0;
            ctx.lineWidth = Math.max(1, 1.4 / globalScale);
            ctx.strokeStyle = color === "#ffffff" ? "rgba(0,0,0,0.82)" : "rgba(255,255,255,0.86)";
            ctx.strokeRect(item.x - half, item.y - half, size, size);

            if (item.backlinks > 8) {
              const outer = size + 5;
              ctx.strokeStyle = isTourNode ? "rgba(228,48,15,0.95)" : "rgba(0,128,251,0.55)";
              ctx.strokeRect(item.x - outer / 2, item.y - outer / 2, outer, outer);
            }

            if (isTourNode) {
              const outer = size + 12;
              ctx.lineWidth = Math.max(1.5, 2.4 / globalScale);
              ctx.strokeStyle = "rgba(0,128,251,0.95)";
              ctx.strokeRect(item.x - outer / 2, item.y - outer / 2, outer, outer);
            }

            if (globalScale > 1.8 || isTourNode) {
              ctx.font = `900 ${12 / globalScale}px Arial Narrow, Arial, sans-serif`;
              ctx.fillStyle = "rgba(255,255,255,0.92)";
              ctx.fillText(isTourNode && tourStep ? tourStep.label : item.title, item.x + half + 3, item.y + 4);
            }
            ctx.restore();
          }}
          onNodeClick={(node) => {
            setSelected(node as GraphNode);
            if (tourActive) exitTour();
          }}
        />
      </section>
      <aside className="border-t border-white/15 bg-black p-5 lg:border-l lg:border-t-0 lg:p-7">
        <p className="brand-kicker">{labels.kicker}</p>
        <h1 className="brand-title mt-3 text-4xl leading-none xl:text-5xl">{labels.title}</h1>
        <p className="mt-4 border-l-4 border-red pl-4 text-sm leading-6 text-white/70">
          {labels.description}
        </p>
        <div className="mt-6 border border-white/15 bg-black p-4">
          {tourStep ? (
            <>
              <p className="text-xs font-black uppercase tracking-[0.28em] text-red">
                Guided Tour {tourIndex + 1}/{tourSteps.length}
              </p>
              <h2 className="brand-title mt-3 text-4xl leading-none text-signal">{tourStep.label}</h2>
              <p className="mt-4 text-sm leading-6 text-white/75">{tourStep.copy}</p>
              <div className="mt-5 grid grid-cols-3 gap-2">
                <button
                  type="button"
                  onClick={() => setTourIndex((index) => Math.max(0, index - 1))}
                  disabled={tourIndex === 0}
                  className="outline-button px-3 py-2 text-[0.65rem] disabled:cursor-not-allowed disabled:opacity-35"
                >
                  Back
                </button>
                <button
                  type="button"
                  onClick={() => setTourIndex((index) => Math.min(tourSteps.length - 1, index + 1))}
                  disabled={tourIndex === tourSteps.length - 1}
                  className="hard-button px-3 py-2 text-[0.65rem] disabled:cursor-not-allowed disabled:opacity-35"
                >
                  Next
                </button>
                <button type="button" onClick={exitTour} className="outline-button px-3 py-2 text-[0.65rem]">
                  Exit
                </button>
              </div>
            </>
          ) : (
            <>
              <p className="text-xs font-black uppercase tracking-[0.28em] text-red">Start Here</p>
              <p className="mt-3 text-sm leading-6 text-white/70">
                Follow the conceptual spine from connectivity to belonging, then leave the tour and explore freely.
              </p>
              <button type="button" onClick={startTour} className="hard-button mt-5 px-4 py-3 text-xs">
                Start Guided Tour
              </button>
            </>
          )}
        </div>
        <div className="ink-panel mt-7 p-5">
          {selected ? (
            <>
              <p className="text-xs font-black uppercase tracking-[0.28em] text-signal">{selected.category}</p>
              <h2 className="brand-title mt-3 text-4xl leading-none">{tourStep && selected.id === tourStep.id ? tourStep.label : selected.title}</h2>
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
