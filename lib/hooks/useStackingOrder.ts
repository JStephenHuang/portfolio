"use client";

import { useLocalStorage } from "@mantine/hooks";
import { useCallback, useMemo } from "react";

type StackingOrder = Record<string, number>;

const NORMALIZE_AT = 1000;
const STACKING_ORDER_KEY = "portfolio-stacking-order";

const createInitialOrder = (keys: readonly string[]): StackingOrder => {
    return Object.fromEntries(keys.map((key, index) => [key, index + 1]));
};

const normalizeOrder = (
    order: StackingOrder,
    keys: readonly string[],
): StackingOrder => {
    return Object.fromEntries(
        [...keys]
            .sort((first, second) => order[first] - order[second])
            .map((key, index) => [key, index + 1]),
    );
};

const isLayer = (layer: unknown): layer is number => {
    return typeof layer === "number" && Number.isFinite(layer) && layer > 0;
};

const prepareOrder = (
    storedOrder: StackingOrder,
    keys: readonly string[],
): StackingOrder => {
    let nextLayer = Math.max(
        0,
        ...keys.map((key) => (isLayer(storedOrder[key]) ? storedOrder[key] : 0)),
    );
    const prepared = Object.fromEntries(
        keys.map((key) => {
            const layer = storedOrder[key];

            if (isLayer(layer)) return [key, layer];

            nextLayer += 1;
            return [key, nextLayer];
        }),
    );
    const layers = Object.values(prepared);
    const hasDuplicateLayers = new Set(layers).size !== layers.length;

    if (hasDuplicateLayers || Math.max(...layers) > NORMALIZE_AT) {
        return normalizeOrder(prepared, keys);
    }

    return prepared;
};

export const useStackingOrder = (keys: readonly string[]) => {
    const [storedOrder, setStoredOrder] = useLocalStorage<StackingOrder>({
        key: STACKING_ORDER_KEY,
        defaultValue: createInitialOrder(keys),
    });
    const order = useMemo(() => prepareOrder(storedOrder, keys), [keys, storedOrder]);

    const bringToFront = useCallback(
        (key: string) => {
            if (!keys.includes(key)) return;

            setStoredOrder((current) => {
                const prepared = prepareOrder(current, keys);
                const nextLayer = Math.max(...Object.values(prepared)) + 1;
                const raised = { ...prepared, [key]: nextLayer };

                if (nextLayer <= NORMALIZE_AT) {
                    return raised;
                }

                return normalizeOrder(raised, keys);
            });
        },
        [keys, setStoredOrder],
    );

    return { bringToFront, order };
};
