import type { Metadata } from "next";

import PortfolioGallery from "@/app/_components/PortfolioGallery";
import { getGalleryItems } from "@/lib/data/galleries";

export const metadata: Metadata = {
  title: "Projects | jsh",
};

const ProjectsPage: React.FC = () => (
  <PortfolioGallery items={getGalleryItems("projects")} storageKey="projects-items" />
);

export default ProjectsPage;
