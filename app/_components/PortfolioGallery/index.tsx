"use client";

import type React from "react";
import { useState } from "react";

import * as AirHockey from "@/components/primitives/AirHockey";
import type { Item } from "@/lib/data";
import { useArrangedItems } from "@/lib/hooks";

import { useSettings } from "../contexts/SettingsContext";
import PortfolioCard from "../PortfolioCard";
import styles from "./styles.module.scss";

interface PortfolioGalleryProps {
  items: Item[];
  storageKey: string;
}

const PortfolioGallery: React.FC<PortfolioGalleryProps> = ({ items, storageKey }) => {
  const { bounce, friction, layout } = useSettings();
  const { arrangedItems, isLoading, savePosition, bringForward } = useArrangedItems(items, storageKey);
  const [activeItemId, setActiveItemId] = useState<string | null>(null);
  const isLocked = layout === "lock";

  return (
    <main className={styles.page}>
      <AirHockey.Root
        className={`${styles.board} ${isLocked ? styles.fixed : ""}`}
        physics={{ bounce, friction }}
        off={isLocked}
        onPointerDown={(event) => {
          if (event.target === event.currentTarget) setActiveItemId(null);
        }}
      >
        {!isLoading && arrangedItems.length === 0 && <p className={styles.empty}>Nothing here yet.</p>}
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
              <PortfolioCard
                item={item}
                active={activeItemId === item.id}
                onActivate={() => setActiveItemId(item.id)}
              />
            </AirHockey.Item>
          ))}
      </AirHockey.Root>
    </main>
  );
};

export default PortfolioGallery;
