"use client";

import Canvas from "@/components/Canvas";
import { rootItems } from "@/lib/data/directories/root";
import { useGridPositions } from "@/lib/hooks/useGridPositions";

export default function Home() {
  const items = useGridPositions(rootItems);

  return (
    <main className="w-screen h-screen relative">
      <Canvas.Root>{items}</Canvas.Root>
    </main>
  );
}
