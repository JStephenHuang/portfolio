"use client";

import Canvas from "@/components/Canvas";
import GarmentSystem from "@/lib/data/directories/garment-system";

export default function ExperiencePage() {
  const experienceItems: React.ReactNode[] = [<GarmentSystem key={"gs"} />];

  return (
    <main className="w-screen h-screen bg-white relative">
      <Canvas.Root>{experienceItems}</Canvas.Root>
    </main>
  );
}
