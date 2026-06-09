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
  status: "Draft" | "Candidate" | "Canon" | "Deprecated";
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
  status: "Canon";
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

export type EssayRelatedNote = {
  slug: string;
  title: string;
  category: string;
  reason: string;
};

export type Essay = {
  slug: string;
  title: string;
  date: string;
  excerpt: string;
  link: string;
  source: string;
  content: string;
  relatedNotes: EssayRelatedNote[];
};

export type PodcastEpisode = {
  slug: string;
  title: string;
  date: string;
  description: string;
  link: string;
  source: string;
  audioUrl: string;
  audioType: string;
  duration: string;
  relatedNotes: EssayRelatedNote[];
};
