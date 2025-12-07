"use client";

import Canvas from "@/components/Canvas";
import { AoC2025 } from "@/lib/data/directories/aoc";

export default function AoCPage() {
  const aocItems: React.ReactNode[] = [<AoC2025 key={"2025"} />];

  return (
    <main className="w-screen h-screen bg-white relative">
      <Canvas.Root>{aocItems}</Canvas.Root>
    </main>
  );
}
