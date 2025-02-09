import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Stephen's Pile of Stuff",
  description: "Discover things about me.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <html lang="en">{children}</html>;
}
