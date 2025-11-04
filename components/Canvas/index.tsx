"use client";

import { useState, useRef } from "react";
import Draggable from "react-draggable";

interface DraggableItemProps {
  children: React.ReactNode;
  onClick?: () => void; // Triggered only on click, not drag
  initialX?: number;
  initialY?: number;
}

// Track the highest z-index globally
let highestZIndex = 1;

const DraggableItem = ({ children, onClick, initialX = 0, initialY = 0 }: DraggableItemProps) => {
  const [isDragging, setIsDragging] = useState(false);
  const [zIndex, setZIndex] = useState(1);
  const wasDraggedRef = useRef(false);

  const handleStart = () => {
    setIsDragging(false);
    wasDraggedRef.current = false;
    // Bring to front when starting to drag
    highestZIndex += 1;
    setZIndex(highestZIndex);
  };

  const handleDrag = () => {
    setIsDragging(true);
    wasDraggedRef.current = true;
  };

  const handleStop = () => {
    setIsDragging(false);

    // If no significant dragging occurred, treat it as a click
    if (!wasDraggedRef.current && onClick) {
      onClick();
    }
  };

  return (
    <Draggable
      defaultPosition={{ x: initialX, y: initialY }}
      onStart={handleStart}
      onDrag={handleDrag}
      onStop={handleStop}
      bounds="parent" // Constrains dragging within parent boundaries
    >
      <div
        className={`absolute p-1 cursor-pointer ${isDragging ? "outline-dotted outline-2" : ""}`}
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

const CanvasRoot = ({ children, className = "" }: CanvasRootProps) => {
  return (
    <div className={`relative min-h-screen w-full h-full overflow-hidden ${className}`}>
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
