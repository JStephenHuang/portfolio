"use client";

import { Image } from "@/components/ui";
import { Item } from "@/lib/data";
import { motion } from "motion/react";

import styles from "./styles.module.scss";
import Link from "next/link";

interface PortfolioCardProps {
  item: Item;
}

const PortfolioCard: React.FC<PortfolioCardProps> = ({ item }) => {
  return (
    <motion.div className={styles.card} initial="rest" whileHover="hover">
      <div className={styles.imageWrapper}>
        <Image className={styles.image} src={item.image} alt={item.title} draggable={false} />
        <Link href={`/pb/${item.id}`}>
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
