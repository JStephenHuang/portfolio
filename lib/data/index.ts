import { z } from "zod";

export const positionSchema = z.object({
  x: z.number(),
  y: z.number(),
});

export const itemSchema = z.object({
  id: z.string(),
  title: z.string(),
  image: z.string(),
  defaultPosition: positionSchema,
});

export type Position = z.infer<typeof positionSchema>;
export type Item = z.infer<typeof itemSchema>;

const aoc: Item = {
  id: "aoc",
  title: "advent of code",
  image: "/aoc/logo.png",
  defaultPosition: {
    x: 0.23,
    y: 0.23,
  },
};

const worldCup2026: Item = {
  id: "world-cup-2026",
  title: "using random forests to predict the world cup",
  image: "/rf.avif",
  defaultPosition: {
    x: 0.2,
    y: 0.3,
  },
};

const yap: Item = {
  id: "yap",
  title: "youtube automation pipeline",
  image: "/cake.gif",
  defaultPosition: {
    x: 0.2,
    y: 0.3,
  },
};

const craftingInterpreters: Item = {
  id: "crafting-interpreters",
  title: "building an interpreter",
  image: "/lox.jpg",
  defaultPosition: {
    x: 0.2,
    y: 0.3,
  },
};

export const rootItems: Item[] = [aoc, worldCup2026, yap, craftingInterpreters];
