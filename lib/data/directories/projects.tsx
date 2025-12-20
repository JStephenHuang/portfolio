import Directory from "@/components/custom/Directory";

interface Props {
  x?: number;
  y?: number;
}

const ProjectsDirectory = ({ x, y }: Props) => (
  <Directory
    title="projects"
    href="/projects"
    icon="/root/projects-2.png"
    initialX={x}
    initialY={y}
  />
);

export default ProjectsDirectory;
