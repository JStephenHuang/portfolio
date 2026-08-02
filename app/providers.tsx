"use client";

import { ThemeProvider as NextThemesProvider } from "next-themes";
import type React from "react";

import { SettingsProvider } from "@/components/custom";

export const Providers: React.FC<React.PropsWithChildren> = ({ children }) => {
  return (
    <NextThemesProvider attribute="class" defaultTheme="system" enableSystem>
      <SettingsProvider>{children}</SettingsProvider>
    </NextThemesProvider>
  );
};
