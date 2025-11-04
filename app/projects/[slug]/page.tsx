import React from "react";

const ProjectPage = ({ params }: { params: { slug: string } }) => {
  return <div className="w-full flex flex-col items-center">Project: {params.slug}</div>;
};

export default ProjectPage;
