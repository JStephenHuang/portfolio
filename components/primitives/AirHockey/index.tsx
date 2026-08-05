"use client";

import { motion, type PanInfo, useAnimationFrame, useMotionValue } from "motion/react";
import React, { useCallback, useEffect, useRef } from "react";

import { Provider, ProviderProps, useAirHockeyContext } from "./Context";
import { Bounds, getBounds, resolveCollision, Vector } from "./physics";

interface RootProps extends React.ComponentProps<"div">, Omit<ProviderProps, "rinkRef"> {}

const Root: React.FC<RootProps> = ({ children, physics, off, style, ...props }) => {
  const rinkRef = useRef<HTMLDivElement>(null);

  return (
    <Provider physics={physics} off={off} rinkRef={rinkRef}>
      <div
        ref={rinkRef}
        style={{ position: "relative", isolation: "isolate", overflow: "hidden", ...style }}
        {...props}
      >
        {children}
      </div>
    </Provider>
  );
};

interface ItemProps extends React.ComponentProps<typeof motion.div> {
  initialX?: number;
  initialY?: number;
  onSettle?: (position: Vector) => void;
}

const Item: React.FC<ItemProps> = ({
  children,
  initialX = 0,
  initialY = 0,
  style,
  onDragStart,
  onDragEnd,
  onSettle,
  ...props
}) => {
  const { physics, off, rinkRef } = useAirHockeyContext();
  const itemRef = useRef<HTMLDivElement>(null);
  const boundsRef = useRef<Bounds | null>(null);
  const velocityRef = useRef<Vector>({ x: 0, y: 0 });
  const isDraggingRef = useRef(false);
  const isMovingRef = useRef(false);
  const hasInitializedRef = useRef(false);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const settle = useCallback(() => {
    const bounds = boundsRef.current;

    isMovingRef.current = false;
    velocityRef.current = { x: 0, y: 0 };

    if (!bounds) return;

    const width = bounds.maxX - bounds.minX;
    const height = bounds.maxY - bounds.minY;

    onSettle?.({
      x: width === 0 ? 0 : (x.get() - bounds.minX) / width,
      y: height === 0 ? 0 : (y.get() - bounds.minY) / height,
    });
  }, [onSettle, x, y]);

  const measureBounds = useCallback(() => {
    const rink = rinkRef.current;
    const item = itemRef.current;

    if (!rink || !item) return;

    boundsRef.current = getBounds(rink, item);
    const bounds = boundsRef.current;

    if (!hasInitializedRef.current) {
      hasInitializedRef.current = true;
      const normalizedX = Math.min(1, Math.max(0, initialX));
      const normalizedY = Math.min(1, Math.max(0, initialY));

      x.set(bounds.minX + normalizedX * (bounds.maxX - bounds.minX));
      y.set(bounds.minY + normalizedY * (bounds.maxY - bounds.minY));
      return;
    }

    x.set(Math.min(bounds.maxX, Math.max(bounds.minX, x.get())));
    y.set(Math.min(bounds.maxY, Math.max(bounds.minY, y.get())));
  }, [initialX, initialY, rinkRef, x, y]);

  useEffect(() => {
    const rink = rinkRef.current;
    const item = itemRef.current;

    if (!rink || !item) return;

    const observer = new ResizeObserver(measureBounds);

    observer.observe(rink);
    observer.observe(item);

    return () => {
      observer.disconnect();
    };
  }, [measureBounds, rinkRef]);

  useEffect(() => {
    if (off) settle();
  }, [off]);

  useAnimationFrame((_, delta) => {
    const bounds = boundsRef.current;

    if (!bounds) {
      measureBounds();
      return;
    }

    if (off || isDraggingRef.current || !isMovingRef.current) return;

    const friction = Math.min(1, Math.max(0, physics.friction));
    const bounce = Math.min(1, Math.max(0, physics.bounce));
    const elapsed = Math.min(delta, 32) / 1000;
    const decay = Math.exp(-friction * 8 * elapsed);
    const nextVelocityX = velocityRef.current.x * decay;
    const nextVelocityY = velocityRef.current.y * decay;

    const collisionX = resolveCollision(
      x.get() + nextVelocityX * elapsed,
      nextVelocityX,
      bounds.minX,
      bounds.maxX,
      bounce
    );
    const collisionY = resolveCollision(
      y.get() + nextVelocityY * elapsed,
      nextVelocityY,
      bounds.minY,
      bounds.maxY,
      bounce
    );

    velocityRef.current = {
      x: collisionX.velocity,
      y: collisionY.velocity,
    };
    x.set(collisionX.position);
    y.set(collisionY.position);

    if (Math.hypot(collisionX.velocity, collisionY.velocity) < 8) {
      settle();
    }
  });

  const handleDragStart = (event: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    onDragStart?.(event, info);
    isDraggingRef.current = true;
    isMovingRef.current = false;
    velocityRef.current = { x: 0, y: 0 };
  };

  const handleDragEnd = (event: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    onDragEnd?.(event, info);
    isDraggingRef.current = false;
    velocityRef.current = {
      x: info.velocity.x,
      y: info.velocity.y,
    };
    isMovingRef.current = Math.hypot(velocityRef.current.x, velocityRef.current.y) >= 8;

    if (!isMovingRef.current) settle();
  };

  return (
    <motion.div
      {...props}
      ref={itemRef}
      drag={!off}
      dragConstraints={rinkRef}
      dragElastic={0}
      dragMomentum={false}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
      style={{ position: "absolute", ...style, x, y }}
    >
      {children}
    </motion.div>
  );
};

export { Root, Item };
