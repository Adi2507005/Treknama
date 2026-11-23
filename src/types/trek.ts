export type Difficulty = "Easy" | "Moderate" | "Challenging";

export type Trek = {
  slug: string;
  name: string;
  location: string;
  difficulty: Difficulty;
  duration: string;
  distance: string;
  estimatedBudget: string;
  imageUrl: string;
  imageAlt: string;
  summary: string;
};
