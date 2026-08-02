import { GitHubLogoIcon } from "@radix-ui/react-icons";
import classNames from "classnames";
import Link from "next/link";
import { notFound } from "next/navigation";
import type React from "react";

import { Image } from "@/components/ui";
import { getProject, type ProjectId } from "@/lib/data/projects";

import styles from "./styles.module.scss";

type Props = React.ComponentPropsWithoutRef<"header"> & {
  projectId: ProjectId;
};

export const ProjectHeader: React.FC<Props> = ({ className, projectId, ...props }) => {
  const project = getProject(projectId);

  if (!project) notFound();

  return (
    <header className={classNames(styles.header, className)} {...props}>
      <Link className={styles.back} href="/">
        back
      </Link>
      <div className={styles.project}>
        <div className={styles.media}>
          <Image
            className={styles.image}
            src={project.src}
            alt={project.alt}
            sizes="(max-width: 760px) calc(100vw - 32px), 560px"
          />
        </div>
        <div className={styles.content}>
          <p className={styles.category}>{project.category}</p>
          <h1 className={styles.title}>{project.title}</h1>
          {project.summary ? <p className={styles.summary}>{project.summary}</p> : null}
          {project.repository ? (
            <Link
              className={styles.repository}
              href={project.repository}
              title="GitHub"
              target="_blank"
              rel="noreferrer"
            >
              <GitHubLogoIcon className={styles.icon} aria-hidden="true" />
            </Link>
          ) : null}
        </div>
      </div>
    </header>
  );
};
