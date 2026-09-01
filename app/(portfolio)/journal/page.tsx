import type { Metadata } from "next";

import PortfolioGallery from "@/app/_components/PortfolioGallery";
import { getGalleryItems } from "@/lib/data/galleries";

export const metadata: Metadata = {
  title: "Journal | jsh",
};

const JournalPage: React.FC = () => (
  <PortfolioGallery items={getGalleryItems("journal")} storageKey="journal-items" />
);

export default JournalPage;
