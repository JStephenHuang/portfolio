"use client";

import { useMediaQuery } from "@mantine/hooks";
import classNames from "classnames";

import { PortfolioItem } from "@/app/_components/PortfolioItem";
import { useSetting } from "@/components/custom";
import { Draggable } from "@/components/primitives";
import { PROJECTS } from "@/lib/data/projects";
import { usePortfolioPositions, useStackingOrder } from "@/lib/hooks";

import styles from "./styles.module.scss";

const PROJECT_KEYS = PROJECTS.map(({ id }) => id);

export const PortfolioBoard = () => {
  const { bounce, friction, layout } = useSetting();
  const isMobile = useMediaQuery("(max-width: 768px)");
  const { positions, savePosition } = usePortfolioPositions();
  const { bringToFront, order } = useStackingOrder(PROJECT_KEYS);
  const isFreeLayout = layout === "freed";

  return (
    <main className={styles.page}>
      <Draggable.Root
        key={`${layout}-${isMobile ? "mobile" : "desktop"}`}
        className={classNames(styles.board, styles[layout])}
        bounce={bounce}
        elasticity={0}
        friction={friction}
      >
        {PROJECTS.map((project, index) => (
          <Draggable.Item
            key={project.id}
            className={classNames(styles.tile, styles[`slot${index + 1}`])}
            drag={isFreeLayout}
            initialPosition={
              isFreeLayout && !isMobile ? positions[String(index)] : undefined
            }
            initial={false}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.035, duration: 0.38 }}
            style={{ zIndex: order[project.id] }}
            whileDrag={{ scale: 1.025 }}
            onPointerDown={() => bringToFront(project.id)}
            onSettle={(position) => {
              if (isFreeLayout && !isMobile) savePosition(String(index), position);
            }}
          >
            <PortfolioItem
              alt={project.alt}
              href={project.href}
              src={project.src}
              title={project.title}
            />
          </Draggable.Item>
        ))}
      </Draggable.Root>
    </main>
  );
};
