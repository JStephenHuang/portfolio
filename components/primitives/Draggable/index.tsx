"use client";

import classNames from "classnames";
import {
  motion,
  useAnimationFrame,
  useMotionValue,
  useReducedMotion,
  type HTMLMotionProps,
} from "motion/react";
import { createContext, useContext, useEffect, useMemo, useRef } from "react";
import type React from "react";

import styles from "./styles.module.scss";

type DragElastic = NonNullable<HTMLMotionProps<"div">["dragElastic"]>;

type DraggableContextValue = {
  bounce: number;
  constraintsRef: React.RefObject<HTMLDivElement | null>;
  dragElastic: DragElastic;
  friction: number;
  momentum: boolean;
};

type DraggableRootProps = React.ComponentPropsWithoutRef<"div"> & {
  bounce: number;
  friction: number;
  elasticity?: DragElastic;
  momentum?: boolean;
};

export type DraggablePosition = {
  x: number;
  y: number;
};

type DraggableItemProps = Omit<HTMLMotionProps<"div">, "dragConstraints" | "ref"> & {
  initialPosition?: DraggablePosition;
  onSettle?: (position: DraggablePosition) => void;
};

type DragBounds = {
  maxX: number;
  maxY: number;
  minX: number;
  minY: number;
};

type AxisCollision = {
  position: number;
  velocity: number;
};

const DraggableContext = createContext<DraggableContextValue | null>(null);
const useDraggableContext = () => {
  const context = useContext(DraggableContext);

  if (!context) throw new Error("useDraggableContext must be used within a DraggableRoot");

  return context;
};

const clampUnit = (value: number) => Math.min(Math.max(value, 0), 1);

const resolveCollision = (
  position: number,
  velocity: number,
  min: number,
  max: number,
  restitution: number,
): AxisCollision => {
  if (position < min) {
    return {
      position: Math.min(max, min + (min - position) * restitution),
      velocity: Math.abs(velocity) * restitution,
    };
  }

  if (position > max) {
    return {
      position: Math.max(min, max - (position - max) * restitution),
      velocity: -Math.abs(velocity) * restitution,
    };
  }

  return { position, velocity };
};

export const DraggableRoot: React.FC<DraggableRootProps> = ({
  bounce,
  children,
  className,
  elasticity = 0,
  friction,
  momentum = true,
  ...props
}) => {
  const constraintsRef = useRef<HTMLDivElement>(null);
  const normalizedBounce = clampUnit(bounce);
  const normalizedFriction = clampUnit(friction);

  const physics = useMemo<DraggableContextValue>(
    () => ({
      bounce: normalizedBounce,
      constraintsRef,
      dragElastic: elasticity,
      friction: normalizedFriction,
      momentum,
    }),
    [elasticity, momentum, normalizedBounce, normalizedFriction],
  );

  return (
    <DraggableContext.Provider value={physics}>
      <div ref={constraintsRef} className={classNames(styles.root, className)} {...props}>
        {children}
      </div>
    </DraggableContext.Provider>
  );
};

export const DraggableItem: React.FC<DraggableItemProps> = ({
  children,
  className,
  drag = true,
  dragElastic,
  dragMomentum,
  initialPosition,
  onDragEnd,
  onDragStart,
  onSettle,
  style,
  ...props
}) => {
  const physics = useDraggableContext();
  const shouldReduceMotion = useReducedMotion();
  const itemRef = useRef<HTMLDivElement>(null);
  const boundsRef = useRef<DragBounds | null>(null);
  const velocityRef = useRef({ x: 0, y: 0 });
  const isMovingRef = useRef(false);
  const x = useMotionValue(initialPosition?.x ?? 0);
  const y = useMotionValue(initialPosition?.y ?? 0);
  const restitution = physics?.bounce ?? 0.75;
  const friction = physics?.friction ?? 0.12;
  const hasMomentum = dragMomentum ?? physics?.momentum ?? true;

  const settle = () => {
    onSettle?.({
      x: Math.round(x.get() * 100) / 100,
      y: Math.round(y.get() * 100) / 100,
    });
  };

  const measureBounds = () => {
    const root = physics?.constraintsRef.current;
    const item = itemRef.current;

    if (!root || !item) {
      return null;
    }

    const rootRect = root.getBoundingClientRect();
    const itemRect = item.getBoundingClientRect();
    const currentX = x.get();
    const currentY = y.get();
    const minX = currentX + rootRect.left - itemRect.left;
    const maxX = currentX + rootRect.right - itemRect.right;
    const minY = currentY + rootRect.top - itemRect.top;
    const maxY = currentY + rootRect.bottom - itemRect.bottom;

    return {
      minX: Math.min(minX, maxX),
      maxX: Math.max(minX, maxX),
      minY: Math.min(minY, maxY),
      maxY: Math.max(minY, maxY),
    };
  };

  useEffect(() => {
    const frame = window.requestAnimationFrame(() => {
      const nextX = initialPosition?.x ?? 0;
      const nextY = initialPosition?.y ?? 0;
      const bounds = measureBounds();

      x.set(bounds ? Math.min(Math.max(nextX, bounds.minX), bounds.maxX) : nextX);
      y.set(bounds ? Math.min(Math.max(nextY, bounds.minY), bounds.maxY) : nextY);
    });

    return () => window.cancelAnimationFrame(frame);
  }, [initialPosition?.x, initialPosition?.y]);

  useAnimationFrame((_, delta) => {
    const bounds = boundsRef.current;

    if (!isMovingRef.current || !bounds) {
      return;
    }

    const elapsed = Math.min(delta, 32) / 1000;
    const decay = Math.exp(-friction * 8 * elapsed);
    const nextVelocityX = velocityRef.current.x * decay;
    const nextVelocityY = velocityRef.current.y * decay;
    const collisionX = resolveCollision(
      x.get() + nextVelocityX * elapsed,
      nextVelocityX,
      bounds.minX,
      bounds.maxX,
      restitution,
    );
    const collisionY = resolveCollision(
      y.get() + nextVelocityY * elapsed,
      nextVelocityY,
      bounds.minY,
      bounds.maxY,
      restitution,
    );

    velocityRef.current = {
      x: collisionX.velocity,
      y: collisionY.velocity,
    };
    x.set(collisionX.position);
    y.set(collisionY.position);

    if (Math.hypot(collisionX.velocity, collisionY.velocity) < 8) {
      isMovingRef.current = false;
      velocityRef.current = { x: 0, y: 0 };
      settle();
    }
  });

  return (
    <motion.div
      ref={itemRef}
      className={classNames(styles.item, className)}
      drag={drag}
      dragConstraints={physics?.constraintsRef}
      dragElastic={dragElastic ?? physics?.dragElastic}
      dragMomentum={false}
      style={{
        ...style,
        x,
        y,
      }}
      onDragStart={(event, info) => {
        isMovingRef.current = false;
        velocityRef.current = { x: 0, y: 0 };
        onDragStart?.(event, info);
      }}
      onDragEnd={(event, info) => {
        boundsRef.current = measureBounds();
        velocityRef.current = {
          x: drag === "y" ? 0 : info.velocity.x,
          y: drag === "x" ? 0 : info.velocity.y,
        };
        isMovingRef.current = Boolean(boundsRef.current) && hasMomentum && !shouldReduceMotion;

        if (!isMovingRef.current) settle();
        onDragEnd?.(event, info);
      }}
      {...props}
    >
      {children}
    </motion.div>
  );
};

export { DraggableRoot as Root, DraggableItem as Item };
