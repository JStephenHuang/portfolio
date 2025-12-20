import Directory from "@/components/custom/Directory";

interface Props {
  x?: number;
  y?: number;
}

const GarmentSystem = ({ x, y }: Props) => (
  <Directory
    title="garment system"
    href="garment-system"
    icon="/gs/logo.png"
    initialX={x}
    initialY={y}
  />
);

export default GarmentSystem;
