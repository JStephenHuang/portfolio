"use client";

import classNames from "classnames";
import type { ImageProps } from "next/image";
import { useState } from "react";

import { Button, Image } from "@/components/ui";

import styles from "./styles.module.scss";
import Link from "next/link";

type Props = {
  alt?: string;
  href: React.ComponentProps<typeof Button.Link>["href"];
  src: ImageProps["src"];
  title: string;
};

export const PortfolioItem: React.FC<Props> = ({
  alt = "",
  href,
  src,
  title,
}) => {
  const [isRevealed, setIsRevealed] = useState(false);

  return (
    <article
      className={classNames(styles.item, isRevealed && styles.revealed)}
      onPointerDown={(event) => {
        if (event.pointerType !== "mouse") setIsRevealed(true);
      }}
    >
      <div className={styles.media}>
        <Image
          className={styles.image}
          src={src}
          alt={alt}
          draggable={false}
          sizes="(max-width: 768px) 140px, 170px"
        />
        <div className={styles.overlay}>
          <Link
            className={styles.view}
            href={href}
            draggable={false}
            onPointerDown={(event) => event.stopPropagation()}
          >
            view
          </Link>
        </div>
      </div>
      <h2 className={styles.title}>{title}</h2>
    </article>
  );
};

export default PortfolioItem;
