"use client";

import { useRouter } from "next/navigation";
import Canvas from "@/components/Canvas";
import Image from "next/image";

interface DirectoryProps {
  title: string;
  image?: string;
  href: string;
  initialX?: number;
  initialY?: number;
}

const Directory = ({
  title,
  image = "/graphics/wave-1.png",
  href,
  initialX = 100,
  initialY = 100,
}: DirectoryProps) => {
  const router = useRouter();

  return (
    <Canvas.Item initialX={initialX} initialY={initialY} onClick={() => router.push(href)}>
      <div className="flex flex-col items-center gap-1">
        <div className="w-20 h-20">
          {/* Folder icon */}
          <Image
            src={image}
            alt="Document Icon"
            width={500}
            height={500}
            className="w-full h-full object-cover"
            draggable={false}
          />
        </div>
        <span className="max-w-20 break-words text-center">{title}</span>
      </div>
    </Canvas.Item>
  );
};

export default Directory;
