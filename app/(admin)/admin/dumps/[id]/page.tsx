import { notFound } from "next/navigation";

import { Link } from "@/components/ui";
import { rootItems } from "@/lib/data";

import styles from "./styles.module.scss";

interface AdminDumpPageProps {
  params: Promise<{ id: string }>;
}

const AdminDumpPage: React.FC<AdminDumpPageProps> = async ({ params }) => {
  const { id } = await params;
  const item = rootItems.find((candidate) => candidate.id === id);

  if (!item) notFound();

  return (
    <section className={styles.page}>
      <header className={styles.header}>
        <div>
          <span className={styles.id}>{item.id}</span>
          <h2>{item.title}</h2>
        </div>
        <Link href={`/dumps/${item.id}`}>View project</Link>
      </header>
    </section>
  );
};

export default AdminDumpPage;
