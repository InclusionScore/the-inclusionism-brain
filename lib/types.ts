export type NoteLink = {
  slug: string;
  title: string;
};

export type Note = {
  slug: string;
  title: string;
  path: string;
  category: string;
  content: string;
  excerpt: string;
  links: NoteLink[];
  backlinks: NoteLink[];
  aliases: string[];
};

export type SearchEntry = {
  slug: string;
  title: string;
  category: string;
  path: string;
  excerpt: string;
  text: string;
};

export type GraphNode = {
  id: string;
  title: string;
  category: string;
  backlinks: number;
  links: number;
  excerpt: string;
};

export type GraphData = {
  categories: string[];
  nodes: GraphNode[];
  links: { source: string; target: string }[];
};
