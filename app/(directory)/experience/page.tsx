"use client";

import Canvas from "@/components/Canvas";
import GarmentSystem from "@/lib/data/directories/garment-system";
import ParametricResearchLabs from "@/lib/data/directories/parametric-research-labs";
import { useLayoutPositions } from "@/lib/hooks/useLayoutPositions";

export default function ExperiencePage() {
  const experienceItems = [ParametricResearchLabs, GarmentSystem];
  const items = useLayoutPositions(experienceItems);

  return (
    <main className="w-screen h-screen relative">
      <Canvas.Root>{items}</Canvas.Root>
    </main>
  );
}
