import Directory from "@/components/custom/Directory";

interface Props {
  x?: number;
  y?: number;
}

const Sheartak = ({ x, y }: Props) => (
  <Directory
    title="sheartak"
    href="sheartak"
    icon="/sheartak/logo.png"
    initialX={x}
    initialY={y}
  />
);

export default Sheartak;
