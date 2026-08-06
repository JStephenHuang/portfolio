"use client";

import { motion } from "motion/react";
import Link from "next/link";

import { Image } from "@/components/ui";
import { Item } from "@/lib/data";

import styles from "./styles.module.scss";

interface PortfolioCardProps {
  item: Item;
  active: boolean;
  onActivate: () => void;
}

const PortfolioCard: React.FC<PortfolioCardProps> = ({ item, active, onActivate }) => {
  return (
    <motion.div
      className={styles.card}
      initial="rest"
      whileHover="hover"
      animate={active ? "hover" : "rest"}
      onTap={(event) => {
        if ("pointerType" in event && event.pointerType !== "mouse") onActivate();
      }}
    >
      <div className={styles.imageWrapper}>
        <Image className={styles.image} src={item.image} alt={item.title} draggable={false} />
        <Link href={`/dumps/${item.id}`}>
          <motion.span
            className={styles.viewBtn}
            variants={{
              rest: { opacity: 0, y: 4 },
              hover: { opacity: 1, y: 0 },
            }}
            transition={{ duration: 0.18, ease: "easeOut" }}
          >
            view
          </motion.span>
        </Link>
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
    </motion.div>
  );
};

export default PortfolioCard;
