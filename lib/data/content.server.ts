import "server-only";

import { promises as fs } from "node:fs";
import path from "node:path";

import { dumpIdSchema, itemSchema, type Dump, type Item } from ".";

export const DUMPS_DIRECTORY = path.join(process.cwd(), "content", "dumps");

const assertSafeDirectoryName = (name: string) => {
  const parsed = dumpIdSchema.safeParse(name);
  if (!parsed.success || name === "." || name === "..") throw new Error(`Unsafe dump directory: ${name}`);
  return parsed.data;
};

export const loadItems = async (): Promise<Item[]> => {
  const entries = await fs.readdir(DUMPS_DIRECTORY, { withFileTypes: true });
  const directories = entries.filter((entry) => entry.isDirectory()).map((entry) => assertSafeDirectoryName(entry.name));
  const ids = new Set<string>();
  const items = await Promise.all(
    directories.map(async (id) => {
      const raw = await fs.readFile(path.join(DUMPS_DIRECTORY, id, "metadata.json"), "utf8");
      const item = itemSchema.parse(JSON.parse(raw));
      if (item.id !== id) throw new Error(`Dump metadata id does not match directory: ${id}`);
      if (ids.has(item.id)) throw new Error(`Duplicate dump id: ${item.id}`);
      ids.add(item.id);
      return item;
    }),
  );
  return items;
};

export const loadDump = async (id: string): Promise<Dump | null> => {
  const safeId = assertSafeDirectoryName(id);
  try {
    const [metadataRaw, markdown] = await Promise.all([
      fs.readFile(path.join(DUMPS_DIRECTORY, safeId, "metadata.json"), "utf8"),
      fs.readFile(path.join(DUMPS_DIRECTORY, safeId, "body.md"), "utf8"),
    ]);
    const metadata = itemSchema.parse(JSON.parse(metadataRaw));
    if (metadata.id !== safeId) throw new Error(`Dump metadata id does not match directory: ${safeId}`);
    return { metadata, markdown };
  } catch (error) {
    if ((error as NodeJS.ErrnoException).code === "ENOENT") return null;
    throw error;
  }
};
