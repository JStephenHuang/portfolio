"use client";

import type React from "react";

import * as AirHockey from "@/components/primitives/AirHockey";
import type { Item } from "@/lib/data";
import { useArrangedItems } from "@/lib/hooks";

import AdminControls from "../AdminControls";
import { useSettings } from "../contexts/SettingsContext";
import PortfolioCard from "../PortfolioCard";
import styles from "./styles.module.scss";

interface PortfolioGalleryProps {
  items: Item[];
}

const PortfolioGallery: React.FC<PortfolioGalleryProps> = ({ items }) => {
  const { bounce, friction, layout } = useSettings();
  const { arrangedItems, isLoading, savePosition, bringForward } = useArrangedItems(items, "root-items");
  const isLocked = layout === "lock";
  return (
    <main className={styles.page}>
      <AdminControls />
      <AirHockey.Root
        className={`${styles.board} ${isLocked ? styles.fixed : ""}`}
        physics={{ bounce, friction }}
        off={isLocked}
      >
        {!isLoading &&
          arrangedItems.map((item) => (
            <AirHockey.Item
              key={item.id}
              className={styles.item}
              initialX={item.position.x}
              initialY={item.position.y}
              style={
                {
                  zIndex: item.zIndex,
                  "--item-width": `${item.width}px`,
                } as React.CSSProperties
              }
              onPointerDown={() => {
                bringForward(item.id);
              }}
              onSettle={({ x, y }) => savePosition(item.id, x, y)}
            >
              <PortfolioCard item={item} />
            </AirHockey.Item>
          ))}
      </AirHockey.Root>
    </main>
  );
};

export default PortfolioGallery;
