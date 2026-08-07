"use client";

import { ChevronDownIcon, FileIcon } from "@radix-ui/react-icons";
import { motion } from "motion/react";
import { useEffect, useRef, useState } from "react";

import { Button, Label } from "@/components/ui";

import styles from "./styles.module.scss";

const COLLAPSED_HEIGHT = 260;

interface ExpandableMarkdownProps extends React.PropsWithChildren {
  filename: string;
  id: string;
}

const ExpandableMarkdown: React.FC<ExpandableMarkdownProps> = ({ children, filename, id }) => {
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
    <section className={styles.markdownBlock} id={id}>
      <Label tone="info">
        <div className={styles.markdownFilename}>{filename}</div>
      </Label>
      <motion.div
        className={styles.markdownViewport}
        id={`${id}-content`}
        animate={{ height: expanded ? contentHeight : Math.min(contentHeight, COLLAPSED_HEIGHT) }}
        initial={false}
        transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
      >
        <div ref={contentRef}>{children}</div>
        {canExpand && !expanded && <span className={styles.markdownFade} aria-hidden="true" />}
      </motion.div>
      {canExpand && (
        <Button.Link
          className={styles.markdownToggle}
          type="button"
          aria-controls={`${id}-content`}
          aria-expanded={expanded}
          onClick={() => setExpanded((current) => !current)}
        >
          {expanded ? "Show less" : "Show more"}
        </Button.Link>
      )}
    </section>
  );
};

export default ExpandableMarkdown;
