import { NextResponse } from "next/server";

import { requireAdminSession } from "@/lib/auth/session";
import { dumpIdSchema } from "@/lib/data";
import { loadGitHubDump } from "@/lib/github/content";
import { createContentOctokit } from "@/lib/github/publisher";

export const GET = async (_request: Request, context: { params: Promise<{ id: string }> }) => {
  try {
    await requireAdminSession();
    const { id: rawId } = await context.params;
    const id = dumpIdSchema.parse(rawId);
    const dump = await loadGitHubDump(createContentOctokit(), id);
    return dump ? NextResponse.json(dump) : NextResponse.json({ error: "Not found" }, { status: 404 });
  } catch (error) {
    if ((error as Error).message === "Unauthorized") return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    return NextResponse.json({ error: "Unable to load dump" }, { status: 400 });
  }
};
