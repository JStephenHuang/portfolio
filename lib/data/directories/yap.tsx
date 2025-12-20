import Directory from "@/components/custom/Directory";

interface Props {
  x?: number;
  y?: number;
}

const Yap = ({ x, y }: Props) => (
  <Directory title="yap" href="yap" initialX={x} initialY={y} />
);

export default Yap;
