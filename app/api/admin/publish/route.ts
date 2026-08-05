import { NextResponse } from "next/server";
import { z } from "zod";

import { requireAdminSession } from "@/lib/auth/session";
import { ALLOWED_IMAGE_TYPES, MAX_COMMIT_IMAGE_SIZE, MAX_IMAGE_SIZE } from "@/lib/cms/constants";
import { dumpIdSchema, itemSchema } from "@/lib/data";
import { createContentOctokit, PublishConflictError, publishDump } from "@/lib/github/publisher";

const requestSchema = z.object({
  mode: z.enum(["edit", "create"]),
  id: dumpIdSchema,
  metadata: itemSchema,
  markdown: z.string().max(2_000_000),
  commitMessage: z.string().trim().min(1).max(200),
  expectedSha: z.string().regex(/^[a-f0-9]{40}$/),
});

const fileNameSchema = /^[a-f0-9-]{36}\.(?:png|jpe?g|webp|gif|avif)$/;

export const POST = async (request: Request) => {
  try {
    await requireAdminSession();
    const formData = await request.formData();
    const parsed = requestSchema.parse({
      mode: formData.get("mode"), id: formData.get("id"), metadata: JSON.parse(String(formData.get("metadata"))),
      markdown: formData.get("markdown"), commitMessage: formData.get("commitMessage"), expectedSha: formData.get("expectedSha"),
    });
    const files = formData.getAll("images");
    if (files.some((file) => !(file instanceof File))) throw new Error("Invalid image upload");
    const images = files as File[];
    if (images.some((file) => !ALLOWED_IMAGE_TYPES.includes(file.type as (typeof ALLOWED_IMAGE_TYPES)[number]) || file.size > MAX_IMAGE_SIZE || !fileNameSchema.test(file.name))) throw new Error("Invalid image upload");
    if (images.reduce((total, file) => total + file.size, 0) > MAX_COMMIT_IMAGE_SIZE) throw new Error("Images exceed the 25 MB commit limit");
    for (const image of images) {
      const path = `/dumps/${parsed.id}/${image.name}`;
      const escapedPath = path.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
      const hasAltText = new RegExp(`!\\[[^\\]\\n]+\\]\\(${escapedPath}(?:\\s+["'][^"']*["'])?\\)`).test(parsed.markdown);
      if (parsed.metadata.image !== path && !hasAltText) throw new Error(`Body image ${image.name} requires alt text`);
    }
    const result = await publishDump(createContentOctokit(), {
      ...parsed,
      images: await Promise.all(images.map(async (file) => ({ filename: file.name, type: file.type, content: Buffer.from(await file.arrayBuffer()) }))),
    });
    return NextResponse.json(result);
  } catch (error) {
    if ((error as Error).message === "Unauthorized") return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    if (error instanceof PublishConflictError) return NextResponse.json({ error: error.message }, { status: 409 });
    if (error instanceof z.ZodError) return NextResponse.json({ error: "Invalid commit request", issues: error.issues }, { status: 400 });
    return NextResponse.json({ error: (error as Error).message || "Unable to publish" }, { status: 400 });
  }
};
