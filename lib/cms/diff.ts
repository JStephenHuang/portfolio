import { createTwoFilesPatch } from "diff";

export const canonicalJson = (value: unknown) => `${JSON.stringify(value, null, 2)}\n`;

export const createDumpDiffs = (originalMarkdown: string, markdown: string, originalMetadata: unknown, metadata: unknown) => ({
  markdown: createTwoFilesPatch("body.md", "body.md", originalMarkdown, markdown, "before", "after", { context: 3 }),
  metadata: createTwoFilesPatch("metadata.json", "metadata.json", canonicalJson(originalMetadata), canonicalJson(metadata), "before", "after", { context: 3 }),
});
