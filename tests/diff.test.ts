import { describe, expect, it } from "vitest";

import { canonicalJson, createDumpDiffs } from "@/lib/cms/diff";

describe("review diffs", () => {
  it("formats JSON and diffs deterministically", () => {
    expect(canonicalJson({ b: 2, a: 1 })).toBe('{\n  "b": 2,\n  "a": 1\n}\n');
    const first = createDumpDiffs("old\n", "new\n", { title: "old" }, { title: "new" });
    expect(createDumpDiffs("old\n", "new\n", { title: "old" }, { title: "new" })).toEqual(first);
    expect(first.markdown).toContain("-old");
    expect(first.metadata).toContain('+  "title": "new"');
  });
});
