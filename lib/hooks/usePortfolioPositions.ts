"use client";

import { useLocalStorage } from "@mantine/hooks";
import { useCallback, useMemo } from "react";

import initialPositions from "@/lib/data/portfolio-positions.json";

export type PortfolioPosition = {
    x: number;
    y: number;
};

export type PortfolioPositions = Record<string, PortfolioPosition>;

const POSITIONS_KEY = "portfolio-positions";
const defaults = initialPositions as PortfolioPositions;

const isPosition = (position: unknown): position is PortfolioPosition => {
    if (!position || typeof position !== "object") return false;

    const candidate = position as Partial<PortfolioPosition>;

    return (
        typeof candidate.x === "number" &&
        typeof candidate.y === "number" &&
        Number.isFinite(candidate.x) &&
        Number.isFinite(candidate.y)
    );
};

const normalizePosition = ({ x, y }: PortfolioPosition): PortfolioPosition => ({
    x: Math.round(x * 100) / 100,
    y: Math.round(y * 100) / 100,
});

export const usePortfolioPositions = () => {
    const [storedPositions, setStoredPositions] = useLocalStorage<PortfolioPositions>({
        key: POSITIONS_KEY,
        defaultValue: defaults,
    });

    const positions = useMemo<PortfolioPositions>(() => {
        return Object.fromEntries(
            Object.entries(defaults).map(([key, defaultPosition]) => [
                key,
                isPosition(storedPositions[key])
                    ? normalizePosition(storedPositions[key])
                    : defaultPosition,
            ]),
        );
    }, [storedPositions]);

    const savePosition = useCallback(
        (key: string, position: PortfolioPosition) => {
            if (!(key in defaults) || !isPosition(position)) return;

            setStoredPositions((current) => ({
                ...current,
                [key]: normalizePosition(position),
            }));
        },
        [setStoredPositions],
    );

    return { positions, savePosition };
};
