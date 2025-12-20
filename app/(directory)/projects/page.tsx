"use client";

import Canvas from "@/components/Canvas";
import Yap from "@/lib/data/directories/yap";

export default function ProjectsPage() {
  return (
    <main className="w-screen h-screen relative">
      <Canvas.Root>
        <Yap x={100} y={100} />
      </Canvas.Root>
    </main>
  );
}
