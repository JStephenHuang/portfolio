import { loadItems } from "@/lib/data/content.server";

import PortfolioGallery from "./_components/PortfolioGallery";

const Root = async () => {
  const items = await loadItems();
  return <PortfolioGallery items={items} />;
};

export default Root;
