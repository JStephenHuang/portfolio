"use client";

import { useLocalStorage, useMounted } from "@mantine/hooks";
import { useCallback, useMemo } from "react";
import z from "zod";

const positionSchema = z.object({
  x: z.number(),
  y: z.number(),
});

const itemSchema = z.object({
  id: z.string(),
  title: z.string(),
  image: z.string(),
  defaultPosition: positionSchema,
});

type Position = z.infer<typeof positionSchema>;
type Item = z.infer<typeof itemSchema>;
type StoredItem = Position & {
  zIndex?: number;
};
type Positions = Record<string, StoredItem>;

const normalizeZIndexes = (items: Record<string, Position & { zIndex: number }>) => {
  return Object.fromEntries(
    Object.entries(items)
      .sort(([, first], [, second]) => first.zIndex - second.zIndex)
      .map(([id, item], index) => [id, { ...item, zIndex: index + 1 }])
  );
};

export const useItems = (rawItems: Item[]) => {
  const mounted = useMounted();

  const [storedItems, setStoredItems] = useLocalStorage<Positions>({
    key: "positions",
    defaultValue: {},
    getInitialValueInEffect: false,
  });

  const items = useMemo(() => {
    return rawItems.map((item, index) => {
      const storedItem = storedItems[item.id];

      return {
        ...item,
        position: storedItem ? { x: storedItem.x, y: storedItem.y } : item.defaultPosition,
        zIndex: storedItem?.zIndex ?? index + 1,
      };
    });
  }, [mounted, rawItems, storedItems]);

  const savePosition = useCallback(
    (id: string, x: number, y: number) => {
      setStoredItems((current) => ({
        ...current,
        [id]: {
          ...current[id],
          x,
          y,
        },
      }));
    },
    [setStoredItems]
  );

  const saveIndex = useCallback(
    (id: string) => {
      setStoredItems((current) => {
        const nextItems = Object.fromEntries(
          rawItems.map((item, index) => {
            const storedItem = current[item.id];

            return [
              item.id,
              {
                x: storedItem?.x ?? item.defaultPosition.x,
                y: storedItem?.y ?? item.defaultPosition.y,
                zIndex: storedItem?.zIndex ?? index + 1,
              },
            ];
          })
        );
        const highestZIndex = Math.max(0, ...Object.values(nextItems).map((item) => item.zIndex));

        nextItems[id] = {
          ...nextItems[id],
          zIndex: highestZIndex + 1,
        };

        return nextItems[id].zIndex >= 100 ? normalizeZIndexes(nextItems) : nextItems;
      });
    },
    [rawItems, setStoredItems]
  );

  return {
    items,
    isLoading: !mounted,
    savePosition,
    saveIndex,
  };
};
