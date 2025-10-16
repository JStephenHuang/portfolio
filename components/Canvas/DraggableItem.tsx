"use client";

import React, { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";

interface DraggableItemProps {
  id: string;
  title: string;
  image: string;
  href?: string;
  zIndex: number;
  initialX?: number;
  initialY?: number;
  onInteract?: (id: string) => void;
  onPositionChange?: (id: string, x: number, y: number) => void;
  children?: React.ReactNode;
}

const ITEM_WIDTH = 96; // Approximate width of the item
const ITEM_HEIGHT = 96; // Approximate height of the item

const DraggableItem = ({
  id,
  title,
  image,
  href,
  zIndex,
  initialX = 100,
  initialY = 100,
  onInteract,
  onPositionChange,
}: DraggableItemProps) => {
  const router = useRouter();
  const [position, setPosition] = useState({ x: initialX, y: initialY });
  const [isDragging, setIsDragging] = useState(false);
  const [hasMouseMoved, setHasMouseMoved] = useState(false);
  const dragRef = useRef<{
    startX: number;
    startY: number;
    elemX: number;
    elemY: number;
    finalX?: number;
    finalY?: number;
  }>({
    startX: 0,
    startY: 0,
    elemX: initialX,
    elemY: initialY,
  });

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    setHasMouseMoved(false);
    // Bring this item to front when interacting

    onInteract?.(id);

    dragRef.current = {
      startX: e.clientX,
      startY: e.clientY,
      elemX: position.x,
      elemY: position.y,
    };
  };

  const handleMouseMove = (e: MouseEvent) => {
    if (!isDragging) return;

    const deltaX = e.clientX - dragRef.current.startX;
    const deltaY = e.clientY - dragRef.current.startY;

    // Detect if mouse has moved at all
    if (deltaX !== 0 || deltaY !== 0) {
      setHasMouseMoved(true);
    }

    // Calculate new position
    let newX = dragRef.current.elemX + deltaX;
    let newY = dragRef.current.elemY + deltaY;

    // Constrain to canvas boundaries
    const maxX = window.innerWidth - ITEM_WIDTH;
    const maxY = window.innerHeight - ITEM_HEIGHT;

    newX = Math.max(0, Math.min(newX, maxX));
    newY = Math.max(0, Math.min(newY, maxY));

    // Store final position in ref for saving later
    dragRef.current.finalX = newX;
    dragRef.current.finalY = newY;

    setPosition({
      x: newX,
      y: newY,
    });
  };

  const handleMouseUp = () => {
    setIsDragging(false);

    // Save position to localStorage if it changed
    if (
      hasMouseMoved &&
      onPositionChange &&
      dragRef.current.finalX !== undefined &&
      dragRef.current.finalY !== undefined
    ) {
      onPositionChange(id, dragRef.current.finalX, dragRef.current.finalY);
    }

    // Only navigate if mouse didn't move (was a click, not a drag)
    if (!hasMouseMoved && href) {
      router.push(href);
    }
  };

  useEffect(() => {
    if (isDragging) {
      window.addEventListener("mousemove", handleMouseMove);
      window.addEventListener("mouseup", handleMouseUp);
    }

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, [isDragging, hasMouseMoved, href]);

  return (
    <div
      className="absolute cursor-pointer select-none"
      style={{
        left: `${position.x}px`,
        top: `${position.y}px`,
        zIndex: zIndex,
      }}
      onMouseDown={handleMouseDown}
    >
      <div
        className={`flex flex-col items-center gap-2 p-2 transition-colors ${
          isDragging && "border border-dotted border-black"
        }`}
      >
        {/* Icon */}
        <div className="w-20 aspect-square flex items-center justify-center ">
          <Image
            className="w-full h-full"
            src={image}
            alt="Folder"
            width={1000}
            height={1000}
            draggable={false}
          />
        </div>
        {/* Label */}
        <span className="text-xs text-center max-w-[120px] break-words">{title}</span>
      </div>
    </div>
  );
};

export default DraggableItem;
