"use client";

import Canvas from "@/components/Canvas";
import ImageWithBackground from "@/components/custom/ImageWithBackground";
import { ColorBackground } from "@/lib/types/bg";

interface CanvasIconProps {
  title: string;
  bg?: ColorBackground;
  icon?: string;
  onClick?: () => void;
  initialX?: number;
  initialY?: number;
}

const CanvasIcon = ({
  title,
  icon = "/graphics/wave-1.png",
  bg = "transparent",
  onClick,
  initialX = 100,
  initialY = 100,
}: CanvasIconProps) => {
  return (
    <Canvas.Item initialX={initialX} initialY={initialY} onClick={onClick}>
      <div className="flex flex-col items-center gap-1">
        <ImageWithBackground
          src={icon}
          alt={title}
          bg={bg}
          className="w-20 h-20 object-contain"
          draggable={false}
        />
        <span className="max-w-20 break-words text-center">{title}</span>
      </div>
    </Canvas.Item>
  );
};

export default CanvasIcon;
