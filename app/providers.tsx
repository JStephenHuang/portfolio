"use client";

import { SessionProvider } from "next-auth/react";
import { ThemeProvider } from "next-themes";

import { SettingsProvider } from "./_components/contexts/SettingsContext";

export const Providers: React.FC<React.PropsWithChildren> = ({ children }) => {
  return (
    <SessionProvider>
      <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
        <SettingsProvider>{children}</SettingsProvider>
      </ThemeProvider>
    </SessionProvider>
  );
};
