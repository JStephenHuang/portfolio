"use client";

import Canvas from "@/components/Canvas";
import GarmentSystem from "@/lib/data/directories/garment-system";

export default function ProjectsPage() {
  const projectsItems: React.ReactNode[] = [<GarmentSystem key={"gs"} />];

  return (
    <main className="w-screen h-screen bg-white relative">
      <Canvas.Root>{projectsItems}</Canvas.Root>
    </main>
  );
}
