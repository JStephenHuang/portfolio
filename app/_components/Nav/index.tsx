"use client";

import { EnvelopeClosedIcon, GitHubLogoIcon, LinkedInLogoIcon } from "@radix-ui/react-icons";
import classNames from "classnames";
import Link from "next/link";
import type React from "react";

import styles from "./styles.module.scss";

interface IconLinkProps extends React.ComponentProps<typeof Link> {
  newWindow?: boolean;
}

const IconLink: React.FC<IconLinkProps> = ({ children, className, newWindow, target, rel, ...props }) => (
  <Link
    {...props}
    className={classNames(styles.link, styles.iconLink, className)}
    target={newWindow ? "_blank" : target}
    rel={newWindow ? "noreferrer" : rel}
  >
    {children}
  </Link>
);

export const Nav = () => {
  return (
    <nav className={styles.container} aria-label="Primary navigation">
      <div className={styles.nav}>
        <Link className={styles.link} href="/">
          j. stephen huang
        </Link>
        <div className={styles.controls}>
          <Link className={styles.link} href="/about">
            about
          </Link>
        </div>
      </div>
      <div className={styles.footer}>
        <Link className={styles.link} href="tel:5148368531">
          514 836 8531
        </Link>
        <IconLink href="mailto:jstephhuang@gmail.com" aria-label="Email Stephen Huang" title="Email">
          <EnvelopeClosedIcon className={styles.icon} aria-hidden="true" />
        </IconLink>
        <IconLink
          href="https://linkedin.com/in/jstephenhuang"
          title="LinkedIn"
          newWindow
        >
          <LinkedInLogoIcon className={styles.icon} aria-hidden="true" />
        </IconLink>
        <IconLink
          href="https://github.com/jstephenhuang"
          title="GitHub"
          newWindow
        >
          <GitHubLogoIcon className={styles.icon} aria-hidden="true" />
        </IconLink>
      </div>
    </nav>
  );
};
