"use client";

import { useRouter, usePathname } from "next/navigation";
import CanvasIcon from "@/components/custom/CanvasIcon";
import { useSettings } from "@/lib/hooks/useSettings";

interface DirectoryProps {
  title: string;
  icon?: string;
  href: string;
  initialX?: number;
  initialY?: number;
}

const Directory = ({ title, icon, href, initialX, initialY }: DirectoryProps) => {
  const router = useRouter();
  const pathname = usePathname();
  const settings = useSettings();

  const resolvedHref = href.startsWith("/") ? href : `${pathname}/${href}`;

  return (
    <CanvasIcon
      title={title}
      icon={icon}
      bg={settings.theme === "dark" ? "white" : "transparent"}
      onClick={() => router.push(resolvedHref)}
      initialX={initialX}
      initialY={initialY}
    />
  );
};

export default Directory;
