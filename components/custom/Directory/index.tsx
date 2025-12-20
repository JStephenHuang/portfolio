"use client";

import { useRouter, usePathname } from "next/navigation";
import CanvasIcon from "@/components/custom/CanvasIcon";

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

  const resolvedHref = href.startsWith("/") ? href : `${pathname}/${href}`;

  return (
    <CanvasIcon
      title={title}
      icon={icon}
      onClick={() => router.push(resolvedHref)}
      initialX={initialX}
      initialY={initialY}
    />
  );
};

export default Directory;
