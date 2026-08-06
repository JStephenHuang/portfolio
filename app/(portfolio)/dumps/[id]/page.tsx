import { notFound } from "next/navigation";

import { Markdown } from "@/components/ui";
import { rootItems } from "@/lib/data";
import { getDumpBody, getDumpEntries } from "@/lib/data/dumps";
import { isErr } from "@/lib/error";

import DumpHeader from "./DumpHeader";
import JournalEntry from "./JournalEntry";
import styles from "./styles.module.scss";

interface DumpPageProps {
  params: Promise<{ id: string }>;
}

const DumpPage: React.FC<DumpPageProps> = async ({ params }) => {
  const { id } = await params;
  const item = rootItems.find((candidate) => candidate.id === id);

  if (!item) notFound();

  const [bodyResult, entriesResult] = await Promise.all([getDumpBody(item.id), getDumpEntries(item.id)]);

  if (isErr(bodyResult)) throw bodyResult.error;
  if (isErr(entriesResult)) throw entriesResult.error;

  return (
    <main className={styles.page}>
      <DumpHeader item={item} />
      {/* {bodyResult.data?.trim() && <Markdown className={styles.body}>{bodyResult.data}</Markdown>} */}
      {entriesResult.data.length > 0 && (
        <section className={styles.journal} aria-label={`${item.title} journal entries`}>
          {entriesResult.data.map((entry) => (
            <JournalEntry date={entry.date} id={`entry-${entry.date}`} key={entry.date}>
              <Markdown className={styles.entryContent}>{entry.body}</Markdown>
            </JournalEntry>
          ))}
        </section>
      )}
    </main>
  );
};

export default DumpPage;
