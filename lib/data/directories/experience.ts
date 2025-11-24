import { CanvasItemType, IDirectory } from "@/lib/models/item";

const parentPath = "/experience";

export const experienceDirectories: IDirectory[] = [
  {
    name: "garment system",
    type: CanvasItemType.DIRECTORY,
    href: `${parentPath}/garment-system`,
    image: "/gs/logo.png",
  },
];
