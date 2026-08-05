import { describe, expect, it } from "vitest";

import { transformMarkdownUrl } from "@/components/content/Markdown";

describe("Markdown URL filtering", () => {
  it.each(["javascript:alert(1)", "data:text/html,test", "//evil.example"])("rejects %s", (url) => expect(transformMarkdownUrl(url)).toBe(""));
  it.each(["/dumps/test/image.png", "relative-page", "#section", "https://example.com", "mailto:test@example.com"])("allows %s", (url) => expect(transformMarkdownUrl(url)).toBe(url));
});
