"use client";

import React, { useState } from "react";
import DraggableItem from "./DraggableItem";

interface CanvasItem {
  id: string;
  title: string;
  image: string;
  href?: string;
  draggable?: boolean;
  x: number;
  y: number;
}

interface CanvasProps {
  items: CanvasItem[];
}

const Canvas = ({ items }: CanvasProps) => {
  const [highestZIndex, setHighestZIndex] = useState(items.length);
  const [itemZIndices, setItemZIndices] = useState<Record<string, number>>(() => {
    return items.reduce<Record<string, number>>((acc, item, index) => {
      acc[item.id] = index + 1;
      return acc;
    }, {});
  });

  const bringToFront = (itemId: string) => {
    const newZIndex = highestZIndex + 1;
    setHighestZIndex(newZIndex);
    setItemZIndices((prev) => ({
      ...prev,
      [itemId]: newZIndex,
    }));
  };

  return (
    <div className="absolute w-full h-full overflow-hidden">
      {items.map((item, key) => (
        <DraggableItem
          key={key}
          id={item.id}
          title={item.title}
          image={item.image}
          href={item.href}
          initialX={item.x}
          initialY={item.y}
          zIndex={itemZIndices[item.id]}
          onInteract={bringToFront}
        />
      ))}
    </div>
  );
};

export default Canvas;
