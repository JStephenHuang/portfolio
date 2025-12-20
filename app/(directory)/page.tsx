"use client";

import Canvas from "@/components/Canvas";
import { rootItems } from "@/lib/data/directories/root";
import { useLayoutPositions } from "@/lib/hooks/useLayoutPositions";

export default function Home() {
  const items = useLayoutPositions(rootItems);

  return (
    <main className="w-screen h-screen relative">
      <Canvas.Root>{items}</Canvas.Root>
    </main>
  );
}
