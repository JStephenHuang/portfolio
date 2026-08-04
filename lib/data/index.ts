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

const aoc2025: Item = {
  id: "aoc-2025",
  title: "advent of code 2025",
  image: "/experience.gif",
  defaultPosition: {
    x: 0.23,
    y: 0.23,
  },
};

const worldCup2026: Item = {
  id: "world-cup-2026",
  title: "using random forests to predict the world cup",
  image: "/cake.gif",
  defaultPosition: {
    x: 0.2,
    y: 0.3,
  },
};

export const rootItems: Item[] = [aoc2025, worldCup2026];
