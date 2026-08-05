import type { Item } from "@/lib/data";

export type StagedImage = { id: string; name: string; path: string; type: string; size: number; alt: string; blob: Blob };
export type DumpDraft = {
  mode: "edit" | "create";
  id: string;
  metadata: Item;
  markdown: string;
  originalMetadata: Item | null;
  originalMarkdown: string;
  expectedSha: string;
  branch?: string;
  prNumber?: number;
  prUrl?: string;
  images: StagedImage[];
  updatedAt: number;
};

export const draftKey = (mode: DumpDraft["mode"], id: string) => `dump-cms:${mode}:${id}`;

export const serializeDraftSummary = (draft: DumpDraft) => ({
  mode: draft.mode,
  id: draft.id,
  metadata: draft.metadata,
  markdown: draft.markdown,
  originalMetadata: draft.originalMetadata,
  originalMarkdown: draft.originalMarkdown,
  expectedSha: draft.expectedSha,
  branch: draft.branch,
  prNumber: draft.prNumber,
  prUrl: draft.prUrl,
  images: draft.images.map((image) => ({ id: image.id, name: image.name, path: image.path, type: image.type, size: image.size, alt: image.alt })),
  updatedAt: draft.updatedAt,
});
