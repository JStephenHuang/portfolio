import type { GalleryItemDefinition } from "@/features/gallery/model/types";

export const galleryItems = [
  {
    id: "experience",
    type: "folder",
    title: "experience",
    thumbnail: { kind: "image", src: "/root/experience-4.gif" },
    defaultParentId: "root",
    defaultOrder: 0,
    defaultPosition: {
      desktop: { x: 64, y: 104 },
      mobile: { x: 24, y: 92 },
    },
  },
  {
    id: "projects",
    type: "folder",
    title: "projects",
    thumbnail: { kind: "image", src: "/root/projects-2.png" },
    defaultParentId: "root",
    defaultOrder: 1,
    defaultPosition: {
      desktop: { x: 360, y: 104 },
      mobile: { x: 24, y: 172 },
    },
  },
  {
    id: "aoc",
    type: "folder",
    title: "aoc",
    thumbnail: { kind: "image", src: "/aoc/logo.png" },
    defaultParentId: "root",
    defaultOrder: 2,
    defaultPosition: {
      desktop: { x: 656, y: 104 },
      mobile: { x: 24, y: 252 },
    },
  },
  {
    id: "resume",
    type: "file",
    title: "resume.pdf",
    thumbnail: { kind: "image", src: "/resume/icon.png" },
    defaultParentId: "root",
    defaultOrder: 3,
    defaultPosition: {
      desktop: { x: 952, y: 104 },
      mobile: { x: 24, y: 332 },
    },
    action: { kind: "media", src: "/resume/resume.pdf" },
    expandable: false,
  },
  {
    id: "prl",
    type: "file",
    title: "parametric research labs",
    thumbnail: { kind: "image", src: "/prl/logo.png" },
    defaultParentId: "experience",
    defaultOrder: 0,
    action: { kind: "route", href: "/prl" },
    expandedView: {
      kind: "video",
      poster: "/prl/logo.png",
    },
  },
  {
    id: "garment-system",
    type: "file",
    title: "garment system",
    thumbnail: { kind: "image", src: "/gs/logo.png" },
    defaultParentId: "experience",
    defaultOrder: 1,
    action: { kind: "route", href: "/garment-system" },
    expandedView: {
      kind: "video",
      poster: "/gs/logo-2.png",
    },
  },
  {
    id: "yap",
    type: "file",
    title: "yap",
    thumbnail: { kind: "image", src: "/graphics/wave-1.png" },
    defaultParentId: "projects",
    defaultOrder: 0,
    action: { kind: "route", href: "/yap" },
    expandedView: {
      kind: "video",
      poster: "/graphics/wave-1.png",
    },
  },
  {
    id: "aoc-2025",
    type: "file",
    title: "advent of code 2025",
    thumbnail: { kind: "image", src: "/aoc/2025/event-design.png" },
    defaultParentId: "aoc",
    defaultOrder: 0,
    action: { kind: "route", href: "/aoc-2025" },
    expandedView: {
      kind: "video",
      poster: "/aoc/2025/event-design.png",
    },
  },
] satisfies GalleryItemDefinition[];

export const galleryItemMap = new Map(galleryItems.map((item) => [item.id, item]));
