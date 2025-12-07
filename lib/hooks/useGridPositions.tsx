import { useMemo, ComponentType } from "react";

interface PositionProps {
  x?: number;
  y?: number;
}

interface GridOptions {
  cols?: number;
  spacingX?: number;
  spacingY?: number;
  offsetX?: number;
  offsetY?: number;
}

export function useGridPositions<T extends PositionProps>(
  items: ComponentType<T>[],
  options: GridOptions = {},
) {
  const {
    cols = 4,
    spacingX = 120,
    spacingY = 140,
    offsetX = 50,
    offsetY = 50,
  } = options;

  return useMemo(
    () =>
      items.map((Item, i) => {
        const x = (i % cols) * spacingX + offsetX;
        const y = Math.floor(i / cols) * spacingY + offsetY;
        return <Item key={i} x={x} y={y} {...({} as T)} />;
      }),
    [cols, spacingX, spacingY, offsetX, offsetY, items],
  );
}
