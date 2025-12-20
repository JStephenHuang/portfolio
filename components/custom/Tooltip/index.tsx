import { ReactNode } from "react";

type Position = "top" | "right" | "bottom" | "left";

interface TooltipProps {
  children: ReactNode;
  content: string;
  position?: Position;
}

const positionClasses: Record<Position, string> = {
  top: "bottom-full left-1/2 -translate-x-1/2 mb-1",
  bottom: "top-full left-1/2 -translate-x-1/2 mt-1",
  left: "right-full top-1/2 -translate-y-1/2 mr-1",
  right: "left-full top-1/2 -translate-y-1/2 ml-1",
};

export default function Tooltip({ children, content, position = "top" }: TooltipProps) {
  return (
    <span className="relative group">
      {children}
      <span
        className={`absolute ${positionClasses[position]} px-2 py-1 text-sm bg-[var(--bg)] border border-[var(--border)] rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none`}
      >
        {content}
      </span>
    </span>
  );
}
