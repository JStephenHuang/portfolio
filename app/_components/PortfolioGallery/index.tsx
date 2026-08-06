"use client";

import type React from "react";
import { useState } from "react";

import * as AirHockey from "@/components/primitives/AirHockey";
import { rootItems } from "@/lib/data";
import { useArrangedItems } from "@/lib/hooks";

import { useSettings } from "../contexts/SettingsContext";
import PortfolioCard from "../PortfolioCard";
import styles from "./styles.module.scss";

const PortfolioGallery: React.FC = () => {
  const { bounce, friction, layout } = useSettings();
  const { arrangedItems, isLoading, savePosition, bringForward } = useArrangedItems(rootItems, "root-items");
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
