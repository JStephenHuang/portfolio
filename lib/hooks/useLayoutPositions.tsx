import { useMemo, ComponentType } from "react";
import { useSettings } from "./useSettings";
import { GRID_SIZE_X, GRID_SIZE_Y } from "@/lib/constants";

interface PositionProps {
  x?: number;
  y?: number;
}

interface LayoutOptions {
  cols?: number;
  spacingX?: number;
  spacingY?: number;
  offsetX?: number;
  offsetY?: number;
}

export function useLayoutPositions<T extends PositionProps>(
  items: ComponentType<T>[],
  options: LayoutOptions = {},
) {
  const { layout } = useSettings();

  // Don't render until settings are loaded from localStorage
  const isReady = layout !== null;

  const {
    cols = 4,
    spacingX = GRID_SIZE_X,
    spacingY = GRID_SIZE_Y,
    offsetX = GRID_SIZE_X,
    offsetY = GRID_SIZE_Y,
  } = options;

  return useMemo(() => {
    if (!isReady) return [];

    return items.map((Item, i) => {
      const x = (i % cols) * spacingX + offsetX;
      const y = Math.floor(i / cols) * spacingY + offsetY;
      return <Item key={i} x={x} y={y} {...({} as T)} />;
    });
  }, [isReady, cols, spacingX, spacingY, offsetX, offsetY, items]);
}
