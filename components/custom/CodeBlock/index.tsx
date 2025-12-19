"use client";

import { useState } from "react";
import { Dialog } from "@ark-ui/react/dialog";
import { Portal } from "@ark-ui/react/portal";
import { Cross2Icon } from "@radix-ui/react-icons";
import Markdown from "react-markdown";
import rehypeHighlight from "rehype-highlight";
import { useFileContent } from "@/lib/hooks/useFileContent";
import "highlight.js/styles/github-dark.css";

// Map file extensions to highlight.js language names
const extToLang: Record<string, string> = {
  py: "python",
  js: "javascript",
  ts: "typescript",
  tsx: "tsx",
  jsx: "jsx",
  rs: "rust",
  go: "go",
  java: "java",
  c: "c",
  cpp: "cpp",
  cs: "csharp",
  rb: "ruby",
  sh: "bash",
  sql: "sql",
  json: "json",
  yaml: "yaml",
  yml: "yaml",
  md: "markdown",
  html: "html",
  css: "css",
};

interface CodeBlockModalProps {
  filename: string;
  src: string; // path relative to /public, e.g. "/code/aoc-2025/day1.py"
  language?: string; // optional override, otherwise inferred from extension
}

const CodeBlockModal = ({ filename, src, language }: CodeBlockModalProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const { content, isLoading, error } = useFileContent(src, isOpen);

  // Infer language from file extension
  const ext = src.split(".").pop() || "";
  const lang = language || extToLang[ext] || ext;

  const codeBlock = content ? `\`\`\`${lang}\n${content}\n\`\`\`` : "";

  return (
    <>
      <button onClick={() => setIsOpen(true)} className="text-link text-ui">
        {filename}
      </button>

      <Dialog.Root open={isOpen} onOpenChange={(e) => setIsOpen(e.open)}>
        <Portal>
          <Dialog.Backdrop className="fixed inset-0 bg-[var(--modal-backdrop)] backdrop-blur-sm z-50" />
          <Dialog.Positioner className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <Dialog.Content className="rounded-lg shadow-xl max-w-3xl w-full max-h-[80vh] overflow-hidden">
              {/* Header */}
              <div className="flex items-center justify-between px-4 py-3 border-[var(--code-header-border)] bg-[var(--code-header-bg)]">
                <Dialog.Title className="text-ui text-[var(--code-header-fg)] font-mono">
                  {filename}
                </Dialog.Title>
                <Dialog.CloseTrigger className="p-1.5 rounded hover:bg-[var(--bg-muted)] transition-colors text-[var(--fg-muted)] hover:text-[var(--fg)]">
                  <Cross2Icon className="w-4 h-4" />
                </Dialog.CloseTrigger>
              </div>

              {/* Code Content */}
              <Dialog.Description asChild>
                <div className="overflow-auto max-h-[70vh] bg-[var(--code-bg)] [&_pre]:m-0 [&_pre]:rounded-none [&_code]:text-sm">
                  {error ? (
                    <p className="p-4 text-red-400 text-sm">Failed to load file</p>
                  ) : isLoading || !content ? (
                    <p className="p-4 text-[var(--fg-muted)] text-sm">Loading...</p>
                  ) : (
                    <Markdown rehypePlugins={[rehypeHighlight]}>{codeBlock}</Markdown>
                  )}
                </div>
              </Dialog.Description>
            </Dialog.Content>
          </Dialog.Positioner>
        </Portal>
      </Dialog.Root>
    </>
  );
};

export default CodeBlockModal;
