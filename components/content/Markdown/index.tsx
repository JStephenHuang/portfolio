import type { Components } from "react-markdown";
import ReactMarkdown, { defaultUrlTransform } from "react-markdown";
import remarkGfm from "remark-gfm";
import { codeToHtml } from "shiki";

import { Image } from "@/components/ui";

import styles from "./styles.module.scss";

export const transformMarkdownUrl = (url: string) => {
  if (url.startsWith("//")) return "";
  if (url.startsWith("/") && !url.startsWith("//")) return url;
  if (url.startsWith("#") || !/^[a-z][a-z\d+.-]*:/i.test(url)) return defaultUrlTransform(url);
  try {
    const parsed = new URL(url);
    return ["http:", "https:", "mailto:"].includes(parsed.protocol) ? defaultUrlTransform(url) : "";
  } catch {
    return "";
  }
};

const Code = async ({ className, children, ...props }: React.ComponentPropsWithoutRef<"code">) => {
  const language = /language-([\w-]+)/.exec(className ?? "")?.[1];
  const value = String(children).replace(/\n$/, "");
  if (!language)
    return (
      <code className={className} {...props}>
        {children}
      </code>
    );
  let html: string;
  try {
    html = await codeToHtml(value, { lang: language, themes: { light: "github-light", dark: "github-dark" } });
  } catch {
    html = await codeToHtml(value, { lang: "text", themes: { light: "github-light", dark: "github-dark" } });
  }
  return <span className={styles.codeBlock} dangerouslySetInnerHTML={{ __html: html }} />;
};

const components = {
  a: ({ href, ...props }) => (
    <a href={href} target={href?.startsWith("http") ? "_blank" : undefined} rel="noreferrer" {...props} />
  ),
  img: ({ alt, src }) => typeof src === "string" ? <Image alt={alt ?? ""} src={src} loading="lazy" unoptimized /> : null,
  code: Code,
} satisfies Components;

interface MarkdownProps {
  markdown: string;
  className?: string;
}

const Markdown: React.FC<MarkdownProps> = ({ markdown, className }) => (
  <article className={`${styles.content} ${className ?? ""}`}>
    <ReactMarkdown remarkPlugins={[remarkGfm]} urlTransform={transformMarkdownUrl} components={components}>
      {markdown}
    </ReactMarkdown>
  </article>
);

export default Markdown;
