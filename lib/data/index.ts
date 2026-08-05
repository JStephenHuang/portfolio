import { z } from "zod";

export const positionSchema = z.object({
  x: z.number(),
  y: z.number(),
});

export const generalLinkSchema = z.object({
  label: z.string().optional(),
  href: z.url(),
});

export const itemLinksSchema = z.object({
  youtube: z.url().optional(),
  github: z.url().optional(),
  general: z.array(generalLinkSchema).optional(),
});

export const itemSchema = z.object({
  id: z.string(),
  title: z.string(),
  description: z.string(),
  image: z.string(),
  width: z.number().positive(),
  defaultPosition: positionSchema,
  links: itemLinksSchema,
});

export type Position = z.infer<typeof positionSchema>;
export type Item = z.infer<typeof itemSchema>;

const aoc: Item = {
  id: "aoc",
  title: "advent of code",
  description: "my humble solutions to Advent of Code problems.",
  image: "/aoc/logo.png",
  width: 150,
  defaultPosition: {
    x: 0.23,
    y: 0.23,
  },
  links: {
    github: "https://github.com/JStephenHuang/AoC",
    general: [{ label: "Advent of Code", href: "https://adventofcode.com/" }],
  },
};

const worldCup2026: Item = {
  id: "world-cup-2026",
  title: "using random forests to predict the world cup",
  description: "An exploration of using random forest models to predict the results of the 2026 World Cup.",
  image: "/rf.avif",
  width: 500,
  defaultPosition: {
    x: 0.2,
    y: 0.3,
  },
  links: {
    github: "https://github.com/JStephenHuang/world-cup-2026",
  },
};

const yap: Item = {
  id: "yap",
  title: "youtube automation pipeline",
  description: "A pipeline for automating the repetitive parts of producing and publishing YouTube videos.",
  image: "/cake.gif",
  width: 150,
  defaultPosition: {
    x: 0.2,
    y: 0.3,
  },
  links: {
    github: "https://github.com/JStephenHuang/yap",
  },
};

const craftingInterpreters: Item = {
  id: "crafting-interpreters",
  title: "building an interpreter",
  description: "An interpreter built while exploring language design, parsing, and runtime implementation.",
  image: "/lox.jpg",
  width: 150,
  defaultPosition: {
    x: 0.2,
    y: 0.3,
  },
  links: {
    github: "https://github.com/JStephenHuang/language-translators/tree/main/lox",
    general: [{ label: "Crafting Interpreters", href: "https://craftinginterpreters.com/" }],
  },
};

export const rootItems: Item[] = [aoc, worldCup2026, yap, craftingInterpreters];
