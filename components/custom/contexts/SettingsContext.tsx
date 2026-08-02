"use client";

import { useLocalStorage, useMounted } from "@mantine/hooks";
import { createContext, useCallback, useContext, useMemo } from "react";
import type React from "react";

export type Layout = "fixed" | "freed";

type Settings = {
  bounce: number;
  friction: number;
  layout: Layout;
};

const DEFAULT_SETTINGS: Settings = {
  bounce: 0.5,
  friction: 0.5,
  layout: "fixed",
};

type SettingsContextValue = Settings & {
  isLoading: boolean;
  setBounce: (bounce: number) => void;
  setFriction: (friction: number) => void;
  setLayout: (layout: Layout) => void;
};

export const SettingsContext = createContext<SettingsContextValue>({
  ...DEFAULT_SETTINGS,
  isLoading: false,
  setBounce: () => { },
  setFriction: () => { },
  setLayout: () => { },
});

export const SettingsProvider: React.FC<React.PropsWithChildren> = ({ children }) => {
  const [storedSettings, setSettings] = useLocalStorage<Settings>({
    key: "settings",
    defaultValue: DEFAULT_SETTINGS,
  });
  const mounted = useMounted();

  const settings = useMemo(
    () => ({
      bounce: storedSettings.bounce,
      friction: storedSettings.friction,
      layout: storedSettings.layout,
    }),
    [storedSettings],
  );

  const setBounce = useCallback(
    (bounce: number) => setSettings((current) => ({ ...current, bounce })),
    [setSettings],
  );
  const setFriction = useCallback(
    (friction: number) => setSettings((current) => ({ ...current, friction })),
    [setSettings],
  );
  const setLayout = useCallback(
    (layout: Layout) => setSettings((current) => ({ ...current, layout })),
    [setSettings],
  );
  const value = useMemo(
    () => ({
      ...settings,
      isLoading: !mounted,
      setBounce,
      setFriction,
      setLayout,
    }),
    [mounted, setBounce, setFriction, setLayout, settings],
  );

  return <SettingsContext.Provider value={value}>{children}</SettingsContext.Provider>;
};

export const useSetting = () => {
  const context = useContext(SettingsContext);

  if (!context) throw new Error("useSetting must be used within SettingsProvider");

  return context;
};
