export type Project = {
  alt: string;
  category: string;
  href: `/projects/${string}`;
  id: string;
  repository?: string;
  src: string;
  summary?: string;
  title: string;
};

export const PROJECTS = [
  {
    alt: "World Cup predictor represented by a football branching into decision trees",
    category: "Project",
    href: "/projects/world-cup-2026",
    id: "world-cup-2026",
    repository: "https://github.com/JStephenHuang/world-cup-2026",
    src: "/experience.gif",
    summary:
      "A random-forest match predictor paired with 20,000 Monte Carlo simulations to estimate each country's probability of advancing through the 2026 World Cup.",
    title: "predicting the 2026 world cup using random forests",
  },
  {
    alt: "Blue radial composition representing Advent of Code",
    category: "Project",
    href: "/projects/advent-of-code",
    id: "advent-of-code",
    src: "/torch.gif",
    title: "advent of code 2025",
  },
  {
    alt: "Black and white modular composition representing a Lox interpreter",
    category: "Project",
    href: "/projects/lox-interpreter",
    id: "lox-interpreter",
    src: "/cake.gif",
    title: "building the lox interpreter",
  },
] as const satisfies readonly Project[];

export type ProjectId = (typeof PROJECTS)[number]["id"];

export const getProject = (id: ProjectId): Project | undefined => {
  return PROJECTS.find((project) => project.id === id);
};
