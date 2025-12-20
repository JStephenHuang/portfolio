"use client";

import { useState, useRef, useEffect } from "react";
import Draggable from "react-draggable";
import clsx from "clsx";
import "./styles.css";

interface DraggableItemProps {
  children: React.ReactNode;
  onClick?: () => void; // Triggered only on click, not drag
  initialX?: number;
  initialY?: number;
}

// Track the highest z-index globally
let highestZIndex = 1;

const DraggableItem = ({ children, onClick, initialX = 0, initialY = 0 }: DraggableItemProps) => {
  const [position, setPosition] = useState({ x: initialX, y: initialY });
  const [isDragging, setIsDragging] = useState(false);
  const [isSelected, setIsSelected] = useState(false);
  const [zIndex, setZIndex] = useState(1);
  const wasDraggedRef = useRef(false);
  const nodeRef = useRef<HTMLDivElement>(null);

  // Update position when initialX/initialY props change (e.g., layout mode switch)
  useEffect(() => {
    setPosition({ x: initialX, y: initialY });
  }, [initialX, initialY]);

  // Handle clicks outside to deselect
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (nodeRef.current && !nodeRef.current.contains(e.target as Node)) {
        setIsSelected(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleStart = () => {
    setIsDragging(true);
    wasDraggedRef.current = false;
    // Bring to front when starting to drag
    highestZIndex += 1;
    setZIndex(highestZIndex);
  };

  const handleDrag = (_e: unknown, data: { x: number; y: number }) => {
    setIsDragging(true);
    wasDraggedRef.current = true;
    setPosition({ x: data.x, y: data.y });
  };

  const handleStop = () => {
    setIsDragging(false);

    // If no significant dragging occurred, treat it as a click
    if (!wasDraggedRef.current && onClick) {
      onClick();
    }

    setIsSelected(true);
  };

  return (
    <Draggable
      nodeRef={nodeRef}
      position={position}
      onStart={handleStart}
      onDrag={handleDrag}
      onStop={handleStop}
      bounds="parent" // Constrains dragging within parent boundaries
    >
      <div
        ref={nodeRef}
        className={clsx(
          "canvas-item absolute p-1 cursor-pointer",
          !isDragging && "canvas-item-transition",
          (isDragging || isSelected) && "outline-dotted outline-2",
        )}
        style={{ zIndex }}
      >
        {children}
      </div>
    </Draggable>
  );
};

interface CanvasRootProps {
  children: React.ReactNode;
  className?: string;
}

const CanvasRoot = ({ children, className }: CanvasRootProps) => {
  return (
    <div className={clsx("relative min-h-screen w-full h-full overflow-hidden", className)}>
      {children}
    </div>
  );
};

// Compound component pattern
const Canvas = {
  Root: CanvasRoot,
  Item: DraggableItem,
};

export default Canvas;
