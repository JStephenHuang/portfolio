export interface ICanvasItem {
  name: string;
  image?: string;
  x?: number;
  y?: number;
}

export enum CanvasItemType {
  DIRECTORY = "directory",
  DOCUMENT = "document",
}

export enum DocumentVariant {
  MODAL = "modal",
  LINK = "link",
}

// Directory type - navigates to another route
export interface IDirectory extends ICanvasItem {
  type: CanvasItemType.DIRECTORY;
  href: string; // Route to navigate to (e.g., '/experience', '/projects')
}

// Document type - opens content (modal or external link)
export interface IDocument extends ICanvasItem {
  type: CanvasItemType.DOCUMENT;
  variant: DocumentVariant;
  href?: string; // Optional external link
  content?: string; // Optional content for modal
}
