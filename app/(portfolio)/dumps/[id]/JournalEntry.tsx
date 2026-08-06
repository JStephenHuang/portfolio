"use client";

import { ChevronDownIcon } from "@radix-ui/react-icons";
import { motion } from "motion/react";
import { useEffect, useRef, useState } from "react";

import styles from "./styles.module.scss";
import { Button } from "@/components/ui";

const COLLAPSED_HEIGHT = 260;

interface JournalEntryProps extends React.PropsWithChildren {
  date: string;
  id: string;
}

const JournalEntry: React.FC<JournalEntryProps> = ({ children, date, id }) => {
  const contentRef = useRef<HTMLDivElement>(null);
  const [contentHeight, setContentHeight] = useState(COLLAPSED_HEIGHT);
  const [expanded, setExpanded] = useState(false);
  const canExpand = contentHeight > COLLAPSED_HEIGHT + 1;

  useEffect(() => {
    const content = contentRef.current;

    if (!content) return;

    const updateHeight = () => setContentHeight(content.scrollHeight);
    const observer = new ResizeObserver(updateHeight);

    updateHeight();
    observer.observe(content);

    return () => observer.disconnect();
  }, []);

  return (
    <article className={styles.entry} id={id}>
      <div className={styles.entryFrame}>
        <time className={styles.entryDate} dateTime={date}>
          {date.replaceAll("-", "/")}
        </time>
        <motion.div
          className={styles.entryViewport}
          id={`${id}-content`}
          animate={{ height: expanded ? contentHeight : Math.min(contentHeight, COLLAPSED_HEIGHT) }}
          initial={false}
          transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
        >
          <div ref={contentRef}>{children}</div>
          {canExpand && !expanded && <span className={styles.entryFade} aria-hidden="true" />}
        </motion.div>
        {canExpand && (
          <Button.Link
            className={styles.entryToggle}
            type="button"
            aria-controls={`${id}-content`}
            aria-expanded={expanded}
            onClick={() => setExpanded((current) => !current)}
          >
            {expanded ? "Show less" : "Continue reading"}
            <ChevronDownIcon className={styles.entryToggleIcon} data-expanded={expanded || undefined} />
          </Button.Link>
        )}
      </div>
    </article>
  );
};

export default JournalEntry;
