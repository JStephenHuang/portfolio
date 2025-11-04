import type { Metadata } from "next";
import { Manrope, Roboto_Mono } from "next/font/google";
import "../globals.css";
import { Nav } from "@/components/Nav/index";

const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-manrope",
});

const robotoMono = Roboto_Mono({
  subsets: ["latin"],
  variable: "--font-roboto-mono",
});

const fontVariables = `${manrope.variable} ${robotoMono.variable}`;

export const metadata: Metadata = {
  title: "Stephen | Portfolio",
  description: "",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={fontVariables}>
      <body className="antialiased">
        <Nav />
        {children}
      </body>
    </html>
  );
}
