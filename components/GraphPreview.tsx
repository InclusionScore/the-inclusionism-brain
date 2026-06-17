"use client";

import dynamic from "next/dynamic";
import { useRouter } from "next/navigation";
import { useEffect, useMemo, useRef, useState } from "react";
import type { GraphData, GraphNode } from "@/lib/types";

const ForceGraph2D = dynamic(() => import("react-force-graph-2d"), { ssr: false });

const spine = ["connectivity", "participation", "value", "recognition", "relational-attribution", "agency", "equity", "legitimacy", "belonging"];
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

function previewNodeSize(node: GraphNode) {
  return Math.max(5, Math.sqrt((node.backlinks || 0) + 2) * 2.9);
}

export default function GraphPreview({ graph, href = "/graph" }: { graph: GraphData; href?: string }) {
  const router = useRouter();
  const frameRef = useRef<HTMLDivElement | null>(null);
  const [hovered, setHovered] = useState<GraphNode | null>(null);
  const [dimensions, setDimensions] = useState({ width: 320, height: 300 });

  const previewGraph = useMemo(() => {
    const spineSet = new Set(spine);
    const neighbors = new Set<string>(spine);

    for (const link of graph.links) {
      const source = String(link.source);
      const target = String(link.target);
      if (spineSet.has(source)) neighbors.add(target);
      if (spineSet.has(target)) neighbors.add(source);
    }

    const rankedNeighbors = graph.nodes
      .filter((node) => neighbors.has(node.id) || node.backlinks > 14)
      .sort((a, b) => Number(spineSet.has(b.id)) - Number(spineSet.has(a.id)) || b.backlinks - a.backlinks)
      .slice(0, 54);
    const ids = new Set(rankedNeighbors.map((node) => node.id));

    return {
      categories: graph.categories,
      nodes: graph.nodes.filter((node) => ids.has(node.id)),
      links: graph.links.filter((link) => ids.has(String(link.source)) && ids.has(String(link.target)))
    };
  }, [graph]);

  const spineSet = useMemo(() => new Set(spine), []);

  useEffect(() => {
    const frame = frameRef.current;
    if (!frame) return;

    const update = () => {
      const rect = frame.getBoundingClientRect();
      setDimensions({
        width: Math.max(280, Math.floor(rect.width)),
        height: Math.max(240, Math.floor(rect.height))
      });
    };

    update();
    const observer = new ResizeObserver(update);
    observer.observe(frame);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={frameRef}
      className="group relative h-[275px] min-w-0 max-w-[calc(100vw-2rem)] overflow-hidden border border-white/20 bg-black shadow-glow transition hover:border-signal sm:h-[320px] sm:max-w-full lg:h-[355px]"
      aria-label="Interactive preview of the Inclusionism graph"
    >
      <div className="pointer-events-none absolute inset-0 z-10 bg-[linear-gradient(180deg,rgba(0,0,0,0)_0%,rgba(0,0,0,0.8)_100%)]" />
      <div className="pointer-events-none absolute inset-x-0 top-0 z-10 h-24 bg-gradient-to-b from-black to-transparent" />
      <div className="pointer-events-none absolute inset-0 z-0 opacity-50 brain-grid" />
      <ForceGraph2D
        graphData={previewGraph}
        width={dimensions.width}
        height={dimensions.height}
        backgroundColor="rgba(0,0,0,0)"
        nodeId="id"
        nodeLabel={(node) => (node as GraphNode).title}
        nodeRelSize={4}
        cooldownTicks={140}
        d3VelocityDecay={0.25}
        linkColor={() => "rgba(255, 255, 255, 0)"}
        linkWidth={0}
        enableZoomInteraction={false}
        enablePanInteraction={false}
        onNodeHover={(node) => setHovered((node as GraphNode | null) || null)}
        onNodeClick={() => router.push(href)}
        onBackgroundClick={() => router.push(href)}
        nodeCanvasObject={(node, ctx, globalScale) => {
          const item = node as CanvasNode;
          const isSpine = spineSet.has(item.id);
          const size = previewNodeSize(item) + (isSpine ? 3 : 0);
          const half = size / 2;
          const color = isSpine ? "#0080fb" : palette[item.category] || "#ffffff";

          ctx.save();
          ctx.globalAlpha = isSpine ? 1 : 0.52;
          ctx.shadowBlur = isSpine ? 15 : 7;
          ctx.shadowColor = color;
          ctx.fillStyle = color;
          ctx.fillRect(item.x - half, item.y - half, size, size);
          ctx.shadowBlur = 0;
          ctx.lineWidth = Math.max(1, 1.2 / globalScale);
          ctx.strokeStyle = isSpine ? "rgba(255,255,255,0.95)" : "rgba(255,255,255,0.45)";
          ctx.strokeRect(item.x - half, item.y - half, size, size);

          if (isSpine) {
            const outer = size + 7;
            ctx.strokeStyle = "rgba(228,48,15,0.72)";
            ctx.strokeRect(item.x - outer / 2, item.y - outer / 2, outer, outer);
          }
          ctx.restore();
        }}
        linkCanvasObject={(link, ctx, globalScale) => {
          const item = link as CanvasLink;
          if (typeof item.source === "string" || typeof item.target === "string") return;
          const source = item.source;
          const target = item.target;
          const sourceSpine = spineSet.has(source.id);
          const targetSpine = spineSet.has(target.id);
          const midX = source.x + (target.x - source.x) * 0.5;

          ctx.save();
          ctx.beginPath();
          ctx.moveTo(source.x, source.y);
          ctx.lineTo(midX, source.y);
          ctx.lineTo(midX, target.y);
          ctx.lineTo(target.x, target.y);
          ctx.strokeStyle = sourceSpine && targetSpine ? "rgba(0,128,251,0.64)" : "rgba(255,255,255,0.18)";
          ctx.lineWidth = Math.max(sourceSpine && targetSpine ? 1.1 : 0.55, 1 / globalScale);
          ctx.stroke();
          ctx.restore();
        }}
      />
      <div className="pointer-events-none absolute bottom-0 left-0 right-0 z-20 max-w-full p-4 sm:p-7">
        <p className="text-[0.68rem] font-black uppercase tracking-[0.28em] text-signal">Live canon graph</p>
        <p className="mt-2 max-w-xs text-sm font-semibold leading-5 text-white sm:max-w-[28rem] sm:text-lg sm:leading-6">
          {hovered ? hovered.title : "A living window into the Inclusionism canon."}
        </p>
        <p className="mt-2 max-w-xs text-[0.72rem] leading-5 text-white/60 sm:max-w-[28rem]">
          Drag nodes, hover to inspect, or click into the full graph experience.
        </p>
        <span className="hard-button mt-4 inline-flex px-3 py-2 text-[0.68rem]">Explore the Graph</span>
      </div>
    </div>
  );
}
