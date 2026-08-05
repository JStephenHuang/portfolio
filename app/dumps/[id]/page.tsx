import { notFound } from "next/navigation";

import AdminControls from "@/app/_components/AdminControls";
import Markdown from "@/components/content/Markdown";
import { loadDump } from "@/lib/data/content.server";
import { loadItems } from "@/lib/data/content.server";

import DumpHeader from "./DumpHeader";
import styles from "./styles.module.scss";

interface DumpPageProps {
  params: Promise<{ id: string }>;
}

export const dynamic = "force-static";

export const generateStaticParams = async () => (await loadItems()).map(({ id }) => ({ id }));

const DumpPage: React.FC<DumpPageProps> = async ({ params }) => {
  const { id } = await params;
  const dump = await loadDump(id);

  if (!dump) notFound();

  return (
    <main className={styles.page}>
      <AdminControls dumpId={id} />
      <DumpHeader item={dump.metadata} />
      {dump.markdown && <Markdown className={styles.body} markdown={dump.markdown} />}
    </main>
  );
};

export default DumpPage;
