import { CanvasItemType, IDirectory } from "@/lib/models/item";

export const rootDirectories: IDirectory[] = [
  {
    name: "experience",
    type: CanvasItemType.DIRECTORY,
    href: "/experience",
    image: "/graphics/wave-1.png",
  },
  {
    name: "projects",
    type: CanvasItemType.DIRECTORY,
    href: "/projects",
    image: "/graphics/wave-1.png",
  },
  {
    name: "education",
    type: CanvasItemType.DIRECTORY,
    href: "/education",
    image: "/graphics/wave-1.png",
  },
];
