"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";

export type Theme = "light" | "dark";
export type LayoutMode = "snap" | "free";

interface SettingsContextValue {
  theme: Theme;
  layout: LayoutMode | null;
  toggleTheme: () => void;
  toggleLayout: () => void;
}

const SettingsContext = createContext<SettingsContextValue | null>(null);

export function SettingsProvider({
  initialTheme,
  children,
}: {
  initialTheme: Theme;
  children: React.ReactNode;
}) {
  const [theme, setTheme] = useState<Theme>(initialTheme);
  const [layout, setLayout] = useState<LayoutMode | null>(null);

  // Layout is a device-local canvas preference. Theme is initialized by the
  // server from a cookie, so it never needs an inline bootstrap script.
  useEffect(() => {
    const savedLayout = window.localStorage.getItem("layout");
    setLayout(savedLayout === "free" ? "free" : "snap");
  }, []);

  const toggleTheme = useCallback(() => {
    setTheme((current) => {
      const next = current === "light" ? "dark" : "light";
      document.documentElement.dataset.theme = next;
      document.cookie = `theme=${next}; Path=/; Max-Age=31536000; SameSite=Lax`;
      return next;
    });
  }, []);

  const toggleLayout = useCallback(() => {
    setLayout((current) => {
      const next = current === "free" ? "snap" : "free";
      window.localStorage.setItem("layout", next);
      return next;
    });
  }, []);

  const value = useMemo(
    () => ({ theme, layout, toggleTheme, toggleLayout }),
    [layout, theme, toggleLayout, toggleTheme],
  );

  return <SettingsContext.Provider value={value}>{children}</SettingsContext.Provider>;
}

export function useSettings() {
  const context = useContext(SettingsContext);
  if (!context) throw new Error("useSettings must be used within SettingsProvider");
  return context;
}
