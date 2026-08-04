"use client";

import * as AirHockey from "@/components/primitives/AirHockey";
import { Image } from "@/components/ui";
import { rootItems } from "@/lib/data";
import { useArrangedItems } from "@/lib/hooks";

import { useSettings } from "../contexts/SettingsContext";
import styles from "./styles.module.scss";

export const PortfolioBoard: React.FC = () => {
  const { bounce, friction, layout } = useSettings();
  const { arrangedItems, isLoading, savePosition, bringForward } = useArrangedItems(rootItems, "root-items");
  const isLocked = layout === "lock";
  return (
    <main className={styles.page}>
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
              style={{ zIndex: item.zIndex }}
              onPointerDown={() => {
                bringForward(item.id);
              }}
              onSettle={({ x, y }) => savePosition(item.id, x, y)}
            >
              <div>
                <Image src={item.image} draggable={false} />
              </div>
            </AirHockey.Item>
          ))}
      </AirHockey.Root>
    </main>
  );
};
