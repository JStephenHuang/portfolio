import "server-only";

import type { Octokit } from "@octokit/rest";

import { CONTENT_BASE_BRANCH, GITHUB_OWNER, GITHUB_REPOSITORY } from "@/lib/cms/constants";
import { itemSchema, type Dump } from "@/lib/data";

const decodeContent = (content: string) => Buffer.from(content.replace(/\n/g, ""), "base64").toString("utf8");

export const loadGitHubDump = async (octokit: InstanceType<typeof Octokit>, id: string): Promise<Dump | null> => {
  const pulls = await octokit.rest.pulls.list({ owner: GITHUB_OWNER, repo: GITHUB_REPOSITORY, state: "open", base: CONTENT_BASE_BRANCH, per_page: 100 });
  const pull = pulls.data.find((candidate) => candidate.body?.includes(`<!-- dump-cms:${id} -->`));
  const branch = pull?.head.ref ?? CONTENT_BASE_BRANCH;
  const reference = await octokit.rest.git.getRef({ owner: GITHUB_OWNER, repo: GITHUB_REPOSITORY, ref: `heads/${branch}` });
  try {
    const [metadataResponse, markdownResponse] = await Promise.all([
      octokit.rest.repos.getContent({ owner: GITHUB_OWNER, repo: GITHUB_REPOSITORY, path: `content/dumps/${id}/metadata.json`, ref: branch }),
      octokit.rest.repos.getContent({ owner: GITHUB_OWNER, repo: GITHUB_REPOSITORY, path: `content/dumps/${id}/body.md`, ref: branch }),
    ]);
    if (Array.isArray(metadataResponse.data) || !("content" in metadataResponse.data) || Array.isArray(markdownResponse.data) || !("content" in markdownResponse.data)) throw new Error("Invalid GitHub content response");
    return {
      metadata: itemSchema.parse(JSON.parse(decodeContent(metadataResponse.data.content))),
      markdown: decodeContent(markdownResponse.data.content),
      sha: reference.data.object.sha,
      branch,
      prNumber: pull?.number,
      prUrl: pull?.html_url,
    };
  } catch (error) {
    if ((error as { status?: number }).status === 404) return null;
    throw error;
  }
};

export const loadTargetSha = async (octokit: InstanceType<typeof Octokit>) => {
  const reference = await octokit.rest.git.getRef({ owner: GITHUB_OWNER, repo: GITHUB_REPOSITORY, ref: `heads/${CONTENT_BASE_BRANCH}` });
  return reference.data.object.sha;
};
