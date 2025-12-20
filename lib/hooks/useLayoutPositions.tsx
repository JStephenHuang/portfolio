import { useMemo, ComponentType } from "react";
import { useSettings } from "./useSettings";

interface PositionProps {
  x?: number;
  y?: number;
}

export type LayoutMode = "grid" | "scatter";

interface LayoutOptions {
  mode?: LayoutMode;
  cols?: number;
  spacingX?: number;
  spacingY?: number;
  offsetX?: number;
  offsetY?: number;
  jitter?: number; // for scatter mode
  minDistance?: number; // minimum distance between items in scatter mode
}

// Deterministic pseudo-random based on seed
function seededRandom(seed: number): number {
  const x = Math.sin(seed * 9999) * 10000;
  return x - Math.floor(x);
}

// Check if position is far enough from all existing positions
function hasCollision(
  x: number,
  y: number,
  positions: { x: number; y: number }[],
  minDistance: number,
): boolean {
  return positions.some((pos) => {
    const dx = x - pos.x;
    const dy = y - pos.y;
    const distance = Math.sqrt(dx * dx + dy * dy);
    return distance < minDistance;
  });
}

export function useLayoutPositions<T extends PositionProps>(
  items: ComponentType<T>[],
  options: LayoutOptions = {},
) {
  const { layout } = useSettings();

  // Don't render until settings are loaded from localStorage
  const isReady = layout !== null;

  const {
    mode = layout ?? "grid",
    cols = 4,
    spacingX = 120,
    spacingY = 140,
    offsetX = 100,
    offsetY = 100,
    jitter = 50,
    minDistance = 110,
  } = options;

  return useMemo(() => {
    if (!isReady) return [];

    const placedPositions: { x: number; y: number }[] = [];

    return items.map((Item, i) => {
      const baseX = (i % cols) * spacingX + offsetX;
      const baseY = Math.floor(i / cols) * spacingY + offsetY;

      let x = baseX;
      let y = baseY;

      if (mode === "scatter") {
        // Try different jitter offsets until we find one without collision
        const maxAttempts = 10;
        for (let attempt = 0; attempt < maxAttempts; attempt++) {
          const jitterX = (seededRandom(i * 7 + 1 + attempt * 17) - 0.5) * jitter * 2;
          const jitterY = (seededRandom(i * 13 + 2 + attempt * 23) - 0.5) * jitter * 2;
          const candidateX = Math.round(baseX + jitterX);
          const candidateY = Math.round(baseY + jitterY);

          if (!hasCollision(candidateX, candidateY, placedPositions, minDistance)) {
            x = candidateX;
            y = candidateY;
            break;
          }
        }
      }

      placedPositions.push({ x, y });
      return <Item key={i} x={x} y={y} {...({} as T)} />;
    });
  }, [isReady, mode, cols, spacingX, spacingY, offsetX, offsetY, jitter, minDistance, items]);
}
