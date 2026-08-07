import { readFile, readdir } from "node:fs/promises";
import path from "node:path";

import { describe, expect, it } from "vitest";
import { z } from "zod";

import { dumpMetadataSchema, type DumpMetadata } from "./schema";

const dumpsDirectory = path.join(process.cwd(), "db", "dumps");

const getProjectDirectories = async (): Promise<string[]> => {
  const entries = await readdir(dumpsDirectory, { withFileTypes: true });

  return entries.filter((entry) => entry.isDirectory() && !entry.name.startsWith("_")).map((entry) => entry.name);
};

const readMetadata = async (id: string): Promise<DumpMetadata> => {
  const contents = await readFile(path.join(dumpsDirectory, id, "metadata.json"), "utf8");
  const result = dumpMetadataSchema.safeParse(JSON.parse(contents));

  if (!result.success) throw new Error(`${id}/metadata.json\n${z.prettifyError(result.error)}`);

  return result.data;
};

describe("dump metadata", () => {
  it("matches the metadata schema for every project directory", async () => {
    const projectDirectories = await getProjectDirectories();

    expect(projectDirectories.length).toBeGreaterThan(0);

    for (const directory of projectDirectories) {
      const metadata = await readMetadata(directory);

      expect(metadata.id).toBe(directory);
    }
  });

  it("references Markdown files that exist", async () => {
    const projectDirectories = await getProjectDirectories();

    for (const directory of projectDirectories) {
      const metadata = await readMetadata(directory);
      const markdownBlocks = Object.values(metadata.body).flatMap((blocks) =>
        blocks.filter((block) => block.type === "markdown")
      );

      for (const block of markdownBlocks) {
        await expect(readFile(path.join(dumpsDirectory, directory, block.src), "utf8")).resolves.toBeTypeOf("string");
      }
    }
  });
});
