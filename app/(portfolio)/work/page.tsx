import type { Metadata } from "next";

import PortfolioGallery from "@/app/_components/PortfolioGallery";
import { getGalleryItems } from "@/lib/data/galleries";

export const metadata: Metadata = {
  title: "Work | jsh",
};

const WorkPage: React.FC = () => (
  <PortfolioGallery items={getGalleryItems("work")} storageKey="work-items" />
);

export default WorkPage;
