import { describe, expect, it } from "vitest";

import { dumpIdSchema, itemSchema } from "@/lib/data";

const validItem = { id: "safe-dump", title: "Safe", description: "Description", image: "/cover.png", width: 150, defaultPosition: { x: 0.5, y: 0.5 }, links: { general: [] } };

describe("dump metadata", () => {
  it("parses valid metadata", () => expect(itemSchema.parse(validItem)).toEqual(validItem));
  it.each(["../escape", "Unsafe", "two words", "double--dash", ""])("rejects unsafe slug %s", (id) => expect(dumpIdSchema.safeParse(id).success).toBe(false));
  it("rejects unsafe links and cover paths", () => {
    expect(itemSchema.safeParse({ ...validItem, image: "javascript:alert(1)" }).success).toBe(false);
    expect(itemSchema.safeParse({ ...validItem, links: { general: [{ href: "javascript:alert(1)" }] } }).success).toBe(false);
  });
});
