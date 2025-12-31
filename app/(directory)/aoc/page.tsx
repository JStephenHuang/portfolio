"use client";

import Canvas from "@/components/Canvas";
import { AoC2025 } from "@/lib/data/directories/aoc";
import { useLayoutPositions } from "@/lib/hooks/useLayoutPositions";

export default function AoCPage() {
  const items = useLayoutPositions([AoC2025]);

  return (
    <main className="w-screen h-screen relative">
      <Canvas.Root>{items}</Canvas.Root>
    </main>
  );
}
