import "@/styles/globals.scss";
import type { Metadata } from "next";
import { Manrope, Roboto_Mono, Space_Grotesk } from "next/font/google";

import { Nav } from "./_components/Nav";
import { Providers } from "./providers";

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
    <html
      lang="en"
      className={fontVariables}
      data-scroll-behavior="smooth"
      suppressHydrationWarning
    >
      <body>
        <Providers>
          <Nav />
          {children}
        </Providers>
      </body>
    </html>
  );
};

export default RootLayout;
