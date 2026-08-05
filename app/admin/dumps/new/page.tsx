import { redirect } from "next/navigation";

import DumpEditor from "@/app/_components/DumpEditor";
import { getAdminSession } from "@/lib/auth/session";
import { isErr, tryCatch } from "@/lib/error";
import { loadTargetSha } from "@/lib/github/content";
import { createContentOctokit } from "@/lib/github/publisher";

const NewDumpPage = async () => {
  if (!(await getAdminSession())?.user) redirect("/admin");
  const result = await tryCatch(loadTargetSha(createContentOctokit()));
  if (isErr(result)) throw result.error;
  return <DumpEditor mode="create" source={{ sha: result.data, markdown: "", metadata: { id: "new-dump", title: "", description: "", image: "", width: 150, defaultPosition: { x: 0.5, y: 0.5 }, links: { general: [] } } }} />;
};

export default NewDumpPage;
