import "@/styles/globals.scss";
import type { Metadata } from "next";
import { Manrope, Roboto_Mono, Space_Grotesk } from "next/font/google";

import { Nav } from "./_components/Nav";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
  display: "swap",
  preload: true,
});

const fontVariables = [spaceGrotesk.variable].join(" ");

export const metadata: Metadata = {
  title: "Stephen | Portfolio",
  description: "",
};

const RootLayout = ({ children }: Readonly<{ children: React.ReactNode }>) => {
  return (
    <html lang="en" className={fontVariables}>
      <body>
        <Nav />
        {children}
      </body>
    </html>
  );
};

export default RootLayout;
