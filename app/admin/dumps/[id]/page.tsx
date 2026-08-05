import { notFound, redirect } from "next/navigation";

import DumpEditor from "@/app/_components/DumpEditor";
import { getAdminSession } from "@/lib/auth/session";
import { dumpIdSchema } from "@/lib/data";
import { isErr, tryCatch } from "@/lib/error";
import { loadGitHubDump } from "@/lib/github/content";
import { createContentOctokit } from "@/lib/github/publisher";

interface EditDumpPageProps { params: Promise<{ id: string }> }

const EditDumpPage: React.FC<EditDumpPageProps> = async ({ params }) => {
  if (!(await getAdminSession())?.user) redirect("/admin");
  const parsed = dumpIdSchema.safeParse((await params).id);
  if (!parsed.success) notFound();
  const result = await tryCatch(loadGitHubDump(createContentOctokit(), parsed.data));
  if (isErr(result) || !result.data) notFound();
  return <DumpEditor mode="edit" source={result.data} />;
};

export default EditDumpPage;
