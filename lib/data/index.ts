import { z } from "zod";

export const dumpIdSchema = z.string().regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, "Use a kebab-case slug");

export const positionSchema = z.object({
  x: z.number().min(0).max(1),
  y: z.number().min(0).max(1),
});

const webUrlSchema = z.url().refine((value) => ["http:", "https:"].includes(new URL(value).protocol), "Use an HTTP URL");

export const imageSchema = z.string().refine((value) => {
  if (value.startsWith("/")) return !value.startsWith("//");
  try {
    return ["http:", "https:"].includes(new URL(value).protocol);
  } catch {
    return false;
  }
}, "Use a root-relative path or HTTP URL");

export const generalLinkSchema = z.object({
  label: z.string().trim().max(80).optional(),
  href: webUrlSchema,
});

export const itemLinksSchema = z.object({
  youtube: webUrlSchema.optional(),
  github: webUrlSchema.optional(),
  general: z.array(generalLinkSchema).max(10).default([]),
});

export const itemSchema = z.object({
  id: dumpIdSchema,
  title: z.string().trim().min(1).max(160),
  description: z.string().trim().min(1).max(500),
  image: imageSchema,
  width: z.number().min(80).max(1200),
  defaultPosition: positionSchema,
  links: itemLinksSchema.default({ general: [] }),
});

export const editableMetadataSchema = itemSchema.omit({ id: true });

export type Position = z.infer<typeof positionSchema>;
export type Item = z.infer<typeof itemSchema>;
export type EditableMetadata = z.infer<typeof editableMetadataSchema>;
export type Dump = { metadata: Item; markdown: string; sha?: string; branch?: string; prNumber?: number; prUrl?: string };
