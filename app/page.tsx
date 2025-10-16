"use client";

import Canvas from "@/components/Canvas/Canvas";
import { projects } from "@/src/models/project";
import { Nav } from "@/components/Nav/index";

export default function Home() {
  // Convert projects to canvas items
  const canvasItems = projects.map((project, index) => ({
    id: project.slug,
    title: project.slug,
    image: project.image ?? "/graphics/wave-1.png",
    href: `/projects/${project.slug}`,
    x: 100 + (index % 4) * 150,
    y: 100 + Math.floor(index / 4) * 120,
  }));

  return (
    <main className="w-screen h-screen bg-white relative">
      <Nav />
      <div className="absolute top-16 left-8">
        <h1 className="text-4xl font-bold">/</h1>
      </div>
      <div className="absolute w-full h-full flex flex-col">
        <Canvas items={canvasItems} />
      </div>
    </main>
  );
}
