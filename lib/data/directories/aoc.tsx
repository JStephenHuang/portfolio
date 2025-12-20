import Directory from "@/components/custom/Directory";

interface Props {
  x?: number;
  y?: number;
}

export const AoC = ({ x, y }: Props) => (
  <Directory title="aoc" href="/aoc" icon="/aoc/logo.png" initialX={x} initialY={y} />
);

export const AoC2025 = ({ x, y }: Props) => (
  <Directory title="2025" href="2025" initialX={x} initialY={y} />
);
