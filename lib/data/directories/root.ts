import { CanvasItemType, IDirectory } from "@/lib/models/item";

export const rootDirectories: IDirectory[] = [
  {
    id: "experience",
    name: "experience",
    type: CanvasItemType.DIRECTORY,
    href: "/experience",
    image: "/graphics/wave-1.png",
  },
  {
    id: "projects",
    name: "projects",
    type: CanvasItemType.DIRECTORY,
    href: "/projects",
    image: "/graphics/wave-1.png",
  },
  {
    id: "education",
    name: "education",
    type: CanvasItemType.DIRECTORY,
    href: "/education",
    image: "/graphics/wave-1.png",
  },
];
