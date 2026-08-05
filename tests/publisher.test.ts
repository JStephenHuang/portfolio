import { describe, expect, it, vi } from "vitest";

import { dumpPaths, PublishConflictError, publishDump } from "@/lib/github/publisher";

const metadata = { id: "test-dump", title: "Test", description: "Description", image: "/cover.png", width: 150, defaultPosition: { x: 0.5, y: 0.5 }, links: { general: [] } };

describe("GitHub publisher", () => {
  it("derives every repository path", () => expect(dumpPaths("test-dump")).toEqual({ metadata: "content/dumps/test-dump/metadata.json", markdown: "content/dumps/test-dump/body.md", imageDirectory: "public/dumps/test-dump" }));
  it("returns a conflict before creating Git objects for stale reviews", async () => {
    const createBlob = vi.fn();
    const octokit = { rest: { git: { getRef: vi.fn().mockResolvedValue({ data: { object: { sha: "b".repeat(40) } } }), createBlob }, pulls: { list: vi.fn().mockResolvedValue({ data: [] }) }, repos: { getContent: vi.fn().mockRejectedValue({ status: 404 }) } } };
    await expect(publishDump(octokit as never, { mode: "edit", id: "test-dump", metadata, markdown: "", commitMessage: "update", expectedSha: "a".repeat(40), images: [] })).rejects.toBeInstanceOf(PublishConflictError);
    expect(createBlob).not.toHaveBeenCalled();
  });
  it("reuses the branch from an open CMS pull request", async () => {
    const git = {
      getRef: vi.fn().mockResolvedValueOnce({ data: { object: { sha: "a".repeat(40) } } }).mockResolvedValueOnce({ data: { object: { sha: "b".repeat(40) } } }),
      getCommit: vi.fn().mockResolvedValue({ data: { tree: { sha: "tree" } } }),
      createBlob: vi.fn().mockResolvedValueOnce({ data: { sha: "metadata" } }).mockResolvedValueOnce({ data: { sha: "markdown" } }),
      createTree: vi.fn().mockResolvedValue({ data: { sha: "new-tree" } }), createCommit: vi.fn().mockResolvedValue({ data: { sha: "commit" } }), updateRef: vi.fn(), createRef: vi.fn(),
    };
    const pull = { number: 7, html_url: "https://github.test/pr/7", head: { ref: "content/existing" }, body: "<!-- dump-cms:test-dump -->" };
    const octokit = { rest: { git, pulls: { list: vi.fn().mockResolvedValue({ data: [pull] }), update: vi.fn() }, repos: { getContent: vi.fn() } } };
    const result = await publishDump(octokit as never, { mode: "edit", id: "test-dump", metadata, markdown: "new", commitMessage: "update", expectedSha: "b".repeat(40), images: [] });
    expect(result.branch).toBe("content/existing");
    expect(git.updateRef).toHaveBeenCalled();
    expect(git.createRef).not.toHaveBeenCalled();
  });
});
