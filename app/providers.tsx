import { ThemeProvider } from "next-themes";

import { SettingsProvider } from "./_components/contexts/SettingsContext";

export const Providers: React.FC<React.PropsWithChildren> = ({ children }) => {
  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <SettingsProvider>{children}</SettingsProvider>
    </ThemeProvider>
  );
};
