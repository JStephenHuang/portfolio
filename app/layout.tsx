import "@/styles/globals.scss";
import type { Metadata } from "next";
import { Space_Grotesk } from "next/font/google";

import Nav from "./_components/Nav";
import { Providers } from "./providers";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
  display: "swap",
  preload: true,
});

export const metadata: Metadata = {
  title: "jsh",
  description: "jsh | portfolio",
};

const RootLayout: React.FC<Readonly<React.PropsWithChildren>> = ({ children }) => {
  return (
    <html lang="en" className={spaceGrotesk.variable} suppressHydrationWarning>
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
