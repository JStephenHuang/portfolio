"use client";

import { CheckIcon, CopyIcon } from "@radix-ui/react-icons";
import { Children, isValidElement, useRef, useState } from "react";

import { isErr, tryCatch } from "@/lib/error";

import styles from "./styles.module.scss";

type Props = React.ComponentPropsWithoutRef<"pre">;

export const MarkdownCodeBlock: React.FC<Props> = ({ children, ...props }) => {
  const codeRef = useRef<HTMLPreElement>(null);
  const [copied, setCopied] = useState(false);
  const codeElement = Children.toArray(children)[0];
  const language = isValidElement<{ className?: string }>(codeElement)
    ? codeElement.props.className?.match(/language-([\w-]+)/)?.[1]
    : undefined;

  const handleCopy = async () => {
    const code = codeRef.current?.textContent?.replace(/\n$/, "");

    if (!code || !navigator.clipboard) return;

    const result = await tryCatch(navigator.clipboard.writeText(code));

    if (isErr(result)) return;

    setCopied(true);
    window.setTimeout(() => setCopied(false), 1800);
  };

  return (
    <div className={styles.codeBlock}>
      <div className={styles.toolbar}>
        <span className={styles.language}>{language ?? "code"}</span>
        <button
          className={styles.copyButton}
          type="button"
          aria-label={copied ? "Code copied" : "Copy code"}
          title={copied ? "Copied" : "Copy code"}
          onClick={handleCopy}
        >
          {copied ? <CheckIcon /> : <CopyIcon />}
          <span>{copied ? "Copied" : "Copy"}</span>
        </button>
      </div>
      <pre {...props} ref={codeRef} className={styles.pre} tabIndex={0}>
        {children}
      </pre>
    </div>
  );
};
