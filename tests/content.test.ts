import { describe, expect, it } from "vitest";

import { loadDump, loadItems } from "@/lib/data/content.server";

describe("repository content", () => {
  it("loads unique validated items", async () => {
    const items = await loadItems();
    expect(items).toHaveLength(5);
    expect(new Set(items.map((item) => item.id)).size).toBe(items.length);
  });
  it("returns null for a missing safe dump and rejects traversal", async () => {
    await expect(loadDump("missing-dump")).resolves.toBeNull();
    await expect(loadDump("../escape")).rejects.toThrow("Unsafe dump directory");
  });
});
