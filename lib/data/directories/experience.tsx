import Directory from "@/components/custom/Directory";

interface Props {
  x?: number;
  y?: number;
}

const ExperienceDirectory = ({ x, y }: Props) => (
  <Directory
    title="experience"
    href="/experience"
    image="/root/experience-3.png"
    initialX={x}
    initialY={y}
  />
);

export default ExperienceDirectory;
