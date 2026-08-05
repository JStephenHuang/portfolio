import "server-only";

import { Octokit } from "@octokit/rest";

import { CONTENT_BASE_BRANCH, GITHUB_OWNER, GITHUB_REPOSITORY } from "@/lib/cms/constants";
import { canonicalJson } from "@/lib/cms/diff";
import { dumpIdSchema, itemSchema, type Item } from "@/lib/data";
import { isErr, tryCatch } from "@/lib/error";

export class PublishConflictError extends Error {}

export type PublisherImage = { filename: string; content: Buffer; type: string };
export type PublishInput = {
  mode: "edit" | "create";
  id: string;
  metadata: Item;
  markdown: string;
  commitMessage: string;
  expectedSha: string;
  images: PublisherImage[];
};

type OctokitLike = InstanceType<typeof Octokit>;

export const dumpPaths = (id: string) => ({ metadata: `content/dumps/${id}/metadata.json`, markdown: `content/dumps/${id}/body.md`, imageDirectory: `public/dumps/${id}` });

const getOpenPull = async (octokit: OctokitLike, id: string) => {
  const response = await octokit.rest.pulls.list({ owner: GITHUB_OWNER, repo: GITHUB_REPOSITORY, state: "open", base: CONTENT_BASE_BRANCH, per_page: 100 });
  return response.data.find((pull) => pull.body?.includes(`<!-- dump-cms:${id} -->`));
};

export const publishDump = async (octokit: OctokitLike, input: PublishInput) => {
  const id = dumpIdSchema.parse(input.id);
  const metadata = itemSchema.parse(input.metadata);
  if (metadata.id !== id) throw new Error("Metadata id does not match dump id");
  const paths = dumpPaths(id);
  const base = await octokit.rest.git.getRef({ owner: GITHUB_OWNER, repo: GITHUB_REPOSITORY, ref: `heads/${CONTENT_BASE_BRANCH}` });
  const openPull = await getOpenPull(octokit, id);
  const branch = openPull?.head.ref ?? `content/dump-${id}-${Date.now()}`;
  let currentSha = base.data.object.sha;
  if (openPull) {
    const branchRef = await octokit.rest.git.getRef({ owner: GITHUB_OWNER, repo: GITHUB_REPOSITORY, ref: `heads/${branch}` });
    currentSha = branchRef.data.object.sha;
  } else if (input.mode === "create") {
    try {
      await octokit.rest.repos.getContent({ owner: GITHUB_OWNER, repo: GITHUB_REPOSITORY, path: paths.metadata, ref: CONTENT_BASE_BRANCH });
      throw new PublishConflictError("This dump id already exists");
    } catch (error) {
      if (error instanceof PublishConflictError) throw error;
      if ((error as { status?: number }).status !== 404) throw error;
    }
  }
  if (input.expectedSha !== currentSha) throw new PublishConflictError("Content changed since review");
  const parent = await octokit.rest.git.getCommit({ owner: GITHUB_OWNER, repo: GITHUB_REPOSITORY, commit_sha: currentSha });
  const textBlobs = await Promise.all([
    octokit.rest.git.createBlob({ owner: GITHUB_OWNER, repo: GITHUB_REPOSITORY, content: canonicalJson(metadata), encoding: "utf-8" }),
    octokit.rest.git.createBlob({ owner: GITHUB_OWNER, repo: GITHUB_REPOSITORY, content: input.markdown, encoding: "utf-8" }),
  ]);
  const imageBlobs = await Promise.all(input.images.map((image) => octokit.rest.git.createBlob({ owner: GITHUB_OWNER, repo: GITHUB_REPOSITORY, content: image.content.toString("base64"), encoding: "base64" })));
  const tree = await octokit.rest.git.createTree({
    owner: GITHUB_OWNER,
    repo: GITHUB_REPOSITORY,
    base_tree: parent.data.tree.sha,
    tree: [
      { path: paths.metadata, mode: "100644", type: "blob", sha: textBlobs[0].data.sha },
      { path: paths.markdown, mode: "100644", type: "blob", sha: textBlobs[1].data.sha },
      ...input.images.map((image, index) => ({ path: `${paths.imageDirectory}/${image.filename}`, mode: "100644" as const, type: "blob" as const, sha: imageBlobs[index].data.sha })),
    ],
  });
  const commit = await octokit.rest.git.createCommit({ owner: GITHUB_OWNER, repo: GITHUB_REPOSITORY, message: input.commitMessage, tree: tree.data.sha, parents: [currentSha] });
  if (openPull) await octokit.rest.git.updateRef({ owner: GITHUB_OWNER, repo: GITHUB_REPOSITORY, ref: `heads/${branch}`, sha: commit.data.sha, force: false });
  else await octokit.rest.git.createRef({ owner: GITHUB_OWNER, repo: GITHUB_REPOSITORY, ref: `refs/heads/${branch}`, sha: commit.data.sha });
  let pull = openPull ? { number: openPull.number, html_url: openPull.html_url } : null;
  if (!pull) {
    const pullResult = await tryCatch(octokit.rest.pulls.create({ owner: GITHUB_OWNER, repo: GITHUB_REPOSITORY, base: CONTENT_BASE_BRANCH, head: branch, title: input.commitMessage, body: `<!-- dump-cms:${id} -->\nUpdates \`${id}\` through the dump editor.` }));
    if (isErr(pullResult)) {
      await tryCatch(octokit.rest.git.deleteRef({ owner: GITHUB_OWNER, repo: GITHUB_REPOSITORY, ref: `heads/${branch}` }));
      throw pullResult.error;
    }
    pull = { number: pullResult.data.data.number, html_url: pullResult.data.data.html_url };
  } else {
    await tryCatch(octokit.rest.pulls.update({ owner: GITHUB_OWNER, repo: GITHUB_REPOSITORY, pull_number: pull.number, title: input.commitMessage }));
  }
  return { prNumber: pull.number, prUrl: pull.html_url, branch, commitSha: commit.data.sha };
};

export const createContentOctokit = () => {
  if (!process.env.GITHUB_CONTENT_TOKEN) throw new Error("GITHUB_CONTENT_TOKEN is not configured");
  return new Octokit({ auth: process.env.GITHUB_CONTENT_TOKEN });
};
