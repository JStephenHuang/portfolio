export type Vector = {
  x: number;
  y: number;
};

export type Bounds = {
  minX: number;
  maxX: number;
  minY: number;
  maxY: number;
};

export const getBounds = (rink: HTMLDivElement, item: HTMLDivElement): Bounds => {
  return {
    minX: -item.offsetLeft,
    minY: -item.offsetTop,
    maxX: Math.max(-item.offsetLeft, rink.clientWidth - item.offsetLeft - item.offsetWidth),
    maxY: Math.max(-item.offsetTop, rink.clientHeight - item.offsetTop - item.offsetHeight),
  };
};

export const resolveCollision = (position: number, velocity: number, min: number, max: number, bounce: number) => {
  if (position < min) {
    return {
      position: min,
      velocity: Math.abs(velocity) * bounce,
    };
  }

  if (position > max) {
    return {
      position: max,
      velocity: -Math.abs(velocity) * bounce,
    };
  }

  return { position, velocity };
};
