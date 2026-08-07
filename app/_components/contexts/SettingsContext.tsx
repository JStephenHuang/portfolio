"use client";

import { useLocalStorage, useMounted } from "@mantine/hooks";
import { createContext, useCallback, useContext, useMemo } from "react";
import z from "zod";

const settingsSchema = z.object({
  bounce: z.number().min(0).max(1),
  friction: z.number().min(0).max(1),
  layout: z.enum(["lock", "free"]),
  isSettingsOpen: z.boolean(),
});

type Settings = z.infer<typeof settingsSchema>;
export type Layout = Settings["layout"];

type SettingsContextValue = Settings & {
  isLoading: boolean;
  setIsSettingsOpen: (value: boolean) => void;
  setBounce: (value: number) => void;
  setFriction: (value: number) => void;
  setLayout: (value: Layout) => void;
};

const DEFAULT_SETTINGS: Settings = {
  bounce: 0.5,
  friction: 0.5,
  layout: "free",
  isSettingsOpen: true,
};

export const SettingsContext = createContext<SettingsContextValue | null>(null);

export const SettingsProvider: React.FC<React.PropsWithChildren> = ({ children }) => {
  const mounted = useMounted();
  const [storedSettings, setStoredSettings] = useLocalStorage<Settings>({
    key: "settings",
    defaultValue: DEFAULT_SETTINGS,
  });

  const setIsSettingsOpen = useCallback(
    (open: boolean) => {
      setStoredSettings((current) => ({
        ...current,
        isSettingsOpen: open,
      }));
    },
    [setStoredSettings]
  );

  const setBounce = useCallback(
    (bounce: number) => {
      setStoredSettings((current) => ({
        ...current,
        bounce,
      }));
    },
    [setStoredSettings]
  );
  const setFriction = useCallback(
    (friction: number) => {
      setStoredSettings((current) => ({
        ...current,
        friction,
      }));
    },
    [setStoredSettings]
  );
  const setLayout = useCallback(
    (layout: Layout) => {
      setStoredSettings((current) => ({ ...current, layout }));
    },
    [setStoredSettings]
  );

  const value = useMemo(
    () => ({
      bounce: storedSettings.bounce,
      friction: storedSettings.friction,
      layout: storedSettings.layout,
      isSettingsOpen: storedSettings.isSettingsOpen,
      isLoading: !mounted,
      setIsSettingsOpen,
      setBounce,
      setFriction,
      setLayout,
    }),
    [mounted, setBounce, setFriction, setIsSettingsOpen, setLayout, storedSettings]
  );

  return <SettingsContext.Provider value={value}>{children}</SettingsContext.Provider>;
};

export const useSettings = () => {
  const context = useContext(SettingsContext);

  if (!context) throw new Error("useSettings must be used within SettingsProvider.");

  return context;
};
