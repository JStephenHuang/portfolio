import type { Metadata } from "next";
import { Manrope, Roboto_Mono } from "next/font/google";
import "./globals.css";

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
  description: "Full-stack developer and designer",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={fontVariables}>
      <body className="antialiased">{children}</body>
    </html>
  );
}
