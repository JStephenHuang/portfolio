import PortfolioGallery from "@/app/_components/PortfolioGallery";
import { getGalleryItems } from "@/lib/data/galleries";

const Root: React.FC = () => {
  return <PortfolioGallery items={getGalleryItems("home")} storageKey="root-items" />;
};

export default Root;
