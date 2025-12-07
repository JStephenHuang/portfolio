import Directory from "@/components/custom/Directory";

interface Props {
  x?: number;
  y?: number;
}

const ProjectsDirectory = ({ x, y }: Props) => (
  <Directory
    title="projects"
    href="/projects"
    image="/root/projects-1.png"
    initialX={x}
    initialY={y}
  />
);

export default ProjectsDirectory;
