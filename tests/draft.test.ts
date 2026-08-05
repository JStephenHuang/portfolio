import { describe, expect, it } from "vitest";

import { draftKey, serializeDraftSummary, type DumpDraft } from "@/lib/cms/draft";

describe("draft persistence", () => {
  it("uses scoped keys and serializes without blobs", () => {
    const metadata = { id: "test", title: "Test", description: "Test dump", image: "/test.png", width: 150, defaultPosition: { x: 0.5, y: 0.5 }, links: { general: [] } };
    const draft: DumpDraft = { mode: "edit", id: "test", metadata, markdown: "body", originalMetadata: metadata, originalMarkdown: "", expectedSha: "a".repeat(40), images: [{ id: "1", name: "image.png", path: "/dumps/test/image.png", type: "image/png", size: 1, alt: "alt", blob: new Blob(["x"]) }], updatedAt: 1 };
    expect(draftKey("edit", "test")).toBe("dump-cms:edit:test");
    expect(serializeDraftSummary(draft).images[0]).not.toHaveProperty("blob");
  });
});
