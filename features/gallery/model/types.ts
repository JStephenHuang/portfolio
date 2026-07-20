export type GalleryProfile = "desktop" | "mobile";
export type GalleryItemId = string;
export type GalleryParentId = "root" | GalleryItemId;
export type GalleryDisplayMode = "collapsed" | "expanded";

export interface GalleryPosition {
  x: number;
  y: number;
}

export type GalleryThumbnail =
  | {
      kind: "image";
      src: string;
    }
  | {
      kind: "video";
      src?: string;
      poster: string;
    };

interface GalleryItemBase {
  id: GalleryItemId;
  title: string;
  thumbnail: GalleryThumbnail;
  defaultParentId: GalleryParentId;
  defaultOrder: number;
  defaultPosition?: Partial<Record<GalleryProfile, GalleryPosition>>;
}

export interface FolderDefinition extends GalleryItemBase {
  type: "folder";
}

export type FileAction =
  | { kind: "route"; href: string }
  | { kind: "media"; src: string }
  | { kind: "external"; href: string };

export interface VideoExpandedView {
  kind: "video";
  src?: string;
  poster: string;
}

export type ExpandedViewConfiguration = VideoExpandedView;

export interface FileDefinition extends GalleryItemBase {
  type: "file";
  action: FileAction;
  expandable?: boolean;
  expandedView?: ExpandedViewConfiguration;
}

export type GalleryItemDefinition = FolderDefinition | FileDefinition;

export interface GalleryLayoutEntry {
  parentId: GalleryParentId;
  x: number;
  y: number;
  z: number;
  displayMode: GalleryDisplayMode;
}

export interface GalleryProfileState {
  entries: Record<GalleryItemId, GalleryLayoutEntry>;
  folderOrder: Record<GalleryItemId, GalleryItemId[]>;
}

export interface PersistedGalleryState {
  version: 1;
  profiles: Record<GalleryProfile, GalleryProfileState>;
}

export type GalleryDragData =
  | {
      kind: "item";
      itemId: GalleryItemId;
      parentId: GalleryParentId;
      index?: number;
    }
  | {
      kind: "root";
    }
  | {
      kind: "folder";
      folderId: GalleryItemId;
    }
  | {
      kind: "row";
      itemId: GalleryItemId;
      parentId: GalleryItemId;
      index: number;
    };
