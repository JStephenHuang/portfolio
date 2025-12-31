"use client";

import { useRef, useEffect, createContext, useContext, useState, useId } from "react";
import { createDraggable } from "animejs";
import type { Draggable } from "animejs";
import clsx from "clsx";
import { useSettings } from "@/lib/hooks/useSettings";
import { GRID_SIZE_X, GRID_SIZE_Y } from "@/lib/constants";
import "./styles.css";

// Context for passing layout mode to items
type LayoutMode = "snap" | "free" | null;

interface CanvasContextType {
  containerRef: React.RefObject<HTMLDivElement | null>;
  layout: LayoutMode;
  activeItemId: string | null;
  setActiveItemId: (id: string | null) => void;
}

const CanvasContext = createContext<CanvasContextType | null>(null);

// Custom hook to access canvas context
export const useDraggableCanvas = () => {
  const context = useContext(CanvasContext);
  if (!context) {
    throw new Error("useDraggableCanvas must be used within a Canvas.Root");
  }
  return context;
};

// Track z-index globally
let topZIndex = 1;

// ============================================
// Canvas.Item - Draggable item component
// ============================================
interface ItemProps {
  children: React.ReactNode;
  onClick?: () => void;
  initialX?: number;
  initialY?: number;
}

const Item = ({ children, onClick, initialX = 0, initialY = 0 }: ItemProps) => {
  const { containerRef, layout, activeItemId, setActiveItemId } = useDraggableCanvas();

  const nodeRef = useRef<HTMLDivElement>(null);
  const draggableRef = useRef<Draggable | null>(null);
  const wasDragged = useRef(false);
  const positionRef = useRef<{ x: number; y: number } | null>(null);
  const prevLayoutRef = useRef<LayoutMode>(null);

  const itemId = useId();
  const [zIndex, setZIndex] = useState(1);
  const isActive = activeItemId === itemId;

  useEffect(() => {
    if (!nodeRef.current || !containerRef?.current) return;

    // Save current position before recreating draggable
    if (draggableRef.current) {
      positionRef.current = { x: draggableRef.current.x, y: draggableRef.current.y };
      draggableRef.current.revert();
    }

    // Create draggable with snap based on layout mode
    draggableRef.current = createDraggable(nodeRef.current, {
      container: containerRef.current,
      containerFriction: 1,
      snap: layout === "snap" ? GRID_SIZE_X : undefined,
      cursor: {
        onHover: "pointer",
        onGrab: "grabbing",
      },
      onGrab: () => {
        wasDragged.current = false;
        topZIndex += 1;
        setZIndex(topZIndex);
        setActiveItemId(itemId);
      },
      onDrag: () => {
        wasDragged.current = true;
      },
      onRelease: () => {
        if (draggableRef.current) {
          positionRef.current = { x: draggableRef.current.x, y: draggableRef.current.y };
        }
        if (!wasDragged.current) {
          onClick?.();
        }
      },
    });

    // Set position: use saved position or initial
    const x = positionRef.current?.x ?? initialX;
    const y = positionRef.current?.y ?? initialY;
    draggableRef.current.setX(x);
    draggableRef.current.setY(y);

    if (positionRef.current === null) {
      positionRef.current = { x: initialX, y: initialY };
    }

    prevLayoutRef.current = layout ?? null;

    return () => {
      if (draggableRef.current) {
        positionRef.current = { x: draggableRef.current.x, y: draggableRef.current.y };
      }
    };
  }, [onClick, containerRef, layout, initialX, initialY, itemId, setActiveItemId]);

  return (
    <div
      ref={nodeRef}
      className={clsx("canvas-item absolute p-1", isActive && "outline-dotted outline-2")}
      style={{ zIndex }}
    >
      {children}
    </div>
  );
};

// ============================================
// Canvas.Root - Container component
// ============================================
interface RootProps {
  children: React.ReactNode;
  className?: string;
}

const Root = ({ children, className }: RootProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeItemId, setActiveItemId] = useState<string | null>(null);
  const { layout } = useSettings();

  const handleBackgroundClick = (e: React.MouseEvent) => {
    if (e.target === containerRef.current) {
      setActiveItemId(null);
    }
  };

  return (
    <CanvasContext.Provider value={{ containerRef, layout, activeItemId, setActiveItemId }}>
      <div
        ref={containerRef}
        className={clsx(
          "canvas-root relative min-h-screen w-full h-full overflow-hidden",
          layout === "snap" && "canvas-grid",
          className,
        )}
        style={
          {
            "--grid-size-x": `${GRID_SIZE_X}px`,
            "--grid-size-y": `${GRID_SIZE_Y}px`,
          } as React.CSSProperties
        }
        onMouseDown={handleBackgroundClick}
      >
        {children}
      </div>
    </CanvasContext.Provider>
  );
};

// ============================================
// Export compound component
// ============================================
const Canvas = {
  Root,
  Item,
};

export default Canvas;
