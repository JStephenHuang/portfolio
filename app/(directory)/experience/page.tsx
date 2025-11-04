"use client";

import Canvas from "@/components/Canvas";
import Directory from "@/components/custom/Directory";
import { projectDirectories } from "@/lib/data/directories/projects";

export default function ExperiencePage() {
  const items = projectDirectories.map((dir, index) => (
    <Directory
      key={index}
      title={dir.name}
      href={dir.href}
      image={dir.image}
      initialX={(index + 1) * 150}
      initialY={(index + 1) * 150}
    />
  ));

  return (
    <main className="w-screen h-screen bg-white relative">
      <Canvas.Root>{items}</Canvas.Root>
    </main>
  );
}
