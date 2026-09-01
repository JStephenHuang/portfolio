"use client";

import { motion } from "motion/react";
import Link from "next/link";

import { Image } from "@/components/ui";
import type { Item } from "@/lib/data";

import styles from "./styles.module.scss";

interface PortfolioCardProps {
  item: Item;
}

const MotionLink = motion.create(Link);

const PortfolioCard: React.FC<PortfolioCardProps> = ({ item }) => {
  return (
    <MotionLink
      className={styles.cardLink}
      href={`/dumps/${item.id}`}
      draggable={false}
      initial="rest"
      whileHover="hover"
      whileFocus="hover"
      animate="rest"
    >
      <div className={styles.card}>
        <div className={styles.imageWrapper}>
          <Image className={styles.image} src={item.image} alt={item.title} draggable={false} />
        </div>
        <motion.div
          className={styles.title}
          variants={{
            rest: { opacity: 0, y: -4 },
            hover: { opacity: 1, y: 0 },
          }}
        >
          {item.title}
        </motion.div>
      </div>
    </MotionLink>
  );
};

export default PortfolioCard;
