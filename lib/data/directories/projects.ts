import { CanvasItemType, IDirectory } from "@/lib/models/item";

const parentPath = "/projects";

export const projectDirectories: IDirectory[] = [
  {
    name: "slam",
    type: CanvasItemType.DIRECTORY,
    href: `${parentPath}/slam`,
    image: "/graphics/wave-1.png",
  },
  {
    name: "computer vision",
    type: CanvasItemType.DIRECTORY,
    href: `${parentPath}/computer-vision`,
    image: "/graphics/wave-1.png",
  },
  {
    name: "c++",
    type: CanvasItemType.DIRECTORY,
    href: `${parentPath}/c++`,
    image: "/graphics/wave-1.png",
  },
];
