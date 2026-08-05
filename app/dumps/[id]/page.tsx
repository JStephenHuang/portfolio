import { notFound } from "next/navigation";

import { rootItems } from "@/lib/data";

import DumpHeader from "./DumpHeader";
import styles from "./styles.module.scss";

interface DumpPageProps {
  params: Promise<{ id: string }>;
}

const DumpPage: React.FC<DumpPageProps> = async ({ params }) => {
  const { id } = await params;
  const item = rootItems.find((candidate) => candidate.id === id);

  if (!item) notFound();

  return (
    <main className={styles.page}>
      <DumpHeader item={item} />
    </main>
  );
};

export default DumpPage;
