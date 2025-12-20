import Directory from "@/components/custom/Directory";

interface Props {
  x?: number;
  y?: number;
}

const ExperienceDirectory = ({ x, y }: Props) => (
  <Directory
    title="experience"
    href="/experience"
    icon="/root/experience-4.gif"
    initialX={x}
    initialY={y}
  />
);

export default ExperienceDirectory;
