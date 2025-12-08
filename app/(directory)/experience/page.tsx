"use client";

import Canvas from "@/components/Canvas";
import GarmentSystem from "@/lib/data/directories/garment-system";
import ParametricResearchLabs from "@/lib/data/directories/parametric-research-labs";
import Sheartak from "@/lib/data/directories/sheartak";
import { useGridPositions } from "@/lib/hooks/useGridPositions";

export default function ExperiencePage() {
  const experienceItems = [ParametricResearchLabs, GarmentSystem, Sheartak];

  const items = useGridPositions(experienceItems);

  return (
    <main className="w-screen h-screen bg-white relative">
      <Canvas.Root>{items}</Canvas.Root>
    </main>
  );
}
