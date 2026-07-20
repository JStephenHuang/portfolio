import type {
  GalleryItemDefinition,
  GalleryItemId,
  GalleryParentId,
  GalleryPosition,
  GalleryProfile,
  GalleryProfileState,
  PersistedGalleryState,
} from "./types";

const FALLBACK_POSITIONS: Record<GalleryProfile, GalleryPosition> = {
  desktop: { x: 64, y: 104 },
  mobile: { x: 24, y: 92 },
};

export function createDefaultProfile(
  items: readonly GalleryItemDefinition[],
  profile: GalleryProfile,
): GalleryProfileState {
  const entries: GalleryProfileState["entries"] = {};
  const folderOrder: GalleryProfileState["folderOrder"] = {};

  for (const item of items) {
    const position = item.defaultPosition?.[profile] ?? FALLBACK_POSITIONS[profile];
    entries[item.id] = {
      parentId: item.defaultParentId,
      x: position.x,
      y: position.y,
      z: item.defaultOrder + 1,
      displayMode: "collapsed",
    };

    if (item.type === "folder") {
      folderOrder[item.id] = [];
    }
  }

  for (const item of [...items].sort((a, b) => a.defaultOrder - b.defaultOrder)) {
    if (item.defaultParentId !== "root") {
      folderOrder[item.defaultParentId]?.push(item.id);
    }
  }

  return { entries, folderOrder };
}

export function createDefaultGalleryState(
  items: readonly GalleryItemDefinition[],
): PersistedGalleryState {
  return {
    version: 1,
    profiles: {
      desktop: createDefaultProfile(items, "desktop"),
      mobile: createDefaultProfile(items, "mobile"),
    },
  };
}

export function getRootItems(profile: GalleryProfileState): GalleryItemId[] {
  return Object.entries(profile.entries)
    .filter(([, entry]) => entry.parentId === "root")
    .sort(([, a], [, b]) => a.z - b.z)
    .map(([id]) => id);
}

export function getFolderChildren(
  profile: GalleryProfileState,
  folderId: GalleryItemId,
): GalleryItemId[] {
  return profile.folderOrder[folderId] ?? [];
}

export function isFolderDescendant(
  profile: GalleryProfileState,
  folderId: GalleryItemId,
  possibleAncestorId: GalleryItemId,
): boolean {
  let current: GalleryParentId = folderId;
  const seen = new Set<GalleryItemId>();

  while (current !== "root") {
    if (current === possibleAncestorId) return true;
    if (seen.has(current)) return true;
    seen.add(current);
    current = profile.entries[current]?.parentId ?? "root";
  }

  return false;
}

export function moveItem(
  profile: GalleryProfileState,
  itemId: GalleryItemId,
  parentId: GalleryParentId,
  options: {
    index?: number;
    position?: GalleryPosition;
  } = {},
): GalleryProfileState {
  const current = profile.entries[itemId];
  if (!current) return profile;
  if (parentId === itemId) return profile;
  if (parentId !== "root" && isFolderDescendant(profile, parentId, itemId)) return profile;

  const wasInRoot = current.parentId === "root";
  const folderOrder = Object.fromEntries(
    Object.entries(profile.folderOrder).map(([id, children]) => [
      id,
      children.filter((childId) => childId !== itemId),
    ]),
  );

  if (parentId !== "root") {
    const target = [...(folderOrder[parentId] ?? [])];
    const currentIndex =
      current.parentId === parentId ? (profile.folderOrder[parentId] ?? []).indexOf(itemId) : -1;
    const unadjustedIndex = options.index ?? target.length;
    const requestedIndex =
      currentIndex !== -1 && currentIndex < unadjustedIndex ? unadjustedIndex - 1 : unadjustedIndex;
    const index = Math.max(0, Math.min(requestedIndex, target.length));
    target.splice(index, 0, itemId);
    folderOrder[parentId] = target;
  }

  const nextEntry = {
    ...current,
    parentId,
    x: options.position?.x ?? current.x,
    y: options.position?.y ?? current.y,
    displayMode:
      parentId === "root"
        ? wasInRoot
          ? current.displayMode
          : ("expanded" as const)
        : ("collapsed" as const),
  };

  return {
    entries: {
      ...profile.entries,
      [itemId]: nextEntry,
    },
    folderOrder,
  };
}

export function getTopZIndex(profile: GalleryProfileState): number {
  return Math.max(0, ...Object.values(profile.entries).map((entry) => entry.z));
}
