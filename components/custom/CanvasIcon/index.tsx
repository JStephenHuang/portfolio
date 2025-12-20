"use client";

import Canvas from "@/components/Canvas";
import Image from "next/image";
import clsx from "clsx";

interface CanvasIconProps {
  title: string;
  icon?: string;
  onClick?: () => void;
  initialX?: number;
  initialY?: number;
}

const CanvasIcon = ({
  title,
  icon = "/graphics/wave-1.png",
  onClick,
  initialX = 100,
  initialY = 100,
}: CanvasIconProps) => {
  return (
    <Canvas.Item initialX={initialX} initialY={initialY} onClick={onClick}>
      <div className="flex flex-col items-center gap-1">
        <div className={clsx("w-20 h-20")}>
          <Image
            src={icon}
            alt={title}
            width={500}
            height={500}
            className="w-full h-full object-contain"
            draggable={false}
          />
        </div>
        <span className="max-w-20 break-words text-center">{title}</span>
      </div>
    </Canvas.Item>
  );
};

export default CanvasIcon;
