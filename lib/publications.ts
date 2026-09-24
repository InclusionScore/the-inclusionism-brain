export type Publication = {
  title: string;
  year: number;
  type: string;
  description: string;
  url: string;
};

export const publications: Publication[] = [
  {
    title: "Your Data, Their Wealth: The Price of Human Input to the AI Economy",
    year: 2026,
    type: "Book",
    description: "An argument that human informational contributions are productive inputs whose value should be recognized in the AI economy.",
    url: "https://www.jamesfeltonkeith.com/"
  },
  {
    title: "Data Is Labor",
    year: 2024,
    type: "Book",
    description: "A framework for understanding personal data as a productive contribution and a basis for economic participation and bargaining.",
    url: "https://www.jamesfeltonkeith.com/"
  },
  {
    title: "The Ethics of Personal Data Collection in International Relations",
    year: 2024,
    type: "Edited book series",
    description: "An interdisciplinary series on personal data, international relations, governance, and the ethics of informational systems.",
    url: "https://anthempress.com/"
  }
];
