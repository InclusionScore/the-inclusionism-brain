import GraphExplorer from "@/components/GraphExplorer";
import { getGraph } from "@/lib/content";

export default function GraphPage() {
  return <GraphExplorer graph={getGraph()} />;
}
