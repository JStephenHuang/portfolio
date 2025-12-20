import Directory from "@/components/custom/Directory";

interface Props {
  x?: number;
  y?: number;
}

const ParametricResearchLabs = ({ x, y }: Props) => (
  <Directory
    title="parametric research labs"
    href="prl"
    icon="/prl/logo.png"
    initialX={x}
    initialY={y}
  />
);

export default ParametricResearchLabs;
