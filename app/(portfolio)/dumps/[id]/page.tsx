import { notFound } from "next/navigation";

import { Image, Markdown } from "@/components/ui";
import { getDumpMetadata } from "@/lib/data";
import { getDumpLogs } from "@/lib/data/dumps";
import { isErr } from "@/lib/error";

import DumpHeader from "./DumpHeader";
import ExpandableMarkdown from "./ExpandableMarkdown";
import styles from "./styles.module.scss";

interface DumpPageProps {
  params: Promise<{ id: string }>;
}

const DumpPage: React.FC<DumpPageProps> = async ({ params }) => {
  const { id } = await params;
  const metadata = getDumpMetadata(id);

  if (!metadata) notFound();

  const logsResult = await getDumpLogs(metadata);

  if (isErr(logsResult)) throw logsResult.error;

  return (
    <main className={styles.page}>
      <DumpHeader item={metadata} />
      {logsResult.data.length > 0 && (
        <section className={styles.log} aria-label={`${metadata.title} log`}>
          {logsResult.data.map((entry) => {
            const entryId = `log-${entry.date.replaceAll("/", "-")}`;

            return (
              <section className={styles.logEntry} id={entryId} key={entry.date}>
                <time className={styles.logDate} dateTime={entry.date.replaceAll("/", "-")}>
                  {entry.date}
                </time>
                <div className={styles.logContent}>
                  {entry.blocks.map((block, index) => {
                    const blockId = `${entryId}-${block.type}-${index + 1}`;

                    if (block.type === "markdown") {
                      const filename = block.src.split("/").at(-1) ?? block.src;

                      return (
                        <ExpandableMarkdown filename={filename} id={blockId} key={blockId}>
                          <Markdown className={styles.markdownContent}>{block.body}</Markdown>
                        </ExpandableMarkdown>
                      );
                    }

                    if (block.type === "image") {
                      const external = block.src.startsWith("http://") || block.src.startsWith("https://");

                      return (
                        <figure className={styles.media} key={blockId}>
                          <Image
                            className={styles.mediaImage}
                            src={block.src}
                            alt={block.alt}
                            width={block.width}
                            height={block.height}
                            sizes="(max-width: 768px) calc(100vw - 32px), 1200px"
                            unoptimized={external}
                          />
                          {block.caption && <figcaption className={styles.mediaCaption}>{block.caption}</figcaption>}
                        </figure>
                      );
                    }

                    return (
                      <figure className={styles.media} key={blockId}>
                        <video
                          className={styles.mediaVideo}
                          src={block.src}
                          poster={block.poster}
                          aria-label={block.title}
                          controls
                          preload="metadata"
                        />
                        {block.caption && <figcaption className={styles.mediaCaption}>{block.caption}</figcaption>}
                      </figure>
                    );
                  })}
                </div>
              </section>
            );
          })}
        </section>
      )}
    </main>
  );
};

export default DumpPage;
