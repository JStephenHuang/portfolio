"use client";

import { useState, useRef, useEffect } from "react";
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
  const [isSelected, setIsSelected] = useState(false);
  const [zIndex, setZIndex] = useState(1);
  const wasDraggedRef = useRef(false);
  const nodeRef = useRef<HTMLDivElement>(null);

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

    setIsSelected(true);
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
        ref={nodeRef}
        className={`absolute p-1 cursor-pointer ${isDragging || isSelected ? "outline-dotted outline-2" : ""}`}
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
