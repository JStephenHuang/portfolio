"use client";

import Canvas from "@/components/Canvas";
import Yap from "@/lib/data/directories/yap";
import { useLayoutPositions } from "@/lib/hooks/useLayoutPositions";

export default function ProjectsPage() {
  const items = useLayoutPositions([Yap]);

  return (
    <main className="w-screen h-screen relative">
      <Canvas.Root>{items}</Canvas.Root>
    </main>
  );
}
