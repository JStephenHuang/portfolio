import "@/styles/globals.scss";
import classNames from "classnames";
import type { Metadata } from "next";
// import localFont from "next/font/local";

import { Space_Grotesk, Manrope } from "next/font/google";

// const _ = localFont({
//   src: "./_fonts/_.ttf",
//   display: "swap",
//   variable: "--font-_",
//   preload: true,
// });

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
  display: "swap",
  preload: true,
});

const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
  display: "swap",
  preload: true,
});

export const metadata: Metadata = {
  title: "j.stephen huang",
  description: "j. stephen huang's portfolio",
};

const RootLayout = ({ children }: Readonly<{ children: React.ReactNode }>) => {
  return (
    <html lang="en" className={classNames(spaceGrotesk.variable, manrope.variable)}>
      <body>{children}</body>
    </html>
  );
};

export default RootLayout;
