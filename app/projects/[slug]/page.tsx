import { projects } from "@/src/models/Projects";

const ProjectPage = ({ params }: { params: { slug: string } }) => {
  const project = projects.find((project) => (project.slug = params.slug));
  return <div>{project?.name}</div>;
};

export default ProjectPage;
