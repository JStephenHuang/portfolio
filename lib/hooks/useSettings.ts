"use client";

import { useState, useEffect } from "react";

type Theme = "light" | "dark";
type LayoutMode = "snap" | "free";

interface Settings {
  theme: Theme | null;
  layout: LayoutMode | null;
}

export function useSettings() {
  const [settings, setSettings] = useState<Settings>({
    theme: null,
    layout: null,
  });

  useEffect(() => {
    const syncSettings = () => {
      const storedTheme = (localStorage.getItem("theme") as Theme) || "light";
      const storedLayout = (localStorage.getItem("layout") as LayoutMode) || "snap";
      setSettings({ theme: storedTheme, layout: storedLayout });
      document.documentElement.classList.toggle("dark", storedTheme === "dark");
    };

    // Initial load
    syncSettings();

    // Listen for changes from other components
    window.addEventListener("settingschange", syncSettings);
    return () => window.removeEventListener("settingschange", syncSettings);
  }, []);

  const toggleTheme = () => {
    const newTheme = settings.theme === "light" ? "dark" : "light";
    setSettings((prev) => ({ ...prev, theme: newTheme }));
    localStorage.setItem("theme", newTheme);
    document.documentElement.classList.toggle("dark", newTheme === "dark");
    window.dispatchEvent(new Event("settingschange"));
  };

  const toggleLayout = () => {
    const newLayout = settings.layout === "snap" ? "free" : "snap";
    setSettings((prev) => ({ ...prev, layout: newLayout }));
    localStorage.setItem("layout", newLayout);
    window.dispatchEvent(new Event("settingschange"));
  };

  return {
    theme: settings.theme,
    layout: settings.layout,
    toggleTheme,
    toggleLayout,
  };
}
